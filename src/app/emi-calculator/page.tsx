"use client";

import { useState, useEffect } from "react";
import CalculatorLayout from "@/components/calculator/CalculatorLayout";
import { InputField, ResultCard } from "@/components/ui/CalculatorUI";
import { calculateEMI } from "@/lib/calculators";
import { formatCurrency } from "@/lib/utils";
import { BarChart3 } from "lucide-react";

export default function EMICalculator() {
    const [loan, setLoan] = useState<number>(5000000);
    const [rate, setRate] = useState<number>(8.5);
    const [tenure, setTenure] = useState<number>(20);
    const [results, setResults] = useState<any>(null);

    useEffect(() => {
        const res = calculateEMI(loan, rate, tenure);
        setResults(res);
    }, [loan, rate, tenure]);

    return (
        <CalculatorLayout
            title="EMI Calculator"
            description="Plan your home, car, or personal loan monthly payments with interest breakdown."
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6 p-8 rounded-3xl border bg-card/50 shadow-sm">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <BarChart3 size={20} className="text-primary" />
                        Loan Details
                    </h2>

                    <InputField label="Loan Amount" id="loan" value={loan} onChange={(v) => setLoan(Number(v))} prefix="₹" />
                    <InputField label="Interest Rate (Annual)" id="rate" value={rate} onChange={(v) => setRate(Number(v))} suffix="%" />
                    <InputField label="Tenure (Years)" id="tenure" value={tenure} onChange={(v) => setTenure(Number(v))} suffix="Y" />
                </div>

                <div className="space-y-6">
                    <ResultCard
                        label="Monthly EMI"
                        value={results ? formatCurrency(results.emi) : "₹0"}
                        variant="primary"
                        description="Principal + Interest per month"
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <ResultCard label="Total Interest" value={results ? formatCurrency(results.totalInterest) : "₹0"} />
                        <ResultCard label="Total Payment" value={results ? formatCurrency(results.totalPayment) : "₹0"} />
                    </div>

                    <div className="p-8 rounded-3xl border bg-muted/30">
                        <h3 className="font-bold mb-4">Loan Distribution</h3>
                        <div className="w-full h-4 bg-muted rounded-full overflow-hidden flex">
                            <div className="h-full bg-primary" style={{ width: `${results ? (loan / results.totalPayment) * 100 : 50}%` }}></div>
                            <div className="h-full bg-primary/30" style={{ width: `${results ? (results.totalInterest / results.totalPayment) * 100 : 50}%` }}></div>
                        </div>
                        <div className="flex justify-between mt-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-primary rounded-full"></div> Principal</div>
                            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-primary/30 rounded-full"></div> Interest</div>
                        </div>
                    </div>
                </div>
            </div>
        </CalculatorLayout>
    );
}
