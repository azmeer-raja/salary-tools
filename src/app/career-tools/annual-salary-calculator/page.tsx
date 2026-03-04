"use client";

import { useState, useEffect } from "react";
import CalculatorLayout from "@/components/calculator/CalculatorLayout";
import { InputField, ResultCard } from "@/components/ui/CalculatorUI";
import { formatCurrency } from "@/lib/utils";
import { Briefcase, Calendar, Clock, Wallet } from "lucide-react";

export default function AnnualSalaryCalculator() {
    const [pay, setPay] = useState(500);
    const [period, setPeriod] = useState<'hourly' | 'daily' | 'weekly' | 'monthly'>('hourly');
    const [hoursPerWeek, setHoursPerWeek] = useState(40);
    const [annual, setAnnual] = useState(0);

    useEffect(() => {
        let yearly = 0;
        if (period === 'hourly') yearly = pay * hoursPerWeek * 52;
        else if (period === 'daily') yearly = pay * 5 * 52;
        else if (period === 'weekly') yearly = pay * 52;
        else if (period === 'monthly') yearly = pay * 12;

        setAnnual(yearly);
    }, [pay, period, hoursPerWeek]);

    return (
        <CalculatorLayout
            title="Annual Salary Calculator"
            description="Convert your hourly, daily, or monthly pay into an annual salary estimate."
            icon={<Briefcase className="text-primary" />}
        >
            <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <select
                        className="h-12 rounded-xl border bg-background px-4 font-bold"
                        value={period}
                        onChange={(e) => setPeriod(e.target.value as any)}
                    >
                        <option value="hourly">Hourly Rate</option>
                        <option value="daily">Daily Rate</option>
                        <option value="weekly">Weekly Rate</option>
                        <option value="monthly">Monthly Salary</option>
                    </select>
                    <InputField
                        label="Rate"
                        id="pay"
                        value={pay}
                        onChange={(v) => setPay(Number(v))}
                        prefix="₹"
                    />
                </div>

                {period === 'hourly' && (
                    <InputField
                        label="Hours Per Week"
                        id="hours"
                        value={hoursPerWeek}
                        onChange={(v) => setHoursPerWeek(Number(v))}
                        suffix="Hrs"
                    />
                )}
            </div>

            <div className="space-y-6">
                <div className="bg-primary/5 rounded-3xl p-8 border border-primary/10">
                    <p className="text-sm font-bold text-primary mb-1 uppercase tracking-wider">Estimated Annual Salary</p>
                    <p className="text-4xl md:text-5xl font-black text-primary">
                        {formatCurrency(annual)}
                    </p>
                    <p className="mt-2 text-lg font-bold text-muted-foreground italic">
                        Based on {hoursPerWeek}h/week, 52 weeks/year
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <ResultCard
                        label="Monthly"
                        value={formatCurrency(annual / 12)}
                        icon={<Calendar size={16} />}
                    />
                    <ResultCard
                        label="Weekly"
                        value={formatCurrency(annual / 52)}
                        icon={<Clock size={16} />}
                        variant="primary"
                    />
                </div>
            </div>
        </CalculatorLayout>
    );
}
