"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, X, Calculator, BookOpen, Sun, Moon, Briefcase, GraduationCap, Code } from "lucide-react";
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
            { name: "BMI Calculator", href: "/bmi-calculator" },
            { name: "Calorie Calculator", href: "/calorie-calculator" },
            { name: "BMR Calculator", href: "/bmr-calculator" },
            { name: "Water Intake", href: "/water-intake-calculator" },
            { name: "Pregnancy Due Date", href: "/pregnancy-calculator" },
        ]
    },
    {
        title: "Utility & Education",
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
        title: "Developer Tools",
        icon: <Code size={16} />,
        items: [
            { name: "JSON Formatter", href: "/json-formatter" },
            { name: "UUID Generator", href: "/uuid-generator" },
            { name: "Unix Timestamp", href: "/timestamp-converter" },
        ]
    },
    {
        title: "Image Tools",
        icon: <Calculator size={16} />,
        items: [
            { name: "Image Compressor", href: "/image-compressor" },
            { name: "Image Resizer", href: "/image-resizer" },
            { name: "Image Crop Tool", href: "/image-crop-tool" },
            { name: "Image Color Picker", href: "/image-color-picker" },
        ]
    },
    {
        title: "PDF Tools",
        icon: <Calculator size={16} />,
        items: [
            { name: "Merge PDF", href: "/merge-pdf" },
            { name: "Split PDF", href: "/split-pdf" },
            { name: "Compress PDF", href: "/compress-pdf" },
            { name: "PDF to JPG", href: "/pdf-to-jpg" },
            { name: "JPG to PDF", href: "/jpg-to-pdf" },
        ]
    }
];

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState("");
    const { theme, setTheme } = useTheme();

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/60 backdrop-blur-xl transition-all">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-3 group">
                    <motion.div
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        className="w-10 h-10 rounded-xl premium-gradient flex items-center justify-center text-white font-black shadow-lg shadow-primary/20"
                    >
                        C
                    </motion.div>
                    <span className="text-2xl font-black tracking-tighter transition-colors group-hover:text-primary">
                        CalcyRaja
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden xl:flex items-center space-x-8">
                    {menuCategories.map((cat) => (
                        <div
                            key={cat.title}
                            className="relative group h-20 flex items-center"
                            onMouseEnter={() => setIsMenuOpen(cat.title)}
                            onMouseLeave={() => setIsMenuOpen("")}
                        >
                            <button className="flex items-center space-x-2 font-bold text-sm hover:text-primary transition-all">
                                <span className="opacity-70 group-hover:scale-110 transition-transform">{cat.icon}</span>
                                <span>{cat.title.split(' ')[0]}</span>
                                <ChevronDown size={12} className={cn("transition-transform duration-300 opacity-30", isMenuOpen === cat.title && "rotate-180 opacity-100")} />
                            </button>

                            <AnimatePresence>
                                {isMenuOpen === cat.title && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full left-1/2 -translate-x-1/2 w-64 glass rounded-3xl shadow-2xl p-5 mt-1 border overflow-hidden"
                                    >
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2 mb-3 text-primary font-black text-[9px] uppercase tracking-[0.2em] opacity-40">
                                                {cat.title}
                                            </div>
                                            {cat.items.map((item) => (
                                                <Link
                                                    key={item.href}
                                                    href={item.href}
                                                    className="px-4 py-2.5 rounded-xl text-xs font-bold text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all text-left"
                                                    onClick={() => setIsMenuOpen("")}
                                                >
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}

                    <Link href="/blog" className="flex items-center space-x-2 font-bold text-sm hover:text-primary transition-colors">
                        <BookOpen size={16} className="text-primary/70" />
                        <span>Insights</span>
                    </Link>
                </nav>

                <div className="flex items-center space-x-6">
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        whileHover={{ scale: 1.1 }}
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="p-2.5 rounded-xl bg-secondary/50 hover:bg-secondary border transition-colors shadow-sm"
                    >
                        {theme === 'dark' ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-primary" />}
                    </motion.button>

                    <button className="md:hidden lg:hidden" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    <Link href="/in-hand-salary-calculator" className="hidden lg:flex px-6 h-11 premium-gradient text-white rounded-xl font-bold text-sm items-center hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all">
                        Try Calculator
                    </Link>
                </div>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="md:hidden border-t bg-background overflow-hidden"
                    >
                        <div className="p-6 space-y-8 max-h-[75vh] overflow-y-auto">
                            {menuCategories.map((cat) => (
                                <div key={cat.title} className="space-y-4">
                                    <p className="font-black text-primary text-[10px] uppercase tracking-[0.2em] px-2 opacity-50">{cat.title}</p>
                                    <div className="grid grid-cols-2 gap-3">
                                        {cat.items.map((item) => (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                onClick={() => setIsOpen(false)}
                                                className="px-4 py-3 rounded-xl bg-secondary/50 text-sm font-medium border border-transparent hover:border-primary/20 transition-all"
                                            >
                                                {item.name}
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
