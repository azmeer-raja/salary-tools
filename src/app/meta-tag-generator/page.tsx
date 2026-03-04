"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/ui/ToolLayout";
import { InputField } from "@/components/ui/CalculatorUI";
import { Code, Copy, Check, Info, Settings, Tag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function MetaTagGenerator() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [keywords, setKeywords] = useState("");
    const [author, setAuthor] = useState("");
    const [robotsIndex, setRobotsIndex] = useState("index");
    const [robotsFollow, setRobotsFollow] = useState("follow");
    const [language, setLanguage] = useState("English");
    const [copied, setCopied] = useState(false);

    const generateMetaTags = () => {
        const tags = [];

        // Primary Meta Tags
        if (title) tags.push(`<title>${title}</title>`);
        if (description) tags.push(`<meta name="description" content="${description}">`);
        if (keywords) tags.push(`<meta name="keywords" content="${keywords}">`);
        if (author) tags.push(`<meta name="author" content="${author}">`);

        // Robots
        tags.push(`<meta name="robots" content="${robotsIndex}, ${robotsFollow}">`);

        // Language
        if (language) tags.push(`<meta name="language" content="${language}">`);

        // Default essential tags
        tags.push(`<meta name="viewport" content="width=device-width, initial-scale=1.0">`);
        tags.push(`<meta charset="UTF-8">`);

        return tags.join("\n");
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generateMetaTags());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <ToolLayout
            title="Meta Tag Generator"
            description="Create optimized HTML meta tags for your website to improve SEO and search engine visibility."
            category="SEO Tools"
            categoryHref="/seo-tools"
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Side: Inputs */}
                <div className="lg:col-span-12 xl:col-span-6 space-y-6">
                    <div className="glass p-8 rounded-[2.5rem] space-y-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-primary/10 rounded-xl text-primary">
                                <Settings className="w-5 h-5" />
                            </div>
                            <h3 className="text-sm font-black uppercase tracking-widest">Tag Configuration</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="relative">
                                <InputField
                                    label="Site Title (Recommended < 60 chars)"
                                    id="title"
                                    type="text"
                                    value={title}
                                    onChange={setTitle}
                                    placeholder="e.g. Toolzverse - Free Online Calculators"
                                />
                                <span className={cn(
                                    "absolute top-0 right-1 text-[10px] font-black uppercase tracking-widest mt-2",
                                    title.length > 60 ? "text-destructive" : "text-muted-foreground"
                                )}>
                                    {title.length}/60
                                </span>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <label htmlFor="desc" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                                        Site Description (Recommended 150-160 chars)
                                    </label>
                                    <span className={cn(
                                        "text-[10px] font-black uppercase tracking-widest mr-1",
                                        description.length > 160 ? "text-destructive" : "text-muted-foreground"
                                    )}>
                                        {description.length}/160
                                    </span>
                                </div>
                                <textarea
                                    id="desc"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Describe your page content clearly here..."
                                    className="w-full flex min-h-[100px] resize-none rounded-2xl border border-input bg-transparent px-4 py-3 text-sm font-medium shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                />
                            </div>

                            <div className="relative">
                                <InputField
                                    label="Site Keywords (Comma separated)"
                                    id="keywords"
                                    type="text"
                                    value={keywords}
                                    onChange={setKeywords}
                                    placeholder="calculator, tools, utility..."
                                />
                            </div>

                            <InputField
                                label="Author"
                                id="author"
                                type="text"
                                value={author}
                                onChange={setAuthor}
                                placeholder="e.g. John Doe"
                            />

                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Robots Index</label>
                                    <select
                                        value={robotsIndex}
                                        onChange={(e) => setRobotsIndex(e.target.value)}
                                        className="h-14 w-full rounded-2xl border bg-transparent px-4 py-2 text-sm font-medium shadow-sm"
                                    >
                                        <option value="index">Index (Allow search engines)</option>
                                        <option value="noindex">Noindex (Hide from search)</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Robots Follow</label>
                                    <select
                                        value={robotsFollow}
                                        onChange={(e) => setRobotsFollow(e.target.value)}
                                        className="h-14 w-full rounded-2xl border bg-transparent px-4 py-2 text-sm font-medium shadow-sm"
                                    >
                                        <option value="follow">Follow (Follow links)</option>
                                        <option value="nofollow">Nofollow (Ignore links)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Output */}
                <div className="lg:col-span-12 xl:col-span-6 space-y-6">
                    <div className="glass p-8 rounded-[2.5rem] space-y-6 sticky top-28 border-primary/10 relative overflow-hidden h-full min-h-[500px] flex flex-col">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

                        <div className="flex items-center justify-between mb-2 relative z-10">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-secondary rounded-xl text-foreground border">
                                    <Code className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-black uppercase tracking-widest">Generated HTML</h3>
                                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Paste inside {"<head>"} tag</p>
                                </div>
                            </div>
                            <button
                                onClick={handleCopy}
                                className="h-12 px-6 rounded-xl bg-primary text-primary-foreground font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-primary/20"
                            >
                                {copied ? <Check size={16} /> : <Copy size={16} />}
                                {copied ? "Copied" : "Copy Tags"}
                            </button>
                        </div>

                        <div className="flex-grow bg-[#0D1117] rounded-2xl p-6 overflow-x-auto relative z-10 border border-white/10 scrollbar-custom">
                            <pre className="text-sm font-medium text-green-400 font-mono leading-loose">
                                {generateMetaTags()}
                            </pre>
                        </div>

                        {!title && !description && (
                            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-background/40 backdrop-blur-sm rounded-[2.5rem]">
                                <Tag className="w-12 h-12 text-primary/20 mb-4" />
                                <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Start filling the form</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
