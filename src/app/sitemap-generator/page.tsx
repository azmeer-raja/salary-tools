"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/ui/ToolLayout";
import { InputField } from "@/components/ui/CalculatorUI";
import { GitMerge, Code, Copy, Check, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SitemapGenerator() {
    const [urlsInput, setUrlsInput] = useState("");
    const [changeFreq, setChangeFreq] = useState("daily");
    const [priority, setPriority] = useState("0.8");
    const [addLastMod, setAddLastMod] = useState(true);
    const [copied, setCopied] = useState(false);

    const generateSitemap = () => {
        const urls = urlsInput.split("\n").map(url => url.trim()).filter(url => url.length > 0 && url.startsWith("http"));

        if (urls.length === 0) return "";

        const currentDate = new Date().toISOString().split('T')[0];

        let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
        xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

        urls.forEach(url => {
            xml += `  <url>\n`;
            xml += `    <loc>${url}</loc>\n`;
            if (addLastMod) xml += `    <lastmod>${currentDate}</lastmod>\n`;
            if (changeFreq !== "none") xml += `    <changefreq>${changeFreq}</changefreq>\n`;
            if (priority !== "none") xml += `    <priority>${priority}</priority>\n`;
            xml += `  </url>\n`;
        });

        xml += `</urlset>`;
        return xml;
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generateSitemap());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const xmlOutput = generateSitemap();

    return (
        <ToolLayout
            title="Sitemap Generator"
            description="Quickly generate a valid sitemap.xml file from a list of URLs to submit to Google Search Console."
            category="SEO Tools"
            categoryHref="/seo-tools"
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Side: Inputs */}
                <div className="lg:col-span-12 xl:col-span-6 space-y-6">
                    <div className="glass p-8 rounded-[2.5rem] space-y-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-primary/10 rounded-xl text-primary">
                                <GitMerge className="w-5 h-5" />
                            </div>
                            <h3 className="text-sm font-black uppercase tracking-widest">Sitemap Configuration</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                                        List of URLs (One per line)
                                    </label>
                                </div>
                                <textarea
                                    value={urlsInput}
                                    onChange={(e) => setUrlsInput(e.target.value)}
                                    placeholder="https://example.com/&#10;https://example.com/about&#10;https://example.com/contact"
                                    className="w-full flex min-h-[250px] resize-none rounded-2xl border border-input bg-transparent px-4 py-3 text-sm font-medium shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring scrollbar-custom"
                                    spellCheck={false}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Change Frequency</label>
                                    <select
                                        value={changeFreq}
                                        onChange={(e) => setChangeFreq(e.target.value)}
                                        className="h-14 w-full rounded-2xl border bg-transparent px-4 py-2 text-sm font-medium shadow-sm outline-none"
                                    >
                                        <option value="none">None</option>
                                        <option value="always">Always</option>
                                        <option value="hourly">Hourly</option>
                                        <option value="daily">Daily</option>
                                        <option value="weekly">Weekly</option>
                                        <option value="monthly">Monthly</option>
                                        <option value="yearly">Yearly</option>
                                        <option value="never">Never</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Priority</label>
                                    <select
                                        value={priority}
                                        onChange={(e) => setPriority(e.target.value)}
                                        className="h-14 w-full rounded-2xl border bg-transparent px-4 py-2 text-sm font-medium shadow-sm outline-none"
                                    >
                                        <option value="none">None</option>
                                        <option value="1.0">1.0 (Highest)</option>
                                        <option value="0.9">0.9</option>
                                        <option value="0.8">0.8 (Default)</option>
                                        <option value="0.7">0.7</option>
                                        <option value="0.6">0.6</option>
                                        <option value="0.5">0.5</option>
                                        <option value="0.4">0.4</option>
                                        <option value="0.3">0.3</option>
                                        <option value="0.2">0.2</option>
                                        <option value="0.1">0.1</option>
                                        <option value="0.0">0.0 (Lowest)</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 rounded-2xl border bg-background/50 cursor-pointer hover:border-primary/50 transition-colors mt-2" onClick={() => setAddLastMod(!addLastMod)}>
                                <div className="space-y-1">
                                    <p className="text-sm font-bold">Include Last Modified</p>
                                    <p className="text-xs text-muted-foreground">Add &lt;lastmod&gt; tag with today's date</p>
                                </div>
                                <div className={cn("w-12 h-6 rounded-full transition-colors relative", addLastMod ? "bg-primary" : "bg-muted")}>
                                    <div
                                        className={cn("w-5 h-5 bg-white rounded-full absolute top-[2px] shadow-sm transition-all text-xs flex items-center justify-center font-black", addLastMod ? "left-[26px]" : "left-[2px]")}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Output */}
                <div className="lg:col-span-12 xl:col-span-6 space-y-6">
                    <div className="glass p-8 rounded-[2.5rem] space-y-6 sticky top-28 border-primary/10 h-full min-h-[500px] flex flex-col">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-secondary rounded-xl text-foreground border">
                                    <Code className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-black uppercase tracking-widest">XML Output</h3>
                                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Save as sitemap.xml</p>
                                </div>
                            </div>
                            <button
                                onClick={handleCopy}
                                disabled={!xmlOutput}
                                className="h-12 px-6 rounded-xl bg-primary text-primary-foreground font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:shadow-none"
                            >
                                {copied ? <Check size={16} /> : <Copy size={16} />}
                                {copied ? "Copied" : "Copy XML"}
                            </button>
                        </div>

                        <div className="flex-grow bg-[#0D1117] rounded-2xl p-6 overflow-auto border border-white/10 relative scrollbar-custom">
                            {xmlOutput ? (
                                <pre className="text-sm font-medium text-orange-400 font-mono leading-loose">
                                    {xmlOutput}
                                </pre>
                            ) : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center opacity-40">
                                    <Info className="w-8 h-8 text-primary mb-3" />
                                    <p className="text-xs font-bold uppercase tracking-widest italic">Enter valid URLs to see output</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
