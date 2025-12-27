'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TestEngine, ActiveTestSession } from '@/utils/testEngine';
import { Problem } from '@/data/problemBank';
import { Clock, ChevronLeft, ChevronRight, Save, Play, CheckCircle2, AlertCircle, Maximize2, Minimize2, Download, Printer } from 'lucide-react';
import Editor from '@monaco-editor/react';
import { toast } from 'sonner';
import axios from 'axios';

export default function TestSessionPage({ params }: { params: { sessionId: string } }) {
    const { sessionId } = params;
    const router = useRouter();

    // Test State
    const [session, setSession] = useState<ActiveTestSession | null>(null);
    const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(90 * 60);
    const [code, setCode] = useState('// Write your solution here...');
    const [mcqAnswer, setMcqAnswer] = useState<string | null>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isTestCompleted, setIsTestCompleted] = useState(false);

    // Answers State
    const [answers, setAnswers] = useState<Record<string, string>>({});

    // Execution State
    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [language, setLanguage] = useState('javascript');

    useEffect(() => {
        const blueprintId = sessionId.split('_')[0] || 'PRS-1';
        try {
            const newSession = TestEngine.assembleTest(blueprintId);
            setSession(newSession);
            const blueprint = TestEngine.getBlueprint(blueprintId);
            if (blueprint) setTimeLeft(blueprint.duration * 60);
        } catch (e) {
            toast.error("Invalid Test Session");
            router.push('/dashboard/tests');
        }
    }, [sessionId]);

    useEffect(() => {
        if (!timeLeft || isTestCompleted) return;
        const interval = setInterval(() => {
            setTimeLeft(t => {
                if (t <= 1) {
                    clearInterval(interval);
                    handleFinishTest();
                    return 0;
                }
                return t - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [timeLeft, isTestCompleted]);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullscreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                setIsFullscreen(false);
            }
        }
    };

    if (!session) return <div className="min-h-screen flex items-center justify-center">Loading Test Environment...</div>;

    const currentProblem = session.problems[currentProblemIndex];
    if (!currentProblem) return null; // Safety check

    const isLastProblem = currentProblemIndex === session.problems.length - 1;

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const saveCurrentAnswer = () => {
        const answer = currentProblem.type === 'coding' ? code : mcqAnswer;
        if (answer) {
            setAnswers(prev => ({
                ...prev,
                [currentProblem.id]: answer
            }));
        }
    };

    const handleNext = () => {
        saveCurrentAnswer();
        if (!isLastProblem) {
            const nextIdx = currentProblemIndex + 1;
            setCurrentProblemIndex(nextIdx);

            // Restore answer if exists
            const nextProb = session.problems[nextIdx];
            const existingAns = answers[nextProb.id];

            if (nextProb.type === 'coding') {
                setCode(existingAns || '// Write your solution here...');
                setOutput('');
            } else {
                setMcqAnswer(existingAns || null);
            }
        }
    };

    const handlePrev = () => {
        saveCurrentAnswer();
        if (currentProblemIndex > 0) {
            const prevIdx = currentProblemIndex - 1;
            setCurrentProblemIndex(prevIdx);
            // Restore answer
            const prevProb = session.problems[prevIdx];
            const existingAns = answers[prevProb.id];
            if (prevProb.type === 'coding') {
                setCode(existingAns || '// Write your solution here...');
                setOutput('');
            } else {
                setMcqAnswer(existingAns || null);
            }
        }
    };

    const handleFinishTest = () => {
        saveCurrentAnswer();
        setIsTestCompleted(true);
        if (document.fullscreenElement) document.exitFullscreen();

        // Save result for Dashboard
        const total = session!.problems.length;
        let score = 0;
        let codingScore = 0; let codingTotal = 0;
        let dsaScore = 0; let dsaTotal = 0;

        // Calculate scores
        session!.problems.forEach(p => {
            const userAns = answers[p.id];
            let isCorrect = false;

            if (p.type !== 'coding' && userAns && userAns === p.correctAnswer) {
                isCorrect = true;
                score++;
            }
            if (p.type === 'coding' && userAns && userAns.length > 50) {
                isCorrect = true; // Simulating correctness
                score++;
            }

            // Breakdown
            if (p.type === 'coding') {
                codingTotal++;
                if (isCorrect) codingScore++;
            } else {
                dsaTotal++;
                if (isCorrect) dsaScore++;
            }
        });

        const newResult = {
            id: session!.sessionId,
            date: new Date().toISOString(),
            score,
            total,
            codingScore: codingTotal > 0 ? (codingScore / codingTotal) * 100 : 0,
            dsaScore: dsaTotal > 0 ? (dsaScore / dsaTotal) * 100 : 0,
            interviewScore: Math.round(Math.random() * 40) + 60 // Mock Interview score for now
        };

        const existing = JSON.parse(localStorage.getItem('devlup_test_results') || '[]');
        localStorage.setItem('devlup_test_results', JSON.stringify([...existing, newResult]));

        toast.success("Test Submitted! Generating Report...");
    };

    const handleDownloadPDF = () => {
        window.print(); // Using browser print-to-pdf for simplicity
    };

    const handleRunCode = async () => {
        if (!code) return;
        setIsRunning(true);
        setOutput('Compiling and Running...');

        const pistonLanguageMap: Record<string, string> = {
            javascript: 'javascript',
            python: 'python',
            java: 'java',
            cpp: 'c++',
        };

        const languageVersions: Record<string, string> = {
            javascript: '18.15.0',
            python: '3.10.0',
            java: '15.0.2',
            cpp: '10.2.0',
        };

        try {
            const response = await axios.post('https://emkc.org/api/v2/piston/execute', {
                language: pistonLanguageMap[language],
                version: languageVersions[pistonLanguageMap[language]] || '*',
                files: [{ content: code }]
            });
            const { run } = response.data;
            setOutput(run.output || 'No output.');
        } catch (error: any) {
            setOutput(`Error: ${error.message}`);
        } finally {
            setIsRunning(false);
        }
    };

    // --- RESULTS VIEW ---
    if (isTestCompleted) {
        const total = session.problems.length;
        // Mock simple scoring logic
        let score = 0;
        session.problems.forEach(p => {
            const userAns = answers[p.id];
            if (p.type !== 'coding' && userAns && userAns === p.correctAnswer) {
                score++;
            }
            // For coding, we assume it's "Submitted" for now
            if (p.type === 'coding' && userAns && userAns.length > 50) {
                score++;
            }
        });
        const percentage = Math.round((score / total) * 100);

        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8 print:bg-white print:p-0">
                <style jsx global>{`
                    @media print {
                        .no-print { display: none !important; }
                        .print-only { display: block !important; }
                        body { background: white; }
                    }
                `}</style>

                <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full overflow-hidden print:shadow-none print:w-full">
                    {/* Results Header */}
                    <div className="bg-[#1a1f2c] text-white p-8 text-center print:bg-white print:text-black print:border-b-2 print:border-black">
                        <h1 className="text-3xl font-bold mb-2">Assessment Report</h1>
                        <p className="text-gray-400 print:text-gray-600">{session.blueprintId} - {new Date().toLocaleDateString()}</p>

                        <div className="flex justify-center gap-8 mt-6">
                            <div className="text-center">
                                <div className="text-4xl font-bold text-green-400">{score}/{total}</div>
                                <div className="text-xs uppercase tracking-wider text-gray-500">Score</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-blue-400">{percentage}%</div>
                                <div className="text-xs uppercase tracking-wider text-gray-500">Accuracy</div>
                            </div>
                        </div>
                    </div>

                    {/* Action Bar */}
                    <div className="p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center no-print">
                        <button onClick={() => router.push('/dashboard/tests')} className="text-gray-500 hover:text-gray-900 font-medium text-sm">
                            &larr; Back to Dashboard
                        </button>
                        <button
                            onClick={handleDownloadPDF}
                            className="bg-brand-primary text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-brand-secondary transition-colors"
                        >
                            <Download className="w-4 h-4" /> Download Solution PDF
                        </button>
                    </div>

                    {/* Detailed Solutions */}
                    <div className="p-8 space-y-8">
                        <h2 className="text-xl font-bold text-gray-900 pb-2 border-b border-gray-200">Test Analysis & Solutions</h2>

                        {session.problems.map((prob, idx) => (
                            <div key={prob.id} className="break-inside-avoid">
                                <div className="flex items-start gap-3 mb-2">
                                    <span className="font-mono text-gray-400 font-bold">Q{idx + 1}.</span>
                                    <div>
                                        <h3 className="font-bold text-gray-900 text-lg leading-tight">{prob.title}</h3>
                                        <div className="flex gap-2 mt-1 mb-2">
                                            <span className="text-xs font-bold uppercase text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{prob.type}</span>
                                            <span className="text-xs font-bold uppercase text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{prob.difficulty}</span>
                                        </div>
                                        <p className="text-gray-700 mb-3">{prob.description}</p>

                                        {/* Status */}
                                        <div className="flex items-center gap-4 text-sm mb-3">
                                            <div className="flex items-center gap-2">
                                                <span className="text-gray-500">Your Answer:</span>
                                                <span className={`font-mono font-bold ${answers[prob.id] === prob.correctAnswer ? 'text-green-600' : 'text-red-500'}`}>
                                                    {answers[prob.id] || '(Skipped)'}
                                                </span>
                                            </div>
                                            {prob.type !== 'coding' && (
                                                <div className="flex items-center gap-2">
                                                    <span className="text-gray-500">Correct Answer:</span>
                                                    <span className="font-mono font-bold text-green-600">{prob.correctAnswer}</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Explanation */}
                                        <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg text-sm text-blue-900">
                                            <span className="font-bold block mb-1">Explanation / Solution:</span>
                                            <div className="whitespace-pre-wrap">{prob.explanation || prob.solution || 'Detailed solution steps are provided in the learning module for this topic.'}</div>
                                        </div>
                                    </div>
                                </div>
                                {idx < session.problems.length - 1 && <hr className="my-6 border-gray-100" />}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // --- TEST INTERFACE (Same as before) ---
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
                <div className="flex items-center gap-4">
                    <h1 className="font-bold text-gray-900">{session.blueprintId} Assessment</h1>
                    <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded font-mono hidden md:inline-block">
                        {sessionId}
                    </span>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleFullscreen}
                        className="p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
                        title="Toggle Fullscreen"
                    >
                        {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                    </button>

                    <div className="flex items-center gap-2 text-gray-700 bg-gray-100 px-3 py-1.5 rounded-lg border border-gray-200">
                        <Clock className="w-4 h-4 text-brand-primary" />
                        <span className="font-mono font-bold text-lg">{formatTime(timeLeft)}</span>
                    </div>
                    <button
                        className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 font-semibold text-sm"
                        onClick={handleFinishTest}
                    >
                        Finish Test
                    </button>
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
                {/* Question Navigator Sidebar */}
                <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex">
                    <div className="p-4 border-b border-gray-200">
                        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Question Navigator</h2>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 grid grid-cols-5 gap-2 content-start">
                        {session.problems.map((prob, idx) => (
                            <button
                                key={prob.id}
                                onClick={() => setCurrentProblemIndex(idx)}
                                className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold border transition-all ${currentProblemIndex === idx
                                    ? 'bg-brand-primary text-white border-brand-primary'
                                    : answers[prob.id] // Check if answered
                                        ? 'bg-green-100 text-green-700 border-green-200'
                                        : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-brand-primary/50'
                                    }`}
                            >
                                {idx + 1}
                            </button>
                        ))}
                    </div>
                    <div className="p-4 border-t border-gray-200 bg-gray-50">
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                            Summary: {session.problems.length} Questions
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                    {/* Problem Description */}
                    <div className={`flex-1 p-6 overflow-y-auto ${currentProblem.type === 'coding' ? 'lg:w-[40%] border-r border-gray-200' : 'w-full max-w-4xl mx-auto'}`}>
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-4">
                                <span className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-wider ${currentProblem.type === 'coding' ? 'bg-blue-100 text-blue-700' :
                                    currentProblem.type === 'aptitude' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'
                                    }`}>
                                    {currentProblem.type}
                                </span>
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    {currentProblem.difficulty}
                                </span>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mt-2 mb-4">
                                {currentProblemIndex + 1}. {currentProblem.title}
                            </h2>
                            <div className="prose prose-sm max-w-none text-gray-700">
                                <p>{currentProblem.description}</p>
                            </div>
                        </div>

                        {/* MCQ Options */}
                        {currentProblem.type === 'mcq' || currentProblem.type === 'aptitude' ? (
                            <div className="space-y-3 mt-8">
                                {currentProblem.options?.map((option, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setMcqAnswer(option)}
                                        className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${mcqAnswer === option
                                            ? 'border-brand-primary bg-brand-primary/5'
                                            : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${mcqAnswer === option ? 'border-brand-primary' : 'border-gray-300'
                                            }`}>
                                            {mcqAnswer === option && <div className="w-2.5 h-2.5 rounded-full bg-brand-primary" />}
                                        </div>
                                        <span className={mcqAnswer === option ? 'font-medium text-gray-900' : 'text-gray-600'}>
                                            {option}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        ) : null}
                    </div>

                    {/* Coding Editor (Only for Coding Problems) */}
                    {currentProblem.type === 'coding' && (
                        <div className="flex-1 flex flex-col bg-[#1e1e1e] lg:w-[60%]">
                            <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-[#3e3e3e]">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-gray-400 font-mono">Language:</span>
                                    <select
                                        value={language}
                                        onChange={(e) => setLanguage(e.target.value)}
                                        className="bg-[#1e1e1e] text-xs text-gray-200 border border-gray-600 rounded px-2 py-1 outline-none focus:border-blue-500"
                                    >
                                        <option value="javascript">JavaScript</option>
                                        <option value="python">Python</option>
                                        <option value="java">Java</option>
                                        <option value="cpp">C++</option>
                                    </select>
                                </div>
                                <button
                                    onClick={handleRunCode}
                                    disabled={isRunning}
                                    className="text-xs flex items-center gap-1 text-green-400 hover:text-green-300 disabled:opacity-50"
                                >
                                    <Play className="w-3 h-3" /> {isRunning ? 'Running...' : 'Run Code'}
                                </button>
                            </div>
                            <div className="flex-1 relative">
                                <Editor
                                    height="100%"
                                    defaultLanguage="javascript"
                                    language={language}
                                    theme="vs-dark"
                                    value={code}
                                    onChange={(val) => setCode(val || '')}
                                    options={{
                                        minimap: { enabled: false },
                                        fontSize: 14,
                                        scrollBeyondLastLine: false,
                                    }}
                                />
                            </div>
                            {/* Output Console */}
                            <div className="h-40 bg-black border-t border-[#3e3e3e] flex flex-col">
                                <div className="px-4 py-1 bg-[#2d2d2d] text-xs text-gray-400 font-mono uppercase">Output</div>
                                <div className="p-4 font-mono text-sm text-gray-300 overflow-auto flex-1">
                                    {output || <span className="text-gray-600 italic">Run code to see output...</span>}
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>

            {/* Footer Navigation */}
            <footer className="bg-white border-t border-gray-200 px-6 py-4 flex justify-between items-center">
                <button
                    onClick={handlePrev}
                    disabled={currentProblemIndex === 0}
                    className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    <ChevronLeft className="w-4 h-4" /> Previous
                </button>

                <div className="flex gap-2">
                    {isLastProblem ? (
                        <button
                            onClick={handleFinishTest}
                            className="px-6 py-2 rounded-lg bg-green-600 text-white font-bold hover:bg-green-700 shadow-sm flex items-center gap-2"
                        >
                            Submit Test <CheckCircle2 className="w-4 h-4" />
                        </button>
                    ) : (
                        <button
                            onClick={handleNext}
                            className="px-6 py-2 rounded-lg bg-brand-primary text-white font-bold hover:bg-violet-700 shadow-sm flex items-center gap-2"
                        >
                            Next Question <ChevronRight className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </footer>
        </div>
    );
}
