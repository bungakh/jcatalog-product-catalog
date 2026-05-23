# 🛍️ Catalog Web App - Filament Admin + React Inertia

Aplikasi catalog produk lengkap dengan admin panel Filament dan frontend React Inertia.

## ✨ Fitur

- ✅ Admin Dashboard (Filament)
- ✅ Master Kategori & Produk
- ✅ Frontend Catalog React + Inertia.js
- ✅ Responsive Design (Mobile, Tablet, Desktop)
- ✅ Search & Filter Produk
- ✅ Detail Produk dengan Rekomendasi
- ✅ Pagination
- ✅ Upload Gambar Produk
- ✅ Status Aktif/Non-Aktif
- ✅ Manajemen Stok

## 📋 Prerequisites

- PHP 8.1+
- Composer
- Node.js 18+
- npm atau yarn
- SQLite atau MySQL

## 🚀 Setup & Instalasi

### 1. Clone atau Setup Project

```bash
cd /home/jenlut/PROJECT
```

### 2. Install Dependencies

```bash
# Backend dependencies
composer install

# Frontend dependencies
npm install --legacy-peer-deps
```

### 3. Setup Environment

```bash
# Copy .env file
cp .env.example .env

# Generate app key
php artisan key:generate
```

### 4. Database Setup

```bash
# Run migrations
php artisan migrate:fresh

# Seed data (optional)
php artisan db:seed
```

### 5. Build Assets

```bash
# Development
npm run dev

# atau Production
npm run build
```

### 6. Storage Link

```bash
# Create symlink untuk upload files
php artisan storage:link
```

## 🏃 Menjalankan Project

### Terminal 1: Backend Server

```bash
php artisan serve
```

Server berjalan di: http://localhost:8000

### Terminal 2: Frontend Dev Server

```bash
npm run dev
```

## 📍 URL Penting

| URL | Deskripsi |
|-----|-----------|
| http://localhost:8000 | Homepage |
| http://localhost:8000/catalog | Catalog Products |
| http://localhost:8000/catalog/{slug} | Detail Produk |
| http://localhost:8000/catalog/category/{slug} | Produk per Kategori |
| http://localhost:8000/admin | Admin Panel (Filament) |

## 📁 Struktur Project

```
PROJECT/
├── app/
│   ├── Models/
│   │   ├── Category.php
│   │   └── Product.php
│   ├── Http/
│   │   └── Controllers/
│   │       └── CatalogController.php
│   └── Filament/
│       └── Resources/
├── database/
│   ├── migrations/
│   ├── seeders/
│   │   └── DatabaseSeeder.php
│   └── database.sqlite
├── resources/
│   └── js/
│       ├── Pages/
│       │   └── Catalog/
│       │       ├── Index.jsx
│       │       ├── Show.jsx
│       │       └── Category.jsx
│       └── Layouts/
│           └── AppLayout.jsx
├── routes/
│   └── web.php
├── storage/
│   └── app/
│       └── public/ (uploads)
└── public/

```

## 🗄️ Database Schema

### Categories Table
```sql
- id (Primary Key)
- name (String)
- slug (String, Unique)
- description (Text)
- image (String)
- is_active (Boolean)
- timestamps
```

### Products Table
```sql
- id (Primary Key)
- category_id (Foreign Key)
- name (String)
- slug (String, Unique)
- description (Text)
- price (Decimal)
- stock (Integer)
- image (String)
- is_active (Boolean)
- timestamps
```

## 👨‍💼 Admin Panel (Filament)

### Login Admin

1. Buat user admin (jika belum ada):
```bash
php artisan tinker
# Paste code di bawah:
use App\Models\User;
User::create([
    'name' => 'Admin',
    'email' => 'admin@example.com',
    'password' => bcrypt('password'),
    'email_verified_at' => now(),
]);
exit
```

2. Akses: http://localhost:8000/admin

### Fitur Admin

- ✅ CRUD Kategori
- ✅ CRUD Produk
- ✅ Upload Gambar
- ✅ Set Status Aktif/Non-Aktif
- ✅ Manajemen Stok
- ✅ Filter & Search
- ✅ Bulk Actions

## 🎨 Frontend Features

### Catalog Page

- Grid view produk
- Filter berdasarkan kategori
- Search real-time
- Sort berdasarkan harga/terbaru
- Pagination

### Detail Produk

- Gambar produk
- Deskripsi lengkap
- Harga & Stock
- Rekomendasi produk sejenis
- Quantity selector
- Add to cart button

## 🔧 Customization

### Menambah Kategori Baru

1. Buka Admin Panel
2. Navigasi ke Categories
3. Klik "Create"
4. Isi form dan submit

### Menambah Produk

1. Buka Admin Panel
2. Navigasi ke Products
3. Klik "Create"
4. Isi form dengan:
   - Nama Produk
   - Kategori
   - Deskripsi
   - Harga
   - Stok
   - Gambar (optional)
5. Submit

## 📝 Environment Variables

Edit `.env` untuk konfigurasi:

```env
APP_NAME=CatalogApp
APP_URL=http://localhost:8000
DB_CONNECTION=sqlite
DB_DATABASE=database/database.sqlite
FILESYSTEM_DISK=public
```

## 🐛 Troubleshooting

### Error: "Call to a member function getClusters()"

Solusi: Jalankan `php artisan filament:install` untuk setup Filament.

### npm error: "peer vite"

Solusi: Gunakan `npm install --legacy-peer-deps`

### Database error

Solusi:
```bash
php artisan migrate:fresh --seed
php artisan cache:clear
php artisan config:cache
```

### Upload gambar tidak berfungsi

Solusi: Jalankan `php artisan storage:link`

## 🚀 Production Deployment

### Build untuk Production

```bash
npm run build
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### Upload ke Server

```bash
git clone <repo-url> production
cd production
composer install --no-dev
npm install --legacy-peer-deps
npm run build
php artisan migrate --force
php artisan storage:link
```

## 📚 Resources

- [Laravel Documentation](https://laravel.com/docs)
- [Filament Documentation](https://filamentphp.com/docs)
- [Inertia.js Documentation](https://inertiajs.com)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)

## 📞 Support

Jika ada pertanyaan atau bug, silakan buat issue di repository ini.

## 📄 License

MIT License - Open Source

---

**Happy Coding! 🎉**

Dibuat dengan ❤️ menggunakan Laravel, Filament, React & Inertia
