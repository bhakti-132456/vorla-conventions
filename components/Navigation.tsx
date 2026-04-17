"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navigation() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { label: "Sanctuary", href: "/" },
        { label: "Virtual Tour", href: "/virtual-tour" },
        { label: "Gallery", href: "/gallery" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
    ];

    // Close menu when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    // Prevent scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    return (
        <nav className="fixed top-0 left-0 w-full z-[100] flex justify-between items-center px-6 py-6 md:px-12 md:py-8 pointer-events-none">
            {/* Logo Monogram on the Left */}
            <Link 
                href="/" 
                className="pointer-events-auto group relative flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 z-[110]"
            >
                <Image 
                    src="/images/vorla-icon-monogram.png" 
                    alt="Vorla Monogram" 
                    width={32}
                    height={32}
                    className="object-contain group-hover:scale-110 transition-transform duration-500" 
                    priority 
                    unoptimized
                />
            </Link>

            {/* Desktop Menu - Hidden on Mobile */}
            <div className="hidden md:flex pointer-events-auto items-center backdrop-blur-xl bg-black/40 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-white/10 px-8 py-3 gap-8 hover:bg-black/50 transition-colors duration-300">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="relative group shrink-0"
                        >
                            <span
                                className={`text-xs font-mono uppercase tracking-[0.2em] transition-colors duration-300 ${isActive
                                    ? "text-white font-medium"
                                    : "text-zinc-400 group-hover:text-white"
                                    }`}
                            >
                                {item.label}
                            </span>
                            {isActive && (
                                <motion.span 
                                    layoutId="nav-active"
                                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" 
                                />
                            )}
                        </Link>
                    );
                })}
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden pointer-events-auto z-[110] w-12 h-12 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white"
                aria-label="Toggle Menu"
            >
                <AnimatePresence mode="wait" initial={false}>
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ opacity: 0, rotate: -90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 90 }}
                            transition={{ duration: 0.2 }}
                        >
                            <X size={20} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="menu"
                            initial={{ opacity: 0, rotate: 90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: -90 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Menu size={20} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </button>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[105] bg-black/90 md:hidden pointer-events-auto backdrop-blur-2xl"
                    >
                        <div className="flex flex-col items-center justify-center h-full gap-8">
                            {navItems.map((item, index) => {
                                const isActive = pathname === item.href;
                                return (
                                    <motion.div
                                        key={item.label}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 + 0.2 }}
                                    >
                                        <Link
                                            href={item.href}
                                            className="group flex flex-col items-center"
                                        >
                                            <span 
                                                className={`text-2xl font-mono uppercase tracking-[0.3em] transition-all duration-300 ${isActive ? "text-white" : "text-zinc-500 group-hover:text-white"
                                                    }`}
                                            >
                                                {item.label}
                                            </span>
                                            {isActive && (
                                                <motion.div 
                                                    layoutId="mobile-active"
                                                    className="w-12 h-0.5 bg-white mt-2 shadow-[0_0_12px_rgba(255,255,255,0.8)]" 
                                                />
                                            )}
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>
                        
                        {/* Mobile Footer Deco */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.3 }}
                            transition={{ delay: 0.8 }}
                            className="absolute bottom-12 left-0 w-full text-center px-12"
                        >
                            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/30 to-transparent mb-6" />
                            <p className="text-[10px] font-mono tracking-[0.5em] text-white uppercase">Vorla Conventions</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
