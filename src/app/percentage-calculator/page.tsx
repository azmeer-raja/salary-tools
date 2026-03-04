"use client";

import { useState, useEffect } from "react";
import CalculatorLayout from "@/components/calculator/CalculatorLayout";
import { InputField, ResultCard } from "@/components/ui/CalculatorUI";
import { calculatePercentage, formatCurrency } from "@/lib/calculators";
import { Percent, Hash, Calculator } from "lucide-react";

export default function PercentageCalculator() {
    const [total, setTotal] = useState(1000);
    const [percent, setPercent] = useState(20);
    const [result, setResult] = useState(0);

    useEffect(() => {
        setResult(calculatePercentage(total, percent));
    }, [total, percent]);

    return (
        <CalculatorLayout
            title="Percentage Calculator"
            description="Quickly calculate percentages, find values from percentages, and solve percentage problems."
            icon={<Percent className="text-primary" />}
        >
            <div className="space-y-6">
                <InputField
                    label="What is"
                    id="percent"
                    value={percent}
                    onChange={(v) => setPercent(Number(v))}
                    suffix="%"
                />
                <InputField
                    label="Of (Total Value)"
                    id="total"
                    value={total}
                    onChange={(v) => setTotal(Number(v))}
                    prefix="#"
                />
            </div>

            <div className="space-y-6">
                <div className="bg-primary/5 rounded-3xl p-8 border border-primary/10">
                    <p className="text-sm font-bold text-primary mb-1 uppercase tracking-wider">Result</p>
                    <p className="text-4xl md:text-5xl font-black text-primary">
                        {result}
                    </p>
                    <p className="mt-2 text-lg font-bold text-muted-foreground italic">
                        {percent}% of {total} is {result}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <ResultCard
                        label="Total after (+) "
                        value={(total + result).toString()}
                        icon={<Hash size={16} />}
                        description="Value + Percentage"
                    />
                    <ResultCard
                        label="Total after (-) "
                        value={(total - result).toString()}
                        icon={<Calculator size={16} />}
                        variant="primary"
                        description="Value - Percentage"
                    />
                </div>
            </div>
        </CalculatorLayout>
    );
}
