"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, X, Calculator, BookOpen, Sun, Moon, Briefcase, GraduationCap, Code, Image as ImageIcon, FileText, Search, Hash } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const menuCategories = [
    {
        title: "Finance & Tax",
        icon: <Calculator size={16} />,
        items: [
            { name: "In-Hand Salary", href: "/in-hand-salary-calculator" },
            { name: "Income Tax", href: "/income-tax-calculator" },
            { name: "EMI Calculator", href: "/emi-calculator" },
            { name: "SIP Calculator", href: "/sip-calculator" },
            { name: "Mortgage", href: "/mortgage-calculator" },
            { name: "Compound Interest", href: "/compound-interest-calculator" },
            { name: "Inflation", href: "/inflation-calculator" },
            { name: "VAT Calculator", href: "/vat-calculator" },
            { name: "Discount", href: "/discount-calculator" },
            { name: "Tip Calculator", href: "/tip-calculator" },
        ]
    },
    {
        title: "Career & Health",
        icon: <Briefcase size={16} />,
        items: [
            { name: "Salary Hike", href: "/salary-hike-calculator" },
            { name: "Notice Period", href: "/career-tools/notice-period-calculator" },
            { name: "Hourly Rate", href: "/career-tools/hourly-rate-calculator" },
            { name: "Annual Salary", href: "/career-tools/annual-salary-calculator" },
            { name: "Freelancer Income", href: "/career-tools/freelancer-income-calculator" },
            { name: "Cost of Living", href: "/career-tools/cost-of-living-calculator" },
            { name: "Promotion Estimator", href: "/career-tools/promotion-salary-estimator" },
            { name: "BMI Calculator", href: "/bmi-calculator" },
            { name: "Calorie Calculator", href: "/calorie-calculator" },
            { name: "BMR Calculator", href: "/bmr-calculator" },
            { name: "Water Intake", href: "/water-intake-calculator" },
            { name: "Pregnancy Due Date", href: "/pregnancy-calculator" },
        ]
    },
    {
        title: "Utility",
        icon: <GraduationCap size={16} />,
        items: [
            { name: "GPA Calculator", href: "/gpa-calculator" },
            { name: "Percentage", href: "/percentage-calculator" },
            { name: "Final Exam", href: "/final-exam-calculator" },
            { name: "Age Calculator", href: "/age-calculator" },
            { name: "Date Calculator", href: "/date-calculator" },
            { name: "Random Number", href: "/random-number-generator" },
            { name: "Password Generator", href: "/password-generator" },
            { name: "Love Calculator", href: "/love-calculator" },
        ]
    },
    {
        title: "Dev Tools",
        icon: <Code size={16} />,
        items: [
            { name: "JSON Formatter", href: "/json-formatter" },
            { name: "UUID Generator", href: "/uuid-generator" },
            { name: "Unix Timestamp", href: "/timestamp-converter" },
        ]
    },
    {
        title: "Image Tools",
        icon: <ImageIcon size={16} />,
        items: [
            { name: "Compressor", href: "/image-compressor" },
            { name: "Resizer", href: "/image-resizer" },
            { name: "Crop Tool", href: "/image-crop-tool" },
            { name: "To Base64", href: "/image-to-base64" },
            { name: "JPG to PNG", href: "/jpg-to-png" },
            { name: "PNG to JPG", href: "/png-to-jpg" },
            { name: "WebP Convert", href: "/webp-converter" },
            { name: "Blur Image", href: "/blur-image-tool" },
            { name: "Watermark", href: "/add-watermark-to-image" },
            { name: "Color Picker", href: "/image-color-picker" },
        ]
    },
    {
        title: "PDF Tools",
        icon: <FileText size={16} />,
        items: [
            { name: "Merge PDF", href: "/merge-pdf" },
            { name: "Split PDF", href: "/split-pdf" },
            { name: "Compress PDF", href: "/compress-pdf" },
            { name: "PDF to JPG", href: "/pdf-to-jpg" },
            { name: "JPG to PDF", href: "/jpg-to-pdf" },
            { name: "PDF to Word", href: "/pdf-to-word" },
            { name: "Rotate PDF", href: "/rotate-pdf" },
            { name: "Watermark", href: "/add-watermark-to-pdf" },
            { name: "Unlock PDF", href: "/unlock-pdf" },
            { name: "Protect PDF", href: "/protect-pdf" },
        ]
    },
    {
        title: "SEO Tools",
        icon: <Search size={16} />,
        items: [
            { name: "Keyword Density", href: "/keyword-density-checker" },
            { name: "Meta Tags", href: "/meta-tag-generator" },
            { name: "Word Counter", href: "/word-counter" },
            { name: "Plagiarism", href: "/text-compare" },
            { name: "Sitemap Gen", href: "/sitemap-generator" },
            { name: "Robots.txt", href: "/robots-txt-generator" },
            { name: "Open Graph", href: "/open-graph-generator" },
            { name: "SERP Preview", href: "/serp-preview-tool" },
        ]
    },
    {
        title: "Social Tools",
        icon: <Hash size={16} />,
        items: [
            { name: "IG Captions", href: "/instagram-caption-generator" },
            { name: "Hashtags", href: "/hashtag-generator" },
            { name: "YT Titles", href: "/youtube-title-generator" },
            { name: "YT Tags", href: "/youtube-tag-generator" },
            { name: "TikTok Tags", href: "/tiktok-hashtag-generator" },
            { name: "Twitter Bio", href: "/twitter-bio-generator" },
        ]
    }
];

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState("");
    const { theme, setTheme } = useTheme();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/40 backdrop-blur-2xl transition-all duration-500">
            <div className="container mx-auto px-6 h-24 flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-4 group">
                    <motion.div
                        whileHover={{ rotate: 12, scale: 1.1, filter: "brightness(1.2)" }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="w-12 h-12 rounded-2xl bg-white/10 dark:bg-white/5 flex items-center justify-center shadow-[0_0_30px_-5px_rgba(79,70,229,0.3)] overflow-hidden border border-white/10"
                    >
                        <img src="/toolzverse.png" alt="Toolzverse Logo" className="w-10 h-10 object-contain p-1" />
                    </motion.div>
                    <span className="text-3xl font-black tracking-[-0.05em] bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent group-hover:from-primary group-hover:to-primary/80 transition-all duration-300">
                        ToolVerse
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center space-x-1">
                    {menuCategories.map((cat) => (
                        <div
                            key={cat.title}
                            className="relative group h-24 flex items-center px-4"
                            onMouseEnter={() => setIsMenuOpen(cat.title)}
                            onMouseLeave={() => setIsMenuOpen("")}
                        >
                            <button className="flex items-center space-x-2 font-bold text-sm text-foreground/70 hover:text-foreground transition-all duration-300">
                                <span className="opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all">{cat.icon}</span>
                                <span className="relative">
                                    {cat.title}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full rounded-full" />
                                </span>
                                <ChevronDown size={14} className={cn("transition-transform duration-500 opacity-20", isMenuOpen === cat.title && "rotate-180 opacity-100")} />
                            </button>

                            <AnimatePresence>
                                {isMenuOpen === cat.title && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 15, scale: 0.98 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.98 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                        className="absolute top-[85%] left-1/2 -translate-x-1/2 w-[320px] vibrant-glass rounded-[2rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] p-6 mt-1 border border-white/10 z-50"
                                    >
                                        <div className="flex flex-col gap-1.5">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="p-2 rounded-lg bg-primary/10 text-primary">{cat.icon}</div>
                                                <div className="text-primary font-black text-[10px] uppercase tracking-[0.25em]">
                                                    {cat.title}
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 gap-1">
                                                {cat.items.map((item) => (
                                                    <Link
                                                        key={item.href}
                                                        href={item.href}
                                                        className="px-4 py-3 rounded-2xl text-[13px] font-bold text-foreground/60 hover:text-foreground hover:bg-white/5 border border-transparent hover:border-white/5 transition-all text-left flex items-center justify-between group/item"
                                                        onClick={() => setIsMenuOpen("")}
                                                    >
                                                        {item.name}
                                                        <Search size={12} className="opacity-0 group-hover/item:opacity-30 transition-opacity" />
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}

                    <Link href="/blog" className="flex items-center space-x-2 font-bold text-sm text-foreground/70 hover:text-foreground transition-all duration-300 px-6">
                        <BookOpen size={16} className="text-primary/70" />
                        <span>Insights</span>
                    </Link>
                </nav>

                <div className="flex items-center space-x-4">
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="w-12 h-12 rounded-2xl glass hover:bg-white/5 border border-white/5 flex items-center justify-center transition-all"
                    >
                        {theme === 'dark' ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-primary" />}
                    </motion.button>

                    <Link href="/in-hand-salary-calculator" className="hidden sm:flex px-8 h-12 premium-gradient text-white rounded-2xl font-black text-sm items-center hover:shadow-[0_15px_30px_-5px_rgba(79,70,229,0.4)] hover:-translate-y-1 transition-all">
                        Get Started
                    </Link>

                    <button className="lg:hidden w-12 h-12 rounded-2xl glass flex items-center justify-center border border-white/5" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="lg:hidden absolute top-full left-0 w-full border-t border-white/5 bg-background/95 backdrop-blur-2xl shadow-2xl overflow-hidden z-40"
                    >
                        <div className="p-8 space-y-10 max-h-[85vh] overflow-y-auto custom-scrollbar">
                            {menuCategories.map((cat) => (
                                <div key={cat.title} className="space-y-5">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-primary/10 text-primary">{cat.icon}</div>
                                        <p className="font-black text-primary text-[11px] uppercase tracking-[0.25em] opacity-60">{cat.title}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        {cat.items.map((item) => (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                onClick={() => setIsOpen(false)}
                                                className="px-5 py-4 rounded-[1.5rem] glass text-[13px] font-bold border border-white/5 hover:border-primary/30 transition-all flex flex-col gap-1"
                                            >
                                                {item.name}
                                                <span className="text-[10px] text-muted-foreground font-medium opacity-50 capitalize">{cat.title.split(' ')[0]} Tool</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
