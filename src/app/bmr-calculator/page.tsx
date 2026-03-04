"use client";

import { useState, useEffect } from "react";
import CalculatorLayout from "@/components/calculator/CalculatorLayout";
import { InputField, ResultCard } from "@/components/ui/CalculatorUI";
import { calculateBMR } from "@/lib/calculators";
import { Activity, Zap, Heart, Info } from "lucide-react";

export default function BMRCalculator() {
    const [weight, setWeight] = useState(70);
    const [height, setHeight] = useState(170);
    const [age, setAge] = useState(25);
    const [gender, setGender] = useState<'male' | 'female'>('male');
    const [bmr, setBmr] = useState(0);

    useEffect(() => {
        setBmr(Math.round(calculateBMR(weight, height, age, gender)));
    }, [weight, height, age, gender]);

    return (
        <CalculatorLayout
            title="BMR Calculator"
            description="Calculate your Basal Metabolic Rate (BMR) - the number of calories your body needs to function at rest."
            icon={<Zap className="text-yellow-500" />}
        >
            <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={() => setGender('male')}
                        className={`h-12 rounded-xl border font-bold transition-all ${gender === 'male' ? 'bg-primary text-primary-foreground border-primary' : 'bg-background hover:border-primary/50'}`}
                    >
                        Male
                    </button>
                    <button
                        onClick={() => setGender('female')}
                        className={`h-12 rounded-xl border font-bold transition-all ${gender === 'female' ? 'bg-primary text-primary-foreground border-primary' : 'bg-background hover:border-primary/50'}`}
                    >
                        Female
                    </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <InputField label="Weight (kg)" id="weight" value={weight} onChange={(v) => setWeight(Number(v))} suffix="kg" />
                    <InputField label="Height (cm)" id="height" value={height} onChange={(v) => setHeight(Number(v))} suffix="cm" />
                </div>
                <InputField label="Age (Years)" id="age" value={age} onChange={(v) => setAge(Number(v))} />
            </div>

            <div className="space-y-6">
                <div className="bg-primary/5 rounded-3xl p-8 border border-primary/10">
                    <p className="text-sm font-bold text-primary mb-1 uppercase tracking-wider">Your Resting Calories (BMR)</p>
                    <p className="text-4xl md:text-5xl font-black text-primary">
                        {bmr} kcal/day
                    </p>
                    <p className="mt-2 text-lg font-bold text-muted-foreground italic">
                        Minimum energy required
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <ResultCard
                        label="Sedentary"
                        value={`${Math.round(bmr * 1.2)} kcal`}
                        icon={<Info size={16} />}
                        description="No exercise"
                    />
                    <ResultCard
                        label="Active"
                        value={`${Math.round(bmr * 1.55)} kcal`}
                        icon={<Heart size={16} />}
                        variant="primary"
                        description="Exercise 3-5 days"
                    />
                </div>
            </div>
        </CalculatorLayout>
    );
}
