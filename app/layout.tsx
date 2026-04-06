import type { Metadata, Viewport } from "next";
import { Montserrat, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navigation from "@/components/Navigation";
import Script from "next/script";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#1a1a1a",
};

export const metadata: Metadata = {
  title: "Vorla Conventions | Best Convention Center in Hyderabad & Secunderabad | Luxury Function Hall",
  description: "Vorla Conventions is the most prestigious convention center in Hyderabad and Secunderabad. 68,000 sq ft pillarless grand hall, luxury AC banquet halls, wedding lawns in Sainikpuri, Saket, Kapra. Best wedding venue, corporate event space & exhibition center near ECIL and AS Rao Nagar.",
  keywords: "Best Convention Center in Hyderabad, Luxury Function Hall Secunderabad, AC Banquet Halls in Hyderabad, Marriage Gardens in Secunderabad, Wedding Lawns Hyderabad, Best Wedding Venue near me, Convention Centers in Sainikpuri, Big Fat Indian Wedding Venue, Corporate Seminar Hall Hyderabad, Exhibition Center Secunderabad, Birthday Party Hall Sainikpuri, kalyana mandapam Kapra Hyderabad",
  openGraph: {
    title: "Vorla Conventions | Best Convention Center in Hyderabad & Secunderabad",
    description: "68,000 sq ft pillarless grand hall, luxury AC banquet halls, wedding lawns. The most prestigious venue in Sainikpuri, Saket for weddings, corporate events & exhibitions.",
    type: "website",
    locale: "en_IN",
    siteName: "Vorla Conventions",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.vorlaconventions.in",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EventVenue",
    name: "Vorla Conventions",
    description: "The most prestigious convention center in Hyderabad and Secunderabad. 68,000 sq ft pillarless grand hall for weddings, corporate events, and exhibitions.",
    url: "https://www.vorlaconventions.in",
    telephone: "+91-98765-43210",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Saket Road, Kapra",
      addressLocality: "Hyderabad",
      addressRegion: "Telangana",
      postalCode: "500062",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "17.4875",
      longitude: "78.5550",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      opens: "08:00",
      closes: "23:00",
    },
    maximumAttendeeCapacity: 1500,
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Air Conditioning", value: true },
      { "@type": "LocationFeatureSpecification", name: "Parking", value: true },
      { "@type": "LocationFeatureSpecification", name: "Catering", value: true },
      { "@type": "LocationFeatureSpecification", name: "Bridal Suite", value: true },
    ],
    areaServed: ["Hyderabad", "Secunderabad", "Sainikpuri", "Saket", "Kapra", "ECIL", "AS Rao Nagar", "Alwal", "Malkajgiri", "Yapral", "Kushaiguda"],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          id="json-ld-local-business"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${montserrat.variable} ${geistMono.variable} antialiased`}
      >
        <SmoothScroll>
          <Navigation />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

