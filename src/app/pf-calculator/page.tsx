"use client";

import { useState, useEffect } from "react";
import CalculatorLayout from "@/components/calculator/CalculatorLayout";
import { InputField, ResultCard } from "@/components/ui/CalculatorUI";
import { calculatePF } from "@/lib/calculators";
import { formatCurrency } from "@/lib/utils";

export default function PFCalculator() {
    const [basic, setBasic] = useState<number>(50000);
    const [results, setResults] = useState<any>(null);

    useEffect(() => {
        setResults(calculatePF(basic));
    }, [basic]);

    return (
        <CalculatorLayout title="PF Calculator" description="Calculate monthly EPF contributions for employer and employee.">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6 p-8 rounded-3xl border bg-card/50"><InputField label="Monthly Basic Salary" id="basic" value={basic} onChange={(v) => setBasic(Number(v))} prefix="₹" /></div>
                <div className="space-y-6">
                    <ResultCard label="Total Monthly PF" value={results ? formatCurrency(results.total) : "₹0"} variant="primary" />
                    <div className="grid grid-cols-2 gap-4">
                        <ResultCard label="Employee (12%)" value={results ? formatCurrency(results.employeeContrib) : "₹0"} />
                        <ResultCard label="Employer (12%)" value={results ? formatCurrency(results.employerContrib) : "₹0"} />
                    </div>
                </div>
            </div>
        </CalculatorLayout>
    );
}
