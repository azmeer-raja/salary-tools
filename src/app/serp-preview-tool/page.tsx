"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/ui/ToolLayout";
import { InputField } from "@/components/ui/CalculatorUI";
import { Search, Monitor, Smartphone, AlertTriangle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SERPPreviewTool() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");
    const [date, setDate] = useState("");
    const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");

    // Google limits are approximately 600px for title (roughly 55-60 chars) and 960px for description (roughly 155-160 chars)
    const titleStatus = title.length > 60 ? "too_long" : title.length > 0 && title.length < 30 ? "too_short" : title.length === 0 ? "empty" : "good";
    const descStatus = description.length > 160 ? "too_long" : description.length > 0 && description.length < 70 ? "too_short" : description.length === 0 ? "empty" : "good";

    const displayTitle = title || "Example Domain - Your Title Goes Here - Best Site";
    // Limit to approximate pixel widths essentially by string length for this emulation
    const truncatedTitle = displayTitle.length > 65 ? displayTitle.substring(0, 65) + "..." : displayTitle;

    const displayDesc = description || "This is an example of what a meta description looks like in Google's search results. It provides a brief summary of a web page.";
    const truncatedDesc = displayDesc.length > 160 ? displayDesc.substring(0, 157) + "..." : displayDesc;

    const displayUrl = url ? new URL(url.startsWith('http') ? url : `https://${url}`).hostname.replace('www.', '') : "example.com";
    const fullDisplayUrl = url || "https://www.example.com/category/page";

    return (
        <ToolLayout
            title="SERP Preview Tool"
            description="Preview how your web page will look in Google Search Results. Optimize your Title and Meta Description for better Click-Through Rates (CTR)."
            category="SEO Tools"
            categoryHref="/seo-tools"
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Side: Inputs */}
                <div className="lg:col-span-12 xl:col-span-5 space-y-6">
                    <div className="glass p-8 rounded-[2.5rem] space-y-6 border-primary/10">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-3 bg-primary/10 rounded-xl text-primary">
                                <Search className="w-5 h-5" />
                            </div>
                            <h3 className="text-sm font-black uppercase tracking-widest">Page Metadata</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="relative">
                                <InputField
                                    label="SEO Title"
                                    id="title"
                                    type="text"
                                    value={title}
                                    onChange={setTitle}
                                    placeholder="Enter page title"
                                />
                                <div className="absolute top-0 right-1 flex items-center gap-2 mt-2">
                                    {titleStatus === "too_long" && <AlertTriangle size={12} className="text-destructive" />}
                                    <span className={cn(
                                        "text-[10px] font-black uppercase tracking-widest",
                                        titleStatus === "too_long" ? "text-destructive" :
                                            titleStatus === "too_short" ? "text-yellow-500" : "text-green-500"
                                    )}>
                                        {title.length}/60
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                                        Meta Description
                                    </label>
                                    <div className="flex items-center gap-2 mr-1">
                                        {descStatus === "too_long" && <AlertTriangle size={12} className="text-destructive" />}
                                        <span className={cn(
                                            "text-[10px] font-black uppercase tracking-widest",
                                            descStatus === "too_long" ? "text-destructive" :
                                                descStatus === "too_short" ? "text-yellow-500" : "text-green-500"
                                        )}>
                                            {description.length}/160
                                        </span>
                                    </div>
                                </div>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Enter concise meta description..."
                                    className={cn(
                                        "w-full flex min-h-[120px] resize-none rounded-2xl border bg-transparent px-4 py-3 text-sm font-medium shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring scrollbar-custom",
                                        descStatus === "too_long" ? "border-destructive/50 focus-visible:ring-destructive" : "border-input"
                                    )}
                                />
                            </div>

                            <InputField
                                label="Page URL"
                                id="url"
                                type="url"
                                value={url}
                                onChange={setUrl}
                                placeholder="https://example.com/page-path"
                            />

                            <InputField
                                label="Date (Optional Publish Date)"
                                id="date"
                                type="text"
                                value={date}
                                onChange={setDate}
                                placeholder="e.g. Mar 4, 2026"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Side: Preview */}
                <div className="lg:col-span-12 xl:col-span-7 space-y-6">
                    <div className="glass p-8 rounded-[2.5rem] space-y-6 flex flex-col h-full min-h-[500px] border-primary/10">
                        <div className="flex items-center justify-between pb-4 border-b">
                            <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground">Live SERP Preview</h3>

                            {/* Device Toggle */}
                            <div className="flex bg-background/50 border rounded-xl p-1">
                                <button
                                    onClick={() => setViewMode("desktop")}
                                    className={cn(
                                        "flex items-center gap-2 px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all",
                                        viewMode === "desktop" ? "bg-primary text-white shadow-md" : "text-muted-foreground hover:bg-muted"
                                    )}
                                >
                                    <Monitor size={14} /> Desktop
                                </button>
                                <button
                                    onClick={() => setViewMode("mobile")}
                                    className={cn(
                                        "flex items-center gap-2 px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all",
                                        viewMode === "mobile" ? "bg-primary text-white shadow-md" : "text-muted-foreground hover:bg-muted"
                                    )}
                                >
                                    <Smartphone size={14} /> Mobile
                                </button>
                            </div>
                        </div>

                        {/* Google Search Result Emulation Container */}
                        <div className="flex-grow flex items-center justify-center bg-white dark:bg-[#202124] rounded-2xl border border-border/50 p-6 md:p-10 shadow-inner">

                            {viewMode === "desktop" ? (
                                /* DESKTOP VIEW */
                                <div className="w-full max-w-[600px] font-sans">
                                    <div className="flex items-center gap-3 mb-1">
                                        <div className="w-7 h-7 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center overflow-hidden shrink-0 outline outline-1 outline-gray-300 dark:outline-gray-600">
                                            <Search size={14} className="text-gray-400" />
                                        </div>
                                        <div>
                                            <span className="text-[#202124] dark:text-[#dadce0] text-sm block leading-tight">{displayUrl}</span>
                                            <span className="text-[#4d5156] dark:text-[#bdc1c6] text-[12px] block leading-tight">{fullDisplayUrl}</span>
                                        </div>
                                    </div>
                                    <a href="#" className="inline-block text-[#1a0dab] dark:text-[#8ab4f8] text-xl font-normal hover:underline leading-tight mb-1">
                                        {truncatedTitle}
                                    </a>
                                    <div className="text-[#4d5156] dark:text-[#bdc1c6] text-[14px] leading-snug">
                                        {date && <span className="text-[#70757a] dark:text-[#9aa0a6] mr-1">{date} —</span>}
                                        {truncatedDesc}
                                    </div>
                                </div>
                            ) : (
                                /* MOBILE VIEW */
                                <div className="w-full max-w-[375px] mx-auto font-sans shadow-xl border border-gray-200 dark:border-gray-800 rounded-3xl p-4 bg-white dark:bg-[#202124] relative overflow-hidden">
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-200 dark:bg-[#171717] rounded-b-2xl" />

                                    <div className="mt-6">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center shrink-0">
                                                <Search size={12} className="text-gray-400" />
                                            </div>
                                            <div className="overflow-hidden">
                                                <span className="text-[#202124] dark:text-[#dadce0] text-[12px] block truncate">{displayUrl}</span>
                                                <span className="text-[#5f6368] dark:text-[#9aa0a6] text-[12px] block truncate">{fullDisplayUrl}</span>
                                            </div>
                                        </div>
                                        <a href="#" className="block text-[#1558d6] dark:text-[#8ab4f8] text-[20px] font-normal leading-tight mb-2">
                                            {truncatedTitle}
                                        </a>
                                        <div className="text-[#4d5156] dark:text-[#bdc1c6] text-[14px] leading-snug space-wrap">
                                            {date && <span className="text-[#70757a] dark:text-[#9aa0a6] mr-1">{date} —</span>}
                                            {truncatedDesc}
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>

                        {/* Status Hints */}
                        <div className="flex gap-4 p-4 rounded-xl bg-background/50 border border-border">
                            <Info className="w-5 h-5 text-primary shrink-0" />
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Google dynamically changes SERPs based on the user's query and device. Keep your titles under ~60 characters and descriptions under ~160 characters to minimize truncation.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
