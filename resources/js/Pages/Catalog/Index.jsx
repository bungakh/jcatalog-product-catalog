import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import Header from '@/Components/Header';
import HeroBanner from '@/Components/HeroBanner';
import ProductCard from '@/Components/ProductCard';
import ProductFilter from '@/Components/ProductFilter';
import Footer from '@/Components/Footer';
import { Button } from '@/Components/ui/button';
import { Card } from '@/Components/ui/card';
import {
    ArrowLeft01Icon,
    ArrowRight01Icon,
    Message01Icon,
    Sad01Icon,
    Shield01Icon,
    ShoppingBag01Icon,
    TruckIcon,
} from '@hugeicons/core-free-icons';
import { Icon } from '@/Components/ui/icon';

export default function CatalogIndex({ categories, products }) {
    const [filters, setFilters] = useState({
        categories: [],
        priceMin: '',
        priceMax: '',
    });
    const [sortBy, setSortBy] = useState('newest');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryOffset, setCategoryOffset] = useState(0);
    const itemsPerPage = 12;

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const query = params.get('q') || '';
        const categoryParam = params.get('category');

        setSearchQuery(query);

        if (categoryParam) {
            const selectedCategories = categoryParam
                .split(',')
                .map((value) => value.trim())
                .filter(Boolean)
                .map((value) => {
                    const categoryById = (categories || []).find((category) => String(category.id) === value);
                    return categoryById?.slug || value;
                });

            setFilters((prev) => ({
                ...prev,
                categories: selectedCategories,
            }));

            if (selectedCategories.join(',') !== categoryParam) {
                params.set('category', selectedCategories.join(','));
                window.history.replaceState({}, '', `/?${params.toString()}`);
            }
        }
    }, []);

    // Apply filters
    const filteredProducts = (products || []).filter((product) => {
        const normalizedSearch = searchQuery.trim().toLowerCase();
        const searchableText = [
            product.name,
            product.description,
            product.category?.name,
            product.price,
        ]
            .filter(Boolean)
            .join(' ')
            .toLowerCase();

        const matchesSearch = !normalizedSearch || searchableText.includes(normalizedSearch);
        const matchesCategory = filters.categories.length === 0 || filters.categories.includes(product.category?.slug);
        const matchesPrice = 
            (!filters.priceMin || product.price >= parseInt(filters.priceMin)) &&
            (!filters.priceMax || product.price <= parseInt(filters.priceMax));
        return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort products
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return b.id - a.id; // newest
    });

    // Pagination
    const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
    const paginatedProducts = sortedProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleFilterChange = (filterType, value) => {
        if (filterType === 'reset') {
            setFilters({
                categories: [],
                priceMin: '',
                priceMax: '',
            });
            setSearchQuery('');
            window.history.replaceState({}, '', '/');
            setCurrentPage(1);
        } else {
            if (filterType === 'categories') {
                const params = new URLSearchParams(window.location.search);
                if (value?.length) {
                    params.set('category', value.join(','));
                } else {
                    params.delete('category');
                }
                window.history.replaceState({}, '', `/${params.toString() ? `?${params.toString()}` : ''}`);
            }

            setFilters(prev => ({
                ...prev,
                [filterType]: value
            }));
            setCurrentPage(1);
        }
    };

    const activeCategories = (categories || []).filter((category) =>
        (products || []).some((product) => product.category_id === category.id)
    );

    const visibleCategories = activeCategories.length <= 2
        ? activeCategories
        : [
            activeCategories[categoryOffset % activeCategories.length],
            activeCategories[(categoryOffset + 1) % activeCategories.length],
        ];

    const slideCategories = (direction) => {
        if (activeCategories.length <= 2) return;
        setCategoryOffset((current) => (current + direction + activeCategories.length) % activeCategories.length);
    };

    const categoryPreviewImage = (category) => {
        const categoryImage = category?.image;
        const firstProductWithImage = (category?.products || []).find((product) => product?.thumbnail || product?.image);
        const imagePath = categoryImage || firstProductWithImage?.thumbnail || firstProductWithImage?.image;

        return imagePath ? `/storage/${imagePath}` : null;
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-950">
            <Head title="Home" />
            {/* Header */}
            <Header categories={categories} />

            {/* Main Content */}
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
                {/* Hero Banner */}
                <div className="mb-8 sm:mb-12">
                    <HeroBanner />
                </div>

                {/* Filter & Products Section */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Left Sidebar - Filters */}
                    <aside className="lg:col-span-1">
                        <div className="sticky top-28 space-y-4">
                            <Card className="rounded-3xl border-gray-200 bg-white/95 p-6 shadow-sm">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Filter Products</h2>
                                <ProductFilter
                                    categories={categories}
                                    products={products}
                                    onFilterChange={handleFilterChange}
                                    filters={filters}
                                />
                            </Card>

                            <Card className="overflow-hidden rounded-3xl border-gray-900 bg-gray-950 text-white shadow-sm">
                                <div className="relative p-6">
                                    <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/10" />
                                    <div className="absolute -bottom-12 -left-10 h-28 w-28 rounded-full bg-white/5" />
                                    <div className="relative">
                                        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-gray-950">
                                            <Icon icon={Message01Icon} className="h-5 w-5" />
                                        </div>
                                        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-white/50">Need Help?</p>
                                        <h3 className="text-lg font-black leading-tight">Bingung pilih produk?</h3>
                                        <p className="mt-2 text-sm leading-6 text-white/70">
                                            Chat admin untuk rekomendasi produk, stok, dan estimasi pengiriman.
                                        </p>
                                        <a
                                            href="https://wa.me/6281388050997?text=Halo%20Admin%2C%20saya%20ingin%20konsultasi%20produk%20di%20JCatalog"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-white px-4 py-3 text-xs font-black uppercase tracking-wide text-gray-950 transition hover:bg-gray-200"
                                        >
                                            Chat WhatsApp
                                        </a>
                                    </div>
                                </div>
                            </Card>

                            <Card className="rounded-3xl border-gray-200 bg-white p-5 shadow-sm">
                                <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.24em] text-gray-400">Catalog Benefits</p>
                                <div className="space-y-4">
                                    {[
                                        { icon: Shield01Icon, title: 'Produk Terverifikasi', desc: 'Data stok dan harga tersusun rapi.' },
                                        { icon: TruckIcon, title: 'Order via WhatsApp', desc: 'Pesan cepat langsung ke admin.' },
                                        { icon: ShoppingBag01Icon, title: `${products?.length || 0} Produk Aktif`, desc: 'Katalog siap dibrowse kapan saja.' },
                                    ].map((item) => (
                                        <div key={item.title} className="flex gap-3">
                                            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-gray-100 text-gray-700">
                                                <Icon icon={item.icon} className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-black text-gray-950">{item.title}</h4>
                                                <p className="mt-1 text-xs leading-5 text-gray-500">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    </aside>

                    {/* Right Content - Products Grid */}
                    <div id="products" className="lg:col-span-3">
                        {/* Top Bar - Results & Sorting */}
                        <Card className="mb-8 rounded-3xl border-gray-200 bg-white p-5 shadow-sm">
                            {searchQuery && (
                                <div className="mb-4 flex flex-wrap items-center gap-3 rounded-2xl bg-gray-50 px-4 py-3">
                                    <span className="text-sm text-gray-600">
                                        Search results for <span className="font-bold text-gray-950">“{searchQuery}”</span>
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => handleFilterChange('reset')}
                                        className="text-xs font-bold uppercase tracking-wide text-gray-900 underline underline-offset-4"
                                    >
                                        Clear search
                                    </button>
                                </div>
                            )}
                            <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-700 font-medium">
                                    Showing <span className="font-bold text-gray-900">{paginatedProducts.length}</span> of{' '}
                                    <span className="font-bold text-gray-900">{sortedProducts.length}</span> results
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900"
                                >
                                    <option value="newest">Sort by: Newest</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="name">Alphabetical</option>
                                </select>
                            </div>
                            </div>
                        </Card>

                        {/* Products Grid */}
                        {paginatedProducts.length > 0 ? (
                            <>
                                <div className="grid grid-cols-2 gap-3 mb-12 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                                    {paginatedProducts.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="flex items-center justify-center gap-2 py-8">
                                        <Button
                                            variant="outline"
                                            className="border-gray-300"
                                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                            disabled={currentPage === 1}
                                        >
                                            ← PREVIOUS
                                        </Button>

                                        <div className="flex gap-1">
                                            {[...Array(Math.min(5, totalPages))].map((_, i) => {
                                                const pageNum = i + 1;
                                                return (
                                                    <button
                                                        key={pageNum}
                                                        onClick={() => setCurrentPage(pageNum)}
                                                        className={`w-10 h-10 rounded-lg font-semibold transition ${
                                                            currentPage === pageNum
                                                                ? 'bg-gray-900 text-white'
                                                                : 'border border-gray-300 text-gray-700 hover:border-gray-900'
                                                        }`}
                                                    >
                                                        {pageNum}
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        <Button
                                            variant="outline"
                                            className="border-gray-300"
                                            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                            disabled={currentPage === totalPages}
                                        >
                                            NEXT →
                                        </Button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-16">
                                <Icon icon={Sad01Icon} className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                                <p className="text-gray-600 text-lg font-medium">No products found</p>
                                <p className="text-gray-500 text-sm mt-1">Try adjusting your filters or search terms</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Other Categories Section */}
                {activeCategories.length > 0 && (
                    <div className="mt-20 pt-12 border-t border-gray-200">
                        <div className="mb-8 flex items-center justify-between gap-4">
                            <h2 className="text-2xl font-black tracking-tight text-gray-900 sm:text-4xl">OTHER CATEGORY</h2>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => slideCategories(-1)}
                                    disabled={activeCategories.length <= 2}
                                    className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300 text-gray-500 transition hover:border-gray-900 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-40"
                                    aria-label="Previous category"
                                >
                                    <Icon icon={ArrowLeft01Icon} className="h-5 w-5" />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => slideCategories(1)}
                                    disabled={activeCategories.length <= 2}
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
                                    aria-label="Next category"
                                >
                                    <Icon icon={ArrowRight01Icon} className="h-5 w-5" />
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                            {visibleCategories.map((category) => {
                                const previewImage = categoryPreviewImage(category);
                                const productCount = category.products?.length || 0;

                                return (
                                    <Link
                                        key={category.id}
                                        href={`/?category=${category.slug}`}
                                        className="group relative flex h-72 items-end justify-start overflow-hidden rounded-3xl bg-gray-950 shadow-sm ring-1 ring-black/10 transition duration-500 hover:-translate-y-1 hover:shadow-2xl sm:h-96"
                                    >
                                        {previewImage ? (
                                            <img
                                                src={previewImage}
                                                alt={category.name}
                                                loading="lazy"
                                                decoding="async"
                                                className="absolute inset-0 h-full w-full object-cover object-center transition duration-700 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-950" />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 transition duration-500 group-hover:from-black/90 group-hover:via-black/45" />
                                        <div className="absolute right-5 top-5 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                                            {productCount} Product{productCount === 1 ? '' : 's'}
                                        </div>
                                        <div className="relative z-10 max-w-md px-6 pb-7 text-white sm:px-8 sm:pb-8">
                                            <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-white/70">Category Collection</p>
                                            <h3 className="mb-3 text-3xl font-black leading-tight sm:text-4xl">{category.name}</h3>
                                            <p className="mb-6 line-clamp-2 text-sm leading-6 text-gray-100">
                                                {category.description || 'Explore curated products from this collection.'}
                                            </p>
                                            <span className="inline-flex rounded-full border-2 border-white px-6 py-2 text-sm font-bold transition group-hover:bg-white group-hover:text-gray-900">
                                                EXPLORE PRODUCT →
                                            </span>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
