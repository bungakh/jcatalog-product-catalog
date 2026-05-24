import React, { useMemo, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft01Icon,
    CheckmarkCircle01Icon,
    FavouriteIcon,
    Image01Icon,
    Message01Icon,
    MinusSignIcon,
    PlusSignIcon,
    Shield01Icon,
    ShoppingBag01Icon,
    StarIcon,
    TruckIcon,
} from '@hugeicons/core-free-icons';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import ProductCard from '@/Components/ProductCard';
import { Button } from '@/Components/ui/button';
import { Card } from '@/Components/ui/card';
import { Icon } from '@/Components/ui/icon';
import { addToCart } from '@/lib/cart';

export default function CatalogShow({ product, relatedProducts = [], categories = [], meta = null }) {
    const [quantity, setQuantity] = useState(1);
    const [liked, setLiked] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [added, setAdded] = useState(false);

    const imageUrl = product.image ? `/storage/${product.image}` : null;
    const rating = Number(product.rating || 4);
    const isAvailable = product.stock > 0;

    const formattedPrice = useMemo(() => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(product.price || 0);
    }, [product.price]);

    const productShareUrl = useMemo(() => {
        if (typeof window === 'undefined') return meta?.url || '';

        const url = new URL(meta?.url || window.location.href, window.location.origin);
        url.searchParams.set('preview', `wa-${product.id}`);

        return url.toString();
    }, [meta?.url, product.id]);

    const whatsappMessage = encodeURIComponent(
        `Halo Admin, saya ingin pesan produk berikut:\n\n` +
            `Nama: ${product.name}\n` +
            `Kategori: ${product.category?.name || '-'}\n` +
            `Qty: ${quantity}\n` +
            `Harga: ${formattedPrice}\n` +
            `Subtotal: ${new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
            }).format((product.price || 0) * quantity)}\n` +
            `Link: ${productShareUrl}\n\n` +
            `Nama Pembeli: \n` +
            `Alamat: \n` +
            `Catatan: `
    );

    const storeWhatsappNumber = String(import.meta.env.VITE_STORE_WHATSAPP_NUMBER || '').replace(/\D/g, '');
    const whatsappUrl = storeWhatsappNumber
        ? `https://wa.me/${storeWhatsappNumber}?text=${whatsappMessage}`
        : `https://wa.me/?text=${whatsappMessage}`;

    const decreaseQty = () => setQuantity((value) => Math.max(1, value - 1));
    const increaseQty = () => setQuantity((value) => Math.min(product.stock || 1, value + 1));
    const handleAddToCart = () => {
        if (!isAvailable) return;

        addToCart(product, quantity);
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1400);
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-950">
            <Head title={product.name}>
                {meta?.description && <meta name="description" content={meta.description} />}
                {meta?.url && <link rel="canonical" href={meta.url} />}
                {meta?.title && <meta property="og:title" content={meta.title} />}
                {meta?.description && <meta property="og:description" content={meta.description} />}
                {meta?.url && <meta property="og:url" content={meta.url} />}
                {meta?.image && <meta property="og:image" content={meta.image} />}
                {meta?.image && <meta property="og:image:secure_url" content={meta.image} />}
                {meta?.image_type && <meta property="og:image:type" content={meta.image_type} />}
                {meta?.image_width && <meta property="og:image:width" content={String(meta.image_width)} />}
                {meta?.image_height && <meta property="og:image:height" content={String(meta.image_height)} />}
                {meta?.image_alt && <meta property="og:image:alt" content={meta.image_alt} />}
                <meta property="og:type" content={meta?.type || 'product'} />
                <meta property="og:site_name" content={meta?.site_name || 'JCatalog'} />
                <meta name="twitter:card" content="summary_large_image" />
                {meta?.title && <meta name="twitter:title" content={meta.title} />}
                {meta?.description && <meta name="twitter:description" content={meta.description} />}
                {meta?.image && <meta name="twitter:image" content={meta.image} />}
            </Head>
            <Header categories={categories} />

            <main>
                {/* Top Detail Hero */}
                <section className="border-b border-gray-200 bg-gradient-to-br from-white via-gray-50 to-gray-100">
                    <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
                        <div className="mb-8 flex flex-wrap items-center gap-2 text-sm text-gray-500">
                            <Link href={route('catalog.index')} className="hover:text-gray-900 transition">
                                Home
                            </Link>
                            <span>/</span>
                            {product.category?.slug ? (
                                <Link
                                    href={route('catalog.category', product.category.slug)}
                                    className="hover:text-gray-900 transition"
                                >
                                    {product.category.name}
                                </Link>
                            ) : (
                                <span>{product.category?.name || 'Category'}</span>
                            )}
                            <span>/</span>
                            <span className="font-semibold text-gray-900 line-clamp-1">{product.name}</span>
                        </div>

                        <Link
                            href={route('catalog.index')}
                            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-gray-950 transition"
                        >
                            <Icon icon={ArrowLeft01Icon} className="h-4 w-4" />
                            Back to Home
                        </Link>

                        <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
                            {/* Product Image */}
                            <Card className="overflow-hidden rounded-2xl border-gray-200 bg-white shadow-sm">
                                <div className="relative aspect-square bg-gray-100 lg:aspect-[5/4]">
                                    {imageUrl && !imageError ? (
                                        <>
                                            {!imageLoaded && (
                                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gray-100 animate-pulse">
                                                    <div className="h-12 w-12 rounded-full border-4 border-gray-200 border-t-gray-600 animate-spin" />
                                                    <span className="text-sm font-medium text-gray-500">Loading product image</span>
                                                </div>
                                            )}
                                            <img
                                                src={imageUrl}
                                                alt={product.name}
                                                loading="eager"
                                                decoding="async"
                                                onLoad={() => setImageLoaded(true)}
                                                onError={() => setImageError(true)}
                                                className={`h-full w-full object-cover transition-all duration-700 ${
                                                    imageLoaded ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-sm scale-105'
                                                }`}
                                            />
                                        </>
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center text-gray-400">
                                            <Icon icon={Image01Icon} className="h-20 w-20" />
                                        </div>
                                    )}

                                    <div className="absolute left-5 top-5 rounded-full bg-gray-950 px-4 py-2 text-xs font-bold uppercase tracking-wide text-white">
                                        {product.category?.name || 'Uncategorized'}
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => setLiked((value) => !value)}
                                        className="absolute right-5 top-5 rounded-full bg-white/95 p-3 shadow-sm transition hover:bg-white"
                                        aria-label="Toggle wishlist"
                                    >
                                        <Icon icon={FavouriteIcon} className={`h-5 w-5 ${liked ? 'text-red-500' : 'text-gray-700'}`} />
                                    </button>
                                </div>
                            </Card>

                            {/* Product Info */}
                            <div className="lg:sticky lg:top-8">
                                <div className="mb-4 flex items-center gap-2">
                                    <span className="rounded-full bg-gray-950 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                                        New Collection
                                    </span>
                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                                            isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                        }`}
                                    >
                                        {isAvailable ? `Stock: ${product.stock}` : 'Out of Stock'}
                                    </span>
                                </div>

                                <h1 className="text-4xl font-black leading-tight tracking-tight text-gray-950 md:text-5xl">
                                    {product.name}
                                </h1>

                                <div className="mt-5 flex items-center gap-3">
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, index) => (
                                            <Icon
                                                icon={StarIcon}
                                                key={index}
                                                className={`h-5 w-5 ${
                                                    index < Math.round(rating)
                                                        ? 'text-yellow-400'
                                                        : 'text-gray-300'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm font-medium text-gray-500">({rating.toFixed(1)}) Customer Rating</span>
                                </div>

                                <div className="mt-6 flex flex-wrap items-end gap-4">
                                    <p className="text-4xl font-black text-gray-950">{formattedPrice}</p>
                                    <p className="pb-1 text-sm text-gray-500">Tax included • Ready to order</p>
                                </div>

                                <div className="mt-8 border-y border-gray-200 py-6">
                                    <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-gray-500">
                                        Product Description
                                    </h2>
                                    <p className="leading-8 text-gray-700">
                                        {product.description ||
                                            'Product pilihan dengan kualitas terbaik, cocok untuk kebutuhan harian maupun koleksi catalog modern Anda.'}
                                    </p>
                                </div>

                                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                                    <div className="rounded-xl border border-gray-200 bg-white p-4">
                                        <Icon icon={TruckIcon} className="mb-2 h-5 w-5 text-gray-900" />
                                        <p className="text-sm font-bold">Fast Delivery</p>
                                        <p className="mt-1 text-xs text-gray-500">Siap dikirim</p>
                                    </div>
                                    <div className="rounded-xl border border-gray-200 bg-white p-4">
                                        <Icon icon={Shield01Icon} className="mb-2 h-5 w-5 text-gray-900" />
                                        <p className="text-sm font-bold">Quality Check</p>
                                        <p className="mt-1 text-xs text-gray-500">Admin verified</p>
                                    </div>
                                    <div className="rounded-xl border border-gray-200 bg-white p-4">
                                        <Icon icon={CheckmarkCircle01Icon} className="mb-2 h-5 w-5 text-gray-900" />
                                        <p className="text-sm font-bold">Original Stock</p>
                                        <p className="mt-1 text-xs text-gray-500">Available now</p>
                                    </div>
                                </div>

                                <Card className="mt-8 rounded-2xl border-gray-200 p-5 shadow-sm">
                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                        <div>
                                            <p className="text-sm font-bold uppercase tracking-wide text-gray-500">Quantity</p>
                                            <p className="mt-1 text-sm text-gray-500">Maksimal {product.stock || 0} item</p>
                                        </div>

                                        <div className="flex w-fit items-center rounded-full border border-gray-300 bg-white p-1">
                                            <button
                                                type="button"
                                                onClick={decreaseQty}
                                                disabled={!isAvailable || quantity <= 1}
                                                className="rounded-full p-3 text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                                            >
                                                <Icon icon={MinusSignIcon} className="h-4 w-4" />
                                            </button>
                                            <span className="w-12 text-center text-sm font-bold">{quantity}</span>
                                            <button
                                                type="button"
                                                onClick={increaseQty}
                                                disabled={!isAvailable || quantity >= product.stock}
                                                className="rounded-full p-3 text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                                            >
                                                <Icon icon={PlusSignIcon} className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                                        <Button
                                            disabled={!isAvailable}
                                            className={`h-12 rounded-full text-white disabled:bg-gray-300 disabled:text-gray-500 ${
                                                added ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-950 hover:bg-gray-800'
                                            }`}
                                            onClick={handleAddToCart}
                                        >
                                            <Icon icon={ShoppingBag01Icon} className="mr-2 h-4 w-4" />
                                            {added ? 'Added to Cart' : 'Add to Cart'}
                                        </Button>

                                        <a
                                            href={whatsappUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className={`inline-flex h-12 items-center justify-center rounded-full border border-gray-950 px-5 text-sm font-semibold transition ${
                                                isAvailable
                                                    ? 'bg-white text-gray-950 hover:bg-gray-950 hover:text-white'
                                                    : 'pointer-events-none border-gray-300 text-gray-400'
                                            }`}
                                        >
                                            <Icon icon={Message01Icon} className="mr-2 h-4 w-4" />
                                            Order WhatsApp
                                        </a>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Related Products */}
                <section className="max-w-7xl mx-auto px-4 py-16 lg:py-20">
                    <div className="mb-8 flex flex-col justify-between gap-4 border-b border-gray-200 pb-6 sm:flex-row sm:items-end">
                        <div>
                            <p className="text-sm font-bold uppercase tracking-[0.25em] text-gray-500">You may also like</p>
                            <h2 className="mt-2 text-3xl font-black tracking-tight text-gray-950 md:text-4xl">
                                Related Products
                            </h2>
                        </div>
                        <Link
                            href={route('catalog.index')}
                            className="text-sm font-bold uppercase tracking-wide text-gray-900 hover:text-gray-600"
                        >
                            Explore All Products →
                        </Link>
                    </div>

                    {relatedProducts.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {relatedProducts.map((relatedProduct) => (
                                <ProductCard key={relatedProduct.id} product={relatedProduct} />
                            ))}
                        </div>
                    ) : (
                        <Card className="rounded-2xl border-dashed border-gray-300 p-10 text-center">
                            <p className="text-gray-500">Belum ada produk sejenis untuk kategori ini.</p>
                        </Card>
                    )}
                </section>
            </main>

            <Footer />
        </div>
    );
}
