'use client';

import { useEffect, useState } from 'react';

export default function CountdownTimer() {
    const [timeLeft, setTimeLeft] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            // Get stored end time or create new one
            let endTime = localStorage.getItem('festiveOfferEndTime');

            if (!endTime) {
                // Set 12 hours from now
                const now = new Date().getTime();
                endTime = (now + 12 * 60 * 60 * 1000).toString();
                localStorage.setItem('festiveOfferEndTime', endTime);
            }

            const now = new Date().getTime();
            const end = parseInt(endTime);
            const difference = end - now;

            // If timer expired, reset it
            if (difference <= 0) {
                const newEndTime = (now + 12 * 60 * 60 * 1000).toString();
                localStorage.setItem('festiveOfferEndTime', newEndTime);
                return calculateTimeLeft();
            }

            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            return { hours, minutes, seconds };
        };

        setTimeLeft(calculateTimeLeft());

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full font-bold text-sm animate-pulse-glow">
            <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-red-400 opacity-75"></span>
            <span className="relative">🔥 Festive Offer Ends In:</span>
            <div className="flex gap-1 font-mono">
                <span className="bg-white/20 px-2 py-1 rounded">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span>:</span>
                <span className="bg-white/20 px-2 py-1 rounded">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span>:</span>
                <span className="bg-white/20 px-2 py-1 rounded">{String(timeLeft.seconds).padStart(2, '0')}</span>
            </div>
        </div>
    );
}
