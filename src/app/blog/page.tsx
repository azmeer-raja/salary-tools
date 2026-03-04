import Link from "next/link";
import { BookOpen, ChevronRight, TrendingUp } from "lucide-react";

const posts = [
    {
        slug: "top-high-paying-jobs-india",
        title: "Top 10 High Paying Jobs in India for 2024",
        desc: "A comprehensive guide to the most lucrative career paths in India across IT, Finance, and Management sectors.",
        date: "March 4, 2024"
    },
    {
        slug: "software-engineer-salary-india",
        title: "Software Engineer Salary in India: The 2024 Guide",
        desc: "Details on average compensation, top paying companies, and salary trends for developers at all levels.",
        date: "February 28, 2024"
    },
    {
        slug: "how-to-negotiate-salary",
        title: "How to Negotiate Your Salary as a Professional",
        desc: "Practical tips and strategies to help you secure a better package during your next appraisal or job switch.",
        date: "February 20, 2024"
    }
];

export default function BlogIndex() {
    return (
        <div className="container px-4 py-8 md:py-16">
            <div className="max-w-6xl mx-auto">
                <header className="mb-16 text-center">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                        <BookOpen size={16} className="mr-2" />
                        Career Insights
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">Salary & Career <span className="text-primary italic">Blog</span></h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Expert advice on career growth, financial planning, and the Indian job market.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {posts.map((post) => (
                        <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-col bg-card border rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-xl transition-all">
                            <div className="aspect-video bg-muted flex items-center justify-center">
                                <BookOpen size={48} className="text-muted-foreground/30 group-hover:scale-110 transition-transform" />
                            </div>
                            <div className="p-6 space-y-4">
                                <p className="text-xs font-bold text-primary uppercase tracking-widest">{post.date}</p>
                                <h2 className="text-xl font-bold group-hover:text-primary transition-colors">{post.title}</h2>
                                <p className="text-sm text-muted-foreground line-clamp-2">{post.desc}</p>
                                <div className="flex items-center text-sm font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                    Read Article <ChevronRight size={14} className="ml-1" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <section className="bg-primary/5 rounded-3xl p-12 text-center border border-primary/10">
                    <TrendingUp size={48} className="mx-auto mb-6 text-primary" />
                    <h3 className="text-2xl font-bold mb-4">Ready to calculate your future?</h3>
                    <p className="text-muted-foreground mb-8 max-w-xl mx-auto">Use our accurate tools to see how these salary trends apply to your profile.</p>
                    <Link href="/in-hand-salary-calculator" className="px-8 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:opacity-90 shadow-lg shadow-primary/20 transition-all">
                        Try Calculators
                    </Link>
                </section>
            </div>
        </div>
    );
}
