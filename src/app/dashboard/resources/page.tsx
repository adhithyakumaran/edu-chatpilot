'use client';

import { FolderKanban } from 'lucide-react';

export default function ResourcesPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
            <div className="bg-violet-100 p-6 rounded-full mb-6">
                <FolderKanban className="w-16 h-16 text-brand-primary" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Resources Library</h1>
            <p className="text-gray-500 max-w-md">
                Access study materials, cheat sheets, and coding guides.
                <br />
                <span className="text-brand-primary font-medium mt-2 block">Coming Soon!</span>
            </p>
        </div>
    );
}
