"use client";

import { useState, useEffect } from "react";
import CalculatorLayout from "@/components/calculator/CalculatorLayout";
import { InputField, ResultCard } from "@/components/ui/CalculatorUI";
import { formatCurrency } from "@/lib/utils";
import { ShieldCheck, ArrowRightLeft } from "lucide-react";

export default function IncomeTaxCalculator() {
    const [income, setIncome] = useState<number>(1000000);
    const [deductions, setDeductions] = useState<number>(150000); // 80C etc
    const [hra, setHra] = useState<number>(0);

    // Revised tax calculation Logic for Income Tax Page
    const calculateTax = (amount: number, isNew: boolean) => {
        let taxable = isNew ? (amount - 75000) : (amount - 50000 - deductions - hra);
        taxable = Math.max(0, taxable);

        let tax = 0;
        if (isNew) {
            // New Regime FY 24-25
            if (taxable <= 700000) return 0;
            if (taxable > 1500000) tax += (taxable - 1500000) * 0.3 + 150000;
            else if (taxable > 1200000) tax += (taxable - 1200000) * 0.2 + 90000;
            else if (taxable > 1000000) tax += (taxable - 1000000) * 0.15 + 60000;
            else if (taxable > 700000) tax += (taxable - 700000) * 0.1 + 30000;
            else if (taxable > 300000) tax += (taxable - 300000) * 0.05;
        } else {
            // Old Regime
            if (taxable > 1000000) tax += (taxable - 1000000) * 0.3 + 112500;
            else if (taxable > 500000) tax += (taxable - 500000) * 0.2 + 12500;
            else if (taxable > 250000) tax += (taxable - 250000) * 0.05;

            if (taxable <= 500000) tax = 0;
        }

        return tax * 1.04; // Plus 4% cess
    };

    const newTax = calculateTax(income, true);
    const oldTax = calculateTax(income, false);
    const savings = Math.abs(newTax - oldTax);
    const recommendation = newTax < oldTax ? "New Regime" : "Old Regime";

    return (
        <CalculatorLayout
            title="Income Tax Calculator"
            description="Compare Old vs New Tax Regimes for FY 2024-25 and see how much you can save with deductions."
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6 p-8 rounded-3xl border bg-card/50 shadow-sm">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <ShieldCheck size={20} className="text-primary" />
                        Income & Deductions
                    </h2>

                    <InputField label="Total Annual Income" id="income" value={income} onChange={(v) => setIncome(Number(v))} prefix="₹" />
                    <InputField label="Section 80C Deductions" id="80c" value={deductions} onChange={(v) => setDeductions(Number(v))} prefix="₹" />
                    <InputField label="HRA Exemption" id="hra" value={hra} onChange={(v) => setHra(Number(v))} prefix="₹" />

                    <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-sm">
                        <p className="font-bold text-primary mb-1">Recommendation:</p>
                        <p>Based on your inputs, the <strong>{recommendation}</strong> is better for you. You save <strong>{formatCurrency(savings)}</strong> annually.</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ResultCard
                            label="New Regime Tax"
                            value={formatCurrency(newTax)}
                            variant={newTax <= oldTax ? "primary" : "default"}
                            description={`Monthly TDS: ${formatCurrency(newTax / 12)}`}
                        />
                        <ResultCard
                            label="Old Regime Tax"
                            value={formatCurrency(oldTax)}
                            variant={oldTax < newTax ? "primary" : "default"}
                            description={`Monthly TDS: ${formatCurrency(oldTax / 12)}`}
                        />
                    </div>

                    <div className="p-8 rounded-3xl border bg-muted/30">
                        <h3 className="font-bold flex items-center gap-2 mb-4">
                            <ArrowRightLeft size={18} /> Breakdown
                        </h3>
                        <div className="space-y-4 text-sm">
                            <div className="flex justify-between pb-2 border-b">
                                <span className="text-muted-foreground">Standard Deduction (New)</span>
                                <span className="font-bold">₹75,000</span>
                            </div>
                            <div className="flex justify-between pb-2 border-b">
                                <span className="text-muted-foreground">Standard Deduction (Old)</span>
                                <span className="font-bold">₹50,000</span>
                            </div>
                            <div className="flex justify-between pb-2 border-b">
                                <span className="text-muted-foreground">Investment Potential (80C)</span>
                                <span className="font-bold">Up to ₹1.5L (Old Only)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CalculatorLayout>
    );
}
