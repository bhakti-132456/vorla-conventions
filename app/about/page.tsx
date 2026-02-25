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
                q: "How far in advance should I book Vorla Conventions?",
                a: "For weddings, we recommend booking 6-12 months ahead, especially if you have a specific date or season in mind. For corporate events and celebrations, 2-3 months typically works well. That said, we often accommodate shorter timelines depending on availability."
            },
            {
                q: "What dates are typically available?",
                a: "We remain open year-round for events. Peak seasons include October through December, and March through May. If you have flexibility with your date, we can often offer better availability and, sometimes, more favorable pricing."
            },
            {
                q: "Can I book multiple days or nights at your venue?",
                a: "Absolutely. Many families book us for multi-day celebrations. Think mehendi followed by wedding, or extended corporate retreats. We can discuss multi-day packages that make sense for your event."
            }
        ]
    },
    {
        category: "Capacity & Space",
        questions: [
            {
                q: "What's the maximum capacity, and can you accommodate groups of different sizes?",
                a: "Our flexible banquet halls comfortably host anywhere from 200 to 1000+ guests. We can configure spaces to feel intimate for smaller gatherings or grand for large celebrations."
            },
            {
                q: "Are there separate spaces for different parts of the event?",
                a: "Yes. We have dedicated areas for ceremonies, receptions, dining, and mingling. Our layout allows events to flow seamlessly, and guests can move comfortably between spaces without confusion."
            }
        ]
    },
    {
        category: "Catering & Services",
        questions: [
            {
                q: "Do you provide in-house catering, or can I bring my own caterer?",
                a: "We provide complete in-house catering with our own culinary team. Our chefs work with you to create custom menus, whether you want traditional cuisine, international dishes, or fusion concepts. If you'd like to bring your own caterer, we're happy to accommodate that with a nominal fee for venue access."
            },
            {
                q: "Can you accommodate dietary restrictions and allergies?",
                a: "Absolutely. We manage vegetarian, vegan, gluten-free, nut allergies, or any other requirements with care and transparency. Please inform us during planning."
            },
            {
                q: "Is parking available for guests?",
                a: "Yes. We provide 800+ dedicated parking spaces at no additional cost. Guests never worry about finding parking. Our lot is well-lit and secure."
            }
        ]
    }
];

function Accordion({ q, a }: { q: string; a: string }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border-b border-zinc-200 py-6 cursor-pointer group" onClick={() => setOpen(!open)}>
            <div className="flex justify-between items-center gap-8">
                <h4 className={`text-lg transition-colors duration-300 font-light ${open ? 'text-zinc-900' : 'text-zinc-600 group-hover:text-zinc-900'}`}>
                    {q}
                </h4>
                <div className="text-zinc-400 group-hover:text-zinc-900 transition-colors">
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
                            className="group flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.4em] text-zinc-500 hover:text-zinc-800 transition-colors"
                        >
                            <div className="w-8 h-8 rounded-full neuro-pillow flex items-center justify-center group-hover:scale-110 transition-transform">
                                <ArrowLeft size={12} />
                            </div>
                            Back to Sanctuary
                        </Link>

                        <div>
                            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-4 block">
                                Heritage & Provenance
                            </span>
                            <h1 className="text-5xl md:text-7xl font-light uppercase tracking-tighter text-zinc-900 leading-[0.9]">
                                About Vorla <br /> Conventions
                            </h1>
                        </div>
                    </div>

                    <div className="max-w-sm">
                        <p className="text-sm font-light leading-relaxed text-zinc-500">
                            Established in 2008, Vorla Conventions has proudly set the standard as the first air-conditioned function hall in the area, earning a reputation as the best in its class.
                        </p>
                    </div>
                </header>

                {/* Narrative Section */}
                <section className="neuro-pillow p-8 md:p-16 mb-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-light uppercase tracking-tight text-zinc-800 mb-6">A Family Legacy</h2>
                        <div className="space-y-6 text-zinc-600 font-light leading-relaxed">
                            <p>
                                Our venue is not just a business; it embodies our family legacy and carries our name with pride. We are deeply committed to providing exceptional service and creating unforgettable experiences for every guest who walks through our doors.
                            </p>
                            <p>
                                Our dedicated management team works tirelessly to uphold the high standards that have defined us for over a decade, ensuring that each event reflects our passion for excellence. At Vorla Conventions, we believe that every celebration deserves to be extraordinary.
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
                                <h3 className="text-xl font-medium uppercase tracking-widest text-zinc-800 mb-6 pb-2 border-b-2 border-zinc-800 inline-block">
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
