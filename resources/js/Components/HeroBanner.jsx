import React from 'react';
import { Image01Icon } from '@hugeicons/core-free-icons';
import { Button } from '@/Components/ui/button';
import { Icon } from '@/Components/ui/icon';

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

                <div className="hidden items-center justify-center lg:flex">
                    <div className="relative flex h-80 w-64 items-center justify-center overflow-hidden rounded-[2rem] bg-gradient-to-b from-slate-400/70 to-slate-300/70 shadow-inner">
                        <div className="absolute -right-16 top-28 h-32 w-32 rounded-full border-[18px] border-slate-500/25" />
                        <div className="text-center text-slate-600/80">
                            <Icon icon={Image01Icon} className="mx-auto h-20 w-20" />
                            <p className="mt-3 text-sm font-semibold">Product Visual</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
