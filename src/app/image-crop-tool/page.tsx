"use client";

import { useState, useRef, useEffect } from "react";
import ReactCrop, { centerCrop, makeAspectCrop, Crop, PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { ToolLayout } from "@/components/ui/ToolLayout";
import { FileUploader } from "@/components/ui/FileUploader";
import { ResultCard } from "@/components/ui/CalculatorUI";
import { Download, RefreshCw, Crop as CropIcon, Maximize2, Check, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

function centerAspectCrop(
    mediaWidth: number,
    mediaHeight: number,
    aspect: number,
) {
    return centerCrop(
        makeAspectCrop(
            {
                unit: "%",
                width: 90,
            },
            aspect,
            mediaWidth,
            mediaHeight,
        ),
        mediaWidth,
        mediaHeight,
    );
}

export default function ImageCropTool() {
    const [originalFile, setOriginalFile] = useState<File | null>(null);
    const [imgSrc, setImgSrc] = useState("");
    const imgRef = useRef<HTMLImageElement>(null);
    const [crop, setCrop] = useState<Crop>();
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
    const [aspect, setAspect] = useState<number | undefined>(1);
    const [isConverting, setIsConverting] = useState(false);
    const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);

    function onSelectFile(files: File[]) {
        if (files[0]) {
            setCrop(undefined); // Makes crop preview update
            const reader = new FileReader();
            reader.addEventListener("load", () =>
                setImgSrc(reader.result?.toString() || ""),
            );
            reader.readAsDataURL(files[0]);
            setOriginalFile(files[0]);
            setCroppedImageUrl(null);
        } else {
            setOriginalFile(null);
            setImgSrc("");
            setCroppedImageUrl(null);
        }
    }

    function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
        if (aspect) {
            const { width, height } = e.currentTarget;
            setCrop(centerAspectCrop(width, height, aspect));
        }
    }

    const getCroppedImg = async () => {
        if (!completedCrop || !imgRef.current) return;

        setIsConverting(true);
        const canvas = document.createElement("canvas");
        const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
        const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
        canvas.width = completedCrop.width;
        canvas.height = completedCrop.height;
        const ctx = canvas.getContext("2d");

        if (ctx) {
            ctx.drawImage(
                imgRef.current,
                completedCrop.x * scaleX,
                completedCrop.y * scaleY,
                completedCrop.width * scaleX,
                completedCrop.height * scaleY,
                0,
                0,
                completedCrop.width,
                completedCrop.height,
            );
        }

        const base64Image = canvas.toDataURL("image/png");
        setCroppedImageUrl(base64Image);
        setIsConverting(false);
    };

    const handleDownload = () => {
        if (!croppedImageUrl) return;
        const a = document.createElement("a");
        a.href = croppedImageUrl;
        a.download = `cropped-${originalFile?.name || "image.png"}`;
        a.click();
    };

    return (
        <ToolLayout
            title="Image Crop Tool"
            description="Crop images to specific ratios or custom sizes with ease. Professional tools for perfect framing."
            category="Image Tools"
            categoryHref="/image-tools"
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Side: Upload & Controls */}
                <div className="lg:col-span-12 xl:col-span-5 space-y-6">
                    <FileUploader
                        onFileSelect={onSelectFile}
                        accept="image/*"
                        label="Upload image to crop"
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
                                        <CropIcon className="w-4 h-4 text-primary" />
                                        <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Crop Settings</h3>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-xs font-bold uppercase tracking-widest opacity-60">Aspect Ratio</label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {[
                                                { label: "1:1", val: 1 },
                                                { label: "4:3", val: 4 / 3 },
                                                { label: "16:9", val: 16 / 9 },
                                                { label: "3:2", val: 3 / 2 },
                                                { label: "Free", val: undefined },
                                                { label: "9:16", val: 9 / 16 }
                                            ].map((ratio) => (
                                                <button
                                                    key={ratio.label}
                                                    onClick={() => {
                                                        setAspect(ratio.val);
                                                        if (imgRef.current && ratio.val) {
                                                            setCrop(centerAspectCrop(imgRef.current.width, imgRef.current.height, ratio.val));
                                                        }
                                                    }}
                                                    className={cn(
                                                        "h-10 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all",
                                                        aspect === ratio.val ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" : "bg-background/50 border-border hover:border-primary/50"
                                                    )}
                                                >
                                                    {ratio.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <button
                                        onClick={getCroppedImg}
                                        disabled={isConverting || !completedCrop}
                                        className={cn(
                                            "w-full h-14 rounded-2xl premium-gradient text-white font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all hover:shadow-2xl hover:shadow-primary/20 mt-4",
                                            (isConverting || !completedCrop) && "opacity-70 cursor-not-allowed"
                                        )}
                                    >
                                        {isConverting ? <RefreshCw className="animate-spin" /> : "Apply Crop"}
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Right Side: Crop Interface & Results */}
                <div className="lg:col-span-12 xl:col-span-7 space-y-6">
                    <AnimatePresence mode="wait">
                        {!imgSrc ? (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="h-full min-h-[500px] flex flex-col items-center justify-center text-center p-8 space-y-4"
                            >
                                <div className="p-6 rounded-full bg-primary/5">
                                    <Info className="w-12 h-12 text-primary/20" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-lg font-bold opacity-40 uppercase tracking-widest">Awaiting Editor</h3>
                                    <p className="text-sm text-muted-foreground max-w-xs mx-auto italic">
                                        Upload an image to open the crop editor.
                                    </p>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="editor"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-8"
                            >
                                <div className="p-4 rounded-[2.5rem] bg-secondary/30 border border-primary/5 min-h-[400px] flex items-center justify-center">
                                    <ReactCrop
                                        crop={crop}
                                        onChange={(c) => setCrop(c)}
                                        onComplete={(c) => setCompletedCrop(c)}
                                        aspect={aspect}
                                        className="rounded-xl overflow-hidden shadow-2xl"
                                    >
                                        <img
                                            ref={imgRef}
                                            src={imgSrc}
                                            alt="Crop editor"
                                            onLoad={onImageLoad}
                                            className="max-h-[600px] w-auto"
                                        />
                                    </ReactCrop>
                                </div>

                                {croppedImageUrl && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="p-8 rounded-[2.5rem] premium-gradient text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-primary/30"
                                    >
                                        <div className="space-y-1 text-center md:text-left">
                                            <div className="flex items-center gap-2 justify-center md:justify-start">
                                                <Check className="w-4 h-4" />
                                                <h3 className="text-xs font-black uppercase tracking-widest">Crop Applied</h3>
                                            </div>
                                            <p className="text-xl font-bold tracking-tight">Your cropped image is ready!</p>
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
