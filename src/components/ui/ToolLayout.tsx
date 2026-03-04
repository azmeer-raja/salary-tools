"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface ToolLayoutProps {
    title: string;
    description: string;
    children: ReactNode;
    category?: "Image Tools" | "PDF Tools" | "Developer Tools";
    categoryHref?: string;
}

export function ToolLayout({ title, description, children, category, categoryHref }: ToolLayoutProps) {
    return (
        <main className="min-h-screen pt-24 pb-16 px-4 md:px-8">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground/60">
                    <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
                        <Home className="w-3 h-3" /> Home
                    </Link>
                    <ChevronRight className="w-3 h-3" />
                    {category && (
                        <>
                            <Link href={categoryHref || "#"} className="hover:text-primary transition-colors">
                                {category}
                            </Link>
                            <ChevronRight className="w-3 h-3" />
                        </>
                    )}
                    <span className="text-foreground">{title}</span>
                </nav>

                {/* Header */}
                <header className="space-y-4 text-center md:text-left">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-block"
                    >
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20">
                            {category || "Tool"}
                        </span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter"
                    >
                        {title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-muted-foreground max-w-2xl mx-auto md:mx-0"
                    >
                        {description}
                    </motion.p>
                </header>

                {/* Content */}
                <section className="relative">
                    <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
                    <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -z-10" />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="glass rounded-3xl p-6 md:p-10"
                    >
                        {children}
                    </motion.div>
                </section>
            </div>
        </main>
    );
}
