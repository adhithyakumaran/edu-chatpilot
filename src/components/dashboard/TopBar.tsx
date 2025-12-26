'use client';

import { Bell, MessageSquare, Plus } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function TopBar() {
    const { user } = useAuth();
    // In a real app we might fetch the full profile here or use a global context
    // For now we'll just show the name and a placeholder/fallback for details if not in context

    return (
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-30">
            {/* User Info (Moved from Welcome Card) */}
            <div className="flex flex-col justify-center">
                <h2 className="text-xl font-bold text-gray-900 leading-tight">
                    Welcome back, <span className="text-brand-primary">{user?.displayName?.split(' ')[0] || 'Scholar'}!</span> 👋
                </h2>
                <p className="text-xs text-gray-500 font-medium truncate max-w-md">
                    {/* We might not have full academic data here without fetching, so we'll keep it simple or fetch if needed. 
                       For now, let's assume we just show the greeting broadly or a static subtext until we lift the state properly. */}
                    Ready to achieve your goals today?
                </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 ml-auto">
                <button className="p-2 text-gray-400 hover:text-brand-primary transition-colors relative">
                    <Bell className="w-6 h-6" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
                <button className="p-2 text-gray-400 hover:text-brand-primary transition-colors">
                    <MessageSquare className="w-6 h-6" />
                </button>

                <button className="hidden md:flex items-center gap-2 bg-brand-primary text-white px-4 py-2 rounded-lg font-medium shadow-lg shadow-brand-primary/20 hover:bg-brand-secondary transition-all">
                    <Plus className="w-4 h-4" />
                    <span>Upload Work</span>
                </button>
            </div>
        </header>
    );
}
