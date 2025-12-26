'use client';

import { useState } from 'react';
import { PlayCircle, Lock, Award, BarChart3, Clock, CheckCircle2, Brain, Target } from 'lucide-react';
import { TestEngine } from '@/utils/testEngine';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function TestsPage() {
    const blueprints = TestEngine.getAllBlueprints();
    const router = useRouter();
    const [loadingTestId, setLoadingTestId] = useState<string | null>(null);

    const handleStartTest = (blueprintId: string) => {
        setLoadingTestId(blueprintId);

        // Simulating AI Assembly Engine delay
        toast.promise(
            new Promise((resolve) => setTimeout(resolve, 2000)),
            {
                loading: 'AI Assembly Engine: Building unique test from Problem Bank...',
                success: () => {
                    // In a real app, we'd save the session to DB here
                    const session = TestEngine.assembleTest(blueprintId);
                    // For demo, we just simulate success and would redirect to session page
                    router.push(`/dashboard/tests/session/${session.sessionId}`);
                    setLoadingTestId(null);
                    return `Test ${session.sessionId} assembled! (Redirecting...)`;
                },
                error: 'Failed to assemble test'
            }
        );
    };

    const [stats, setStats] = useState({ overall: 0, coding: 0, dsa: 0, interview: 0, taken: false });

    // Load Stats on Mount
    useState(() => {
        if (typeof window !== 'undefined') {
            const results = JSON.parse(localStorage.getItem('devlup_test_results') || '[]');
            if (results.length > 0) {
                const totalTests = results.length;
                const avgCoding = results.reduce((acc: any, r: any) => acc + r.codingScore, 0) / totalTests;
                const avgDsa = results.reduce((acc: any, r: any) => acc + r.dsaScore, 0) / totalTests;
                const avgInterview = results.reduce((acc: any, r: any) => acc + r.interviewScore, 0) / totalTests;

                // Overall weighted: 40% Coding, 40% DSA, 20% Interview
                const overall = Math.round((avgCoding * 0.4) + (avgDsa * 0.4) + (avgInterview * 0.2));

                setStats({
                    overall,
                    coding: Math.round(avgCoding),
                    dsa: Math.round(avgDsa),
                    interview: Math.round(avgInterview),
                    taken: true
                });
            }
        }
    });

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Placement Readiness Center</h1>
                <p className="text-gray-500">Benchmark your skills against real company standards with AI-generated tests.</p>
            </div>

            {/* Placement Readiness Score */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm col-span-1 md:col-span-4 lg:col-span-1">
                    <h3 className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-4">Overall Readiness</h3>
                    <div className="flex items-center gap-4">
                        <div className="relative w-20 h-20 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="40" cy="40" r="36" stroke="#f3f4f6" strokeWidth="8" fill="none" />
                                <circle cx="40" cy="40" r="36" stroke={stats.overall > 70 ? "#22c55e" : "#8b5cf6"} strokeWidth="8" fill="none" strokeDasharray="226" strokeDashoffset={226 - (226 * stats.overall / 100)} />
                            </svg>
                            <span className="absolute text-xl font-bold text-gray-900">{stats.overall}%</span>
                        </div>
                        <div>
                            <p className={`font-bold text-lg ${stats.overall > 70 ? "text-green-600" : "text-brand-primary"}`}>
                                {stats.taken ? (stats.overall > 70 ? "Job Ready!" : "Keep Pushing") : "Not Assessed"}
                            </p>
                            <p className="text-xs text-gray-500">{stats.taken ? "Based on recent tests" : "Take PRS-1 to start"}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
                    <div className="flex items-center gap-3 mb-2">
                        <CodeIcon className="w-5 h-5 text-blue-500" />
                        <span className="font-semibold text-gray-700">Coding</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stats.coding}%</div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
                        <div className="bg-blue-500 h-full rounded-full transition-all duration-1000" style={{ width: `${stats.coding}%` }}></div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
                    <div className="flex items-center gap-3 mb-2">
                        <Brain className="w-5 h-5 text-orange-500" />
                        <span className="font-semibold text-gray-700">DSA Logic</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stats.dsa}%</div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
                        <div className="bg-orange-500 h-full rounded-full transition-all duration-1000" style={{ width: `${stats.dsa}%` }}></div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
                    <div className="flex items-center gap-3 mb-2">
                        <Target className="w-5 h-5 text-green-500" />
                        <span className="font-semibold text-gray-700">Interview</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stats.interview}%</div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
                        <div className="bg-green-500 h-full rounded-full transition-all duration-1000" style={{ width: `${stats.interview}%` }}></div>
                    </div>
                </div>
            </div>

            {/* PRS Series */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Placement Readiness Series (PRS)</h2>
                        <p className="text-sm text-gray-500">Sequential tests simulating real hiring rounds. Complete PRS-1 to unlock PRS-2.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {blueprints.map((test, index) => (
                        <div
                            key={test.id}
                            className={`group relative bg-white border rounded-xl p-6 transition-all hover:shadow-md border-brand-primary/20 ring-1 ring-brand-primary/10`}
                        >
                            <div className="flex items-start justify-between">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-gray-900 text-lg">{test.name}</h3>
                                        <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-bold">UNLOCKED</span>
                                    </div>
                                    <p className="text-gray-600 text-sm max-w-2xl">{test.description}</p>

                                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="w-4 h-4" />
                                            <span>{test.duration} mins</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <CheckCircle2 className="w-4 h-4" />
                                            <span>{test.totalQuestions} Questions</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <BarChart3 className="w-4 h-4" />
                                            <span>Pass Score: {test.passScore}%</span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleStartTest(test.id)}
                                    disabled={loadingTestId === test.id}
                                    className="px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all bg-brand-primary text-white hover:bg-violet-700 shadow-sm hover:shadow-md"
                                >
                                    {loadingTestId === test.id ? (
                                        <>
                                            <div className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full"></div>
                                            <span>Assembling...</span>
                                        </>
                                    ) : (
                                        <>
                                            <PlayCircle className="w-4 h-4" />
                                            <span>Start Test</span>
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Section Preview */}
                            <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-4">
                                {test.sections.map((section, idx) => (
                                    <div key={idx} className="text-xs text-gray-500 flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                                        {section.title} ({section.count})
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Topic Tests (Placeholder for now) */}
            <div className="mt-8 pt-8 border-t border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Topic-Wise Practice</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 opacity-75">
                    {['Arrays & Strings', 'LinkedLists', 'Trees & Graphs'].map(topic => (
                        <div key={topic} className="bg-gray-50 border border-gray-200 p-4 rounded-xl flex justify-between items-center">
                            <span className="font-semibold text-gray-700">{topic} Test</span>
                            <button className="text-brand-primary text-sm font-bold">Practice</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function CodeIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
        </svg>
    )
}
