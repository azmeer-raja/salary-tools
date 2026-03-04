import Link from "next/link";
import AdSlot from "@/components/ads/AdSlot";
import { ChevronRight, Calendar, User, Clock } from "lucide-react";

interface BlogLayoutProps {
    title: string;
    description: string;
    publishDate: string;
    author: string;
    readTime: string;
    children: React.ReactNode;
}

export default function BlogLayout({ title, description, publishDate, author, readTime, children }: BlogLayoutProps) {
    return (
        <article className="container px-4 py-8 md:py-16">
            <div className="max-w-4xl mx-auto">
                {/* Breadcrumbs */}
                <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <ChevronRight size={14} />
                    <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
                    <ChevronRight size={14} />
                    <span className="truncate">{title}</span>
                </nav>

                <header className="mb-12">
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">{title}</h1>
                    <p className="text-xl text-muted-foreground mb-8 italic">{description}</p>

                    <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-y py-4">
                        <div className="flex items-center gap-2"><Calendar size={16} /> {publishDate}</div>
                        <div className="flex items-center gap-2"><User size={16} /> {author}</div>
                        <div className="flex items-center gap-2"><Clock size={16} /> {readTime} read</div>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8">
                        <div className="prose dark:prose-invert prose-lg max-w-none prose-primary prose-headings:font-extrabold prose-p:leading-relaxed prose-a:text-primary">
                            {children}
                        </div>
                        <AdSlot slot="4567890123" className="mt-12" />
                    </div>

                    <aside className="lg:col-span-4 space-y-8">
                        <div className="p-6 rounded-2xl border bg-card sticky top-24">
                            <h3 className="font-bold mb-4">Related Calculators</h3>
                            <ul className="space-y-3">
                                <li><Link href="/in-hand-salary-calculator" className="text-sm hover:text-primary transition-colors border-b pb-2 block">In-Hand Salary Calculator</Link></li>
                                <li><Link href="/income-tax-calculator" className="text-sm hover:text-primary transition-colors border-b pb-2 block">Income Tax Estimator</Link></li>
                                <li><Link href="/salary-hike-calculator" className="text-sm hover:text-primary transition-colors border-b pb-2 block">Salary Hike Calculator</Link></li>
                            </ul>
                            <div className="mt-8 bg-primary/5 p-4 rounded-xl border border-primary/10">
                                <p className="text-xs font-bold uppercase tracking-wider mb-2">Pro Tip</p>
                                <p className="text-sm text-muted-foreground italic">Use our Career Tools to estimate notice periods and relocation costs before accepting an offer.</p>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </article>
    );
}
