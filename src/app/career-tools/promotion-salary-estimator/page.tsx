"use client";

import { useState, useEffect } from "react";
import CalculatorLayout from "@/components/calculator/CalculatorLayout";
import { InputField, ResultCard } from "@/components/ui/CalculatorUI";
import { formatCurrency } from "@/lib/utils";
import { TrendingUp } from "lucide-react";

export default function PromotionSalaryEstimator() {
    const [current, setCurrent] = useState<number>(1000000);
    const [multiplier, setMultiplier] = useState<number>(1.3); // 30% jump
    const [promotionResults, setPromotionResults] = useState<any>(null);

    useEffect(() => {
        const newSal = current * multiplier;
        setPromotionResults({
            newSalary: newSal,
            increase: newSal - current,
            monthly: (newSal - current) / 12
        });
    }, [current, multiplier]);

    return (
        <CalculatorLayout
            title="Promotion Salary Estimator"
            description="Estimate your new salary after a promotion jump (Internal or External switch)."
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6 p-8 rounded-3xl border bg-card/50 shadow-sm">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <TrendingUp size={20} className="text-primary" />
                        Expectation Settings
                    </h2>

                    <InputField label="Current Annual CTC" id="current" value={current} onChange={(v) => setCurrent(Number(v))} prefix="₹" />

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-muted-foreground ml-1">Expected Jump</label>
                        <div className="grid grid-cols-3 gap-2">
                            {[1.15, 1.3, 1.5].map((m) => (
                                <button
                                    key={m}
                                    onClick={() => setMultiplier(m)}
                                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${multiplier === m ? 'bg-primary border-primary text-primary-foreground shadow-md' : 'bg-card text-muted-foreground'}`}
                                >
                                    {Math.round((m - 1) * 100)}%
                                </button>
                            ))}
                        </div>
                    </div>

                    <InputField label="Custom Multiplier" id="custom" value={multiplier} onChange={(v) => setMultiplier(Number(v))} step="0.05" />
                </div>

                <div className="space-y-6">
                    <ResultCard
                        label="Potential New CTC"
                        value={promotionResults ? formatCurrency(promotionResults.newSalary) : "₹0"}
                        variant="primary"
                        description="Estimated based on industry standard jumps"
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <ResultCard label="Annual Increase" value={promotionResults ? formatCurrency(promotionResults.increase) : "₹0"} />
                        <ResultCard label="Monthly Bump" value={promotionResults ? formatCurrency(promotionResults.monthly) : "₹0"} />
                    </div>
                </div>
            </div>
        </CalculatorLayout>
    );
}
