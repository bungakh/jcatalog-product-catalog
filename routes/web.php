<?php

use App\Http\Controllers\CatalogController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Catalog Routes
Route::get('/', [CatalogController::class, 'index'])->name('catalog.index');
Route::get('/category/{slug}', [CatalogController::class, 'category'])->name('catalog.category');
Route::get('/product/{slug}', [CatalogController::class, 'show'])->name('catalog.show');

// Backward-compatible redirects while public menu uses clean index/product URLs.
Route::get('/catalog', function (Request $request) {
    $query = $request->getQueryString();

    return redirect('/' . ($query ? '?' . $query : ''), 301);
});
Route::get('/catalog/category/{slug}', fn (string $slug) => redirect()->route('catalog.category', $slug, 301));
Route::get('/catalog/{slug}', fn (string $slug) => redirect()->route('catalog.show', $slug, 301));

// Public frontend intentionally has no login/register/profile routes.
// Admin authentication is handled exclusively by the Filament admin panel.
