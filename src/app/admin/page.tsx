'use client';

import { useState, useEffect } from 'react';
import { createCourse, sendNotification } from '@/services/placementApi';
import { toast } from 'sonner';
import { LayoutDashboard, Plus, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        instructor: '',
        duration: '',
        image: '',
        tags: '',
        rating: 5.0
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Convert comma-separated tags to array
            const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(t => t);

            await createCourse({
                ...formData,
                tags: tagsArray
            });

            toast.success("Course created successfully!");
            // Reset form
            setFormData({
                title: '',
                description: '',
                instructor: '',
                duration: '',
                image: '',
                tags: '',
                rating: 5.0
            });
        } catch (error) {
            toast.error("Failed to create course.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <LayoutDashboard className="w-6 h-6 text-brand-primary" />
                    <h1 className="text-xl font-bold text-gray-900">Mentor Admin</h1>
                </div>
                <Link href="/dashboard" className="text-sm text-gray-500 hover:text-brand-primary">
                    Back to Student Dashboard
                </Link>
            </div>

            <div className="flex-1 max-w-3xl w-full mx-auto p-6">
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                        <h2 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                            <Plus className="w-5 h-5" /> Add New Course
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">Upload new learning material for students.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Course Title</label>
                            <input
                                type="text"
                                name="title"
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
                                placeholder="e.g. Advanced React Patterns"
                                value={formData.title}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                name="description"
                                rows={3}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
                                placeholder="Brief overview of the course..."
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Instructor Name</label>
                                <input
                                    type="text"
                                    name="instructor"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
                                    placeholder="e.g. Sarah Drasner"
                                    value={formData.instructor}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Duration</label>
                                <input
                                    type="text"
                                    name="duration"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
                                    placeholder="e.g. 12h 30m"
                                    value={formData.duration}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Cover Image URL</label>
                            <input
                                type="text"
                                name="image"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
                                placeholder="https://..."
                                value={formData.image}
                                onChange={handleChange}
                            />
                            <p className="mt-1 text-xs text-gray-500">Paste a link from Unsplash or your CDN.</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Tags (comma separated)</label>
                            <input
                                type="text"
                                name="tags"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
                                placeholder="React, Frontend, Advanced"
                                value={formData.tags}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-primary hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary disabled:opacity-50"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Creating...
                                    </>
                                ) : (
                                    'Create Course'
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Course Inbox Messaging Section */}
                <div className="bg-white shadow rounded-lg overflow-hidden mt-6">
                    <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                        <h2 className="text-lg font-medium text-gray-900">Send Message to Course Inbox</h2>
                        <p className="text-sm text-gray-500 mt-1">Send updates, meeting links, and instructions to students enrolled in a course.</p>
                    </div>

                    <div className="p-6">
                        <CourseMessagingForm />
                    </div>
                </div>

                {/* Mentor Support Inbox */}
                <div className="bg-white shadow rounded-lg overflow-hidden mt-6 mb-10">
                    <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                        <h2 className="text-lg font-medium text-gray-900">Mentor Support Inbox</h2>
                        <p className="text-sm text-gray-500 mt-1">Reply to student queries directly.</p>
                    </div>
                    <div className="p-6">
                        <MentorInbox />
                    </div>
                </div>
            </div>
        </div>
    );
}

// ... existing CourseMessagingForm ...

