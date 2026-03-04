"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import { useState, useMemo } from "react";
import { ToolLayout } from "@/components/ui/ToolLayout";
import { ResultCard } from "@/components/ui/CalculatorUI";
import { FileText, Target, BarChart2, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Common stop words to optionally filter out
const stopWords = new Set(["a", "an", "the", "and", "or", "but", "is", "are", "was", "were", "in", "on", "at", "to", "for", "with", "by", "of", "it", "this", "that", "these", "those", "i", "you", "he", "she", "we", "they", "as", "be", "do", "from", "have", "not", "so"]);

export default function KeywordDensityChecker() {
    const [text, setText] = useState("");
    const [wordLengthFilter, setWordLengthFilter] = useState(1);
    const [excludeStopWords, setExcludeStopWords] = useState(false);

    const analytics = useMemo(() => {
        if (!text.trim()) return { totalWords: 0, uniqueWords: 0, keywordStats: [] };

        const rawWords: string[] = text.toLowerCase().match(/\b[\w']+\b/g) || [];
        const totalRawCount = rawWords.length;

        // Filter words based on settings
        let filteredWords = rawWords;

        if (excludeStopWords) {
            filteredWords = filteredWords.filter(w => !stopWords.has(w));
        }

        if (wordLengthFilter > 1) {
            filteredWords = filteredWords.filter(w => w.length >= wordLengthFilter);
        }

        const exactTotalWords = filteredWords.length;

        // Count frequencies
        const frequencyMap: Record<string, number> = {};
        for (const word of filteredWords) {
            frequencyMap[word] = (frequencyMap[word] || 0) + 1;
        }

        // Convert to array and sort
        const stats = Object.entries(frequencyMap)
            .map(([word, count]) => ({
                word,
                count,
                density: ((count / totalRawCount) * 100).toFixed(2)
            }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 50); // Show top 50 only

        return {
            totalOriginalWords: totalRawCount,
            totalAnalyzedWords: exactTotalWords,
            uniqueWords: Object.keys(frequencyMap).length,
            keywordStats: stats
        };
    }, [text, wordLengthFilter, excludeStopWords]);

    return (
        <ToolLayout
            title="Keyword Density Checker"
            description="Analyze your text to find the most frequently used words. Prevent keyword stuffing and optimize for SEO."
            category="SEO Tools"
            categoryHref="/seo-tools"
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Side: Input & Settings */}
                <div className="lg:col-span-12 xl:col-span-6 space-y-6">
                    <div className="flex-grow min-h-[300px] relative glass rounded-[2.5rem] border-primary/20 overflow-hidden focus-within:border-primary focus-within:shadow-xl focus-within:shadow-primary/10 transition-all p-2">
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Paste your article or content here to analyze keyword usage..."
                            className="w-full h-full min-h-[300px] p-6 bg-transparent border-none resize-none focus:ring-0 text-sm leading-relaxed placeholder:text-muted-foreground/50 scrollbar-custom"
                            spellCheck={false}
                        />
                    </div>

                    <div className="glass p-6 rounded-3xl space-y-6">
                        <div className="flex items-center gap-2 mb-2">
                            <Filter className="w-4 h-4 text-primary" />
                            <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Analysis Filters</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 rounded-2xl border bg-background/50 cursor-pointer hover:border-primary/50 transition-colors" onClick={() => setExcludeStopWords(!excludeStopWords)}>
                                <div className="space-y-1">
                                    <p className="text-sm font-bold">Ignore Stop Words</p>
                                    <p className="text-xs text-muted-foreground">Skip common words like 'the', 'and', 'is'</p>
                                </div>
                                <div className={cn("w-12 h-6 rounded-full transition-colors relative", excludeStopWords ? "bg-primary" : "bg-muted")}>
                                    <motion.div
                                        animate={{ x: excludeStopWords ? 24 : 2 }}
                                        className="w-5 h-5 bg-white rounded-full absolute top-[2px] shadow-sm"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 p-4 rounded-2xl border bg-background/50">
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-bold">Minimum Word Length</label>
                                    <span className="text-xs font-black text-primary px-3 py-1 bg-primary/10 rounded-full">{wordLengthFilter} chars</span>
                                </div>
                                <input
                                    type="range"
                                    min="1"
                                    max="10"
                                    step="1"
                                    value={wordLengthFilter}
                                    onChange={(e) => setWordLengthFilter(parseInt(e.target.value))}
                                    className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary mt-2"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Results */}
                <div className="lg:col-span-12 xl:col-span-6 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <ResultCard label="Total Words" value={(analytics?.totalOriginalWords || 0).toString()} variant="default" />
                        <ResultCard label="Unique Words" value={(analytics?.uniqueWords || 0).toString()} variant="primary" />
                    </div>

                    <div className="glass p-8 rounded-[2.5rem] space-y-6 h-[500px] flex flex-col relative border-primary/10">
                        <div className="flex items-center gap-3 pb-4 border-b">
                            <Target className="w-5 h-5 text-primary" />
                            <h3 className="text-sm font-black uppercase tracking-widest">Keyword Density</h3>
                        </div>

                        {analytics.keywordStats.length > 0 ? (
                            <div className="flex-grow overflow-y-auto pr-4 scrollbar-custom space-y-3">
                                {analytics.keywordStats.map((stat, idx) => (
                                    <motion.div
                                        key={stat.word}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.02 }}
                                        className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors group"
                                    >
                                        <div className="flex gap-4 items-center w-full">
                                            <span className="w-6 text-[10px] font-black tracking-widest text-muted-foreground opacity-50 group-hover:opacity-100">#{idx + 1}</span>
                                            <span className="text-sm font-bold truncate flex-grow text-foreground">{stat.word}</span>
                                            <div className="flex items-center gap-4">
                                                <span className="text-xs font-medium text-muted-foreground bg-background px-2 py-1 rounded-md border">{stat.count}x</span>
                                                <div className="w-16 text-right">
                                                    <span className={cn(
                                                        "text-sm font-black text-right",
                                                        parseFloat(stat.density) > 3 ? "text-destructive" : "text-primary"
                                                    )}>{stat.density}%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-center opacity-40">
                                <BarChart2 className="w-12 h-12 text-primary mb-4" />
                                <p className="text-xs font-bold uppercase tracking-widest italic">Enter text to see analysis</p>
                            </div>
                        )}

                        {/* Gradient Fade */}
                        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-background to-transparent pointer-events-none rounded-b-[2.5rem]" />
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
