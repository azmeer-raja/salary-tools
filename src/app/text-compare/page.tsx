"use client";

import { useState, useMemo } from "react";
import { ToolLayout } from "@/components/ui/ToolLayout";
import { ResultCard } from "@/components/ui/CalculatorUI";
import { SplitSquareHorizontal, CheckCircle2, AlertTriangle, FileText } from "lucide-react";

export default function TextCompare() {
    const [text1, setText1] = useState("");
    const [text2, setText2] = useState("");

    const analysis = useMemo(() => {
        if (!text1.trim() || !text2.trim()) return null;

        const words1 = text1.toLowerCase().match(/\b\w+\b/g) || [];
        const words2 = text2.toLowerCase().match(/\b\w+\b/g) || [];

        if (words1.length === 0 || words2.length === 0) return null;

        const set1 = new Set(words1);
        const set2 = new Set(words2);

        let commonCount = 0;
        for (const w of set1) {
            if (set2.has(w)) commonCount++;
        }

        const totalUniqueWords = new Set([...words1, ...words2]).size;

        // Jaccard similarity coefficient for percentage
        const similarity = (commonCount / totalUniqueWords) * 100;

        return {
            similarity: similarity.toFixed(1),
            commonWords: commonCount,
            totalWords1: words1.length,
            totalWords2: words2.length,
        };
    }, [text1, text2]);

    return (
        <ToolLayout
            title="Text Compare & Plagiarism Checker"
            description="Compare two text blocks to find similarities, exact overlaps, and check for duplicate content."
            category="SEO Tools"
            categoryHref="/seo-tools"
        >
            <div className="space-y-8">
                {/* Inputs */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 px-2">
                            <FileText className="w-5 h-5 text-primary" />
                            <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground">Original Text</h3>
                        </div>
                        <div className="relative glass rounded-[2.5rem] border-primary/20 overflow-hidden focus-within:border-primary focus-within:shadow-xl focus-within:shadow-primary/10 transition-all p-2">
                            <textarea
                                value={text1}
                                onChange={(e) => setText1(e.target.value)}
                                placeholder="Paste the original content here..."
                                className="w-full min-h-[400px] p-6 bg-transparent border-none resize-none focus:ring-0 text-sm leading-relaxed placeholder:text-muted-foreground/50 scrollbar-custom"
                                spellCheck={false}
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-2 px-2">
                            <FileText className="w-5 h-5 text-secondary" />
                            <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground">Compared Text</h3>
                        </div>
                        <div className="relative glass rounded-[2.5rem] border-secondary/20 overflow-hidden focus-within:border-secondary focus-within:shadow-xl focus-within:shadow-secondary/10 transition-all p-2">
                            <textarea
                                value={text2}
                                onChange={(e) => setText2(e.target.value)}
                                placeholder="Paste the content to compare here..."
                                className="w-full min-h-[400px] p-6 bg-transparent border-none resize-none focus:ring-0 text-sm leading-relaxed placeholder:text-muted-foreground/50 scrollbar-custom"
                                spellCheck={false}
                            />
                        </div>
                    </div>
                </div>

                {/* Results Section */}
                <div className="glass p-8 rounded-[2.5rem] min-h-[200px] flex flex-col justify-center relative overflow-hidden border-primary/10">
                    {!analysis ? (
                        <div className="flex flex-col items-center justify-center text-center opacity-40 py-8">
                            <SplitSquareHorizontal className="w-12 h-12 mb-4" />
                            <p className="text-xs font-bold uppercase tracking-widest italic">Paste text in both boxes to compare</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                            <div className="text-center p-6 space-y-2 rounded-3xl bg-background/50 border">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Text 1 Words</h4>
                                <p className="text-3xl font-display font-black">{analysis.totalWords1}</p>
                            </div>

                            <div className="flex flex-col items-center justify-center space-y-4 p-8 rounded-3xl premium-gradient text-white shadow-xl shadow-primary/20 scale-105 z-10">
                                <div className="flex items-center gap-2">
                                    {parseFloat(analysis.similarity) > 50 ? (
                                        <AlertTriangle className="w-6 h-6 text-yellow-300 drop-shadow-md" />
                                    ) : (
                                        <CheckCircle2 className="w-6 h-6 text-green-300 drop-shadow-md" />
                                    )}
                                    <h4 className="text-xs font-black uppercase tracking-widest">Similarity Score</h4>
                                </div>
                                <p className="text-5xl font-display font-black tracking-tighter drop-shadow-xl">{analysis.similarity}%</p>
                                <p className="text-[10px] uppercase font-bold tracking-widest opacity-80 decoration-white mt-2">
                                    Based on exact word overlap
                                </p>
                            </div>

                            <div className="text-center p-6 space-y-2 rounded-3xl bg-background/50 border">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Text 2 Words</h4>
                                <p className="text-3xl font-display font-black">{analysis.totalWords2}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </ToolLayout>
    );
}
