import VenueScrub from "@/components/VenueScrub";

const BASE = "/videos/virtual-tour/vorla-laxmi-narsamma";

const SECTIONS = [
    {
        videoSrc: `${BASE}/1-day-night.mp4`,
        posterSrc: `${BASE}/1-day-night-poster.jpg`,
        title: "Vorla Laxmi Narsamma Conventions",
    },
    {
        videoSrc: `${BASE}/2-walk-in.mp4`,
        posterSrc: `${BASE}/2-walk-in-poster.jpg`,
        title: "Ample Parking",
        subtitle: "Spacious parking for all your guests",
    },
    {
        videoSrc: `${BASE}/3-entrance-lobby.mp4`,
        posterSrc: `${BASE}/3-entrance-lobby-poster.jpg`,
        title: "The Grand Entrance Lobby",
        subtitle: "A welcoming arrival experience",
    },
    {
        videoSrc: `${BASE}/4-VORLA-NEW-HALL-interior.mp4`,
        posterSrc: `${BASE}/4-VORLA-NEW-HALL-interior-poster.jpg`,
        title: "The Main AC Hall",
        subtitle: "Customizable decor · 1000+ seating · 2000 floating capacity",
    },
];

export default function LaxmiNarsammaPage() {
    return <VenueScrub sections={SECTIONS} />;
}
