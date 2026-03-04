"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import { useState, useEffect } from "react";
import CalculatorLayout from "@/components/calculator/CalculatorLayout";
import { InputField, ResultCard } from "@/components/ui/CalculatorUI";
import { formatCurrency } from "@/lib/utils";
import { Receipt, ShieldCheck, Landmark } from "lucide-react";

export default function VATCalculator() {
    const [amount, setAmount] = useState(1000);
    const [rate, setRate] = useState(18);
    const [mode, setMode] = useState<'add' | 'remove'>('add');
    const [results, setResults] = useState<any>(null);

    useEffect(() => {
        let vatAmount = 0;
        let netAmount = 0;
        let grossAmount = 0;

        if (mode === 'add') {
            netAmount = amount;
            vatAmount = (amount * rate) / 100;
            grossAmount = amount + vatAmount;
        } else {
            grossAmount = amount;
            netAmount = amount / (1 + rate / 100);
            vatAmount = grossAmount - netAmount;
        }

        setResults({ vatAmount, netAmount, grossAmount });
    }, [amount, rate, mode]);

    return (
        <CalculatorLayout
            title="VAT Calculator"
            description="Calculate VAT (Value Added Tax) additions or subtractions from any price easily."
            icon={<Receipt className="text-primary" />}
        >
            <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={() => setMode('add')}
                        className={`h-12 rounded-xl border font-bold transition-all ${mode === 'add' ? 'bg-primary text-primary-foreground border-primary' : 'bg-background hover:border-primary/50'}`}
                    >
                        Add VAT
                    </button>
                    <button
                        onClick={() => setMode('remove')}
                        className={`h-12 rounded-xl border font-bold transition-all ${mode === 'remove' ? 'bg-primary text-primary-foreground border-primary' : 'bg-background hover:border-primary/50'}`}
                    >
                        Remove VAT
                    </button>
                </div>
                <InputField
                    label={mode === 'add' ? "Net Amount (Excl. VAT)" : "Gross Amount (Incl. VAT)"}
                    id="amount"
                    value={amount}
                    onChange={(v) => setAmount(Number(v))}
                    prefix="₹"
                />
                <InputField
                    label="VAT Rate (%)"
                    id="rate"
                    value={rate}
                    onChange={(v) => setRate(Number(v))}
                    suffix="%"
                />
            </div>

            <div className="space-y-6">
                <div className="bg-primary/5 rounded-3xl p-8 border border-primary/10">
                    <p className="text-sm font-bold text-primary mb-1 uppercase tracking-wider">{mode === 'add' ? 'Total with VAT' : 'Price without VAT'}</p>
                    <p className="text-4xl md:text-5xl font-black text-primary">
                        {results ? formatCurrency(mode === 'add' ? results.grossAmount : results.netAmount) : "₹0"}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <ResultCard
                        label="VAT Amount"
                        value={results ? formatCurrency(results.vatAmount) : "₹0"}
                        icon={<Landmark size={16} />}
                    />
                    <ResultCard
                        label="Original Value"
                        value={results ? formatCurrency(amount) : "₹0"}
                        icon={<ShieldCheck size={16} />}
                        variant="primary"
                    />
                </div>
            </div>
        </CalculatorLayout>
    );
}
