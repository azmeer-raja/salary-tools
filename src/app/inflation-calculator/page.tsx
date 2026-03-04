"use client";

import { useState, useEffect } from "react";
import CalculatorLayout from "@/components/calculator/CalculatorLayout";
import { InputField, ResultCard } from "@/components/ui/CalculatorUI";
import { formatCurrency } from "@/lib/utils";
import { TrendingUp, Wallet, ArrowRight } from "lucide-react";

export default function InflationCalculator() {
    const [amount, setAmount] = useState(100000);
    const [rate, setRate] = useState(6);
    const [years, setYears] = useState(10);
    const [futureValue, setFutureValue] = useState(0);

    useEffect(() => {
        const res = amount * Math.pow(1 + rate / 100, years);
        setFutureValue(res);
    }, [amount, rate, years]);

    return (
        <CalculatorLayout
            title="Inflation Calculator"
            description="See how the purchasing power of your money changes over time due to inflation."
            icon={<TrendingUp className="text-destructive" />}
        >
            <div className="space-y-6">
                <InputField
                    label="Current Amount"
                    id="amount"
                    value={amount}
                    onChange={(v) => setAmount(Number(v))}
                    prefix="₹"
                />
                <InputField
                    label="Inflation Rate (p.a)"
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
                <div className="bg-destructive/5 rounded-3xl p-8 border border-destructive/10 text-center">
                    <p className="text-sm font-bold text-destructive mb-1 uppercase tracking-wider">Future Cost of Buying the Same</p>
                    <p className="text-4xl md:text-5xl font-black text-destructive">
                        {formatCurrency(futureValue)}
                    </p>
                    <p className="mt-2 text-lg font-bold text-muted-foreground italic">
                        In {years} years
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <ResultCard
                        label="Purchasing Power"
                        value={formatCurrency(amount * (amount / futureValue))}
                        icon={<Wallet size={16} />}
                        description="Value in today's terms"
                    />
                    <ResultCard
                        label="Total Increase"
                        value={formatCurrency(futureValue - amount)}
                        icon={<ArrowRight size={16} />}
                        variant="primary"
                    />
                </div>
            </div>
        </CalculatorLayout>
    );
}
