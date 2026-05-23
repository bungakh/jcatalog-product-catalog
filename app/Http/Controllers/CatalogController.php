<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CatalogController extends Controller
{
    public function index(Request $request): Response|RedirectResponse
    {
        $categories = Category::where('is_active', true)
            ->with('products')
            ->get();

        $categoryQuery = $request->query('category');
        if ($categoryQuery) {
            $categorySlugs = collect(explode(',', $categoryQuery))
                ->map(fn ($value) => trim($value))
                ->filter()
                ->map(function ($value) use ($categories) {
                    $category = $categories->firstWhere('id', (int) $value);

                    return ctype_digit($value) && $category ? $category->slug : $value;
                })
                ->values();

            if ($categorySlugs->implode(',') !== $categoryQuery) {
                $query = array_merge($request->query(), [
                    'category' => $categorySlugs->implode(','),
                ]);

                return redirect('/?' . http_build_query($query));
            }
        }
        
        $products = Product::where('is_active', true)
            ->with('category')
            ->get();

        return Inertia::render('Catalog/Index', [
            'categories' => $categories,
            'products' => $products,
        ]);
    }

    public function show(string $slug): Response
    {
        $product = Product::where('slug', $slug)
            ->where('is_active', true)
            ->with('category')
            ->firstOrFail();

        $relatedProducts = Product::where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->where('is_active', true)
            ->with('category')
            ->limit(4)
            ->get();

        $categories = Category::where('is_active', true)->get();

        return Inertia::render('Catalog/Show', [
            'product' => $product,
            'relatedProducts' => $relatedProducts,
            'categories' => $categories,
        ]);
    }

    public function category(string $slug): Response
    {
        $category = Category::where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        $products = Product::where('category_id', $category->id)
            ->where('is_active', true)
            ->with('category')
            ->get();

        $categories = Category::where('is_active', true)->get();

        return Inertia::render('Catalog/Category', [
            'category' => $category,
            'products' => $products,
            'categories' => $categories,
        ]);
    }
}
