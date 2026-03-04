"use client";

import { useState, useEffect } from "react";
import CalculatorLayout from "@/components/calculator/CalculatorLayout";
import { InputField, ResultCard } from "@/components/ui/CalculatorUI";
import { calculateInHandSalary, SalaryBreakdown } from "@/lib/calculators";
import { formatCurrency } from "@/lib/utils";
import { PieChart, Share2, Copy, History } from "lucide-react";

export default function InHandSalaryCalculator() {
    const [ctc, setCtc] = useState<number>(1200000);
    const [bonus, setBonus] = useState<number>(0);
    const [pf, setPf] = useState<number>(12);
    const [regime, setRegime] = useState<'old' | 'new'>('new');
    const [results, setResults] = useState<SalaryBreakdown | null>(null);

    useEffect(() => {
        const res = calculateInHandSalary(ctc, bonus, pf, 200, regime);
        setResults(res);
    }, [ctc, bonus, pf, regime]);

    const handleCopy = () => {
        if (!results) return;
        const text = `Monthly In-Hand: ${formatCurrency(results.monthlyTakeHome)}\nAnnual CTC: ${formatCurrency(ctc)}`;
        navigator.clipboard.writeText(text);
        alert("Results copied to clipboard!");
    };

    return (
        <CalculatorLayout
            title="In-Hand Salary Calculator"
            description="Estimate your monthly take-home salary after PF, Professional Tax, and Income Tax deductions for FY 2024-25."
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Input Panel */}
                <div className="space-y-6 p-8 rounded-3xl border bg-card/50 shadow-sm">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <PieChart size={20} className="text-primary" />
                        Salary Details
                    </h2>

                    <InputField
                        label="Annual CTC"
                        id="ctc"
                        value={ctc}
                        onChange={(v) => setCtc(Number(v))}
                        prefix="₹"
                    />

                    <InputField
                        label="Bonus / Variable (Annual)"
                        id="bonus"
                        value={bonus}
                        onChange={(v) => setBonus(Number(v))}
                        prefix="₹"
                    />

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-muted-foreground ml-1">Tax Regime</label>
                        <div className="flex p-1 rounded-xl bg-muted gap-1">
                            <button
                                onClick={() => setRegime('new')}
                                className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${regime === 'new' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground'}`}
                            >
                                New Regime
                            </button>
                            <button
                                onClick={() => setRegime('old')}
                                className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${regime === 'old' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground'}`}
                            >
                                Old Regime
                            </button>
                        </div>
                    </div>

                    <InputField
                        label="PF Contribution (Employee %)"
                        id="pf"
                        value={pf}
                        onChange={(v) => setPf(Number(v))}
                        suffix="%"
                    />
                </div>

                {/* Output Panel */}
                <div className="space-y-6">
                    <ResultCard
                        label="Monthly Take Home"
                        value={results ? formatCurrency(results.monthlyTakeHome) : "₹0"}
                        variant="primary"
                        description="Estimated net salary after all deductions"
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <ResultCard label="Monthly Gross" value={results ? formatCurrency(results.monthlyGross) : "₹0"} />
                        <ResultCard label="Monthly TDS (Tax)" value={results ? formatCurrency(results.monthlyTax) : "₹0"} />
                        <ResultCard label="Monthly PF" value={results ? formatCurrency(results.monthlyPF) : "₹0"} />
                        <ResultCard label="Monthly PT" value={results ? formatCurrency(200) : "₹0"} />
                    </div>

                    <div className="flex gap-4">
                        <button onClick={handleCopy} className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl border font-bold hover:bg-muted transition-colors">
                            <Copy size={18} /> Copy Result
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl border font-bold hover:bg-muted transition-colors">
                            <Share2 size={18} /> Share
                        </button>
                    </div>
                </div>
            </div>
        </CalculatorLayout>
    );
}
