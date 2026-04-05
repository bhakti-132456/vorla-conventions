"use client";

import Link from "next/link";
import { ArrowLeft, Plus, Minus } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Script from "next/script";

const FAQS = [
    {
        category: "Availability & Booking",
        questions: [
            {
                q: "How far in advance should I book Vorla Conventions?",
                a: "For weddings, we recommend booking 6-12 months ahead, especially if you have a specific date or season in mind. For corporate events and celebrations, 2-3 months typically works well. That said, we often accommodate shorter timelines depending on availability. The best way to know is to reach out. We're usually more flexible than you'd expect."
            },
            {
                q: "What dates are typically available?",
                a: "We remain open year-round for events. Peak seasons include October through December (wedding season) and March through May. If you have flexibility with your date, we can often offer better availability and, sometimes, more favorable pricing. We also work beautifully for off-season events. There's something special about a winter celebration or monsoon-season gathering in Saket."
            },
            {
                q: "Can I book multiple days or nights at your venue?",
                a: "Absolutely. Many families book us for multi-day celebrations. Think mehendi followed by wedding, or extended corporate retreats. We can discuss multi-day packages that make sense for your event."
            },
            {
                q: "How do I book a tour or move forward with inquiry?",
                a: "Reach out to our events team through our website or phone. We'll schedule a convenient time for you to visit. Come with your questions. We love talking through the details and understanding your vision. After your tour, we can discuss dates, pricing, and next steps."
            }
        ]
    },
    {
        category: "Capacity & Space",
        questions: [
            {
                q: "What's the maximum capacity, and can you accommodate groups of different sizes?",
                a: "Our flexible banquet halls comfortably host anywhere from 200 to 1000+ guests. We can configure spaces to feel intimate for smaller gatherings or grand for large celebrations. We never want your event to feel too empty or too crowded. The space should match your guest count and create the right atmosphere."
            },
            {
                q: "Can I see the venue before booking?",
                a: "Of course. We encourage private tours so you can experience the space, understand the layout, and envision your event here. Tours are by appointment and usually take 30 to 45 minutes. Bring your partner, your planner, or whoever will help you make the decision. We're happy to answer questions and walk you through setup options."
            },
            {
                q: "Are there separate spaces for different parts of the event?",
                a: "Yes. We have dedicated areas for ceremonies, receptions, dining, and mingling. Our layout allows events to flow seamlessly. Guests can move comfortably between spaces without confusion. For corporate events, we can set up breakout rooms for sessions or workshops."
            }
        ]
    },
    {
        category: "Catering & Food",
        questions: [
            {
                q: "Do you provide in-house catering, or can I bring my own caterer?",
                a: "We provide complete in-house catering with our own culinary team. This ensures quality, consistency, and seamless coordination on your event day. Our chefs work with you to create custom menus, whether you want traditional cuisine, international dishes, or fusion concepts. We pride ourselves on food quality and presentation."
            },
            {
                q: "What cuisines do you offer?",
                a: "Our kitchen is equipped to prepare Indian, Continental, Asian, and fusion cuisine at the highest level. We work closely with you to understand your preferences, dietary requirements, and cultural traditions. Many families have their own family recipes or special dishes they'd like featured. We're open to collaborating with you on this."
            },
            {
                q: "Can you accommodate dietary restrictions and allergies?",
                a: "Absolutely. We take dietary restrictions very seriously. Whether it's vegetarian, vegan, gluten-free, nut allergies, or any other requirement, we manage this with care and transparency. Please inform us during planning so we can ensure safe preparation and service."
            }
        ]
    },
    {
        category: "Services & Coordination",
        questions: [
            {
                q: "What's included in your event coordination?",
                a: "Our experienced team handles the operational side of your event. Think timeline management, vendor coordination, setup, guest flow, and on-the-day troubleshooting. We're here to ensure everything runs smoothly so you can focus on enjoying your celebration. We work with your vision and preferences, not against them."
            },
            {
                q: "Do you have a preferred vendor list, or can I hire my own decorator, photographer, etc.?",
                a: "For photography, videography, music, and other services, you're completely free to hire your own vendors. We work smoothly with external partners and have a trusted list of recommendations if you'd like suggestions. We offer in-house decoration and catering as our standard options, which many clients prefer for seamless coordination and consistent quality. If you'd like to bring your own decorator or caterer, we're happy to accommodate that with a nominal fee for venue access and coordination. Many clients appreciate our in-house decoration and catering because it simplifies planning and ensures everything is coordinated on the day. But the choice is entirely yours."
            },
            {
                q: "How long can we book the venue for?",
                a: "Booking durations vary based on your event type. For weddings, you typically have the entire day (morning through night). For corporate events, we customize based on your needs. We can discuss specific timelines during your consultation."
            },
            {
                q: "What happens if we need to run late? Are there overtime charges?",
                a: "We build reasonable flexibility into our packages. If you're running behind, we work with you. Excessive overtime fees aren't our style. We'd rather collaborate on timing than surprise you with bills. Discuss specifics with our team."
            }
        ]
    },
    {
        category: "Logistics & Parking",
        questions: [
            {
                q: "Is parking available for guests?",
                a: "Yes. We provide 800+ dedicated parking spaces at no additional cost. This is one of our biggest advantages. Guests never worry about finding parking. Our lot is well-lit and secure."
            },
            {
                q: "How is the venue located relative to the major areas in Hyderabad and Secunderabad?",
                a: "Vorla Conventions is in Saket, Kapra (postal code 500062). We're conveniently central for guests traveling from across the city. The area is well-connected with good road access. Most parts of Hyderabad are within 20 to 30 minutes by car depending on traffic."
            }
        ]
    },
    {
        category: "Pricing & Payment",
        questions: [
            {
                q: "What's included in your venue hire price?",
                a: "Our packages include the space, catering, basic AV setup, tables, chairs, and our coordination services. We provide a detailed breakdown so you know exactly what's covered. We're transparent about pricing. No hidden fees."
            },
            {
                q: "Are taxes included in the quoted price?",
                a: "We provide pricing both with and without applicable taxes. We explain all charges upfront so there are no surprises."
            },
            {
                q: "What's your payment schedule and cancellation policy?",
                a: "We require a deposit to secure your date, with the balance due closer to your event. Specific payment terms depend on your event size and type. Our cancellation policy is reasonable and flexible. We understand life happens. Discuss this directly with our team."
            },
            {
                q: "Can you work within a specific budget?",
                a: "Yes. We serve a range of budgets and event sizes. If you have a budget in mind, tell us, and we'll work with you to create an experience that delivers value. We believe great events don't always require massive spending. They require thoughtfulness."
            }
        ]
    },
    {
        category: "Event-Specific Questions",
        questions: [
            {
                q: "Have you hosted weddings/corporate events like ours before?",
                a: "Yes. We've hosted 5000+ events over the years: weddings, receptions, corporate conferences, team gatherings, cultural celebrations, and everything in between. If you want to see photos or hear from past clients, we're happy to share references and examples."
            },
            {
                q: "Can you handle very large guest lists (800+)?",
                a: "Absolutely. Our space and team are designed for large events. We've successfully hosted events with 1000+ guests. Large gatherings require careful planning, but we're experienced at managing logistics seamlessly."
            },
            {
                q: "What if we want a non-traditional event setup?",
                a: "Great. Many couples and organizers have unique visions: unconventional timings, mixed ceremony styles, creative layouts. We're open to working with your ideas. Our team thrives on creating memorable, personalized experiences. Tell us what you're envisioning, and let's discuss feasibility."
            },
            {
                q: "Do you host corporate team building, off-sites, or training events?",
                a: "Yes. We regularly host corporate gatherings: strategy meetings, product launches, team-building events, training sessions, and company celebrations. Our AV setup supports presentations and virtual participation if needed. Our space can be configured for different meeting styles."
            }
        ]
    },
    {
        category: "Safety & Security",
        questions: [
            {
                q: "What's your safety and security setup?",
                a: "We take guest safety seriously. Our venue is secure with controlled access. We can discuss specific security arrangements if needed for your event. We also maintain compliance with all local regulations and fire safety codes."
            },
            {
                q: "What's your policy on photography and videography?",
                a: "You're welcome to hire photographers and videographers. They have full access to capture your event. Discuss any specific requirements with our team beforehand."
            },
            {
                q: "What happens if something goes wrong on the day?",
                a: "Our team is trained to handle unexpected situations calmly and professionally. We have contingency plans for common issues. With 5000+ events under our belt, we've seen it all and know how to adapt. Your peace of mind is important to us."
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
    // Generate FAQ JSON-LD for AEO (Answer Engine Optimization)
    const faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQS.flatMap((section) =>
            section.questions.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: item.a,
                },
            }))
        ),
    };

    return (
        <main className="min-h-screen bg-[var(--background)] p-6 md:p-12 lg:p-24 selection:bg-zinc-800 selection:text-white">
            <Script
                id="faq-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
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
                                Best Convention Center in Hyderabad &amp; Secunderabad
                            </span>
                            <h1 className="text-5xl md:text-7xl font-light uppercase tracking-tighter text-zinc-900 dark:text-zinc-100 leading-[0.9]">
                                Heritage & <br /> Provenance
                            </h1>
                        </div>
                    </div>

                    <div className="max-w-sm">
                        <p className="text-sm font-light leading-relaxed text-zinc-500">
                            Established in 2008, <strong>Vorla Conventions</strong> was a pioneer—the first fully <strong>AC function hall</strong> in <strong>Sainikpuri</strong> and <strong>Saket</strong>. Since then, we have evolved from a local landmark into <strong>Hyderabad&apos;s</strong> premier destination for grand events spanning <strong>68,000 square feet</strong>. We don&apos;t just host events; we curate environments where memories are preserved at the finest <strong>convention center in Secunderabad</strong>.
                        </p>
                    </div>
                </header>

                {/* Narrative Section */}
                <section className="neuro-pillow p-8 md:p-16 mb-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-light uppercase tracking-tight text-zinc-800 dark:text-zinc-100 mb-6">Unmatched Amenities,<br />Professional Standards.</h2>
                        <div className="space-y-6 text-zinc-600 font-light leading-relaxed">
                            <p>
                                As a family-run estate, our commitment is personal. Every detail, from the maintenance of our <strong>pillarless halls</strong> to the hospitality shown to every guest, is overseen with a standard of excellence. Our venue features <strong>massive secure parking</strong>, <strong>air-conditioned bridal and groom suites</strong>, and the flexibility of <strong>in-house multi-cuisine catering</strong> or <strong>outside catering vendors</strong>—making us the <strong>best wedding venue in Sainikpuri</strong> and across <strong>North Hyderabad</strong>.
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
