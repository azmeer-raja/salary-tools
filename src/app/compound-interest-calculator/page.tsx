"use client";

import { useState, useEffect } from "react";
import CalculatorLayout from "@/components/calculator/CalculatorLayout";
import { InputField, ResultCard } from "@/components/ui/CalculatorUI";
import { calculateCompoundInterest, formatCurrency } from "@/lib/calculators";
import { Zap, PiggyBank, Target } from "lucide-react";

export default function CompoundInterestCalculator() {
    const [principal, setPrincipal] = useState(100000);
    const [rate, setRate] = useState(8);
    const [years, setYears] = useState(5);
    const [frequency, setFrequency] = useState(1);
    const [maturityAmount, setMaturityAmount] = useState(0);

    useEffect(() => {
        const res = calculateCompoundInterest(principal, rate, years, frequency);
        setMaturityAmount(res);
    }, [principal, rate, years, frequency]);

    return (
        <CalculatorLayout
            title="Compound Interest Calculator"
            description="Calculate how your money grows exponentially with compound interest over time."
            icon={<Zap className="text-primary" />}
        >
            <div className="space-y-6">
                <InputField
                    label="Principal Amount"
                    id="principal"
                    value={principal}
                    onChange={(v) => setPrincipal(Number(v))}
                    prefix="₹"
                />
                <InputField
                    label="Annual Interest Rate"
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
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-muted-foreground ml-1">Compounding Frequency</label>
                    <select
                        className="w-full h-12 rounded-xl border bg-background px-4 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                        value={frequency}
                        onChange={(e) => setFrequency(Number(e.target.value))}
                    >
                        <option value={1}>Annually</option>
                        <option value={2}>Half-Yearly</option>
                        <option value={4}>Quarterly</option>
                        <option value={12}>Monthly</option>
                    </select>
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-primary/5 rounded-3xl p-8 border border-primary/10">
                    <p className="text-sm font-bold text-primary mb-1 uppercase tracking-wider">Maturity Value</p>
                    <p className="text-4xl md:text-5xl font-black text-primary">
                        {formatCurrency(maturityAmount)}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <ResultCard
                        label="Total Interest"
                        value={formatCurrency(maturityAmount - principal)}
                        icon={<PiggyBank size={16} />}
                    />
                    <ResultCard
                        label="Investment Goal"
                        value={formatCurrency(principal * 2)}
                        icon={<Target size={16} />}
                        description="Double your money estimate"
                    />
                </div>
            </div>
        </CalculatorLayout>
    );
}
