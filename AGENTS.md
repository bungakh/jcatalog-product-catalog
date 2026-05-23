# AGENTS.md — JCatalog Agent Guide

This file is the operational guide for AI agents working inside this repository.

## Project Identity

- Project name: **JCatalog Product Catalog**
- Repository: `bungakh/jcatalog-product-catalog`
- Local path: `/home/jenlut/PROJECT`
- Product type: product catalog/e-commerce showcase with Filament admin and React/Inertia frontend.
- User preference: direct implementation, concise Indonesian summaries, verify live/build before reporting done.

## Stack

- Laravel 13 / PHP 8.3
- Filament 5 admin panel
- React 18 + Inertia.js 2 frontend
- Tailwind CSS 3
- Vite 8
- MySQL via Docker Compose
- GSAP for motion footer
- HugeIcons + local shadcn-style UI primitives
- Node `sharp` for product thumbnails

## Important Product Rules

1. **Frontend has no public login/register UX.**
   - Public site is catalog-only.
   - Do not add `/login`, `/register`, account buttons, or customer auth links to the public frontend.
   - Admin access is handled by **Filament admin only**.
2. **Filament admin must be preserved.**
   - Do not remove Filament providers, resources, admin panel config, or User model support.
3. **Category URLs use slugs, not IDs.**
   - Preferred: `/?category=fashion`
   - Legacy numeric query may be redirected to slug by `CatalogController`.
4. **Search is URL-based.**
   - Preferred: `/?q=laptop`
   - Header search should submit to catalog index with query params.
5. **Cart is localStorage-based.**
   - No database cart unless explicitly requested.
6. **Checkout goes to WhatsApp.**
   - Store number: `6281388050997`.
7. **Product cards should prefer thumbnails.**
   - Use `product.thumbnail` first, fallback to `product.image`.

## Key Files

### Backend

- `routes/web.php` — public catalog routes and redirect compatibility.
- `app/Http/Controllers/CatalogController.php` — public catalog, product detail, category page.
- `app/Models/Category.php` — category model.
- `app/Models/Product.php` — product model.
- `app/Providers/Filament/AdminPanelProvider.php` — Filament admin panel config.
- `app/Filament/Resources/*` — admin CRUD resources.
- `app/Console/Commands/GenerateProductThumbnails.php` — thumbnail generation command.

### Frontend

- `resources/js/Pages/Catalog/Index.jsx` — catalog listing, search, filters.
- `resources/js/Pages/Catalog/Show.jsx` — product detail.
- `resources/js/Pages/Catalog/Category.jsx` — category detail/listing.
- `resources/js/Components/Header.jsx` — navigation, category dropdown, search, cart trigger.
- `resources/js/Components/ProductCard.jsx` — product card image/rendering logic.
- `resources/js/Components/CartDrawer.jsx` — shopping cart UI.
- `resources/js/Components/ui/motion-footer.jsx` — GSAP cinematic footer.
- `resources/js/lib/cart.js` — localStorage cart helpers.

### Documentation

- `SYSTEM_DESIGN.md` — architecture, domain model, frontend/backend data flow, and design system.
- `AGENTS.md` — this operational guide.

## Commands

Install:

```bash
composer install
npm install
```

Build frontend:

```bash
npm run build
```

Run Laravel dev server:

```bash
php artisan serve --host=0.0.0.0 --port=8000
```

Migrate database:

```bash
php artisan migrate
```

Create storage symlink:

```bash
php artisan storage:link
```

Generate thumbnails:

```bash
php artisan products:generate-thumbnails
```

Laravel tests:

```bash
php artisan test
```

## GitHub Operations

The Hermes profile may override `HOME`, so authenticated GitHub CLI config can be outside the active home. Use:

```bash
GH_CONFIG_DIR=/home/jenlut/.config/gh gh auth status
GH_CONFIG_DIR=/home/jenlut/.config/gh gh repo view bungakh/jcatalog-product-catalog
```

Commit and push after every requested change:

```bash
git status --short
git add <changed-files>
git commit -m "Descriptive message"
git push
```

If using `gh`, prefix with:

```bash
GH_CONFIG_DIR=/home/jenlut/.config/gh gh ...
```

## Verification Checklist Before Reporting Done

1. Run `npm run build` after frontend changes.
2. Run `php artisan route:list` after route changes.
3. Check `git status --short` to ensure intended files are staged/committed.
4. Push to GitHub when user asks for GitHub persistence.
5. Do not expose credentials, tokens, admin passwords, or tunnel secrets in output.

## UI/Design Conventions

- Minimal black/white premium catalog style.
- Mobile-first responsive layout.
- Avoid visible ugly focus/active borders on header search.
- Product images should be lazy-loaded and async-decoded.
- Footer must not be cut off on mobile; prefer `svh` units for viewport-sensitive sections.
- Cart item images should be centered and professional.

## Security/Repo Hygiene

Do not commit:

- `.env` or `.env.*`
- tokens/credentials
- GitHub auth files
- Cloudflare private config
- `node_modules`
- `vendor`
- `public/build`
- `public/storage`
- runtime storage/session/log files
- database dumps

## Notes for Future Agents

- Public frontend auth screens from Breeze are intentionally not part of the product experience.
- Filament admin auth is separate and should remain available.
- If product images do not show, check `php artisan storage:link` and the stored `image`/`thumbnail` paths.
- If thumbnails are missing, run `php artisan products:generate-thumbnails`.
- If GitHub CLI appears logged out, check `GH_CONFIG_DIR=/home/jenlut/.config/gh` before asking the user to log in again.
