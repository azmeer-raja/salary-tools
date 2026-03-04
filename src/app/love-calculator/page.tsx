"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/calculator/CalculatorLayout";
import { Heart, Sparkles, RefreshCw } from "lucide-react";

export default function LoveCalculator() {
    const [name1, setName1] = useState("");
    const [name2, setName2] = useState("");
    const [score, setScore] = useState<number | null>(null);

    const calculateLove = () => {
        if (!name1 || !name2) return;

        const combined = (name1 + name2).toLowerCase().replace(/\s/g, "");
        let hash = 0;
        for (let i = 0; i < combined.length; i++) {
            hash += combined.charCodeAt(i);
        }

        // Deterministic but feels random to user
        const result = (hash * 13) % 101;
        setScore(result);
    };

    const getMessage = (s: number) => {
        if (s > 90) return "Soulmates! True Love detected.";
        if (s > 70) return "Great compatibility. Give it a chance!";
        if (s > 50) return "Good potential with some effort.";
        return "Maybe just friends for now?";
    };

    return (
        <CalculatorLayout
            title="Love Calculator"
            description="Calculate the attraction and compatibility between two names instantly."
            icon={<Heart className="text-pink-500" />}
        >
            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-muted-foreground ml-1">Your Name</label>
                    <input
                        type="text"
                        className="w-full h-12 rounded-xl border bg-background px-4 font-bold outline-none focus:border-pink-500 transition-all"
                        value={name1}
                        onChange={(e) => setName1(e.target.value)}
                        placeholder="Enter first name"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-muted-foreground ml-1">Partner's Name</label>
                    <input
                        type="text"
                        className="w-full h-12 rounded-xl border bg-background px-4 font-bold outline-none focus:border-pink-500 transition-all"
                        value={name2}
                        onChange={(e) => setName2(e.target.value)}
                        placeholder="Enter second name"
                    />
                </div>

                <button
                    onClick={calculateLove}
                    className="w-full h-12 rounded-xl bg-pink-500 text-white font-bold hover:shadow-lg hover:shadow-pink-500/20 transition-all flex items-center justify-center gap-2"
                >
                    <Sparkles size={18} /> Calculate Compatibility
                </button>
            </div>

            <div className="space-y-6">
                {score !== null && (
                    <div className="bg-pink-50 rounded-3xl p-8 border border-pink-100 text-center dark:bg-pink-950/20 dark:border-pink-900/30">
                        <p className="text-sm font-bold text-pink-500 mb-1 uppercase tracking-wider">Compatibility Score</p>
                        <p className="text-6xl md:text-7xl font-black text-pink-500 mb-4">
                            {score}%
                        </p>
                        <div className="flex justify-center mb-4">
                            <Heart size={48} className={`fill-pink-500 text-pink-500 ${score > 70 ? 'animate-bounce' : ''}`} />
                        </div>
                        <p className="text-xl font-bold text-pink-700 dark:text-pink-300">
                            {getMessage(score)}
                        </p>
                    </div>
                )}
            </div>
        </CalculatorLayout>
    );
}
