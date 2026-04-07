"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function GalleryPage() {
    const [filter, setFilter] = useState("all");
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

    const categories = [
        { id: "all", label: "All Spaces" },
        { id: "lakshma", label: "Lakshma Reddy" },
        { id: "laxmi", label: "Laxmi Narsamma" },
        { id: "outdoor", label: "Outdoor Spaces" },
    ];

    const images = [
        // Lakshma Reddy
        { src: "/images/vorla-lakshmareddy/1.png", category: "lakshma", alt: "Lakshma Reddy Hall" },
        { src: "/images/vorla-lakshmareddy/2.png", category: "lakshma", alt: "Lakshma Reddy Hall" },
        { src: "/images/vorla-lakshmareddy/2 (2).png", category: "lakshma", alt: "Lakshma Reddy Hall" },
        { src: "/images/vorla-lakshmareddy/3.png", category: "lakshma", alt: "Lakshma Reddy Hall" },
        { src: "/images/vorla-lakshmareddy/3 (2).png", category: "lakshma", alt: "Lakshma Reddy Hall" },
        { src: "/images/vorla-lakshmareddy/4.png", category: "lakshma", alt: "Lakshma Reddy Hall" },
        { src: "/images/vorla-lakshmareddy/4 (2).png", category: "lakshma", alt: "Lakshma Reddy Hall" },
        { src: "/images/vorla-lakshmareddy/5.png", category: "lakshma", alt: "Lakshma Reddy Hall" },
        { src: "/images/vorla-lakshmareddy/6.png", category: "lakshma", alt: "Lakshma Reddy Hall" },
        { src: "/images/vorla-lakshmareddy/6 (2).png", category: "lakshma", alt: "Lakshma Reddy Hall" },
        { src: "/images/vorla-lakshmareddy/7.png", category: "lakshma", alt: "Lakshma Reddy Hall" },
        { src: "/images/vorla-lakshmareddy/7 (2).png", category: "lakshma", alt: "Lakshma Reddy Hall" },
        { src: "/images/vorla-lakshmareddy/8.png", category: "lakshma", alt: "Lakshma Reddy Hall" },
        { src: "/images/vorla-lakshmareddy/9.png", category: "lakshma", alt: "Lakshma Reddy Hall" },
        { src: "/images/vorla-lakshmareddy/10.png", category: "lakshma", alt: "Lakshma Reddy Hall" },
        { src: "/images/vorla-lakshmareddy/11.png", category: "lakshma", alt: "Lakshma Reddy Hall" },
        { src: "/images/vorla-lakshmareddy/12.png", category: "lakshma", alt: "Lakshma Reddy Hall" },
        { src: "/images/vorla-lakshmareddy/13.png", category: "lakshma", alt: "Lakshma Reddy Hall" },
        { src: "/images/vorla-lakshmareddy/14.png", category: "lakshma", alt: "Lakshma Reddy Hall" },
        { src: "/images/vorla-lakshmareddy/15.png", category: "lakshma", alt: "Lakshma Reddy Hall" },
        { src: "/images/vorla-lakshmareddy/16.png", category: "lakshma", alt: "Lakshma Reddy Hall" },
        { src: "/images/vorla-lakshmareddy/17.png", category: "lakshma", alt: "Lakshma Reddy Hall" },
        { src: "/images/vorla-lakshmareddy/18.png", category: "lakshma", alt: "Lakshma Reddy Hall" },
        { src: "/images/vorla-lakshmareddy/19.png", category: "lakshma", alt: "Lakshma Reddy Hall" },
        { src: "/images/vorla-lakshmareddy/20.png", category: "lakshma", alt: "Lakshma Reddy Hall" },


        // Laxmi Narsamma
        { src: "/images/vorla-laxminarsamma/1.png", category: "laxmi", alt: "Laxmi Narsamma Hall" },
        { src: "/images/vorla-laxminarsamma/2.png", category: "laxmi", alt: "Laxmi Narsamma Hall" },
        { src: "/images/vorla-laxminarsamma/2 (2).png", category: "laxmi", alt: "Laxmi Narsamma Hall" },
        { src: "/images/vorla-laxminarsamma/3.png", category: "laxmi", alt: "Laxmi Narsamma Hall" },
        { src: "/images/vorla-laxminarsamma/3 (2).png", category: "laxmi", alt: "Laxmi Narsamma Hall" },
        { src: "/images/vorla-laxminarsamma/4.png", category: "laxmi", alt: "Laxmi Narsamma Hall" },
        { src: "/images/vorla-laxminarsamma/4 (2).png", category: "laxmi", alt: "Laxmi Narsamma Hall" },
        { src: "/images/vorla-laxminarsamma/5.png", category: "laxmi", alt: "Laxmi Narsamma Hall" },
        { src: "/images/vorla-laxminarsamma/6.png", category: "laxmi", alt: "Laxmi Narsamma Hall" },
        { src: "/images/vorla-laxminarsamma/6 (2).png", category: "laxmi", alt: "Laxmi Narsamma Hall" },
        { src: "/images/vorla-laxminarsamma/7.png", category: "laxmi", alt: "Laxmi Narsamma Hall" },
        { src: "/images/vorla-laxminarsamma/7 (2).png", category: "laxmi", alt: "Laxmi Narsamma Hall" },
        { src: "/images/vorla-laxminarsamma/8.png", category: "laxmi", alt: "Laxmi Narsamma Hall" },
        { src: "/images/vorla-laxminarsamma/8 (2).png", category: "laxmi", alt: "Laxmi Narsamma Hall" },
        { src: "/images/vorla-laxminarsamma/9.png", category: "laxmi", alt: "Laxmi Narsamma Hall" },
        { src: "/images/vorla-laxminarsamma/9 (2).png", category: "laxmi", alt: "Larsamma Hall" },
        { src: "/images/vorla-laxminarsamma/10.png", category: "laxmi", alt: "Laxmi Narsamma Hall" },
        { src: "/images/vorla-laxminarsamma/10 (2).png", category: "laxmi", alt: "Laxmi Narsamma Hall" },
        { src: "/images/vorla-laxminarsamma/11.png", category: "laxmi", alt: "Laxmi Narsamma Hall" },
        { src: "/images/vorla-laxminarsamma/11 (2).png", category: "laxmi", alt: "Laxmi Narsamma Hall" },
        { src: "/images/vorla-laxminarsamma/13.png", category: "laxmi", alt: "Laxmi Narsamma Hall" },
        { src: "/images/vorla-laxminarsamma/14.png", category: "laxmi", alt: "Laxmi Narsamma Hall" },

        // Outdoor Spaces
        { src: "/images/outdoor-spaces/5.png", category: "outdoor", alt: "Outdoor Spaces" },
        { src: "/images/outdoor-spaces/9.png", category: "outdoor", alt: "Outdoor Spaces" },
        { src: "/images/outdoor-spaces/10.png", category: "outdoor", alt: "Outdoor Spaces" },
        { src: "/images/outdoor-spaces/11.png", category: "outdoor", alt: "Outdoor Spaces" },
        { src: "/images/outdoor-spaces/22.png", category: "outdoor", alt: "Outdoor Spaces" }
    ];

    const filteredImages = (filter === "all") ? images : images.filter((img) => img.category === filter);

    return (
        <main className="min-h-screen bg-[var(--background)] p-6 md:p-12 lg:p-24">
            <div className="max-w-7xl mx-auto">
                <header className="mb-12 md:mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 md:gap-12">
                    <div className="flex flex-col gap-6 md:gap-8">
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-[250px] md:auto-rows-[300px]">
                    {filteredImages.map((img, i) => (
                        <div
                            key={i}
                            onClick={() => setSelectedImageIndex(i)}
                            className={`relative group rounded-3xl overflow-hidden clay-card cursor-pointer ${
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
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
                                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-mono text-[10px] uppercase tracking-widest bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm">
                                    Expand
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImageIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
                        onClick={() => setSelectedImageIndex(null)}
                    >
                        {/* Close button */}
                        <button
                            className="absolute top-8 right-8 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedImageIndex(null);
                            }}
                        >
                            <X className="text-white" size={24} />
                        </button>

                        {/* Navigation - Prev */}
                        <button
                            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                            onClick={(e) => {
                                e.stopPropagation();
                                const prev = selectedImageIndex === 0 ? filteredImages.length - 1 : selectedImageIndex - 1;
                                setSelectedImageIndex(prev);
                            }}
                        >
                            <ChevronLeft className="text-white" size={24} />
                        </button>

                        {/* Image Container */}
                        <div
                            className="relative w-full h-full max-w-5xl max-h-[80vh] flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <motion.div
                                key={selectedImageIndex}
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                className="relative w-full h-full"
                            >
                                <Image
                                    src={filteredImages[selectedImageIndex].src}
                                    alt={filteredImages[selectedImageIndex].alt}
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </motion.div>
                        </div>

                        {/* Navigation - Next */}
                        <button
                            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                            onClick={(e) => {
                                e.stopPropagation();
                                const next = selectedImageIndex === filteredImages.length - 1 ? 0 : selectedImageIndex + 1;
                                setSelectedImageIndex(next);
                            }}
                        >
                            <ChevronRight className="text-white" size={24} />
                        </button>

                        {/* Caption */}
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
                            <p className="text-white/60 font-mono text-[10px] uppercase tracking-[0.4em] mb-2">
                                {categories.find(c => c.id === filteredImages[selectedImageIndex].category)?.label || "Gallery"}
                            </p>
                            <h2 className="text-white text-xl font-light uppercase tracking-widest">
                                {filteredImages[selectedImageIndex].alt}
                            </h2>
                            <p className="text-white/40 font-mono text-[10px] mt-4 tracking-widest">
                                {selectedImageIndex + 1} / {filteredImages.length}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
