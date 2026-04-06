import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Vorla Conventions | Book Best Convention Center in Hyderabad, Secunderabad",
  description: "Schedule a private tour or book Vorla Conventions, the best convention center in Hyderabad. Located at Saket Road, Kapra, Hyderabad 500062. Call for wedding hall, corporate event, or exhibition booking near Sainikpuri, ECIL and AS Rao Nagar.",
  openGraph: {
    title: "Contact & Book Vorla Conventions | Hyderabad's Premier Venue",
    description: "Book the finest convention center in Secunderabad. Located in Saket, Kapra. Schedule tours for weddings, corporate events & exhibitions.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
