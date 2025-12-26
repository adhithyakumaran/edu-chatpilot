'use client';

import Sidebar from './Sidebar';
import TopBar from './TopBar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Fixed Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <main className="flex-1 md:ml-64 bg-gray-50 min-h-screen flex flex-col">
                <TopBar />
                <div className="p-8 flex-1 overflow-x-hidden overflow-y-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
