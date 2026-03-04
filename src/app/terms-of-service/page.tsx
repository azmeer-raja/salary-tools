import LegalLayout from "@/components/layout/LegalLayout";

export default function TermsOfService() {
    return (
        <LegalLayout title="Terms of Service">
            <p>By using SalaryTools, you agree to the following terms:</p>
            <h2>Acceptable Use</h2>
            <p>Users must use the calculators for informational purposes only. Do not attempt to reverse engineer or scrape content from this site.</p>
            <h2>Liability</h2>
            <p>SalaryTools is not responsible for any financial decisions made based on the results of these calculators.</p>
        </LegalLayout>
    );
}
