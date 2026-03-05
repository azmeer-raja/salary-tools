"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calculator, Briefcase, TrendingUp, ShieldCheck, Zap,
  BarChart3, ChevronRight, Heart, Activity, Code, GraduationCap,
  Banknote, Target, ArrowRight, Star, Sparkles, Plus, Image as ImageIcon, FileText,
  Search, Share2, Youtube, UserCircle, Hash, Instagram, Twitter, TextSelect, SplitSquareHorizontal, Globe, Layout, KeyRound, Unlock
} from "lucide-react";
import AdSlot from "@/components/ads/AdSlot";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const toolCategories = [
  {
    title: "Finance & Tax",
    icon: <Calculator className="text-blue-500" />,
    gradient: "from-blue-500/20 to-cyan-500/20",
    items: [
      { name: "In-Hand Salary", href: "/in-hand-salary-calculator", desc: "Precise net take-home pay breakdown." },
      { name: "Income Tax", href: "/income-tax-calculator", desc: "Compare tax regimes in seconds." },
      { name: "SIP Calculator", href: "/sip-calculator", desc: "Visualize your wealth growth." },
      { name: "EMI Calculator", href: "/emi-calculator", desc: "Plan your loans with accuracy." },
      { name: "Mortgage", href: "/mortgage-calculator", desc: "Home loan payment guide." },
      { name: "Compound Interest", href: "/compound-interest-calculator", desc: "See the power of compounding." },
    ]
  },
  {
    title: "Career & Work",
    icon: <Briefcase className="text-orange-500" />,
    gradient: "from-orange-500/20 to-amber-500/20",
    items: [
      { name: "Salary Hike", href: "/salary-hike-calculator", desc: "Estimate your next appraisal." },
      { name: "Notice Period", href: "/career-tools/notice-period-calculator", desc: "Calculate your last working day." },
      { name: "Annual Salary", href: "/career-tools/annual-salary-calculator", desc: "Hourly to yearly conversion." },
      { name: "Freelancer", href: "/career-tools/freelancer-income-calculator", desc: "Net income for independent pros." },
    ]
  },
  {
    title: "Health & Fitness",
    icon: <Heart className="text-pink-500" />,
    gradient: "from-pink-500/20 to-rose-500/20",
    items: [
      { name: "BMI Calculator", href: "/bmi-calculator", desc: "Check your body mass index." },
      { name: "Calorie Calculator", href: "/calorie-calculator", desc: "Optimize your daily intake." },
      { name: "Water Intake", href: "/water-intake-calculator", desc: "Personalized hydration goal." },
      { name: "Pregnancy", href: "/pregnancy-calculator", desc: "Due date & progress tracker." },
    ]
  },
  {
    title: "Utility & Tech",
    icon: <Code className="text-purple-500" />,
    gradient: "from-purple-500/20 to-indigo-500/20",
    items: [
      { name: "GPA Calculator", href: "/gpa-calculator", desc: "Track your academic standing." },
      { name: "Password Gen", href: "/password-generator", desc: "Secure random credentials." },
      { name: "JSON Formatter", href: "/json-formatter", desc: "Clean and validate your data." },
      { name: "Timestamp", href: "/timestamp-converter", desc: "Unix to human-readable date." },
    ]
  },
  {
    title: "Image Tools",
    icon: <ImageIcon className="text-emerald-500" />,
    gradient: "from-emerald-500/20 to-teal-500/20",
    items: [
      { name: "Compressor", href: "/image-compressor", desc: "Reduce file size without losing quality." },
      { name: "Resizer", href: "/image-resizer", desc: "Change dimensions with pixel precision." },
      { name: "Crop Tool", href: "/image-crop-tool", desc: "Perfect framing for every shot." },
      { name: "Color Picker", href: "/image-color-picker", desc: "Extract hex codes from images." },
      { name: "Format Convert", href: "/webp-converter", desc: "JPG, PNG, WebP converters." },
    ]
  },
  {
    title: "PDF Tools",
    icon: <FileText className="text-red-500" />,
    gradient: "from-red-500/20 to-orange-500/20",
    items: [
      { name: "Merge PDF", href: "/merge-pdf", desc: "Combine multiple files into one." },
      { name: "Split PDF", href: "/split-pdf", desc: "Extract specific pages easily." },
      { name: "Compress PDF", href: "/compress-pdf", desc: "Optimize size for sharing." },
      { name: "PDF to JPG", href: "/pdf-to-jpg", desc: "Convert pages to high-res images." },
      { name: "Lock/Unlock", href: "/protect-pdf", desc: "Password protect your documents." },
    ]
  },
  {
    title: "SEO Tools",
    icon: <Search className="text-blue-500" />,
    gradient: "from-blue-500/20 to-cyan-500/20",
    items: [
      { name: "Keyword Density", href: "/keyword-density-checker", desc: "Check text keyword density." },
      { name: "Meta Tag Generator", href: "/meta-tag-generator", desc: "Generate HTML meta tags." },
      { name: "Word Counter", href: "/word-counter", desc: "Count words, chars & reading time." },
      { name: "Plagiarism Checker", href: "/text-compare", desc: "Compare text similarities." },
      { name: "Sitemap Generator", href: "/sitemap-generator", desc: "Create XML sitemaps." },
      { name: "Robots.txt Generator", href: "/robots-txt-generator", desc: "Generate rules for crawlers." },
      { name: "Open Graph Generator", href: "/open-graph-generator", desc: "Generate OG tags for social." },
      { name: "SERP Preview Tool", href: "/serp-preview-tool", desc: "Simulate Google search results." },
    ]
  },
  {
    title: "Social Media Tools",
    icon: <Hash className="text-pink-500" />,
    gradient: "from-pink-500/20 to-rose-500/20",
    items: [
      { name: "Instagram Captions", href: "/instagram-caption-generator", desc: "AI caption ideas for IG." },
      { name: "Hashtag Generator", href: "/hashtag-generator", desc: "Trending tags for your niche." },
      { name: "YouTube Titles", href: "/youtube-title-generator", desc: "Catchy titles for videos." },
      { name: "YouTube Tags", href: "/youtube-tag-generator", desc: "SEO tags for YouTube." },
      { name: "TikTok Hashtags", href: "/tiktok-hashtag-generator", desc: "Viral tags for the FYP." },
      { name: "Twitter Bio Generator", href: "/twitter-bio-generator", desc: "Professional X (Twitter) bios." },
    ]
  }
];

