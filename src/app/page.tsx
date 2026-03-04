"use client";

import Link from "next/link";
import {
  Calculator, Briefcase, TrendingUp, ShieldCheck, Zap,
  BarChart3, ChevronRight, Heart, Activity, Code, GraduationCap,
  Banknote, Target, ArrowRight, Star, Sparkles, Plus
} from "lucide-react";
import AdSlot from "@/components/ads/AdSlot";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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
  }
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-primary/20 text-primary text-xs font-black mb-10 tracking-[0.2em] uppercase"
          >
            <Sparkles size={14} /> The Future of Utilities is Here
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9] font-display"
          >
            Calculate with <br />
            <span className="text-primary italic">Intelligence.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 font-medium tracking-tight leading-relaxed opacity-80"
          >
            Professional-grade tools for finance, tax, health, and development.
            Built for precision, speed, and absolute privacy.
          </motion.p>

          {/* Tool Carousel Section */}
          <div className="relative w-full overflow-hidden py-10 mb-12">
            <div className="flex flex-col gap-6">
              {[0, 1].map((row) => (
                <div key={row} className="flex gap-6 whitespace-nowrap animate-marquee group">
                  <div className={cn("flex gap-6", row === 1 ? "animate-marquee-reverse" : "animate-marquee")}>
                    {[...Array(2)].map((_, i) => (
                      <div key={i} className="flex gap-6">
                        {toolCategories[row].items.concat(toolCategories[row + 2]?.items || []).map((tool) => (
                          <Link
                            key={tool.name}
                            href={tool.href}
                            className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl glass border-primary/5 hover:border-primary/20 hover:bg-primary/5 transition-all group/tool shadow-sm"
                          >
                            <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary group-hover/tool:scale-110 transition-transform">
                              <Target size={14} />
                            </div>
                            <span className="text-sm font-black tracking-tight">{tool.name}</span>
                            <ArrowRight size={12} className="opacity-0 group-hover/tool:opacity-100 -translate-x-2 group-hover/tool:translate-x-0 transition-all text-primary" />
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {/* Fade Gradients */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <Link
              href="/in-hand-salary-calculator"
              className="h-16 px-10 rounded-2xl premium-gradient text-white font-black flex items-center gap-3 shadow-2xl shadow-primary/30 hover:-translate-y-1 transition-all"
            >
              Start Calculating <ChevronRight size={20} />
            </Link>
            <Link
              href="/income-tax-calculator"
              className="h-16 px-10 rounded-2xl glass font-bold flex items-center gap-3 hover:bg-secondary/50 transition-all border"
            >
              Tax Estimator
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-20 flex flex-wrap justify-center gap-10 opacity-40 grayscale pointer-events-none"
          >
            <div className="flex items-center gap-2 font-black text-sm uppercase tracking-widest"><Star size={16} /> Trusted by Professionals</div>
            <div className="flex items-center gap-2 font-black text-sm uppercase tracking-widest"><ShieldCheck size={16} /> Privacy Guaranteed</div>
            <div className="flex items-center gap-2 font-black text-sm uppercase tracking-widest"><Zap size={16} /> Real-time Processing</div>
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
      </section>

      {/* Featured Viral Tools (Glass Bento) */}
      <section className="py-32 px-4 relative overflow-hidden">
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
      </section>

      {/* SEO Narrative Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight mb-4 leading-tight">Empowering Professionals with <br /> Precision Tools.</h2>
            <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
          </div>
          <div className="prose dark:prose-invert max-w-none text-muted-foreground font-medium text-lg leading-relaxed space-y-8">
            <p>
              In today's fast-paced economy, making the right financial and career decisions requires accurate data. Whether you're a software engineer calculating your **In-Hand Salary** in Bangalore or a freelancer estimating global income, CalcyRaja provides a single source of truth.
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
      </section>
    </div>
  );
}
