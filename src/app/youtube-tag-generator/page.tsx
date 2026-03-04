"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/ui/ToolLayout";
import { InputField } from "@/components/ui/CalculatorUI";
import { Youtube, Copy, Check, Sparkles, Tag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const commonModifiers = [
    "tutorial", "guide", "how to", "2024", "review", "best", "for beginners", "explained", "tips", "tricks", "vs"
];

const topicClusters: Record<string, string[]> = {
    "gaming": ["gameplay", "walkthrough", "lets play", "pc gaming", "streamer", "highlight"],
    "tech": ["gadgets", "technology", "unboxing", "review", "software", "tech news"],
    "finance": ["investing", "crypto", "money", "personal finance", "stocks", "passive income"],
    "fitness": ["workout", "diet", "gym", "health", "muscle", "routine"],
    "coding": ["programming", "developer", "software engineering", "code", "tutorial", "web development"]
};

export default function YouTubeTagGenerator() {
    const [keyword, setKeyword] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [copied, setCopied] = useState(false);

    const generateTags = () => {
        if (!keyword.trim()) return;

        const kw = keyword.toLowerCase().trim();
        const generated = new Set<string>();

        // Exact match
        generated.add(kw);

        // Core variations
        const words = kw.split(' ');
        if (words.length > 1) {
            generated.add(words.join('')); // nospaces
        }

        // Add common modifiers
        const selectedModifiers = [...commonModifiers].sort(() => 0.5 - Math.random()).slice(0, 5);
        selectedModifiers.forEach(mod => {
            generated.add(`${kw} ${mod}`);
            generated.add(`${mod} ${kw}`);
        });

        // Add cluster specific variations if matched
        for (const [cluster, clusterTags] of Object.entries(topicClusters)) {
            if (kw.includes(cluster) || clusterTags.some(t => kw.includes(t))) {
                clusterTags.forEach(t => generated.add(`${kw} ${t}`));
                clusterTags.forEach(t => generated.add(t));
            }
        }

        // Fill up to ~15-20 tags
        setTags(Array.from(generated).slice(0, 20));
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(tags.join(", "));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const tagString = tags.join(", ");
    const charCount = tagString.length; // YT limits tags to 500 characters usually

    return (
        <ToolLayout
            title="YouTube Tag Generator"
            description="Generate high-volume, relevant SEO tags for your YouTube videos to improve rankings and discoverability in search results."
            category="Social Media Tools"
            categoryHref="/social-media-tools"
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Side: Inputs */}
                <div className="lg:col-span-12 xl:col-span-5 space-y-6">
                    <div className="glass p-8 rounded-[2.5rem] space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-3 bg-[#FF0000]/10 rounded-xl text-[#FF0000]">
                                <Youtube className="w-5 h-5 fill-current" />
                            </div>
                            <h3 className="text-sm font-black uppercase tracking-widest">Video Focus</h3>
                        </div>

                        <div className="space-y-4">
                            <InputField
                                label="Main Video Topic"
                                id="keyword"
                                type="text"
                                value={keyword}
                                onChange={setKeyword}
                                placeholder="e.g. React Tutorial, Budget Travel..."
                            />

                            <button
                                onClick={generateTags}
                                disabled={!keyword.trim()}
                                className="w-full h-14 rounded-2xl bg-[#FF0000] text-white font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all hover:shadow-2xl hover:shadow-[#FF0000]/20 disabled:opacity-50 mt-2"
                            >
                                <Sparkles size={18} />
                                Generate SEO Tags
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Side: Output */}
                <div className="lg:col-span-12 xl:col-span-7 space-y-6">
                    <div className="glass p-8 rounded-[2.5rem] space-y-6 border-[#FF0000]/10 min-h-[400px]">
                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between border-b pb-4">
                            <div className="flex items-center gap-2">
                                <h3 className="text-sm font-black uppercase tracking-widest">Generated Tags</h3>
                                {tags.length > 0 && (
                                    <span className="text-[10px] uppercase font-bold text-muted-foreground ml-2">
                                        ({charCount}/500 chars)
                                    </span>
                                )}
                            </div>

                            {tags.length > 0 && (
                                <button
                                    onClick={handleCopy}
                                    className="px-5 py-2.5 rounded-xl bg-[#FF0000]/10 text-[#FF0000] border border-[#FF0000]/20 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-[#FF0000] hover:text-white transition-colors"
                                >
                                    {copied ? <Check size={14} /> : <Copy size={14} />}
                                    {copied ? "Copied" : "Copy All Tags"}
                                </button>
                            )}
                        </div>

                        {tags.length > 0 ? (
                            <div className="space-y-4">
                                <div className="flex flex-wrap gap-2">
                                    <AnimatePresence>
                                        {tags.map((tag, i) => (
                                            <motion.span
                                                key={tag}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: i * 0.02 }}
                                                className="px-3 py-1.5 rounded-lg bg-background border flex items-center gap-2 text-sm font-medium hover:border-[#FF0000]/50 transition-colors"
                                            >
                                                <Tag size={12} className="text-muted-foreground" />
                                                {tag}
                                            </motion.span>
                                        ))}
                                    </AnimatePresence>
                                </div>

                                <div className="bg-muted/30 p-4 rounded-xl border mt-4">
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        <strong className="text-foreground">Raw comma-separated format:</strong><br />
                                        <span className="font-mono mt-1 block">{tagString}</span>
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="w-full h-full flex flex-col justify-center items-center py-20 opacity-40">
                                <Tag size={32} className="text-[#FF0000] mb-3" />
                                <p className="text-xs font-bold uppercase tracking-widest italic">Tags will appear here</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
