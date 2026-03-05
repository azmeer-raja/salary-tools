"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="w-full border-t border-white/5 bg-secondary/5 relative overflow-hidden mt-32">
            {/* Immersive Background Glows */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-green-500/5 rounded-full blur-[100px] -z-10" />

            <div className="container mx-auto px-6 py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 lg:gap-12">
                    <div className="lg:col-span-2 space-y-10">
                        <Link href="/" className="flex items-center space-x-4 group w-fit">
                            <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center shadow-2xl border border-white/10 group-hover:scale-110 transition-transform duration-500">
                                <img src="/toolzverse.png" alt="ToolVerse Logo" className="w-9 h-9 object-contain" />
                            </div>
                            <span className="text-3xl font-black tracking-[-0.05em] bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">ToolVerse</span>
                        </Link>
                        <p className="text-muted-foreground max-w-sm leading-relaxed font-medium text-lg opacity-80">
                            Empowering your digital workflow with precision-engineered tools.
                            Built for professionals, designed for the future.
                        </p>
                        <div className="flex items-center space-x-4">
                            {[Twitter, Github, Linkedin, Mail].map((Icon, i) => (
                                <Link key={i} href="#" className="w-12 h-12 rounded-2xl glass flex items-center justify-center hover:bg-primary/10 transition-all group border border-white/5">
                                    <Icon size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-8">
                        <h4 className="font-black text-[11px] uppercase tracking-[0.25em] text-primary opacity-60">Calculators</h4>
                        <ul className="space-y-5 text-sm font-bold text-muted-foreground">
                            {["In-Hand Salary", "Income Tax", "EMI Calculator", "SIP & Wealth"].map((item, i) => (
                                <li key={i}>
                                    <Link href="#" className="hover:text-foreground transition-colors relative group w-fit">
                                        {item}
                                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary/40 transition-all duration-300 group-hover:w-full rounded-full" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-8">
                        <h4 className="font-black text-[11px] uppercase tracking-[0.25em] text-primary opacity-60">Platform</h4>
                        <ul className="space-y-5 text-sm font-bold text-muted-foreground">
                            {["Industry Insights", "Career Toolkit", "Our Mission", "API Integration"].map((item, i) => (
                                <li key={i}>
                                    <Link href="#" className="hover:text-foreground transition-colors relative group w-fit">
                                        {item}
                                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary/40 transition-all duration-300 group-hover:w-full rounded-full" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-8">
                        <h4 className="font-black text-[11px] uppercase tracking-[0.25em] text-primary opacity-60">Integrity</h4>
                        <ul className="space-y-5 text-sm font-bold text-muted-foreground">
                            {["Privacy Protocol", "License Terms", "Data Security", "Global Nodes"].map((item, i) => (
                                <li key={i}>
                                    <Link href="#" className="hover:text-foreground transition-colors relative group w-fit">
                                        {item}
                                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary/40 transition-all duration-300 group-hover:w-full rounded-full" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-32 pt-12 border-t border-white/5 flex flex-col lg:flex-row items-center justify-between gap-10">
                    <div className="flex flex-col items-center lg:items-start gap-2">
                        <p className="text-sm font-bold text-muted-foreground/50">
                            © {new Date().getFullYear()} ToolVerse Labs. All rights reserved globally.
                        </p>
                        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-tighter text-emerald-500/80">Systems Fully Operational</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex -space-x-3 items-center">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-full border-4 border-background bg-secondary/50 glass shadow-xl flex items-center justify-center overflow-hidden">
                                    <div className={`w-full h-full bg-gradient-to-br ${i % 2 === 0 ? 'from-primary/20 to-green-500/20' : 'from-emerald-500/20 to-emerald-500/20'}`} />
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[11px] font-black uppercase tracking-widest text-foreground opacity-40">Trusted Infrastructure</span>
                            <span className="text-[9px] font-bold text-muted-foreground opacity-30">ENCRYPTED END-TO-END</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
