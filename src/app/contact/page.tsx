import LegalLayout from "@/components/layout/LegalLayout";

export default function ContactPage() {
    return (
        <LegalLayout title="Contact Us">
            <p>Have questions or feedback? We'd love to hear from you.</p>
            <div className="bg-card border p-8 rounded-2xl shadow-sm mt-8">
                <form className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-bold">Name</label>
                        <input type="text" className="w-full h-12 rounded-xl border bg-background px-4" placeholder="Your Name" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold">Email</label>
                        <input type="email" className="w-full h-12 rounded-xl border bg-background px-4" placeholder="your@email.com" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold">Message</label>
                        <textarea className="w-full rounded-xl border bg-background px-4 py-3 min-h-[150px]" placeholder="How can we help?"></textarea>
                    </div>
                    <button type="button" className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl">Send Message</button>
                </form>
            </div>
        </LegalLayout>
    );
}
