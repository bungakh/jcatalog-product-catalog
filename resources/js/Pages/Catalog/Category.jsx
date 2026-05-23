import React, { useMemo, useState } from 'react';
import { Link } from '@inertiajs/react';
import { ArrowLeft01Icon } from '@hugeicons/core-free-icons';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import ProductCard from '@/Components/ProductCard';
import { Card } from '@/Components/ui/card';
import { Icon } from '@/Components/ui/icon';

export default function CatalogCategory({ category, products = [], categories = [] }) {
    const [sortBy, setSortBy] = useState('newest');

    const sortedProducts = useMemo(() => {
        const list = Array.isArray(products) ? [...products] : [...(products.data || [])];

        switch (sortBy) {
            case 'price-low':
                return list.sort((a, b) => a.price - b.price);
            case 'price-high':
                return list.sort((a, b) => b.price - a.price);
            case 'name':
                return list.sort((a, b) => a.name.localeCompare(b.name));
            case 'newest':
            default:
                return list.sort((a, b) => b.id - a.id);
        }
    }, [products, sortBy]);

    return (
        <div className="min-h-screen bg-white text-gray-900">
            <Header categories={categories} />

            <main>
                <section className="border-b border-gray-200 bg-gradient-to-br from-gray-50 via-white to-gray-100">
                    <div className="max-w-7xl mx-auto px-4 py-10 lg:py-14">
                        <Link
                            href={route('catalog.index')}
                            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-gray-950 transition"
                        >
                            <Icon icon={ArrowLeft01Icon} className="h-4 w-4" />
                            Back to Home
                        </Link>

                        <div className="grid gap-8 lg:grid-cols-[1fr_0.45fr] lg:items-end">
                            <div>
                                <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-gray-500">
                                    Category Collection
                                </p>
                                <h1 className="text-5xl font-black tracking-tight text-gray-950 md:text-6xl">
                                    {category.name}
                                </h1>
                                <p className="mt-4 max-w-2xl text-lg leading-8 text-gray-600">
                                    {category.description || 'Explore curated products from this collection.'}
                                </p>
                            </div>

                            <Card className="rounded-2xl border-gray-200 bg-white p-6 shadow-sm">
                                <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">Available Products</p>
                                <p className="mt-2 text-4xl font-black text-gray-950">{sortedProducts.length}</p>
                                <p className="mt-1 text-sm text-gray-500">Items in this category</p>
                            </Card>
                        </div>
                    </div>
                </section>

                <section className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
                    <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                        <p className="text-gray-600">
                            Showing <span className="font-bold text-gray-950">{sortedProducts.length}</span> products
                        </p>

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="rounded-full border border-gray-300 bg-white px-5 py-3 text-sm font-semibold outline-none transition focus:border-gray-900"
                        >
                            <option value="newest">Sort by: Newest</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="name">Alphabetical</option>
                        </select>
                    </div>

                    {sortedProducts.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {sortedProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <Card className="rounded-2xl border-dashed border-gray-300 p-12 text-center">
                            <p className="text-lg font-semibold text-gray-900">No products found</p>
                            <p className="mt-2 text-gray-500">Belum ada produk aktif dalam kategori ini.</p>
                        </Card>
                    )}
                </section>
            </main>

            <Footer />
        </div>
    );
}