const heroCategories = [
  { label: "Calculators", emoji: "📊", href: "/in-hand-salary-calculator", color: "from-blue-500/20 to-cyan-500/20 border-blue-500/20 hover:border-blue-500/40" },
  { label: "Image Tools", emoji: "🖼️", href: "/image-compressor", color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/20 hover:border-emerald-500/40" },
  { label: "PDF Tools", emoji: "📄", href: "/merge-pdf", color: "from-red-500/20 to-orange-500/20 border-red-500/20 hover:border-red-500/40" },
  { label: "Dev Tools", emoji: "💻", href: "/json-formatter", color: "from-purple-500/20 to-indigo-500/20 border-purple-500/20 hover:border-purple-500/40" },
  { label: "SEO Tools", emoji: "🔍", href: "/meta-tag-generator", color: "from-sky-500/20 to-blue-500/20 border-sky-500/20 hover:border-sky-500/40" },
  { label: "Social Tools", emoji: "⚡", href: "/hashtag-generator", color: "from-pink-500/20 to-rose-500/20 border-pink-500/20 hover:border-pink-500/40" },
];

const floatingCards = [
  { name: "BMI Calculator", emoji: "📊", href: "/bmi-calculator", delay: 0 },
  { name: "JSON Formatter", emoji: "💻", href: "/json-formatter", delay: 0.15 },
  { name: "Merge PDF", emoji: "📄", href: "/merge-pdf", delay: 0.3 },
  { name: "Image Compressor", emoji: "🖼️", href: "/image-compressor", delay: 0.45 },
  { name: "Password Gen", emoji: "🔑", href: "/password-generator", delay: 0.6 },
  { name: "EMI Calculator", emoji: "💰", href: "/emi-calculator", delay: 0.75 },
  { name: "Word Counter", emoji: "📝", href: "/word-counter", delay: 0.9 },
  { name: "UUID Generator", emoji: "🔐", href: "/uuid-generator", delay: 1.05 },
];

const trustIndicators = [
  { icon: "⚡", label: "Blazing Fast" },
  { icon: "🔒", label: "Privacy First" },
  { icon: "🌍", label: "No Login Required" },
  { icon: "📱", label: "Works on Any Device" },
];

const allSearchableTools = toolCategories.flatMap(cat =>
  cat.items.map(item => ({ ...item, category: cat.title }))
);

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const filteredTools = searchQuery.trim().length > 1
    ? allSearchableTools.filter(t =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 6)
    : [];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[35%] h-[35%] bg-blue-500/5 rounded-full blur-[100px]" />
        <div className="absolute top-[40%] right-[10%] w-[25%] h-[25%] bg-purple-500/5 rounded-full blur-[120px]" />
      </div>

      {/* ===== HERO SECTION ===== */}
      <section className="relative pt-20 pb-16 md:pt-28 md:pb-20 px-4 overflow-hidden">
        <div className="container mx-auto max-w-5xl text-center">

          {/* 1. Announcement Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black mb-10 tracking-[0.15em] uppercase shadow-sm"
          >
            <Sparkles size={13} className="animate-pulse" />
            🚀 150+ Powerful Tools — All in One Platform
          </motion.div>

          {/* 2. Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 leading-[0.92]"
          >
            One Universe.{" "}
            <span className="bg-gradient-to-r from-blue-500 via-violet-500 to-purple-600 bg-clip-text text-transparent">
              Unlimited Tools.
            </span>
          </motion.h1>

          {/* 3. Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-medium leading-relaxed"
          >
            ToolzVerse brings together calculators, converters, developer tools,
            and productivity utilities — everything you need to calculate, convert,
            generate, and build in one{" "}
            <span className="text-foreground font-bold">fast, privacy-first</span> platform.
          </motion.p>

          {/* 4. CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <Link
              href="/in-hand-salary-calculator"
              className="h-14 px-9 rounded-2xl premium-gradient text-white font-black flex items-center gap-3 shadow-2xl shadow-primary/30 hover:-translate-y-1 hover:shadow-primary/50 transition-all text-sm"
            >
              Explore Tools <ChevronRight size={18} />
            </Link>
            <Link
              href="#categories"
              className="h-14 px-9 rounded-2xl glass font-bold flex items-center gap-3 hover:bg-secondary/60 transition-all border text-sm"
            >
              Browse Categories
            </Link>
          </motion.div>

          {/* 5. Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative max-w-xl mx-auto mb-14"
          >
            <div className="relative flex items-center">
              <Search size={18} className="absolute left-5 text-muted-foreground/60 pointer-events-none" />
              <input
                id="hero-search"
                type="text"
                placeholder="Search calculators, converters, PDF tools..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setShowResults(true); }}
                onFocus={() => setShowResults(true)}
                onBlur={() => setTimeout(() => setShowResults(false), 150)}
                className="w-full h-14 pl-12 pr-5 rounded-2xl glass border border-border/60 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/10 text-sm font-medium placeholder:text-muted-foreground/50 transition-all bg-background/80 backdrop-blur-md shadow-lg"
              />
            </div>

            <AnimatePresence>
              {showResults && filteredTools.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  className="absolute top-full mt-2 w-full glass border rounded-2xl shadow-2xl z-50 overflow-hidden"
                >
                  {filteredTools.map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      className="flex items-center justify-between px-5 py-3.5 hover:bg-primary/5 transition-colors border-b border-border/30 last:border-0 text-left"
                    >
                      <div>
                        <p className="text-sm font-bold">{tool.name}</p>
                        <p className="text-xs text-muted-foreground/70">{tool.category}</p>
                      </div>
                      <ArrowRight size={14} className="text-muted-foreground/40" />
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* 6. Category Shortcuts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-3 mb-16"
          >
            {heroCategories.map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                className={cn(
                  "flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-br border text-sm font-bold transition-all hover:-translate-y-0.5 hover:shadow-lg",
                  cat.color
                )}
              >
                <span className="text-base">{cat.emoji}</span>
                {cat.label}
              </Link>
            ))}
          </motion.div>

          {/* 7. Floating Tool Cards */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-3 mb-16"
          >
            {floatingCards.map((card) => (
              <motion.div
                key={card.name}
                initial={{ opacity: 0, scale: 0.85, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.6 + card.delay, type: "spring", stiffness: 200 }}
                whileHover={{ y: -5, scale: 1.05 }}
              >
                <Link
                  href={card.href}
                  className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-2xl glass border border-border/40 hover:border-primary/30 hover:bg-primary/5 shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all text-sm font-bold group"
                >
                  <span className="text-lg">{card.emoji}</span>
                  {card.name}
                  <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-primary" />
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* 8. Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="flex flex-wrap justify-center gap-8"
          >
            {trustIndicators.map((t) => (
              <div key={t.label} className="flex items-center gap-2 text-muted-foreground/60 font-bold text-sm">
                <span className="text-base">{t.icon}</span>
                {t.label}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Ad Break */}
      <div className="container mx-auto max-w-6xl pb-24 px-4">
        <div className="glass rounded-[2rem] p-4 flex items-center justify-center border-dashed opacity-50">
          <AdSlot slot="1234567890" className="h-[90px] w-full max-w-4xl" />
        </div>
      </div>

      {/* Categories Modern Grid */}
      <section className="py-24 px-4 bg-secondary/20 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-5xl font-black font-display tracking-tight mb-4">Precision Toolbox</h2>
              <p className="text-muted-foreground text-lg font-medium opacity-70">A comprehensive suite of 50+ specialized tools designed for high-performance decision making.</p>
            </div>
            <div className="flex gap-3">
              <div className="px-5 py-3 rounded-2xl glass font-black text-xs uppercase tracking-widest text-primary border-primary/10">52 Verified Tools</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {toolCategories.map((cat, idx) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-4">
                  <div className={cn("p-4 rounded-2xl bg-gradient-to-br border shadow-sm", cat.gradient)}>
                    {cat.icon}
                  </div>
                  <h3 className="font-black tracking-tight text-2xl font-display">{cat.title}</h3>
                </div>
                <div className="space-y-4">
                  {cat.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group flex flex-col p-6 rounded-3xl glass border-transparent hover:border-primary/20 hover:scale-[1.02] shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-black text-sm group-hover:text-primary transition-colors">{item.name}</span>
                        <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                          <Plus size={14} />
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground font-medium leading-relaxed opacity-60 leading-tight">{item.desc}</span>
                    </Link>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section >

      {/* Featured Viral Tools (Glass Bento) */}
      < section className="py-32 px-4 relative overflow-hidden" >
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -30 }}
              className="lg:col-span-7 p-10 md:p-16 rounded-[3rem] premium-gradient text-white relative overflow-hidden flex flex-col justify-center"
            >
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
              <h2 className="text-4xl md:text-5xl font-black font-display tracking-tight mb-6 relative z-10 leading-none">
                Tools for every <br />
                <span className="opacity-60 italic">milestone.</span>
              </h2>
              <p className="text-lg md:text-xl font-medium opacity-80 mb-10 max-w-md relative z-10">
                From planning your first home to calculating your final exam scores, we've built a tool for everything.
              </p>
              <div className="flex flex-wrap gap-4 relative z-10">
                <Link href="/love-calculator" className="h-14 px-8 rounded-2xl bg-white text-primary font-black flex items-center gap-2 hover:shadow-xl hover:-translate-y-1 transition-all">
                  <Heart size={18} fill="currentColor" /> Love Calculator
                </Link>
                <Link href="/age-calculator" className="h-14 px-8 rounded-2xl bg-black/20 backdrop-blur-md border border-white/20 text-white font-black flex items-center gap-2 hover:bg-black/40 transition-all">
                  Exact Age Tool
                </Link>
              </div>
            </motion.div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-6">
              {[
                { name: "UUID Gen", href: "/uuid-generator", icon: <ShieldCheck size={20} />, color: "bg-blue-500/10" },
                { name: "VAT/Tax", href: "/vat-calculator", icon: <Banknote size={20} />, color: "bg-green-500/10" },
                { name: "JSON Format", href: "/json-formatter", icon: <Code size={20} />, color: "bg-purple-500/10" },
                { name: "Date Diff", href: "/date-calculator", icon: <TrendingUp size={20} />, color: "bg-orange-500/10" },
              ].map((tool, idx) => (
                <motion.div
                  key={tool.name}
                  whileInView={{ opacity: 1, scale: 1 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link href={tool.href} className="flex flex-col items-center justify-center p-8 rounded-[2.5rem] glass border-transparent hover:border-primary/20 hover:shadow-2xl transition-all aspect-square text-center group">
                    <div className={cn("p-4 rounded-2xl mb-4 group-hover:scale-110 transition-transform", tool.color)}>{tool.icon}</div>
                    <span className="text-xs font-black uppercase tracking-widest opacity-60 group-hover:opacity-100">{tool.name}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section >

      {/* SEO Narrative Section */}
      < section className="py-24 px-4" >
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight mb-4 leading-tight">Empowering Professionals with <br /> Precision Tools.</h2>
            <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
          </div>
          <div className="prose dark:prose-invert max-w-none text-muted-foreground font-medium text-lg leading-relaxed space-y-8">
            <p>
              In today's fast-paced economy, making the right financial and career decisions requires accurate data. Whether you're a software engineer calculating your **In-Hand Salary** in Bangalore or a freelancer estimating global income, Toolzverse provides a single source of truth.
            </p>
            <p>
              Our ecosystem handles complex taxation logic (Old vs New Regime), investment growth (Power of SIP), and healthy living (BMI & Hydration) with zero data tracking. Every calculation happens on your device, ensuring total privacy.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-20">
            <div className="p-10 rounded-[2.5rem] glass shadow-lg">
              <h3 className="text-xl font-black font-display mb-4 flex items-center gap-3"><BarChart3 className="text-primary" /> Financial Precision</h3>
              <p className="text-muted-foreground font-medium text-sm leading-relaxed">Advanced mathematical models for EMI, Mortgage, and Inflation, ensuring your wealth management is always on point.</p>
            </div>
            <div className="p-10 rounded-[2.5rem] glass shadow-lg">
              <h3 className="text-xl font-black font-display mb-4 flex items-center gap-3"><Activity className="text-primary" /> Holistic Wellness</h3>
              <p className="text-muted-foreground font-medium text-sm leading-relaxed">Integrate health into your routine with metabolic tools that calculate BMR, TDEE, and daily nutritional requirements.</p>
            </div>
          </div>
        </div>
      </section >
    </div >
  );
}
