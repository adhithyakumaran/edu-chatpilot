'use client';

import CountdownTimer from './CountdownTimer';

export default function TopBanner() {
    return (
        <div className="fixed top-0 left-0 right-0 z-[60] bg-black text-white py-2.5 px-4 text-center">
            <div className="relative max-w-7xl mx-auto flex items-center justify-center gap-3 text-sm font-medium">
                <span className="uppercase tracking-wider font-bold text-white">Festive Offer</span>
                <span className="hidden sm:inline opacity-50">|</span>
                <span>Get 80% OFF. Offer ends in:</span>
                <div className="font-mono font-bold text-white bg-white/20 px-2 py-0.5 rounded">
                    <CountdownTimer />
                </div>
            </div>
        </div>
    );
}
