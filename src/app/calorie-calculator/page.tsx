"use client";

import { useState, useEffect } from "react";
import CalculatorLayout from "@/components/calculator/CalculatorLayout";
import { InputField, ResultCard } from "@/components/ui/CalculatorUI";
import { calculateBMR } from "@/lib/calculators";
import { Activity, Flame, Utensils, Zap } from "lucide-react";

export default function CalorieCalculator() {
    const [weight, setWeight] = useState(70);
    const [height, setHeight] = useState(170);
    const [age, setAge] = useState(25);
    const [gender, setGender] = useState<'male' | 'female'>('male');
    const [activity, setActivity] = useState(1.2);
    const [results, setResults] = useState<any>(null);

    useEffect(() => {
        const bmr = calculateBMR(weight, height, age, gender);
        const maintenance = Math.round(bmr * activity);
        setResults({ bmr: Math.round(bmr), maintenance });
    }, [weight, height, age, gender, activity]);

    return (
        <CalculatorLayout
            title="Calorie Calculator"
            description="Estimate how many calories you need daily based on your activity levels."
            icon={<Flame className="text-orange-500" />}
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

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-muted-foreground ml-1">Activity Level</label>
                    <select
                        className="w-full h-12 rounded-xl border bg-background px-4 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                        value={activity}
                        onChange={(e) => setActivity(Number(e.target.value))}
                    >
                        <option value={1.2}>Sedentary (Little/no exercise)</option>
                        <option value={1.375}>Lightly Active (1-3 days/week)</option>
                        <option value={1.55}>Moderately Active (3-5 days/week)</option>
                        <option value={1.725}>Very Active (6-7 days/week)</option>
                        <option value={1.9}>Extra Active (Physical job/training)</option>
                    </select>
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-primary/5 rounded-3xl p-8 border border-primary/10">
                    <p className="text-sm font-bold text-primary mb-1 uppercase tracking-wider">Daily Maintenance Calories</p>
                    <p className="text-4xl md:text-5xl font-black text-primary">
                        {results?.maintenance || 0} kcal
                    </p>
                    <p className="mt-2 text-lg font-bold text-muted-foreground italic">
                        To maintain weight
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <ResultCard
                        label="BMR"
                        value={`${results?.bmr || 0} kcal`}
                        icon={<Zap size={16} />}
                        description="Basal Metabolic Rate"
                    />
                    <ResultCard
                        label="Weight Loss"
                        value={`${(results?.maintenance - 500) || 0} kcal`}
                        icon={<Utensils size={16} />}
                        variant="primary"
                        description="500 kcal deficit"
                    />
                </div>
            </div>
        </CalculatorLayout>
    );
}
