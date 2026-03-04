"use client";

import { useState, useEffect } from "react";
import CalculatorLayout from "@/components/calculator/CalculatorLayout";
import { InputField, ResultCard } from "@/components/ui/CalculatorUI";
import { GraduationCap, Target, Zap } from "lucide-react";

export default function FinalExamCalculator() {
    const [currentGrade, setCurrentGrade] = useState(85);
    const [targetGrade, setTargetGrade] = useState(90);
    const [finalWeight, setFinalWeight] = useState(25);
    const [required, setRequired] = useState(0);

    useEffect(() => {
        // Formula: (Target - Current * (1 - Weight)) / Weight
        const weightDec = finalWeight / 100;
        const req = (targetGrade - (currentGrade * (1 - weightDec))) / weightDec;
        setRequired(Number(req.toFixed(1)));
    }, [currentGrade, targetGrade, finalWeight]);

    return (
        <CalculatorLayout
            title="Final Exam Calculator"
            description="Find out exactly what score you need on your final exam to reach your target course grade."
            icon={<Target className="text-primary" />}
        >
            <div className="space-y-6">
                <InputField
                    label="Current Grade (%)"
                    id="current"
                    value={currentGrade}
                    onChange={(v) => setCurrentGrade(Number(v))}
                    suffix="%"
                />
                <InputField
                    label="Target Class Grade (%)"
                    id="target"
                    value={targetGrade}
                    onChange={(v) => setTargetGrade(Number(v))}
                    suffix="%"
                />
                <InputField
                    label="Final Exam Weight (%)"
                    id="weight"
                    value={finalWeight}
                    onChange={(v) => setFinalWeight(Number(v))}
                    suffix="%"
                />
            </div>

            <div className="space-y-6">
                <div className="bg-primary/5 rounded-3xl p-8 border border-primary/10 text-center">
                    <p className="text-sm font-bold text-primary mb-1 uppercase tracking-wider">Required Exam Score</p>
                    <p className="text-5xl md:text-6xl font-black text-primary">
                        {required}%
                    </p>
                    <p className="mt-2 text-lg font-bold text-muted-foreground italic">
                        To reach {targetGrade}% overall
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <ResultCard
                        label="Current Standing"
                        value={`${currentGrade}%`}
                        icon={<GraduationCap size={16} />}
                    />
                    <ResultCard
                        label="Difficulty"
                        value={required > 100 ? "Impossible" : required > 90 ? "Hard" : "Doable"}
                        icon={<Zap size={16} />}
                        variant="primary"
                    />
                </div>
            </div>
        </CalculatorLayout>
    );
}
