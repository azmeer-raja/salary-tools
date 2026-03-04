"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/ui/ToolLayout";
import { FileUploader } from "@/components/ui/FileUploader";
import { ResultCard } from "@/components/ui/CalculatorUI";
import { Download, RefreshCw, Layers, Check, Info, FileText, ChevronUp, ChevronDown, Trash2 } from "lucide-react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { PDFDocument } from "pdf-lib";
import { cn } from "@/lib/utils";

export default function MergePDF() {
    const [files, setFiles] = useState<File[]>([]);
    const [mergedUrl, setMergedUrl] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleFileSelect = (newFiles: File[]) => {
        setFiles(newFiles);
        setMergedUrl(null);
    };

    const handleMerge = async () => {
        if (files.length < 2) return;

        setIsProcessing(true);
        try {
            const mergedPdf = await PDFDocument.create();

            for (const file of files) {
                const arrayBuffer = await file.arrayBuffer();
                const pdf = await PDFDocument.load(arrayBuffer);
                const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                copiedPages.forEach((page) => mergedPdf.addPage(page));
            }

            const pdfBytes = await mergedPdf.save();
            const blob = new Blob([pdfBytes], { type: "application/pdf" });
            setMergedUrl(URL.createObjectURL(blob));
        } catch (error) {
            console.error("PDF Merge failed:", error);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDownload = () => {
        if (!mergedUrl) return;
        const a = document.createElement("a");
        a.href = mergedUrl;
        a.download = `merged-calcyraja-${new Date().getTime()}.pdf`;
        a.click();
    };

    return (
        <ToolLayout
            title="Merge PDF"
            description="Combine multiple PDF files into a single document effortlessly. Reorder pages and files with a simple drag-and-drop."
            category="PDF Tools"
            categoryHref="/pdf-tools"
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Side: Upload & Reorder */}
                <div className="lg:col-span-12 xl:col-span-6 space-y-6">
                    <FileUploader
                        onFileSelect={handleFileSelect}
                        accept="application/pdf"
                        multiple={true}
                        label="Upload PDF files to merge"
                    />

                    <AnimatePresence>
                        {files.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="space-y-4 pt-4"
                            >
                                <div className="flex items-center justify-between px-2">
                                    <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Order of Merge</h3>
                                    <p className="text-[10px] font-bold text-primary bg-primary/5 px-2 py-0.5 rounded-full">{files.length} Files Selected</p>
                                </div>

                                <Reorder.Group axis="y" values={files} onReorder={setFiles} className="space-y-2">
                                    {files.map((file, index) => (
                                        <Reorder.Item
                                            key={`${file.name}-${index}`}
                                            value={file}
                                            className="glass p-4 rounded-2xl flex items-center gap-4 group cursor-grab active:cursor-grabbing border border-primary/5 hover:border-primary/20 transition-all"
                                        >
                                            <div className="p-2 rounded-xl bg-primary/10 text-primary">
                                                <FileText className="w-4 h-4" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-bold truncate">{file.name}</p>
                                                <p className="text-[10px] text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                            </div>
                                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => setFiles(files.filter((_, i) => i !== index))}
                                                    className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </Reorder.Item>
                                    ))}
                                </Reorder.Group>

                                <button
                                    onClick={handleMerge}
                                    disabled={isProcessing || files.length < 2}
                                    className={cn(
                                        "w-full h-14 rounded-2xl premium-gradient text-white font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all hover:shadow-2xl hover:shadow-primary/20 mt-4",
                                        (isProcessing || files.length < 2) && "opacity-70 cursor-not-allowed"
                                    )}
                                >
                                    {isProcessing ? <RefreshCw className="animate-spin" /> : "Merge All Files"}
                                </button>
                                {files.length === 1 && <p className="text-center text-[10px] font-bold text-orange-500 uppercase tracking-widest italic">Add at least one more file to merge</p>}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Right Side: Preview & Download */}
                <div className="lg:col-span-12 xl:col-span-6 space-y-6">
                    <AnimatePresence mode="wait">
                        {!mergedUrl ? (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="h-full min-h-[500px] flex flex-col items-center justify-center text-center p-8 space-y-4"
                            >
                                <div className="p-6 rounded-full bg-primary/5">
                                    <Layers className="w-12 h-12 text-primary/20" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-lg font-bold opacity-40 uppercase tracking-widest">Awaiting PDF</h3>
                                    <p className="text-sm text-muted-foreground max-w-xs mx-auto italic">
                                        Upload two or more PDF files to combine them into one document.
                                    </p>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="results"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="space-y-6"
                            >
                                <ResultCard
                                    label="Total Documents Merged"
                                    value={files.length.toString()}
                                    variant="primary"
                                    description="Order preserved as shown on the left."
                                />

                                <div className="rounded-[2.5rem] glass border-primary/10 overflow-hidden h-[500px]">
                                    <iframe
                                        src={`${mergedUrl}#toolbar=0`}
                                        className="w-full h-full border-none"
                                        title="Merged PDF Preview"
                                    />
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-8 rounded-[2.5rem] premium-gradient text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-primary/30"
                                >
                                    <div className="space-y-1 text-center md:text-left">
                                        <div className="flex items-center gap-2 justify-center md:justify-start">
                                            <Check className="w-4 h-4" />
                                            <h3 className="text-xs font-black uppercase tracking-widest">Merge Successful</h3>
                                        </div>
                                        <p className="text-xl font-bold tracking-tight">Your PDF is ready to download!</p>
                                    </div>
                                    <button
                                        onClick={handleDownload}
                                        className="h-14 px-8 rounded-2xl bg-white text-primary font-black uppercase tracking-widest flex items-center gap-3 hover:scale-105 transition-transform"
                                    >
                                        <Download className="w-5 h-5" /> Download Result
                                    </button>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </ToolLayout>
    );
}
