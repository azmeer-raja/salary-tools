export default function LegalLayout({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <div className="container px-4 py-16 md:py-24 max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-8">{title}</h1>
            <div className="prose dark:prose-invert max-w-none space-y-6 text-muted-foreground leading-relaxed">
                {children}
            </div>
        </div>
    );
}
