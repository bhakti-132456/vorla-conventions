import VenueScrub from "@/components/VenueScrub";

const BASE = "/videos/virtual-tour/vorla-lakshma-reddy";

const SECTIONS = [
    {
        videoSrc: `${BASE}/bighall-outside.mp4`,
        posterSrc: `${BASE}/2.png`,
        title: "The Exterior | Grand Facade",
        subtitle: "A monumental welcome. Designed to impress from the first glance.",
    },
    {
        videoSrc: `${BASE}/big-parking.mp4`,
        posterSrc: `${BASE}/3.png`,
        title: "Expansive Parking",
        subtitle: "Unmatched capacity. Seamless arrival and departure for all your guests.",
    },
    {
        videoSrc: `${BASE}/bighall-lobby.mp4`,
        posterSrc: `${BASE}/4.png`,
        title: "The Lobby | A Gracious Welcome",
        subtitle: "Spacious and elegant, setting the expectation for the grandeur within.",
    },
    {
        videoSrc: `${BASE}/bighall.mp4`,
        posterSrc: `${BASE}/6.png`,
        title: "The Main Hall | Engineering Marvel",
        subtitle: "A 1,200-seat, column-free expanse. Pure volume, ready for any grand vision.",
    },
    {
        videoSrc: `${BASE}/bighall-seating.mp4`,
        posterSrc: `${BASE}/7.png`,
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
