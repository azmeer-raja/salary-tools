"use client";

import { useState, useRef, useEffect } from "react";
import { ToolLayout } from "@/components/ui/ToolLayout";
import { FileUploader } from "@/components/ui/FileUploader";
import { ResultCard } from "@/components/ui/CalculatorUI";
import { Download, RefreshCw, Droplets, Check, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function BlurImageTool() {
    const [originalFile, setOriginalFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [blurredUrl, setBlurredUrl] = useState<string | null>(null);
    const [blurAmount, setBlurAmount] = useState(10);
    const [isProcessing, setIsProcessing] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleFileSelect = (files: File[]) => {
        if (files[0]) {
            setOriginalFile(files[0]);
            const url = URL.createObjectURL(files[0]);
            setPreviewUrl(url);
            setBlurredUrl(null);
        } else {
            setOriginalFile(null);
            setPreviewUrl(null);
            setBlurredUrl(null);
        }
    };

    const handleBlur = () => {
        if (!originalFile || !previewUrl) return;

        setIsProcessing(true);
        const img = new Image();
        img.onload = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            ctx.filter = `blur(${blurAmount}px)`;
            ctx.drawImage(img, 0, 0);

            // To prevent edge bleed, we can draw a secondary version or just accept it as a creative effect.
            // Professional blur usually needs some padding/cropping, but this is fine for basic tools.

            const dataUrl = canvas.toDataURL(originalFile.type);
            setBlurredUrl(dataUrl);
            setIsProcessing(false);
        };
        img.src = previewUrl;
    };

    const handleDownload = () => {
        if (!blurredUrl) return;
        const a = document.createElement("a");
        a.href = blurredUrl;
        a.download = `blurred-${originalFile?.name}`;
        a.click();
    };

    return (
        <ToolLayout
            title="Blur Image Tool"
            description="Add artistic or privacy blur to your images. Simple, fast, and entirely local."
            category="Image Tools"
            categoryHref="/image-tools"
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Side: Upload & Controls */}
                <div className="lg:col-span-12 xl:col-span-5 space-y-6">
                    <FileUploader
                        onFileSelect={handleFileSelect}
                        accept="image/*"
                        label="Upload image to blur"
                    />

                    <AnimatePresence>
                        {originalFile && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="space-y-6 pt-4"
                            >
                                <div className="space-y-6 glass p-6 rounded-3xl border-dashed border-primary/20">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Droplets className="w-4 h-4 text-primary" />
                                        <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Blur Settings</h3>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <label className="text-xs font-bold uppercase tracking-widest opacity-60">Blur Radius</label>
                                            <span className="text-xs font-black text-primary">{blurAmount}px</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            step="1"
                                            value={blurAmount}
                                            onChange={(e) => setBlurAmount(parseInt(e.target.value))}
                                            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                                        />
                                    </div>

                                    <button
                                        onClick={handleBlur}
                                        disabled={isProcessing}
                                        className={cn(
                                            "w-full h-14 rounded-2xl premium-gradient text-white font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all hover:shadow-2xl hover:shadow-primary/20 mt-4",
                                            isProcessing && "opacity-70 cursor-not-allowed"
                                        )}
                                    >
                                        {isProcessing ? <RefreshCw className="animate-spin" /> : "Apply Blur"}
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Right Side: Results */}
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
                                    <Droplets className="w-12 h-12 text-primary/20" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-lg font-bold opacity-40 uppercase tracking-widest">Awaiting Image</h3>
                                    <p className="text-sm text-muted-foreground max-w-xs mx-auto italic">
                                        Upload an image to apply blur effects.
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
                                        label="Blur Radius"
                                        value={blurAmount + " px"}
                                        variant="default"
                                    />
                                    <ResultCard
                                        label="Status"
                                        value={blurredUrl ? "Blurred" : "Ready"}
                                        variant={blurredUrl ? "primary" : "default"}
                                    />
                                </div>

                                <div className="space-y-4">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-2">Preview</p>
                                    <div className="aspect-video sm:aspect-auto sm:min-h-[400px] rounded-[2.5rem] overflow-hidden bg-secondary/30 border border-primary/5 flex items-center justify-center group relative p-4">
                                        {blurredUrl ? (
                                            <>
                                                <img src={blurredUrl} alt="Blurred" className="max-w-full max-h-full object-contain rounded-xl shadow-2xl" />
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
                                            <img src={previewUrl} style={{ filter: `blur(${blurAmount}px)` }} alt="Live Preview" className="max-w-full max-h-full object-contain opacity-60 transition-all duration-300" />
                                        ) : null}
                                    </div>
                                </div>

                                {blurredUrl && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="p-8 rounded-[2.5rem] premium-gradient text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-primary/30"
                                    >
                                        <div className="space-y-1 text-center md:text-left">
                                            <div className="flex items-center gap-2 justify-center md:justify-start">
                                                <Check className="w-4 h-4" />
                                                <h3 className="text-xs font-black uppercase tracking-widest">Effect Applied</h3>
                                            </div>
                                            <p className="text-xl font-bold tracking-tight">Your blurred image is ready!</p>
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
