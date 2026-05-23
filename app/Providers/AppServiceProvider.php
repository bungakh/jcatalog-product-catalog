<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
        
        // Force HTTPS behind public proxies/tunnels, but keep localhost usable for local debugging.
        $host = request()->getHost();
        $isLocalHost = in_array($host, ['127.0.0.1', 'localhost'], true);

        if (! $isLocalHost && (env('APP_ENV') === 'production' || env('APP_ENV') === 'local')) {
            URL::forceScheme('https');
        }
    }
}
