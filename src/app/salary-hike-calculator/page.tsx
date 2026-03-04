"use client";

import { useState, useEffect } from "react";
import CalculatorLayout from "@/components/calculator/CalculatorLayout";
import { InputField, ResultCard } from "@/components/ui/CalculatorUI";
import { calculateSalaryHike } from "@/lib/calculators";
import { formatCurrency } from "@/lib/utils";
import { TrendingUp } from "lucide-react";

export default function SalaryHikeCalculator() {
    const [current, setCurrent] = useState<number>(1000000);
    const [hikePercent, setHikePercent] = useState<number>(15);
    const [results, setResults] = useState<any>(null);

    useEffect(() => {
        setResults(calculateSalaryHike(current, hikePercent));
    }, [current, hikePercent]);

    return (
        <CalculatorLayout
            title="Salary Hike Calculator"
            description="Calculate your new salary, monthly increase, and annual difference after a hike or appraisal."
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6 p-8 rounded-3xl border bg-card/50 shadow-sm">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <TrendingUp size={20} className="text-primary" />
                        Salary Appraisal
                    </h2>

                    <InputField label="Current Annual Salary" id="current" value={current} onChange={(v) => setCurrent(Number(v))} prefix="₹" />
                    <InputField label="Expected Hike Percentage" id="hike" value={hikePercent} onChange={(v) => setHikePercent(Number(v))} suffix="%" />
                </div>

                <div className="space-y-6">
                    <ResultCard
                        label="New Annual Salary"
                        value={results ? formatCurrency(results.newSalary) : "₹0"}
                        variant="primary"
                        description="Post-hike total annual compensation"
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <ResultCard label="Monthly Increase" value={results ? formatCurrency(results.monthlyIncrease) : "₹0"} />
                        <ResultCard label="Annual Hike Amount" value={results ? formatCurrency(results.hikeAmount) : "₹0"} />
                    </div>

                    <div className="p-8 rounded-3xl border bg-muted/30 italic text-sm text-muted-foreground">
                        <p>Useful for salary negotiations and appraisal discussions. This calculation is based on the gross amount and before any tax or PF deductions.</p>
                    </div>
                </div>
            </div>
        </CalculatorLayout>
    );
}
