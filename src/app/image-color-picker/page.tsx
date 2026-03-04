"use client";

import { useState, useRef, useEffect } from "react";
import { ToolLayout } from "@/components/ui/ToolLayout";
import { FileUploader } from "@/components/ui/FileUploader";
import { ResultCard } from "@/components/ui/CalculatorUI";
import { Copy, Check, Info, Pipette, Hash, Palette } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ImageColorPicker() {
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [pickedColor, setPickedColor] = useState<string>("#7C3AED"); // Default primary
    const [copied, setCopied] = useState(false);
    const [isEyeDropperSupported, setIsEyeDropperSupported] = useState(false);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        setIsEyeDropperSupported('EyeDropper' in window);
    }, []);

    const handleFileSelect = (files: File[]) => {
        if (files[0]) {
            setFile(files[0]);
            const url = URL.createObjectURL(files[0]);
            setPreviewUrl(url);
        } else {
            setFile(null);
            setPreviewUrl(null);
        }
    };

    const handleColorPick = async () => {
        if (isEyeDropperSupported) {
            try {
                // @ts-ignore
                const eyeDropper = new EyeDropper();
                const result = await eyeDropper.open();
                setPickedColor(result.sRGBHex);
            } catch (e) {
                console.error("EyeDropper failed:", e);
            }
        }
    };

    const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * canvas.width;
        const y = ((e.clientY - rect.top) / rect.height) * canvas.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const pixel = ctx.getImageData(x, y, 1, 1).data;
        const hex = "#" + ("000000" + rgbToHex(pixel[0], pixel[1], pixel[2])).slice(-6);
        setPickedColor(hex);
    };

    const rgbToHex = (r: number, g: number, b: number) => {
        if (r > 255 || g > 255 || b > 255) throw "Invalid color component";
        return ((r << 16) | (g << 8) | b).toString(16);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(pickedColor);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Prepare canvas when image loads
    useEffect(() => {
        if (previewUrl && canvasRef.current) {
            const img = new Image();
            img.onload = () => {
                const canvas = canvasRef.current;
                if (!canvas) return;
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext("2d");
                ctx?.drawImage(img, 0, 0);
            };
            img.src = previewUrl;
        }
    }, [previewUrl]);

    return (
        <ToolLayout
            title="Image Color Picker"
            description="Extract perfect hex codes from any image. Use the professional eyedropper tool for pixel-accurate results."
            category="Image Tools"
            categoryHref="/image-tools"
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Side: Upload & Results */}
                <div className="lg:col-span-12 xl:col-span-5 space-y-6">
                    <FileUploader
                        onFileSelect={handleFileSelect}
                        accept="image/*"
                        label="Upload image to pick colors"
                    />

                    <AnimatePresence>
                        {file && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-6 pt-4"
                            >
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="p-8 rounded-[2.5rem] glass border flex flex-col items-center justify-center gap-4 relative overflow-hidden group">
                                        <div
                                            className="w-24 h-24 rounded-full border-4 border-white shadow-2xl transition-transform group-hover:scale-110 duration-500"
                                            style={{ backgroundColor: pickedColor }}
                                        />
                                        <div className="text-center space-y-1 z-10">
                                            <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Picked Color</p>
                                            <p className="text-3xl font-black tracking-tighter uppercase font-display">{pickedColor}</p>
                                        </div>
                                        <div className="absolute -bottom-10 -right-10 w-32 h-32 opacity-20 rounded-full blur-3xl" style={{ backgroundColor: pickedColor }} />
                                    </div>

                                    <div className="flex gap-3">
                                        <button
                                            onClick={handleCopy}
                                            className="flex-1 h-14 rounded-2xl bg-secondary/50 border font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-primary/5 transition-all text-muted-foreground hover:text-primary"
                                        >
                                            {copied ? <Check size={16} /> : <Copy size={16} />}
                                            {copied ? "Copied" : "Copy HEX"}
                                        </button>
                                        {isEyeDropperSupported && (
                                            <button
                                                onClick={handleColorPick}
                                                className="flex-1 h-14 rounded-2xl premium-gradient text-white font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:shadow-xl transition-all"
                                            >
                                                <Pipette size={16} /> EyeDropper
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="glass p-6 rounded-3xl space-y-4">
                                    <div className="flex items-center gap-2">
                                        <Palette className="w-4 h-4 text-primary" />
                                        <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Recent Shades</h3>
                                    </div>
                                    <div className="grid grid-cols-5 gap-2">
                                        {[pickedColor, "#3B82F6", "#EF4444", "#10B981", "#F59E0B"].map((c, i) => (
                                            <button
                                                key={i}
                                                className="aspect-square rounded-xl border-2 border-white/10 shadow-sm"
                                                style={{ backgroundColor: c }}
                                                onClick={() => setPickedColor(c)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Right Side: Image Canvas */}
                <div className="lg:col-span-12 xl:col-span-7 space-y-6">
                    <AnimatePresence mode="wait">
                        {!file ? (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="h-full min-h-[500px] flex flex-col items-center justify-center text-center p-8 space-y-4"
                            >
                                <div className="p-6 rounded-full bg-primary/5">
                                    <Pipette className="w-12 h-12 text-primary/20" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-lg font-bold opacity-40 uppercase tracking-widest">Awaiting Palette</h3>
                                    <p className="text-sm text-muted-foreground max-w-xs mx-auto italic">
                                        Upload an image and click anywhere on it to extract colors.
                                    </p>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="canvas"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-4"
                            >
                                <div className="flex items-center justify-between px-2">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Click to pick color</p>
                                    {!isEyeDropperSupported && (
                                        <div className="flex items-center gap-2 text-[10px] text-orange-500 font-bold uppercase tracking-widest">
                                            <Info size={12} /> Canvas picking mode
                                        </div>
                                    )}
                                </div>
                                <div className="glass p-4 rounded-[2.5rem] border-primary/10 flex items-center justify-center overflow-hidden min-h-[500px]">
                                    <canvas
                                        ref={canvasRef}
                                        onClick={handleCanvasClick}
                                        className="max-w-full max-h-[700px] object-contain cursor-crosshair rounded-xl shadow-2xl transition-transform hover:scale-[1.01] duration-500"
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </ToolLayout>
    );
}
