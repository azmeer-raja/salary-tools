"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/ui/ToolLayout";
import { FileUploader } from "@/components/ui/FileUploader";
import { ResultCard } from "@/components/ui/CalculatorUI";
import { Download, RefreshCw, Check, Info, FileText, ImageIcon, FilePlus, Trash2 } from "lucide-react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { jsPDF } from "jspdf";
import { cn } from "@/lib/utils";

export default function JPGToPDF() {
    const [files, setFiles] = useState<File[]>([]);
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleFileSelect = (newFiles: File[]) => {
        setFiles(newFiles);
        setPdfUrl(null);
    };

    const handleConvert = async () => {
        if (files.length === 0) return;

        setIsProcessing(true);
        try {
            const pdf = new jsPDF();

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const imageData = await readFileAsDataURL(file);

                // Get image dimensions to maintain aspect ratio
                const img = new Image();
                await new Promise((resolve) => {
                    img.onload = resolve;
                    img.src = imageData;
                });

                const pageWidth = pdf.internal.pageSize.getWidth();
                const pageHeight = pdf.internal.pageSize.getHeight();

                const ratio = Math.min(pageWidth / img.width, pageHeight / img.height);
                const width = img.width * ratio;
                const height = img.height * ratio;

                const x = (pageWidth - width) / 2;
                const y = (pageHeight - height) / 2;

                if (i > 0) pdf.addPage();
                pdf.addImage(imageData, 'JPEG', x, y, width, height);
            }

            const pdfBlob = pdf.output('blob');
            setPdfUrl(URL.createObjectURL(pdfBlob));
        } catch (error) {
            console.error("JPG to PDF conversion failed:", error);
        } finally {
            setIsProcessing(false);
        }
    };

    const readFileAsDataURL = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const handleDownload = () => {
        if (!pdfUrl) return;
        const a = document.createElement("a");
        a.href = pdfUrl;
        a.download = `converted-images-calcyraja.pdf`;
        a.click();
    };

    return (
        <ToolLayout
            title="JPG to PDF"
            description="Convert your JPEG and PNG images into a professional PDF document. Perfect for portfolios and scanning."
            category="PDF Tools"
            categoryHref="/pdf-tools"
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Side: Upload & Order */}
                <div className="lg:col-span-12 xl:col-span-6 space-y-6">
                    <FileUploader
                        onFileSelect={handleFileSelect}
                        accept="image/jpeg,image/png,image/webp"
                        multiple={true}
                        label="Upload images to convert"
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
                                    <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Page Order</h3>
                                    <p className="text-[10px] font-bold text-primary bg-primary/5 px-2 py-0.5 rounded-full">{files.length} Images Selected</p>
                                </div>

                                <Reorder.Group axis="y" values={files} onReorder={setFiles} className="space-y-2">
                                    {files.map((file, index) => (
                                        <Reorder.Item
                                            key={`${file.name}-${index}`}
                                            value={file}
                                            className="glass p-3 rounded-2xl flex items-center gap-3 group cursor-grab active:cursor-grabbing border border-primary/5 hover:border-primary/20 transition-all"
                                        >
                                            <div className="p-2 rounded-xl bg-primary/10 text-primary">
                                                <ImageIcon className="w-4 h-4" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-bold truncate">{file.name}</p>
                                                <p className="text-[10px] text-muted-foreground font-medium">Page {index + 1}</p>
                                            </div>
                                            <button
                                                onClick={() => setFiles(files.filter((_, i) => i !== index))}
                                                className="p-2 rounded-lg hover:bg-destructive/10 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </Reorder.Item>
                                    ))}
                                </Reorder.Group>

                                <button
                                    onClick={handleConvert}
                                    disabled={isProcessing || files.length === 0}
                                    className={cn(
                                        "w-full h-14 rounded-2xl premium-gradient text-white font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all hover:shadow-2xl hover:shadow-primary/20 mt-4",
                                        (isProcessing || files.length === 0) && "opacity-70 cursor-not-allowed"
                                    )}
                                >
                                    {isProcessing ? <RefreshCw className="animate-spin" /> : "Generate PDF"}
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Right Side: Results */}
                <div className="lg:col-span-12 xl:col-span-6 space-y-6">
                    <AnimatePresence mode="wait">
                        {!pdfUrl ? (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="h-full min-h-[500px] flex flex-col items-center justify-center text-center p-8 space-y-4"
                            >
                                <div className="p-6 rounded-full bg-primary/5">
                                    <FilePlus className="w-12 h-12 text-primary/20" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-lg font-bold opacity-40 uppercase tracking-widest">Awaiting Generation</h3>
                                    <p className="text-sm text-muted-foreground max-w-xs mx-auto italic">
                                        Your PDF will be generated instantly after you click the button.
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
                                    label="Pages Created"
                                    value={files.length.toString()}
                                    variant="primary"
                                />

                                <div className="rounded-[2.5rem] glass border-primary/10 overflow-hidden h-[500px]">
                                    <iframe
                                        src={`${pdfUrl}#toolbar=0`}
                                        className="w-full h-full border-none"
                                        title="Generated PDF Preview"
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
                                            <h3 className="text-xs font-black uppercase tracking-widest">Conversion Successful</h3>
                                        </div>
                                        <p className="text-xl font-bold tracking-tight">Your images are now a PDF!</p>
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
