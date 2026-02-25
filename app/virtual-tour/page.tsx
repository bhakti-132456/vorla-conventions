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
            title: "Vorla Lakshma Reddy",
            videoSrc: STOCK_VIDEOS.hall,
            posterImg: UNSPLASH.hall,
            description: "The grand convention — 1,200+ seating, column-free engineering, premium acoustics.",
            className: "md:col-span-2 md:row-span-2 h-[400px] md:h-auto",
        },
        {
            title: "Vorla Lakshmi Narsamma",
            videoSrc: STOCK_VIDEOS.hall2,
            posterImg: UNSPLASH.hall2,
            description: "Intimate refinement — 700+ capacity with modern elegance.",
            className: "md:col-span-1 md:row-span-1 h-[250px] md:h-auto",
        },
        {
            title: "Outdoor Spaces",
            videoSrc: STOCK_VIDEOS.garden,
            posterImg: UNSPLASH.garden,
            description: "Manicured landscapes under celestial canopy.",
            className: "md:col-span-1 md:row-span-1 h-[250px] md:h-auto",
        },
        {
            title: "The Courtyard",
            videoSrc: STOCK_VIDEOS.courtyard,
            posterImg: UNSPLASH.courtyard,
            description: "Regal arrival experience with 2,000+ vehicle capacity.",
            className: "md:col-span-2 md:row-span-1 h-[250px] md:h-auto",
        },
    ];

    return (
        <main className="min-h-screen bg-[var(--background)] p-6 md:p-12 lg:p-24">
            <div className="max-w-7xl mx-auto">
                <header className="mb-16 flex justify-between items-end">
                    <div className="flex flex-col gap-4">
                        <Link
                            href="/"
                            className="group flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.4em] text-zinc-500 hover:text-zinc-800 transition-colors"
                        >
                            <div className="w-8 h-8 rounded-full neuro-pillow flex items-center justify-center group-hover:scale-110 transition-transform">
                                <ArrowLeft size={12} />
                            </div>
                            Back to Sanctuary
                        </Link>

                        <h1 className="text-5xl md:text-7xl font-light uppercase tracking-tighter text-zinc-900 mt-4 leading-none">
                            Virtual <br /> Documentation
                        </h1>
                    </div>

                    <div className="hidden md:block max-w-xs text-right">
                        <p className="text-sm font-light leading-relaxed text-zinc-500 uppercase tracking-tight">
                            A spatial study of volume, lighting, and atmospheric quality across the Vorla estate.
                        </p>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:auto-rows-fr">
                    {categories.map((cat, i) => (
                        <TourCard
                            key={i}
                            title={cat.title}
                            videoSrc={cat.videoSrc}
                            posterImg={cat.posterImg}
                            description={cat.description}
                            className={cat.className}
                        />
                    ))}
                </div>

                <footer className="mt-24 pt-12 border-t border-zinc-300 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-zinc-400">
                            Demonstration Assets
                        </span>
                        <div className="flex gap-4">
                            <span className="text-[10px] uppercase font-bold text-zinc-600">Unsplash CC0</span>
                            <span className="text-[10px] uppercase font-bold text-zinc-600">Pixabay CC0</span>
                        </div>
                    </div>

                    <div className="text-center md:text-right">
                        <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                            © 2026 Vorla Conventions
                        </p>
                    </div>
                </footer>
            </div>
        </main>
    );
}
