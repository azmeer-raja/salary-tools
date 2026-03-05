"use client";

import { useState, useEffect, useRef } from "react";
import CalculatorLayout from "@/components/calculator/CalculatorLayout";
import {
    Code, Copy, Check, Info, FileJson, Minus, Plus,
    Download, Upload, RefreshCw, Type, AlignLeft,
    ChevronRight, ChevronDown, Trash2, SortAsc, Maximize2,
    Globe, ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// Helper for Recursive Tree View
const TreeItem = ({ name, value, depth = 0 }: { name: string; value: any; depth?: number }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const isObject = value !== null && typeof value === 'object';

    const getTypeColor = (val: any) => {
        if (typeof val === 'string') return 'text-green-500';
        if (typeof val === 'number') return 'text-lime-500';
        if (typeof val === 'boolean') return 'text-teal-500';
        if (val === null) return 'text-zinc-500';
        return 'text-primary';
    };

    return (
        <div className="select-none">
            <div
                className={cn(
                    "flex items-center gap-1 py-0.5 hover:bg-primary/5 rounded px-2 cursor-pointer transition-colors group",
                    depth === 0 && "mt-1"
                )}
                onClick={() => isObject && setIsExpanded(!isExpanded)}
            >
                {isObject ? (
                    isExpanded ? <ChevronDown size={14} className="opacity-40" /> : <ChevronRight size={14} className="opacity-40" />
                ) : (
                    <div className="w-3.5" />
                )}

                <span className="text-primary font-bold text-xs opacity-70 group-hover:opacity-100">{name}:</span>

                {!isObject ? (
                    <span className={cn("text-xs font-mono font-medium ml-1", getTypeColor(value))}>
                        {typeof value === 'string' ? `"${value}"` : String(value)}
                    </span>
                ) : (
                    <span className="text-[10px] font-black uppercase opacity-30 ml-2 tracking-widest">
                        {Array.isArray(value) ? `Array[${value.length}]` : `Object`}
                    </span>
                )}
            </div>

            <AnimatePresence>
                {isObject && isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="ml-4 border-l border-primary/10 overflow-hidden"
                    >
                        {Object.entries(value).map(([k, v]) => (
                            <TreeItem key={k} name={k} value={v} depth={depth + 1} />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default function JSONFormatter() {
    const [input, setInput] = useState('{\n  "name": "Toolzverse",\n  "version": 1.0,\n  "status": "ready",\n  "features": [\n    "Calculators",\n    "Blog",\n    "Developer Tools"\n  ]\n}');
    const [output, setOutput] = useState("");
    const [parsedData, setParsedData] = useState<any>(null);
    const [viewMode, setViewMode] = useState<'code' | 'tree'>('code');
    const [indent, setIndent] = useState<number>(2);
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);
    const [metadata, setMetadata] = useState({ size: 0, lines: 0 });
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [toast, setToast] = useState<{ show: boolean, message: string }>({ show: false, message: "" });

    useEffect(() => {
        validateAndSync();
    }, [input, indent]);

    const triggerToast = (msg: string) => {
        setToast({ show: true, message: msg });
        setTimeout(() => setToast({ show: false, message: "" }), 3000);
    };

    const validateAndSync = () => {
        try {
            if (!input.trim()) {
                setParsedData(null);
                setOutput("");
                setError("");
                return;
            }
            const parsed = JSON.parse(input);
            setParsedData(parsed);
            setOutput(JSON.stringify(parsed, null, indent));
            setError("");

            // Stats
            const blob = new Blob([input], { type: 'application/json' });
            setMetadata({
                size: blob.size,
                lines: input.split('\n').length
            });
        } catch (e: any) {
            setError(e.message);
            setParsedData(null);
        }
    };

    const handleAction = (type: 'format' | 'minify' | 'sort') => {
        if (!parsedData) return;
        let data = { ...parsedData };

        if (type === 'sort') {
            const sortObject = (obj: any): any => {
                if (Array.isArray(obj)) return obj.map(sortObject);
                if (obj !== null && typeof obj === 'object') {
                    return Object.keys(obj).sort().reduce((acc: any, key) => {
                        acc[key] = sortObject(obj[key]);
                        return acc;
                    }, {});
                }
                return obj;
            };
            data = sortObject(data);
            setParsedData(data);
            setInput(JSON.stringify(data, null, indent));
            triggerToast("Keys Sorted Alphabetically");
        } else if (type === 'minify') {
            setOutput(JSON.stringify(data));
            setViewMode('code');
            triggerToast("JSON Minified");
        } else {
            setOutput(JSON.stringify(data, null, indent));
            triggerToast("JSON Beautified");
        }
    };

    const handleDownload = () => {
        const blob = new Blob([output || input], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `toolzverse-${new Date().getTime()}.json`;
        a.click();
        triggerToast("File Download Started");
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                setInput(ev.target?.result as string);
                triggerToast("File Uploaded Successfully");
            };
            reader.readAsText(file);
        }
    };

    return (
        <CalculatorLayout
            title="Advanced JSON Beautifier"
            description="Professional grade JSON formatter with live tree view, minification, and validation."
            icon={<FileJson className="text-primary" />}
            fullWidth
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch min-h-[650px]">

                {/* Left Pane: Input */}
                <div className="lg:col-span-5 flex flex-col gap-3">
                    <div className="flex items-center justify-between px-1 h-10 mb-1">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Input Editor</label>
                        <div className="flex items-center gap-4 text-[10px] font-bold text-muted-foreground/40 text-right">
                            <span>Ln: {metadata.lines}</span>
                            <span>Size: {(metadata.size / 1024).toFixed(2)} KB</span>
                        </div>
                    </div>
                    <div className="relative flex-1 group min-h-[550px]">
                        <textarea
                            className="w-full h-full rounded-3xl glass border-primary/10 p-6 font-mono text-sm outline-none focus:border-primary/30 focus:ring-8 focus:ring-primary/5 transition-all resize-none leading-relaxed"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder='Paste your JSON here...'
                        />
                        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => fileInputRef.current?.click()} title="Upload File" className="p-2 rounded-xl bg-background/50 border hover:bg-primary/10 text-primary transition-colors">
                                <Upload size={16} />
                            </button>
                            <button onClick={() => setInput("")} title="Clear" className="p-2 rounded-xl bg-background/50 border hover:bg-destructive/10 text-destructive transition-colors">
                                <Trash2 size={16} />
                            </button>
                        </div>
                        <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept=".json" />
                    </div>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 rounded-2xl bg-destructive/5 text-destructive border border-destructive/10 text-xs font-bold leading-relaxed flex gap-3"
                        >
                            <Info size={14} className="shrink-0 mt-0.5" />
                            <span className="break-all">Syntax Error: {error}</span>
                        </motion.div>
                    )}
                </div>

                {/* Center Pane: Controls */}
                <div className="lg:col-span-2 flex flex-col items-center pt-14 lg:pt-14">
                    <div className="space-y-6 glass rounded-[2.5rem] p-6 border-dashed border-primary/20 sticky top-24 w-full">
                        <div className="space-y-3">
                            <p className="text-[10px] font-black text-center uppercase tracking-widest text-primary/40">Transform</p>
                            <div className="grid grid-cols-1 gap-2">
                                <button onClick={() => handleAction('format')} className="w-full h-11 rounded-xl premium-gradient text-white font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/20 transition-all">
                                    <AlignLeft size={16} /> Beautify
                                </button>
                                <button onClick={() => handleAction('minify')} className="w-full h-11 rounded-xl bg-secondary/50 border font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-primary/5 transition-all text-muted-foreground hover:text-primary">
                                    <Maximize2 size={16} /> Minify
                                </button>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <p className="text-[10px] font-black text-center uppercase tracking-widest text-primary/40">Optimization</p>
                            <div className="grid grid-cols-1 gap-2">
                                <button onClick={() => handleAction('sort')} className="w-full h-11 rounded-xl bg-secondary/50 border font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-primary/5 transition-all text-muted-foreground hover:text-primary">
                                    <SortAsc size={14} /> Sort Keys
                                </button>
                                <button onClick={handleDownload} className="w-full h-11 rounded-xl bg-secondary/50 border font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-primary/5 transition-all text-muted-foreground hover:text-primary">
                                    <Download size={14} /> Save File
                                </button>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <p className="text-[10px] font-black text-center uppercase tracking-widest text-primary/40">Source</p>
                            <div className="grid grid-cols-1 gap-2">
                                <button onClick={() => fileInputRef.current?.click()} className="w-full h-10 rounded-xl bg-secondary/50 border font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-primary/5 transition-all text-muted-foreground hover:text-primary">
                                    <Upload size={14} /> Upload File
                                </button>
                                <button onClick={() => {
                                    const url = prompt("Enter JSON URL:");
                                    if (url) {
                                        fetch(url).then(res => res.text()).then(setInput).catch(err => setError(err.message));
                                    }
                                }} className="w-full h-10 rounded-xl bg-secondary/50 border font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-primary/5 transition-all text-muted-foreground hover:text-primary">
                                    <Globe size={14} /> Load from URL
                                </button>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <p className="text-[10px] font-black text-center uppercase tracking-widest text-primary/40">Settings</p>
                            <div className="relative">
                                <select
                                    value={indent}
                                    onChange={(e) => setIndent(Number(e.target.value))}
                                    className="w-full h-11 rounded-xl bg-background border px-4 pr-10 text-[11px] font-black uppercase tracking-wider outline-none focus:border-primary transition-all appearance-none"
                                >
                                    <option value={2}>2 Tab Space</option>
                                    <option value={4}>4 Tab Space</option>
                                    <option value={0}>No Indent</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-30" size={14} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Pane: Output */}
                <div className="lg:col-span-5 flex flex-col gap-3">
                    <div className="flex items-center justify-between px-1 h-10 mb-1">
                        <div className="flex p-0.5 rounded-xl bg-secondary/30 border border-primary/5">
                            <button
                                onClick={() => setViewMode('code')}
                                className={cn("px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all", viewMode === 'code' ? "bg-background shadow-sm text-primary" : "text-muted-foreground/60")}
                            >
                                Code View
                            </button>
                            <button
                                onClick={() => setViewMode('tree')}
                                className={cn("px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all", viewMode === 'tree' ? "bg-background shadow-sm text-primary" : "text-muted-foreground/60")}
                            >
                                Tree Viewer
                            </button>
                        </div>
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(output);
                                setCopied(true);
                                triggerToast("Copied to Clipboard");
                                setTimeout(() => setCopied(false), 2000);
                            }}
                            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary hover:opacity-70 transition-opacity"
                        >
                            {copied ? <Check size={14} /> : <Copy size={16} />}
                            {copied ? "Copied" : "Copy Result"}
                        </button>
                    </div>

                    <div className="flex-1 rounded-[2.5rem] glass border-primary/10 overflow-hidden relative min-h-[550px]">
                        <AnimatePresence mode="wait">
                            {viewMode === 'code' ? (
                                <motion.pre
                                    key="code"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="w-full h-full p-6 font-mono text-[13px] leading-relaxed overflow-auto"
                                >
                                    <code className="text-primary/90">{output || '// Result will appear here...'}</code>
                                </motion.pre>
                            ) : (
                                <motion.div
                                    key="tree"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="w-full h-full p-8 overflow-auto"
                                >
                                    {parsedData ? (
                                        <TreeItem name="Root" value={parsedData} />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                                            <Info className="text-muted-foreground/20" size={48} />
                                            <p className="text-xs font-bold text-muted-foreground/40 italic">Please provide valid JSON to see the tree view</p>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/2 rounded-full blur-3xl -z-10" />
                    </div>
                </div>

            </div>

            {/* Bottom Info Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
                {[
                    { title: "Smart Sorter", text: "Automatically reorder keys alphabetically to help visualize structural differences.", icon: <SortAsc className="text-primary" /> },
                    { title: "Live Validation", text: "Instant syntax checking with descriptive error pointers and line numbers.", icon: <Check className="text-green-500" /> },
                    { title: "Privacy First", text: "All processing happens locally. Your JSON data never leaves your browser sandbox.", icon: <ShieldCheck className="text-lime-500" /> }
                ].map((feature) => (
                    <div key={feature.title} className="p-8 rounded-[2rem] glass border shadow-sm group hover:border-primary/20 transition-all">
                        <div className="mb-4">{feature.icon}</div>
                        <h4 className="font-black text-sm mb-2">{feature.title}</h4>
                        <p className="text-xs text-muted-foreground font-medium leading-relaxed opacity-70">{feature.text}</p>
                    </div>
                ))}
            </div>

            {/* Toast Notification */}
            <AnimatePresence>
                {toast.show && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100]"
                    >
                        <div className="px-6 py-3 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 text-white text-xs font-black uppercase tracking-widest shadow-2xl flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            {toast.message}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </CalculatorLayout>
    );
}


