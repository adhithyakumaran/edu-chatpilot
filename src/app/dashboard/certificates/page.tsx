'use client';

import { Award } from 'lucide-react';

export default function CertificatesPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
            <div className="bg-green-100 p-6 rounded-full mb-6">
                <Award className="w-16 h-16 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Certificates</h1>
            <p className="text-gray-500 max-w-md">
                Complete courses and tests to earn verified certificates here.
                <br />
                <span className="text-brand-primary font-medium mt-2 block">Start learning to earn!</span>
            </p>
        </div>
    );
}
