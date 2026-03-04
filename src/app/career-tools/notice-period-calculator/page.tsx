"use client";

import { useState, useEffect } from "react";
import CalculatorLayout from "@/components/calculator/CalculatorLayout";
import { InputField, ResultCard } from "@/components/ui/CalculatorUI";
import { Briefcase } from "lucide-react";

export default function NoticePeriodCalculator() {
    const [noticeDays, setNoticeDays] = useState<number>(90);
    const [lastWorkingDay, setLastWorkingDay] = useState<string>("");

    useEffect(() => {
        const today = new Date();
        const lwd = new Date(today.getTime() + noticeDays * 24 * 60 * 60 * 1000);
        setLastWorkingDay(lwd.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }));
    }, [noticeDays]);

    return (
        <CalculatorLayout
            title="Notice Period Calculator"
            description="Estimate your last working day based on your notice period and current date."
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6 p-8 rounded-3xl border bg-card/50 shadow-sm">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Briefcase size={20} className="text-primary" />
                        Notice Period
                    </h2>

                    <InputField label="Notice Period (Days)" id="notice" value={noticeDays} onChange={(v) => setNoticeDays(Number(v))} suffix="Days" />
                </div>

                <div className="space-y-6">
                    <ResultCard
                        label="Estimated Last Working Day"
                        value={lastWorkingDay}
                        variant="primary"
                        description="Based on starting notice period from today"
                    />

                    <div className="p-8 rounded-3xl border bg-muted/30 text-sm text-muted-foreground">
                        <p>Planning your exit? This tool helps you communicate your tentative last date to your next employer. Note: This calculation assumes 7-day weeks. Check with your HR regarding leave adjustments or buyout options.</p>
                    </div>
                </div>
            </div>
        </CalculatorLayout>
    );
}
