"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/ui/ToolLayout";
import { InputField } from "@/components/ui/CalculatorUI";
import { Bot, Code, Copy, Check, Info, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

type Rule = {
    userAgent: string;
    action: "Allow" | "Disallow";
    path: string;
};

export default function RobotsTxtGenerator() {
    const [rules, setRules] = useState<Rule[]>([
        { userAgent: "*", action: "Disallow", path: "/cgi-bin/" },
        { userAgent: "*", action: "Disallow", path: "/admin/" }
    ]);
    const [sitemap, setSitemap] = useState("");
    const [crawlDelay, setCrawlDelay] = useState("");
    const [copied, setCopied] = useState(false);

    const addRule = () => {
        setRules([...rules, { userAgent: "*", action: "Disallow", path: "/" }]);
    };

    const removeRule = (index: number) => {
        setRules(rules.filter((_, i) => i !== index));
    };

    const updateRule = (index: number, field: keyof Rule, value: string) => {
        const newRules = [...rules];
        newRules[index][field] = value as any;
        setRules(newRules);
    };

    const generateRobotsTxt = () => {
        let txt = "";

        // Group rules by User-agent
        const groupedRules = rules.reduce((acc, rule) => {
            if (!acc[rule.userAgent]) acc[rule.userAgent] = [];
            acc[rule.userAgent].push(rule);
            return acc;
        }, {} as Record<string, Rule[]>);

        for (const [userAgent, uaRules] of Object.entries(groupedRules)) {
            txt += `User-agent: ${userAgent}\n`;

            if (crawlDelay && userAgent === "*") { // Usually applied to * or specific bots
                txt += `Crawl-delay: ${crawlDelay}\n`;
            }

            uaRules.forEach(rule => {
                if (rule.path) {
                    txt += `${rule.action}: ${rule.path}\n`;
                }
            });
            txt += `\n`;
        }

        if (sitemap) {
            txt += `Sitemap: ${sitemap}\n`;
        }

        return txt.trim();
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generateRobotsTxt());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <ToolLayout
            title="Robots.txt Generator"
            description="Create a robots.txt file to instruct search engine crawlers which pages or files they can or can't request from your site."
            category="SEO Tools"
            categoryHref="/seo-tools"
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Side: Inputs */}
                <div className="lg:col-span-12 xl:col-span-7 space-y-6">
                    <div className="glass p-8 rounded-[2.5rem] space-y-8">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-3 bg-primary/10 rounded-xl text-primary">
                                <Bot className="w-5 h-5" />
                            </div>
                            <h3 className="text-sm font-black uppercase tracking-widest">Crawler Rules</h3>
                        </div>

                        <div className="space-y-4">
                            <AnimatePresence>
                                {rules.map((rule, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="flex flex-col sm:flex-row gap-3 p-4 rounded-2xl bg-background/50 border shadow-sm relative group"
                                    >
                                        <div className="flex-1 space-y-1">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">User-agent</label>
                                            <input
                                                type="text"
                                                value={rule.userAgent}
                                                onChange={(e) => updateRule(idx, "userAgent", e.target.value)}
                                                placeholder="*"
                                                className="h-10 w-full rounded-xl border bg-transparent px-3 text-sm"
                                            />
                                        </div>
                                        <div className="space-y-1 w-full sm:w-32">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Directive</label>
                                            <select
                                                value={rule.action}
                                                onChange={(e) => updateRule(idx, "action", e.target.value)}
                                                className="h-10 w-full rounded-xl border bg-transparent px-3 text-sm"
                                            >
                                                <option value="Allow">Allow</option>
                                                <option value="Disallow">Disallow</option>
                                            </select>
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Path</label>
                                            <input
                                                type="text"
                                                value={rule.path}
                                                onChange={(e) => updateRule(idx, "path", e.target.value)}
                                                placeholder="/private/"
                                                className="h-10 w-full rounded-xl border bg-transparent px-3 text-sm"
                                            />
                                        </div>

                                        <button
                                            onClick={() => removeRule(idx)}
                                            className="absolute -top-2 -right-2 p-1.5 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                                        >
                                            <X size={14} />
                                        </button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            <button
                                onClick={addRule}
                                className="w-full h-12 rounded-2xl border-2 border-dashed border-primary/30 text-primary font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-primary/5 transition-colors"
                            >
                                <Plus size={16} /> Add Rule
                            </button>
                        </div>

                        <div className="h-px w-full bg-border" />

                        <div className="space-y-6 pt-2">
                            <InputField
                                label="Sitemap URL"
                                id="sitemap"
                                type="text"
                                value={sitemap}
                                onChange={setSitemap}
                                placeholder="https://example.com/sitemap.xml"
                            />

                            <InputField
                                label="Crawl-delay (seconds)"
                                id="crawlDelay"
                                type="number"
                                value={crawlDelay}
                                onChange={setCrawlDelay}
                                placeholder="e.g. 10"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Side: Output */}
                <div className="lg:col-span-12 xl:col-span-5 space-y-6">
                    <div className="glass p-8 rounded-[2.5rem] space-y-6 sticky top-28 border-primary/10 h-full min-h-[500px] flex flex-col">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-secondary rounded-xl text-foreground border">
                                    <Code className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-black uppercase tracking-widest">Output</h3>
                                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Save as robots.txt</p>
                                </div>
                            </div>
                            <button
                                onClick={handleCopy}
                                className="h-12 px-6 rounded-xl bg-primary text-primary-foreground font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-primary/20"
                            >
                                {copied ? <Check size={16} /> : <Copy size={16} />}
                                {copied ? "Copied" : "Copy "}
                            </button>
                        </div>

                        <div className="flex-grow bg-[#0D1117] rounded-2xl p-6 overflow-auto border border-white/10 relative scrollbar-custom">
                            <pre className="text-sm font-medium text-lime-400 font-mono leading-loose">
                                {generateRobotsTxt()}
                            </pre>
                            {rules.length === 0 && !sitemap && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center opacity-40 bg-[#0D1117]">
                                    <Info className="w-8 h-8 text-primary mb-3" />
                                    <p className="text-xs font-bold uppercase tracking-widest italic">Add rules to see output</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
