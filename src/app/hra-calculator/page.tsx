"use client";

import { useState, useEffect } from "react";
import CalculatorLayout from "@/components/calculator/CalculatorLayout";
import { InputField, ResultCard } from "@/components/ui/CalculatorUI";
import { calculateHRA } from "@/lib/calculators";
import { formatCurrency } from "@/lib/utils";
import { Home } from "lucide-react";

export default function HRACalculator() {
    const [basic, setBasic] = useState<number>(50000);
    const [hraReceived, setHraReceived] = useState<number>(20000);
    const [rentPaid, setRentPaid] = useState<number>(15000);
    const [isMetro, setIsMetro] = useState<boolean>(true);
    const [exemption, setExemption] = useState<number>(0);

    useEffect(() => {
        setExemption(calculateHRA(basic, hraReceived, rentPaid, isMetro));
    }, [basic, hraReceived, rentPaid, isMetro]);

    return (
        <CalculatorLayout
            title="HRA Calculator"
            description="Calculate your House Rent Allowance (HRA) tax exemption based on your salary and rent paid."
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6 p-8 rounded-3xl border bg-card/50 shadow-sm">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Home size={20} className="text-primary" />
                        Rent Details
                    </h2>

                    <InputField label="Monthly Basic Salary" id="basic" value={basic} onChange={(v) => setBasic(Number(v))} prefix="₹" />
                    <InputField label="Monthly HRA Received" id="hraReceived" value={hraReceived} onChange={(v) => setHraReceived(Number(v))} prefix="₹" />
                    <InputField label="Monthly Rent Paid" id="rentPaid" value={rentPaid} onChange={(v) => setRentPaid(Number(v))} prefix="₹" />

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-muted-foreground ml-1">City Type</label>
                        <div className="flex p-1 rounded-xl bg-muted gap-1">
                            <button
                                onClick={() => setIsMetro(true)}
                                className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${isMetro ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground'}`}
                            >
                                Metro
                            </button>
                            <button
                                onClick={() => setIsMetro(false)}
                                className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${!isMetro ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground'}`}
                            >
                                Non-Metro
                            </button>
                        </div>
                        <p className="text-[10px] text-muted-foreground px-1 mt-1">
                            Metro cities for HRA: Delhi, Mumbai, Kolkata, Chennai.
                        </p>
                    </div>
                </div>

                <div className="space-y-6">
                    <ResultCard
                        label="Monthly HRA Exemption"
                        value={formatCurrency(exemption)}
                        variant="primary"
                        description="The amount exempt from income tax"
                    />

                    <div className="p-8 rounded-3xl border bg-muted/30">
                        <h3 className="font-bold mb-4">How it's calculated</h3>
                        <p className="text-sm text-muted-foreground mb-4">Minimum of these three:</p>
                        <ul className="space-y-3 text-sm">
                            <li className="flex justify-between border-b pb-2">
                                <span>Actual HRA Received</span>
                                <span className="font-bold">{formatCurrency(hraReceived)}</span>
                            </li>
                            <li className="flex justify-between border-b pb-2">
                                <span>Rent paid - 10% of basic</span>
                                <span className="font-bold">{formatCurrency(Math.max(0, rentPaid - basic * 0.1))}</span>
                            </li>
                            <li className="flex justify-between border-b pb-2">
                                <span>{isMetro ? '50%' : '40%'} of basic salary</span>
                                <span className="font-bold">{formatCurrency(isMetro ? basic * 0.5 : basic * 0.4)}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </CalculatorLayout>
    );
}
