"use client";

import { ImageConverterComponent } from "@/components/ui/ImageConverterComponent";

export default function JPGToPNG() {
    return (
        <ImageConverterComponent
            title="JPG to PNG Converter"
            description="Convert JPEG images to PNG format while preserving transparency and quality."
            fromFormat="JPG"
            toFormat="PNG"
            toMimeType="image/png"
        />
    );
}
