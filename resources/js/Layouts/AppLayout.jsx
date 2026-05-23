import { Link } from '@inertiajs/react';

export default function AppLayout({ children }) {
    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <Link href="/" className="flex items-center">
                            <span className="text-2xl font-bold text-blue-600">CatalogApp</span>
                        </Link>

                        {/* Menu */}
                        <div className="flex items-center gap-8">
                            <Link
                                href={route('catalog.index')}
                                className="text-gray-700 hover:text-blue-600 font-medium transition"
                            >
                                Katalog
                            </Link>
                            <Link
                                href={route('dashboard')}
                                className="text-gray-700 hover:text-blue-600 font-medium transition"
                            >
                                Dashboard
                            </Link>
                            <Link
                                href={route('profile.edit')}
                                className="text-gray-700 hover:text-blue-600 font-medium transition"
                            >
                                Profil
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main>
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-300 py-12 mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <h3 className="text-white font-bold mb-4">CatalogApp</h3>
                            <p className="text-sm">Platform belanja online terpercaya dengan produk berkualitas</p>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-4">Kategori</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link href={route('catalog.index')} className="hover:text-white transition">Semua Produk</Link></li>
                                <li><Link href={route('catalog.category', 'elektronik')} className="hover:text-white transition">Elektronik</Link></li>
                                <li><Link href={route('catalog.category', 'fashion')} className="hover:text-white transition">Fashion</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-4">Bantuan</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-white transition">Hubungi Kami</a></li>
                                <li><a href="#" className="hover:text-white transition">FAQ</a></li>
                                <li><a href="#" className="hover:text-white transition">Pengiriman</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-4">Legal</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-white transition">Kebijakan Privasi</a></li>
                                <li><a href="#" className="hover:text-white transition">Syarat & Ketentuan</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-8 text-center text-sm">
                        <p>&copy; 2026 CatalogApp. Semua hak dilindungi.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
