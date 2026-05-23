<?php

use App\Http\Controllers\CatalogController;
use App\Http\Controllers\ProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

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

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
