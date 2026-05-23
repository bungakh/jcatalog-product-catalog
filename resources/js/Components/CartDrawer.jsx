import React from 'react';
import { Link } from '@inertiajs/react';
import { Cancel01Icon, Delete02Icon, MinusSignIcon, PlusSignIcon, ShoppingBag01Icon } from '@hugeicons/core-free-icons';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/Components/ui/card';
import { Icon } from '@/Components/ui/icon';
import {
    buildWhatsAppCheckoutUrl,
    clearCart,
    getCartCount,
    getCartTotal,
    removeCartItem,
    updateCartItemQuantity,
} from '@/lib/cart';

const formatPrice = (price) =>
    new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(price || 0);

export default function CartDrawer({ open, onClose, items = [], onItemsChange }) {
    const totalItems = getCartCount(items);
    const totalPrice = getCartTotal(items);

    React.useEffect(() => {
        if (typeof document === 'undefined') return;

        document.documentElement.classList.toggle('cart-drawer-open', open);
        document.body.classList.toggle('cart-drawer-open', open);

        return () => {
            document.documentElement.classList.remove('cart-drawer-open');
            document.body.classList.remove('cart-drawer-open');
        };
    }, [open]);

    const handleQuantityChange = (productId, quantity) => {
        const updatedItems = updateCartItemQuantity(productId, quantity);
        onItemsChange?.(updatedItems);
    };

    const handleRemove = (productId) => {
        const updatedItems = removeCartItem(productId);
        onItemsChange?.(updatedItems);
    };

    const handleClear = () => {
        const updatedItems = clearCart();
        onItemsChange?.(updatedItems);
    };

    const handleCheckout = () => {
        if (!items.length) return;

        const checkoutUrl = buildWhatsAppCheckoutUrl(items);
        window.open(checkoutUrl, '_blank', 'noopener,noreferrer');
    };

    return (
        <>
            <div
                className={`fixed inset-0 z-[80] bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
                    open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
                }`}
                onClick={onClose}
            />

            <aside
                className={`fixed inset-y-0 right-0 z-[90] flex h-[100svh] w-[100dvw] max-w-full flex-col overflow-hidden bg-white shadow-2xl transition-transform duration-300 sm:max-w-md ${
                    open ? 'translate-x-0' : 'translate-x-full'
                }`}
                aria-hidden={!open}
            >
                <CardHeader className="flex-row items-center justify-between gap-3 space-y-0 border-b border-gray-200 px-4 py-4 sm:px-5">
                    <div className="min-w-0">
                        <p className="truncate text-[10px] font-bold uppercase tracking-[0.22em] text-gray-500 sm:text-xs sm:tracking-[0.25em]">
                            Shopping Cart
                        </p>
                        <h2 className="truncate text-lg font-black text-gray-950 sm:text-xl">{totalItems} item in cart</h2>
                    </div>
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        className="h-10 w-10 flex-shrink-0 rounded-full text-gray-600 hover:bg-gray-100 hover:text-gray-950"
                        aria-label="Close cart"
                    >
                        <Icon icon={Cancel01Icon} className="h-5 w-5" />
                    </Button>
                </CardHeader>

                {items.length > 0 ? (
                    <>
                        <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-5">
                            <div className="space-y-4">
                                {items.map((item) => {
                                    const imageUrl = item.image ? `/storage/${item.image}` : null;

                                    return (
                                        <Card key={item.id} className="rounded-3xl border-gray-200 bg-white shadow-sm ring-1 ring-black/5">
                                            <CardContent className="grid grid-cols-[88px_minmax(0,1fr)] items-center gap-3 p-3 sm:grid-cols-[96px_minmax(0,1fr)] sm:gap-4">
                                                <Link
                                                    href={route('catalog.show', item.slug)}
                                                    onClick={onClose}
                                                    className="flex aspect-square h-[88px] w-[88px] flex-shrink-0 self-center overflow-hidden rounded-2xl bg-gray-100 ring-1 ring-gray-100 sm:h-24 sm:w-24"
                                                >
                                                    {imageUrl ? (
                                                        <img
                                                            src={imageUrl}
                                                            alt={item.name}
                                                            className="block h-full w-full object-cover object-center"
                                                            loading="lazy"
                                                            decoding="async"
                                                        />
                                                    ) : (
                                                        <div className="flex h-full w-full items-center justify-center text-gray-400">
                                                            <Icon icon={ShoppingBag01Icon} className="h-7 w-7" />
                                                        </div>
                                                    )}
                                                </Link>

                                                <div className="flex min-w-0 flex-col justify-between gap-3">
                                                    <div className="flex min-w-0 items-start gap-2">
                                                        <div className="min-w-0 flex-1 pt-0.5">
                                                            <Link
                                                                href={route('catalog.show', item.slug)}
                                                                onClick={onClose}
                                                                className="line-clamp-2 text-sm font-black leading-5 text-gray-950 transition hover:text-gray-600"
                                                            >
                                                                {item.name}
                                                            </Link>
                                                            <p className="mt-1 truncate text-xs font-medium text-gray-500">{item.category}</p>
                                                            <p className="mt-1 text-xs text-gray-500">{formatPrice(item.price)} / item</p>
                                                        </div>
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => handleRemove(item.id)}
                                                            className="h-8 w-8 flex-shrink-0 rounded-full text-gray-400 hover:bg-red-50 hover:text-red-600"
                                                            aria-label={`Remove ${item.name}`}
                                                        >
                                                            <Icon icon={Delete02Icon} className="h-4 w-4" />
                                                        </Button>
                                                    </div>

                                                    <div className="flex items-center justify-between gap-3">
                                                        <div className="flex h-9 items-center rounded-full border border-gray-200 bg-gray-50 p-0.5 shadow-inner">
                                                            <Button
                                                                type="button"
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                                disabled={item.quantity <= 1}
                                                                className="h-8 w-8 rounded-full bg-white text-gray-600 shadow-sm hover:bg-gray-100 disabled:bg-transparent disabled:shadow-none disabled:opacity-40"
                                                            >
                                                                <Icon icon={MinusSignIcon} className="h-3 w-3" />
                                                            </Button>
                                                            <span className="w-8 text-center text-xs font-black text-gray-950">{item.quantity}</span>
                                                            <Button
                                                                type="button"
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                                disabled={item.stock && item.quantity >= item.stock}
                                                                className="h-8 w-8 rounded-full bg-white text-gray-600 shadow-sm hover:bg-gray-100 disabled:bg-transparent disabled:shadow-none disabled:opacity-40"
                                                            >
                                                                <Icon icon={PlusSignIcon} className="h-3 w-3" />
                                                            </Button>
                                                        </div>

                                                        <p className="min-w-0 text-right text-sm font-black text-gray-950">
                                                            {formatPrice(item.price * item.quantity)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>
                        </div>

                        <CardFooter className="block border-t border-gray-200 p-4 sm:p-5">
                            <div className="mb-4 rounded-3xl bg-gray-50 p-4 ring-1 ring-gray-100">
                                <div className="flex items-center justify-between gap-3">
                                    <span className="text-sm font-bold uppercase tracking-wide text-gray-500">Subtotal</span>
                                    <span className="text-right text-xl font-black text-gray-950 sm:text-2xl">{formatPrice(totalPrice)}</span>
                                </div>
                                <p className="mt-1 text-xs text-gray-500">Total {totalItems} item sebelum ongkir.</p>
                            </div>

                            <div className="grid gap-3">
                                <Button
                                    type="button"
                                    onClick={handleCheckout}
                                    className="h-12 rounded-full bg-green-600 text-white shadow-sm hover:bg-green-700"
                                >
                                    Checkout via WhatsApp
                                </Button>
                                <p className="text-center text-xs leading-5 text-gray-500">
                                    Pesanan akan dibuka di WhatsApp dengan detail produk dan total belanja otomatis.
                                </p>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={handleClear}
                                    className="h-10 rounded-full text-sm font-bold uppercase tracking-wide text-gray-500 hover:bg-red-50 hover:text-red-600"
                                >
                                    Clear cart
                                </Button>
                            </div>
                        </CardFooter>
                    </>
                ) : (
                    <div className="flex flex-1 flex-col items-center justify-center overflow-hidden px-5 text-center sm:px-8">
                        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-gray-500">
                            <Icon icon={ShoppingBag01Icon} className="h-9 w-9" />
                        </div>
                        <h3 className="text-xl font-black text-gray-950 sm:text-2xl">Your cart is empty</h3>
                        <p className="mt-2 max-w-xs text-sm leading-6 text-gray-500">
                            Tambahkan produk dari catalog untuk mulai membuat pesanan.
                        </p>
                        <Button onClick={onClose} className="mt-6 w-full max-w-xs rounded-full bg-gray-950 px-6 text-white hover:bg-gray-800 sm:w-auto sm:px-8">
                            Continue Shopping
                        </Button>
                    </div>
                )}
            </aside>
        </>
    );
}
