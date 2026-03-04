"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function Navigation() {
    const pathname = usePathname();
    const [clickedItem, setClickedItem] = useState<string | null>(null);

    const navItems = [
        { label: "Sanctuary", href: "/" },
        { label: "Virtual Tour", href: "/virtual-tour" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
    ];

    const handlePointerDown = (label: string) => setClickedItem(label);
    const handlePointerUp = () => setClickedItem(null);

    return (
        <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
            <div className="p-3 px-6 flex items-center gap-6 backdrop-blur-xl bg-[#111111]/80 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.6)] border border-white/5">
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
                                    : "text-zinc-500 group-hover:text-zinc-300"
                                    }`}
                            >
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
