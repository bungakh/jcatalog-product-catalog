#!/usr/bin/env bash
set -euo pipefail

cd /var/www/html

mkdir -p \
  storage/framework/cache \
  storage/framework/sessions \
  storage/framework/views \
  storage/logs \
  bootstrap/cache

# Keep bind-mounted Laravel writable inside the PHP container.
chmod -R ug+rw storage bootstrap/cache 2>/dev/null || true

if [ ! -f vendor/autoload.php ]; then
  echo "[app] vendor/ belum ada, menjalankan composer install..."
  composer install --no-interaction --prefer-dist --optimize-autoloader
fi

if [ ! -d node_modules ]; then
  echo "[app] node_modules/ belum ada, menjalankan npm install..."
  npm install --legacy-peer-deps
fi

if [ ! -f public/build/manifest.json ]; then
  echo "[app] public/build belum ada, menjalankan npm run build..."
  npm run build
fi

php artisan optimize:clear || true
php artisan storage:link || true

if [ "${WAIT_FOR_DB:-true}" = "true" ] && [ -n "${DB_HOST:-}" ]; then
  echo "[app] Menunggu database ${DB_HOST}:${DB_PORT:-3306}..."
  for i in $(seq 1 60); do
    if mysqladmin ping \
      -h"${DB_HOST}" \
      -P"${DB_PORT:-3306}" \
      -u"${DB_USERNAME:-root}" \
      -p"${DB_PASSWORD:-}" \
      --silent >/dev/null 2>&1; then
      echo "[app] Database ready."
      break
    fi

    if [ "$i" = "60" ]; then
      echo "[app] Database belum ready setelah 60 detik, lanjut start app..."
    else
      sleep 1
    fi
  done
fi

if [ "${RUN_MIGRATIONS:-false}" = "true" ]; then
  php artisan migrate --force
fi

exec "$@"
