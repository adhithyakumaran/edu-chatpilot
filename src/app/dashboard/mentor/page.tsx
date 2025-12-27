'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Send, User, Bot, Loader2, XCircle, History, PlusCircle, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

interface Message {
    id: string;
    message: string;
    sender: 'USER' | 'ADMIN';
    createdAt: string;
}

interface DoubtSession {
    id: string;
    topic: string;
    date: string;
    status: 'resolved' | 'open';
}

export default function MentorChatPage() {
    const { user } = useAuth();
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false); // Initial loading for chat
    const [sending, setSending] = useState(false);

    // Session State
    const [isSessionActive, setIsSessionActive] = useState(false);
    const [history, setHistory] = useState<DoubtSession[]>([
        { id: '1', topic: 'React Hooks Doubt', date: 'Oct 24, 2024', status: 'resolved' },
        { id: '2', topic: 'DSA: Binary Search', date: 'Nov 02, 2024', status: 'resolved' },
    ]);

    const scrollRef = useRef<HTMLDivElement>(null);

    // Fetch Messages
    const fetchMessages = async () => {
        if (!user || !isSessionActive) return;
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://edu-chatpilot-backend.onrender.com/api'}/mentor/${user.uid}`);
            if (res.ok) {
                const data = await res.json();
                setMessages(data);
            }
        } catch (error) {
            console.error('Failed to load chat');
        }
    };

    useEffect(() => {
        if (isSessionActive) {
            fetchMessages();
            const interval = setInterval(fetchMessages, 3000); // Faster polling for "real-time" feel
            return () => clearInterval(interval);
        }
    }, [user, isSessionActive]);

    // Auto-scroll
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isSessionActive]);

    const handleStartSession = () => {
        setIsSessionActive(true);
        // In a real app, send API call to create session
        toast.success("Doubt Session Started", { description: " a mentor will join shortly." });
    };

    const handleCloseSession = () => {
        if (confirm("Are you sure you want to close this session?")) {
            setIsSessionActive(false);
            setHistory(prev => [{ id: Date.now().toString(), topic: 'General Doubt', date: new Date().toLocaleDateString(), status: 'resolved' }, ...prev]);
            toast.success("Session Closed");
        }
    };

    const handleSend = async () => {
        if (!input.trim() || !user) return;
        setSending(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://edu-chatpilot-backend.onrender.com/api'}/mentor/send`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user.uid,
                    message: input,
                    sender: 'USER'
                })
            });

            if (res.ok) {
                const newMsg = await res.json();
                setMessages(prev => [...prev, newMsg]);
                setInput('');
            } else {
                toast.error('Failed to send message');
            }
        } catch (e) {
            toast.error('Error sending message');
        } finally {
            setSending(false);
        }
    };

    return (

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 h-[calc(100vh-140px)] lg:h-[calc(100vh-100px)]">

            {/* Left Column: Chat Interface (8 Cols) */}
            <div className="lg:col-span-8 flex flex-col h-full min-h-0">
                {isSessionActive ? (
                    <div className="flex-1 flex flex-col bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden animate-in fade-in zoom-in duration-300">
                        {/* Active Session Header */}
                        <div className="p-4 border-b border-gray-100 bg-white flex items-center justify-between shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center animate-pulse">
                                        <Bot className="w-6 h-6 text-brand-primary" />
                                    </div>
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                                </div>
                                <div>
                                    <h1 className="font-bold text-gray-900">Live Doubt Session</h1>
                                    <p className="text-xs text-green-600 font-medium">● Mentor is Online</p>
                                </div>
                            </div>
                            <button
                                onClick={handleCloseSession}
                                className="text-xs font-bold text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2 border border-red-100"
                            >
                                <XCircle className="w-4 h-4" /> End
                            </button>
                        </div>

                        {/* Chat Area */}
                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-gray-50/50">
                            {messages.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center p-8 opacity-60">
                                    <MessageSquare className="w-12 h-12 text-brand-primary mb-3" />
                                    <p className="font-semibold text-gray-900">Session Started</p>
                                    <p className="text-sm text-gray-500">Type your doubt below to start chatting.</p>
                                </div>
                            ) : (
                                messages.map((msg) => (
                                    <div key={msg.id} className={`flex ${msg.sender === 'USER' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`
                                            max-w-[85%] md:max-w-[70%] p-3 rounded-2xl text-sm shadow-sm
                                            ${msg.sender === 'USER'
                                                ? 'bg-brand-primary text-white rounded-tr-none'
                                                : 'bg-white border border-gray-100 text-gray-800 rounded-tl-none'}
                                        `}>
                                            <p>{msg.message}</p>
                                            <p className={`text-[10px] mt-1 ${msg.sender === 'USER' ? 'text-white/70' : 'text-gray-400'}`}>
                                                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="p-3 md:p-4 bg-white border-t border-gray-100 shrink-0">
                            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Type your doubt here..."
                                    className="flex-1 px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-brand-primary/20 outline-none text-gray-700 hover:bg-white transition-colors border-2 hover:border-gray-100"
                                    autoFocus // Keep autofocus for desktop, mobile might be annoying but okay for chat apps
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || sending}
                                    className="p-3 bg-brand-primary text-white rounded-xl hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg active:scale-95"
                                >
                                    {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                                </button>
                            </form>
                        </div>
                    </div>
                ) : (
                    // Empty State / Start Session
                    <div className="flex-1 bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center justify-center p-8 text-center bg-grid-slate-50 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
                        <div className="relative z-10 max-w-md">
                            <div className="w-20 h-20 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Bot className="w-10 h-10 text-brand-primary" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Need Help?</h2>
                            <p className="text-gray-500 mb-8">Connect with our expert mentors instantly. Start a dedicated doubt session to get real-time assistance with your code or concepts.</p>

                            <button
                                onClick={handleStartSession}
                                className="group relative inline-flex items-center justify-center px-8 py-3 font-bold text-white transition-all duration-200 bg-brand-primary font-lg rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary hover:bg-violet-700 shadow-lg hover:shadow-xl hover:-translate-y-1"
                            >
                                <PlusCircle className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
                                Start Doubt Session
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Right Column: Doubt History (4 Cols) - Hidden on Mobile */}
            <div className="hidden lg:col-span-4 lg:flex flex-col bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden h-full min-h-0">
                <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between shrink-0">
                    <h2 className="font-bold text-gray-900 flex items-center gap-2">
                        <History className="w-4 h-4 text-gray-500" /> Doubt History
                    </h2>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {history.map((session) => (
                        <div key={session.id} className="p-4 rounded-xl border border-gray-100 hover:border-brand-primary/30 hover:bg-brand-primary/5 transition-all cursor-pointer group">
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="font-semibold text-gray-800 text-sm">{session.topic}</h3>
                                <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full uppercase tracking-wide group-hover:bg-white">
                                    {session.status}
                                </span>
                            </div>
                            <p className="text-xs text-gray-400">{session.date}</p>
                        </div>
                    ))}

                    <div className="p-4 rounded-xl border border-dashed border-gray-200 text-center">
                        <p className="text-xs text-gray-400">Past doubt sessions will appear here.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
