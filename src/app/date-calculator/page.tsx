"use client";

import { useState, useEffect } from "react";
import CalculatorLayout from "@/components/calculator/CalculatorLayout";
import { ResultCard } from "@/components/ui/CalculatorUI";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export default function DateCalculator() {
    const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0]);
    const [endDate, setEndDate] = useState(new Date(Date.now() + 86400000 * 7).toISOString().split("T")[0]);
    const [diff, setDiff] = useState<any>(null);

    useEffect(() => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const timeDiff = Math.abs(end.getTime() - start.getTime());

        const days = Math.ceil(timeDiff / (1000 * 3600 * 24));
        const weeks = (days / 7).toFixed(1);
        const months = (days / 30.44).toFixed(1);

        setDiff({ days, weeks, months });
    }, [startDate, endDate]);

    return (
        <CalculatorLayout
            title="Date Calculator"
            description="Calculate the number of days, weeks, or months between two specified dates."
            icon={<Calendar className="text-primary" />}
        >
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-muted-foreground ml-1">Start Date</label>
                        <input
                            type="date"
                            className="w-full h-12 rounded-xl border bg-background px-4 font-medium focus:border-primary transition-all"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div className="hidden md:flex justify-center pt-6 opacity-20">
                        <ArrowRight size={24} />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-muted-foreground ml-1">End Date</label>
                        <input
                            type="date"
                            className="w-full h-12 rounded-xl border bg-background px-4 font-medium focus:border-primary transition-all"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-primary/5 rounded-3xl p-8 border border-primary/10 text-center">
                    <p className="text-sm font-bold text-primary mb-1 uppercase tracking-wider">Total Difference</p>
                    <p className="text-5xl md:text-6xl font-black text-primary">
                        {diff?.days || 0} Days
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <ResultCard
                        label="Weeks"
                        value={`${diff?.weeks || 0} wks`}
                        icon={<Clock size={16} />}
                    />
                    <ResultCard
                        label="Months"
                        value={`${diff?.months || 0} mo`}
                        icon={<Calendar size={16} />}
                        variant="primary"
                    />
                </div>
            </div>
        </CalculatorLayout>
    );
}
