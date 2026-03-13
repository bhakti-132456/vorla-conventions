"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * HeroScrub Component
 * Optimized for butter-smooth video scrubbing and UI transitions.
 * 
 * Key Performance Optimizations:
 * 1. Zero React state updates during scroll (no re-renders).
 * 2. GSAP Timeline handles all visual properties (opacity, scale, transforms).
 * 3. requestAnimationFrame (rAF) loop for video seeking to interpolate and smooth out jumps.
 * 4. Single ScrollTrigger instance created once on mount.
 */
export default function HeroScrub() {
    // DOM Refs
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const videoWrapperRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const eyebrowRef = useRef<HTMLSpanElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const ctaWrapperRef = useRef<HTMLDivElement>(null);
    const progressHintRef = useRef<HTMLDivElement>(null);

    // Animation Values (Stored in refs to avoid React lifecycle interference)
    const targetTime = useRef(0);
    const currentTime = useRef(0);
    const rafId = useRef<number>(0);

    useEffect(() => {
        const video = videoRef.current;
        const container = containerRef.current;
        if (!video || !container) return;

        // PREFERS REDUCED MOTION SUPPORT
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        // 1. Initial State Setup
        // We set these imperatively to avoid jumpy starts before GSAP takes over
        gsap.set([overlayRef.current, eyebrowRef.current, ctaWrapperRef.current], {
            opacity: 0,
            visibility: "visible"
        });
        gsap.set(headlineRef.current, { opacity: 0, scale: 1.1 });
        gsap.set([eyebrowRef.current, ctaWrapperRef.current], { y: 30 });

        // 2. Video Scrubbing Loop (rAF)
        // This decouples the scroll event from the heavy browser task of video seeking.
        const render = () => {
            if (video.readyState >= 2 && video.duration) { // Check if metadata is ready
                const diff = targetTime.current - currentTime.current;

                // If the difference is small, we skip to save CPU
                if (Math.abs(diff) > 0.001) {
                    // LERP formula for smoothing: current + (dist * speed)
                    // Lower values = smoother/heavier feel.
                    currentTime.current += diff * 0.15;
                    video.currentTime = currentTime.current;
                }
            }
            rafId.current = requestAnimationFrame(render);
        };

        if (!prefersReducedMotion) {
            rafId.current = requestAnimationFrame(render);
        }

        // 3. The Main Animation Timeline
        // This timeline is pinned to the scroll progress.
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: "top top",
                end: "bottom bottom",
                scrub: true, // This is essential for the smooth sync
                onUpdate: (self) => {
                    // Instead of seeking video here, we just set the target
                    if (video.duration) {
                        targetTime.current = self.progress * video.duration;
                    }
                }
            }
        });

        // 4. UI Transition Sequence
        // Note: Using absolute time offsets or labels to coordinate timing precisely.

        // Fade out initial elements & Nav early
        tl.to('nav', { opacity: 0, pointerEvents: 'none', duration: 0.1 }, 0)
            .to(progressHintRef.current, { opacity: 0, duration: 0.1 }, 0);

        // Content Reveal Phase (Starting around 60% scroll)
        tl.to(overlayRef.current, {
            opacity: 0.85,
            duration: 0.3
        }, 0.6)
            .to(eyebrowRef.current, {
                opacity: 0.5,
                y: 0,
                duration: 0.3
            }, 0.65)
            .to(headlineRef.current, {
                opacity: 1,
                scale: 1,
                duration: 0.4,
                ease: "power2.out"
            }, 0.68)
            .to(ctaWrapperRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.4,
                ease: "power2.out"
            }, 0.72);

        // Neuromorphic "Pressed" Effect at the end of scroll
        tl.to(videoWrapperRef.current, {
            scale: 0.98,
            borderRadius: "32px",
            boxShadow: "inset 6px 6px 12px rgba(0,0,0,0.4), inset -6px -6px 12px rgba(255,255,255,0.1)",
            duration: 0.2,
            ease: "power1.inOut"
        }, 0.88);

        // Re-show Global Nav at the end of the scroll container
        tl.to('nav', { opacity: 1, pointerEvents: 'auto', duration: 0.1 }, 0.95);

        // Kill everything on unmount
        return () => {
            if (rafId.current) cancelAnimationFrame(rafId.current);
            tl.kill();
            ScrollTrigger.getAll().forEach(st => st.kill());
            gsap.set('nav', { opacity: 1, pointerEvents: 'auto', clearProps: "all" });
        };
    }, []);

    return (
        <div ref={containerRef} className="relative h-[400vh]">
            {/* Sticky viewport prevents layout shifts */}
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">

                {/* 
                  Video Container:
                  Using will-change: transform to promote this layer to GPU.
                */}
                <div
                    ref={videoWrapperRef}
                    className="w-full h-full overflow-hidden will-change-transform"
                    style={{
                        transformOrigin: "center center",
                        transition: "border-radius 0.6s ease" // Smooth transition for corner rounding
                    }}
                >
                    <video
                        ref={videoRef}
                        src="/videos/vorla-hero-home-1080p.mp4"
                        poster="/videos/vorla-hero-home-poster.jpg"
                        muted
                        playsInline
                        disablePictureInPicture
                        preload="auto"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Scrim Overlay */}
                <div
                    ref={overlayRef}
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{
                        background: "linear-gradient(to top, black 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
                    }}
                />

                {/* UI Elements Layer */}
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-6">
                    <span
                        ref={eyebrowRef}
                        className="block text-[10px] md:text-[11px] font-mono uppercase tracking-[0.6em] md:tracking-[0.8em] text-white/80 mb-4 md:mb-6"
                    >
                        The Architecture of Gathering
                    </span>

                    <h1
                        ref={headlineRef}
                        className="text-white text-4xl sm:text-5xl md:text-8xl font-light uppercase tracking-tighter leading-[0.9] text-center"
                    >
                        Vorla<br />Conventions
                    </h1>

                    <div ref={ctaWrapperRef} className="text-center flex flex-col items-center w-full px-4">
                        <p className="text-white/60 text-sm md:text-lg font-light mt-4 md:mt-6 max-w-[280px] sm:max-w-sm mx-auto leading-relaxed">
                            A curated sanctuary for significant moments.
                        </p>
                        <div className="mt-6 md:mt-10 flex flex-col sm:flex-row gap-3 md:gap-4 justify-center pointer-events-auto">
                            <a
                                href="/virtual-tour"
                                className="px-6 md:px-8 py-3 bg-white text-black text-[10px] md:text-sm uppercase tracking-widest font-medium rounded-full hover:bg-neutral-200 transition-all shadow-xl active:scale-95"
                            >
                                Explore Venues
                            </a>
                            <a
                                href="#contact"
                                className="px-6 md:px-8 py-3 border border-white/30 text-white text-[10px] md:text-sm uppercase tracking-widest font-medium rounded-full hover:bg-white/10 transition-all active:scale-95 text-center"
                            >
                                Request Inspection
                            </a>
                        </div>
                    </div>
                </div>

                {/* Initial Interaction Hint */}
                <div
                    ref={progressHintRef}
                    className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-30"
                >
                    <span className="text-[9px] font-mono uppercase tracking-[0.5em] text-white/40">
                        Scroll to explore
                    </span>
                    <div className="w-[1px] h-6 md:h-8 bg-white/20 animate-pulse" />
                </div>
            </div>
        </div>
    );
}

