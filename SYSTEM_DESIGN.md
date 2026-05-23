# SYSTEM DESIGN — JCatalog Product Catalog

Dokumen ini menyimpan pengetahuan arsitektur dan desain sistem project katalog produk JCatalog.

## 1. Ringkasan Sistem

JCatalog adalah aplikasi katalog produk berbasis:

- **Backend:** Laravel 13, PHP 8.3
- **Admin Panel:** Filament 5
- **Frontend:** React 18 + Inertia.js 2
- **Styling:** Tailwind CSS 3 + shadcn-style local UI primitives
- **Database:** MySQL via Docker Compose
- **Bundler:** Vite 8
- **Image Processing:** Node `sharp` untuk thumbnail WebP
- **Animasi UI:** GSAP untuk cinematic motion footer
- **Checkout:** WhatsApp deep-link checkout

Tujuan utama sistem adalah menyediakan katalog produk publik yang cepat, rapi, mobile-friendly, mudah difilter, dan dapat dikelola melalui Filament Admin.

## 2. Arsitektur Tingkat Tinggi

```text
Browser
  |
  | HTTP
  v
Laravel Routes / Controllers
  |
  | Inertia props
  v
React Pages + Components
  |
  | UI interactions, filter, cart localStorage
  v
Laravel backend + MySQL
  |
  | file paths
  v
public/storage product images + generated thumbnails
```

### Boundary utama

1. **Laravel** bertanggung jawab untuk routing, query database, Filament admin authentication, dan mengirim props ke Inertia.
2. **React/Inertia** bertanggung jawab untuk UI katalog publik, filtering client-side, cart drawer, product detail, dan navigasi tanpa API JSON terpisah.
3. **Filament Admin** bertanggung jawab untuk CRUD master data `categories`, `products`, dan `users`.
4. **Storage** menyimpan image original dan thumbnail, disajikan melalui symlink `public/storage`.

## 3. Domain Model

### Category

File model: `app/Models/Category.php`

Kolom utama:

| Field | Tipe | Catatan |
| --- | --- | --- |
| `id` | bigint | Primary key |
| `name` | string | Nama kategori |
| `slug` | string unique | Dipakai untuk URL kategori |
| `description` | text nullable | Deskripsi kategori |
| `image` | string nullable | Path gambar kategori |
| `is_active` | boolean | Filter publik hanya menampilkan yang aktif |
| timestamps | timestamp | Laravel timestamps |

Relasi:

```php
Category hasMany Product
```

Slug kategori yang ada/dianggap valid:

- `elektronik`
- `fashion`
- `rumah-tangga`
- `olahraga`
- `furniture`

### Product

File model: `app/Models/Product.php`

Kolom utama:

| Field | Tipe | Catatan |
| --- | --- | --- |
| `id` | bigint | Primary key |
| `category_id` | foreignId | Cascade delete ke category |
| `name` | string | Nama produk |
| `slug` | string unique | Dipakai untuk URL detail produk |
| `description` | text nullable | Deskripsi produk |
| `price` | decimal(12,2) | Harga produk |
| `stock` | integer | Stok produk |
| `image` | string nullable | Original/full image |
| `thumbnail` | string nullable | Thumbnail WebP untuk catalog card |
| `is_active` | boolean | Filter publik hanya menampilkan yang aktif |
| timestamps | timestamp | Laravel timestamps |

Relasi:

```php
Product belongsTo Category
```

## 4. Routing Publik

File: `routes/web.php`

Routes utama:

| URL | Controller | Fungsi |
| --- | --- | --- |
| `/` | `CatalogController@index` | Katalog utama |
| `/category/{slug}` | `CatalogController@category` | Kategori by slug |
| `/product/{slug}` | `CatalogController@show` | Detail produk by slug |

Frontend publik tidak memiliki route `/login`, `/register`, `/dashboard`, atau `/profile`. Akses admin menggunakan Filament admin panel saja.

