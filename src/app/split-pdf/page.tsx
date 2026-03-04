"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/ui/ToolLayout";
import { FileUploader } from "@/components/ui/FileUploader";
import { ResultCard, InputField } from "@/components/ui/CalculatorUI";
import { Download, RefreshCw, Scissors, Check, Info, FileText, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PDFDocument } from "pdf-lib";
import { cn } from "@/lib/utils";

export default function SplitPDF() {
    const [file, setFile] = useState<File | null>(null);
    const [splitUrls, setSplitUrls] = useState<{ name: string; url: string }[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [pageCount, setPageCount] = useState(0);
    const [ranges, setRanges] = useState("1, 2-3");

    const handleFileSelect = async (files: File[]) => {
        if (files[0]) {
            setFile(files[0]);
            const arrayBuffer = await files[0].arrayBuffer();
            const pdf = await PDFDocument.load(arrayBuffer);
            setPageCount(pdf.getPageCount());
            setSplitUrls([]);
        } else {
            setFile(null);
            setPageCount(0);
            setSplitUrls([]);
        }
    };

    const handleSplit = async () => {
        if (!file) return;

        setIsProcessing(true);
        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await PDFDocument.load(arrayBuffer);
            const totalPages = pdf.getPageCount();

            // Parse ranges: "1, 2-3, 5" -> [[0], [1, 2], [4]]
            const parts = ranges.split(",").map(p => p.trim());
            const newSplitUrls: { name: string; url: string }[] = [];

            for (let i = 0; i < parts.length; i++) {
                const part = parts[i];
                let start, end;
                if (part.includes("-")) {
                    [start, end] = part.split("-").map(n => parseInt(n.trim()));
                } else {
                    start = end = parseInt(part);
                }

                if (isNaN(start) || isNaN(end) || start < 1 || end > totalPages || start > end) {
                    continue;
                }

                const newPdf = await PDFDocument.create();
                const pagesToCopy = Array.from({ length: end - start + 1 }, (_, idx) => start - 1 + idx);
                const copiedPages = await newPdf.copyPages(pdf, pagesToCopy);
                copiedPages.forEach(p => newPdf.addPage(p));

                const pdfBytes = await newPdf.save();
                const blob = new Blob([pdfBytes as unknown as BlobPart], { type: "application/pdf" });
                newSplitUrls.push({
                    name: `Part ${i + 1} (Pages ${start}-${end})`,
                    url: URL.createObjectURL(blob)
                });
            }

            setSplitUrls(newSplitUrls);
        } catch (error) {
            console.error("PDF Split failed:", error);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <ToolLayout
            title="Split PDF"
            description="Extract specific pages or page ranges into new PDF files. Fast, secure, and entirely browser-based."
            category="PDF Tools"
            categoryHref="/pdf-tools"
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Side: Upload & Range Settings */}
                <div className="lg:col-span-12 xl:col-span-5 space-y-6">
                    <FileUploader
                        onFileSelect={handleFileSelect}
                        accept="application/pdf"
                        label="Upload PDF to split"
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
                                        <Scissors className="w-4 h-4 text-primary" />
                                        <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Split Settings</h3>
                                    </div>

                                    <div className="space-y-4">
                                        <InputField
                                            label="Page Ranges"
                                            id="ranges"
                                            type="text"
                                            value={ranges}
                                            onChange={setRanges}
                                        />
                                        <p className="text-[10px] text-muted-foreground font-medium italic leading-relaxed px-1">
                                            Example: "1, 2-5, 8" to get three separate files. Total pages: <span className="text-primary font-black">{pageCount}</span>
                                        </p>
                                    </div>

                                    <button
                                        onClick={handleSplit}
                                        disabled={isProcessing || !ranges}
                                        className={cn(
                                            "w-full h-14 rounded-2xl premium-gradient text-white font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all hover:shadow-2xl hover:shadow-primary/20",
                                            (isProcessing || !ranges) && "opacity-70 cursor-not-allowed"
                                        )}
                                    >
                                        {isProcessing ? <RefreshCw className="animate-spin" /> : "Split PDF Now"}
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
                                        Upload a multi-page PDF to start extracting specific parts.
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
                                    <ResultCard label="Status" value={splitUrls.length > 0 ? `${splitUrls.length} Files Ready` : "Ready to Split"} variant={splitUrls.length > 0 ? "primary" : "default"} />
                                </div>

                                <div className="space-y-4">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-2">Extracted Files</p>
                                    <div className="space-y-3">
                                        {splitUrls.length > 0 ? (
                                            splitUrls.map((item, idx) => (
                                                <motion.div
                                                    key={idx}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: idx * 0.1 }}
                                                    className="p-4 rounded-2xl glass border border-primary/5 flex items-center justify-between group"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 rounded-xl bg-primary/5 text-primary">
                                                            <FileText size={16} />
                                                        </div>
                                                        <p className="text-sm font-bold">{item.name}</p>
                                                    </div>
                                                    <button
                                                        onClick={() => {
                                                            const a = document.createElement("a");
                                                            a.href = item.url;
                                                            a.download = `split-${idx + 1}-${file.name}`;
                                                            a.click();
                                                        }}
                                                        className="p-2 px-4 rounded-xl bg-primary text-white text-[10px] font-black uppercase tracking-widest hover:shadow-lg hover:shadow-primary/20 transition-all"
                                                    >
                                                        Download
                                                    </button>
                                                </motion.div>
                                            ))
                                        ) : (
                                            <div className="p-12 text-center glass rounded-3xl border-dashed border-primary/20 opacity-40">
                                                <p className="text-xs font-bold uppercase tracking-widest italic">Define ranges and click split to see files</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {splitUrls.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="p-8 rounded-[2.5rem] premium-gradient text-white shadow-2xl shadow-primary/30 flex items-center gap-6"
                                    >
                                        <div className="p-4 rounded-full bg-white/10">
                                            <Check className="w-8 h-8" />
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="text-xs font-black uppercase tracking-widest opacity-80">Extraction Complete</h3>
                                            <p className="text-xl font-bold tracking-tight">Your PDF has been split into {splitUrls.length} parts!</p>
                                        </div>
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