function MentorInbox() {
    const [chats, setChats] = useState<any[]>([]);
    const [selectedUser, setSelectedUser] = useState<string | null>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [reply, setReply] = useState('');
    const [loading, setLoading] = useState(false);

    // Fetch Inbox
    const fetchInbox = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://edu-chatpilot-backend.onrender.com/api'}/mentor/admin/inbox`);
            if (res.ok) setChats(await res.json());
        } catch (e) { console.error(e); }
    };

    // Fetch Chat for User
    useEffect(() => {
        if (!selectedUser) return;
        const loadChat = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://edu-chatpilot-backend.onrender.com/api'}/mentor/${selectedUser}`);
            if (res.ok) setMessages(await res.json());
        };
        loadChat();
        const interval = setInterval(loadChat, 5000); // Poll
        return () => clearInterval(interval);
    }, [selectedUser]);

    useEffect(() => { fetchInbox(); }, []);

    const sendReply = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!reply.trim() || !selectedUser) return;
        setLoading(true);
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://edu-chatpilot-backend.onrender.com/api'}/mentor/send`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: selectedUser, message: reply, sender: 'ADMIN' })
            });
            setReply('');
            toast.success('Reply Sent!');
            // Refresh messages immediately
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://edu-chatpilot-backend.onrender.com/api'}/mentor/${selectedUser}`);
            if (res.ok) setMessages(await res.json());
        } catch (e) {
            toast.error('Failed to reply');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[500px]">
            {/* User List */}
            <div className="border border-gray-200 rounded-lg overflow-y-auto">
                {chats.map(chat => (
                    <div
                        key={chat.userId}
                        onClick={() => setSelectedUser(chat.userId)}
                        className={`p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${selectedUser === chat.userId ? 'bg-indigo-50 border-l-4 border-indigo-500' : ''}`}
                    >
                        <p className="font-semibold text-sm text-gray-900">{chat.user?.name || 'Unknown Student'}</p>
                        <p className="text-xs text-gray-500 truncate">{chat.user?.email}</p>
                        <p className="text-xs text-gray-400 mt-1">Last: {new Date(chat.createdAt).toLocaleDateString()}</p>
                    </div>
                ))}
                {chats.length === 0 && <p className="p-4 text-sm text-gray-500 text-center">No active chats.</p>}
            </div>

            {/* Chat View */}
            <div className="md:col-span-2 border border-gray-200 rounded-lg flex flex-col">
                {selectedUser ? (
                    <>
                        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                            {messages.map((msg: any) => (
                                <div key={msg.id} className={`flex ${msg.sender === 'ADMIN' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-2 rounded-lg text-sm ${msg.sender === 'ADMIN' ? 'bg-indigo-600 text-white' : 'bg-white border text-gray-800'}`}>
                                        <p>{msg.message}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <form onSubmit={sendReply} className="p-3 border-t bg-white flex gap-2">
                            <input
                                className="flex-1 border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                                placeholder="Type a reply..."
                                value={reply}
                                onChange={e => setReply(e.target.value)}
                            />
                            <button disabled={loading} className="bg-indigo-600 text-white px-4 py-2 rounded text-sm hover:bg-indigo-700 disabled:opacity-50">
                                {loading ? '...' : 'Send'}
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-gray-400">
                        Select a student to view chat
                    </div>
                )}
            </div>
        </div>
    );
}

// Separate component for course messaging
function CourseMessagingForm() {
    const [courseId, setCourseId] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!courseId || !message) {
            toast.error('Please fill all fields');
            return;
        }

        setLoading(true);
        try {
            await sendNotification({
                title: 'Course Update',
                message,
                courseId
            });

            toast.success('Message sent to course inbox!');
            setMessage('');
        } catch (error) {
            toast.error('Failed to send message');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSendMessage} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course ID
                </label>
                <input
                    type="text"
                    required
                    value={courseId}
                    onChange={(e) => setCourseId(e.target.value)}
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
                    placeholder="e.g. java-full-stack"
                />
                <p className="text-xs text-gray-500 mt-1">Enter the course ID (visible in course URL)</p>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                </label>
                <textarea
                    required
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
                    placeholder="e.g. 🎯 Live Session Tomorrow: Spring Boot Deep Dive at 6 PM IST. Zoom link: https://zoom.us/j/123456"
                />
                <p className="text-xs text-gray-500 mt-1">
                    💡 Tip: Include meeting links, assignment updates, or resource notifications
                </p>
            </div>

            <div className="flex gap-3">
                <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-primary hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary disabled:opacity-50"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                        </>
                    ) : (
                        'Send to Course Inbox'
                    )}
                </button>
                <button
                    type="button"
                    onClick={() => { setCourseId(''); setMessage(''); }}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                    Clear
                </button>
            </div>
        </form>
    );
}
