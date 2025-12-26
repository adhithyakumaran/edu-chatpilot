import CountdownTimer from './CountdownTimer';

export default function PricingSection() {
    const inclusions = [
        'Live Training Sessions',
        'Lifetime Access to Recordings',
        'Mock Interviews & Tests',
        'Resume Builder Tool',
        'Study Resources & Notes',
        'Dashboard Access for 30 Days',
        'Weekly Progress Reports',
        '100 LeetCode Problem Set',
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-gray-900 to-purple-900 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        January Batch Fee
                    </h2>
                    <div className="flex justify-center mb-4">
                        <CountdownTimer />
                    </div>
                </div>

                {/* Pricing Card */}
                <div className="glass-dark rounded-3xl p-8 md:p-12 shadow-2xl max-w-2xl mx-auto border-2 border-purple-500/30">
                    {/* Price */}
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center gap-4 mb-2">
                            <span className="text-3xl text-gray-400 line-through">₹2,499</span>
                            <span className="text-6xl font-extrabold bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">₹499</span>
                        </div>
                        <div className="inline-block bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-full font-bold text-lg mb-4">
                            🎉 Save ₹2,000 (80% OFF)
                        </div>
                        <p className="text-gray-300 text-sm">One-time fee • No hidden charges • No subscriptions</p>
                    </div>

                    {/* Inclusions */}
                    <div className="mb-8">
                        <h3 className="text-xl font-bold mb-4 text-center">What's Included:</h3>
                        <div className="grid md:grid-cols-2 gap-3">
                            {inclusions.map((item, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-gray-200">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA Button */}
                    <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-5 px-8 rounded-xl text-xl transition-all transform hover:scale-105 shadow-2xl mb-4">
                        Join January Batch – ₹499 🚀
                    </button>

                    {/* Trust Badge */}
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
                        <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Secure payment via Razorpay • Instant access after payment</span>
                    </div>
                </div>

                {/* Bottom Note */}
                <p className="text-center text-gray-400 text-sm mt-8">
                    Limited slots available for January 2026 batch. Price will increase after the festive offer ends.
                </p>
            </div>
        </section>
    );
}
