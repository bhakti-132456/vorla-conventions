"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export default function HeroScrub() {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [progress, setProgress] = useState(0);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Force first frame on mount
        video.currentTime = 0;

        // GSAP ScrollTrigger for video scrubbing
        const st = ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1, // Smooth scrubbing
            onUpdate: (self) => {
                const p = self.progress;
                setProgress(p);

                // Update video time
                if (video.duration) {
                    video.currentTime = p * video.duration;
                }
            },
        });

        // Hide/Show Global Navigation based on scroll
        const nav = document.querySelector('nav');
        if (nav) {
            // Apply initial state
            if (progress < 0.05) {
                nav.style.opacity = '0';
                nav.style.pointerEvents = 'none';
            }

            // Note: We don't use GSAP for nav here to keep it simple and reactive to state
            nav.style.transition = 'opacity 0.5s ease';
            if (progress < 0.05) {
                nav.style.opacity = '0';
                nav.style.pointerEvents = 'none';
            } else {
                nav.style.opacity = '1';
                nav.style.pointerEvents = 'auto';
            }
        }

        return () => {
            st.kill();
            if (nav) {
                nav.style.opacity = '1';
                nav.style.pointerEvents = 'auto';
            }
        };
    }, [progress]);

    const showText = progress > 0.65;
    const isPressed = progress > 0.88;

    return (
        <div ref={containerRef} className="relative h-[300vh]">
            {/* Sticky viewport */}
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
                {/* Neuromorphic wrapper */}
                <div
                    className="w-full h-full overflow-hidden"
                    style={{
                        boxShadow: isPressed
                            ? "inset 6px 6px 12px #c5c5c5, inset -6px -6px 12px #ffffff"
                            : "none",
                        transform: isPressed ? "scale(0.98)" : "scale(1)",
                        borderRadius: isPressed ? "32px" : "0px",
                        transition: "all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)",
                        opacity: 1,
                    }}
                >
                    <video
                        ref={videoRef}
                        src="/videos/vorla-hero-home-1080p.mp4"
                        poster="/videos/vorla-hero-home-poster.jpg"
                        muted
                        playsInline
                        preload="auto"
                        onLoadedData={() => setIsReady(true)}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Text gradient */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        opacity: showText ? 0.85 : 0,
                        transition: "opacity 0.8s ease",
                        background: "linear-gradient(to top, black 0%, rgba(0,0,0,0.6) 40%, transparent 80%)",
                    }}
                />

                {/* Headline + CTA */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6">
                    {/* Eyebrow */}
                    <motion.span
                        animate={{
                            opacity: showText ? 0.5 : 0,
                            y: showText ? 0 : 20
                        }}
                        transition={{ duration: 0.8 }}
                        className="block text-[10px] md:text-[11px] font-mono uppercase tracking-[0.6em] md:tracking-[0.8em] text-white mb-4 md:mb-6"
                    >
                        The Architecture of Gathering
                    </motion.span>

                    {/* Main Headline */}
                    <motion.h1
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{
                            opacity: showText ? 1 : 0,
                            scale: isPressed ? 0.97 : (1 + (1 - Math.min(progress * 5, 1)) * 0.1),
                        }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="text-white text-5xl md:text-8xl font-light uppercase tracking-tighter leading-[0.9] text-center"
                    >
                        Vorla<br />Conventions
                    </motion.h1>

                    {/* Description + CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{
                            opacity: showText ? 1 : 0,
                            y: showText ? 0 : 40,
                        }}
                        transition={{
                            opacity: { duration: 0.8 },
                            y: { duration: 1, ease: [0.22, 1, 0.36, 1] },
                        }}
                        className="text-center flex flex-col items-center"
                    >
                        <p className="text-white/60 text-base md:text-lg font-light mt-4 md:mt-6 max-w-sm mx-auto leading-relaxed">
                            A curated sanctuary for significant moments in Hyderabad.
                        </p>
                        <div className="mt-8 md:mt-10 flex flex-wrap gap-3 md:gap-4 justify-center pointer-events-auto">
                            <a
                                href="/virtual-tour"
                                className="px-6 md:px-8 py-3 bg-white text-black text-xs md:text-sm uppercase tracking-widest font-medium rounded-full hover:bg-white/90 active:scale-95 transition-all shadow-xl"
                            >
                                Explore Venues
                            </a>
                            <a
                                href="#contact"
                                className="px-6 md:px-8 py-3 border border-white/30 text-white text-xs md:text-sm uppercase tracking-widest font-medium rounded-full hover:bg-white/10 active:scale-95 transition-all"
                            >
                                Request Inspection
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* Progress hints */}
                <motion.div
                    animate={{ opacity: progress < 0.02 ? 1 : 0 }}
                    className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
                >
                    <span className="text-[9px] font-mono uppercase tracking-[0.5em] text-white/40">
                        Scroll to explore
                    </span>
                    <div className="w-[1px] h-6 md:h-8 bg-white/20 animate-pulse" />
                </motion.div>
            </div>
        </div>
    );
}
