"use client";

import { useState, useEffect } from "react";
import CalculatorLayout from "@/components/calculator/CalculatorLayout";
import { InputField, ResultCard } from "@/components/ui/CalculatorUI";
import { Calendar, Baby, Clock } from "lucide-react";

export default function AgeCalculator() {
    const [birthDate, setBirthDate] = useState("1995-01-01");
    const [targetDate, setTargetDate] = useState(new Date().toISOString().split("T")[0]);
    const [age, setAge] = useState<any>(null);

    useEffect(() => {
        const birth = new Date(birthDate);
        const target = new Date(targetDate);

        let years = target.getFullYear() - birth.getFullYear();
        let months = target.getMonth() - birth.getMonth();
        let days = target.getDate() - birth.getDate();

        if (days < 0) {
            months--;
            days += new Date(target.getFullYear(), target.getMonth(), 0).getDate();
        }
        if (months < 0) {
            years--;
            months += 12;
        }

        setAge({ years, months, days });
    }, [birthDate, targetDate]);

    return (
        <CalculatorLayout
            title="Age Calculator"
            description="Find your exact age in years, months, and days from your date of birth."
            icon={<Calendar className="text-primary" />}
        >
            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-muted-foreground ml-1">Date of Birth</label>
                    <input
                        type="date"
                        className="w-full h-12 rounded-xl border bg-background px-4 font-medium"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-muted-foreground ml-1">Age at Date</label>
                    <input
                        type="date"
                        className="w-full h-12 rounded-xl border bg-background px-4 font-medium"
                        value={targetDate}
                        onChange={(e) => setTargetDate(e.target.value)}
                    />
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-primary/5 rounded-3xl p-8 border border-primary/10">
                    <p className="text-sm font-bold text-primary mb-1 uppercase tracking-wider">Your Age is</p>
                    <p className="text-4xl md:text-5xl font-black text-primary">
                        {age?.years || 0} Years
                    </p>
                    <p className="mt-2 text-lg font-bold text-muted-foreground italic">
                        {age?.months || 0} Months, {age?.days || 0} Days
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <ResultCard
                        label="Total Months"
                        value={age ? (age.years * 12 + age.months).toString() : "0"}
                        icon={<Baby size={16} />}
                    />
                    <ResultCard
                        label="Total Days"
                        value={age ? Math.floor((new Date(targetDate).getTime() - new Date(birthDate).getTime()) / (1000 * 60 * 60 * 24)).toString() : "0"}
                        icon={<Clock size={16} />}
                        variant="primary"
                    />
                </div>
            </div>
        </CalculatorLayout>
    );
}
