"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

export default function HeroScrub() {
    const videoRef = useRef<HTMLVideoElement>(null);

    return (
        <div className="relative w-full h-[100vh] min-h-[600px] overflow-hidden bg-black flex items-center justify-center">
            {/* Video Background Layer */}
            <div className="absolute inset-0 w-full h-full">
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    disablePictureInPicture
                    className="w-full h-full object-cover opacity-80"
                    poster="/videos/vorla-hero-home-1080p-poster.jpg"
                >
                    <source src="/videos/vorla-hero-home-1080p-mobile.mp4" media="(max-width: 767px)" type="video/mp4" />
                    <source src="/videos/vorla-hero-home-1080p.mp4" media="(min-width: 768px)" type="video/mp4" />
                </video>
            </div>

            {/* Gradient Overlay for Text Readability */}
            <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                    background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.6) 100%)",
                }}
            />

            {/* UI Content Layer */}
            <div className="relative z-20 flex flex-col items-center justify-center pointer-events-none px-6 w-full max-w-7xl mt-12 md:mt-24">
                
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                    className="flex flex-col items-center text-center w-full"
                >
                    <span className="block text-[10px] md:text-[11px] font-mono uppercase tracking-[0.6em] md:tracking-[0.8em] md:mr-[-0.8em] text-white/80 mb-4 md:mb-6">
                        The Most Prestigious Venue in Hyderabad
                    </span>

                    <h1 className="text-white text-4xl sm:text-5xl md:text-8xl font-light uppercase tracking-tighter leading-[0.9]">
                        Vorla<br />Conventions
                    </h1>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                    className="text-center flex flex-col items-center w-full px-4 mt-8 md:mt-12"
                >
                    <p className="text-white/80 text-sm md:text-lg font-light max-w-[280px] sm:max-w-sm mx-auto leading-relaxed drop-shadow-md">
                        The finest <strong>convention center in Secunderabad</strong>. 68,000 sq ft of <strong>pillarless grand hall</strong> in Sainikpuri, Saket.
                    </p>
                    
                    <div className="mt-8 md:mt-12 flex flex-col sm:flex-row gap-4 justify-center pointer-events-auto w-full sm:w-auto">
                        <a
                            href="/virtual-tour"
                            className="px-8 py-3.5 bg-white text-black text-[10px] md:text-sm uppercase tracking-widest font-medium rounded-full hover:bg-neutral-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] active:scale-95 text-center flex-1 sm:flex-none"
                        >
                            Explore Venues
                        </a>
                        <a
                            href="#contact"
                            className="px-8 py-3.5 border border-white/40 bg-black/20 backdrop-blur-sm text-white text-[10px] md:text-sm uppercase tracking-widest font-medium rounded-full hover:bg-white/20 hover:border-white transition-all active:scale-95 text-center flex-1 sm:flex-none"
                        >
                            Request Inspection
                        </a>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none z-30"
            >
                <div className="flex flex-col items-center gap-2 animate-pulse">
                    <span className="text-[9px] font-mono uppercase tracking-[0.5em] text-white/60">
                        Scroll to explore
                    </span>
                    <div className="w-[1px] h-8 md:h-12 bg-white/40" />
                </div>
            </motion.div>
        </div>
    );
}

