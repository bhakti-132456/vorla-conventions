"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function GalleryPage() {
    const [filter, setFilter] = useState("all");

    const categories = [
        { id: "all", label: "All Spaces" },
        { id: "lakshma", label: "Lakshma Reddy" },
        { id: "laxmi", label: "Laxmi Narsamma" },
        { id: "outdoor", label: "Outdoor Spaces" },
    ];

    const images = [
        // Lakshma Reddy
        { src: "/images/vorla-lakshmareddy/2.png", category: "lakshma", alt: "Lakshma Reddy Hall" },
        { src: "/images/vorla-lakshmareddy/3.png", category: "lakshma", alt: "Lakshma Reddy Hall" },
        { src: "/images/vorla-lakshmareddy/4.png", category: "lakshma", alt: "Lakshma Reddy Hall" },
        { src: "/images/vorla-lakshmareddy/6.png", category: "lakshma", alt: "Lakshma Reddy Hall" },
        { src: "/images/vorla-lakshmareddy/7.png", category: "lakshma", alt: "Lakshma Reddy Hall" },
        { src: "/images/vorla-lakshmareddy/Big hall pics website.png", category: "lakshma", alt: "Lakshma Reddy Hall Big View" },

        // Laxmi Narsamma
        { src: "/images/vorla-laxminarsamma/10.png", category: "laxmi", alt: "Laxmi Narsamma Hall" },
        { src: "/images/vorla-laxminarsamma/11.png", category: "laxmi", alt: "Laxmi Narsamma Hall" },
        { src: "/images/vorla-laxminarsamma/2.png", category: "laxmi", alt: "Laxmi Narsamma Hall" },
        { src: "/images/vorla-laxminarsamma/3.png", category: "laxmi", alt: "Laxmi Narsamma Hall" },
        { src: "/images/vorla-laxminarsamma/4.png", category: "laxmi", alt: "Laxmi Narsamma Hall" },
        { src: "/images/vorla-laxminarsamma/6.png", category: "laxmi", alt: "Laxmi Narsamma Hall" },
        { src: "/images/vorla-laxminarsamma/7.png", category: "laxmi", alt: "Laxmi Narsamma Hall" },
        { src: "/images/vorla-laxminarsamma/8.png", category: "laxmi", alt: "Laxmi Narsamma Hall" },
        { src: "/images/vorla-laxminarsamma/9.png", category: "laxmi", alt: "Laxmi Narsamma Hall" },

        // Outdoor Spaces
        { src: "/images/outdoor-spaces/10.png", category: "outdoor", alt: "Outdoor Spaces" },
        { src: "/images/outdoor-spaces/11.png", category: "outdoor", alt: "Outdoor Spaces" },
        { src: "/images/outdoor-spaces/5.png", category: "outdoor", alt: "Outdoor Spaces" },
        { src: "/images/outdoor-spaces/9.png", category: "outdoor", alt: "Outdoor Spaces" },
        { src: "/images/outdoor-spaces/Big hall pics website (1).png", category: "outdoor", alt: "Outdoor Spaces View" },
    ];

    const filteredImages = filter === "all" ? images : images.filter((img) => img.category === filter);

    return (
        <main className="min-h-screen bg-[var(--background)] p-6 md:p-12 lg:p-24">
            <div className="max-w-7xl mx-auto">
                <header className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
                    <div className="flex flex-col gap-8">
                        <Link
                            href="/"
                            className="group flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.4em] text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
                        >
                            <div className="w-8 h-8 rounded-full neuro-pillow flex items-center justify-center group-hover:scale-110 transition-transform">
                                <ArrowLeft size={12} />
                            </div>
                            Back to Sanctuary
                        </Link>

                        <div>
                            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-4 block">
                                Visual Archive
                            </span>
                            <h1 className="text-5xl md:text-7xl font-light uppercase tracking-tighter text-zinc-900 dark:text-zinc-100 leading-[0.9]">
                                Image <br /> Gallery
                            </h1>
                        </div>
                    </div>

                    <div className="hidden md:block max-w-sm text-left md:text-right">
                        <p className="text-sm font-light leading-relaxed text-zinc-500 uppercase tracking-tight">
                            A Curated Collection.<br />
                            <span className="normal-case tracking-normal">Explore our spaces through the lens. Immerse yourself in the details and grandeur of Vorla Conventions.</span>
                        </p>
                    </div>
                </header>

                {/* Filters */}
                <div className="flex flex-wrap gap-4 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setFilter(cat.id)}
                            className={`px-6 py-3 rounded-full text-[10px] font-mono uppercase tracking-widest transition-all ${filter === cat.id
                                    ? "bg-zinc-800 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-[2px_2px_4px_#c5c5c5,-2px_-2px_4px_#ffffff] dark:shadow-[2px_2px_4px_#000000,-2px_-2px_4px_#333333]"
                                    : "bg-[var(--background)] text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 clay-card"
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Masonry-style Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
                    {filteredImages.map((img, i) => (
                        <div
                            key={i}
                            className={`relative group rounded-3xl overflow-hidden clay-card ${
                                // Make some items span 2 rows or columns for a dynamic layout
                                i % 5 === 0 ? "md:col-span-2 md:row-span-2" :
                                    i % 7 === 0 ? "md:row-span-2" : ""
                                }`}
                        >
                            <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
