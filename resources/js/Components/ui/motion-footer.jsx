import * as React from 'react';
import { useEffect, useRef } from 'react';
import { Link } from '@inertiajs/react';
import { ArrowUp02Icon, Call02Icon, InstagramIcon, Location01Icon, Mail01Icon } from '@hugeicons/core-free-icons';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import { Icon } from '@/Components/ui/icon';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const STYLES = `
.cinematic-footer-wrapper {
  -webkit-font-smoothing: antialiased;
}

@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.55; }
  100% { transform: translate(-50%, -50%) scale(1.12); opacity: 0.9; }
}

@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes footer-heartbeat {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 5px rgba(248, 113, 113, 0.35)); }
  15%, 45% { transform: scale(1.18); filter: drop-shadow(0 0 10px rgba(248, 113, 113, 0.7)); }
  30% { transform: scale(1); }
}

.animate-footer-breathe { animation: footer-breathe 8s ease-in-out infinite alternate; }
.animate-footer-scroll-marquee { animation: footer-scroll-marquee 42s linear infinite; }
.animate-footer-heartbeat { animation: footer-heartbeat 2s cubic-bezier(0.25, 1, 0.5, 1) infinite; }

.footer-bg-grid {
  background-size: 58px 58px;
  background-image:
    linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 24%, black 76%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 24%, black 76%, transparent);
}

.footer-aurora {
  background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.14) 0%, rgba(156,163,175,0.12) 42%, transparent 72%);
}

.footer-glass-pill {
  background: linear-gradient(145deg, rgba(255,255,255,0.11) 0%, rgba(255,255,255,0.035) 100%);
  box-shadow: 0 16px 40px -18px rgba(0,0,0,0.75), inset 0 1px 1px rgba(255,255,255,0.18), inset 0 -1px 2px rgba(0,0,0,0.65);
  border: 1px solid rgba(255,255,255,0.12);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-glass-pill:hover {
  background: linear-gradient(145deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 100%);
  border-color: rgba(255,255,255,0.28);
  color: #fff;
}

.footer-giant-bg-text {
  font-size: clamp(5.5rem, 22vw, 22rem);
  line-height: 0.75;
  font-weight: 900;
  letter-spacing: -0.075em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255,255,255,0.08);
  background: linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.03) 64%, transparent 100%);
  -webkit-background-clip: text;
  background-clip: text;
}

.footer-text-glow {
  background: linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.48) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 22px rgba(255,255,255,0.16));
}
`;

const MarqueeItem = () => (
    <div className="flex items-center space-x-10 px-5">
        <span>Curated Product</span><span className="text-white/35">✦</span>
        <span>Fast Catalog</span><span className="text-white/35">✦</span>
        <span>Easy Checkout</span><span className="text-white/35">✦</span>
        <span>Filament Admin</span><span className="text-white/35">✦</span>
        <span>React Storefront</span><span className="text-white/35">✦</span>
    </div>
);

const FooterLink = ({ href, children }) => {
    const className = 'text-xs leading-5 text-gray-300 transition hover:text-white sm:text-sm sm:leading-7';

    if (href?.startsWith('/')) {
        return <Link href={href} className={className}>{children}</Link>;
    }

    return <a href={href} className={className}>{children}</a>;
};

const MagneticButton = React.forwardRef(({ className, children, as: Component = 'button', ...props }, forwardedRef) => {
    const localRef = useRef(null);

    useEffect(() => {
        if (typeof window === 'undefined') return undefined;
        const element = localRef.current;
        if (!element) return undefined;

        const ctx = gsap.context(() => {
            const handleMouseMove = (event) => {
                const rect = element.getBoundingClientRect();
                const x = event.clientX - rect.left - rect.width / 2;
                const y = event.clientY - rect.top - rect.height / 2;

                gsap.to(element, {
                    x: x * 0.28,
                    y: y * 0.28,
                    scale: 1.04,
                    ease: 'power2.out',
                    duration: 0.35,
                });
            };

            const handleMouseLeave = () => {
                gsap.to(element, {
                    x: 0,
                    y: 0,
                    scale: 1,
                    ease: 'elastic.out(1, 0.35)',
                    duration: 1,
                });
            };

            element.addEventListener('mousemove', handleMouseMove);
            element.addEventListener('mouseleave', handleMouseLeave);

            return () => {
                element.removeEventListener('mousemove', handleMouseMove);
                element.removeEventListener('mouseleave', handleMouseLeave);
            };
        }, element);

        return () => ctx.revert();
    }, []);

    return (
        <Component
            ref={(node) => {
                localRef.current = node;
                if (typeof forwardedRef === 'function') forwardedRef(node);
                else if (forwardedRef) forwardedRef.current = node;
            }}
            className={cn('cursor-pointer', className)}
            {...props}
        >
            {children}
        </Component>
    );
});
MagneticButton.displayName = 'MagneticButton';

