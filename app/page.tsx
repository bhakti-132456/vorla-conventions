import HeroScrub from "@/components/HeroScrub";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative bg-[var(--background)]">
      <HeroScrub />

      {/* SEO Hero Content (hidden visually, visible to crawlers) */}
      <section className="sr-only" aria-label="About Vorla Conventions">
        <h1>Vorla Conventions: The Most Prestigious Convention Center in Hyderabad and Secunderabad</h1>
        <p>
          Welcome to <strong>Vorla Conventions</strong>, a landmark of luxury and the finest <strong>convention center in Secunderabad</strong>. 
          Strategically located in the serene environment of <strong>Sainikpuri</strong> and <strong>Saket, Hyderabad</strong>, our venue is designed to host 
          the most prestigious events with a royal touch. Spanning across a massive <strong>68,000 square feet</strong>, Vorla Conventions offers a 
          <strong>pillarless grand hall</strong> that stands as one of the largest and most elegant <strong>function halls in Hyderabad</strong>. 
          Whether you are searching for a dream <strong>wedding venue</strong>, a professional <strong>corporate event space</strong>, or a 
          sprawling lawn for an outdoor celebration, we provide matchless facilities and world-class hospitality to make your vision a reality.
        </p>
      </section>

      {/* Editorial Content Section — Venue Spaces */}
      <section className="relative min-h-screen py-20 md:py-32 px-6 md:px-24 flex flex-col items-center justify-center gap-16 md:gap-24">
        <div className="max-w-4xl text-center space-y-8">
          <span className="text-[10px] font-mono uppercase tracking-[1em] text-zinc-400">
            Luxury Venue Spaces
          </span>
          <h2 className="text-5xl md:text-8xl font-light uppercase tracking-tighter text-zinc-900 dark:text-zinc-100 leading-[0.9]">
            Experience the Luxury <br /> of Our Venue Spaces
          </h2>
          <p className="text-xl font-light text-zinc-500 max-w-2xl mx-auto leading-relaxed">
            Discover <strong>Hyderabad&apos;s</strong> twin-estate sanctuary. <strong>Vorla Conventions</strong> brings together the iconic Vorla Lakshma Reddy Conventions and Vorla Laxmi Narsamma Conventions—spaces designed to elevate <strong>weddings</strong>, <strong>corporate milestones</strong>, and grand <strong>exhibitions</strong> into lasting legacies at the <strong>best convention center in Hyderabad</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 w-full max-w-6xl">
          <div className="flex flex-col gap-8 group">
            <div className="clay-card aspect-[4/5] overflow-hidden relative">
              <Image
                src="/images/vorla-lakshmareddy/2.png"
                alt="Grand Indoor Convention Hall at Vorla Conventions - AC Function Hall in Hyderabad with pillarless design and 1500 guest capacity"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="px-4">
              <h3 className="text-3xl font-light uppercase tracking-tight text-zinc-900 dark:text-zinc-100">
                Vorla Lakshma Reddy Conventions
              </h3>
              <p className="text-sm text-zinc-500 mt-2 italic font-serif">Premium AC Function Hall in Hyderabad.</p>
              <p className="text-sm text-zinc-400 mt-4 leading-relaxed max-w-sm">
                Our flagship space is perfect for those seeking a premium <strong>AC function hall in Hyderabad</strong>. With a guest capacity of up to <strong>1,500</strong>, this <strong>pillarless</strong> marvel features high ceilings, sophisticated lighting, and a grand stage, making it the top choice for <strong>Big Fat Indian Weddings</strong>, traditional receptions, and large-scale cultural exhibitions.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-8 group">
            <div className="clay-card aspect-[4/5] overflow-hidden relative">
              <Image
                src="/images/vorla-laxminarsamma/2.png"
                alt="Lush Outdoor Event Lawns at Vorla Conventions - Wedding Lawns in Secunderabad and Kapra for sangeet and cocktail parties"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="px-4">
              <h3 className="text-3xl font-light uppercase tracking-tight text-zinc-900 dark:text-zinc-100">
                Vorla Laxmi Narsamma Conventions
              </h3>
              <p className="text-sm text-zinc-500 mt-2 italic font-serif">Outdoor Wedding Venues in Secunderabad.</p>
              <p className="text-sm text-zinc-400 mt-4 leading-relaxed max-w-sm">
                Our sprawling lawns offer a picturesque setting for evening <strong>sangeets</strong>, <strong>haldi ceremonies</strong>, and <strong>cocktail parties</strong> under the stars. Surrounded by greenery and featuring elegant decor, our lawns are among the most sought-after <strong>outdoor wedding venues in Secunderabad</strong> and <strong>Kapra</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Amenities & Corporate Section */}
      <section className="min-h-screen py-20 md:py-32 px-6 bg-zinc-100 flex flex-col items-center justify-center gap-12 md:gap-16">
        <div className="text-center max-w-4xl">
          <h2 className="text-4xl font-light uppercase tracking-widest text-zinc-800 dark:text-zinc-100">Unmatched Amenities</h2>
          <p className="text-zinc-400 mt-4 uppercase tracking-[0.2em] text-[10px]">Total Event Dominance</p>
          <p className="text-lg font-light text-zinc-500 mt-8 max-w-3xl mx-auto leading-relaxed">
            At <strong>Vorla Conventions</strong>, we believe in providing a stress-free experience. Our venue comes equipped with state-of-the-art facilities, including massive <strong>secure parking for hundreds of cars</strong>, ensuring convenience for your guests arriving from all parts of the <strong>Twin Cities</strong>. We offer fully-furnished, <strong>air-conditioned bridal and groom suites</strong> for ultimate comfort. We provide the flexibility of exquisite <strong>in-house multi-cuisine catering</strong> or the option to bring your own preferred <strong>outside catering vendors</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl">
          {[
            { label: "Nuptials", desc: "Big Fat Indian Weddings, receptions, sangeet, haldi ceremonies. The finest wedding venue in Sainikpuri, Hyderabad for your most sacred celebrations.", img: "/images/vorla-laxminarsamma/6.png" },
            { label: "Celebrations", desc: "Birthday parties, engagement functions, naming ceremonies, and anniversaries in the best banquet hall in North Hyderabad.", img: "/images/vorla-laxminarsamma/10.png" },
            { label: "Corporate", desc: "Leading corporate event venue in Hyderabad for product launches, AGMs, seminars near ECIL and AS Rao Nagar.", img: "/images/vorla-lakshmareddy/4.png" },
            { label: "Exhibitions", desc: "Premier exhibition center in Secunderabad. High-volume trade fairs and showcases in our pillarless 68,000 sq ft space.", img: "/images/vorla-lakshmareddy/7.png" },
          ].map((item, i) => (
            <div
              key={item.label}
              className="clay-card text-center aspect-square flex flex-col items-center justify-center hover:scale-105 hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden relative group"
            >
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />

              <Image
                src={item.img}
                alt={item.label}
                fill
                className="object-cover opacity-0 group-hover:opacity-100 transition-transform duration-1000 group-hover:scale-110 ease-out z-0"
              />

              <div className="relative z-20 p-6 flex flex-col items-center justify-center h-full">
                <span className="text-[10px] font-mono text-zinc-500 group-hover:text-zinc-300 mb-4 block transition-colors duration-500">
                  0{i + 1}
                </span>
                <h4 className="text-xl xl:text-2xl font-light uppercase tracking-widest text-zinc-800 dark:text-zinc-100 group-hover:text-white transition-colors duration-500">
                  {item.label}
                </h4>
                <p className="text-xs text-white/90 mt-4 font-light max-w-[200px] mx-auto opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Corporate Section */}
        <div className="max-w-4xl text-center mt-16">
          <h2 className="text-4xl font-light uppercase tracking-widest text-zinc-800 dark:text-zinc-100">
            Corporate Excellence
          </h2>
          <p className="text-zinc-400 mt-4 uppercase tracking-[0.2em] text-[10px]">The Ideal Venue for Corporate Events in Hyderabad</p>
          <p className="text-lg font-light text-zinc-500 mt-8 max-w-3xl mx-auto leading-relaxed">
            <strong>Vorla Conventions</strong> is not just a <strong>marriage hall</strong>; it is a versatile hub for <strong>corporate dominance</strong>. We are a leading <strong>corporate event venue in Hyderabad</strong>, hosting <strong>product launches</strong>, <strong>annual general meetings (AGMs)</strong>, <strong>trade fairs</strong>, and professional <strong>seminars</strong>. Our location near <strong>ECIL</strong> and <strong>AS Rao Nagar</strong> makes us a central point for businesses across <strong>Secunderabad</strong>.
          </p>
        </div>
      </section>
    </main>
  );
}
