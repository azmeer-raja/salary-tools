"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/ui/ToolLayout";
import { InputField } from "@/components/ui/CalculatorUI";
import { Youtube, Sparkles, Copy, Check, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const titleTemplates = {
    "How-To": [
        "How To {{keyword}} (Step-by-Step Guide)",
        "The Ultimate Guide to {{keyword}} in 2024",
        "How I Mastered {{keyword}} in 30 Days",
        "Beginner's Guide: How to Start {{keyword}}",
        "5 Easy Steps to {{keyword}} for Beginners"
    ],
    "Clickbait": [
        "I Tried {{keyword}} so you don't have to...",
        "The TRUTH about {{keyword}} (Don't Buy Until You Watch)",
        "Why Everyone is Wrong About {{keyword}}",
        "They Lied To Us About {{keyword}}!",
        "I spent $1000 on {{keyword}} and THIS Happened 😱"
    ],
    "Educational": [
        "Everything You Need To Know About {{keyword}}",
        "The Science Behind {{keyword}} Explained",
        "{{keyword}} Explained in 5 Minutes",
        "Top 10 Facts About {{keyword}} You Didn't Know",
        "A Deep Dive Into {{keyword}}"
    ],
    "Vlog": [
        "A Day in the Life: Exploring {{keyword}}",
        "My Experience With {{keyword}} (Honest Review)",
        "Behind the Scenes: {{keyword}}",
        "We Finally Tried {{keyword}}...",
        "Vlog: A Week of {{keyword}}"
    ]
};

export default function YouTubeTitleGenerator() {
    const [keyword, setKeyword] = useState("");
    const [tone, setTone] = useState<keyof typeof titleTemplates>("How-To");
    const [titles, setTitles] = useState<string[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const generateTitles = () => {
        if (!keyword.trim()) return;
        setIsGenerating(true);

        // Simulate thinking delay
        setTimeout(() => {
            const kwCap = keyword.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
            const selectedTemplates = titleTemplates[tone];

            const shuffled = [...selectedTemplates].sort(() => 0.5 - Math.random());
            const generated = shuffled.map(t => t.replace(/\{\{keyword\}\}/gi, kwCap));

            setTitles(generated);
            setIsGenerating(false);
        }, 500);
    };

    const handleCopy = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <ToolLayout
            title="YouTube Title Generator"
            description="Generate catchy, click-worthy titles for your YouTube videos to increase your CTR and views."
            category="Social Media Tools"
            categoryHref="/social-media-tools"
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Side: Inputs */}
                <div className="lg:col-span-12 xl:col-span-5 space-y-6">
                    <div className="glass p-8 rounded-[2.5rem] space-y-8">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-3 bg-[#FF0000]/10 rounded-xl text-[#FF0000]">
                                <Youtube className="w-5 h-5 fill-current" />
                            </div>
                            <h3 className="text-sm font-black uppercase tracking-widest">Video Topic</h3>
                        </div>

                        <div className="space-y-6">
                            <InputField
                                label="Main Subject / Keyword"
                                id="keyword"
                                type="text"
                                value={keyword}
                                onChange={setKeyword}
                                placeholder="e.g. Python Programming, Weight Loss..."
                            />

                            <div className="space-y-3">
                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Video Style</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {(Object.keys(titleTemplates) as Array<keyof typeof titleTemplates>).map((t) => (
                                        <button
                                            key={t}
                                            onClick={() => setTone(t)}
                                            className={`p-3 rounded-2xl text-xs font-bold transition-all border ${tone === t
                                                    ? "bg-[#FF0000] text-white border-[#FF0000] shadow-lg shadow-[#FF0000]/20 scale-[1.02]"
                                                    : "bg-background/50 text-muted-foreground hover:bg-muted"
                                                }`}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={generateTitles}
                                disabled={!keyword.trim() || isGenerating}
                                className="w-full h-14 rounded-2xl bg-[#FF0000] text-white font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all hover:shadow-2xl hover:shadow-[#FF0000]/20 disabled:opacity-50 mt-4"
                            >
                                {isGenerating ? <RefreshCw className="animate-spin" /> : <Sparkles size={18} />}
                                Generate Titles
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Side: Results */}
                <div className="lg:col-span-12 xl:col-span-7 space-y-6">
                    <div className="glass p-8 rounded-[2.5rem] space-y-6 min-h-[500px] border-[#FF0000]/10">
                        <div className="flex items-center justify-between border-b pb-4">
                            <h3 className="text-sm font-black uppercase tracking-widest">Headline Ideas</h3>
                            <span className="text-xs font-bold uppercase tracking-widest text-[#FF0000] bg-[#FF0000]/10 px-3 py-1 rounded-full">
                                {titles.length} Results
                            </span>
                        </div>

                        <div className="space-y-4">
                            {titles.length > 0 ? (
                                <AnimatePresence>
                                    {titles.map((title, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="p-5 rounded-2xl bg-background border shadow-sm group hover:border-[#FF0000]/50 hover:shadow-md transition-all relative pr-16"
                                        >
                                            <p className="text-lg font-bold font-display leading-relaxed">{title}</p>

                                            <button
                                                onClick={() => handleCopy(title, idx)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-[#FF0000]/10 text-[#FF0000] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#FF0000] hover:text-white"
                                            >
                                                {copiedIndex === idx ? <Check size={16} /> : <Copy size={16} />}
                                            </button>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            ) : (
                                <div className="h-[300px] flex flex-col items-center justify-center text-center opacity-40">
                                    <Sparkles className="w-12 h-12 text-[#FF0000] mb-4" />
                                    <p className="text-xs font-bold uppercase tracking-widest italic">Enter a keyword to generate ideas</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
