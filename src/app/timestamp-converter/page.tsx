"use client";

import { useState, useEffect } from "react";
import CalculatorLayout from "@/components/calculator/CalculatorLayout";
import { InputField, ResultCard } from "@/components/ui/CalculatorUI";
import { Clock, Calendar, Globe, RefreshCw } from "lucide-react";

export default function TimestampConverter() {
    const [timestamp, setTimestamp] = useState(Math.floor(Date.now() / 1000));
    const [dateStr, setDateStr] = useState("");
    const [utcStr, setUtcStr] = useState("");

    const convert = () => {
        try {
            // Handle both seconds and milliseconds
            const ts = timestamp.toString().length <= 10 ? timestamp * 1000 : timestamp;
            const date = new Date(ts);
            setDateStr(date.toString());
            setUtcStr(date.toUTCString());
        } catch (e) {
            setDateStr("Invalid Timestamp");
        }
    };

    useEffect(() => {
        convert();
    }, [timestamp]);

    return (
        <CalculatorLayout
            title="Unix Timestamp Converter"
            description="Convert Unix timestamps to human-readable dates and vice versa instantly."
            icon={<Clock className="text-primary" />}
        >
            <div className="space-y-6">
                <div className="relative">
                    <InputField
                        label="Unix Timestamp (Seconds or MS)"
                        id="timestamp"
                        value={timestamp}
                        onChange={(v) => setTimestamp(Number(v))}
                    />
                    <button
                        onClick={() => setTimestamp(Math.floor(Date.now() / 1000))}
                        className="absolute right-2 top-8 p-2 text-primary hover:bg-primary/5 rounded-lg transition-all"
                        title="Now"
                    >
                        <RefreshCw size={18} />
                    </button>
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-primary/5 rounded-3xl p-8 border border-primary/10">
                    <p className="text-sm font-bold text-primary mb-1 uppercase tracking-wider">Local Time</p>
                    <p className="text-2xl md:text-3xl font-black text-primary break-words">
                        {dateStr}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ResultCard
                        label="UTC / GMT Time"
                        value={utcStr}
                        icon={<Globe size={16} />}
                    />
                    <ResultCard
                        label="Format"
                        value={timestamp.toString().length <= 10 ? "Seconds" : "Milliseconds"}
                        icon={<Calendar size={16} />}
                        variant="primary"
                    />
                </div>
            </div>
        </CalculatorLayout>
    );
}
