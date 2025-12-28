"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Clock, Laptop } from "lucide-react";

export default function MobileIntroPage() {
    return (
        <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in duration-500">

            {/* Header */}
            <div className="space-y-4">
                <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Laptop className="w-8 h-8 text-brand-primary" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                    Welcome to <span className="text-brand-primary">Edu-Chatpilot</span>
                </h1>
                <p className="text-gray-600 max-w-xs mx-auto">
                    You've successfully enrolled! Your journey to crack tech interviews starts now.
                </p>
            </div>

            {/* Warning Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-100 max-w-sm w-full">
                <div className="text-orange-600 font-bold text-sm uppercase tracking-wide mb-2 flex items-center justify-center gap-2">
                    <Laptop className="w-4 h-4" /> Desktop Required
                </div>
                <p className="text-gray-600 text-sm">
                    Our interactive coding environment and AI mock interviews are optimized for desktop.
                    <span className="font-bold block mt-2 text-gray-800">Please open this link on your Laptop/PC to start learning.</span>
                </p>
            </div>

            {/* Course Overview */}
            <div className="w-full max-w-sm text-left space-y-6">
                <h3 className="font-bold text-gray-900 border-b pb-2">Course Overview</h3>

                <div className="flex gap-4 items-start">
                    <div className="bg-blue-100 p-2 rounded-lg"><Clock className="w-5 h-5 text-blue-600" /></div>
                    <div>
                        <h4 className="font-bold text-gray-900">24-Day Sprint</h4>
                        <p className="text-xs text-gray-500">Intensive timeline covering DSA, System Design, and Behavioural rounds.</p>
                    </div>
                </div>

                <div className="flex gap-4 items-start">
                    <div className="bg-purple-100 p-2 rounded-lg"><BookOpen className="w-5 h-5 text-purple-600" /></div>
                    <div>
                        <h4 className="font-bold text-gray-900">Comprehensive Syllabus</h4>
                        <p className="text-xs text-gray-500">From Arrays & Strings to Dynamic Programming & Graph Algorithms.</p>
                    </div>
                </div>
            </div>

            {/* Action */}
            <div className="w-full max-w-sm pt-4">
                <p className="text-xs text-gray-400 mb-4 text-center">
                    Account linked with your email. Progress syncs automatically.
                </p>
                <Link href="/dashboard" className="hidden">
                    {/* Hidden link just in case they force desktop mode, logic handled in dashboard */}
                    <button className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold">
                        Continue anyway (Not Recommended)
                    </button>
                </Link>
            </div>
        </div>
    );
}
