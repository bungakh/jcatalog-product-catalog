import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import { Card } from '@/Components/ui/card';

const sections = [
    {
        number: '01',
        title: 'Tentang JCatalog',
        paragraphs: [
            'JCatalog adalah website katalog produk yang menampilkan informasi produk, kategori, harga, gambar, dan detail produk untuk membantu pelanggan memilih produk dengan mudah.',
            'Website ini berfungsi sebagai storefront katalog dan sarana komunikasi pemesanan melalui WhatsApp.',
        ],
        bullets: [
            'Menampilkan daftar produk dan kategori',
            'Menyediakan pencarian dan filter produk',
            'Menampilkan detail produk, harga, dan deskripsi',
            'Menyediakan keranjang belanja lokal di perangkat pengguna',
            'Mengarahkan checkout atau konsultasi produk melalui WhatsApp admin',
        ],
    },
    {
        number: '02',
        title: 'Penggunaan Website',
        paragraphs: ['Dengan menggunakan website JCatalog, pengguna setuju untuk menggunakan layanan secara wajar dan bertanggung jawab. Pengguna tidak diperkenankan:'],
        bullets: [
            'Menggunakan website untuk aktivitas yang melanggar hukum',
            'Mengirim spam, konten palsu, atau informasi yang merugikan pihak lain',
            'Mencoba mengakses area admin, sistem, database, atau data yang tidak berhak diakses',
            'Menyalin, memodifikasi, atau menyalahgunakan konten website tanpa izin',
        ],
        closing: 'Apabila ditemukan aktivitas yang merugikan sistem atau pengguna lain, JCatalog berhak membatasi akses dan mengambil tindakan yang diperlukan sesuai ketentuan hukum yang berlaku.',
    },
    {
        number: '03',
        title: 'Informasi Produk',
        paragraphs: [
            'JCatalog berupaya menampilkan informasi produk secara akurat, termasuk nama produk, deskripsi, kategori, gambar, dan harga.',
            'Namun informasi produk dapat berubah sewaktu-waktu mengikuti stok, pembaruan harga, promo, atau kebijakan penjual.',
        ],
        bullets: [
            'Gambar produk dapat berbeda karena pencahayaan, layar perangkat, atau variasi produk',
            'Harga dan ketersediaan stok perlu dikonfirmasi kembali kepada admin sebelum pembelian',
            'Promo atau penawaran khusus hanya berlaku sesuai periode dan ketentuan yang diinformasikan',
        ],
    },
    {
        number: '04',
        title: 'Keranjang dan Checkout WhatsApp',
        paragraphs: [
            'Fitur keranjang pada JCatalog disimpan secara lokal di perangkat/browser pengguna. Data keranjang tidak menjadi bukti transaksi sampai pengguna menghubungi admin dan mendapatkan konfirmasi.',
            'Checkout dilakukan dengan mengirim ringkasan pesanan ke WhatsApp admin untuk proses konfirmasi produk, stok, harga akhir, ongkos kirim, dan metode pembayaran.',
        ],
        bullets: [
            'Pesanan dianggap masuk setelah pengguna mengirim pesan ke WhatsApp admin',
            'Admin akan melakukan konfirmasi ketersediaan produk dan detail pembayaran',
            'Kesalahan input jumlah, catatan, atau alamat menjadi tanggung jawab pengguna sampai dikonfirmasi ulang',
        ],
    },
    {
        number: '05',
        title: 'Pembayaran, Pengiriman, dan Pembatalan',
        paragraphs: [
            'Pembayaran, pengiriman, dan pembatalan pesanan mengikuti kesepakatan antara pengguna dan admin melalui WhatsApp atau kanal komunikasi resmi lainnya.',
            'JCatalog dapat menampilkan katalog dan membantu proses pemesanan, tetapi detail akhir transaksi tetap dikonfirmasi oleh admin.',
        ],
        bullets: [
            'Biaya produk, ongkos kirim, dan biaya tambahan akan diinformasikan sebelum transaksi diproses',
            'Estimasi pengiriman dapat berubah karena lokasi, jasa ekspedisi, cuaca, hari libur, atau kondisi operasional',
            'Pembatalan pesanan mengikuti status pemrosesan dan kesepakatan dengan admin',
        ],
    },
    {
        number: '06',
        title: 'Data Pengguna dan Privasi',
        paragraphs: [
            'Data yang diberikan pengguna seperti nama, nomor WhatsApp, alamat pengiriman, dan detail pesanan hanya digunakan untuk kebutuhan komunikasi, pemrosesan pesanan, dan layanan pelanggan.',
            'JCatalog tidak menjual data pribadi pengguna kepada pihak lain tanpa izin, kecuali jika diwajibkan oleh hukum atau diperlukan untuk proses layanan seperti pengiriman.',
        ],
    },
    {
        number: '07',
        title: 'Hak Kekayaan Intelektual',
        paragraphs: ['Seluruh elemen pada website JCatalog merupakan bagian dari identitas dan konten website, termasuk namun tidak terbatas pada:'],
        bullets: ['Logo dan nama website', 'Desain halaman', 'Teks dan copywriting', 'Foto atau gambar produk', 'Komponen UI dan tampilan katalog'],
        closing: 'Konten tersebut tidak boleh digunakan ulang, disalin, atau didistribusikan untuk kepentingan komersial tanpa izin tertulis dari pemilik website.',
    },
    {
        number: '08',
        title: 'Batas Tanggung Jawab',
        paragraphs: ['JCatalog berusaha menyediakan website yang aman, informatif, dan mudah digunakan. Namun JCatalog tidak bertanggung jawab atas:'],
        bullets: [
            'Gangguan teknis, downtime, atau kesalahan tampilan karena perangkat, jaringan, atau browser pengguna',
            'Kerugian akibat penggunaan website di luar ketentuan',
            'Kesalahan data yang dikirimkan pengguna saat melakukan pemesanan',
            'Perubahan harga, stok, atau informasi produk sebelum transaksi dikonfirmasi admin',
        ],
    },
    {
        number: '09',
        title: 'Perubahan Ketentuan',
        paragraphs: [
            'JCatalog berhak memperbarui Terms & Services ini kapan saja untuk menyesuaikan fitur, layanan, kebijakan, atau kebutuhan operasional website.',
            'Versi terbaru akan ditampilkan pada halaman ini dan berlaku sejak dipublikasikan.',
        ],
    },
    {
        number: '10',
        title: 'Kontak',
        paragraphs: [
            'Apabila ada pertanyaan terkait produk, pesanan, atau Terms & Services ini, pengguna dapat menghubungi admin melalui tombol WhatsApp atau informasi kontak yang tersedia di website JCatalog.',
        ],
    },
];

