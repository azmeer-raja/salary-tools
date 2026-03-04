"use client";

import { useState, useRef } from "react";
import { ToolLayout } from "@/components/ui/ToolLayout";
import { FileUploader } from "@/components/ui/FileUploader";
import { ResultCard, InputField } from "@/components/ui/CalculatorUI";
import { Download, RefreshCw, Type, Check, Info, LayoutTemplate } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function AddWatermark() {
    const [originalFile, setOriginalFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [watermarkedUrl, setWatermarkedUrl] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const [text, setText] = useState("Toolzverse");
    const [fontSize, setFontSize] = useState(48);
    const [opacity, setOpacity] = useState(0.5);
    const [position, setPosition] = useState<"center" | "bottom-right" | "top-left" | "top-right" | "bottom-left">("bottom-right");

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleFileSelect = (files: File[]) => {
        if (files[0]) {
            setOriginalFile(files[0]);
            const url = URL.createObjectURL(files[0]);
            setPreviewUrl(url);
            setWatermarkedUrl(null);
        } else {
            setOriginalFile(null);
            setPreviewUrl(null);
            setWatermarkedUrl(null);
        }
    };

    const handleApplyWatermark = () => {
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

            // Draw original image
            ctx.drawImage(img, 0, 0);

            // Watermark settings
            ctx.font = `bold ${fontSize}px Space Grotesk, Inter, sans-serif`;
            ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
            ctx.shadowBlur = 10;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            const margin = fontSize;
            let x = canvas.width / 2;
            let y = canvas.height / 2;

            if (position === "bottom-right") {
                ctx.textAlign = "right";
                x = canvas.width - margin;
                y = canvas.height - margin;
            } else if (position === "top-left") {
                ctx.textAlign = "left";
                x = margin;
                y = margin + fontSize;
            } else if (position === "top-right") {
                ctx.textAlign = "right";
                x = canvas.width - margin;
                y = margin + fontSize;
            } else if (position === "bottom-left") {
                ctx.textAlign = "left";
                x = margin;
                y = canvas.height - margin;
            }

            ctx.fillText(text, x, y);

            const dataUrl = canvas.toDataURL(originalFile.type);
            setWatermarkedUrl(dataUrl);
            setIsProcessing(false);
        };
        img.src = previewUrl;
    };

    const handleDownload = () => {
        if (!watermarkedUrl) return;
        const a = document.createElement("a");
        a.href = watermarkedUrl;
        a.download = `watermarked-${originalFile?.name}`;
        a.click();
    };

    return (
        <ToolLayout
            title="Add Watermark to Image"
            description="Protect your creations with custom text watermarks. Fast, secure, and stays on your device."
            category="Image Tools"
            categoryHref="/image-tools"
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Side: Upload & Controls */}
                <div className="lg:col-span-12 xl:col-span-5 space-y-6">
                    <FileUploader
                        onFileSelect={handleFileSelect}
                        accept="image/*"
                        label="Upload image to watermark"
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
                                                min="12"
                                                max="200"
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
                                                step="0.1"
                                                value={opacity}
                                                onChange={(e) => setOpacity(parseFloat(e.target.value))}
                                                className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-xs font-bold uppercase tracking-widest opacity-60">Position</label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {(["top-left", "top-right", "center", "bottom-left", "bottom-right"] as const).map((pos) => (
                                                <button
                                                    key={pos}
                                                    onClick={() => setPosition(pos)}
                                                    className={cn(
                                                        "h-10 rounded-xl border text-[9px] font-black uppercase tracking-widest transition-all",
                                                        position === pos ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" : "bg-background/50 border-border hover:border-primary/50"
                                                    )}
                                                >
                                                    {pos.replace("-", " ")}
                                                </button>
                                            ))}
                                        </div>
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
                        {!originalFile ? (
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
                                    <h3 className="text-lg font-bold opacity-40 uppercase tracking-widest">Awaiting File</h3>
                                    <p className="text-sm text-muted-foreground max-w-xs mx-auto italic">
                                        Upload an image to start branding it.
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
                                        label="Watermark Text"
                                        value={text || "Toolzverse"}
                                        variant="default"
                                    />
                                    <ResultCard
                                        label="Status"
                                        value={watermarkedUrl ? "Ready" : "Previewing"}
                                        variant={watermarkedUrl ? "primary" : "default"}
                                    />
                                </div>

                                <div className="space-y-4">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-2">Preview</p>
                                    <div className="aspect-video sm:aspect-auto sm:min-h-[400px] rounded-[2.5rem] overflow-hidden bg-secondary/30 border border-primary/5 flex items-center justify-center group relative p-4">
                                        {watermarkedUrl ? (
                                            <>
                                                <img src={watermarkedUrl} alt="Watermarked" className="max-w-full max-h-full object-contain rounded-xl shadow-2xl" />
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
                                            <div className="relative max-w-full max-h-full">
                                                <img src={previewUrl} alt="Live Preview" className="max-w-full max-h-full object-contain opacity-60" />
                                                {/* Live preview overlay for text - simplified */}
                                                <div
                                                    className={cn(
                                                        "absolute pointer-events-none font-bold select-none",
                                                        position === "center" && "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                                                        position === "bottom-right" && "bottom-4 right-4",
                                                        position === "top-left" && "top-4 left-4",
                                                        position === "top-right" && "top-4 right-4",
                                                        position === "bottom-left" && "bottom-4 left-4"
                                                    )}
                                                    style={{
                                                        fontSize: fontSize / 4, // Scale for preview
                                                        color: `rgba(255, 255, 255, ${opacity})`,
                                                        textShadow: "0 2px 4px rgba(0,0,0,0.3)"
                                                    }}
                                                >
                                                    {text}
                                                </div>
                                            </div>
                                        ) : null}
                                    </div>
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
                                                <h3 className="text-xs font-black uppercase tracking-widest">Branding Applied</h3>
                                            </div>
                                            <p className="text-xl font-bold tracking-tight">Your watermarked image is ready!</p>
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
