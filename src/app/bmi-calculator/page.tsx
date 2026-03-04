"use client";

import { useState, useEffect } from "react";
import CalculatorLayout from "@/components/calculator/CalculatorLayout";
import { InputField, ResultCard } from "@/components/ui/CalculatorUI";
import { calculateBMI } from "@/lib/calculators";
import { Scale, Activity, Heart } from "lucide-react";

export default function BMICalculator() {
    const [weight, setWeight] = useState(70);
    const [height, setHeight] = useState(170);
    const [results, setResults] = useState<any>(null);

    useEffect(() => {
        const res = calculateBMI(weight, height);
        setResults(res);
    }, [weight, height]);

    return (
        <CalculatorLayout
            title="BMI Calculator"
            description="Check your Body Mass Index (BMI) to understand if you are in a healthy weight range."
            icon={<Scale className="text-primary" />}
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
                    label="Height (cm)"
                    id="height"
                    value={height}
                    onChange={(v) => setHeight(Number(v))}
                    suffix="cm"
                />
            </div>

            <div className="space-y-6">
                <div className="bg-primary/5 rounded-3xl p-8 border border-primary/10">
                    <p className="text-sm font-bold text-primary mb-1 uppercase tracking-wider">Your BMI Score</p>
                    <p className="text-4xl md:text-5xl font-black text-primary">
                        {results ? results.score.toFixed(1) : "0.0"}
                    </p>
                    <p className="mt-2 text-lg font-bold text-muted-foreground italic">
                        Category: <span className="text-primary">{results?.category}</span>
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <ResultCard
                        label="Ideal Weight"
                        value="60kg - 75kg"
                        icon={<Activity size={16} />}
                        description="Rough estimate"
                    />
                    <ResultCard
                        label="Health Status"
                        value={results?.category || "Neutral"}
                        icon={<Heart size={16} />}
                        variant="primary"
                    />
                </div>
            </div>
        </CalculatorLayout>
    );
}
