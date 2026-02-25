"use client";

import { motion } from "framer-motion";
import Magnetic from "./Magnetic";

interface HotspotProps {
    title: string;
    description: string;
    x: string;
    y: string;
    show: boolean;
    delay?: number;
}

export default function Hotspot({ title, description, x, y, show, delay = 0 }: HotspotProps) {
    return (
        <div
            className="absolute pointer-events-auto"
            style={{ left: x, top: y }}
        >
            <Magnetic>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={show ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
                    transition={{ duration: 0.5, delay, ease: [0.215, 0.61, 0.355, 1] }}
                    className="clay-card p-6 w-64 group cursor-pointer"
                >
                    <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 group-hover:text-zinc-600 transition-colors">
                            Featured Asset
                        </span>
                        <h4 className="text-xl font-light uppercase tracking-tight text-zinc-800">
                            {title}
                        </h4>
                        <p className="text-sm font-light leading-relaxed text-zinc-500">
                            {description}
                        </p>
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                        <div className="w-8 h-[1px] bg-zinc-200 group-hover:w-12 transition-all duration-300" />
                        <span className="text-[10px] uppercase font-bold tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">
                            Explore Space
                        </span>
                    </div>
                </motion.div>
            </Magnetic>
        </div>
    );
}
