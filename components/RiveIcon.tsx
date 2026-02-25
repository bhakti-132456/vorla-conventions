"use client";

import { useEffect, useRef, useState } from "react";
// import { useRive, useStateMachineInput } from "@rive-app/canvas";

interface RiveIconProps {
    src?: string; // .riv file path
    stateMachine?: string;
    className?: string;
    isActive?: boolean;
}

export default function RiveIcon({ src, stateMachine, className = "", isActive = false }: RiveIconProps) {
    const [isClicked, setIsClicked] = useState(false);

    // Note: For a real implementation, we would use useRive()
    /*
    const { rive, RiveComponent } = useRive({
      src,
      stateMachine,
      autoplay: true,
    });
  
    const activeInput = useStateMachineInput(rive, stateMachine, "active");
    const clickInput = useStateMachineInput(rive, stateMachine, "click");
  
    useEffect(() => {
      if (activeInput) activeInput.value = isActive;
    }, [isActive, activeInput]);
  
    useEffect(() => {
      if (clickInput && isClicked) {
        clickInput.fire();
        setTimeout(() => setIsClicked(false), 200);
      }
    }, [isClicked, clickInput]);
    */

    const handlePointerDown = () => setIsClicked(true);
    const handlePointerUp = () => setIsClicked(false);

    return (
        <div
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            className={`relative w-full h-full cursor-pointer transition-all duration-300 ${className} ${isActive ? "clay-card scale-110" : ""
                } ${isClicked ? "neuro-pressed" : ""
                }`}
        >
            {/* Placeholder for Rive graphic */}
            <div className="flex items-center justify-center h-full text-zinc-400">
                <div className={`w-3 h-3 rounded-full bg-zinc-400 ${isActive ? "bg-zinc-800" : ""}`} />
            </div>

            {!src && (
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[8px] font-mono text-zinc-300 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    Rive Asset Missing
                </span>
            )}
        </div>
    );
}
