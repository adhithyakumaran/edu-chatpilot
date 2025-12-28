"use client";

import Link from "next/link";
import { Laptop, BookOpen, Clock, CheckCircle2, Star, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function MobileIntroPage() {
    const [openSyllabus, setOpenSyllabus] = useState(false);

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-[#6C5DD3] to-[#8B5CF6] text-white p-8 rounded-b-[40px] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Laptop className="w-32 h-32" />
                </div>

                <div className="relative z-10 flex flex-col items-center text-center space-y-4 pt-4">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 shadow-lg mb-2">
                        <Laptop className="w-8 h-8 text-white" />
                    </div>

                    <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm border border-white/30">
                        For Aspiring Engineers
                    </span>

                    <h1 className="text-3xl font-extrabold leading-tight">
                        Edu-Chatpilot
                    </h1>
                    <p className="text-white/90 text-sm max-w-xs leading-relaxed">
                        Your professional coding environment is ready. Access it on desktop to start your journey.
                    </p>
                </div>
            </div>

            {/* Content Container */}
            <div className="px-6 -mt-8 relative z-20 space-y-6 pb-12">

                {/* Warning Card */}
                <div className="bg-white p-5 rounded-2xl shadow-xl border border-[#6C5DD3]/10 flex flex-col items-center text-center space-y-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                        <Laptop className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900">Desktop Required</h3>
                        <p className="text-xs text-gray-500 mt-1">
                            The IDE and Mock Interviews require a larger screen for the best experience.
                        </p>
                    </div>
                </div>

                {/* Why Join? */}
                <div className="space-y-4">
                    <h3 className="font-bold text-gray-900 text-lg px-2">Why This Course?</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                            <Clock className="w-6 h-6 text-[#6C5DD3] mb-2" />
                            <h4 className="font-bold text-gray-900 text-sm">24-Day Sprint</h4>
                            <p className="text-[10px] text-gray-500 mt-1">Fast-track your placement prep.</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                            <BookOpen className="w-6 h-6 text-[#6C5DD3] mb-2" />
                            <h4 className="font-bold text-gray-900 text-sm">DSA & System</h4>
                            <p className="text-[10px] text-gray-500 mt-1">Complete technical coverage.</p>
                        </div>
                    </div>
                </div>

                {/* Syllabus Preview */}
                <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                    <button
                        onClick={() => setOpenSyllabus(!openSyllabus)}
                        className="w-full bg-gray-50 p-4 flex justify-between items-center"
                    >
                        <span className="font-bold text-gray-900 text-sm">Course Syllabus Preview</span>
                        {openSyllabus ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                    </button>

                    {openSyllabus && (
                        <div className="bg-white p-4 space-y-3 animate-in slide-in-from-top-2">
                            {[
                                "Week 1: Arrays, Strings & HashMaps",
                                "Week 2: Trees, Graphs & DP",
                                "Week 3: System Design Basics",
                                "Week 4: Mock Interviews & Resume"
                            ].map((item, i) => (
                                <div key={i} className="flex gap-3 text-sm items-center">
                                    <div className="w-6 h-6 rounded-full bg-[#6C5DD3]/10 flex items-center justify-center text-[10px] font-bold text-[#6C5DD3]">
                                        {i + 1}
                                    </div>
                                    <span className="text-gray-600">{item}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Social Proof */}
                <div className="bg-[#6C5DD3] text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
                    <Star className="w-24 h-24 text-white/5 absolute -bottom-4 -right-4 rotate-12" />
                    <h3 className="font-bold text-lg mb-2 relative z-10">Student Success</h3>
                    <div className="space-y-3 relative z-10">
                        <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/10">
                            <p className="text-xs italic text-white/90">"Helped me crack my Amazon internship. The AI mocks are insane!"</p>
                            <p className="text-[10px] font-bold mt-2 text-white/70">- Rahul S, IIT Madras</p>
                        </div>
                    </div>
                </div>

                {/* Action */}
                <div className="pt-4 text-center">
                    <p className="text-xs text-gray-400 mb-4">
                        Registered with email. Log in on PC to continue.
                    </p>
                    <Link href="/dashboard" className="hidden">
                        <button className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold">
                            Continue anyway
                        </button>
                    </Link>
                </div>

            </div>
        </div>
    );
}
