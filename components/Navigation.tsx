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
            <div className="clay-card p-3 px-6 flex items-center gap-6 backdrop-blur-md bg-[var(--background)]/60 rounded-full">
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
                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${isClicked
                                    ? "neuro-pressed scale-90 rounded-full"
                                    : isActive
                                        ? "clay-card rounded-full"
                                        : "hover:bg-black/5 rounded-full"
                                    }`}
                            >
                                <div
                                    className={`w-2 h-2 rounded-full transition-colors ${isActive ? "bg-zinc-800" : "bg-zinc-400"
                                        }`}
                                />
                            </div>
                            <span
                                className={`text-[8px] font-mono uppercase tracking-[0.15em] transition-colors ${isActive
                                    ? "text-zinc-900 font-bold"
                                    : "text-zinc-400 group-hover:text-zinc-600"
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
