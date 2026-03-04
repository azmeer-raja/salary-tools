"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/ui/ToolLayout";
import { FileUploader } from "@/components/ui/FileUploader";
import { ResultCard, InputField } from "@/components/ui/CalculatorUI";
import { Download, RefreshCw, Type, Check, Info, FileText, LayoutTemplate } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PDFDocument, rgb, degrees, StandardFonts } from "pdf-lib";
import { cn } from "@/lib/utils";

export default function AddWatermarkPDF() {
    const [file, setFile] = useState<File | null>(null);
    const [watermarkedUrl, setWatermarkedUrl] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const [text, setText] = useState("CalcyRaja");
    const [fontSize, setFontSize] = useState(50);
    const [opacity, setOpacity] = useState(0.4);
    const [rotation, setRotation] = useState(-45);

    const handleFileSelect = (files: File[]) => {
        if (files[0]) {
            setFile(files[0]);
            setWatermarkedUrl(null);
        } else {
            setFile(null);
            setWatermarkedUrl(null);
        }
    };

    const handleApplyWatermark = async () => {
        if (!file) return;

        setIsProcessing(true);
        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(arrayBuffer);
            const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
            const pages = pdfDoc.getPages();

            pages.forEach((page) => {
                const { width, height } = page.getSize();
                page.drawText(text, {
                    x: width / 2 - (text.length * fontSize) / 4,
                    y: height / 2,
                    size: fontSize,
                    font: font,
                    color: rgb(0.5, 0.5, 0.5),
                    opacity: opacity,
                    rotate: degrees(rotation),
                });
            });

            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes as unknown as BlobPart], { type: "application/pdf" });
            setWatermarkedUrl(URL.createObjectURL(blob));
        } catch (error) {
            console.error("PDF watermarking failed:", error);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDownload = () => {
        if (!watermarkedUrl) return;
        const a = document.createElement("a");
        a.href = watermarkedUrl;
        a.download = `watermarked-${file?.name}`;
        a.click();
    };

    return (
        <ToolLayout
            title="Add Watermark to PDF"
            description="Secure your documents by adding custom text watermarks to all pages. Adjust size, opacity, and rotation."
            category="PDF Tools"
            categoryHref="/pdf-tools"
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Side: Upload & Controls */}
                <div className="lg:col-span-12 xl:col-span-5 space-y-6">
                    <FileUploader
                        onFileSelect={handleFileSelect}
                        accept="application/pdf"
                        label="Upload PDF to watermark"
                    />

                    <AnimatePresence>
                        {file && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="space-y-6 pt-4"
                            >
                                <div className="space-y-6 glass p-6 rounded-3xl border-dashed border-primary/20">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Type className="w-4 h-4 text-primary" />
                                        <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Watermark Settings</h3>
                                    </div>

                                    <InputField
                                        label="Watermark Text"
                                        id="text"
                                        type="text"
                                        value={text}
                                        onChange={setText}
                                    />

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <label className="text-xs font-bold uppercase tracking-widest opacity-60">Size</label>
                                                <span className="text-xs font-black text-primary">{fontSize}px</span>
                                            </div>
                                            <input
                                                type="range"
                                                min="10"
                                                max="150"
                                                step="1"
                                                value={fontSize}
                                                onChange={(e) => setFontSize(parseInt(e.target.value))}
                                                className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <label className="text-xs font-bold uppercase tracking-widest opacity-60">Opacity</label>
                                                <span className="text-xs font-black text-primary">{Math.round(opacity * 100)}%</span>
                                            </div>
                                            <input
                                                type="range"
                                                min="0.1"
                                                max="1.0"
                                                step="0.05"
                                                value={opacity}
                                                onChange={(e) => setOpacity(parseFloat(e.target.value))}
                                                className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <label className="text-xs font-bold uppercase tracking-widest opacity-60">Rotation</label>
                                            <span className="text-xs font-black text-primary">{rotation}°</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="-180"
                                            max="180"
                                            step="1"
                                            value={rotation}
                                            onChange={(e) => setRotation(parseInt(e.target.value))}
                                            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                                        />
                                    </div>

                                    <button
                                        onClick={handleApplyWatermark}
                                        disabled={isProcessing}
                                        className={cn(
                                            "w-full h-14 rounded-2xl premium-gradient text-white font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all hover:shadow-2xl hover:shadow-primary/20 mt-4",
                                            isProcessing && "opacity-70 cursor-not-allowed"
                                        )}
                                    >
                                        {isProcessing ? <RefreshCw className="animate-spin" /> : "Apply Watermark"}
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Right Side: Results */}
                <div className="lg:col-span-12 xl:col-span-7 space-y-6">
                    <AnimatePresence mode="wait">
                        {!file ? (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8 space-y-4"
                            >
                                <div className="p-6 rounded-full bg-primary/5">
                                    <LayoutTemplate className="w-12 h-12 text-primary/20" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-lg font-bold opacity-40 uppercase tracking-widest">Awaiting PDF</h3>
                                    <p className="text-sm text-muted-foreground max-w-xs mx-auto italic">
                                        Upload a PDF to brand it with your custom watermark.
                                    </p>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="results"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-8"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <ResultCard label="Text" value={text} variant="default" />
                                    <ResultCard label="Status" value={watermarkedUrl ? "Watermarked" : "Selected"} variant={watermarkedUrl ? "primary" : "default"} />
                                </div>

                                <div className="rounded-[2.5rem] glass border-primary/10 overflow-hidden h-[500px]">
                                    {watermarkedUrl ? (
                                        <iframe
                                            src={`${watermarkedUrl}#toolbar=0`}
                                            className="w-full h-full border-none"
                                            title="Watermarked PDF Preview"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground gap-4">
                                            <FileText className="animate-pulse w-8 h-8 opacity-20" />
                                            <p className="text-[10px] font-black uppercase tracking-widest">Ready for branding</p>
                                        </div>
                                    )}
                                </div>

                                {watermarkedUrl && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="p-8 rounded-[2.5rem] premium-gradient text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-primary/30"
                                    >
                                        <div className="space-y-1 text-center md:text-left">
                                            <div className="flex items-center gap-2 justify-center md:justify-start">
                                                <Check className="w-4 h-4" />
                                                <h3 className="text-xs font-black uppercase tracking-widest">Branding Successful</h3>
                                            </div>
                                            <p className="text-xl font-bold tracking-tight">Your watermarked PDF is ready!</p>
                                        </div>
                                        <button
                                            onClick={handleDownload}
                                            className="h-14 px-8 rounded-2xl bg-white text-primary font-black uppercase tracking-widest flex items-center gap-3 hover:scale-105 transition-transform"
                                        >
                                            <Download className="w-5 h-5" /> Download Result
                                        </button>
                                    </motion.div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </ToolLayout>
    );
}
