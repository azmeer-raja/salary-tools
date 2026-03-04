"use client";

import { useState, useEffect } from "react";
import CalculatorLayout from "@/components/calculator/CalculatorLayout";
import { InputField, ResultCard } from "@/components/ui/CalculatorUI";
import { formatCurrency } from "@/lib/utils";
import { Banknote, Users, Zap } from "lucide-react";

export default function TipCalculator() {
    const [bill, setBill] = useState(1000);
    const [tipPercent, setTipPercent] = useState(10);
    const [people, setPeople] = useState(2);
    const [results, setResults] = useState<any>(null);

    useEffect(() => {
        const totalTip = (bill * tipPercent) / 100;
        const totalBill = bill + totalTip;
        const perPerson = totalBill / people;
        const tipPerPerson = totalTip / people;
        setResults({ totalTip, totalBill, perPerson, tipPerPerson });
    }, [bill, tipPercent, people]);

    return (
        <CalculatorLayout
            title="Tip Calculator"
            description="Quickly calculate the tip and split the bill among friends accurately."
            icon={<Banknote className="text-primary" />}
        >
            <div className="space-y-6">
                <InputField
                    label="Bill Amount"
                    id="bill"
                    value={bill}
                    onChange={(v) => setBill(Number(v))}
                    prefix="₹"
                />
                <InputField
                    label="Tip Percentage"
                    id="tip"
                    value={tipPercent}
                    onChange={(v) => setTipPercent(Number(v))}
                    suffix="%"
                />
                <InputField
                    label="Number of People"
                    id="people"
                    value={people}
                    onChange={(v) => setPeople(Number(v))}
                    suffix="Ppl"
                />
            </div>

            <div className="space-y-6">
                <div className="bg-primary/5 rounded-3xl p-8 border border-primary/10">
                    <p className="text-sm font-bold text-primary mb-1 uppercase tracking-wider">Per Person Total</p>
                    <p className="text-4xl md:text-5xl font-black text-primary">
                        {results ? formatCurrency(results.perPerson) : "₹0"}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <ResultCard
                        label="Total Tip"
                        value={results ? formatCurrency(results.totalTip) : "₹0"}
                        icon={<Zap size={16} />}
                    />
                    <ResultCard
                        label="Tip Per Person"
                        value={results ? formatCurrency(results.tipPerPerson) : "₹0"}
                        icon={<Users size={16} />}
                        variant="primary"
                    />
                </div>
            </div>
        </CalculatorLayout>
    );
}
