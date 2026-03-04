"use client";

import { useState, useEffect } from "react";
import CalculatorLayout from "@/components/calculator/CalculatorLayout";
import { Key, Copy, Check, RefreshCw } from "lucide-react";

export default function UUIDGenerator() {
    const [uuid, setUuid] = useState("");
    const [copied, setCopied] = useState(false);

    const generateUUID = () => {
        const newUuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
        setUuid(newUuid);
    };

    useEffect(() => {
        generateUUID();
    }, []);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(uuid);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <CalculatorLayout
            title="UUID / GUID Generator"
            description="Generate unique version 4 UUIDs (Universally Unique Identifiers) instantly for your development projects."
            icon={<Key className="text-primary" />}
        >
            <div className="space-y-8 flex flex-col items-center justify-center py-12">
                <div className="bg-card w-full max-w-xl p-8 rounded-3xl border shadow-xl shadow-primary/5 text-center relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-primary/20" />
                    <p className="font-mono text-xl md:text-2xl font-bold tracking-tight text-primary select-all break-all">
                        {uuid}
                    </p>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={generateUUID}
                        className="flex items-center gap-2 px-6 py-3 bg-card border rounded-xl font-bold hover:bg-muted transition-all"
                    >
                        <RefreshCw size={18} /> Generate New
                    </button>
                    <button
                        onClick={copyToClipboard}
                        className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:shadow-lg hover:shadow-primary/20 transition-all"
                    >
                        {copied ? <Check size={18} /> : <Copy size={18} />}
                        {copied ? "Copied!" : "Copy UUID"}
                    </button>
                </div>

                <div className="max-w-xl text-center space-y-4 pt-12">
                    <h3 className="font-bold flex items-center justify-center gap-2">
                        <Key size={16} className="text-primary" /> What is a UUID v4?
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        A Version 4 UUID is a universally unique identifier that is generated using random numbers. It has a total of 128 bits, providing a virtually zero probability of duplication.
                    </p>
                </div>
            </div>
        </CalculatorLayout>
    );
}
