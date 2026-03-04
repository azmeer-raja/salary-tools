"use client";

import { useState, useRef } from "react";
import { ToolLayout } from "@/components/ui/ToolLayout";
import { FileUploader } from "@/components/ui/FileUploader";
import { ResultCard } from "@/components/ui/CalculatorUI";
import { Download, RefreshCw, Check, Info, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ImageConverterComponentProps {
    title: string;
    description: string;
    fromFormat: string;
    toFormat: string;
    toMimeType: string;
}

export function ImageConverterComponent({ title, description, fromFormat, toFormat, toMimeType }: ImageConverterComponentProps) {
    const [file, setFile] = useState<File | null>(null);
    const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
    const [isConverting, setIsConverting] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleFileSelect = (files: File[]) => {
        if (files[0]) {
            setFile(files[0]);
            setPreviewUrl(URL.createObjectURL(files[0]));
            setConvertedUrl(null);
        } else {
            setFile(null);
            setPreviewUrl(null);
            setConvertedUrl(null);
        }
    };

    const handleConvert = () => {
        if (!file || !previewUrl) return;

        setIsConverting(true);
        const img = new Image();
        img.onload = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            ctx.drawImage(img, 0, 0);
            const dataUrl = canvas.toDataURL(toMimeType);
            setConvertedUrl(dataUrl);
            setIsConverting(false);
        };
        img.src = previewUrl;
    };

    const handleDownload = () => {
        if (!convertedUrl) return;
        const a = document.createElement("a");
        a.href = convertedUrl;
        const extension = toFormat.toLowerCase();
        const baseName = file?.name.split('.').slice(0, -1).join('.') || "converted";
        a.download = `${baseName}.${extension}`;
        a.click();
    };

    return (
        <ToolLayout
            title={title}
            description={description}
            category="Image Tools"
            categoryHref="/image-tools"
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-12 xl:col-span-5 space-y-6">
                    <FileUploader
                        onFileSelect={handleFileSelect}
                        accept={`image/${fromFormat.toLowerCase()},image/jpeg,image/png,image/webp`}
                        label={`Upload ${fromFormat} image`}
                    />

                    <AnimatePresence>
                        {file && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="space-y-4"
                            >
                                <div className="glass p-8 rounded-3xl border-dashed border-primary/20 flex flex-col items-center gap-6">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 rounded-2xl bg-secondary/50 font-black text-xs uppercase tracking-widest">{fromFormat}</div>
                                        <ArrowRight className="text-primary animate-pulse" />
                                        <div className="p-3 rounded-2xl bg-primary text-white font-black text-xs uppercase tracking-widest">{toFormat}</div>
                                    </div>
                                    <button
                                        onClick={handleConvert}
                                        disabled={isConverting}
                                        className={cn(
                                            "w-full h-14 rounded-2xl premium-gradient text-white font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all hover:shadow-2xl hover:shadow-primary/20",
                                            isConverting && "opacity-70 cursor-not-allowed"
                                        )}
                                    >
                                        {isConverting ? <RefreshCw className="animate-spin" /> : "Convert Now"}
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

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
                                    <Info className="w-12 h-12 text-primary/20" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-lg font-bold opacity-40 uppercase tracking-widest">Awaiting Conversion</h3>
                                    <p className="text-sm text-muted-foreground max-w-xs mx-auto italic">
                                        Select a {fromFormat} image to convert it to {toFormat} instantly.
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
                                    <ResultCard label="Source" value={fromFormat} variant="default" />
                                    <ResultCard label="Target" value={toFormat} variant={convertedUrl ? "primary" : "default"} />
                                </div>

                                <div className="space-y-4">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-2">Preview</p>
                                    <div className="aspect-video sm:aspect-auto sm:min-h-[400px] rounded-[2.5rem] overflow-hidden bg-secondary/30 border border-primary/5 flex items-center justify-center group relative p-4">
                                        {convertedUrl ? (
                                            <>
                                                <img src={convertedUrl} alt="Converted" className="max-w-full max-h-full object-contain rounded-xl shadow-2xl" />
                                                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <button
                                                        onClick={handleDownload}
                                                        className="p-4 rounded-2xl bg-white text-primary shadow-2xl scale-90 group-hover:scale-100 transition-transform flex items-center gap-2 font-black uppercase text-[10px] tracking-widest"
                                                    >
                                                        <Download className="w-4 h-4" /> Download
                                                    </button>
                                                </div>
                                            </>
                                        ) : previewUrl ? (
                                            <div className="opacity-50 grayscale transition-all">
                                                <img src={previewUrl} alt="Preview" className="max-w-full max-h-full object-contain opacity-40" />
                                            </div>
                                        ) : null}
                                    </div>
                                </div>

                                {convertedUrl && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="p-8 rounded-[2.5rem] premium-gradient text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-primary/30"
                                    >
                                        <div className="space-y-1 text-center md:text-left">
                                            <div className="flex items-center gap-2 justify-center md:justify-start">
                                                <Check className="w-4 h-4" />
                                                <h3 className="text-xs font-black uppercase tracking-widest">Conversion Successful</h3>
                                            </div>
                                            <p className="text-xl font-bold tracking-tight">Your {toFormat} image is ready!</p>
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
            <canvas ref={canvasRef} className="hidden" />
        </ToolLayout>
    );
}
