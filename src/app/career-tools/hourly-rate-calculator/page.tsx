"use client";

import { useState, useEffect } from "react";
import CalculatorLayout from "@/components/calculator/CalculatorLayout";
import { InputField, ResultCard } from "@/components/ui/CalculatorUI";
import { formatCurrency } from "@/lib/utils";
import { Clock } from "lucide-react";

export default function HourlyRateCalculator() {
    const [targetIncome, setTargetIncome] = useState<number>(2000000);
    const [billableHours, setBillableHours] = useState<number>(30);
    const [workWeeks, setWorkWeeks] = useState<number>(48);
    const [hourlyRate, setHourlyRate] = useState<number>(0);

    useEffect(() => {
        const totalHours = billableHours * workWeeks;
        setHourlyRate(targetIncome / totalHours);
    }, [targetIncome, billableHours, workWeeks]);

    return (
        <CalculatorLayout
            title="Hourly Rate Calculator"
            description="Determine what you should charge per hour to reach your target annual income goal."
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6 p-8 rounded-3xl border bg-card/50 shadow-sm">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Clock size={20} className="text-primary" />
                        Income Goals
                    </h2>

                    <InputField label="Target Annual Income" id="target" value={targetIncome} onChange={(v) => setTargetIncome(Number(v))} prefix="₹" />
                    <InputField label="Billable Hours / Week" id="hours" value={billableHours} onChange={(v) => setBillableHours(Number(v))} suffix="hrs" />
                    <InputField label="Work Weeks / Year" id="weeks" value={workWeeks} onChange={(v) => setWorkWeeks(Number(v))} suffix="wks" />
                </div>

                <div className="space-y-6">
                    <ResultCard
                        label="Required Hourly Rate"
                        value={formatCurrency(hourlyRate)}
                        variant="primary"
                        description="Rate to charge clients to hit your goal"
                    />

                    <div className="p-8 rounded-3xl border bg-muted/30 text-sm text-muted-foreground">
                        <p>Planning for holidays and sick leave is crucial for freelancers. Charging slightly more than your base requirement helps cover overheads, insurance, and taxes.</p>
                    </div>
                </div>
            </div>
        </CalculatorLayout>
    );
}
