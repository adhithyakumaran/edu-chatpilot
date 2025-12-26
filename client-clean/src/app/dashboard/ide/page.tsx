'use client';

import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Play, RotateCcw, Save, Settings, Terminal, Sparkles, Wand2 } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { API_URL } from '@/services/placementApi';

export default function IdePage() {
    const CODE_SNIPPETS: Record<string, string> = {
        javascript: `// Welcome to the ChatPilot IDE
console.log("Hello, World!");

function greet(name) {
    return "Hello, " + name + "!";
}

console.log(greet("Student"));`,
        python: `# Welcome to the ChatPilot IDE
print("Hello, World!")

def greet(name):
    return f"Hello, {name}!"

print(greet("Student"))`,
        java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.println("Input required! Enter a number below.");
        int number = scanner.nextInt();
        System.out.println("You entered: " + number);
        
        scanner.close();
    }
}`,
        cpp: `// Welcome to the ChatPilot IDE
#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`,
        html: `<!-- Welcome to the ChatPilot IDE -->
<!DOCTYPE html>
<html>
<head>
    <title>Hello World</title>
</head>
<body>
    <h1>Hello, World!</h1>
</body>
</html>`
    };

    const [language, setLanguage] = useState('javascript');
    const [theme, setTheme] = useState('vs-dark');
    const [code, setCode] = useState(CODE_SNIPPETS['javascript']);
    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);

    const [stdin, setStdin] = useState('');

    // AI State
    const [activeTab, setActiveTab] = useState<'console' | 'ai'>('console');
    const [aiFeedback, setAiFeedback] = useState('');
    const [isAiLoading, setIsAiLoading] = useState(false);

    const handleLanguageChange = (newLanguage: string) => {
        setLanguage(newLanguage);
        setCode(CODE_SNIPPETS[newLanguage] || '');
        setOutput(''); // Clear output on language switch
        setAiFeedback('');
        setActiveTab('console');
    };

    const handleAskAI = async () => {
        if (!code.trim()) {
            toast.error("Please write some code first!");
            return;
        }

        setIsAiLoading(true);
        setActiveTab('ai'); // Switch to AI tab

        try {
            const response = await axios.post(`${API_URL}/ai/analyze`, {
                code,
                language
            });
            setAiFeedback(response.data.feedback);
            toast.success("AI Analysis Complete!");
        } catch (error) {
            console.error(error);
            setAiFeedback("Failed to connect to AI Tutor. Please try again.");
            toast.error("AI connection failed.");
        } finally {
            setIsAiLoading(false);
        }
    };

    const handleRun = async () => {
        // Smart Input Detection
        // If code looks like it needs input but STDIN is empty, warn the user
        const inputPatterns: Record<string, RegExp[]> = {
            java: [/Scanner|System\.in|Console\.read/],
            python: [/input\(/, /sys\.stdin/],
            cpp: [/cin|getline/],
        };

        const patterns = inputPatterns[language];
        if (patterns && !stdin.trim()) {
            const needsInput = patterns.some(pattern => pattern.test(code));
            if (needsInput) {
                toast.error("Input Required! Please provide values in the 'Standard Input' box below.", {
                    duration: 4000
                });
                setActiveTab('console');
                // Optional: find the stdin textarea and focus it if possible, but the toast message is clear enough
                return; // Stop execution
            }
        }

        setIsRunning(true);
        setOutput('Compiling and Running...');
        setActiveTab('console');

        const pistonLanguageMap: Record<string, string> = {
            javascript: 'javascript',
            python: 'python',
            java: 'java',
            cpp: 'c++',
            html: 'html',
        };

        const languageVersions: Record<string, string> = {
            javascript: '18.15.0',
            python: '3.10.0',
            java: '15.0.2',
            c: '10.2.0',
            'c++': '10.2.0',
            html: '5',
        };

        const targetLang = pistonLanguageMap[language];
        const version = languageVersions[targetLang] || '*';

        try {
            const response = await axios.post('https://emkc.org/api/v2/piston/execute', {
                language: targetLang,
                version: version,
                files: [
                    {
                        content: code
                    }
                ],
                stdin: stdin
            });

            const { run } = response.data;
            setOutput(run.output || 'No output.');
        } catch (error: any) {
            console.error('Execution Failed:', error);
            setOutput(`Error connecting to execution engine.\n${error.message}`);
            toast.error("Execution failed");
        } finally {
            setIsRunning(false);
        }
    };

    const handleClear = () => {
        setOutput('');
        toast.info("Console cleared");
    };

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col gap-4">
            {/* Toolbar */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-wrap items-center justify-between gap-4 shrink-0">
                <div className="flex items-center gap-4">
                    <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <Terminal className="w-6 h-6 text-brand-primary" />
                        Coding IDE
                    </h1>

                    <div className="h-6 w-px bg-gray-200"></div>

                    <select
                        value={language}
                        onChange={(e) => handleLanguageChange(e.target.value)}
                        className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-brand-primary focus:border-brand-primary block p-2.5"
                    >
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                        <option value="cpp">C++</option>
                        <option value="html">HTML</option>
                    </select>

                    <select
                        value={theme}
                        onChange={(e) => setTheme(e.target.value)}
                        className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-brand-primary focus:border-brand-primary block p-2.5"
                    >
                        <option value="vs-dark">Dark Theme</option>
                        <option value="light">Light Theme</option>
                    </select>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={handleClear}
                        className="p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Clear Console"
                    >
                        <RotateCcw className="w-5 h-5" />
                    </button>
                    <button
                        className="p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Save Code"
                    >
                        <Save className="w-5 h-5" />
                    </button>
                    <button
                        onClick={handleRun}
                        disabled={isRunning}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-green-600/20"
                    >
                        {isRunning ? 'Running...' : (
                            <>
                                <Play className="w-4 h-4" /> Run Code
                            </>
                        )}
                    </button>

                    <button
                        onClick={handleAskAI}
                        disabled={isAiLoading}
                        className="flex items-center gap-2 bg-brand-primary hover:bg-brand-secondary text-white px-5 py-2.5 rounded-lg font-bold transition-all disabled:opacity-50 shadow-lg shadow-brand-primary/20"
                    >
                        {isAiLoading ? '...' : <Sparkles className="w-4 h-4" />}
                        Ask AI
                    </button>
                </div>
            </div>

            {/* Main Editor Area */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
                {/* Editor */}
                <div className="lg:col-span-2 bg-[#1e1e1e] rounded-2xl overflow-hidden shadow-lg flex flex-col relative">
                    <Editor
                        height="100%"
                        defaultLanguage="javascript"
                        language={language}
                        theme={theme}
                        value={code}
                        onChange={(value) => setCode(value || '')}
                        loading={<div className="text-white p-4">Loading Editor...</div>}
                        options={{
                            minimap: { enabled: true },
                            fontSize: 14,
                            scrollBeyondLastLine: false,
                            automaticLayout: true,
                            padding: { top: 20 },
                            fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",

                            // Intellisense & Errors
                            quickSuggestions: true,
                            suggestOnTriggerCharacters: true,
                            parameterHints: { enabled: true },
                            wordWrap: 'on',
                            renderValidationDecorations: 'on',
                            colorDecorators: true,
                        }}
                    />
                </div>

                {/* Right Panel: Console & AI */}
                <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg flex flex-col border border-gray-800 relative">
                    {/* Tabs */}
                    <div className="bg-gray-800 flex items-center border-b border-gray-700 shrink-0">
                        <button
                            onClick={() => setActiveTab('console')}
                            className={`px-4 py-3 text-sm font-bold flex items-center gap-2 transition-colors ${activeTab === 'console' ? 'text-white bg-gray-700 border-b-2 border-brand-primary' : 'text-gray-400 hover:text-gray-200'}`}
                        >
                            <Terminal className="w-4 h-4" /> Console
                        </button>
                        <button
                            onClick={() => setActiveTab('ai')}
                            className={`px-4 py-3 text-sm font-bold flex items-center gap-2 transition-colors ${activeTab === 'ai' ? 'text-white bg-gray-700 border-b-2 border-brand-primary' : 'text-gray-400 hover:text-gray-200'}`}
                        >
                            <Sparkles className="w-4 h-4 text-yellow-400" /> AI Tutor
                        </button>

                        <div className="ml-auto pr-3 flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-4 font-mono text-sm overflow-auto custom-scrollbar relative flex flex-col">
                        {activeTab === 'console' ? (
                            <>
                                <div className="flex-1 overflow-auto">
                                    {output ? (
                                        <pre className="text-green-400 whitespace-pre-wrap break-all">{output}</pre>
                                    ) : (
                                        <div className="text-gray-500 italic">
                                            Ready to run...<br />
                                            <br />
                                            Click "Run Code" to execute.
                                        </div>
                                    )}
                                </div>
                                <div className="mt-4 pt-4 border-t border-gray-800 shrink-0">
                                    <label className="text-gray-400 text-xs uppercase font-bold mb-2 block">Standard Input (stdin)</label>
                                    <textarea
                                        value={stdin}
                                        onChange={(e) => setStdin(e.target.value)}
                                        placeholder="Enter input for your program here..."
                                        className="w-full bg-gray-800 text-gray-200 text-xs p-3 rounded-lg border border-gray-700 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all resize-none h-24"
                                    />
                                </div>
                            </>
                        ) : (
                            <div className="h-full flex flex-col">
                                {aiFeedback ? (
                                    <div className="prose prose-invert prose-sm max-w-none">
                                        <p className="whitespace-pre-wrap text-gray-300">{aiFeedback}</p>
                                    </div>
                                ) : (
                                    <div className="text-gray-500 italic text-center mt-10">
                                        <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-20" />
                                        <p>Ask the AI Tutor to review your code!</p>
                                        <p className="text-xs mt-2">I'll check for errors and teach you how to fix them.</p>

                                        <button
                                            onClick={handleAskAI}
                                            disabled={isAiLoading}
                                            className="mt-6 bg-brand-primary hover:bg-brand-secondary text-white px-6 py-2 rounded-full font-bold transition-all disabled:opacity-50"
                                        >
                                            {isAiLoading ? 'Analyzing...' : 'Analyze My Code'}
                                        </button>
                                    </div>
                                )}


                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
