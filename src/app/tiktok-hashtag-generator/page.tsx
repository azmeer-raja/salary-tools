"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/ui/ToolLayout";
import { InputField } from "@/components/ui/CalculatorUI";
import { Copy, Check, Sparkles, Hash } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Simulated TikTok trending tags
const tiktokTrends = [
    "#fyp", "#foryou", "#foryoupage", "#viral", "#tiktok", "#trending",
    "#comedy", "#funny", "#memes", "#duet", "#dance", "#music",
    "#fashion", "#style", "#beauty", "#makeup",
    "#learnontiktok", "#howto", "#tips", "#education",
    "#food", "#foodie", "#recipe",
    "#gaming", "#gamer", "#fortnite", "#minecraft"
];

const clusters: Record<string, string[]> = {
    comedy: ["#comedy", "#funny", "#memes", "#jokes", "#laugh", "#prank", "#humor"],
    dance: ["#dance", "#dancer", "#choreography", "#dancetutorial", "#dancetrend"],
    beauty: ["#makeup", "#beauty", "#makeuptutorial", "#glowup", "#skincare", "#cosmetics"],
    education: ["#learnontiktok", "#edutok", "#knowledge", "#funfacts", "#didyouknow"],
    gaming: ["#gaming", "#gamer", "#esports", "#streamer", "#gameplay", "#videogames"]
};

export default function TikTokHashtagGenerator() {
    const [keyword, setKeyword] = useState("");
    const [generatedTags, setGeneratedTags] = useState<string[]>([]);
    const [copiedContent, setCopiedContent] = useState<"all" | null>(null);

    const generateHashtags = () => {
        if (!keyword.trim()) return;

        const kw = keyword.toLowerCase().trim();
        const results = new Set<string>();

        // Base TikTok tags that everyone uses for reach
        results.add("#fyp");
        results.add("#foryou");
        results.add("#trending");

        // Topic specific
        if (kw && !kw.includes(" ")) {
            results.add(`#${kw.replace(/#/g, '')}`);
        }

        for (const [category, tags] of Object.entries(clusters)) {
            if (kw.includes(category) || category.includes(kw) || tags.some(t => t.includes(kw))) {
                tags.forEach(t => results.add(t));
            }
        }

        // Add some random viral tags to mix
        const randomViral = [...tiktokTrends].sort(() => 0.5 - Math.random()).slice(0, 3);
        randomViral.forEach(t => results.add(t));

        setGeneratedTags(Array.from(results).slice(0, 15)); // TikTok usually uses fewer tags than IG
    };

    const copyTags = () => {
        navigator.clipboard.writeText(generatedTags.join(" "));
        setCopiedContent("all");
        setTimeout(() => setCopiedContent(null), 2000);
    };

    return (
        <ToolLayout
            title="TikTok Hashtag Generator"
            description="Find viral and trending TikTok hashtags for your niche to hit the FYP and increase views."
            category="Social Media Tools"
            categoryHref="/social-media-tools"
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Side */}
                <div className="lg:col-span-12 xl:col-span-5 space-y-6">
                    <div className="glass p-8 rounded-[2.5rem] space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-3 bg-[#00f2fe]/10 rounded-xl text-[#00f2fe] drop-shadow-md">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-black dark:text-white drop-shadow-[2px_2px_0_#fe0050] dark:drop-shadow-[2px_2px_0_#fe0050]">
                                    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.97-1.587 4.965 4.965 0 0 1-1.45-3.099H9.418v11.751a3.63 3.63 0 1 1-3.63-3.63c.404 0 .79.066 1.15.192V6.023a7.51 7.51 0 1 0 7.23 7.241v-3.834a8.627 8.627 0 0 0 5.421 1.944V6.686z" />
                                </svg>
                            </div>
                            <h3 className="text-sm font-black uppercase tracking-widest">Video Niche</h3>
                        </div>

                        <div className="space-y-4">
                            <InputField
                                label="What's your video about?"
                                id="keyword"
                                type="text"
                                value={keyword}
                                onChange={setKeyword}
                                placeholder="e.g. Dance, Comedy, Makeup"
                            />

                            <button
                                onClick={generateHashtags}
                                disabled={!keyword.trim()}
                                className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#00f2fe] to-[#fe0050] text-white font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all outline outline-2 outline-offset-2 outline-transparent hover:outline-[#00f2fe]/50 disabled:opacity-50"
                            >
                                <Sparkles size={18} />
                                Get Viral Tags
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Side */}
                <div className="lg:col-span-12 xl:col-span-7 space-y-6">
                    <div className="glass p-8 rounded-[2.5rem] space-y-6 border-[#00f2fe]/20 min-h-[400px]">
                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between border-b pb-4">
                            <h3 className="text-sm font-black uppercase tracking-widest">Trending FYP Tags</h3>

                            {generatedTags.length > 0 && (
                                <button
                                    onClick={copyTags}
                                    className="px-5 py-2.5 rounded-xl bg-[#fe0050]/10 text-[#fe0050] border border-[#fe0050]/20 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-[#fe0050] hover:text-white transition-colors"
                                >
                                    {copiedContent === "all" ? <Check size={14} /> : <Copy size={14} />}
                                    Copy All For TikTok
                                </button>
                            )}
                        </div>

                        <div className="flex flex-wrap gap-2 text-sm pt-2">
                            {generatedTags.length > 0 ? (
                                <AnimatePresence>
                                    {generatedTags.map((tag, i) => (
                                        <motion.span
                                            key={tag}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="px-4 py-2 rounded-full bg-background border-2 border-transparent shadow-sm font-bold text-[#fe0050] hover:border-[#00f2fe] cursor-pointer transition-colors flex items-center gap-1"
                                            onClick={() => {
                                                navigator.clipboard.writeText(tag);
                                            }}
                                        >
                                            {tag}
                                        </motion.span>
                                    ))}
                                </AnimatePresence>
                            ) : (
                                <div className="w-full flex flex-col justify-center items-center py-16 opacity-40">
                                    <Hash size={32} className="mb-4 text-[#00f2fe]" />
                                    <p className="text-xs font-bold uppercase tracking-widest italic">Enter a niche to generate tags</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
