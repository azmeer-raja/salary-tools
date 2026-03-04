import BlogLayout from "@/components/blog/BlogLayout";
import Script from "next/script";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Software Engineer Salary in India: The 2024 Guide",
    description: "Comprehensive guide on software engineer salaries in India by experience level, location, and technology stack.",
};

export default function BlogPost() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Software Engineer Salary in India: The 2024 Guide",
        "author": { "@type": "Person", "name": "SalaryTools Team" },
        "datePublished": "2024-02-28"
    };

    return (
        <BlogLayout
            title="Software Engineer Salary in India: The 2024 Guide"
            description="Everything you need to know about developer compensation in the world's fastest-growing tech hub."
            publishDate="February 28, 2024"
            author="SalaryTools Team"
            readTime="12 min"
        >
            <Script
                id="structured-data"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <p>Software engineering remains the bedrock of India's professional landscape. From early-stage startups to FAANG-level giants, the demand for high-quality code has driven salaries to record levels.</p>

            <h2>Salary by Experience Level</h2>
            <ul>
                <li><strong>Entry Level (0-2 years):</strong> ₹4L - ₹12L depending on the college tier and company.</li>
                <li><strong>Mid-Level (3-6 years):</strong> ₹15L - ₹35L as you specialize in frameworks and system design.</li>
                <li><strong>Senior Level (7+ years):</strong> ₹40L - ₹1Cr+ for architects and engineering managers.</li>
            </ul>

            <h2>Top Paying Tech Hubs</h2>
            <p>Bangalore, often called the Silicon Valley of India, continues to lead in compensation, followed closely by Hyderabad and Gurgaon...</p>

            <h2>The 'Skill' Premium</h2>
            <p>Full-stack developers, Cloud Architects, and Cybersecurity experts command a significant premium over traditional roles...</p>

            <p>...Detailed guide content on negotiation, top companies, and future growth...</p>
        </BlogLayout>
    );
}
