<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'JCatalog') }}</title>

        @php
            $meta = $page['props']['meta'] ?? null;
        @endphp

        @if ($meta)
            <meta name="description" content="{{ $meta['description'] ?? '' }}">
            <link rel="canonical" href="{{ $meta['url'] ?? url()->current() }}">

            <meta property="og:type" content="{{ $meta['type'] ?? 'website' }}">
            <meta property="og:site_name" content="{{ $meta['site_name'] ?? config('app.name', 'JCatalog') }}">
            <meta property="og:title" content="{{ $meta['title'] ?? config('app.name', 'JCatalog') }}">
            <meta property="og:description" content="{{ $meta['description'] ?? '' }}">
            <meta property="og:url" content="{{ $meta['url'] ?? url()->current() }}">
            <meta property="og:image" content="{{ $meta['image'] ?? '' }}">
            <meta property="og:image:secure_url" content="{{ $meta['image'] ?? '' }}">
            <meta property="og:image:alt" content="{{ $meta['image_alt'] ?? $meta['title'] ?? config('app.name', 'JCatalog') }}">

            <meta name="twitter:card" content="summary_large_image">
            <meta name="twitter:title" content="{{ $meta['title'] ?? config('app.name', 'JCatalog') }}">
            <meta name="twitter:description" content="{{ $meta['description'] ?? '' }}">
            <meta name="twitter:image" content="{{ $meta['image'] ?? '' }}">
        @endif

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
