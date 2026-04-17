"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, MapPin, Phone, CheckCircle2, Loader2, Calendar, ChevronLeft, ChevronRight } from "lucide-react";

/* ──────────────────────────── Calendar Widget ──────────────────────────── */
function CalendarWidget({
    selectedDate,
    onSelect,
    onClose,
}: {
    selectedDate: string;
    onSelect: (dateStr: string) => void;
    onClose: () => void;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const today = new Date();
    const [viewYear, setViewYear] = useState(today.getFullYear());
    const [viewMonth, setViewMonth] = useState(today.getMonth());

    // Close on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) onClose();
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [onClose]);

    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const firstDay = new Date(viewYear, viewMonth, 1).getDay(); // 0=Sun
    const monthName = new Date(viewYear, viewMonth).toLocaleString("default", { month: "long" });

    const prev = () => {
        if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
        else setViewMonth((m) => m - 1);
    };
    const next = () => {
        if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
        else setViewMonth((m) => m + 1);
    };

    const handleSelect = (day: number) => {
        const d = new Date(viewYear, viewMonth, day);
        const str = d.toLocaleDateString("en-IN", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
        });
        onSelect(str);
        onClose();
    };

    // Parse selectedDate for highlighting
    const parsedSel = selectedDate ? new Date(selectedDate) : null;
    const isSelectedDay = (day: number) =>
        parsedSel &&
        parsedSel.getDate() === day &&
        parsedSel.getMonth() === viewMonth &&
        parsedSel.getFullYear() === viewYear;

    const isToday = (day: number) =>
        today.getDate() === day &&
        today.getMonth() === viewMonth &&
        today.getFullYear() === viewYear;

    const isPast = (day: number) => {
        const d = new Date(viewYear, viewMonth, day);
        d.setHours(0, 0, 0, 0);
        const t = new Date();
        t.setHours(0, 0, 0, 0);
        return d < t;
    };

    const blanks = Array.from({ length: firstDay });
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return (
        <div
            ref={ref}
            className="absolute right-0 top-full mt-2 z-50 neuro-pillow p-4 w-[300px] select-none shadow-2xl"
            style={{ borderRadius: "20px" }}
        >
            {/* Month/Year header */}
            <div className="flex items-center justify-between mb-4">
                <button
                    type="button"
                    onClick={prev}
                    className="w-8 h-8 rounded-full neuro-pressed flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100 transition-colors"
                >
                    <ChevronLeft size={14} />
                </button>
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-700 dark:text-zinc-200">
                    {monthName} {viewYear}
                </span>
                <button
                    type="button"
                    onClick={next}
                    className="w-8 h-8 rounded-full neuro-pressed flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100 transition-colors"
                >
                    <ChevronRight size={14} />
                </button>
            </div>

            {/* Weekday labels */}
            <div className="grid grid-cols-7 gap-1 mb-1">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                    <div key={d} className="text-center text-[9px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 py-1">
                        {d}
                    </div>
                ))}
            </div>

            {/* Day grid */}
            <div className="grid grid-cols-7 gap-1">
                {blanks.map((_, i) => (
                    <div key={`b${i}`} />
                ))}
                {days.map((day) => {
                    const past = isPast(day);
                    const sel = isSelectedDay(day);
                    const tod = isToday(day);
                    return (
                        <button
                            type="button"
                            key={day}
                            disabled={past}
                            onClick={() => handleSelect(day)}
                            className={`
                                w-full aspect-square rounded-xl text-xs font-light transition-all duration-200 flex items-center justify-center
                                ${past
                                    ? "text-zinc-300 dark:text-zinc-600 cursor-not-allowed opacity-40"
                                    : sel
                                        ? "bg-zinc-800 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-md font-medium"
                                        : tod
                                            ? "neuro-pressed text-zinc-800 dark:text-zinc-100 font-medium"
                                            : "text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50 cursor-pointer"
                                }
                            `}
                        >
                            {day}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

/* ──────────────────────────── Contact Page ──────────────────────────── */
export default function ContactPage() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [showCalendar, setShowCalendar] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        eventType: "Nuptials",
        guestCount: "",
        date: "",
        message: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            // UPDATE THIS URL after you deploy the Google Apps Script
            const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwVcjKhdZPdtG8jaIk3n7hFxX2J-KwvTk_fk09_6Td0-1WnJ6EPCcTEQXOUngZsU3m90g/exec";
            
            const response = await fetch(SCRIPT_URL, {
                method: "POST",
                mode: "no-cors", // Required for Google Apps Script
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            // Note: with "no-cors", we can't check response.ok reliably, 
            // but the submission will go through.
            setStatus("success");
            setFormData({ name: "", phone: "", email: "", eventType: "Nuptials", guestCount: "", date: "", message: "" });

        } catch (err) {
            console.error("Submission error:", err);
            setStatus("error");
        }
    };

    return (
        <main className="min-h-screen bg-[var(--background)] p-6 md:p-12 lg:p-24 selection:bg-zinc-800 selection:text-white">
            <div className="max-w-7xl mx-auto">
                {/* Header ... omitted for brevity in thought, but included in actual replacement ... */}
                <header className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 md:gap-12">
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
                            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-4 block">
                                Initiate a Dialogue
                            </span>
                            <h1 className="text-5xl md:text-7xl font-light uppercase tracking-tighter text-zinc-900 dark:text-zinc-100 leading-[0.9]">
                                Let&apos;s Design <br /> Your Event
                            </h1>
                        </div>
                    </div>

                    <div className="max-w-sm">
                        <p className="text-sm font-light leading-relaxed text-zinc-500 dark:text-zinc-400">
                            Reach out to our estate managers to schedule a private tour or request a curated proposal.
                        </p>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24">
                    {/* Details section remains same */}
                    <div className="space-y-12 md:space-y-16">
                        <div className="flex items-center gap-6 group">
                            <div className="w-12 h-12 rounded-full clay-card flex items-center justify-center shrink-0 text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-800 dark:group-hover:text-zinc-100 transition-colors">
                                <MapPin size={20} />
                            </div>
                            <div>
                                <h3 className="text-sm font-mono uppercase tracking-widest mb-3 text-zinc-800 dark:text-zinc-200">Location</h3>
                                <p className="text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
                                    Vorla Lakshma Reddy Conventions & Vorla Laxmi Narsamma Conventions<br />
                                    Saket Road, Kapra<br />
                                    Hyderabad, Telangana 500062
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 group">
                            <div className="w-12 h-12 rounded-full clay-card flex items-center justify-center shrink-0 text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-800 dark:group-hover:text-zinc-100 transition-colors">
                                <Phone size={20} />
                            </div>
                            <div>
                                <h3 className="text-sm font-mono uppercase tracking-widest mb-3 text-zinc-800 dark:text-zinc-200">Direct Line</h3>
                                <p className="text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
                                    <a href="tel:+919393000999" className="hover:text-zinc-800 dark:hover:text-zinc-100 transition-colors">+91 93930 00999</a>
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 group">
                            <div className="w-12 h-12 rounded-full clay-card flex items-center justify-center shrink-0 text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-800 dark:group-hover:text-zinc-100 transition-colors">
                                <Mail size={20} />
                            </div>
                            <div>
                                <h3 className="text-sm font-mono uppercase tracking-widest mb-3 text-zinc-800 dark:text-zinc-200">Email Inquiries</h3>
                                <p className="text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
                                    <a href="mailto:vorlaconventions@gmail.com" className="hover:text-zinc-800 dark:hover:text-zinc-100 transition-colors">vorlaconventions@gmail.com</a>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="neuro-pillow p-6 sm:p-8 md:p-12 relative">
                        {status === "success" ? (
                            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 py-12">
                                <CheckCircle2 className="text-green-500 w-16 h-16 animate-in zoom-in duration-500" />
                                <h3 className="text-2xl font-light uppercase tracking-tight text-zinc-800 dark:text-zinc-100">Inquiry Received</h3>
                                <p className="text-zinc-500 dark:text-zinc-400 max-w-xs mx-auto text-sm">
                                    Your vision has been initiated. Our estate manager will contact you shortly to curate your experience.
                                </p>
                                <button 
                                    onClick={() => setStatus("idle")}
                                    className="mt-8 text-[10px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-100 transition-colors"
                                >
                                    Send Another Response
                                </button>
                            </div>
                        ) : (
                            <>
                                <h3 className="text-2xl font-light uppercase tracking-tight text-zinc-800 dark:text-zinc-100 mb-8">Send an Inquiry</h3>
                                <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
                                    <div>
                                        <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-2">Who is reaching out?</label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                            className="w-full bg-[var(--background)] border-none rounded-xl px-4 py-3 text-sm focus:outline-none neuro-pressed placeholder:text-zinc-400 dark:placeholder:text-zinc-600 text-zinc-800 dark:text-zinc-100 transition-all font-light"
                                            placeholder="Your Name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-2">Phone Number</label>
                                        <input
                                            required
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                            className="w-full bg-[var(--background)] border-none rounded-xl px-4 py-3 text-sm focus:outline-none neuro-pressed placeholder:text-zinc-400 dark:placeholder:text-zinc-600 text-zinc-800 dark:text-zinc-100 transition-all font-light"
                                            placeholder="+91 98765 43210"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-2">Email Address</label>
                                        <input
                                            required
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                                            className="w-full bg-[var(--background)] border-none rounded-xl px-4 py-3 text-sm focus:outline-none neuro-pressed placeholder:text-zinc-400 dark:placeholder:text-zinc-600 text-zinc-800 dark:text-zinc-100 transition-all font-light"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-1/2">
                                            <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-2">Event Type</label>
                                            <select 
                                                value={formData.eventType}
                                                onChange={(e) => setFormData({...formData, eventType: e.target.value})}
                                                className="w-full bg-[var(--background)] border-none rounded-xl px-4 py-3 text-sm focus:outline-none neuro-pressed text-zinc-600 dark:text-zinc-300 transition-all appearance-none font-light"
                                            >
                                                <option>Nuptials</option>
                                                <option>Corporate</option>
                                                <option>Exhibition</option>
                                                <option>Social</option>
                                            </select>
                                        </div>
                                        <div className="w-1/2">
                                            <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-2">Guest Count</label>
                                            <input
                                                required
                                                type="text"
                                                value={formData.guestCount}
                                                onChange={(e) => setFormData({...formData, guestCount: e.target.value})}
                                                className="w-full bg-[var(--background)] border-none rounded-xl px-4 py-3 text-sm focus:outline-none neuro-pressed placeholder:text-zinc-400 dark:placeholder:text-zinc-600 text-zinc-800 dark:text-zinc-100 transition-all font-light"
                                                placeholder="e.g. 500 - 1200+"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-2">When shall we host you?</label>
                                        <div className="relative">
                                            <input
                                                required
                                                type="text"
                                                value={formData.date}
                                                onChange={(e) => setFormData({...formData, date: e.target.value})}
                                                className="w-full bg-[var(--background)] border-none rounded-xl px-4 py-3 pr-12 text-sm focus:outline-none neuro-pressed placeholder:text-zinc-400 dark:placeholder:text-zinc-600 text-zinc-800 dark:text-zinc-100 transition-all font-light"
                                                placeholder="Preferred Date"
                                            />
                                            {/* Calendar toggle button */}
                                            <button
                                                type="button"
                                                onClick={() => setShowCalendar(!showCalendar)}
                                                className={`absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                                                    showCalendar
                                                        ? "bg-zinc-800 dark:bg-zinc-100 text-white dark:text-zinc-900"
                                                        : "text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50"
                                                }`}
                                            >
                                                <Calendar size={14} />
                                            </button>
                                            {/* Calendar dropdown */}
                                            {showCalendar && (
                                                <CalendarWidget
                                                    selectedDate={formData.date}
                                                    onSelect={(d) => setFormData({ ...formData, date: d })}
                                                    onClose={() => setShowCalendar(false)}
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-2">Tell us about your vision</label>
                                        <textarea
                                            required
                                            rows={4}
                                            value={formData.message}
                                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                                            className="w-full bg-[var(--background)] border-none rounded-xl px-4 py-3 text-sm focus:outline-none neuro-pressed placeholder:text-zinc-400 dark:placeholder:text-zinc-600 text-zinc-800 dark:text-zinc-100 transition-all resize-none font-light"
                                            placeholder="Message..."
                                        />
                                    </div>
                                    <button 
                                        disabled={status === "loading"}
                                        className="w-full py-4 bg-zinc-800 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl text-xs uppercase tracking-widest font-medium hover:bg-zinc-700 dark:hover:bg-zinc-200 active:scale-[0.98] transition-all shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#ffffff] dark:shadow-[6px_6px_12px_#000,-6px_-6px_12px_#333] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {status === "loading" ? (
                                            <>
                                                <Loader2 size={16} className="animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            "Submit Inquiry"
                                        )}
                                    </button>
                                    {status === "error" && (
                                        <p className="text-red-500 dark:text-red-400 text-[10px] uppercase tracking-widest text-center mt-4">
                                            Error sending message. Please try again.
                                        </p>
                                    )}
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
