"use client";

import { useState, useEffect } from "react";
import CalculatorLayout from "@/components/calculator/CalculatorLayout";
import { InputField, ResultCard } from "@/components/ui/CalculatorUI";
import { formatCurrency } from "@/lib/utils";
import { MapPin } from "lucide-react";

export default function CostOfLivingCalculator() {
    const [currentExpense, setCurrentExpense] = useState<number>(50000);
    const [currentTier, setCurrentTier] = useState<number>(1); // Index 0,1,2
    const [targetTier, setTargetTier] = useState<number>(2);

    const tiers = [
        { name: "Tier 1 (Metro)", factor: 1.0 },
        { name: "Tier 2 (City)", factor: 0.7 },
        { name: "Tier 3 (Town)", factor: 0.5 }
    ];

    const calculateRequired = () => {
        const baseExpense = currentExpense / tiers[currentTier].factor;
        return baseExpense * tiers[targetTier].factor;
    };

    const targetExpense = calculateRequired();

    return (
        <CalculatorLayout
            title="Cost of Living Calculator"
            description="Compare living expenses between different city tiers in India to plan your relocation or job switch."
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6 p-8 rounded-3xl border bg-card/50 shadow-sm">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <MapPin size={20} className="text-primary" />
                        City Relocation
                    </h2>

                    <InputField label="Current Monthly Expense" id="expense" value={currentExpense} onChange={(v) => setCurrentExpense(Number(v))} prefix="₹" />

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-muted-foreground ml-1">Current City Tier</label>
                        <div className="grid grid-cols-3 gap-2">
                            {tiers.map((t, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentTier(idx)}
                                    className={`py-2 rounded-xl text-[10px] font-bold border transition-all ${currentTier === idx ? 'bg-primary border-primary text-primary-foreground' : 'bg-card'}`}
                                >
                                    {t.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-muted-foreground ml-1">Target City Tier</label>
                        <div className="grid grid-cols-3 gap-2">
                            {tiers.map((t, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setTargetTier(idx)}
                                    className={`py-2 rounded-xl text-[10px] font-bold border transition-all ${targetTier === idx ? 'bg-primary border-primary text-primary-foreground' : 'bg-card'}`}
                                >
                                    {t.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <ResultCard
                        label="Required Monthly Income"
                        value={formatCurrency(targetExpense)}
                        variant="primary"
                        description={`To maintain same lifestyle in ${tiers[targetTier].name}`}
                    />

                    <div className="p-8 rounded-3xl border bg-muted/30 text-sm text-muted-foreground">
                        <p>Relocating for a higher salary doesn't always mean more savings. A 30% hike moving from Tier 2 to Tier 1 might actually result in less disposable income due to higher rent and travel costs.</p>
                    </div>
                </div>
            </div>
        </CalculatorLayout>
    );
}
