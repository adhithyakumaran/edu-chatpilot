'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar (Responsive) */}
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            {/* Main Content Area */}
            <main className="flex-1 md:ml-64 bg-gray-50 min-h-screen flex flex-col w-full">
                <TopBar onMenuClick={() => setSidebarOpen(true)} />
                <div className="p-4 md:p-8 flex-1 overflow-x-hidden overflow-y-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
