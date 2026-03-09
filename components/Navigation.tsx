"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

export default function Navigation() {
    const pathname = usePathname();
    const [clickedItem, setClickedItem] = useState<string | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);

    const navItems = [
        { label: "Sanctuary", href: "/" },
        { label: "Virtual Tour", href: "/virtual-tour" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
    ];

    const handlePointerDown = (label: string) => setClickedItem(label);
    const handlePointerUp = () => setClickedItem(null);

    return (
        <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex justify-center">
            <div
                className={`flex items-center backdrop-blur-xl bg-[#111111]/80 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.6)] border border-white/5 transition-all duration-500 overflow-hidden ${isExpanded ? 'p-3 px-6 gap-6 w-auto' : 'p-3 w-[64px] h-[64px] justify-center cursor-pointer hover:bg-[#222222]/80 hover:scale-105 active:scale-95'}`}
                onClick={() => !isExpanded && setIsExpanded(true)}
            >
                {/* Monogram / Toggle Button */}
                <button
                    onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 relative ${isExpanded ? 'hover:bg-white/10' : ''} transition-colors group z-10 cursor-pointer`}
                    aria-label={isExpanded ? "Close menu" : "Open menu"}
                >
                    <div className="relative w-8 h-8 group-hover:scale-105 transition-transform">
                        <Image src="/images/vorla-icon-monogram.png" alt="Menu" fill className="object-contain" />
                    </div>
                </button>

                {isExpanded && (
                    <>
                        <div className="w-px h-8 bg-white/10 shrink-0" />

                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            const isClicked = clickedItem === item.label;
                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    onPointerDown={() => handlePointerDown(item.label)}
                                    onPointerUp={handlePointerUp}
                                    onPointerLeave={handlePointerUp}
                                    onClick={() => setIsExpanded(false)}
                                    className="group flex flex-col items-center gap-1"
                                >
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isClicked
                                            ? "bg-black/60 scale-90 shadow-[inset_0_4px_8px_rgba(0,0,0,0.6)]"
                                            : isActive
                                                ? "bg-[#222222] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_4px_12px_rgba(0,0,0,0.4)]"
                                                : "hover:bg-white/5"
                                            }`}
                                    >
                                        <div
                                            className={`w-2 h-2 rounded-full transition-colors ${isActive ? "bg-white" : "bg-zinc-500"
                                                }`}
                                        />
                                    </div>
                                    <span
                                        className={`text-[8px] font-mono uppercase tracking-[0.15em] transition-colors ${isActive
                                            ? "text-white font-bold"
                                            : "text-zinc-300 group-hover:text-white"
                                            }`}
                                    >
                                        {item.label}
                                    </span>
                                </Link>
                            );
                        })}
                    </>
                )}
            </div>
        </nav>
    );
}
