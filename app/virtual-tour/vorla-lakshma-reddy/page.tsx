import VenueScrub from "@/components/VenueScrub";

const BASE = "/videos/virtual-tour/vorla-lakshma-reddy";

const SECTIONS = [
    {
        videoSrc: { default: `${BASE}/bighall-outside.mp4`, mobile: `${BASE}/bighall-outside-mobile.mp4` },
        posterSrc: `${BASE}/bighall-outside-poster.jpg`,
        title: "The Exterior | Grand Facade",
        subtitle: "A monumental welcome. Designed to impress from the first glance.",
    },
    {
        videoSrc: { default: `${BASE}/big-parking.mp4`, mobile: `${BASE}/big-parking-mobile.mp4` },
        posterSrc: `${BASE}/big-parking-poster.jpg`,
        title: "Expansive Parking",
        subtitle: "Unmatched capacity. Seamless arrival and departure for all your guests.",
    },
    {
        videoSrc: { default: `${BASE}/bighall-lobby.mp4`, mobile: `${BASE}/bighall-lobby-mobile.mp4` },
        posterSrc: `${BASE}/bighall-lobby-poster.jpg`,
        title: "The Lobby | A Gracious Welcome",
        subtitle: "Spacious and elegant, setting the expectation for the grandeur within.",
    },
    {
        videoSrc: { default: `${BASE}/bighall.mp4`, mobile: `${BASE}/bighall-mobile.mp4` },
        posterSrc: `${BASE}/bighall-poster.jpg`,
        title: "The Main Hall | Engineering Marvel",
        subtitle: "A 1,200-seat, column-free expanse. Pure volume, ready for any grand vision.",
    },
    {
        videoSrc: { default: `${BASE}/bighall-seating.mp4`, mobile: `${BASE}/bighall-seating-mobile.mp4` },
        posterSrc: `${BASE}/bighall-seating-poster.jpg`,
        title: "Main Hall | Event Ready",
        subtitle: "Witness the sheer scale. Perfect sightlines and comfort for every single guest.",
    },
];


export default function LakshmaReddyPage() {
    return (
        <VenueScrub
            sections={SECTIONS}
            venueName={<>Vorla Lakshma Reddy<br />Conventions</>}
        />
    );
}
