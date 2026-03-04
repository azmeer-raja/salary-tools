"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/ui/ToolLayout";
import { FileUploader } from "@/components/ui/FileUploader";
import { ResultCard } from "@/components/ui/CalculatorUI";
import { Download, RefreshCw, Minimize, Check, Info, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PDFDocument } from "pdf-lib";
import { cn } from "@/lib/utils";

export default function CompressPDF() {
    const [file, setFile] = useState<File | null>(null);
    const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
    const [compressedSize, setCompressedSize] = useState<number>(0);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleFileSelect = (files: File[]) => {
        if (files[0]) {
            setFile(files[0]);
            setCompressedUrl(null);
        } else {
            setFile(null);
            setCompressedUrl(null);
        }
    };

    const handleCompress = async () => {
        if (!file) return;

        setIsProcessing(true);
        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(arrayBuffer);

            // Re-saving with useObjectStreams: true can sometimes reduce size
            const pdfBytes = await pdfDoc.save({
                useObjectStreams: true,
                addDefaultPage: false,
            });

            const blob = new Blob([pdfBytes as unknown as BlobPart], { type: "application/pdf" });
            setCompressedUrl(URL.createObjectURL(blob));
            setCompressedSize(blob.size);
        } catch (error) {
            console.error("PDF compression failed:", error);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDownload = () => {
        if (!compressedUrl) return;
        const a = document.createElement("a");
        a.href = compressedUrl;
        a.download = `compressed-${file?.name}`;
        a.click();
    };

    return (
        <ToolLayout
            title="Compress PDF"
            description="Optimize PDF file size for faster sharing and storage. All processing happens in your browser."
            category="PDF Tools"
            categoryHref="/pdf-tools"
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Side: Upload & Controls */}
                <div className="lg:col-span-12 xl:col-span-5 space-y-6">
                    <FileUploader
                        onFileSelect={handleFileSelect}
                        accept="application/pdf"
                        label="Upload PDF to compress"
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
                                        <Minimize className="w-4 h-4 text-primary" />
                                        <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Optimization</h3>
                                    </div>
                                    <p className="text-xs text-muted-foreground leading-relaxed px-1">
                                        Toolzverse uses advanced re-encoding to strip unnecessary metadata and optimize structure.
                                    </p>
                                    <button
                                        onClick={handleCompress}
                                        disabled={isProcessing}
                                        className={cn(
                                            "w-full h-14 rounded-2xl premium-gradient text-white font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all hover:shadow-2xl hover:shadow-primary/20 mt-4",
                                            isProcessing && "opacity-70 cursor-not-allowed"
                                        )}
                                    >
                                        {isProcessing ? <RefreshCw className="animate-spin" /> : "Compress Now"}
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
                                    <FileText className="w-12 h-12 text-primary/20" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-lg font-bold opacity-40 uppercase tracking-widest">Awaiting PDF</h3>
                                    <p className="text-sm text-muted-foreground max-w-xs mx-auto italic">
                                        Upload a PDF to see the potential size reduction.
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
                                    <ResultCard
                                        label="Original Size"
                                        value={(file.size / 1024 / 1024).toFixed(2) + " MB"}
                                        variant="default"
                                    />
                                    <ResultCard
                                        label="Compressed Size"
                                        value={compressedUrl ? (compressedSize / 1024 / 1024).toFixed(2) + " MB" : "---"}
                                        variant={compressedUrl ? "primary" : "default"}
                                        description={compressedUrl ? `${Math.round(((file.size - compressedSize) / file.size) * 100)}% Reduction` : undefined}
                                    />
                                </div>

                                {compressedUrl && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="p-8 rounded-[2.5rem] premium-gradient text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-primary/30"
                                    >
                                        <div className="space-y-1 text-center md:text-left">
                                            <div className="flex items-center gap-2 justify-center md:justify-start">
                                                <Check className="w-4 h-4" />
                                                <h3 className="text-xs font-black uppercase tracking-widest">Optimization Successful</h3>
                                            </div>
                                            <p className="text-xl font-bold tracking-tight">Your compressed PDF is ready!</p>
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
