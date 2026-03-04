"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/ui/ToolLayout";
import { FileUploader } from "@/components/ui/FileUploader";
import { ResultCard } from "@/components/ui/CalculatorUI";
import { Download, RefreshCw, RotateCw, Check, Info, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PDFDocument, degrees } from "pdf-lib";
import { cn } from "@/lib/utils";

export default function RotatePDF() {
    const [file, setFile] = useState<File | null>(null);
    const [rotatedUrl, setRotatedUrl] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [rotation, setRotation] = useState(90);

    const handleFileSelect = (files: File[]) => {
        if (files[0]) {
            setFile(files[0]);
            setRotatedUrl(null);
        } else {
            setFile(null);
            setRotatedUrl(null);
        }
    };

    const handleRotate = async () => {
        if (!file) return;

        setIsProcessing(true);
        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(arrayBuffer);
            const pages = pdfDoc.getPages();

            pages.forEach((page) => {
                const currentRotation = page.getRotation().angle;
                page.setRotation(degrees(currentRotation + rotation));
            });

            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
            setRotatedUrl(URL.createObjectURL(blob));
        } catch (error) {
            console.error("PDF rotation failed:", error);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDownload = () => {
        if (!rotatedUrl) return;
        const a = document.createElement("a");
        a.href = rotatedUrl;
        a.download = `rotated-${file?.name}`;
        a.click();
    };

    return (
        <ToolLayout
            title="Rotate PDF"
            description="Fix orientation issues by rotating PDF pages. Rotate the entire document or specific pages instantly."
            category="PDF Tools"
            categoryHref="/pdf-tools"
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Side: Upload & Controls */}
                <div className="lg:col-span-12 xl:col-span-5 space-y-6">
                    <FileUploader
                        onFileSelect={handleFileSelect}
                        accept="application/pdf"
                        label="Upload PDF to rotate"
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
                                        <RotateCw className="w-4 h-4 text-primary" />
                                        <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Rotation Settings</h3>
                                    </div>

                                    <div className="grid grid-cols-3 gap-2">
                                        {[90, 180, 270].map((deg) => (
                                            <button
                                                key={deg}
                                                onClick={() => setRotation(deg)}
                                                className={cn(
                                                    "h-12 rounded-xl border text-xs font-black uppercase tracking-widest transition-all",
                                                    rotation === deg ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" : "bg-background/50 border-border hover:border-primary/50"
                                                )}
                                            >
                                                {deg}°
                                            </button>
                                        ))}
                                    </div>

                                    <button
                                        onClick={handleRotate}
                                        disabled={isProcessing}
                                        className={cn(
                                            "w-full h-14 rounded-2xl premium-gradient text-white font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all hover:shadow-2xl hover:shadow-primary/20 mt-4",
                                            isProcessing && "opacity-70 cursor-not-allowed"
                                        )}
                                    >
                                        {isProcessing ? <RefreshCw className="animate-spin" /> : "Apply Rotation"}
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
                                    <RotateCw className="w-12 h-12 text-primary/20" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-lg font-bold opacity-40 uppercase tracking-widest">Awaiting File</h3>
                                    <p className="text-sm text-muted-foreground max-w-xs mx-auto italic">
                                        Upload a PDF to fix its orientation.
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
                                    <ResultCard label="Output Angle" value={`+${rotation}°`} variant="default" />
                                    <ResultCard label="Status" value={rotatedUrl ? "Rotated" : "Selected"} variant={rotatedUrl ? "primary" : "default"} />
                                </div>

                                <div className="rounded-[2.5rem] glass border-primary/10 overflow-hidden h-[500px]">
                                    {rotatedUrl ? (
                                        <iframe
                                            src={`${rotatedUrl}#toolbar=0`}
                                            className="w-full h-full border-none"
                                            title="Rotated PDF Preview"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground gap-4">
                                            <Info className="animate-pulse" />
                                            <p className="text-xs font-bold uppercase tracking-widest">Applying changes...</p>
                                        </div>
                                    )}
                                </div>

                                {rotatedUrl && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="p-8 rounded-[2.5rem] premium-gradient text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-primary/30"
                                    >
                                        <div className="space-y-1 text-center md:text-left">
                                            <div className="flex items-center gap-2 justify-center md:justify-start">
                                                <Check className="w-4 h-4" />
                                                <h3 className="text-xs font-black uppercase tracking-widest">Rotation Applied</h3>
                                            </div>
                                            <p className="text-xl font-bold tracking-tight">Your rotated PDF is ready!</p>
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
