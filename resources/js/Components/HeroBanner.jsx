import React from 'react';
import { Button } from '@/Components/ui/button';

export default function HeroBanner() {
    return (
        <section className="relative w-full overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-100 via-gray-200 to-slate-300 px-6 py-8 shadow-sm sm:px-10 sm:py-10 lg:h-96 lg:px-12 lg:py-0">
            <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full border-[22px] border-slate-400/30 sm:h-64 sm:w-64" />
            <div className="pointer-events-none absolute -bottom-20 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-white/25 blur-3xl" />

            <div className="relative z-10 grid min-h-[22rem] items-center gap-6 sm:min-h-[24rem] lg:grid-cols-[1fr_0.85fr]">
                <div className="max-w-xl text-center sm:text-left">
                    <p className="mb-3 inline-flex rounded-full bg-white/75 px-4 py-2 text-[11px] font-black uppercase tracking-[0.28em] text-gray-700 shadow-sm">
                        JCatalog Promo
                    </p>
                    <h2 className="text-4xl font-black leading-[0.95] tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
                        20% OFF
                        <br />
                        TODAY ONLY
                    </h2>
                    <p className="mx-auto mt-5 max-w-md text-base leading-7 text-gray-600 sm:mx-0 sm:text-lg">
                        Nikmati diskon spesial hari ini dan temukan pilihan produk terbaik dari katalog JCatalog.
                    </p>
                    <Button
                        className="mt-7 h-12 rounded-full bg-gray-950 px-8 text-sm font-black uppercase tracking-wide text-white hover:bg-gray-800"
                        onClick={() => window.location.href = '/#products'}
                    >
                        Shop Now
                    </Button>
                </div>

                <div className="pointer-events-none relative mx-auto flex h-72 w-full max-w-xs items-end justify-center sm:h-80 lg:mx-0 lg:h-96 lg:max-w-none">
                    <div className="absolute bottom-0 h-56 w-56 rounded-full bg-white/45 blur-3xl sm:h-72 sm:w-72" />
                    <div className="absolute bottom-6 h-48 w-48 rounded-full border-[18px] border-white/35 sm:h-64 sm:w-64" />
                    <img
                        src="/images/banner-product-visual.webp"
                        alt="JCatalog product promo model"
                        width="900"
                        height="600"
                        loading="eager"
                        fetchPriority="high"
                        decoding="async"
                        className="relative z-10 h-full w-auto max-w-none object-contain drop-shadow-[0_24px_40px_rgba(15,23,42,0.25)]"
                    />
                </div>
            </div>
        </section>
    );
}
