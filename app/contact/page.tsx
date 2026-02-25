import Link from "next/link";
import { ArrowLeft, Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
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
                                Get In Touch
                            </span>
                            <h1 className="text-5xl md:text-7xl font-light uppercase tracking-tighter text-zinc-900 leading-[0.9]">
                                Initiate a<br />Dialogue
                            </h1>
                        </div>
                    </div>

                    <div className="max-w-sm">
                        <p className="text-sm font-light leading-relaxed text-zinc-500">
                            Whether you are planning a grand celebration or a corporate summit, our team is ready to assist you in designing the perfect experience. We invite you to explore the possibilities at Vorla Conventions.
                        </p>
                    </div>
                </header>

                {/* Contact Info & Form */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">

                    {/* Details */}
                    <div className="space-y-16">
                        <div className="flex items-start gap-6 group">
                            <div className="w-12 h-12 rounded-full clay-card flex items-center justify-center shrink-0 text-zinc-400 group-hover:text-zinc-800 transition-colors">
                                <MapPin size={20} />
                            </div>
                            <div>
                                <h3 className="text-sm font-mono uppercase tracking-widest text-zinc-800 mb-3">Location</h3>
                                <p className="text-zinc-500 font-light leading-relaxed">
                                    Vorla Conventions<br />
                                    Saket, Kapra<br />
                                    Hyderabad, Telangana 500062
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-6 group">
                            <div className="w-12 h-12 rounded-full clay-card flex items-center justify-center shrink-0 text-zinc-400 group-hover:text-zinc-800 transition-colors">
                                <Phone size={20} />
                            </div>
                            <div>
                                <h3 className="text-sm font-mono uppercase tracking-widest text-zinc-800 mb-3">Direct Line</h3>
                                <p className="text-zinc-500 font-light leading-relaxed">
                                    <a href="tel:+919876543210" className="hover:text-zinc-800 transition-colors">+91 98765 43210</a><br />
                                    <a href="tel:+919876543211" className="hover:text-zinc-800 transition-colors">+91 98765 43211</a>
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-6 group">
                            <div className="w-12 h-12 rounded-full clay-card flex items-center justify-center shrink-0 text-zinc-400 group-hover:text-zinc-800 transition-colors">
                                <Mail size={20} />
                            </div>
                            <div>
                                <h3 className="text-sm font-mono uppercase tracking-widest text-zinc-800 mb-3">Email Inquiries</h3>
                                <p className="text-zinc-500 font-light leading-relaxed">
                                    <a href="mailto:info@vorlaconventions.in" className="hover:text-zinc-800 transition-colors">info@vorlaconventions.in</a><br />
                                    <a href="mailto:events@vorlaconventions.in" className="hover:text-zinc-800 transition-colors">events@vorlaconventions.in</a>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="neuro-pillow p-8 md:p-12 relative overflow-hidden">
                        <h3 className="text-2xl font-light uppercase tracking-tight text-zinc-800 mb-8">Send an Inquiry</h3>
                        <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
                            <div>
                                <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-2">Your Name</label>
                                <input
                                    type="text"
                                    className="w-full bg-[var(--background)] border-none rounded-xl px-4 py-3 text-sm focus:outline-none neuro-pressed w-full placeholder:text-zinc-400 text-zinc-800 transition-all font-light"
                                    placeholder="E.g. John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    className="w-full bg-[var(--background)] border-none rounded-xl px-4 py-3 text-sm focus:outline-none neuro-pressed w-full placeholder:text-zinc-400 text-zinc-800 transition-all font-light"
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div className="flex gap-4">
                                <div className="w-1/2">
                                    <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-2">Event Type</label>
                                    <select className="w-full bg-[var(--background)] border-none rounded-xl px-4 py-3 text-sm focus:outline-none neuro-pressed w-full text-zinc-500 transition-all appearance-none font-light">
                                        <option>Wedding</option>
                                        <option>Corporate Summit</option>
                                        <option>Social Gathering</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div className="w-1/2">
                                    <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-2">Guest Count</label>
                                    <input
                                        type="number"
                                        className="w-full bg-[var(--background)] border-none rounded-xl px-4 py-3 text-sm focus:outline-none neuro-pressed w-full placeholder:text-zinc-400 text-zinc-800 transition-all font-light"
                                        placeholder="e.g. 500"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-2">Message</label>
                                <textarea
                                    rows={4}
                                    className="w-full bg-[var(--background)] border-none rounded-xl px-4 py-3 text-sm focus:outline-none neuro-pressed w-full placeholder:text-zinc-400 text-zinc-800 transition-all resize-none font-light"
                                    placeholder="Tell us about your event..."
                                />
                            </div>
                            <button className="w-full py-4 bg-zinc-800 text-white rounded-xl text-xs uppercase tracking-widest font-medium hover:bg-zinc-700 active:scale-[0.98] transition-all shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#ffffff]">
                                Submit Inquiry
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </main>
    );
}
