"use client";

import Link from "next/link";
import { ArrowLeft, Plus, Minus } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
    {
        category: "Availability & Booking",
        questions: [
            {
                q: "What's the maximum capacity?",
                a: "Our twin estates cater to diverse needs, from intimate 700-guest gatherings to grand 1,200+ guest conventions."
            },
            {
                q: "How early should we book?",
                a: "We recommend booking 6-12 months in advance for peak wedding seasons in Hyderabad."
            }
        ]
    },
    {
        category: "Capacity & Space",
        questions: [
            {
                q: "Do you offer catering services?",
                a: "We offer flexible options to suit your culinary preferences, ensuring your banquet is as memorable as the setting."
            }
        ]
    },
    {
        category: "Catering & Services",
        questions: [
            {
                q: "Is parking available?",
                a: "Ample, secure parking ensures your guests' journey begins with ease and comfort."
            }
        ]
    }
];

function Accordion({ q, a }: { q: string; a: string }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border-b border-zinc-200 py-6 cursor-pointer group" onClick={() => setOpen(!open)}>
            <div className="flex justify-between items-center gap-8">
                <h4 className={`text-lg transition-colors duration-300 font-light ${open ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-600 group-hover:text-zinc-900 dark:group-hover:text-zinc-100'}`}>
                    {q}
                </h4>
                <div className="text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
                    {open ? <Minus size={18} /> : <Plus size={18} />}
                </div>
            </div>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <p className="pt-4 text-zinc-500 font-light leading-relaxed pr-12">
                            {a}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[var(--background)] p-6 md:p-12 lg:p-24 selection:bg-zinc-800 selection:text-white">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <header className="mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
                    <div className="flex flex-col gap-8">
                        <Link
                            href="/"
                            className="group flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.4em] text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
                        >
                            <div className="w-8 h-8 rounded-full neuro-pillow flex items-center justify-center group-hover:scale-110 transition-transform">
                                <ArrowLeft size={12} />
                            </div>
                            Back to Sanctuary
                        </Link>

                        <div>
                            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-4 block">
                                The Original Premium Venue of Saket
                            </span>
                            <h1 className="text-5xl md:text-7xl font-light uppercase tracking-tighter text-zinc-900 dark:text-zinc-100 leading-[0.9]">
                                Heritage & <br /> Provenance
                            </h1>
                        </div>
                    </div>

                    <div className="max-w-sm">
                        <p className="text-sm font-light leading-relaxed text-zinc-500">
                            Established in 2008, Vorla Conventions was a pioneer—the first fully AC function hall in the area. Since then, we have evolved from a local landmark into Hyderabad&apos;s premier destination for grand events. We don&apos;t just host events; we curate environments where memories are preserved.
                        </p>
                    </div>
                </header>

                {/* Narrative Section */}
                <section className="neuro-pillow p-8 md:p-16 mb-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-light uppercase tracking-tight text-zinc-800 dark:text-zinc-100 mb-6">Personal Management,<br />Professional Standards.</h2>
                        <div className="space-y-6 text-zinc-600 font-light leading-relaxed">
                            <p>
                                As a family-run estate, our commitment is personal. Every detail, from the maintenance of our pillar-less halls to the hospitality shown to every guest, is overseen with a standard of excellence that only a legacy-driven team can provide.
                            </p>
                        </div>
                    </div>
                    <div className="clay-card aspect-square md:aspect-[4/3] w-full relative overflow-hidden">
                        {/* Using standard Unsplash placeholder since we don't have the original photos from Wix downloaded correctly */}
                        <img
                            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80"
                            alt="Vorla Conventions Legacy"
                            className="object-cover w-full h-full opacity-90"
                        />
                    </div>
                </section>

                {/* FAQs */}
                <section className="max-w-4xl">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-8 block">
                        Frequently Asked Questions
                    </span>

                    <div className="space-y-16">
                        {FAQS.map((section, idx) => (
                            <div key={idx}>
                                <h3 className="text-xl font-medium uppercase tracking-widest text-zinc-800 dark:text-zinc-100 mb-6 pb-2 border-b-2 border-zinc-800 dark:border-zinc-100 inline-block">
                                    {section.category}
                                </h3>
                                <div className="flex flex-col">
                                    {section.questions.map((item, i) => (
                                        <Accordion key={i} q={item.q} a={item.a} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </main>
    );
}
