"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/ui/ToolLayout";
import { FileUploader } from "@/components/ui/FileUploader";
import { ResultCard } from "@/components/ui/CalculatorUI";
import { Download, RefreshCw, Sliders, ChevronDown, Check, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import imageCompression from "browser-image-compression";
import { cn } from "@/lib/utils";

export default function ImageCompressor() {
    const [originalFile, setOriginalFile] = useState<File | null>(null);
    const [compressedFile, setCompressedFile] = useState<File | null>(null);
    const [isCompressing, setIsCompressing] = useState(false);
    const [quality, setQuality] = useState(0.8);
    const [maxWidth, setMaxWidth] = useState(1920);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [compressedPreviewUrl, setCompressedPreviewUrl] = useState<string | null>(null);

    const handleFileSelect = (files: File[]) => {
        if (files[0]) {
            setOriginalFile(files[0]);
            setPreviewUrl(URL.createObjectURL(files[0]));
            setCompressedFile(null);
            setCompressedPreviewUrl(null);
        } else {
            setOriginalFile(null);
            setPreviewUrl(null);
            setCompressedFile(null);
            setCompressedPreviewUrl(null);
        }
    };

    const handleCompress = async () => {
        if (!originalFile) return;

        setIsCompressing(true);
        try {
            const options = {
                maxSizeMB: quality * (originalFile.size / 1024 / 1024),
                maxWidthOrHeight: maxWidth,
                useWebWorker: true,
                initialQuality: quality,
            };

            const compressed = await imageCompression(originalFile, options);
            setCompressedFile(compressed);
            setCompressedPreviewUrl(URL.createObjectURL(compressed));
        } catch (error) {
            console.error("Compression failed:", error);
        } finally {
            setIsCompressing(false);
        }
    };

    const handleDownload = () => {
        if (!compressedFile) return;
        const url = URL.createObjectURL(compressedFile);
        const a = document.createElement("a");
        a.href = url;
        a.download = `compressed-${originalFile?.name}`;
        a.click();
    };

    return (
        <ToolLayout
            title="Image Compressor"
            description="Reduce image file size while maintaining quality. 100% private, client-side processing."
            category="Image Tools"
            categoryHref="/image-tools"
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Side: Upload & Controls */}
                <div className="lg:col-span-12 xl:col-span-5 space-y-6">
                    <FileUploader
                        onFileSelect={handleFileSelect}
                        accept="image/jpeg,image/png,image/webp"
                        label="Upload original image"
                    />

                    <AnimatePresence>
                        {originalFile && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="space-y-6 pt-4"
                            >
                                <div className="space-y-4 glass p-6 rounded-3xl border-dashed border-primary/20">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Sliders className="w-4 h-4 text-primary" />
                                        <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Compression Settings</h3>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <label className="text-xs font-bold uppercase tracking-widest opacity-60">Quality</label>
                                            <span className="text-xs font-black text-primary">{Math.round(quality * 100)}%</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0.1"
                                            max="1.0"
                                            step="0.1"
                                            value={quality}
                                            onChange={(e) => setQuality(parseFloat(e.target.value))}
                                            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                                        />
                                    </div>

                                    <div className="space-y-2 pt-2">
                                        <div className="flex justify-between">
                                            <label className="text-xs font-bold uppercase tracking-widest opacity-60">Max Width/Height</label>
                                            <span className="text-xs font-black text-primary">{maxWidth}px</span>
                                        </div>
                                        <div className="relative">
                                            <select
                                                value={maxWidth}
                                                onChange={(e) => setMaxWidth(parseInt(e.target.value))}
                                                className="w-full h-12 rounded-2xl bg-background/50 border px-4 pr-10 text-sm font-bold outline-none focus:border-primary transition-all appearance-none"
                                            >
                                                <option value={1080}>FHD (1080px)</option>
                                                <option value={1920}>2K (1920px)</option>
                                                <option value={3840}>4K (3840px)</option>
                                                <option value={800}>Mobile (800px)</option>
                                            </select>
                                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-30" size={16} />
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleCompress}
                                        disabled={isCompressing}
                                        className={cn(
                                            "w-full h-14 rounded-2xl premium-gradient text-white font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all hover:shadow-2xl hover:shadow-primary/20 mt-4",
                                            isCompressing && "opacity-70 cursor-not-allowed"
                                        )}
                                    >
                                        {isCompressing ? (
                                            <RefreshCw className="w-5 h-5 animate-spin" />
                                        ) : (
                                            "Compress Image"
                                        )}
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Right Side: Results & Preview */}
                <div className="lg:col-span-12 xl:col-span-7 space-y-6">
                    <AnimatePresence mode="wait">
                        {!originalFile ? (
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
                                    <h3 className="text-lg font-bold opacity-40 uppercase tracking-widest">Awaiting File</h3>
                                    <p className="text-sm text-muted-foreground max-w-xs mx-auto italic">
                                        Upload an image to start optimizing. Supports JPG, PNG, and WebP.
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
                                {/* Stat Cards */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <ResultCard
                                        label="Original Size"
                                        value={(originalFile.size / 1024 / 1024).toFixed(2) + " MB"}
                                        variant="default"
                                    />
                                    <ResultCard
                                        label="Compressed Size"
                                        value={compressedFile ? (compressedFile.size / 1024 / 1024).toFixed(2) + " MB" : "---"}
                                        variant={compressedFile ? "primary" : "default"}
                                        description={compressedFile ? `${Math.round(((originalFile.size - compressedFile.size) / originalFile.size) * 100)}% Reduction` : undefined}
                                    />
                                </div>

                                {/* Preview Panes */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-2">Original</p>
                                        <div className="aspect-square rounded-[2rem] overflow-hidden bg-secondary/30 border border-primary/5 flex items-center justify-center group relative">
                                            {previewUrl && (
                                                <img src={previewUrl} alt="Original" className="w-full h-full object-contain" />
                                            )}
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-2">Compressed</p>
                                        <div className="aspect-square rounded-[2rem] overflow-hidden bg-secondary/30 border border-primary/5 flex items-center justify-center group relative">
                                            {compressedPreviewUrl ? (
                                                <>
                                                    <img src={compressedPreviewUrl} alt="Compressed" className="w-full h-full object-contain" />
                                                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                        <button
                                                            onClick={handleDownload}
                                                            className="p-4 rounded-2xl bg-white text-primary shadow-2xl scale-90 group-hover:scale-100 transition-transform flex items-center gap-2 font-black uppercase text-[10px] tracking-widest"
                                                        >
                                                            <Download className="w-4 h-4" /> Download
                                                        </button>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="flex flex-col items-center gap-2 opacity-20">
                                                    <RefreshCw className="w-8 h-8" />
                                                    <span className="text-[10px] font-black uppercase tracking-widest">Ready to compress</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {compressedFile && (
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
                                            <p className="text-xl font-bold tracking-tight">Your optimized image is ready!</p>
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