Backward-compatible redirects:

| Old URL | Redirect |
| --- | --- |
| `/catalog` | `/` plus query string |
| `/catalog/category/{slug}` | `/category/{slug}` |
| `/catalog/{slug}` | `/product/{slug}` |

Query katalog:

- Search: `/?q=keyword`
- Category filter: `/?category=fashion`
- Multi category: `/?category=fashion,elektronik`
- Legacy category ID query akan diredirect ke slug oleh controller.

## 5. Controller Data Flow

File: `app/Http/Controllers/CatalogController.php`

### `index(Request $request)`

1. Ambil active categories plus products.
2. Baca query `category`.
3. Jika query category masih berupa ID, convert ke slug lalu redirect ke clean URL.
4. Ambil active products plus category.
5. Render Inertia page `Catalog/Index` dengan props:
   - `categories`
   - `products`

### `show(string $slug)`

1. Ambil active product by slug plus category.
2. Ambil related products satu kategori, exclude produk aktif, limit 4.
3. Ambil active categories untuk navigasi/sidebar.
4. Render `Catalog/Show`.

### `category(string $slug)`

1. Ambil active category by slug.
2. Ambil products active untuk category tersebut plus relation category.
3. Render `Catalog/Category`.

## 6. Frontend Structure

Entry files:

- `resources/js/app.jsx`
- `resources/css/app.css`

Layouts:

- `resources/js/Layouts/AppLayout.jsx`

Legacy Breeze auth layouts sudah dihapus karena frontend tidak menyediakan login/register publik.

Catalog pages:

- `resources/js/Pages/Catalog/Index.jsx`
- `resources/js/Pages/Catalog/Show.jsx`
- `resources/js/Pages/Catalog/Category.jsx`

Core components:

| Component | Fungsi |
| --- | --- |
| `Header.jsx` | Header, navigation, search form, cart trigger |
| `HeroBanner.jsx` | Hero katalog style JCatalog/GLAMORA |
| `ProductFilter.jsx` | Sidebar filter kategori/harga/color/size |
| `ProductCard.jsx` | Kartu produk grid dengan image lazy loading |
| `CartDrawer.jsx` | Shopping cart drawer berbasis localStorage |
| `Footer.jsx` | Wrapper footer |
| `ui/motion-footer.jsx` | Cinematic GSAP footer |
| `ui/button.jsx`, `ui/card.jsx`, `ui/checkbox.jsx`, `ui/slider.jsx` | shadcn-style primitives lokal |

## 7. Search dan Filter

Search dilakukan melalui URL query agar shareable/bookmarkable.

Pattern:

```text
/?q=laptop
```

Header search submit ke root catalog dengan query `q`.

Catalog Index membaca query dari `window.location.search`, lalu filtering client-side terhadap props `products` berdasarkan:

- product `name`
- product `description`
- category `name`
- product `price`

Category filtering menggunakan slug, bukan ID:

```text
/?category=fashion
```

Controller tetap mendukung legacy ID query dan mengubah ke slug supaya URL tetap bersih.

## 8. Cart dan WhatsApp Checkout

Cart disimpan di browser melalui localStorage, bukan database.

Utility:

- `resources/js/lib/cart.js`

Komponen:

- `resources/js/Components/CartDrawer.jsx`

Nomor WhatsApp toko:

```text
6281388050997
```

Flow checkout:

1. User menambah produk ke cart.
2. CartDrawer membaca localStorage.
3. User checkout.
4. Sistem membuat pesan order dan membuka `wa.me/6281388050997?...`.

## 9. Image dan Thumbnail Strategy

Produk memiliki dua path image:

1. `image` — original/full image, cocok untuk detail page.
2. `thumbnail` — WebP kecil untuk catalog grid.

`ProductCard` harus selalu memilih:

```text
product.thumbnail -> fallback product.image -> placeholder/null state
```

