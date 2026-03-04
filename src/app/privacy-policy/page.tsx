import LegalLayout from "@/components/layout/LegalLayout";

export default function PrivacyPolicy() {
    return (
        <LegalLayout title="Privacy Policy">
            <p>Last Updated: March 4, 2024</p>
            <p>At Toolzverse, we prioritize your privacy. This policy outlines how we handle data.</p>
            <h2>Data Collection</h2>
            <p>We do not store any of your financial data (salaries, taxes, loan amounts). All calculations are performed on the client-side using JavaScript.</p>
            <h2>Third-Party Services</h2>
            <p>We use Google AdSense to serve ads and Google Analytics to monitor traffic. These services may use cookies to improve user experience.</p>
            <h2>Contact Us</h2>
            <p>If you have questions, please reach out via our Contact page.</p>
        </LegalLayout>
    );
}