export default function TermsAndService({ categories = [] }) {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-950">
            <Head title="Terms & Services" />
            <Header categories={categories} />

            <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
                <section className="overflow-hidden rounded-[2rem] bg-gray-950 text-white shadow-2xl shadow-gray-950/10">
                    <div className="relative px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
                        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
                        <div className="absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
                        <div className="relative max-w-3xl">
                            <p className="mb-4 text-xs font-black uppercase tracking-[0.32em] text-white/45">
                                Legal Information
                            </p>
                            <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                                Terms & Services
                            </h1>
                            <p className="mt-6 text-base leading-8 text-white/70 sm:text-lg">
                                Selamat datang di JCatalog. Dengan mengakses dan menggunakan website ini, Anda dianggap telah membaca, memahami, dan menyetujui syarat dan ketentuan layanan katalog produk berikut.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="mt-8 grid gap-5">
                    {sections.map((section) => (
                        <Card key={section.number} className="rounded-[1.75rem] border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                            <div className="grid gap-5 md:grid-cols-[5rem_1fr]">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-950 text-sm font-black text-white">
                                    {section.number}
                                </div>
                                <div>
                                    <h2 className="text-xl font-black tracking-tight text-gray-950 sm:text-2xl">
                                        {section.title}
                                    </h2>
                                    <div className="mt-4 space-y-3 text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
                                        {section.paragraphs?.map((paragraph) => (
                                            <p key={paragraph}>{paragraph}</p>
                                        ))}
                                        {section.bullets && (
                                            <ul className="grid gap-2 pt-1">
                                                {section.bullets.map((item) => (
                                                    <li key={item} className="flex gap-3">
                                                        <span className="mt-3 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-950" />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                        {section.closing && <p>{section.closing}</p>}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </section>

                <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-[1.5rem] border border-gray-200 bg-white px-6 py-5 shadow-sm">
                    <p className="text-sm font-semibold text-gray-600">
                        Kembali ke katalog produk untuk melihat pilihan terbaru.
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center rounded-full bg-gray-950 px-6 py-3 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:bg-gray-800"
                    >
                        Lihat Katalog
                    </Link>
                </div>
            </main>

            <Footer />
        </div>
    );
}
