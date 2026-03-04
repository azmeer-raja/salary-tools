"use client";

import { useState, useEffect } from "react";
import CalculatorLayout from "@/components/calculator/CalculatorLayout";
import { InputField, ResultCard } from "@/components/ui/CalculatorUI";
import { calculateEMI, formatCurrency } from "@/lib/calculators";
import { Home, Landmark, Calculator } from "lucide-react";

export default function MortgageCalculator() {
    const [amount, setAmount] = useState(5000000);
    const [rate, setRate] = useState(8.5);
    const [tenure, setTenure] = useState(20);
    const [results, setResults] = useState<any>(null);

    useEffect(() => {
        const res = calculateEMI(amount, rate, tenure);
        setResults(res);
    }, [amount, rate, tenure]);

    return (
        <CalculatorLayout
            title="Mortgage Calculator"
            description="Estimate your monthly mortgage payments and total interest costs for your dream home."
            icon={<Home className="text-primary" />}
        >
            <div className="space-y-6">
                <InputField
                    label="Home Loan Amount"
                    id="amount"
                    value={amount}
                    onChange={(v) => setAmount(Number(v))}
                    prefix="₹"
                />
                <InputField
                    label="Interest Rate"
                    id="rate"
                    value={rate}
                    onChange={(v) => setRate(Number(v))}
                    suffix="%"
                    step="0.1"
                />
                <InputField
                    label="Tenure (Years)"
                    id="tenure"
                    value={tenure}
                    onChange={(v) => setTenure(Number(v))}
                    suffix="Yrs"
                />
            </div>

            <div className="space-y-6">
                <div className="bg-primary/5 rounded-3xl p-8 border border-primary/10">
                    <p className="text-sm font-bold text-primary mb-1 uppercase tracking-wider">Monthly Mortgage Payment</p>
                    <p className="text-4xl md:text-5xl font-black text-primary">
                        {results ? formatCurrency(results.emi) : "₹0"}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <ResultCard
                        label="Total Interest"
                        value={results ? formatCurrency(results.totalInterest) : "₹0"}
                        icon={<Landmark size={16} />}
                    />
                    <ResultCard
                        label="Total Payment"
                        value={results ? formatCurrency(results.totalPayment) : "₹0"}
                        icon={<Calculator size={16} />}
                        variant="primary"
                    />
                </div>
            </div>
        </CalculatorLayout>
    );
}
