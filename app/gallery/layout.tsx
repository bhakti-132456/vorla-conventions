import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photo Gallery | Vorla Conventions - Luxury Function Halls & Wedding Lawns in Hyderabad",
  description: "Browse photos of Vorla Conventions' grand halls, outdoor lawns, and premium banquet spaces. View the Vorla Lakshma Reddy Conventions pillarless hall and Vorla Laxmi Narsamma Conventions in Sainikpuri, Secunderabad, Hyderabad.",
  openGraph: {
    title: "Gallery | Vorla Conventions - Luxury Venues in Hyderabad",
    description: "Explore stunning photos of Hyderabad's finest convention center. Grand halls, outdoor lawns, and premium banquet spaces in Sainikpuri, Secunderabad.",
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
