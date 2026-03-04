"use client";
import dynamic from "next/dynamic";

const PDFToWordClient = dynamic(() => import("./PDFToWordClient"), { ssr: false });

export default function PDFToWordPage() {
    return <PDFToWordClient />;
}
