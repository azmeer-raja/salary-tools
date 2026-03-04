"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/calculator/CalculatorLayout";
import { InputField, ResultCard } from "@/components/ui/CalculatorUI";
import { GraduationCap, Plus, Trash2, Calculator } from "lucide-react";

interface Course {
    id: number;
    grade: number;
    credits: number;
}

export default function GPACalculator() {
    const [courses, setCourses] = useState<Course[]>([
        { id: 1, grade: 4, credits: 3 },
        { id: 2, grade: 3, credits: 3 },
    ]);

    const addCourse = () => {
        setCourses([...courses, { id: Date.now(), grade: 4, credits: 3 }]);
    };

    const removeCourse = (id: number) => {
        setCourses(courses.filter((c) => c.id !== id));
    };

    const updateCourse = (id: number, field: keyof Course, value: number) => {
        setCourses(courses.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
    };

    const totalCredits = courses.reduce((acc, c) => acc + c.credits, 0);
    const totalPoints = courses.reduce((acc, c) => acc + c.grade * c.credits, 0);
    const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;

    return (
        <CalculatorLayout
            title="GPA Calculator"
            description="Easy way to calculate your semester or cumulative GPA based on course grades and credits."
            icon={<GraduationCap className="text-primary" />}
        >
            <div className="space-y-6">
                <div className="space-y-4">
                    {courses.map((course, index) => (
                        <div key={course.id} className="flex gap-4 items-end bg-card/50 p-4 rounded-2xl border">
                            <div className="flex-1">
                                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1 mb-2 block">Grade (0-4)</label>
                                <input
                                    type="number"
                                    className="w-full h-12 rounded-xl border bg-background px-4 font-bold outline-none focus:border-primary transition-all"
                                    value={course.grade}
                                    onChange={(e) => updateCourse(course.id, 'grade', Number(e.target.value))}
                                    step="0.1"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1 mb-2 block">Credits</label>
                                <input
                                    type="number"
                                    className="w-full h-12 rounded-xl border bg-background px-4 font-bold outline-none focus:border-primary transition-all"
                                    value={course.credits}
                                    onChange={(e) => updateCourse(course.id, 'credits', Number(e.target.value))}
                                />
                            </div>
                            <button
                                onClick={() => removeCourse(course.id)}
                                className="h-12 w-12 flex items-center justify-center rounded-xl bg-destructive/10 text-destructive hover:bg-destructive hover:text-white transition-all"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    ))}
                </div>

                <button
                    onClick={addCourse}
                    className="w-full h-12 rounded-xl border-2 border-dashed border-primary/30 text-primary font-bold hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
                >
                    <Plus size={20} /> Add Course
                </button>
            </div>

            <div className="space-y-6">
                <div className="bg-primary/5 rounded-3xl p-8 border border-primary/10">
                    <p className="text-sm font-bold text-primary mb-1 uppercase tracking-wider">Your Semester GPA</p>
                    <p className="text-5xl md:text-6xl font-black text-primary">
                        {gpa.toFixed(2)}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <ResultCard
                        label="Total Credits"
                        value={totalCredits.toString()}
                        icon={<Calculator size={16} />}
                    />
                    <ResultCard
                        label="Quality Points"
                        value={totalPoints.toFixed(1)}
                        icon={<GraduationCap size={16} />}
                        variant="primary"
                    />
                </div>
            </div>
        </CalculatorLayout>
    );
}
