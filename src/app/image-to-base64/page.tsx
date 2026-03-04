"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/ui/ToolLayout";
import { FileUploader } from "@/components/ui/FileUploader";
import { ResultCard } from "@/components/ui/CalculatorUI";
import { Copy, Check, Info, FileCode, Eraser } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ImageToBase64() {
    const [file, setFile] = useState<File | null>(null);
    const [base64, setBase64] = useState<string>("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [copied, setCopied] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleFileSelect = (files: File[]) => {
        if (files[0]) {
            const selectedFile = files[0];
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
            convertToBase64(selectedFile);
        } else {
            setFile(null);
            setBase64("");
            setPreviewUrl(null);
        }
    };

    const convertToBase64 = (file: File) => {
        setIsProcessing(true);
        const reader = new FileReader();
        reader.onloadend = () => {
            setBase64(reader.result as string);
            setIsProcessing(false);
        };
        reader.onerror = () => {
            console.error("Failed to read file");
            setIsProcessing(false);
        };
        reader.readAsDataURL(file);
    };

    const handleCopy = () => {
        if (!base64) return;
        navigator.clipboard.writeText(base64);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <ToolLayout
            title="Image to Base64"
            description="Convert images to Base64 data strings. Perfect for embedding images in HTML, CSS, or JSON."
            category="Image Tools"
            categoryHref="/image-tools"
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Side: Upload & Info */}
                <div className="lg:col-span-12 xl:col-span-5 space-y-6">
                    <FileUploader
                        onFileSelect={handleFileSelect}
                        accept="image/*"
                        label="Upload image to convert"
                    />

                    <AnimatePresence>
                        {file && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-4"
                            >
                                <ResultCard
                                    label="File Type"
                                    value={file.type}
                                    variant="default"
                                />
                                <div className="glass p-6 rounded-3xl space-y-4 overflow-hidden relative">
                                    <div className="flex justify-between items-center relative z-10">
                                        <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Preview</p>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-primary">Actual Size</p>
                                    </div>
                                    <div className="aspect-square rounded-2xl overflow-hidden bg-secondary/30 flex items-center justify-center relative z-10">
                                        {previewUrl && <img src={previewUrl} alt="Preview" className="w-full h-full object-contain p-4" />}
                                    </div>
                                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Right Side: Base64 Result */}
                <div className="lg:col-span-12 xl:col-span-7 space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <div className="flex items-center gap-2">
                            <FileCode className="w-4 h-4 text-primary" />
                            <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Base64 Data URI</h3>
                        </div>
                        {base64 && (
                            <button
                                onClick={handleCopy}
                                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary hover:opacity-70 transition-opacity"
                            >
                                {copied ? <Check size={14} /> : <Copy size={14} />}
                                {copied ? "Copied String" : "Copy String"}
                            </button>
                        )}
                    </div>

                    <div className="relative group min-h-[400px]">
                        <div className={cn(
                            "absolute inset-0 rounded-[2.5rem] glass border-primary/10 transition-all duration-300 overflow-hidden",
                            !base64 && "flex items-center justify-center text-center p-8 grayscale opacity-50"
                        )}>
                            {base64 ? (
                                <textarea
                                    readOnly
                                    value={base64}
                                    className="w-full h-full bg-transparent p-8 font-mono text-[11px] leading-relaxed outline-none resize-none"
                                />
                            ) : (
                                <div className="space-y-4">
                                    <div className="w-16 h-16 rounded-3xl bg-primary/5 flex items-center justify-center mx-auto">
                                        <Info className="w-8 h-8 text-primary/20" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">Waiting for file</p>
                                        <p className="text-xs text-muted-foreground/60 italic max-w-[200px] mx-auto">
                                            The data URI will appear here once you upload an image.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {base64 && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-8 rounded-[2.5rem] premium-gradient text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-primary/30"
                        >
                            <div className="space-y-1 text-center md:text-left">
                                <div className="flex items-center gap-2 justify-center md:justify-start">
                                    <Check className="w-4 h-4" />
                                    <h3 className="text-xs font-black uppercase tracking-widest">Conversion Ready</h3>
                                </div>
                                <p className="text-xl font-bold tracking-tight">Base64 string successfully generated!</p>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => {
                                        setFile(null);
                                        setBase64("");
                                        setPreviewUrl(null);
                                    }}
                                    className="h-14 px-6 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-black uppercase tracking-widest flex items-center gap-3 transition-colors"
                                >
                                    <Eraser className="w-5 h-5" /> Clear
                                </button>
                                <button
                                    onClick={handleCopy}
                                    className="h-14 px-8 rounded-2xl bg-white text-primary font-black uppercase tracking-widest flex items-center gap-3 hover:scale-105 transition-transform"
                                >
                                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                                    {copied ? "Copied!" : "Copy String"}
                                </button>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </ToolLayout>
    );
}
