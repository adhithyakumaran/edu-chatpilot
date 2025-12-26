'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Send, User, Bot, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface Message {
    id: string;
    message: string;
    sender: 'USER' | 'ADMIN';
    createdAt: string;
}

export default function MentorChatPage() {
    const { user } = useAuth();
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Fetch Messages
    const fetchMessages = async () => {
        if (!user) return;
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://edu-chatpilot-backend.onrender.com/api'}/mentor/${user.uid}`);
            if (res.ok) {
                const data = await res.json();
                setMessages(data);
            }
        } catch (error) {
            console.error('Failed to load chat');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
        // Poll every 5 seconds for new replies
        const interval = setInterval(fetchMessages, 5000);
        return () => clearInterval(interval);
    }, [user]);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

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
                setMessages([...messages, newMsg]);
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
        <div className="max-w-4xl mx-auto h-[calc(100vh-100px)] flex flex-col bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center">
                        <Bot className="w-6 h-6 text-brand-primary" />
                    </div>
                    <div>
                        <h1 className="font-bold text-gray-900">Mentor Support</h1>
                        <p className="text-xs text-gray-500">Ask your doubts directly to expert mentors.</p>
                    </div>
                </div>
                <div className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full font-medium">
                    ● Online
                </div>
            </div>

            {/* Chat Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/30">
                {loading ? (
                    <div className="flex justify-center items-center h-full">
                        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                    </div>
                ) : messages.length === 0 ? (
                    <div className="text-center text-gray-400 mt-20">
                        <p>No messages yet.</p>
                        <p className="text-sm">Start the conversation!</p>
                    </div>
                ) : (
                    messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex ${msg.sender === 'USER' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`
                                max-w-[70%] p-3 rounded-2xl text-sm shadow-sm
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
            <div className="p-4 bg-white border-t border-gray-100">
                <form
                    onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                    className="flex items-center gap-2"
                >
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your query here..."
                        className="flex-1 px-4 py-2.5 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-brand-primary/20 outline-none text-gray-700"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || sending}
                        className="p-2.5 bg-brand-primary text-white rounded-xl hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                    </button>
                </form>
            </div>
        </div>
    );
}
