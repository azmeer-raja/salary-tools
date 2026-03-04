"use client";

import { useState, useEffect } from "react";
import CalculatorLayout from "@/components/calculator/CalculatorLayout";
import { InputField, ResultCard } from "@/components/ui/CalculatorUI";
import { formatCurrency } from "@/lib/utils";
import { Briefcase } from "lucide-react";

export default function FreelancerIncomeCalculator() {
    const [projectRate, setProjectRate] = useState<number>(50000);
    const [projectsPerMonth, setProjectsPerMonth] = useState<number>(4);
    const [expenses, setExpenses] = useState<number>(10000);
    const [results, setResults] = useState<any>(null);

    useEffect(() => {
        const gross = projectRate * projectsPerMonth;
        const net = gross - expenses;
        setResults({
            monthlyGross: gross,
            monthlyNet: net,
            annualGross: gross * 12,
            annualNet: net * 12
        });
    }, [projectRate, projectsPerMonth, expenses]);

    return (
        <CalculatorLayout
            title="Freelancer Income Calculator"
            description="Calculate your monthly and annual take-home income as a freelancer after business expenses."
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6 p-8 rounded-3xl border bg-card/50 shadow-sm">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Briefcase size={20} className="text-primary" />
                        Income & Costs
                    </h2>

                    <InputField label="Average Rate per Project" id="rate" value={projectRate} onChange={(v) => setProjectRate(Number(v))} prefix="₹" />
                    <InputField label="Projects per Month" id="projects" value={projectsPerMonth} onChange={(v) => setProjectsPerMonth(Number(v))} suffix="qty" />
                    <InputField label="Monthly Business Expenses" id="expenses" value={expenses} onChange={(v) => setExpenses(Number(v))} prefix="₹" />
                </div>

                <div className="space-y-6">
                    <ResultCard
                        label="Monthly Net Income"
                        value={results ? formatCurrency(results.monthlyNet) : "₹0"}
                        variant="primary"
                        description="Income after basic expenses"
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <ResultCard label="Annual Gross" value={results ? formatCurrency(results.annualGross) : "₹0"} />
                        <ResultCard label="Annual Net" value={results ? formatCurrency(results.annualNet) : "₹0"} />
                    </div>

                    <div className="p-8 rounded-3xl border bg-muted/30 text-sm italic text-muted-foreground">
                        <p>Note: This doesn't include tax deductions. Many freelancers in India use Section 44ADA for presumptive taxation (50% of gross as profit).</p>
                    </div>
                </div>
            </div>
        </CalculatorLayout>
    );
}
