'use client';

import { useState, useEffect } from 'react';
import { createCourse, sendNotification } from '@/services/placementApi';
import { toast } from 'sonner';
import { LayoutDashboard, Plus, Loader2, MessageSquare, BookOpen, X, Users, MessageCircle } from 'lucide-react';
import Link from 'next/link';

// --- SUB-COMPONENTS ---

function CreateCourseModal({ onClose }: { onClose: () => void }) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '', description: '', instructor: '', duration: '', image: '', tags: '', rating: 5.0
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(t => t);
            await createCourse({ ...formData, tags: tagsArray });
            toast.success("Course created successfully!");
            onClose();
        } catch (error) {
            toast.error("Failed to create course.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Plus className="w-5 h-5 text-brand-primary" /> Create New Course
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X className="w-5 h-5" /></button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <label className="text-xs font-bold text-gray-500 uppercase">Title</label>
                            <input required className="w-full mt-1 p-3 border rounded-xl outline-none focus:ring-2 focus:ring-brand-primary/20"
                                value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="e.g. Advanced React" />
                        </div>
                        <div className="col-span-2">
                            <label className="text-xs font-bold text-gray-500 uppercase">Description</label>
                            <textarea required rows={3} className="w-full mt-1 p-3 border rounded-xl outline-none focus:ring-2 focus:ring-brand-primary/20"
                                value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Course overview..." />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase">Instructor</label>
                            <input required className="w-full mt-1 p-3 border rounded-xl outline-none focus:ring-2 focus:ring-brand-primary/20"
                                value={formData.instructor} onChange={e => setFormData({ ...formData, instructor: e.target.value })} placeholder="Name" />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase">Duration</label>
                            <input required className="w-full mt-1 p-3 border rounded-xl outline-none focus:ring-2 focus:ring-brand-primary/20"
                                value={formData.duration} onChange={e => setFormData({ ...formData, duration: e.target.value })} placeholder="e.g. 10h" />
                        </div>
                        <div className="col-span-2">
                            <label className="text-xs font-bold text-gray-500 uppercase">Cover Image</label>
                            <input className="w-full mt-1 p-3 border rounded-xl outline-none focus:ring-2 focus:ring-brand-primary/20"
                                value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} placeholder="https://..." />
                        </div>
                        <div className="col-span-2">
                            <label className="text-xs font-bold text-gray-500 uppercase">Tags</label>
                            <input className="w-full mt-1 p-3 border rounded-xl outline-none focus:ring-2 focus:ring-brand-primary/20"
                                value={formData.tags} onChange={e => setFormData({ ...formData, tags: e.target.value })} placeholder="Comma separated" />
                        </div>
                    </div>
                    <div className="pt-4">
                        <button disabled={loading} className="w-full bg-brand-primary text-white py-3 rounded-xl font-bold hover:bg-violet-700 transition-colors disabled:opacity-50">
                            {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Create Course'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function CourseInboxModal({ onClose }: { onClose: () => void }) {
    const [loading, setLoading] = useState(false);
    const [courseId, setCourseId] = useState('');
    const [message, setMessage] = useState('');

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await sendNotification({ title: 'Course Update', message, courseId });
            toast.success('Message sent!');
            onClose();
        } catch (e) { toast.error('Failed to send'); }
        finally { setLoading(false); }
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-2xl">
                    <h2 className="text-lg font-bold flex items-center gap-2">
                        <Users className="w-5 h-5 text-blue-500" /> Blast Message
                    </h2>
                    <button onClick={onClose}><X className="w-5 h-5 text-gray-400 hover:text-gray-600" /></button>
                </div>
                <form onSubmit={handleSend} className="p-6 space-y-4">
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Course ID</label>
                        <input required className="w-full mt-1 p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20"
                            value={courseId} onChange={e => setCourseId(e.target.value)} placeholder="e.g. java-101" />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Message</label>
                        <textarea required rows={4} className="w-full mt-1 p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20"
                            value={message} onChange={e => setMessage(e.target.value)} placeholder="Announcement..." />
                    </div>
                    <button disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors disabled:opacity-50">
                        {loading ? 'Sending...' : 'Send Broadcast'}
                    </button>
                </form>
            </div>
        </div>
    );
}

