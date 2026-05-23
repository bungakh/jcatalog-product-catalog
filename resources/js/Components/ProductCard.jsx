import React from 'react';
import { Link } from '@inertiajs/react';
import { FavouriteIcon, Image01Icon, ShoppingBag01Icon, StarIcon } from '@hugeicons/core-free-icons';
import { Card } from '@/Components/ui/card';
import { Icon } from '@/Components/ui/icon';
import { addToCart } from '@/lib/cart';

export default function ProductCard({ product }) {
    const [liked, setLiked] = React.useState(false);
    const [imageLoaded, setImageLoaded] = React.useState(false);
    const [imageError, setImageError] = React.useState(false);
    const [added, setAdded] = React.useState(false);

    const imageUrl = product.thumbnail
        ? `/storage/${product.thumbnail}`
        : product.image
        ? `/storage/${product.image}`
        : null;

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const handleAddToCart = (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (product.stock <= 0) return;

        addToCart(product, 1);
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1400);
    };

    return (
        <Link href={route('catalog.show', product.slug)}>
            <Card className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200/70 transition-all duration-300 hover:shadow-lg sm:rounded-lg">
                {/* Image Container */}
                <div className="relative h-32 flex-shrink-0 overflow-hidden bg-gray-200 sm:h-64">
                    {imageUrl && !imageError ? (
                        <>
                            {!imageLoaded && (
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse">
                                    <div className="h-12 w-12 rounded-full border-4 border-gray-200 border-t-gray-500 animate-spin" />
                                </div>
                            )}
                            <img
                                src={imageUrl}
                                alt={product.name}
                                loading="lazy"
                                decoding="async"
                                onLoad={() => setImageLoaded(true)}
                                onError={() => setImageError(true)}
                                className={`w-full h-full object-cover group-hover:scale-110 transition-all duration-500 ${
                                    imageLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'
                                }`}
                            />
                        </>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <Icon icon={Image01Icon} className="w-16 h-16" />
                        </div>
                    )}

                    {/* Category Badge */}
                    <div className="absolute right-2 top-2 sm:right-3 sm:top-3">
                        <span className="inline-block max-w-[82px] truncate rounded-full bg-gray-950 px-2 py-0.5 text-[9px] font-semibold text-white sm:max-w-none sm:px-3 sm:py-1 sm:text-xs">
                            {product.category?.name || 'Uncategorized'}
                        </span>
                    </div>

                    {/* Wishlist Button */}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setLiked(!liked);
                        }}
                        className="absolute left-2 top-2 rounded-full bg-white/95 p-1.5 shadow-sm transition-colors hover:bg-gray-100 sm:left-3 sm:top-3 sm:p-2"
                    >
                        <Icon
                            icon={FavouriteIcon}
                            className={`h-4 w-4 sm:h-5 sm:w-5 ${
                                liked ? 'text-red-500' : 'text-gray-700'
                            }`}
                        />
                    </button>
                </div>

                {/* Content */}
                <div className="flex flex-grow flex-col p-2.5 sm:p-4">
                    {/* Product Name */}
                    <h3 className="line-clamp-2 min-h-[34px] text-[12px] font-bold leading-snug text-gray-900 transition group-hover:text-gray-700 sm:min-h-0 sm:text-sm">
                        {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="mt-1.5 mb-1.5 hidden items-center gap-0.5 sm:mb-3 sm:mt-2 sm:flex sm:gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Icon
                                icon={StarIcon}
                                key={i}
                                className={`h-3 w-3 sm:h-4 sm:w-4 ${
                                    i < 4 ? 'text-yellow-400' : 'text-gray-300'
                                }`}
                            />
                        ))}
                        <span className="ml-1 text-[10px] text-gray-500 sm:text-xs">(4.0)</span>
                    </div>

                    {/* Price */}
                    <div className="mb-2 flex-grow sm:mb-3">
                        <p className="text-[14px] font-black leading-tight text-gray-950 sm:text-2xl">
                            {formatPrice(product.price)}
                        </p>
                    </div>

                    {/* Stock Status */}
                    <div className="border-t border-gray-100 pt-2 sm:border-gray-200 sm:pt-3">
                        <div className="mb-2 flex items-center justify-between gap-2 sm:mb-3">
                            <span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold sm:py-1 sm:text-xs ${
                                product.stock > 20
                                    ? 'bg-green-100 text-green-700'
                                    : product.stock > 0
                                    ? 'bg-yellow-100 text-yellow-700'
                                    : 'bg-red-100 text-red-700'
                            }`}>
                                {product.stock > 0 ? `Stock: ${product.stock}` : 'Out of Stock'}
                            </span>
                            <span className="hidden text-xs font-semibold text-gray-900 transition hover:text-gray-700 sm:inline">
                                View Details →
                            </span>
                        </div>

                        <button
                            type="button"
                            onClick={handleAddToCart}
                            disabled={product.stock <= 0}
                            className={`inline-flex w-full items-center justify-center rounded-full px-2.5 py-2 text-[10px] font-bold uppercase tracking-wide transition sm:px-4 sm:text-xs ${
                                product.stock > 0
                                    ? added
                                        ? 'bg-green-600 text-white'
                                        : 'bg-gray-950 text-white hover:bg-gray-800'
                                    : 'cursor-not-allowed bg-gray-200 text-gray-500'
                            }`}
                        >
                            <Icon icon={ShoppingBag01Icon} className="mr-1 h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4" />
                            <span className="sm:hidden">{added ? 'Added' : 'Cart'}</span>
                            <span className="hidden sm:inline">{added ? 'Added to Cart' : 'Add to Cart'}</span>
                        </button>
                    </div>
                </div>
            </Card>
        </Link>
    );
}