export function CinematicFooter({ appName = 'JCatalog' }) {
    const wrapperRef = useRef(null);
    const giantTextRef = useRef(null);
    const contentRef = useRef(null);
    const linksRef = useRef(null);
    const year = new Date().getFullYear();

    const footerLinks = {
        menu: [
            { label: 'Home', href: '/' },
            { label: 'Products', href: '#products' },
            { label: 'Categories', href: '#products' },
            { label: 'Contact', href: '#footer' },
        ],
        catalog: [
            { label: 'Elektronik', href: '/?category=elektronik' },
            { label: 'Fashion', href: '/?category=fashion' },
            { label: 'Rumah Tangga', href: '/?category=rumah-tangga' },
            { label: 'Olahraga', href: '/?category=olahraga' },
        ],
        service: [
            { label: 'FAQ', href: '#footer' },
            { label: 'Help & Support', href: '#footer' },
            { label: 'Privacy Policy', href: '#footer' },
            { label: 'Terms & Conditions', href: '#footer' },
        ],
    };

    useEffect(() => {
        if (typeof window === 'undefined') return undefined;
        if (!wrapperRef.current) return undefined;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                giantTextRef.current,
                { y: '8vh', scale: 0.9, opacity: 0 },
                {
                    y: '0vh',
                    scale: 1,
                    opacity: 1,
                    ease: 'power1.out',
                    scrollTrigger: {
                        trigger: wrapperRef.current,
                        start: 'top 88%',
                        end: 'bottom bottom',
                        scrub: 1,
                    },
                }
            );

            gsap.fromTo(
                [contentRef.current, linksRef.current],
                { y: 48, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.14,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: wrapperRef.current,
                        start: 'top 68%',
                        end: 'center center',
                        scrub: 1,
                    },
                }
            );
        }, wrapperRef);

        return () => ctx.revert();
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: STYLES }} />

            <div
                id="footer"
                ref={wrapperRef}
                className="relative h-[100svh] w-full md:h-[105vh]"
                style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
            >
                <footer className="cinematic-footer-wrapper fixed bottom-0 left-0 flex h-[100svh] w-full flex-col justify-between overflow-hidden bg-black text-white md:h-screen">
                    <div className="footer-aurora pointer-events-none absolute left-1/2 top-1/2 z-0 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[80px]" />
                    <div className="footer-bg-grid pointer-events-none absolute inset-0 z-0" />

                    <div
                        ref={giantTextRef}
                        className="footer-giant-bg-text pointer-events-none absolute -bottom-[2vh] left-1/2 z-0 -translate-x-1/2 select-none whitespace-nowrap"
                    >
                        {appName}
                    </div>

                    <div className="absolute left-0 top-4 z-10 w-full -rotate-2 scale-110 overflow-hidden border-y border-white/10 bg-black/55 py-2 shadow-2xl backdrop-blur-md sm:top-12 sm:py-4">
                        <div className="flex w-max animate-footer-scroll-marquee text-[10px] font-black uppercase tracking-[0.22em] text-gray-400 sm:text-sm sm:tracking-[0.28em]">
                            <MarqueeItem />
                            <MarqueeItem />
                        </div>
                    </div>

                    <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 pb-16 pt-16 sm:px-6 sm:pt-28 lg:px-8">
                        <div ref={contentRef} className="grid grid-cols-3 gap-x-4 gap-y-5 sm:grid-cols-2 sm:gap-10 lg:grid-cols-[1.25fr_0.75fr_0.75fr_0.75fr]">
                            <div className="col-span-3 sm:col-span-1">
                                <p className="mb-2 text-[10px] font-black uppercase tracking-[0.26em] text-gray-500 sm:mb-4 sm:text-xs sm:tracking-[0.32em]">{appName}</p>
                                <h2 className="footer-text-glow max-w-xl text-3xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                                    Ready to shop?
                                </h2>
                                <p className="mt-3 max-w-md text-xs leading-5 text-gray-300 sm:mt-5 sm:text-sm sm:leading-7">
                                    Temukan produk pilihan dari {appName}. Mudah difilter dan checkout langsung ke WhatsApp.
                                </p>

                                <div className="mt-4 flex gap-2 sm:mt-7 sm:gap-3">
                                    <a href="mailto:admin@jcatalog.local" className="footer-glass-pill rounded-full p-2.5 text-gray-200 sm:p-3" aria-label="Email">
                                        <Icon icon={Mail01Icon} className="h-4 w-4 sm:h-5 sm:w-5" />
                                    </a>
                                    <a href="https://wa.me/6281388050997" target="_blank" rel="noreferrer" className="footer-glass-pill rounded-full p-2.5 text-gray-200 sm:p-3" aria-label="WhatsApp">
                                        <Icon icon={Call02Icon} className="h-4 w-4 sm:h-5 sm:w-5" />
                                    </a>
                                    <a href="#footer" className="footer-glass-pill rounded-full p-2.5 text-gray-200 sm:p-3" aria-label="Location">
                                        <Icon icon={Location01Icon} className="h-4 w-4 sm:h-5 sm:w-5" />
                                    </a>
                                    <a href="#footer" className="footer-glass-pill rounded-full p-2.5 text-gray-200 sm:p-3" aria-label="Instagram">
                                        <Icon icon={InstagramIcon} className="h-4 w-4 sm:h-5 sm:w-5" />
                                    </a>
                                </div>
                            </div>

                            <div ref={linksRef} className="min-w-0">
                                <h4 className="mb-2 text-[10px] font-black uppercase tracking-[0.18em] text-white sm:mb-4 sm:text-sm sm:tracking-[0.22em]">Menu</h4>
                                <ul className="space-y-1">
                                    {footerLinks.menu.map((item) => (
                                        <li key={item.label}><FooterLink href={item.href}>{item.label}</FooterLink></li>
                                    ))}
                                </ul>
                            </div>

                            <div className="min-w-0">
                                <h4 className="mb-2 text-[10px] font-black uppercase tracking-[0.18em] text-white sm:mb-4 sm:text-sm sm:tracking-[0.22em]">Catalog</h4>
                                <ul className="space-y-1">
                                    {footerLinks.catalog.map((item) => (
                                        <li key={item.label}><FooterLink href={item.href}>{item.label}</FooterLink></li>
                                    ))}
                                </ul>
                            </div>

                            <div className="min-w-0">
                                <h4 className="mb-2 text-[10px] font-black uppercase tracking-[0.18em] text-white sm:mb-4 sm:text-sm sm:tracking-[0.22em]">Service</h4>
                                <ul className="space-y-1">
                                    {footerLinks.service.map((item) => (
                                        <li key={item.label}><FooterLink href={item.href}>{item.label}</FooterLink></li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="relative z-20 flex w-full flex-row items-center justify-between gap-2 px-4 pb-4 sm:px-6 md:px-12 md:pb-8">
                        <div className="max-w-[38%] text-left text-[8px] font-semibold uppercase tracking-[0.13em] text-gray-500 sm:max-w-none md:text-xs md:tracking-widest">
                            © {year} {appName}. All rights reserved.
                        </div>

                        <div className="footer-glass-pill flex shrink-0 cursor-default items-center gap-1.5 rounded-full px-3 py-2 sm:gap-2 sm:px-5 sm:py-3">
                            <span className="hidden text-[10px] font-bold uppercase tracking-widest text-gray-500 sm:inline md:text-xs">Crafted with</span>
                            <span className="animate-footer-heartbeat text-xs text-red-400 md:text-base">❤</span>
                            <span className="hidden text-[10px] font-bold uppercase tracking-widest text-gray-500 sm:inline md:text-xs">for</span>
                            <span className="text-[10px] font-black text-white md:text-sm">{appName}</span>
                        </div>

                        <MagneticButton
                            type="button"
                            onClick={scrollToTop}
                            className="footer-glass-pill flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-400 hover:text-white sm:h-12 sm:w-12"
                            aria-label="Back to top"
                        >
                            <Icon icon={ArrowUp02Icon} className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 sm:h-5 sm:w-5" />
                        </MagneticButton>
                    </div>
                </footer>
            </div>
        </>
    );
}
