"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/ui/ToolLayout";
import { InputField } from "@/components/ui/CalculatorUI";
import { Share2, Code, Copy, Check, Info, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function OpenGraphGenerator() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [type, setType] = useState("website");
    const [siteName, setSiteName] = useState("");
    const [copied, setCopied] = useState(false);

    const generateTags = () => {
        const tags = [];

        // Open Graph Base
        if (title) tags.push(`<meta property="og:title" content="${title}" />`);
        if (description) tags.push(`<meta property="og:description" content="${description}" />`);
        if (url) tags.push(`<meta property="og:url" content="${url}" />`);
        if (imageUrl) tags.push(`<meta property="og:image" content="${imageUrl}" />`);
        tags.push(`<meta property="og:type" content="${type}" />`);
        if (siteName) tags.push(`<meta property="og:site_name" content="${siteName}" />`);

        // Twitter Cards (often share identical values with OG)
        tags.push(`\n<!-- Twitter Card Tags -->`);
        tags.push(`<meta name="twitter:card" content="summary_large_image" />`);
        if (title) tags.push(`<meta name="twitter:title" content="${title}" />`);
        if (description) tags.push(`<meta name="twitter:description" content="${description}" />`);
        if (imageUrl) tags.push(`<meta name="twitter:image" content="${imageUrl}" />`);

        return tags.join("\n");
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generateTags());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const displayTitle = title || "Your Page Title Greatly Displayed Here";
    const displayDesc = description || "This is a brief description of what your page is about. Ensure it appeals to users and accurately summarizes the content.";
    const displayDomain = url ? new URL(url.startsWith('http') ? url : `https://${url}`).hostname.replace('www.', '') : "example.com";

    return (
        <ToolLayout
            title="Open Graph Generator"
            description="Generate Open Graph and Twitter Card tags to ensure your links look perfect when shared on social media."
            category="SEO Tools"
            categoryHref="/seo-tools"
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Side: Form */}
                <div className="lg:col-span-12 xl:col-span-6 space-y-6">
                    <div className="glass p-8 rounded-[2.5rem] space-y-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-primary/10 rounded-xl text-primary">
                                <Share2 className="w-5 h-5" />
                            </div>
                            <h3 className="text-sm font-black uppercase tracking-widest">Open Graph Properties</h3>
                        </div>

                        <div className="space-y-4">
                            <InputField
                                label="OG Title"
                                id="title"
                                type="text"
                                value={title}
                                onChange={setTitle}
                                placeholder="The title of your article or page"
                            />

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">OG Description</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="A concise summary of the page's content"
                                    className="w-full flex min-h-[100px] resize-none rounded-2xl border border-input bg-transparent px-4 py-3 text-sm font-medium shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                />
                            </div>

                            <InputField
                                label="OG URL"
                                id="url"
                                type="url"
                                value={url}
                                onChange={setUrl}
                                placeholder="https://example.com/page-path"
                            />

                            <InputField
                                label="OG Image URL"
                                id="imageUrl"
                                type="url"
                                value={imageUrl}
                                onChange={setImageUrl}
                                placeholder="https://example.com/image.jpg (Use URL of image)"
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <InputField
                                    label="Site Name"
                                    id="siteName"
                                    type="text"
                                    value={siteName}
                                    onChange={setSiteName}
                                    placeholder="e.g. Toolzverse"
                                />
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">OG Type</label>
                                    <select
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                        className="h-14 w-full rounded-2xl border bg-transparent px-4 py-2 text-sm font-medium shadow-sm outline-none bg-background"
                                    >
                                        <option value="website">Website</option>
                                        <option value="article">Article</option>
                                        <option value="profile">Profile</option>
                                        <option value="video.other">Video</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Preview & Output */}
                <div className="lg:col-span-12 xl:col-span-6 space-y-6">
                    {/* Live Preview */}
                    <div className="glass p-8 rounded-[2.5rem] space-y-6 border-primary/10">
                        <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground">Facebook/LinkedIn Preview</h3>
                        </div>

                        <div className="border border-border rounded-xl overflow-hidden bg-background shadow-md max-w-[500px] mx-auto transition-all">
                            <div className="w-full aspect-[1.91/1] bg-muted flex items-center justify-center border-b overflow-hidden relative group">
                                {imageUrl ? (
                                    <img src={imageUrl} alt="OG Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
                                ) : (
                                    <ImageIcon className="w-12 h-12 text-muted-foreground/30 group-hover:scale-110 transition-transform" />
                                )}
                            </div>
                            <div className="p-4 bg-muted/30">
                                <p className="text-[11px] uppercase tracking-widest text-muted-foreground truncate mb-1">
                                    {displayDomain.toUpperCase()}
                                </p>
                                <h4 className="font-bold text-base leading-tight truncate mb-1 text-foreground">
                                    {displayTitle}
                                </h4>
                                <p className="text-sm text-muted-foreground line-clamp-1 leading-snug">
                                    {displayDesc}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* HTML Output */}
                    <div className="glass p-8 rounded-[2.5rem] space-y-4 border-primary/10 relative">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-secondary rounded-xl text-foreground border">
                                    <Code className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-black uppercase tracking-widest">HTML Tags</h3>
                                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Paste inside {"<head>"}</p>
                                </div>
                            </div>
                            <button
                                onClick={handleCopy}
                                className="h-10 px-4 rounded-xl bg-primary/10 text-primary font-bold uppercase tracking-widest text-[10px] flex items-center gap-2 hover:bg-primary hover:text-white transition-all"
                            >
                                {copied ? <Check size={14} /> : <Copy size={14} />}
                                {copied ? "Copied" : "Copy Tags"}
                            </button>
                        </div>

                        <div className="bg-[#0D1117] rounded-2xl p-6 overflow-x-auto border border-white/10 scrollbar-custom max-h-[300px]">
                            <pre className="text-xs font-medium text-teal-400 font-mono leading-loose">
                                {generateTags()}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
