"use client";

import { useState, useEffect } from "react";
import CalculatorLayout from "@/components/calculator/CalculatorLayout";
import { ResultCard } from "@/components/ui/CalculatorUI";
import { Baby, Calendar, Heart, Info } from "lucide-react";

export default function PregnancyCalculator() {
    const [lmp, setLmp] = useState(new Date().toISOString().split("T")[0]);
    const [dueDate, setDueDate] = useState<any>(null);
    const [weeks, setWeeks] = useState(0);

    useEffect(() => {
        const lmpDate = new Date(lmp);
        // Naegele's rule: LMP + 9 months + 7 days (or + 280 days)
        const due = new Date(lmpDate.getTime() + 280 * 24 * 60 * 60 * 1000);
        setDueDate(due.toDateString());

        const today = new Date();
        const diff = Math.max(0, today.getTime() - lmpDate.getTime());
        setWeeks(Math.floor(diff / (1000 * 60 * 60 * 24 * 7)));
    }, [lmp]);

    return (
        <CalculatorLayout
            title="Pregnancy Due Date Calculator"
            description="Estimate your expected due date and track your pregnancy progress based on your last period."
            icon={<Baby className="text-pink-500" />}
        >
            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-muted-foreground ml-1">First Day of Last Period (LMP)</label>
                    <input
                        type="date"
                        className="w-full h-12 rounded-xl border bg-background px-4 font-bold outline-none focus:border-pink-400 transition-all"
                        value={lmp}
                        onChange={(e) => setLmp(e.target.value)}
                    />
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-pink-500/5 rounded-3xl p-8 border border-pink-500/10 text-center">
                    <p className="text-sm font-bold text-pink-500 mb-1 uppercase tracking-wider">Estimated Due Date</p>
                    <p className="text-4xl md:text-5xl font-black text-pink-600 dark:text-pink-400">
                        {dueDate}
                    </p>
                    <p className="mt-2 text-lg font-bold text-muted-foreground italic">
                        Get ready for your bundle of joy!
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <ResultCard
                        label="Current Progress"
                        value={`${weeks} Weeks`}
                        icon={<Info size={16} />}
                        description="Since LMP"
                    />
                    <ResultCard
                        label="Trimester"
                        value={weeks < 13 ? "1st" : weeks < 27 ? "2nd" : "3rd"}
                        icon={<Heart size={16} />}
                        variant="primary"
                    />
                </div>
            </div>
        </CalculatorLayout>
    );
}
