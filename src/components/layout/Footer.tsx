"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="w-full border-t bg-secondary/20 relative overflow-hidden mt-20">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -z-10" />

            <div className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <Link href="/" className="flex items-center space-x-3 group w-fit">
                            <div className="w-10 h-10 rounded-xl premium-gradient flex items-center justify-center text-white font-black shadow-lg shadow-primary/20">
                                S
                            </div>
                            <span className="text-2xl font-black tracking-tighter">SalaryTools</span>
                        </Link>
                        <p className="text-muted-foreground max-w-sm leading-relaxed font-medium">
                            Providing precision financial intelligence for modern professionals.
                            Built with a focus on speed, privacy, and user experience.
                        </p>
                        <div className="flex items-center space-x-5">
                            <Link href="#" className="p-2.5 rounded-xl glass hover:bg-primary/10 transition-colors text-muted-foreground hover:text-primary"><Twitter size={20} /></Link>
                            <Link href="#" className="p-2.5 rounded-xl glass hover:bg-primary/10 transition-colors text-muted-foreground hover:text-primary"><Github size={20} /></Link>
                            <Link href="#" className="p-2.5 rounded-xl glass hover:bg-primary/10 transition-colors text-muted-foreground hover:text-primary"><Linkedin size={20} /></Link>
                            <Link href="#" className="p-2.5 rounded-xl glass hover:bg-primary/10 transition-colors text-muted-foreground hover:text-primary"><Mail size={20} /></Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-black mb-6 text-[10px] uppercase tracking-[0.2em] text-primary">Calculators</h4>
                        <ul className="space-y-4 text-sm font-medium text-muted-foreground">
                            <li><Link href="/in-hand-salary-calculator" className="hover:text-primary transition-colors">In-Hand Salary</Link></li>
                            <li><Link href="/income-tax-calculator" className="hover:text-primary transition-colors">Income Tax</Link></li>
                            <li><Link href="/emi-calculator" className="hover:text-primary transition-colors">EMI Calculator</Link></li>
                            <li><Link href="/sip-calculator" className="hover:text-primary transition-colors">SIP & Investments</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-black mb-6 text-[10px] uppercase tracking-[0.2em] text-primary">Resources</h4>
                        <ul className="space-y-4 text-sm font-medium text-muted-foreground">
                            <li><Link href="/blog" className="hover:text-primary transition-colors">Industry Insights</Link></li>
                            <li><Link href="/career-tools/notice-period-calculator" className="hover:text-primary transition-colors">Career Utilities</Link></li>
                            <li><Link href="/about" className="hover:text-primary transition-colors">Our Mission</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Get in Touch</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-black mb-6 text-[10px] uppercase tracking-[0.2em] text-primary">Legal</h4>
                        <ul className="space-y-4 text-sm font-medium text-muted-foreground">
                            <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                            <li><Link href="/disclaimer" className="hover:text-primary transition-colors">Disclaimer</Link></li>
                            <li><Link href="/sitemap.xml" className="hover:text-primary transition-colors">Site Directory</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-20 pt-10 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-sm font-medium text-muted-foreground/60">
                        © {new Date().getFullYear()} SalaryTools. Designed for the futuristic professional.
                    </p>
                    <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                            <div className="w-8 h-8 rounded-full border-2 border-background bg-blue-500/20" />
                            <div className="w-8 h-8 rounded-full border-2 border-background bg-primary/20" />
                            <div className="w-8 h-8 rounded-full border-2 border-background bg-purple-500/20" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 ml-2">Trusted Globally</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