Best practice image attributes:

```jsx
loading="lazy"
decoding="async"
```

Thumbnail dibuat dengan Node `sharp`, karena environment PHP tidak memiliki GD/Imagick.

Relevant files:

- `scripts/resize-product-image.mjs`
- `app/Console/Commands/GenerateProductThumbnails.php`
- migration `2026_05_23_134800_add_thumbnail_to_products_table.php`

Command thumbnail:

```bash
php artisan products:generate-thumbnails
```

Storage symlink wajib ada:

```bash
php artisan storage:link
```

## 10. Admin Panel Filament

Filament provider:

- `app/Providers/Filament/AdminPanelProvider.php`

Resources:

- `app/Filament/Resources/Categories/CategoryResource.php`
- `app/Filament/Resources/Products/ProductResource.php`
- `app/Filament/Resources/Users/UserResource.php`

Schemas/tables dipisahkan di subfolder resource:

```text
app/Filament/Resources/{ResourceName}/Schemas/*
app/Filament/Resources/{ResourceName}/Tables/*
```

Filament mengelola master data:

- Category CRUD
- Product CRUD
- User CRUD

Upload produk memakai field `image`; thumbnail perlu dijaga dengan command generator atau logic upload hook.

## 11. Design System UI

Style visual project:

- Minimalist black/white
- Premium catalog/e-commerce feel
- JCatalog/GLAMORA inspired
- Banyak whitespace
- Typography tegas, uppercase labels untuk metadata
- Product grid bersih dengan image besar
- Footer cinematic dark motion menggunakan GSAP

Prinsip UI:

1. Mobile-first responsive.
2. Tidak ada active/focus border yang mengganggu pada search/header.
3. Cart item image harus center-aligned dan terlihat profesional.
4. Footer mobile harus muat dalam viewport, tidak terpotong bawah.
5. Product cards harus cepat load dan tidak memakai image original besar jika thumbnail tersedia.

## 12. Build, Test, dan Run

Install dependency:

```bash
composer install
npm install
```

Build frontend production:

```bash
npm run build
```

Development server:

```bash
composer run dev
```

Laravel serve manual:

```bash
php artisan serve --host=0.0.0.0 --port=8000
```

Migration:

```bash
php artisan migrate
```

Storage link:

```bash
php artisan storage:link
```

Test Laravel:

```bash
composer test
# atau
php artisan test
```

## 13. Deployment Notes

Project pernah dijalankan dengan Cloudflare Quick Tunnel untuk live preview.

Tunnel URL bersifat ephemeral/random, jadi jangan hardcode URL tunnel di source code.

Production checklist:

1. `.env` production lengkap dan tidak commit.
2. `APP_KEY` sudah ada.
3. DB migrated.
4. `storage:link` sudah dijalankan.
5. `npm run build` sudah sukses.
6. `public/build` dibuat di server, tetapi tidak perlu disimpan ke Git.
7. `vendor` dan `node_modules` install di server, tidak commit ke repo.

## 14. Security Notes

Jangan commit:

- `.env`
- token GitHub
- admin credentials
- Cloudflare credentials/config private
- DB dumps produksi
- session files
- logs berisi credential

Admin credential tidak boleh ditulis di dokumentasi publik.

## 15. Known Technical Decisions

1. Frontend public memakai React/Inertia, bukan REST API terpisah.
2. Search/filter catalog client-side berdasarkan data products yang dikirim controller.
3. Category URL memakai slug, bukan numeric ID.
4. ProductCard memakai thumbnail WebP untuk performa.
5. Thumbnail dibuat via Node `sharp` karena PHP extension image tidak tersedia.
6. Cart memakai localStorage agar ringan dan tanpa login.
7. Checkout diarahkan ke WhatsApp toko.
8. Footer premium memakai GSAP, bukan CSS-only.
9. `.gitignore` harus menjaga agar generated/runtime files tidak masuk repository.
