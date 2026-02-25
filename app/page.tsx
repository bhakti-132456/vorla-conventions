import HeroScrub from "@/components/HeroScrub";
import Image from "next/image";

// Unsplash CC0 images for demonstration
const UNSPLASH = {
  hall: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=80", // grand ballroom
  lawn: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=80", // outdoor garden event
  wedding: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80", // wedding
  corporate: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80", // corporate
  exhibition: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80", // exhibition
};

export default function Home() {
  return (
    <main className="relative bg-[var(--background)]">
      <HeroScrub />

      {/* Editorial Content Section */}
      <section className="relative min-h-screen py-32 px-6 md:px-24 flex flex-col items-center justify-center gap-24">
        <div className="max-w-4xl text-center space-y-8">
          <span className="text-[10px] font-mono uppercase tracking-[1em] text-zinc-400">
            Archive of Space
          </span>
          <h2 className="text-5xl md:text-8xl font-light uppercase tracking-tighter text-zinc-900 leading-[0.9]">
            Where Light <br /> Meets Volume
          </h2>
          <p className="text-xl font-light text-zinc-500 max-w-2xl mx-auto leading-relaxed">
            A documentation of architectural intent and spatial atmosphere across the Vorla twin-estates of Hyderabad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl">
          <div className="clay-card aspect-[4/5] flex flex-col justify-end group cursor-pointer overflow-hidden relative">
            <Image
              src={UNSPLASH.hall}
              alt="The Grand Hall"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="relative z-10 p-12">
              <h3 className="text-3xl font-light uppercase tracking-tight text-white">
                The <br /> Grand Hall
              </h3>
              <p className="text-sm text-white/60 mt-4 max-w-[200px]">
                1,200+ capacity, column-free engineering.
              </p>
            </div>
          </div>

          <div className="clay-card aspect-[4/5] flex flex-col justify-end group cursor-pointer overflow-hidden relative">
            <Image
              src={UNSPLASH.lawn}
              alt="The Verdant Lawn"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="relative z-10 p-12">
              <h3 className="text-3xl font-light uppercase tracking-tight text-white">
                The <br /> Verdant Lawn
              </h3>
              <p className="text-sm text-white/60 mt-4 max-w-[200px]">
                Celestial canopy for outdoor celebrations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Program Categories (Neuromorphic Pillows) */}
      <section className="min-h-screen py-32 px-6 bg-zinc-100 flex flex-col items-center justify-center gap-16">
        <div className="text-center">
          <h2 className="text-4xl font-light uppercase tracking-widest text-zinc-800">The Dialogue</h2>
          <p className="text-zinc-400 mt-4 uppercase tracking-[0.2em] text-[10px]">Curation of Events</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl">
          {[
            { label: "Nuptials", img: UNSPLASH.wedding },
            { label: "Corporate", img: UNSPLASH.corporate },
            { label: "Exhibitions", img: UNSPLASH.exhibition },
          ].map((item, i) => (
            <div
              key={item.label}
              className="neuro-pillow text-center aspect-square flex flex-col items-center justify-center hover:scale-[1.02] transition-transform cursor-pointer overflow-hidden relative group"
            >
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-zinc-900 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

              <Image
                src={item.img}
                alt={item.label}
                fill
                className="object-cover opacity-0 group-hover:opacity-40 transition-opacity duration-700 z-0"
              />

              <div className="relative z-20">
                <span className="text-[10px] font-mono text-zinc-400 group-hover:text-zinc-300 mb-4 block transition-colors">
                  0{i + 1}
                </span>
                <h4 className="text-2xl font-light uppercase tracking-widest text-zinc-800 group-hover:text-white transition-colors">
                  {item.label}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
