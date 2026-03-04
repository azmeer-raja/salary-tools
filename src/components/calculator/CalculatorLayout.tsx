"use client";

import { ReactNode } from "react";
import AdSlot from "@/components/ads/AdSlot";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CalculatorLayoutProps {
    title: string;
    description: string;
    children: ReactNode;
    sidebar?: ReactNode;
    icon?: ReactNode;
    fullWidth?: boolean;
}

export default function CalculatorLayout({ title, description, children, sidebar, icon, fullWidth }: CalculatorLayoutProps) {
    return (
        <div className="min-h-screen pb-20">
            {/* Page Header */}
            <div className="bg-gradient-to-b from-primary/5 to-transparent py-16 md:py-24 px-4 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
                <div className={cn("container mx-auto relative", fullWidth ? "max-w-none px-8 text-center" : "max-w-6xl text-center md:text-left")}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={cn("flex flex-col items-center gap-6 md:gap-8", !fullWidth && "md:flex-row md:items-end")}
                    >
                        {icon && (
                            <motion.div
                                whileHover={{ rotate: 10, scale: 1.1 }}
                                className="p-5 rounded-3xl premium-gradient text-white shadow-2xl shadow-primary/30"
                            >
                                {icon}
                            </motion.div>
                        )}
                        <div className={cn("flex-1", fullWidth && "text-center")}>
                            <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter font-display leading-[1.1]">
                                {title}
                            </h1>
                            <p className={cn("text-lg md:text-xl text-muted-foreground max-w-2xl font-medium tracking-tight opacity-70", fullWidth ? "mx-auto" : "md:mx-0")}>
                                {description}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className={cn("container mx-auto px-4 mt-[-40px]", fullWidth ? "max-w-none px-8" : "max-w-7xl")}>
                <div className="flex flex-col lg:flex-row gap-8 md:gap-16">
                    {/* Main Content Area */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex-1 min-w-0 space-y-16"
                    >
                        <div className="bg-card/30 backdrop-blur-sm border rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-black/5 relative overflow-hidden">
                            <div className="relative z-10">
                                {children}
                            </div>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/2 rounded-full blur-3xl" />
                        </div>

                        {!fullWidth && (
                            <div className="prose dark:prose-invert max-w-none bg-secondary/20 p-10 md:p-16 rounded-[2.5rem] border-transparent transition-all">
                                <h2 className="text-3xl font-black font-display mb-8">How to use this calculator</h2>
                                <p className="text-lg leading-relaxed text-muted-foreground/80">Our advanced algorithms ensure maximum precision for your financial planning. Simply follow the inputs above to get your instant breakdown.</p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 not-prose">
                                    <div className="p-8 rounded-3xl bg-card border border-border/50 transition-all hover:border-primary/50">
                                        <h4 className="font-black text-xs uppercase tracking-widest text-primary mb-3">Accurate Logic</h4>
                                        <p className="text-sm text-muted-foreground font-medium">Calculations follow the latest 2024-25 guidelines and tax regimes for India.</p>
                                    </div>
                                    <div className="p-8 rounded-3xl bg-card border border-border/50 transition-all hover:border-primary/50">
                                        <h4 className="font-black text-xs uppercase tracking-widest text-primary mb-3">Privacy First</h4>
                                        <p className="text-sm text-muted-foreground font-medium">All inputs are processed locally. Your sensitive data never leaves your browser.</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>

                    {!fullWidth && (
                        <aside className="lg:w-80 shrink-0 space-y-8">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="p-10 rounded-[2.5rem] glass sticky top-28 shadow-xl shadow-primary/5"
                            >
                                <h3 className="text-xl font-black font-display mb-8 tracking-tight">Recommended Tools</h3>
                                <div className="space-y-3">
                                    {[
                                        { name: "Income Tax Calculator", href: "/income-tax-calculator" },
                                        { name: "PF Calculator", href: "/pf-calculator" },
                                        { name: "HRA Calculator", href: "/hra-calculator" },
                                        { name: "EMI Calculator", href: "/emi-calculator" },
                                    ].map((item) => (
                                        <a
                                            key={item.href}
                                            href={item.href}
                                            className="group flex items-center justify-between p-4 rounded-2xl hover:bg-primary/5 border border-transparent hover:border-primary/10 transition-all"
                                        >
                                            <span className="text-sm font-bold opacity-70 group-hover:opacity-100 transition-opacity">{item.name}</span>
                                            <ArrowUpRight size={16} className="text-primary opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                        </a>
                                    ))}
                                </div>
                                <div className="mt-12 pt-8 border-t border-primary/10">
                                    <AdSlot slot="4567890123" />
                                </div>
                            </motion.div>
                            {sidebar}
                        </aside>
                    )}
                </div>
            </div>
        </div>
    );
}
