import VenueScrub from "@/components/VenueScrub";

const BASE = "/videos/virtual-tour/vorla-laxmi-narsamma";

const SECTIONS = [
    {
        videoSrc: `${BASE}/1-exterior.mp4`,
        posterSrc: `${BASE}/1-exterior-poster.jpg`,
        title: "The Facade | First Impressions",
        subtitle: "A striking architectural statement. The exterior sets the tone for the premium experience awaiting your guests within.",
    },
    {
        videoSrc: `${BASE}/2-parking.mp4`,
        posterSrc: `${BASE}/2-parking-poster.jpg`,
        title: "Arrival | 200+ Vehicle Capacity",
        subtitle: "Seamless logistics in the heart of Kapra. Ample, secure parking ensures your guests' journey begins with ease and comfort.",
    },
    {
        videoSrc: `${BASE}/3-lobby.mp4`,
        posterSrc: `${BASE}/3-lobby-poster.jpg`,
        title: "The Grand Lobby | The Arrival Experience",
        subtitle: "A transition from the mundane to the magnificent. High ceilings and curated lighting welcome attendees to a world of refinement.",
    },
    {
        videoSrc: `${BASE}/4-interior-bare.mp4`,
        posterSrc: `${BASE}/4-interior-bare-poster.jpg`,
        title: "Main Hall (Structural)",
        subtitle: "A vast, climate-controlled expanse. Our advanced AC systems and architectural volume provide a comfortable, grand-scale environment year-round.",
    },
    {
        videoSrc: `${BASE}/5-interior-decorated.mp4`,
        posterSrc: `${BASE}/5-interior-decorated-poster.jpg`,
        title: "Main Hall (Designed)",
        subtitle: "The ultimate canvas. See how our space transforms with decor, proving that great architecture enhances every aesthetic vision.",
    },
    {
        videoSrc: `${BASE}/6-courtyard-lobby.mp4`,
        posterSrc: `${BASE}/6-courtyard-lobby-poster.jpg`,
        title: "The Courtyard Lobby",
        subtitle: "An indoor-outdoor dialogue. This transitional space brings the softness of nature to the structure's sophisticated interior.",
    },
    {
        videoSrc: `${BASE}/7-changing-rooms.mp4`,
        posterSrc: `${BASE}/7-changing-rooms-poster.jpg`,
        title: "Functional Comfort",
        subtitle: "Designed for the stars of the day. Modern, well-lit spaces for preparation and quick touch-ups during the event.",
    },
    {
        videoSrc: `${BASE}/8-bridal-room.mp4`,
        posterSrc: `${BASE}/8-bridal-room-poster.jpg`,
        title: "The Bridal Suite",
        subtitle: "A quiet retreat amidst the celebration. A premium, intimate suite designed for the comfort and privacy of the couple.",
    },
    {
        videoSrc: `${BASE}/9-dining.mp4`,
        posterSrc: `${BASE}/9-dining-poster.jpg`,
        title: "The Dining Hall",
        subtitle: "Where taste meets space. A dedicated, hygienic area designed for efficient service and a premium banquet experience.",
    },
    {
        videoSrc: `${BASE}/10-courtyard.mp4`,
        posterSrc: `${BASE}/10-courtyard-poster.jpg`,
        title: "Open Courtyard",
        subtitle: "A breath of fresh air. This open-air space is ideal for traditional rituals or as a sophisticated breakout area.",
    },
    {
        videoSrc: `${BASE}/11-sanitation.mp4`,
        posterSrc: `${BASE}/11-sanitation-poster.jpg`,
        title: "Modern Hygiene",
        subtitle: "Uncompromising standards. Our facilities are designed with contemporary aesthetics and rigorous hygiene in mind.",
    },
    {
        videoSrc: `${BASE}/12-banquet.mp4`,
        posterSrc: `${BASE}/12-banquet-poster.jpg`,
        title: "Mini Banquet",
        subtitle: "Perfectly proportioned. An ideal setting for pre-wedding rituals, smaller corporate workshops, or private celebrations.",
    },
];

export default function LaxmiNarsammaPage() {
    return <VenueScrub sections={SECTIONS} />;
}
