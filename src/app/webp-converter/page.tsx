"use client";

import { ImageConverterComponent } from "@/components/ui/ImageConverterComponent";

export default function WebPConverter() {
    return (
        <ImageConverterComponent
            title="WebP Converter"
            description="Convert various image formats to WebP for superior web performance and smaller file sizes."
            fromFormat="Image"
            toFormat="WebP"
            toMimeType="image/webp"
        />
    );
}
