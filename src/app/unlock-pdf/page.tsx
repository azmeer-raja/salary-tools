"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/ui/ToolLayout";
import { FileUploader } from "@/components/ui/FileUploader";
import { ResultCard, InputField } from "@/components/ui/CalculatorUI";
import { Download, RefreshCw, Unlock, Check, Info, FileText, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PDFDocument } from "pdf-lib";
import { cn } from "@/lib/utils";

export default function UnlockPDF() {
    const [file, setFile] = useState<File | null>(null);
    const [unlockedUrl, setUnlockedUrl] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleFileSelect = (files: File[]) => {
        if (files[0]) {
            setFile(files[0]);
            setUnlockedUrl(null);
            setError(null);
        } else {
            setFile(null);
            setUnlockedUrl(null);
            setError(null);
        }
    };

    const handleUnlock = async () => {
        if (!file) return;

        setIsProcessing(true);
        setError(null);
        try {
            const arrayBuffer = await file.arrayBuffer();

            // Try loading with the provided password
            const pdfDoc = await (PDFDocument as any).load(arrayBuffer, {
                password: password,
                ignoreEncryption: false
            });

            // If it succeeds, re-save it without encryption
            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
            setUnlockedUrl(URL.createObjectURL(blob));
        } catch (err: any) {
            console.error("PDF unlock failed:", err);
            setError(err.message || "Failed to unlock. Incorrect password?");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <ToolLayout
            title="Unlock PDF"
            description="Remove password protection from your PDF files. You must know the current password to decrypt and save a clean copy."
            category="PDF Tools"
            categoryHref="/pdf-tools"
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Side: Upload & Controls */}
                <div className="lg:col-span-12 xl:col-span-5 space-y-6">
                    <FileUploader
                        onFileSelect={handleFileSelect}
                        accept="application/pdf"
                        label="Upload locked PDF"
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
                                        <Unlock className="w-4 h-4 text-primary" />
                                        <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Decryption</h3>
                                    </div>

                                    <InputField
                                        label="Current Password"
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={setPassword}
                                    />

                                    {error && (
                                        <div className="p-4 rounded-xl bg-destructive/5 border border-destructive/10 flex items-start gap-3">
                                            <AlertCircle className="w-4 h-4 text-destructive mt-0.5" />
                                            <p className="text-[10px] text-destructive font-black uppercase tracking-widest">{error}</p>
                                        </div>
                                    )}

                                    <button
                                        onClick={handleUnlock}
                                        disabled={isProcessing || !password}
                                        className={cn(
                                            "w-full h-14 rounded-2xl premium-gradient text-white font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all hover:shadow-2xl hover:shadow-primary/20 mt-4",
                                            (isProcessing || !password) && "opacity-70 cursor-not-allowed"
                                        )}
                                    >
                                        {isProcessing ? <RefreshCw className="animate-spin" /> : "Unlock & Remove Security"}
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
                                    <Unlock className="w-12 h-12 text-primary/20" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-lg font-bold opacity-40 uppercase tracking-widest">Awaiting Verification</h3>
                                    <p className="text-sm text-muted-foreground max-w-xs mx-auto italic">
                                        Unlock your documents to save them without password prompts.
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
                                    <ResultCard label="Locked Status" value="Encrypted" variant="default" />
                                    <ResultCard label="Target" value="Clean Copy" variant={unlockedUrl ? "primary" : "default"} />
                                </div>

                                {unlockedUrl ? (
                                    <div className="rounded-[2.5rem] glass border-primary/10 overflow-hidden h-[500px]">
                                        <iframe
                                            src={`${unlockedUrl}#toolbar=0`}
                                            className="w-full h-full border-none"
                                            title="Unlocked PDF Preview"
                                        />
                                    </div>
                                ) : (
                                    <div className="p-12 text-center glass rounded-3xl border-dashed border-primary/20 opacity-40">
                                        <p className="text-xs font-bold uppercase tracking-widest italic">Enter password and unlock to preview</p>
                                    </div>
                                )}

                                {unlockedUrl && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="p-8 rounded-[2.5rem] premium-gradient text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-primary/30"
                                    >
                                        <div className="space-y-1 text-center md:text-left">
                                            <div className="flex items-center gap-2 justify-center md:justify-start">
                                                <Check className="w-4 h-4" />
                                                <h3 className="text-xs font-black uppercase tracking-widest">Security Removed</h3>
                                            </div>
                                            <p className="text-xl font-bold tracking-tight">Your PDF is now unlocked!</p>
                                        </div>
                                        <button
                                            onClick={() => {
                                                const a = document.createElement("a");
                                                a.href = unlockedUrl;
                                                a.download = `unlocked-${file.name}`;
                                                a.click();
                                            }}
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
