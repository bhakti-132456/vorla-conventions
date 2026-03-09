import VenueScrub from "@/components/VenueScrub";

const BASE = "/videos/virtual-tour/vorla-laxmi-narsamma";

const SECTIONS = [
    {
        videoSrc: `${BASE}/1-exterior.mp4`,
        posterSrc: `${BASE}/1-exterior-poster.jpg`,
        title: "Vorla Laxmi Narsamma Conventions",
        subtitle: "A premium venue for your most precious moments",
    },
    {
        videoSrc: `${BASE}/2-parking.mp4`,
        posterSrc: `${BASE}/2-parking-poster.jpg`,
        title: "Ample Parking",
        subtitle: "Spacious parking for 200+ vehicles",
    },
    {
        videoSrc: `${BASE}/3-lobby.mp4`,
        posterSrc: `${BASE}/3-lobby-poster.jpg`,
        title: "Grand Entrance Lobby",
        subtitle: "A welcoming arrival experience for your guests",
    },
    {
        videoSrc: `${BASE}/4-interior-bare.mp4`,
        posterSrc: `${BASE}/4-interior-bare-poster.jpg`,
        title: "Pillar-less Main Hall",
        subtitle: "15,000 sq.ft. of air-conditioned elegance",
    },
    {
        videoSrc: `${BASE}/5-interior-decorated.mp4`,
        posterSrc: `${BASE}/5-interior-decorated-poster.jpg`,
        title: "Stunning Decor",
        subtitle: "Transforming your dreams into reality",
    },
    {
        videoSrc: `${BASE}/6-courtyard-lobby.mp4`,
        posterSrc: `${BASE}/6-courtyard-lobby-poster.jpg`,
        title: "Courtyard Lobby",
        subtitle: "Serene transition spaces connecting nature and luxury",
    },
    {
        videoSrc: `${BASE}/7-changing-rooms.mp4`,
        posterSrc: `${BASE}/7-changing-rooms-poster.jpg`,
        title: "Makeup Rooms",
        subtitle: "Comfortable and well-equipped changing spaces",
    },
    {
        videoSrc: `${BASE}/8-bridal-room.mp4`,
        posterSrc: `${BASE}/8-bridal-room-poster.jpg`,
        title: "Premium Bridal Suite",
        subtitle: "A private sanctuary for the bride",
    },
    {
        videoSrc: `${BASE}/9-dining.mp4`,
        posterSrc: `${BASE}/9-dining-poster.jpg`,
        title: "Spacious Dining Hall",
        subtitle: "Dedicated space for exquisite culinary experiences",
    },
    {
        videoSrc: `${BASE}/10-courtyard.mp4`,
        posterSrc: `${BASE}/10-courtyard-poster.jpg`,
        title: "Open Courtyard",
        subtitle: "Perfect for outdoor ceremonies and transitions",
    },
    {
        videoSrc: `${BASE}/11-sanitation.mp4`,
        posterSrc: `${BASE}/11-sanitation-poster.jpg`,
        title: "Clean Amenities",
        subtitle: "Modern and hygienic sanitation facilities",
    },
    {
        videoSrc: `${BASE}/12-banquet.mp4`,
        posterSrc: `${BASE}/12-banquet-poster.jpg`,
        title: "Mini Banquet Space",
        subtitle: "Ideal for intimate gatherings and pre-wedding events",
    },
];

export default function LaxmiNarsammaPage() {
    return <VenueScrub sections={SECTIONS} />;
}
