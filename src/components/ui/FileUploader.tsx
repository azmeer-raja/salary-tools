"use client";

import { cn } from "@/lib/utils";
import { Upload, X, File, Image as ImageIcon } from "lucide-react";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FileUploaderProps {
    onFileSelect: (files: File[]) => void;
    accept?: string;
    multiple?: boolean;
    label?: string;
    maxSize?: number; // in MB
}

export function FileUploader({
    onFileSelect,
    accept = "image/*,application/pdf",
    multiple = false,
    label = "Upload file",
    maxSize = 10
}: FileUploaderProps) {
    const [dragActive, setDragActive] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const [error, setError] = useState<string | null>(null);

    const handleFiles = useCallback((selectedFiles: File[]) => {
        setError(null);
        const validFiles = selectedFiles.filter(file => {
            if (maxSize && file.size > maxSize * 1024 * 1024) {
                setError(`File too large. Maximum size is ${maxSize}MB.`);
                return false;
            }
            return true;
        });

        if (validFiles.length > 0) {
            const newFiles = multiple ? [...files, ...validFiles] : validFiles;
            setFiles(newFiles);
            onFileSelect(newFiles);
        }
    }, [files, multiple, maxSize, onFileSelect]);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFiles(Array.from(e.dataTransfer.files));
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFiles(Array.from(e.target.files));
        }
    };

    const removeFile = (index: number) => {
        const newFiles = files.filter((_, i) => i !== index);
        setFiles(newFiles);
        onFileSelect(newFiles);
    };

    return (
        <div className="w-full space-y-4">
            <div
                className={cn(
                    "relative group cursor-pointer transition-all duration-300",
                    "rounded-3xl border-2 border-dashed p-8 md:p-12",
                    "flex flex-col items-center justify-center gap-4",
                    dragActive
                        ? "border-primary bg-primary/5 scale-[0.99]"
                        : "border-border hover:border-primary/50 bg-card/30 hover:bg-card/50"
                )}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => document.getElementById("file-upload")?.click()}
            >
                <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept={accept}
                    multiple={multiple}
                    onChange={handleChange}
                />

                <div className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500",
                    dragActive ? "bg-primary text-white scale-110 rotate-12" : "bg-primary/10 text-primary"
                )}>
                    <Upload className="w-8 h-8" />
                </div>

                <div className="text-center space-y-1">
                    <p className="text-lg font-bold">{label}</p>
                    <p className="text-sm text-muted-foreground">
                        Drag & drop or <span className="text-primary font-semibold">browse</span>
                    </p>
                    <p className="text-[10px] uppercase tracking-widest font-black opacity-40 pt-2">
                        {accept.replace(/,/g, " • ").replace(/\*/g, "")}
                    </p>
                </div>

                {dragActive && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-primary/5 rounded-3xl pointer-events-none"
                    />
                )}
            </div>

            <AnimatePresence>
                {error && (
                    <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-destructive text-xs font-bold text-center"
                    >
                        {error}
                    </motion.p>
                )}

                {files.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                    >
                        {files.map((file, index) => (
                            <motion.div
                                key={`${file.name}-${index}`}
                                layout
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="glass p-3 rounded-2xl flex items-center gap-3 group"
                            >
                                <div className="p-2 rounded-xl bg-primary/10 text-primary">
                                    {file.type.startsWith("image/") ? <ImageIcon className="w-4 h-4" /> : <File className="w-4 h-4" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-bold truncate">{file.name}</p>
                                    <p className="text-[10px] text-muted-foreground">
                                        {(file.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeFile(index);
                                    }}
                                    className="p-1 px-2 rounded-lg hover:bg-destructive/10 hover:text-destructive transition-colors opacity-0 group-hover:opacity-100"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
