"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/ui/ToolLayout";
import { InputField } from "@/components/ui/CalculatorUI";
import { Twitter, Copy, Check, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const bioTemplates = {
    Professional: [
        "{{job}} based in {{location}}. Helping companies build {{interest}} | Ex-@company | Thoughts on leadership and growth.",
        "Passionate {{job}} specializing in {{interest}} 🚀 | Over 5 years of experience driving results in {{location}}.",
        "Building the future of {{interest}} as a {{job}} ⚡. Always learning, always building. Located in {{location}}.",
        "{{job}} | {{interest}} | Helping founders scale their vision. Angel investor. From {{location}}."
    ],
    Funny: [
        "{{job}} by day, professional {{interest}} enthusiast by night 🍕. Not as smart as I sound in tweets.",
        "I'm a {{job}} so you don't have to be. Endlessly scrolling through {{interest}} takes up my time.",
        "Currently pretending to be a {{job}} 🕵️‍♂️. 90% caffeine, 10% {{interest}}.",
        "I put the 'Pro' in procrastinate. Mainly tweeting about {{interest}} and avoiding my job as a {{job}}."
    ],
    Minimalist: [
        "{{job}}. {{interest}}. {{location}}.",
        "Building things in {{location}}. Focused on {{interest}}.",
        "{{job}} exploring {{interest}} 📍 {{location}}",
        "Exploring {{interest}}. Work: {{job}}."
    ],
    Creative: [
        "Turning coffee into {{interest}} concepts ☕ | {{job}} based in the beautiful {{location}} | Let's create something magical.",
        "Storyteller, creator, {{job}}. 🎨 My canvas is {{interest}}. Let's connect if you're in {{location}}!",
        "Curating thoughts on {{interest}} ✨ | {{job}} by trade, creator by passion. Living the dream in {{location}}."
    ]
};

export default function TwitterBioGenerator() {
    const [job, setJob] = useState("");
    const [interest, setInterest] = useState("");
    const [location, setLocation] = useState("");
    const [tone, setTone] = useState<keyof typeof bioTemplates>("Professional");

    const [bios, setBios] = useState<string[]>([]);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const generateBios = () => {
        const selectedTemplates = bioTemplates[tone];

        const filled = selectedTemplates.map(template => {
            return template
                .replace(/\{\{job\}\}/g, job || "[Job]")
                .replace(/\{\{interest\}\}/g, interest || "[Interest]")
                .replace(/\{\{location\}\}/g, location || "[Location]");
        });

        setBios(filled);
    };

    const handleCopy = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <ToolLayout
            title="Twitter Bio Generator"
            description="Create the perfect Twitter (X) bio. Just input your details, pick a vibe, and let us write a description that converts profile views into followers."
            category="Social Media Tools"
            categoryHref="/social-media-tools"
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Side */}
                <div className="lg:col-span-12 xl:col-span-5 space-y-6">
                    <div className="glass p-8 rounded-[2.5rem] space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-3 bg-[#1DA1F2]/10 rounded-xl text-[#1DA1F2]">
                                <Twitter className="w-5 h-5 fill-current" />
                            </div>
                            <h3 className="text-sm font-black uppercase tracking-widest">Your Profile Details</h3>
                        </div>

                        <div className="space-y-4">
                            <InputField
                                label="Job / Profession"
                                id="job"
                                type="text"
                                value={job}
                                onChange={setJob}
                                placeholder="e.g. Software Engineer, Marketer"
                            />

                            <InputField
                                label="Core Interest / Niche"
                                id="interest"
                                type="text"
                                value={interest}
                                onChange={setInterest}
                                placeholder="e.g. AI, Startups, Crypto"
                            />

                            <InputField
                                label="Location"
                                id="location"
                                type="text"
                                value={location}
                                onChange={setLocation}
                                placeholder="e.g. San Francisco, Remote"
                            />

                            <div className="space-y-3 pt-4">
                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Bio Vibe</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {(Object.keys(bioTemplates) as Array<keyof typeof bioTemplates>).map((t) => (
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
                                onClick={generateBios}
                                className="w-full h-14 rounded-2xl bg-[#1DA1F2] text-white font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all hover:shadow-2xl hover:shadow-[#1DA1F2]/20 mt-4"
                            >
                                <Sparkles size={18} />
                                Generate Bios
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Side: Output */}
                <div className="lg:col-span-12 xl:col-span-7 space-y-6">
                    <div className="glass p-8 rounded-[2.5rem] space-y-6 min-h-[500px] border-[#1DA1F2]/10">
                        <div className="flex items-center justify-between border-b pb-4">
                            <h3 className="text-sm font-black uppercase tracking-widest">Generated Profiles</h3>
                        </div>

                        <div className="space-y-4">
                            {bios.length > 0 ? (
                                <AnimatePresence>
                                    {bios.map((bio, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="p-6 rounded-2xl bg-background border shadow-sm group hover:border-[#1DA1F2]/50 hover:shadow-md transition-all relative flex gap-4"
                                        >
                                            <div className="w-12 h-12 rounded-full bg-muted/50 border flex-shrink-0" />
                                            <div className="flex-grow space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold text-sm">John Doe</span>
                                                    <span className="text-xs text-muted-foreground">@username</span>
                                                </div>
                                                <p className="text-sm leading-relaxed pr-8">{bio}</p>
                                            </div>

                                            <button
                                                onClick={() => handleCopy(bio, idx)}
                                                className="absolute right-4 top-4 p-2 rounded-xl bg-[#1DA1F2]/10 text-[#1DA1F2] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#1DA1F2] hover:text-white"
                                            >
                                                {copiedIndex === idx ? <Check size={16} /> : <Copy size={16} />}
                                            </button>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            ) : (
                                <div className="h-[300px] flex flex-col items-center justify-center text-center opacity-40">
                                    <Twitter className="w-12 h-12 text-primary mb-4" />
                                    <p className="text-xs font-bold uppercase tracking-widest italic">Fill out the form to generate bios</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
