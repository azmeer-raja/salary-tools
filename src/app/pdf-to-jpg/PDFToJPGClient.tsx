"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/ui/ToolLayout";
import { FileUploader } from "@/components/ui/FileUploader";
import { ResultCard } from "@/components/ui/CalculatorUI";
import { Download, RefreshCw, Check, Info, FileText, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import * as pdfjsLib from "pdfjs-dist";
import { cn } from "@/lib/utils";

// Initialize PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export default function PDFToJPG() {
    const [file, setFile] = useState<File | null>(null);
    const [images, setImages] = useState<{ name: string; url: string }[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [pageCount, setPageCount] = useState(0);

    const handleFileSelect = async (files: File[]) => {
        if (files[0]) {
            setFile(files[0]);
            setImages([]);

            const arrayBuffer = await files[0].arrayBuffer();
            const loadingTask = pdfjsLib.getDocument(arrayBuffer);
            const pdf = await loadingTask.promise;
            setPageCount(pdf.numPages);
        } else {
            setFile(null);
            setPageCount(0);
            setImages([]);
        }
    };

    const handleConvert = async () => {
        if (!file) return;

        setIsProcessing(true);
        try {
            const arrayBuffer = await file.arrayBuffer();
            const loadingTask = pdfjsLib.getDocument(arrayBuffer);
            const pdf = await loadingTask.promise;

            const newImages: { name: string; url: string }[] = [];

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const viewport = page.getViewport({ scale: 2.0 }); // High quality
                const canvas = document.createElement("canvas");
                const context = canvas.getContext("2d");

                canvas.height = viewport.height;
                canvas.width = viewport.width;

                if (context) {
                    await page.render({ canvasContext: context, viewport, canvas } as any).promise;
                    const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
                    newImages.push({
                        name: `Page ${i}.jpg`,
                        url: dataUrl
                    });
                }
            }

            setImages(newImages);
        } catch (error) {
            console.error("PDF to JPG conversion failed:", error);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <ToolLayout
            title="PDF to JPG"
            description="Convert PDF pages into high-quality JPEG images. Perfect for presentations, social media, and quick previews."
            category="PDF Tools"
            categoryHref="/pdf-tools"
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Side: Upload & Controls */}
                <div className="lg:col-span-12 xl:col-span-5 space-y-6">
                    <FileUploader
                        onFileSelect={handleFileSelect}
                        accept="application/pdf"
                        label="Upload PDF to convert"
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
                                        <ImageIcon className="w-4 h-4 text-primary" />
                                        <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Conversion</h3>
                                    </div>
                                    <p className="text-xs text-muted-foreground leading-relaxed px-1">
                                        Each page of your PDF will be converted into a separate high-resolution JPEG image.
                                    </p>
                                    <button
                                        onClick={handleConvert}
                                        disabled={isProcessing}
                                        className={cn(
                                            "w-full h-14 rounded-2xl premium-gradient text-white font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all hover:shadow-2xl hover:shadow-primary/20 mt-4",
                                            isProcessing && "opacity-70 cursor-not-allowed"
                                        )}
                                    >
                                        {isProcessing ? <RefreshCw className="animate-spin" /> : "Convert to JPG"}
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
                                        Upload a PDF to extract its pages as images.
                                    </p>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="results"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-6"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <ResultCard label="Total Pages" value={pageCount.toString()} variant="default" />
                                    <ResultCard label="Output Images" value={images.length > 0 ? images.length.toString() : "---"} variant={images.length > 0 ? "primary" : "default"} />
                                </div>

                                <div className="space-y-4">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-2">Converted Pages</p>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                        {images.length > 0 ? (
                                            images.map((img, idx) => (
                                                <motion.div
                                                    key={idx}
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: idx * 0.05 }}
                                                    className="group relative aspect-[3/4] rounded-2xl overflow-hidden glass border border-primary/10 shadow-sm"
                                                >
                                                    <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 backdrop-blur-[2px]">
                                                        <p className="text-[10px] font-black uppercase tracking-widest text-white drop-shadow-md">Page {idx + 1}</p>
                                                        <button
                                                            onClick={() => {
                                                                const a = document.createElement("a");
                                                                a.href = img.url;
                                                                a.download = `page-${idx + 1}-${file.name}.jpg`;
                                                                a.click();
                                                            }}
                                                            className="p-2 rounded-xl bg-white text-primary shadow-xl hover:scale-110 transition-transform"
                                                        >
                                                            <Download size={16} />
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            ))
                                        ) : (
                                            <div className="col-span-full p-12 text-center glass rounded-3xl border-dashed border-primary/20 opacity-40">
                                                <p className="text-xs font-bold uppercase tracking-widest italic">Images will appear here after conversion</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {images.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="p-8 rounded-[2.5rem] premium-gradient text-white shadow-2xl shadow-primary/30 flex items-center justify-between gap-6"
                                    >
                                        <div className="space-y-1">
                                            <h3 className="text-xs font-black uppercase tracking-widest opacity-80 decoration-white">Success</h3>
                                            <p className="text-xl font-bold tracking-tight">All pages converted to JPG!</p>
                                        </div>
                                        <Check className="w-8 h-8 opacity-40" />
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
