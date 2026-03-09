"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

interface VenueSection {
    videoSrc: string;
    posterSrc: string;
    title: string;
    subtitle?: string;
}

interface VenueScrubProps {
    sections: VenueSection[];
}

function ScrubSection({ section, index }: { section: VenueSection; index: number }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [progress, setProgress] = useState(0);
    const [shouldLoad, setShouldLoad] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShouldLoad(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "20% 0px" }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!shouldLoad) return;

        const video = videoRef.current;
        if (!video) return;

        // Force first frame on mount
        video.currentTime = 0;

        const st = ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5, // Smoother scrub
            onUpdate: (self) => {
                const p = self.progress;
                setProgress(p);
                if (video.duration) {
                    // Using requestAnimationFrame to ensure smooth updates
                    requestAnimationFrame(() => {
                        video.currentTime = p * video.duration;
                    });
                }
            },
        });

        const handleLoaded = () => setIsLoaded(true);
        video.addEventListener("loadeddata", handleLoaded);

        return () => {
            st.kill();
            video.removeEventListener("loadeddata", handleLoaded);
        };
    }, [shouldLoad]);

    // Text is visible between 15% - 85% of scroll progress
    const showText = progress > 0.15 && progress < 0.85;
    const textProgress = showText ? 1 : 0;

    return (
        <div ref={containerRef} className="relative" style={{ height: "300vh" }}>
            {/* Sticky viewport */}
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
                {/* Video Loader / Poster */}
                {shouldLoad && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isLoaded ? 0 : 1 }}
                        className="absolute inset-0 z-10 pointer-events-none"
                    >
                        <img
                            src={section.posterSrc}
                            alt=""
                            className="w-full h-full object-cover blur-sm scale-105 opacity-50"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-8 h-8 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
                        </div>
                    </motion.div>
                )}

                {/* Video */}
                {shouldLoad && (
                    <video
                        ref={videoRef}
                        src={section.videoSrc}
                        poster={section.posterSrc}
                        muted
                        playsInline
                        preload="auto"
                        className={`w-full h-full object-cover transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                    />
                )}

                {/* Bottom gradient for text readability */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        opacity: showText ? 0.9 : 0,
                        transition: "opacity 0.8s ease",
                        background:
                            "linear-gradient(to top, black 0%, rgba(0,0,0,0.5) 30%, transparent 60%)",
                    }}
                />

                {/* Section index indicator */}
                <motion.div
                    animate={{
                        opacity: showText ? 0.4 : 0,
                    }}
                    transition={{ duration: 0.6 }}
                    className="absolute top-8 left-8 md:top-12 md:left-12 pointer-events-none"
                >
                    <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-white/50">
                        {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </span>
                </motion.div>

                {/* Text overlay — bottom center */}
                <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center pointer-events-none pb-16 md:pb-24 px-6">
                    {/* Title */}
                    <motion.h2
                        animate={{
                            opacity: textProgress,
                            y: showText ? 0 : 40,
                        }}
                        transition={{
                            duration: 0.9,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="text-white text-3xl md:text-6xl font-light uppercase tracking-tighter text-center leading-[0.95]"
                    >
                        {section.title}
                    </motion.h2>

                    {/* Subtitle */}
                    {section.subtitle && (
                        <motion.p
                            animate={{
                                opacity: showText ? 1 : 0,
                                y: showText ? 0 : 30,
                            }}
                            transition={{
                                duration: 0.9,
                                delay: 0.15,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="text-white/70 text-sm md:text-lg font-light mt-4 md:mt-6 max-w-lg text-center leading-relaxed tracking-wide"
                        >
                            {section.subtitle}
                        </motion.p>
                    )}
                </div>

                {/* Scroll hint — only on first section at very start */}
                {index === 0 && (
                    <motion.div
                        animate={{ opacity: progress < 0.03 ? 1 : 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
                    >
                        <span className="text-[9px] font-mono uppercase tracking-[0.5em] text-white/40">
                            Scroll to explore
                        </span>
                        <div className="w-[1px] h-6 md:h-8 bg-white/20 animate-pulse" />
                    </motion.div>
                )}
            </div>
        </div>
    );
}

export default function VenueScrub({ sections }: VenueScrubProps) {
    return (
        <div className="bg-black">
            {sections.map((section, i) => (
                <ScrubSection key={i} section={section} index={i} />
            ))}

            {/* End card — back to virtual tour */}
            <div className="h-screen flex flex-col items-center justify-center bg-black gap-6 px-6">
                <span className="text-[10px] font-mono uppercase tracking-[0.6em] text-white/30">
                    End of Tour
                </span>
                <h3 className="text-white text-3xl md:text-5xl font-light uppercase tracking-tighter text-center">
                    Vorla Laxmi Narsamma<br />Conventions
                </h3>
                <p className="text-white/40 text-sm font-light max-w-sm text-center mt-2">
                    Experience the space in person. Schedule an inspection today.
                </p>
                <div className="flex gap-4 mt-8">
                    <a
                        href="/virtual-tour"
                        className="px-6 md:px-8 py-3 border border-white/20 text-white text-xs uppercase tracking-widest font-medium rounded-full hover:bg-white/10 active:scale-95 transition-all"
                    >
                        Back to Venues
                    </a>
                    <a
                        href="/contact"
                        className="px-6 md:px-8 py-3 bg-white text-black text-xs uppercase tracking-widest font-medium rounded-full hover:bg-white/90 active:scale-95 transition-all shadow-xl"
                    >
                        Request Inspection
                    </a>
                </div>
            </div>
        </div>
    );
}
