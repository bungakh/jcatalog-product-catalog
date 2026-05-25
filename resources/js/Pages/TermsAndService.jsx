import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import { Card } from '@/Components/ui/card';

const sections = [
    {
        number: '01',
        title: 'Tentang Layanan',
        paragraphs: [
            'LPKS Gemilang Putra Bangsa merupakan perusahaan jasa penyaluran dan pelatihan tenaga kerja yang membantu mempertemukan pengguna jasa dengan tenaga kerja sesuai kebutuhan dan ketentuan yang berlaku.',
            'Layanan kami dapat mencakup:',
        ],
        bullets: [
            'Rekrutmen tenaga kerja',
            'Pelatihan dan pembekalan kerja',
            'Penyaluran tenaga kerja',
            'Konsultasi kebutuhan tenaga kerja',
            'Pendampingan administrasi penempatan kerja',
        ],
    },
    {
        number: '02',
        title: 'Penggunaan Website',
        paragraphs: ['Pengguna website wajib:'],
        bullets: [
            'Menggunakan website secara wajar dan tidak melanggar hukum',
            'Tidak menyebarkan informasi palsu, spam, atau konten merugikan',
            'Tidak mencoba merusak sistem website atau mengambil data tanpa izin',
        ],
        closing: 'Segala aktivitas yang melanggar hukum dapat ditindak sesuai peraturan yang berlaku di Indonesia.',
    },
    {
        number: '03',
        title: 'Informasi dan Data Pengguna',
        paragraphs: [
            'Setiap data yang diberikan pengguna melalui formulir, WhatsApp, email, atau media lainnya akan dijaga kerahasiaannya dan hanya digunakan untuk kebutuhan layanan perusahaan.',
            'Kami tidak memperjualbelikan data pribadi pengguna kepada pihak lain tanpa izin pengguna, kecuali diwajibkan oleh hukum.',
        ],
    },
    {
        number: '04',
        title: 'Proses Penyaluran Tenaga Kerja',
        paragraphs: [
            'LPKS Gemilang Putra Bangsa berupaya melakukan seleksi dan pelatihan tenaga kerja secara profesional. Namun:',
        ],
        bullets: [
            'Penempatan kerja tetap mempertimbangkan kecocokan kebutuhan pengguna jasa',
            'Keputusan penerimaan akhir berada pada pihak pengguna jasa/perusahaan',
            'Kandidat wajib memberikan data dan dokumen yang benar',
        ],
        closing: 'Apabila ditemukan data palsu atau manipulasi dokumen, perusahaan berhak membatalkan proses kerja sama.',
    },
    {
        number: '05',
        title: 'Pembayaran dan Biaya Layanan',
        paragraphs: [
            'Biaya layanan, administrasi, atau pelatihan akan diinformasikan secara transparan kepada pengguna sebelum proses berjalan.',
            'Segala transaksi dilakukan berdasarkan kesepakatan kedua belah pihak.',
        ],
    },
    {
        number: '06',
        title: 'Hak Kekayaan Intelektual',
        paragraphs: ['Seluruh isi website seperti:'],
        bullets: ['Logo', 'Desain', 'Teks', 'Foto', 'Video', 'Materi pelatihan'],
        closing: 'Seluruh materi tersebut merupakan milik LPKS Gemilang Putra Bangsa dan tidak boleh digunakan kembali tanpa izin tertulis.',
    },
    {
        number: '07',
        title: 'Batas Tanggung Jawab',
        paragraphs: ['Kami berusaha memberikan layanan terbaik, namun tidak bertanggung jawab atas:'],
        bullets: [
            'Gangguan teknis website',
            'Kerugian akibat penggunaan website di luar ketentuan',
            'Kesalahan data yang diberikan pengguna',
            'Perselisihan di luar ruang lingkup kerja sama resmi perusahaan',
        ],
    },
    {
        number: '08',
        title: 'Perubahan Ketentuan',
        paragraphs: [
            'LPKS Gemilang Putra Bangsa berhak mengubah Terms & Services kapan saja tanpa pemberitahuan sebelumnya.',
            'Versi terbaru akan selalu tersedia di website resmi perusahaan.',
        ],
    },
    {
        number: '09',
        title: 'Kontak',
        paragraphs: [
            'Apabila ada pertanyaan terkait Terms & Services ini, silakan hubungi kami melalui website resmi LPKS Gemilang Putra Bangsa.',
            'Email dan nomor kontak resmi dapat dilihat pada halaman kontak website perusahaan.',
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
                                Selamat datang di lpksgemilangputrabangsa.com. Dengan mengakses dan menggunakan website ini, Anda dianggap telah membaca, memahami, dan menyetujui seluruh syarat dan ketentuan berikut.
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
