import TourCard from "@/components/TourCard";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// CC0 Stock Videos from Pixabay/Pexels CDN (free for commercial use)
const STOCK_VIDEOS = {
    hall: "https://cdn.pixabay.com/video/2020/05/25/40130-424930032_large.mp4",       // elegant hall interior
    hall2: "https://cdn.pixabay.com/video/2019/06/21/24634-343447937_large.mp4",       // banquet setup
    garden: "https://cdn.pixabay.com/video/2021/04/02/69552-531641490_large.mp4",      // garden/outdoor
    courtyard: "https://cdn.pixabay.com/video/2020/02/12/32409-391521862_large.mp4",   // architecture exterior
};

// Unsplash CC0 cover images
const UNSPLASH = {
    hall: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80",
    hall2: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&q=80",
    garden: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",
    courtyard: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
};

export default function VirtualTour() {
    const categories = [
        {
            title: "Laxmi Narsamma",
            videoSrc: { default: "/videos/virtual-tour/vorla-laxmi-narsamma/1-exterior.mp4", mobile: "/videos/virtual-tour/vorla-laxmi-narsamma/1-exterior-mobile.mp4" },
            posterImg: "/videos/virtual-tour/vorla-laxmi-narsamma/1-exterior-poster.jpg",
            description: "Experience intimate refinement. A walkthrough of our 700+ capacity hall, where modern elegance meets thoughtful design.",
            className: "md:col-span-1 md:row-span-1 h-[600px]",
            href: "/virtual-tour/laxmi-narsamma",
        },
        {
            title: "Vorla Lakshma Reddy",
            videoSrc: { default: "/videos/virtual-tour/vorla-lakshma-reddy/bighall.mp4", mobile: "/videos/virtual-tour/vorla-lakshma-reddy/bighall-mobile.mp4" },
            posterImg: "/videos/virtual-tour/vorla-lakshma-reddy/bighall-poster.jpg",
            description: "The grand convention. A walkthrough of our 1,200-seat, column-free engineering marvel.",
            className: "md:col-span-1 md:row-span-1 h-[600px]",
            href: "/virtual-tour/vorla-lakshma-reddy",
        },
    ];

    return (
        <main className="min-h-screen bg-[var(--background)] p-6 md:p-12 lg:p-24">
            <div className="max-w-7xl mx-auto">
                <header className="mb-16 flex justify-between items-end">
                    <div className="flex flex-col gap-4">
                        <Link
                            href="/"
                            className="group flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.4em] text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
                        >
                            <div className="w-8 h-8 rounded-full neuro-pillow flex items-center justify-center group-hover:scale-110 transition-transform">
                                <ArrowLeft size={12} />
                            </div>
                            Back to Sanctuary
                        </Link>

                        <h1 className="text-5xl md:text-7xl font-light uppercase tracking-tighter text-zinc-900 dark:text-zinc-100 mt-4 leading-none">
                            Digital <br /> Immersion
                        </h1>
                    </div>

                    <div className="hidden md:block max-w-sm text-right">
                        <p className="text-sm font-light leading-relaxed text-zinc-500 uppercase tracking-tight">
                            A Spatial Study.<br />
                            <span className="normal-case tracking-normal">Explore the volume, lighting, and atmospheric quality of our estates from anywhere. Navigate our interiors to find the perfect fit for your vision.</span>
                        </p>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:auto-rows-fr">
                    {categories.map((cat, i) => {
                        const card = (
                            <TourCard
                                key={i}
                                title={cat.title}
                                videoSrc={cat.videoSrc}
                                posterImg={cat.posterImg}
                                description={cat.description}
                                className={cat.className}
                            />
                        );
                        return cat.href ? (
                            <Link key={i} href={cat.href} className={cat.className}>
                                {card}
                            </Link>
                        ) : (
                            card
                        );
                    })}
                </div>

                <footer className="mt-24 pt-12 border-t border-zinc-300 flex justify-center items-center">
                    <div className="text-center">
                        <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                            © 2026 Vorla Conventions
                        </p>
                    </div>
                </footer>
            </div>
        </main>
    );
}
