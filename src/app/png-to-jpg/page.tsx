"use client";

import { ImageConverterComponent } from "@/components/ui/ImageConverterComponent";

export default function PNGToJPG() {
    return (
        <ImageConverterComponent
            title="PNG to JPG Converter"
            description="Convert PNG images to JPEG format to reduce file size while maintaining visual quality."
            fromFormat="PNG"
            toFormat="JPG"
            toMimeType="image/jpeg"
        />
    );
}
