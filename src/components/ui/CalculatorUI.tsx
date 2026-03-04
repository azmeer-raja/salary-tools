import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface InputFieldProps {
    label: string;
    id: string;
    type?: string;
    value: string | number;
    onChange: (val: string) => void;
    prefix?: string;
    suffix?: string;
    className?: string;
    step?: string;
}

export function InputField({ label, id, type = "number", value, onChange, prefix, suffix, className, step }: InputFieldProps) {
    return (
        <div className={cn("space-y-2.5", className)}>
            <label htmlFor={id} className="text-xs font-black uppercase tracking-widest text-muted-foreground/80 ml-1">
                {label}
            </label>
            <div className="relative group">
                {prefix && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-bold pointer-events-none group-focus-within:text-primary transition-all duration-300">
                        {prefix}
                    </div>
                )}
                <input
                    id={id}
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    step={step}
                    className={cn(
                        "w-full h-14 rounded-2xl border bg-card/50 px-4 py-2 outline-none focus:border-primary focus:ring-8 focus:ring-primary/5 transition-all duration-300 text-lg font-bold placeholder:text-muted-foreground/30",
                        prefix && "pl-11",
                        suffix && "pr-11"
                    )}
                />
                {suffix && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-bold pointer-events-none group-focus-within:text-primary transition-all duration-300">
                        {suffix}
                    </div>
                )}
            </div>
        </div>
    );
}

interface ResultCardProps {
    label: string;
    value: string;
    description?: string;
    variant?: "default" | "primary" | "secondary";
    icon?: ReactNode;
}

export function ResultCard({ label, value, description, variant = "default", icon }: ResultCardProps) {
    const variants = {
        default: "glass",
        primary: "premium-gradient text-white shadow-2xl shadow-primary/20",
        secondary: "bg-secondary/30 border border-secondary"
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className={cn("p-8 rounded-3xl flex flex-col justify-center relative overflow-hidden group transition-all duration-500", variants[variant])}
        >
            <div className="flex items-center gap-2.5 mb-2 relative z-10">
                {icon && <div className={cn("p-2 rounded-xl bg-background/10", variant === 'primary' ? "text-white" : "text-primary")}>{icon}</div>}
                <p className={cn("text-[10px] font-black uppercase tracking-[0.2em] opacity-60", variant === 'primary' && "opacity-90")}>
                    {label}
                </p>
            </div>
            <motion.p
                key={value}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-3xl md:text-4xl font-black tracking-tighter mb-1 relative z-10 font-display"
            >
                {value}
            </motion.p>
            {description && <p className="text-xs font-medium opacity-60 relative z-10">{description}</p>}

            {variant === 'primary' && (
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
            )}
        </motion.div>
    );
}
