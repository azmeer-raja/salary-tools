"use client";

import { useState, useEffect } from "react";
import CalculatorLayout from "@/components/calculator/CalculatorLayout";
import { InputField, ResultCard } from "@/components/ui/CalculatorUI";
import { calculateSIP, formatCurrency } from "@/lib/calculators";
import { TrendingUp, DollarSign, Wallet } from "lucide-react";

export default function SIPCalculator() {
    const [investment, setInvestment] = useState(5000);
    const [rate, setRate] = useState(12);
    const [years, setYears] = useState(10);
    const [results, setResults] = useState<any>(null);

    useEffect(() => {
        const res = calculateSIP(investment, rate, years);
        setResults(res);
    }, [investment, rate, years]);

    return (
        <CalculatorLayout
            title="SIP Calculator"
            description="Estimate your wealth creation through Systematic Investment Plans (SIP) accurately."
            icon={<TrendingUp className="text-primary" />}
        >
            <div className="space-y-6">
                <InputField
                    label="Monthly Investment"
                    id="investment"
                    value={investment}
                    onChange={(v) => setInvestment(Number(v))}
                    prefix="₹"
                />
                <InputField
                    label="Expected Return Rate (p.a)"
                    id="rate"
                    value={rate}
                    onChange={(v) => setRate(Number(v))}
                    suffix="%"
                    step="0.1"
                />
                <InputField
                    label="Time Period (Years)"
                    id="years"
                    value={years}
                    onChange={(v) => setYears(Number(v))}
                    suffix="Yrs"
                />
            </div>

            <div className="space-y-6">
                <div className="bg-primary/5 rounded-3xl p-8 border border-primary/10">
                    <p className="text-sm font-bold text-primary mb-1 uppercase tracking-wider">Estimated Returns</p>
                    <p className="text-4xl md:text-5xl font-black text-primary">
                        {results ? formatCurrency(results.maturityAmount) : "₹0"}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <ResultCard
                        label="Total Invested"
                        value={results ? formatCurrency(results.investedAmount) : "₹0"}
                        icon={<Wallet size={16} />}
                    />
                    <ResultCard
                        label="Est. Returns"
                        value={results ? formatCurrency(results.totalGain) : "₹0"}
                        icon={<DollarSign size={16} />}
                        variant="primary"
                    />
                </div>
            </div>
        </CalculatorLayout>
    );
}
