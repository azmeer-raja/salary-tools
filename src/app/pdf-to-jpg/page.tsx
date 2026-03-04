"use client";
import dynamic from "next/dynamic";

const PDFToJPGClient = dynamic(() => import("./PDFToJPGClient"), { ssr: false });

export default function PDFToJPGPage() {
    return <PDFToJPGClient />;
}
