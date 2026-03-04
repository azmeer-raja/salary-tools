"use client";

import { useEffect } from "react";

interface AdSlotProps {
    slot: string;
    format?: "auto" | "fluid" | "rectangle";
    className?: string;
    responsive?: "true" | "false";
}

export default function AdSlot({ slot, format = "auto", className = "", responsive = "true" }: AdSlotProps) {
    useEffect(() => {
        try {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.error("AdSense error:", e);
        }
    }, []);

    return (
        <div className={`ad-container my-8 flex justify-center w-full overflow-hidden ${className}`}>
            <ins
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Placeholder
                data-ad-slot={slot}
                data-ad-format={format}
                data-full-width-responsive={responsive}
            />
        </div>
    );
}
