import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Vorla Conventions | Best Convention Center Heritage in Hyderabad & Secunderabad",
  description: "Since 2008, Vorla Conventions has been the first AC function hall in Sainikpuri, Saket. 68,000 sq ft pillarless grand hall, 800+ parking spaces, bridal suites. FAQs about capacity, catering, booking & pricing for weddings and corporate events in Hyderabad.",
  openGraph: {
    title: "About Vorla Conventions | Heritage & Provenance Since 2008",
    description: "Pioneer of AC function halls in Sainikpuri. 68,000 sq ft, pillarless halls, 5000+ events hosted. Comprehensive FAQ for wedding & corporate event planning.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
