"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import { useState, useEffect } from "react";
import { ToolLayout } from "@/components/ui/ToolLayout";
import { ResultCard } from "@/components/ui/CalculatorUI";
import { Type, AlignLeft, BarChart2, Clock, Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function WordCounter() {
    const [text, setText] = useState("");
    const [stats, setStats] = useState({
        characters: 0,
        charactersNoSpaces: 0,
        words: 0,
        sentences: 0,
        paragraphs: 0,
        readingTime: 0,
    });
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const charCount = text.length;
        const charNoSpaces = text.replace(/\s/g, "").length;
        // Count words accurately
        const wordMatch = text.match(/\b\w+\b/g);
        const wordCount = wordMatch ? wordMatch.length : 0;

        // Count sentences
        const sentenceMatch = text.match(/[^.!?]+[.!?]+(?=\s|$)/g);
        const sentenceCount = text.trim() ? (sentenceMatch ? sentenceMatch.length : 1) : 0;

        // Count paragraphs
        const paraMatch = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
        const paraCount = paraMatch.length;

        // Reading time (avg 200 words per minute)
        const readTime = wordCount > 0 ? Math.ceil(wordCount / 200) : 0;

        setStats({
            characters: charCount,
            charactersNoSpaces: charNoSpaces,
            words: wordCount,
            sentences: sentenceCount,
            paragraphs: paraCount,
            readingTime: readTime,
        });
    }, [text]);

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleClear = () => {
        setText("");
    };

    return (
        <ToolLayout
            title="Word Counter"
            description="Real-time text analysis tool. Count words, characters, sentences, and estimate reading time instantly."
            category="SEO Tools"
            categoryHref="/seo-tools"
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Side: Input Area */}
                <div className="lg:col-span-12 xl:col-span-8 flex flex-col h-full space-y-4">
                    <div className="flex items-center justify-between px-2">
                        <div className="flex items-center gap-2">
                            <Type className="w-5 h-5 text-primary" />
                            <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground">Text Editor</h3>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={handleClear}
                                className="px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-destructive/10 hover:text-destructive transition-colors"
                            >
                                Clear
                            </button>
                            <button
                                onClick={handleCopy}
                                disabled={!text}
                                className="px-4 py-2 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-primary hover:text-white transition-all flex items-center gap-2 disabled:opacity-50"
                            >
                                {copied ? <Check size={14} /> : <Copy size={14} />}
                                {copied ? "Copied" : "Copy"}
                            </button>
                        </div>
                    </div>

                    <div className="flex-grow min-h-[500px] relative glass rounded-3xl border-primary/20 overflow-hidden group focus-within:border-primary focus-within:shadow-xl focus-within:shadow-primary/10 transition-all">
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Start typing or paste your text here to begin counting..."
                            className="w-full h-full min-h-[500px] p-8 bg-transparent border-none resize-none focus:ring-0 text-base leading-relaxed placeholder:text-muted-foreground/50 scrollbar-custom"
                            spellCheck={false}
                        />
                    </div>
                </div>

                {/* Right Side: Results */}
                <div className="lg:col-span-12 xl:col-span-4 space-y-6">
                    <div className="glass p-8 rounded-3xl border-primary/10 space-y-8 sticky top-28">
                        <div>
                            <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-6 flex items-center gap-2">
                                <BarChart2 size={16} className="text-primary" /> Core Metrics
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <motion.div
                                    key={stats.words}
                                    initial={{ scale: 0.95, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="p-4 rounded-2xl bg-primary/10 border border-primary/20 flex flex-col items-center justify-center text-center space-y-1"
                                >
                                    <span className="text-3xl font-black text-primary font-display">{stats.words}</span>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary/70">Words</span>
                                </motion.div>
                                <motion.div
                                    key={stats.characters}
                                    initial={{ scale: 0.95, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="p-4 rounded-2xl glass border flex flex-col items-center justify-center text-center space-y-1"
                                >
                                    <span className="text-3xl font-black text-foreground font-display">{stats.characters}</span>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Chars</span>
                                </motion.div>
                            </div>
                        </div>

                        <div className="h-px w-full bg-border" />

                        <div className="space-y-4">
                            <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4">Detailed Breakdown</h3>

                            <div className="space-y-3">
                                <div className="flex justify-between items-center p-3 rounded-xl bg-background/50">
                                    <span className="text-xs font-bold text-muted-foreground">Characters (No spaces)</span>
                                    <span className="font-black font-display">{stats.charactersNoSpaces}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 rounded-xl bg-background/50">
                                    <span className="text-xs font-bold text-muted-foreground flex items-center gap-2"><AlignLeft size={14} /> Sentences</span>
                                    <span className="font-black font-display">{stats.sentences}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 rounded-xl bg-background/50">
                                    <span className="text-xs font-bold text-muted-foreground">Paragraphs</span>
                                    <span className="font-black font-display">{stats.paragraphs}</span>
                                </div>
                            </div>
                        </div>

                        <div className="h-px w-full bg-border" />

                        <div className="p-5 rounded-2xl premium-gradient text-white flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Clock size={20} className="opacity-80" />
                                <span className="text-xs font-black uppercase tracking-widest">Reading Time</span>
                            </div>
                            <span className="font-black font-display text-xl">{stats.readingTime} min</span>
                        </div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