function MentorInboxModal({ onClose }: { onClose: () => void }) {
    const [chats, setChats] = useState<any[]>([]);
    const [selectedUser, setSelectedUser] = useState<string | null>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [reply, setReply] = useState('');

    // Fetch logic omitted for brevity in this replace_block, would be same as before but inside modal
    // Keeping it simple with mock data structure capability or re-implementing fetch
    useEffect(() => {
        // Fetch Inbox on mount
        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://edu-chatpilot-backend.onrender.com/api'}/mentor/admin/inbox`)
            .then(res => res.json()).then(setChats).catch(() => { });
    }, []);

    useEffect(() => {
        if (!selectedUser) return;
        const fetchChat = () => fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://edu-chatpilot-backend.onrender.com/api'}/mentor/${selectedUser}`)
            .then(res => res.json()).then(setMessages).catch(() => { });
        fetchChat();
        const int = setInterval(fetchChat, 5000);
        return () => clearInterval(int);
    }, [selectedUser]);

    const sendReply = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!reply.trim()) return;
        await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://edu-chatpilot-backend.onrender.com/api'}/mentor/send`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: selectedUser, message: reply, sender: 'ADMIN' })
        });
        setReply('');
        // Optimistic update
        setMessages(p => [...p, { id: Date.now(), message: reply, sender: 'ADMIN', createdAt: new Date() }]);
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-4xl h-[600px] shadow-2xl flex overflow-hidden">
                {/* Sidebar */}
                <div className="w-1/3 border-r border-gray-100 bg-gray-50 flex flex-col">
                    <div className="p-4 border-b border-gray-200 font-bold text-gray-700">Student Chats</div>
                    <div className="flex-1 overflow-y-auto">
                        {chats.map(chat => (
                            <div key={chat.userId} onClick={() => setSelectedUser(chat.userId)}
                                className={`p-4 border-b hover:bg-white cursor-pointer transition-colors ${selectedUser === chat.userId ? 'bg-white border-l-4 border-brand-primary shadow-sm' : ''}`}>
                                <p className="font-bold text-sm text-gray-900">{chat.user?.name || 'Student'}</p>
                                <p className="text-xs text-gray-500 truncate">{chat.user?.email}</p>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Chat Area */}
                <div className="flex-1 flex flex-col relative">
                    <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"><X className="w-5 h-5 text-gray-500" /></button>
                    {selectedUser ? (
                        <>
                            <div className="p-4 border-b border-gray-100 font-bold bg-white">Chat History</div>
                            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50/50">
                                {messages.map((msg: any) => (
                                    <div key={msg.id} className={`flex ${msg.sender === 'ADMIN' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`p-3 rounded-xl text-sm max-w-[80%] ${msg.sender === 'ADMIN' ? 'bg-brand-primary text-white' : 'bg-white border text-gray-800'}`}>
                                            {msg.message}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <form onSubmit={sendReply} className="p-4 border-t bg-white flex gap-2">
                                <input className="flex-1 border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-brand-primary/20"
                                    value={reply} onChange={e => setReply(e.target.value)} placeholder="Reply..." />
                                <button className="bg-brand-primary text-white px-4 py-2 rounded-lg font-bold">Send</button>
                            </form>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-gray-400">Select a student</div>
                    )}
                </div>
            </div>
        </div>
    );
}

// --- MAIN PAGE ---

export default function AdminPage() {
    const [activeModal, setActiveModal] = useState<'create' | 'blast' | 'mentor' | null>(null);

    const cards = [
        {
            id: 'create',
            title: 'Create Course',
            desc: 'Add new learning material',
            icon: BookOpen,
            color: 'text-violet-600',
            bg: 'bg-violet-100',
            action: () => setActiveModal('create')
        },
        {
            id: 'blast',
            title: 'Course Blast',
            desc: 'Send announcements to students',
            icon: Users,
            color: 'text-blue-600',
            bg: 'bg-blue-100',
            action: () => setActiveModal('blast')
        },
        {
            id: 'mentor',
            title: 'Mentor Inbox',
            desc: 'Resolve student doubts',
            icon: MessageCircle,
            color: 'text-emerald-600',
            bg: 'bg-emerald-100',
            action: () => setActiveModal('mentor')
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <LayoutDashboard className="w-6 h-6 text-brand-primary" />
                    <h1 className="text-xl font-bold text-gray-900">Admin Console</h1>
                </div>
                <Link href="/dashboard" className="text-sm font-medium text-gray-500 hover:text-brand-primary">
                    &larr; Student View
                </Link>
            </div>

            {/* Content Grid */}
            <div className="max-w-7xl mx-auto p-8">
                <h2 className="text-lg font-bold text-gray-700 mb-6">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {cards.map((card) => (
                        <button
                            key={card.id}
                            onClick={card.action}
                            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md hover:border-brand-primary/30 transition-all text-left group"
                        >
                            <div className={`w-12 h-12 rounded-xl ${card.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                <card.icon className={`w-6 h-6 ${card.color}`} />
                            </div>
                            <h3 className="font-bold text-gray-900 text-lg mb-1">{card.title}</h3>
                            <p className="text-sm text-gray-500">{card.desc}</p>
                        </button>
                    ))}

                    {/* Placeholder Stat Card */}
                    <div className="bg-gradient-to-br from-brand-primary to-violet-800 p-6 rounded-2xl shadow-lg text-white">
                        <div className="text-white/80 text-sm font-medium mb-1">Total Students</div>
                        <div className="text-4xl font-bold mb-4">1,248</div>
                        <div className="text-white/60 text-xs">▲ 12% from last month</div>
                    </div>
                </div>

                {/* Recent Activity (Placeholder) */}
                <div className="mt-12">
                    <h2 className="text-lg font-bold text-gray-700 mb-4">Recent Activity</h2>
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                        <div className="space-y-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex items-center gap-4 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-bold text-gray-900">System</span> created a new backup.
                                    </p>
                                    <span className="text-xs text-gray-400 ml-auto">2h ago</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            {activeModal === 'create' && <CreateCourseModal onClose={() => setActiveModal(null)} />}
            {activeModal === 'blast' && <CourseInboxModal onClose={() => setActiveModal(null)} />}
            {activeModal === 'mentor' && <MentorInboxModal onClose={() => setActiveModal(null)} />}
        </div>
    );
}
