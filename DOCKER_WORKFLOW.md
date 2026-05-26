# Docker workflow JCatalog

Project ini sekarang dijalankan dengan pola:

- `app` container: Laravel + PHP 8.3 + Node 20 untuk build asset React/Vite.
- `cloudflared` container: expose `app` ke temporary `trycloudflare.com` URL.
- MySQL tidak dibuat ulang per project. App connect ke MySQL shared existing di Docker network `project_catalog-network` dengan hostname `catalog-mysql`.

## Start

Pastikan shared MySQL sudah hidup:

```bash
docker ps | grep catalog_mysql_app
```

Lalu start project:

```bash
docker compose up -d --build
```

Local URL:

```text
http://127.0.0.1:8010
```

Ambil URL Cloudflare Tunnel:

```bash
docker compose logs cloudflared | grep -o 'https://[-a-z0-9]*\.trycloudflare\.com' | tail -1
```

## Database per project

Tidak perlu MySQL container baru. Cukup ubah nama database di `docker-compose.yml`:

```yaml
environment:
  DB_DATABASE: nama_database_project
```

Lalu buat database-nya di MySQL shared:

```bash
docker exec catalog_mysql_app mysql -u root -proot -e "CREATE DATABASE IF NOT EXISTS nama_database_project CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

## Port tidak bentrok

App internal selalu `8000`. Kalau local host port bentrok, cukup ubah bagian ini:

```yaml
ports:
  - "8010:8000"
```

Misal project lain pakai `8011:8000`, `8012:8000`, dst.

Cloudflared tidak perlu host port karena dia akses langsung ke Docker service internal: `http://app:8000`.
