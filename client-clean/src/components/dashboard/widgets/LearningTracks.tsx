'use client';

import { Play, FileText, Code } from 'lucide-react';

export default function LearningTracks() {
    const tracks = [
        { name: 'Java Foundations', progress: 80, color: 'bg-orange-500' },
        { name: 'Data Structures', progress: 45, color: 'bg-blue-500' },
        { name: 'System Design', progress: 10, color: 'bg-green-500' },
        { name: 'Projects', progress: 60, color: 'bg-violet-500' },
    ];

    return (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg text-gray-900">Learning Tracks</h3>
                <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded">Recent</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tracks.map((track, index) => (
                    <div key={index} className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition-all cursor-pointer group">
                        <div className="flex items-center justify-between mb-3">
                            <div className={`w-8 h-8 rounded-lg ${track.color} bg-opacity-10 flex items-center justify-center text-${track.color.split('-')[1]}-500 group-hover:bg-opacity-20 transition-colors`}>
                                <div className={`w-2 h-2 rounded-full ${track.color}`}></div>
                            </div>
                            {/* Toggle would go here */}
                            <div className="w-8 h-4 bg-gray-200 rounded-full relative">
                                <div className="absolute right-1 top-1 w-2 h-2 bg-white rounded-full"></div>
                            </div>
                        </div>

                        <h4 className="font-bold text-gray-900 text-sm mb-1">{track.name}</h4>
                        <p className="text-xs text-gray-400 mb-3">Module {index + 1}</p>

                        <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                            <div className={`h-full ${track.color}`} style={{ width: `${track.progress}%` }}></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
