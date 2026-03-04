"use client";

import { useState, useEffect } from "react";
import CalculatorLayout from "@/components/calculator/CalculatorLayout";
import { InputField, ResultCard } from "@/components/ui/CalculatorUI";
import { formatCurrency } from "@/lib/utils";
import { Tag, Sparkles, Wallet } from "lucide-react";

export default function DiscountCalculator() {
    const [price, setPrice] = useState(1000);
    const [discount, setDiscount] = useState(20);
    const [results, setResults] = useState<any>(null);

    useEffect(() => {
        const savings = (price * discount) / 100;
        const finalPrice = price - savings;
        setResults({ savings, finalPrice });
    }, [price, discount]);

    return (
        <CalculatorLayout
            title="Discount Calculator"
            description="Quickly find out how much you save and what the final price is after any discount."
            icon={<Tag className="text-primary" />}
        >
            <div className="space-y-6">
                <InputField
                    label="Original Price"
                    id="price"
                    value={price}
                    onChange={(v) => setPrice(Number(v))}
                    prefix="₹"
                />
                <InputField
                    label="Discount Percentage"
                    id="discount"
                    value={discount}
                    onChange={(v) => setDiscount(Number(v))}
                    suffix="%"
                />
            </div>

            <div className="space-y-6">
                <div className="bg-primary/5 rounded-3xl p-8 border border-primary/10">
                    <p className="text-sm font-bold text-primary mb-1 uppercase tracking-wider">Final Price</p>
                    <p className="text-4xl md:text-5xl font-black text-primary">
                        {results ? formatCurrency(results.finalPrice) : "₹0"}
                    </p>
                    <p className="mt-2 text-lg font-bold text-muted-foreground italic">
                        You save {results ? formatCurrency(results.savings) : "₹0"}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <ResultCard
                        label="Total Savings"
                        value={results ? formatCurrency(results.savings) : "₹0"}
                        icon={<Wallet size={16} />}
                        variant="primary"
                    />
                    <ResultCard
                        label="Discount Applied"
                        value={`${discount}% OFF`}
                        icon={<Sparkles size={16} />}
                    />
                </div>
            </div>
        </CalculatorLayout>
    );
}
