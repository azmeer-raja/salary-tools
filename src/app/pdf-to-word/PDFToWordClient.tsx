"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/ui/ToolLayout";
import { FileUploader } from "@/components/ui/FileUploader";
import { ResultCard } from "@/components/ui/CalculatorUI";
import { Download, RefreshCw, Check, Info, FileText, FileCode } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import * as pdfjsLib from "pdfjs-dist";
import { cn } from "@/lib/utils";

// Initialize PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export default function PDFToWord() {
    const [file, setFile] = useState<File | null>(null);
    const [extractedText, setExtractedText] = useState<string>("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [pageCount, setPageCount] = useState(0);

    const handleFileSelect = async (files: File[]) => {
        if (files[0]) {
            setFile(files[0]);
            setExtractedText("");
            const arrayBuffer = await files[0].arrayBuffer();
            const loadingTask = pdfjsLib.getDocument(arrayBuffer);
            const pdf = await loadingTask.promise;
            setPageCount(pdf.numPages);
        } else {
            setFile(null);
            setPageCount(0);
            setExtractedText("");
        }
    };

    const handleExtract = async () => {
        if (!file) return;

        setIsProcessing(true);
        try {
            const arrayBuffer = await file.arrayBuffer();
            const loadingTask = pdfjsLib.getDocument(arrayBuffer);
            const pdf = await loadingTask.promise;

            let fullText = "";

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map((item: any) => item.str).join(" ");
                fullText += `--- Page ${i} ---\n\n${pageText}\n\n`;
            }

            setExtractedText(fullText);
        } catch (error) {
            console.error("Text extraction failed:", error);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDownload = () => {
        if (!extractedText) return;
        // Simple .docx trick: Word can open text files with .doc extension
        // or we can use a basic HTML structure that Word understands.
        const content = `<html><body>${extractedText.replace(/\n/g, '<br>')}</body></html>`;
        const blob = new Blob([content], { type: "application/msword" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = `${file?.name.split('.')[0] || "extracted"}.doc`;
        a.click();
    };

    return (
        <ToolLayout
            title="PDF to Word (Text)"
            description="Extract all text content from your PDF documents into an editable Word-compatible format. Fast and safe extraction."
            category="PDF Tools"
            categoryHref="/pdf-tools"
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Side: Upload & Controls */}
                <div className="lg:col-span-12 xl:col-span-5 space-y-6">
                    <FileUploader
                        onFileSelect={handleFileSelect}
                        accept="application/pdf"
                        label="Upload PDF to extract text"
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
                                        <FileCode className="w-4 h-4 text-primary" />
                                        <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Extraction</h3>
                                    </div>
                                    <p className="text-xs text-muted-foreground leading-relaxed px-1">
                                        Toolzverse will scan all {pageCount} pages and extract text strings while maintaining basic sequence.
                                    </p>
                                    <button
                                        onClick={handleExtract}
                                        disabled={isProcessing}
                                        className={cn(
                                            "w-full h-14 rounded-2xl premium-gradient text-white font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all hover:shadow-2xl hover:shadow-primary/20 mt-4",
                                            isProcessing && "opacity-70 cursor-not-allowed"
                                        )}
                                    >
                                        {isProcessing ? <RefreshCw className="animate-spin" /> : "Extract Text to Word"}
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Right Side: Preview & Results */}
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
                                    <h3 className="text-lg font-bold opacity-40 uppercase tracking-widest">Awaiting Extraction</h3>
                                    <p className="text-sm text-muted-foreground max-w-xs mx-auto italic">
                                        Convert your read-only PDFs into editable text documents.
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
                                    <ResultCard label="Pages Found" value={pageCount.toString()} variant="default" />
                                    <ResultCard label="Output Format" value=".DOC (Word)" variant={extractedText ? "primary" : "default"} />
                                </div>

                                <div className="space-y-4">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-2">Extraction Preview</p>
                                    <div className="glass p-6 rounded-[2rem] border-primary/10 overflow-hidden h-[300px] relative">
                                        {extractedText ? (
                                            <div className="h-full overflow-y-auto pr-4 scrollbar-custom">
                                                <pre className="text-xs font-medium whitespace-pre-wrap leading-relaxed opacity-60">
                                                    {extractedText}
                                                </pre>
                                            </div>
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground gap-4">
                                                <Info className="animate-pulse w-8 h-8 opacity-20" />
                                                <p className="text-[10px] font-black uppercase tracking-widest">Ready to scan document</p>
                                            </div>
                                        )}
                                        {extractedText && <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent pointer-events-none" />}
                                    </div>
                                </div>

                                {extractedText && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="p-8 rounded-[2.5rem] premium-gradient text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-primary/30"
                                    >
                                        <div className="space-y-1 text-center md:text-left">
                                            <div className="flex items-center gap-2 justify-center md:justify-start">
                                                <Check className="w-4 h-4" />
                                                <h3 className="text-xs font-black uppercase tracking-widest">Extraction Complete</h3>
                                            </div>
                                            <p className="text-xl font-bold tracking-tight">Your Word document is ready!</p>
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
