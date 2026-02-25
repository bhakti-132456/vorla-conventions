"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 242;

export default function HeroScrub() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [progress, setProgress] = useState(0);
    const [loadedCount, setLoadedCount] = useState(0);
    const [isReady, setIsReady] = useState(false);

    // Store loaded images
    const imagesRef = useRef<HTMLImageElement[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d", { alpha: false })!;

        // Set fixed 1080p canvas size for the 1920x1080 frames we generated
        canvas.width = 1920;
        canvas.height = 1080;

        let targetFrame = 0;
        let currentFrame = 0;
        let rafId: number;

        // Preload images
        const preload = () => {
            let loaded = 0;
            const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);

            for (let i = 1; i <= TOTAL_FRAMES; i++) {
                const img = new Image();
                const frameNum = i.toString().padStart(4, "0");
                img.src = `/images/frames/frame_${frameNum}.jpg`;

                img.onload = () => {
                    loaded++;
                    setLoadedCount(loaded);

                    // Draw first frame immediately
                    if (i === 1) {
                        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    }

                    // We consider it "ready" once the first 30 frames load so the user can start
                    if (loaded === 30) {
                        setIsReady(true);
                    }
                };
                images[i - 1] = img;
            }
            imagesRef.current = images;
        };

        preload();

        // GSAP ScrollTrigger
        ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0,
            onUpdate: (self) => {
                targetFrame = Math.round(self.progress * (TOTAL_FRAMES - 1));
                setProgress(self.progress);
            },
        });

        // Render loop with integer lerping
        const tick = () => {
            if (currentFrame !== targetFrame) {
                const diff = targetFrame - currentFrame;
                const step = diff > 0
                    ? Math.max(1, Math.ceil(diff * 0.15))
                    : Math.min(-1, Math.floor(diff * 0.15));

                currentFrame += step;
                currentFrame = Math.max(0, Math.min(TOTAL_FRAMES - 1, currentFrame));

                const img = imagesRef.current[currentFrame];
                // Only draw if the image has actually downloaded
                if (img && img.complete) {
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                }
            }
            rafId = requestAnimationFrame(tick);
        };

        rafId = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(rafId);
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

    const showText = progress > 0.65;
    const isPressed = progress > 0.88;
    const loadPercentage = Math.round((loadedCount / TOTAL_FRAMES) * 100);

    return (
        <div ref={containerRef} className="relative h-[300vh]">
            {/* Loading overlay - only wait for first 30 frames natively to avoid long block */}
            {!isReady && (
                <div className="fixed inset-0 z-[200] bg-black flex items-center justify-center">
                    <div className="flex flex-col items-center gap-6 w-64">
                        <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-white/60 transition-all duration-300"
                                style={{ width: `${loadPercentage}%` }}
                            />
                        </div>
                        <span className="text-white/40 text-[10px] font-mono uppercase tracking-[0.5em]">
                            Loading Assets — {loadPercentage}%
                        </span>
                    </div>
                </div>
            )}

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
                    }}
                >
                    <canvas
                        ref={canvasRef}
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
                    <motion.div
                        animate={{
                            opacity: showText ? 1 : 0,
                            y: showText ? 0 : 40,
                            scale: isPressed ? 0.97 : 1,
                        }}
                        transition={{
                            opacity: { duration: 0.5 },
                            y: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                            scale: { duration: 0.4 },
                        }}
                        className="text-center pointer-events-auto max-w-2xl"
                    >
                        <span className="block text-[10px] md:text-[11px] font-mono uppercase tracking-[0.6em] md:tracking-[0.8em] text-white/50 mb-4 md:mb-6">
                            The Architecture of Gathering
                        </span>
                        <h1 className="text-white text-5xl md:text-8xl font-light uppercase tracking-tighter leading-[0.9]">
                            Vorla<br />Conventions
                        </h1>
                        <p className="text-white/60 text-base md:text-lg font-light mt-4 md:mt-6 max-w-md mx-auto leading-relaxed">
                            A curated sanctuary for significant moments in Hyderabad.
                        </p>
                        <div className="mt-8 md:mt-10 flex flex-wrap gap-3 md:gap-4 justify-center">
                            <a
                                href="/virtual-tour"
                                className="px-6 md:px-8 py-3 bg-white text-black text-xs md:text-sm uppercase tracking-widest font-medium rounded-full hover:bg-white/90 active:scale-95 transition-all"
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
                    animate={{ opacity: progress < 0.02 && isReady ? 1 : 0 }}
                    className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
                >
                    <span className="text-[9px] font-mono uppercase tracking-[0.5em] text-white/40">
                        Scroll to explore
                    </span>
                    <div className="w-[1px] h-6 md:h-8 bg-white/20 animate-pulse" />
                </motion.div>

                {/* Load bar */}
                <div className="absolute top-0 right-0 p-4 text-[9px] font-mono text-white/30 pointer-events-none">
                    {loadPercentage < 100 ? `BUFFERING ${loadPercentage}%` : "MUSEUM GRADE"}
                </div>
            </div>
        </div>
    );
}
