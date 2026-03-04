"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/calculator/CalculatorLayout";
import { Hash, RefreshCw, Layers } from "lucide-react";

export default function RandomNumberGenerator() {
    const [min, setMin] = useState(1);
    const [max, setMax] = useState(100);
    const [result, setResult] = useState<number | null>(null);

    const generate = () => {
        const res = Math.floor(Math.random() * (max - min + 1)) + min;
        setResult(res);
    };

    return (
        <CalculatorLayout
            title="Random Number Generator"
            description="Quickly generate a random number within any range you choose. Perfect for games, contests, and decision making."
            icon={<Layers className="text-primary" />}
        >
            <div className="space-y-8 py-8 flex flex-col items-center">
                <div className="grid grid-cols-2 gap-6 w-full max-w-sm">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Min Value</label>
                        <input
                            type="number"
                            className="w-full h-12 rounded-xl border bg-background px-4 font-bold outline-none focus:border-primary transition-all"
                            value={min}
                            onChange={(e) => setMin(Number(e.target.value))}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Max Value</label>
                        <input
                            type="number"
                            className="w-full h-12 rounded-xl border bg-background px-4 font-bold outline-none focus:border-primary transition-all"
                            value={max}
                            onChange={(e) => setMax(Number(e.target.value))}
                        />
                    </div>
                </div>

                <div className="bg-card w-full max-w-sm p-12 rounded-[2.5rem] border shadow-2xl shadow-primary/5 text-center relative overflow-hidden flex items-center justify-center min-h-[200px]">
                    <p className="text-7xl md:text-8xl font-black text-primary tracking-tighter">
                        {result ?? "?"}
                    </p>
                </div>

                <button
                    onClick={generate}
                    className="w-full max-w-sm h-14 rounded-2xl bg-primary text-primary-foreground font-bold hover:shadow-xl hover:shadow-primary/20 transition-all flex items-center justify-center gap-3 text-lg"
                >
                    <RefreshCw size={24} className={result ? "animate-spin-slow" : ""} /> Generate Number
                </button>
            </div>
        </CalculatorLayout>
    );
}
