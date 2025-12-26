'use client';

import { Settings, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function StudentSettingsPage() {
    const { user } = useAuth();

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h1>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center gap-4">
                    <div className="h-16 w-16 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary text-2xl font-bold">
                        {user?.displayName ? user.displayName[0].toUpperCase() : <User className="w-8 h-8" />}
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">{user?.displayName || 'Student'}</h2>
                        <p className="text-gray-500">{user?.email}</p>
                    </div>
                </div>

                <div className="p-6">
                    <div className="flex items-center gap-3 text-gray-500 mb-4">
                        <Settings className="w-5 h-5" />
                        <span>Preferences</span>
                    </div>
                    <p className="text-sm text-gray-400 italic">More settings coming soon...</p>
                </div>
            </div>
        </div>
    );
}
