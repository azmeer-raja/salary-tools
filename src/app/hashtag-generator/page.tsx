"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/ui/ToolLayout";
import { InputField } from "@/components/ui/CalculatorUI";
import { Hash, Copy, Check, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Simulated hashtag clusters for client-side generation
const clusters: Record<string, string[]> = {
    business: ["#business", "#entrepreneur", "#success", "#mindset", "#motivation", "#marketing", "#startup", "#hustle", "#leadership"],
    fitness: ["#fitness", "#gym", "#workout", "#motivation", "#fitfam", "#health", "#bodybuilding", "#training", "#exercise"],
    travel: ["#travel", "#wanderlust", "#nature", "#photography", "#explore", "#adventure", "#vacation", "#travelgram", "#holiday"],
    food: ["#food", "#foodie", "#instafood", "#delicious", "#yummy", "#dinner", "#lunch", "#breakfast", "#foodphotography"],
    fashion: ["#fashion", "#style", "#ootd", "#beauty", "#model", "#outfit", "#shopping", "#apparel", "#streetstyle"],
    music: ["#music", "#artist", "#song", "#musician", "#producer", "#hiphop", "#rap", "#dj", "#livemusic"],
    tech: ["#tech", "#technology", "#programming", "#developer", "#coding", "#software", "#innovation", "#computerscience"],
    art: ["#art", "#drawing", "#artwork", "#painting", "#artistsoninstagram", "#illustration", "#sketch", "#creative"]
};

export default function HashtagGenerator() {
    const [keyword, setKeyword] = useState("");
    const [generatedTags, setGeneratedTags] = useState<string[]>([]);
    const [copiedContent, setCopiedContent] = useState<"all" | "random" | null>(null);

    const generateHashtags = () => {
        if (!keyword.trim()) return;

        const kw = keyword.toLowerCase().trim();
        const results = new Set<string>();

        // Always add the base keyword
        if (kw && !kw.includes(" ")) {
            results.add(`#${kw.replace(/#/g, '')}`);
        }

        // Try to match against clusters
        for (const [category, tags] of Object.entries(clusters)) {
            if (kw.includes(category) || category.includes(kw) || tags.some(t => t.includes(kw))) {
                tags.forEach(t => results.add(t));
            }
        }

        // If no matches, generate some generic appendings
        if (results.size <= 1) {
            const base = kw.replace(/#/g, '').replace(/\s+/g, '');
            const extras = ["life", "gram", "photography", "lover", "vibes", "goals", "daily", "style", "art", "world", "tips"];
            extras.forEach(ext => results.add(`#${base}${ext}`));
        }

        setGeneratedTags(Array.from(results).slice(0, 30)); // Max 30 for Instagram limit
    };

    const copyTags = (type: "all" | "random") => {
        let tagsToCopy = generatedTags;
        if (type === "random") {
            const shuffled = [...generatedTags].sort(() => 0.5 - Math.random());
            tagsToCopy = shuffled.slice(0, Math.min(10, shuffled.length));
        }

        navigator.clipboard.writeText(tagsToCopy.join(" "));
        setCopiedContent(type);
        setTimeout(() => setCopiedContent(null), 2000);
    };

    return (
        <ToolLayout
            title="Hashtag Generator"
            description="Find the perfect, trending hashtags for your social media posts to increase reach and engagement seamlessly."
            category="Social Media Tools"
            categoryHref="/social-media-tools"
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Side */}
                <div className="lg:col-span-12 xl:col-span-5 space-y-6">
                    <div className="glass p-8 rounded-[2.5rem] space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-3 bg-primary/10 rounded-xl text-primary">
                                <Hash className="w-5 h-5" />
                            </div>
                            <h3 className="text-sm font-black uppercase tracking-widest">Keyword Seed</h3>
                        </div>

                        <div className="space-y-4">
                            <InputField
                                label="Enter a keyword or topic"
                                id="keyword"
                                type="text"
                                value={keyword}
                                onChange={setKeyword}
                                placeholder="e.g. Travel, Fitness, Coding"
                            />

                            <button
                                onClick={generateHashtags}
                                disabled={!keyword.trim()}
                                className="w-full h-14 rounded-2xl premium-gradient text-white font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all hover:shadow-2xl hover:shadow-primary/20 disabled:opacity-50"
                            >
                                <Sparkles size={18} />
                                Generate Tags
                            </button>
                        </div>

                        <div className="p-4 rounded-xl bg-primary/5 text-primary text-xs font-bold leading-relaxed border border-primary/10">
                            💡 Pro Tip: Instagram allows up to 30 hashtags per post. A mix of broad and niche tags works best for organic reach.
                        </div>
                    </div>
                </div>

                {/* Right Side */}
                <div className="lg:col-span-12 xl:col-span-7 space-y-6">
                    <div className="glass p-8 rounded-[2.5rem] space-y-6 border-primary/10 min-h-[400px]">
                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between border-b pb-4">
                            <h3 className="text-sm font-black uppercase tracking-widest">Hashtag Cloud</h3>

                            {generatedTags.length > 0 && (
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => copyTags("random")}
                                        className="px-4 py-2 rounded-xl bg-background border text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-muted transition-colors"
                                    >
                                        {copiedContent === "random" ? <Check size={14} /> : <Copy size={14} />}
                                        Copy 10 Random
                                    </button>
                                    <button
                                        onClick={() => copyTags("all")}
                                        className="px-4 py-2 rounded-xl bg-primary/10 text-primary border border-primary/20 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-primary hover:text-white transition-colors"
                                    >
                                        {copiedContent === "all" ? <Check size={14} /> : <Copy size={14} />}
                                        Copy All ({generatedTags.length})
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-wrap gap-2 text-sm">
                            {generatedTags.length > 0 ? (
                                <AnimatePresence>
                                    {generatedTags.map((tag, i) => (
                                        <motion.span
                                            key={tag}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: i * 0.02 }}
                                            className="px-3 py-1.5 rounded-lg bg-background border shadow-sm font-medium hover:border-primary/50 hover:text-primary cursor-pointer transition-colors"
                                            onClick={() => {
                                                navigator.clipboard.writeText(tag);
                                                // Optional: visual feedback
                                            }}
                                        >
                                            {tag}
                                        </motion.span>
                                    ))}
                                </AnimatePresence>
                            ) : (
                                <div className="w-full flex justify-center py-20 opacity-40">
                                    <p className="text-xs font-bold uppercase tracking-widest italic flex items-center gap-2">
                                        <Hash size={16} /> Enter a seed keyword
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
