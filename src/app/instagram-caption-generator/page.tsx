"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/ui/ToolLayout";
import { InputField } from "@/components/ui/CalculatorUI";
import { Instagram, Sparkles, Copy, Check, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const templates = {
    Funny: [
        "I need a six-month holiday, twice a year. 🌴 #{{keyword}}",
        "Reality called, so I hung up. 📱 #{{keyword}}",
        "I put the 'Pro' in procrastinate. ✨ #{{keyword}}",
        "There's no 'we' in fries. 🍟 #{{keyword}}",
        "I'm not lazy, I'm on energy-saving mode. 🔋 #{{keyword}}"
    ],
    Inspirational: [
        "Dream big, work hard, stay focused. ✨ #{{keyword}}",
        "The best time for new beginnings is now. 🌅 #{{keyword}}",
        "Don't wait for opportunity. Create it. 🚀 #{{keyword}}",
        "Your only limit is your mind. 💭 #{{keyword}}",
        "Small steps every day lead to big results. 📈 #{{keyword}}"
    ],
    Professional: [
        "Excited to share my latest work on {{keyword}}. 💼",
        "Innovation distinguishes between a leader and a follower. 🚀 #{{keyword}}",
        "Grateful for the opportunity to work in the {{keyword}} space. 🤝",
        "Hard work and dedication always pay off. 📊 #{{keyword}}",
        "Building the future of {{keyword}}, one step at a time. ⚡"
    ],
    Travel: [
        "Catch flights, not feelings. ✈️ #{{keyword}}",
        "Wanderlust and city dust. 🌍 #{{keyword}}",
        "Life is short and the world is wide. 🗺️ #{{keyword}}",
        "Collecting moments, not things. 📸 #{{keyword}}",
        "Work, Save, Travel, Repeat. 🎒 #{{keyword}}"
    ],
    Aesthetic: [
        "Less perfection, more authenticity. ✨ #{{keyword}}",
        "Romanticizing my life. 🌸 #{{keyword}}",
        "Finding beauty in the ordinary. 🤍 #{{keyword}}",
        "Chasing sunsets and good vibes. 🌇 #{{keyword}}",
        "Living in my own little world. ☁️ #{{keyword}}"
    ]
};

export default function InstagramCaptionGenerator() {
    const [keyword, setKeyword] = useState("");
    const [tone, setTone] = useState<keyof typeof templates>("Funny");
    const [captions, setCaptions] = useState<string[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const generateCaptions = () => {
        if (!keyword.trim()) return;
        setIsGenerating(true);

        // Simulate thinking delay for UX
        setTimeout(() => {
            const kw = keyword.toLowerCase().replace(/\s+/g, ''); // format for hashtag
            const selectedTemplates = templates[tone];

            // Randomize order slightly
            const shuffled = [...selectedTemplates].sort(() => 0.5 - Math.random());

            const generated = shuffled.map(t => t.replace(/\{\{keyword\}\}/g, kw));

            setCaptions(generated);
            setIsGenerating(false);
        }, 600);
    };

    const handleCopy = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <ToolLayout
            title="Instagram Caption Generator"
            description="Generate perfect captions for your Instagram posts. Choose your tone and get creative, aesthetic, or funny caption ideas instantly."
            category="Social Media Tools"
            categoryHref="/social-media-tools"
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Side: Inputs */}
                <div className="lg:col-span-12 xl:col-span-5 space-y-6">
                    <div className="glass p-8 rounded-[2.5rem] space-y-8">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-3 bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#833AB4] rounded-xl text-white">
                                <Instagram className="w-5 h-5" />
                            </div>
                            <h3 className="text-sm font-black uppercase tracking-widest">Post Context</h3>
                        </div>

                        <div className="space-y-6">
                            <InputField
                                label="Topic / Keyword"
                                id="keyword"
                                type="text"
                                value={keyword}
                                onChange={setKeyword}
                                placeholder="e.g. Coffee, Sunset, Coding..."
                            />

                            <div className="space-y-3">
                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Select Tone</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {(Object.keys(templates) as Array<keyof typeof templates>).map((t) => (
                                        <button
                                            key={t}
                                            onClick={() => setTone(t)}
                                            className={`p-3 rounded-2xl text-xs font-bold transition-all border ${tone === t
                                                    ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20 scale-[1.02]"
                                                    : "bg-background/50 text-muted-foreground hover:bg-muted"
                                                }`}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={generateCaptions}
                                disabled={!keyword.trim() || isGenerating}
                                className="w-full h-14 rounded-2xl premium-gradient text-white font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all hover:shadow-2xl hover:shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                            >
                                {isGenerating ? <RefreshCw className="animate-spin" /> : <Sparkles size={18} />}
                                Generate Captions
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Side: Results */}
                <div className="lg:col-span-12 xl:col-span-7 space-y-6">
                    <div className="glass p-8 rounded-[2.5rem] space-y-6 min-h-[500px] border-primary/10">
                        <div className="flex items-center justify-between border-b pb-4">
                            <h3 className="text-sm font-black uppercase tracking-widest">Generated Concepts</h3>
                            <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
                                {captions.length} Options
                            </span>
                        </div>

                        <div className="space-y-4">
                            {captions.length > 0 ? (
                                <AnimatePresence>
                                    {captions.map((caption, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="p-5 rounded-2xl bg-background border shadow-sm group hover:border-primary/50 hover:shadow-md transition-all relative pr-16"
                                        >
                                            <p className="text-sm font-medium leading-relaxed">{caption}</p>

                                            <button
                                                onClick={() => handleCopy(caption, idx)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-primary/10 text-primary opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary hover:text-white"
                                            >
                                                {copiedIndex === idx ? <Check size={16} /> : <Copy size={16} />}
                                            </button>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            ) : (
                                <div className="h-[300px] flex flex-col items-center justify-center text-center opacity-40">
                                    <Sparkles className="w-12 h-12 text-primary mb-4" />
                                    <p className="text-xs font-bold uppercase tracking-widest italic">Enter a keyword and hit generate</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
