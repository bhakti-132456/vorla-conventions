"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TourCardProps {
    title: string;
    videoSrc: string;
    posterImg: string;      // Unsplash cover image
    description?: string;
    className?: string;
}

export default function TourCard({ title, videoSrc, posterImg, description, className = "" }: TourCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleMouseEnter = () => {
        setIsHovered(true);
        videoRef.current?.play().catch(() => { });
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        videoRef.current?.pause();
        if (videoRef.current) videoRef.current.currentTime = 0;
    };

    return (
        <motion.div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`relative cursor-pointer transition-all duration-500 overflow-hidden ${className} ${isHovered ? "glass-card scale-[1.02]" : "neuro-pillow"
                }`}
        >
            {/* Poster Image (always visible, fades when video plays) */}
            <div className="absolute inset-0 z-0">
                <img
                    src={posterImg}
                    alt={title}
                    className={`w-full h-full object-cover transition-opacity duration-700 ${isHovered ? "opacity-0" : "opacity-40"
                        }`}
                />
            </div>

            {/* Video (plays on hover) */}
            <div className="absolute inset-0 z-0">
                <video
                    ref={videoRef}
                    src={videoSrc}
                    loop
                    muted
                    playsInline
                    className={`w-full h-full object-cover transition-opacity duration-700 ${isHovered ? "opacity-100" : "opacity-0"
                        }`}
                />
            </div>

            {/* Dark overlay for text readability */}
            <div className={`absolute inset-0 z-[1] transition-opacity duration-500 ${isHovered ? "bg-black/40" : "bg-transparent"
                }`} />

            <div className="relative z-10 w-full h-full p-8 flex flex-col justify-end">
                <motion.div
                    animate={{ y: isHovered ? -10 : 0 }}
                    className="flex flex-col gap-2"
                >
                    <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500">
                        Venue Category
                    </span>
                    <h3 className={`text-2xl font-light uppercase tracking-tight transition-colors duration-500 ${isHovered ? "text-white" : "text-zinc-800"
                        }`}>
                        {title}
                    </h3>
                </motion.div>

                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                        >
                            <p className="text-white/70 text-sm font-light leading-relaxed mt-4">
                                {description || "Immersive documentation of spatial volume and atmospheric quality."}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
