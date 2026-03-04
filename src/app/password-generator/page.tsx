"use client";

import { useState, useEffect } from "react";
import CalculatorLayout from "@/components/calculator/CalculatorLayout";
import { Key, Copy, Check, RefreshCw, ShieldCheck } from "lucide-react";

export default function PasswordGenerator() {
    const [length, setLength] = useState(16);
    const [useUppercase, setUseUppercase] = useState(true);
    const [useNumbers, setUseNumbers] = useState(true);
    const [useSymbols, setUseSymbols] = useState(true);
    const [password, setPassword] = useState("");
    const [copied, setCopied] = useState(false);

    const generatePassword = () => {
        let charset = "abcdefghijklmnopqrstuvwxyz";
        if (useUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (useNumbers) charset += "0123456789";
        if (useSymbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

        let retVal = "";
        for (let i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        setPassword(retVal);
    };

    useEffect(() => {
        generatePassword();
    }, []);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <CalculatorLayout
            title="Password Generator"
            description="Create strong, secure, and random passwords to protect your online accounts."
            icon={<ShieldCheck className="text-primary" />}
        >
            <div className="space-y-8 flex flex-col items-center">
                <div className="bg-card w-full p-8 rounded-3xl border shadow-xl text-center relative overflow-hidden font-mono text-xl md:text-2xl font-bold tracking-widest break-all text-primary">
                    {password}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-muted-foreground block">Password Length: {length}</label>
                            <input
                                type="range" min="4" max="50" value={length}
                                onChange={(e) => setLength(Number(e.target.value))}
                                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input type="checkbox" checked={useUppercase} onChange={(e) => setUseUppercase(e.target.checked)} className="w-5 h-5 accent-primary" />
                                <span className="font-medium group-hover:text-primary transition-colors">Include Uppercase</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input type="checkbox" checked={useNumbers} onChange={(e) => setUseNumbers(e.target.checked)} className="w-5 h-5 accent-primary" />
                                <span className="font-medium group-hover:text-primary transition-colors">Include Numbers</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input type="checkbox" checked={useSymbols} onChange={(e) => setUseSymbols(e.target.checked)} className="w-5 h-5 accent-primary" />
                                <span className="font-medium group-hover:text-primary transition-colors">Include Symbols</span>
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 justify-center">
                        <button
                            onClick={generatePassword}
                            className="w-full h-14 rounded-2xl bg-card border font-bold hover:bg-muted transition-all flex items-center justify-center gap-2"
                        >
                            <RefreshCw size={20} /> Regenerate
                        </button>
                        <button
                            onClick={copyToClipboard}
                            className="w-full h-14 rounded-2xl bg-primary text-primary-foreground font-bold hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center justify-center gap-2"
                        >
                            {copied ? <Check size={20} /> : <Copy size={20} />}
                            {copied ? "Copy Password" : "Copy Password"}
                        </button>
                    </div>
                </div>
            </div>
        </CalculatorLayout>
    );
}
