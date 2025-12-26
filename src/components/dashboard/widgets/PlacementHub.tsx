'use client';

import { ArrowUpRight } from 'lucide-react';

export default function PlacementHub() {
    return (
        <div className="bg-gradient-to-br from-brand-dark to-black p-6 rounded-3xl shadow-lg text-white relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl translate-y-1/3 -translate-x-1/3"></div>

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-lg">Success Hub</h3>
                    <ArrowUpRight className="w-5 h-5 text-gray-400" />
                </div>

                <div className="space-y-3 mb-6">
                    <a href="#" className="block p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/5">
                        <p className="font-bold text-sm">Ace Your Assessments</p>
                        <p className="text-xs text-gray-400 mt-0.5">Strategies & Tips</p>
                    </a>
                    <a href="#" className="block p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/5">
                        <p className="font-bold text-sm">Profile Building</p>
                        <p className="text-xs text-gray-400 mt-0.5">Stand out from the crowd</p>
                    </a>
                </div>

                <button className="w-full bg-white text-brand-dark py-3 rounded-xl font-bold text-sm hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                    🎯 Career Guide
                </button>
            </div>
        </div>
    );
}
