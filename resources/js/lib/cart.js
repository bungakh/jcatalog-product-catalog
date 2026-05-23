const CART_STORAGE_KEY = 'catalog_cart_items';
export const CART_UPDATED_EVENT = 'catalog-cart-updated';

const isBrowser = () => typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

export function getCartItems() {
    if (!isBrowser()) return [];

    try {
        const raw = window.localStorage.getItem(CART_STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        console.warn('Failed to read cart items:', error);
        return [];
    }
}

export function saveCartItems(items) {
    if (!isBrowser()) return [];

    const sanitizedItems = items
        .filter((item) => item && item.id)
        .map((item) => ({
            ...item,
            quantity: Math.max(1, Number(item.quantity || 1)),
        }));

    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(sanitizedItems));
    window.dispatchEvent(new CustomEvent(CART_UPDATED_EVENT, { detail: sanitizedItems }));

    return sanitizedItems;
}

export function normalizeProductForCart(product, quantity = 1) {
    const image = product.thumbnail || product.image || null;

    return {
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: Number(product.price || 0),
        image,
        category: product.category?.name || 'Uncategorized',
        stock: Number(product.stock || 0),
        quantity: Math.max(1, Number(quantity || 1)),
    };
}

export function addToCart(product, quantity = 1) {
    const cartItem = normalizeProductForCart(product, quantity);
    const items = getCartItems();
    const existingIndex = items.findIndex((item) => item.id === cartItem.id);

    if (existingIndex >= 0) {
        const existing = items[existingIndex];
        const nextQuantity = Math.min(
            Number(existing.stock || cartItem.stock || 999),
            Number(existing.quantity || 1) + cartItem.quantity
        );

        items[existingIndex] = {
            ...existing,
            ...cartItem,
            quantity: nextQuantity,
        };
    } else {
        items.push(cartItem);
    }

    return saveCartItems(items);
}

export function updateCartItemQuantity(productId, quantity) {
    const nextQuantity = Number(quantity || 1);
    const items = getCartItems().map((item) => {
        if (item.id !== productId) return item;

        return {
            ...item,
            quantity: Math.max(1, Math.min(Number(item.stock || 999), nextQuantity)),
        };
    });

    return saveCartItems(items);
}

export function removeCartItem(productId) {
    return saveCartItems(getCartItems().filter((item) => item.id !== productId));
}

export function clearCart() {
    return saveCartItems([]);
}

export function getCartCount(items = getCartItems()) {
    return items.reduce((total, item) => total + Number(item.quantity || 0), 0);
}

export function getCartTotal(items = getCartItems()) {
    return items.reduce((total, item) => total + Number(item.price || 0) * Number(item.quantity || 0), 0);
}

export function formatCartPrice(price) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(Number(price || 0));
}

export function buildWhatsAppOrderMessage(items = getCartItems()) {
    const totalItems = getCartCount(items);
    const totalPrice = getCartTotal(items);
    const currentUrl = isBrowser() ? window.location.origin : '';

    const productLines = items
        .map((item, index) => {
            const quantity = Number(item.quantity || 1);
            const price = Number(item.price || 0);
            const subtotal = price * quantity;
            const productUrl = currentUrl && item.slug ? `${currentUrl}/product/${item.slug}` : '';

            return [
                `${index + 1}. ${item.name}`,
                `   Kategori: ${item.category || '-'}`,
                `   Qty: ${quantity}`,
                `   Harga: ${formatCartPrice(price)}`,
                `   Subtotal: ${formatCartPrice(subtotal)}`,
                productUrl ? `   Link: ${productUrl}` : null,
            ]
                .filter(Boolean)
                .join('\n');
        })
        .join('\n\n');

    return [
        'Halo Admin, saya ingin order produk berikut:',
        '',
        productLines,
        '',
        `Total Item: ${totalItems}`,
        `Total Belanja: ${formatCartPrice(totalPrice)}`,
        '',
        'Nama: ',
        'Alamat: ',
        'Catatan: ',
    ].join('\n');
}

export function buildWhatsAppCheckoutUrl(items = getCartItems()) {
    const phoneNumber = String(import.meta.env.VITE_STORE_WHATSAPP_NUMBER || '').replace(/\D/g, '');
    const encodedMessage = encodeURIComponent(buildWhatsAppOrderMessage(items));

    if (phoneNumber) {
        return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    }

    return `https://wa.me/?text=${encodedMessage}`;
}
