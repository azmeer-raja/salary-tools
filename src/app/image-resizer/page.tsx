"use client";

import { useState, useRef, useEffect } from "react";
import { ToolLayout } from "@/components/ui/ToolLayout";
import { FileUploader } from "@/components/ui/FileUploader";
import { ResultCard, InputField } from "@/components/ui/CalculatorUI";
import { Download, RefreshCw, Maximize2, Link as LinkIcon, Unlink, Check, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ImageResizer() {
    const [originalFile, setOriginalFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [resizedUrl, setResizedUrl] = useState<string | null>(null);
    const [isResizing, setIsResizing] = useState(false);

    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);
    const [aspectRatio, setAspectRatio] = useState<number>(1);
    const [lockAspectRatio, setLockAspectRatio] = useState(true);
    const [originalDimensions, setOriginalDimensions] = useState({ w: 0, h: 0 });

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleFileSelect = (files: File[]) => {
        if (files[0]) {
            const file = files[0];
            setOriginalFile(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            setResizedUrl(null);

            const img = new Image();
            img.onload = () => {
                setOriginalDimensions({ w: img.width, h: img.height });
                setWidth(img.width);
                setHeight(img.height);
                setAspectRatio(img.width / img.height);
            };
            img.src = url;
        } else {
            setOriginalFile(null);
            setPreviewUrl(null);
            setResizedUrl(null);
        }
    };

    const handleWidthChange = (val: string) => {
        const w = parseInt(val) || 0;
        setWidth(w);
        if (lockAspectRatio && aspectRatio) {
            setHeight(Math.round(w / aspectRatio));
        }
    };

    const handleHeightChange = (val: string) => {
        const h = parseInt(val) || 0;
        setHeight(h);
        if (lockAspectRatio && aspectRatio) {
            setWidth(Math.round(h * aspectRatio));
        }
    };

    const handleResize = () => {
        if (!originalFile || !width || !height) return;

        setIsResizing(true);
        const img = new Image();
        img.onload = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            ctx.drawImage(img, 0, 0, width, height);
            const dataUrl = canvas.toDataURL(originalFile.type);
            setResizedUrl(dataUrl);
            setIsResizing(false);
        };
        img.src = previewUrl!;
    };

    const handleDownload = () => {
        if (!resizedUrl) return;
        const a = document.createElement("a");
        a.href = resizedUrl;
        a.download = `resized-${width}x${height}-${originalFile?.name}`;
        a.click();
    };

    return (
        <ToolLayout
            title="Image Resizer"
            description="Change image dimensions with pixel perfection. Maintain aspect ratio or set custom sizes."
            category="Image Tools"
            categoryHref="/image-tools"
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Side: Upload & Controls */}
                <div className="lg:col-span-12 xl:col-span-5 space-y-6">
                    <FileUploader
                        onFileSelect={handleFileSelect}
                        accept="image/jpeg,image/png,image/webp"
                        label="Upload image to resize"
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
                                        <Maximize2 className="w-4 h-4 text-primary" />
                                        <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Dimensions</h3>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 relative">
                                        <InputField
                                            label="Width (px)"
                                            id="width"
                                            value={width}
                                            onChange={handleWidthChange}
                                        />
                                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-1.5 z-10">
                                            <button
                                                onClick={() => setLockAspectRatio(!lockAspectRatio)}
                                                className={cn(
                                                    "p-2 rounded-full border transition-all duration-300",
                                                    lockAspectRatio ? "bg-primary text-white border-primary" : "bg-background text-muted-foreground border-border"
                                                )}
                                            >
                                                {lockAspectRatio ? <LinkIcon size={14} /> : <Unlink size={14} />}
                                            </button>
                                        </div>
                                        <InputField
                                            label="Height (px)"
                                            id="height"
                                            value={height}
                                            onChange={handleHeightChange}
                                        />
                                    </div>

                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {[
                                            { label: "Original", w: originalDimensions.w, h: originalDimensions.h },
                                            { label: "1080p", w: 1920, h: 1080 },
                                            { label: "720p", w: 1280, h: 720 },
                                            { label: "Square", w: 1080, h: 1080 }
                                        ].map((preset) => (
                                            <button
                                                key={preset.label}
                                                onClick={() => {
                                                    setWidth(preset.w);
                                                    setHeight(preset.h);
                                                    if (!lockAspectRatio) setAspectRatio(preset.w / preset.h);
                                                }}
                                                className="px-3 py-1.5 rounded-xl bg-secondary/30 border border-transparent hover:border-primary/30 hover:bg-primary/5 text-[10px] font-bold uppercase tracking-wider transition-all"
                                            >
                                                {preset.label}
                                            </button>
                                        ))}
                                    </div>

                                    <button
                                        onClick={handleResize}
                                        disabled={isResizing}
                                        className={cn(
                                            "w-full h-14 rounded-2xl premium-gradient text-white font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all hover:shadow-2xl hover:shadow-primary/20 mt-4",
                                            isResizing && "opacity-70 cursor-not-allowed"
                                        )}
                                    >
                                        {isResizing ? (
                                            <RefreshCw className="w-5 h-5 animate-spin" />
                                        ) : (
                                            "Resize Image"
                                        )}
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Right Side: Preview */}
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
                                    <h3 className="text-lg font-bold opacity-40 uppercase tracking-widest">No Image Selected</h3>
                                    <p className="text-sm text-muted-foreground max-w-xs mx-auto italic">
                                        Upload an image to resize it for web, print, or social media.
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
                                        label="Original"
                                        value={`${originalDimensions.w} × ${originalDimensions.h}`}
                                        variant="default"
                                    />
                                    <ResultCard
                                        label="New Size"
                                        value={width && height ? `${width} × ${height}` : "---"}
                                        variant={resizedUrl ? "primary" : "default"}
                                    />
                                </div>

                                <div className="space-y-4">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-2">Preview</p>
                                    <div className="aspect-video sm:aspect-auto sm:min-h-[400px] rounded-[2.5rem] overflow-hidden bg-secondary/30 border border-primary/5 flex items-center justify-center group relative p-4">
                                        {resizedUrl ? (
                                            <>
                                                <img src={resizedUrl} alt="Resized" className="max-w-full max-h-full object-contain rounded-xl shadow-2xl" />
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

                                {resizedUrl && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="p-8 rounded-[2.5rem] premium-gradient text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-primary/30"
                                    >
                                        <div className="space-y-1 text-center md:text-left">
                                            <div className="flex items-center gap-2 justify-center md:justify-start">
                                                <Check className="w-4 h-4" />
                                                <h3 className="text-xs font-black uppercase tracking-widest">Resized Successfully</h3>
                                            </div>
                                            <p className="text-xl font-bold tracking-tight">Your {width}x{height} image is ready!</p>
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
