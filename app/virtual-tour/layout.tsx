import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Virtual Tour | Vorla Conventions - Walk Through the Best Convention Center in Hyderabad",
  description: "Take a virtual walkthrough of Vorla Conventions' pillarless grand hall, Vorla Lakshma Reddy Conventions with 1200+ capacity, Vorla Laxmi Narsamma Conventions intimate hall, and estate landscapes in Sainikpuri, Secunderabad.",
  openGraph: {
    title: "Virtual Tour | Walk Through Vorla Conventions, Hyderabad",
    description: "Immersive video walkthroughs of Hyderabad's most prestigious convention center. Explore pillarless halls and lush event lawns in Sainikpuri.",
  },
};

export default function VirtualTourLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
