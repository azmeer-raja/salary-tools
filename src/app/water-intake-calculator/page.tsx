"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import { useState, useEffect } from "react";
import CalculatorLayout from "@/components/calculator/CalculatorLayout";
import { InputField, ResultCard } from "@/components/ui/CalculatorUI";
import { Droplet, GlassWater, Zap } from "lucide-react";

export default function WaterIntakeCalculator() {
    const [weight, setWeight] = useState(70);
    const [activity, setActivity] = useState(30); // minutes of exercise
    const [liters, setLiters] = useState(0);

    useEffect(() => {
        // Base intake: 33ml per kg
        // Activity: 350ml for every 30 mins of exercise
        const base = weight * 0.033;
        const extra = (activity / 30) * 0.35;
        setLiters(Number((base + extra).toFixed(2)));
    }, [weight, activity]);

    return (
        <CalculatorLayout
            title="Water Intake Calculator"
            description="Stay hydrated. Calculate how much water you should drink daily based on your weight and activity levels."
            icon={<Droplet className="text-lime-500" />}
        >
            <div className="space-y-6">
                <InputField
                    label="Weight (kg)"
                    id="weight"
                    value={weight}
                    onChange={(v) => setWeight(Number(v))}
                    suffix="kg"
                />
                <InputField
                    label="Daily Exercise (Minutes)"
                    id="activity"
                    value={activity}
                    onChange={(v) => setActivity(Number(v))}
                    suffix="min"
                />
            </div>

            <div className="space-y-6">
                <div className="bg-lime-500/5 rounded-3xl p-8 border border-lime-500/10 text-center">
                    <p className="text-sm font-bold text-lime-500 mb-1 uppercase tracking-wider">Recommended Daily Intake</p>
                    <p className="text-5xl md:text-6xl font-black text-lime-600 dark:text-lime-400">
                        {liters} Liters
                    </p>
                    <p className="mt-2 text-lg font-bold text-muted-foreground italic">
                        (~{Math.round(liters * 4)} glasses of 250ml)
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <ResultCard
                        label="Base Hydration"
                        value={`${(weight * 0.033).toFixed(1)} L`}
                        icon={<GlassWater size={16} className="text-lime-500" />}
                    />
                    <ResultCard
                        label="Activity Bonus"
                        value={`${((activity / 30) * 0.35).toFixed(1)} L`}
                        icon={<Zap size={16} className="text-teal-500" />}
                        variant="primary"
                    />
                </div>
            </div>
        </CalculatorLayout>
    );
}
