import React from 'react';
import { Link } from '@inertiajs/react';
import {
    Cancel01Icon,
    ChevronDown,
    FavouriteIcon,
    Menu01Icon,
    Search01Icon,
    ShoppingCart01Icon,
} from '@hugeicons/core-free-icons';
import CartDrawer from '@/Components/CartDrawer';
import { Button } from '@/Components/ui/button';
import { Card } from '@/Components/ui/card';
import { Icon } from '@/Components/ui/icon';
import { CART_UPDATED_EVENT, getCartCount, getCartItems } from '@/lib/cart';

const getSelectedCategorySlugs = () => {
    if (typeof window === 'undefined') return [];

    return (new URLSearchParams(window.location.search).get('category') || '')
        .split(',')
        .map((slug) => slug.trim())
        .filter(Boolean);
};

export default function Header({ categories = [] }) {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const [searchOpen, setSearchOpen] = React.useState(false);
    const [categoryOpen, setCategoryOpen] = React.useState(false);
    const [selectedCategorySlugs, setSelectedCategorySlugs] = React.useState(getSelectedCategorySlugs);
    const [searchQuery, setSearchQuery] = React.useState(() => {
        if (typeof window === 'undefined') return '';
        return new URLSearchParams(window.location.search).get('q') || '';
    });
    const [cartOpen, setCartOpen] = React.useState(false);
    const [cartItems, setCartItems] = React.useState([]);

    React.useEffect(() => {
        setCartItems(getCartItems());

        const handleCartUpdate = () => setCartItems(getCartItems());
        window.addEventListener(CART_UPDATED_EVENT, handleCartUpdate);
        window.addEventListener('storage', handleCartUpdate);

        return () => {
            window.removeEventListener(CART_UPDATED_EVENT, handleCartUpdate);
            window.removeEventListener('storage', handleCartUpdate);
        };
    }, []);

    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('[data-category-menu]')) {
                setCategoryOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const cartCount = getCartCount(cartItems);

    const navigateToIndex = (params = new URLSearchParams()) => {
        const queryString = params.toString();
        window.location.href = `/${queryString ? `?${queryString}` : ''}`;
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();

        const params = new URLSearchParams();
        const query = searchQuery.trim();

        if (query) params.set('q', query);
        if (selectedCategorySlugs.length) params.set('category', selectedCategorySlugs.join(','));

        navigateToIndex(params);
    };

    const toggleCategory = (categorySlug) => {
        const nextSlugs = selectedCategorySlugs.includes(categorySlug)
            ? selectedCategorySlugs.filter((slug) => slug !== categorySlug)
            : [...selectedCategorySlugs, categorySlug];

        setSelectedCategorySlugs(nextSlugs);

        const params = new URLSearchParams(window.location.search);
        if (nextSlugs.length) {
            params.set('category', nextSlugs.join(','));
        } else {
            params.delete('category');
        }
        if (searchQuery.trim()) params.set('q', searchQuery.trim());

        navigateToIndex(params);
    };

    const clearCategories = () => {
        setSelectedCategorySlugs([]);
        const params = new URLSearchParams(window.location.search);
        params.delete('category');
        navigateToIndex(params);
    };

    const navLinkClass = 'text-sm font-semibold uppercase tracking-[0.18em] text-gray-600 transition hover:text-gray-950';

    return (
        <header className="sticky top-0 z-40 w-full border-b border-gray-200/80 bg-white/95 backdrop-blur">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex min-h-16 items-center justify-between gap-2 sm:min-h-20 sm:gap-4">
                    <Link href={route('catalog.index')} className="group flex min-w-0 flex-shrink items-center leading-none">
                        <span className="truncate text-lg font-black tracking-[0.18em] text-gray-950 sm:text-2xl sm:tracking-[0.28em]">JCatalog</span>
                    </Link>

                    <nav className="hidden items-center gap-8 lg:flex">
                        <Link href={route('catalog.index')} className={navLinkClass}>
                            Home
                        </Link>

                        <div className="relative" data-category-menu>
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => setCategoryOpen((open) => !open)}
                                className="h-10 rounded-full px-4 text-xs font-bold uppercase tracking-[0.18em] text-gray-700 hover:bg-gray-100 hover:text-gray-950"
                            >
                                Categories
                                {selectedCategorySlugs.length > 0 && (
                                    <span className="ml-2 rounded-full bg-gray-950 px-2 py-0.5 text-[10px] text-white">
                                        {selectedCategorySlugs.length}
                                    </span>
                                )}
                                <Icon icon={ChevronDown} className={`ml-2 h-4 w-4 transition ${categoryOpen ? 'rotate-180' : ''}`} />
                            </Button>

                            {categoryOpen && (
                                <Card className="absolute left-1/2 top-12 z-50 w-80 -translate-x-1/2 rounded-2xl border-gray-200 bg-white p-3 shadow-xl">
                                    <div className="mb-3 flex items-center justify-between border-b border-gray-100 pb-3">
                                        <div>
                                            <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-950">
                                                Multi Select
                                            </p>
                                            <p className="mt-1 text-xs text-gray-500">Pilih satu atau beberapa kategori</p>
                                        </div>
                                        {selectedCategorySlugs.length > 0 && (
                                            <button
                                                type="button"
                                                onClick={clearCategories}
                                                className="text-xs font-bold text-gray-500 underline underline-offset-4 hover:text-gray-950"
                                            >
                                                Clear
                                            </button>
                                        )}
                                    </div>

                                    <div className="grid gap-2">
                                        {categories.map((category) => {
                                            const checked = selectedCategorySlugs.includes(category.slug);

                                            return (
                                                <button
                                                    key={category.id}
                                                    type="button"
                                                    onClick={() => toggleCategory(category.slug)}
                                                    className={`flex items-center justify-between rounded-xl border px-3 py-3 text-left transition ${
                                                        checked
                                                            ? 'border-gray-950 bg-gray-950 text-white'
                                                            : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                                                    }`}
                                                >
                                                    <span className="text-sm font-semibold">{category.name}</span>
                                                    <span
                                                        className={`flex h-5 w-5 items-center justify-center rounded-md border text-xs ${
                                                            checked ? 'border-white bg-white text-gray-950' : 'border-gray-300 text-transparent'
                                                        }`}
                                                    >
                                                        {checked ? '✓' : ''}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </Card>
                            )}
                        </div>

                        <a href="#footer" className={navLinkClass}>
                            Contact
                        </a>
                    </nav>

                    <div className="flex flex-shrink-0 items-center gap-1 sm:gap-2">
                        <form
                            onSubmit={handleSearchSubmit}
                            className={`hidden items-center overflow-hidden rounded-full border border-gray-200 bg-gray-50 transition-all duration-300 lg:flex ${
                                searchOpen || searchQuery ? 'w-72 px-3' : 'w-11 border-transparent bg-transparent px-0'
                            }`}
                        >
                            <button
                                type="button"
                                onClick={() => setSearchOpen(true)}
                                className="flex h-11 w-11 flex-shrink-0 items-center justify-center text-gray-700 hover:text-gray-950"
                                aria-label="Open search"
                            >
                                <Icon icon={Search01Icon} className="h-5 w-5" />
                            </button>
                            <input
                                type="search"
                                value={searchQuery}
                                onChange={(event) => setSearchQuery(event.target.value)}
                                onFocus={() => setSearchOpen(true)}
                                placeholder="Search products..."
                                className="catalog-search-input min-w-0 flex-1 appearance-none border-0 bg-transparent py-2 text-sm text-gray-900 placeholder:text-gray-400 shadow-none outline-none ring-0 focus:border-transparent focus:outline-none focus:ring-0 [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none"
                            />
                        </form>

                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 rounded-full lg:hidden"
                            onClick={() => setSearchOpen(!searchOpen)}
                            aria-label="Toggle search"
                        >
                            <Icon icon={Search01Icon} className="h-5 w-5" />
                        </Button>
                        <Button type="button" variant="ghost" size="icon" className="hidden rounded-full sm:inline-flex">
                            <Icon icon={FavouriteIcon} className="h-5 w-5" />
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => setCartOpen(true)}
                            className="relative h-10 w-10 rounded-full"
                            aria-label="Open shopping cart"
                        >
                            <Icon icon={ShoppingCart01Icon} className="h-5 w-5" />
                            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gray-950 px-1 text-[10px] font-bold text-white">
                                {cartCount}
                            </span>
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="h-10 w-10 rounded-full lg:hidden"
                            aria-label="Toggle navigation menu"
                        >
                            {mobileMenuOpen ? <Icon icon={Cancel01Icon} className="h-5 w-5" /> : <Icon icon={Menu01Icon} className="h-5 w-5" />}
                        </Button>
                    </div>
                </div>

                {searchOpen && (
                    <form onSubmit={handleSearchSubmit} className="border-t border-gray-100 py-3 lg:hidden">
                        <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2">
                            <Icon icon={Search01Icon} className="h-4 w-4 text-gray-500" />
                            <input
                                type="search"
                                value={searchQuery}
                                onChange={(event) => setSearchQuery(event.target.value)}
                                placeholder="Search products..."
                                className="catalog-search-input min-w-0 flex-1 appearance-none border-0 bg-transparent text-sm text-gray-900 shadow-none outline-none ring-0 focus:border-transparent focus:outline-none focus:ring-0 [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none"
                                autoFocus
                            />
                            <button type="submit" className="text-xs font-black uppercase tracking-wide text-gray-900">
                                Search
                            </button>
                        </div>
                    </form>
                )}

                {mobileMenuOpen && (
                    <Card className="mb-4 rounded-2xl border-gray-200 bg-white p-3 shadow-sm lg:hidden">
                        <Link href={route('catalog.index')} className="block rounded-xl px-4 py-3 text-sm font-bold text-gray-900 hover:bg-gray-50">
                            Home
                        </Link>
                        <div className="mt-2 border-t border-gray-100 pt-2">
                            <p className="px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-gray-400">Categories</p>
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    type="button"
                                    onClick={() => toggleCategory(category.slug)}
                                    className="block w-full rounded-xl px-4 py-3 text-left text-sm font-semibold text-gray-700 hover:bg-gray-50"
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                        <a href="#footer" className="mt-2 block rounded-xl px-4 py-3 text-sm font-bold text-gray-900 hover:bg-gray-50">
                            Contact
                        </a>
                    </Card>
                )}
            </div>

            <CartDrawer
                open={cartOpen}
                onClose={() => setCartOpen(false)}
                items={cartItems}
                onItemsChange={setCartItems}
            />
        </header>
    );
}
