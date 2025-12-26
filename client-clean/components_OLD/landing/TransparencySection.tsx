export default function TransparencySection() {
    return (
        <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border-4 border-orange-300">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-2xl">⚠️</span>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                Important Transparency
                            </h2>
                            <p className="text-lg text-gray-700">
                                This is a <strong>Pre-Placement Technical Training Program</strong>.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
                            <h3 className="font-bold text-gray-900 text-xl mb-2">We do NOT promise placements.</h3>
                            <p className="text-gray-700">
                                We are honest. We don't make fake guarantees. Your success depends on your effort and the job market.
                            </p>
                        </div>

                        <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
                            <h3 className="font-bold text-gray-900 text-xl mb-3">What we DO provide:</h3>
                            <ul className="space-y-2">
                                {[
                                    'Skills – Real, practical training',
                                    'Structure – 30-day systematic approach',
                                    'Practice – Tests, mock interviews, projects',
                                    'Interview Readiness – Confidence and preparation'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-gray-800"><strong>{item.split('–')[0]}</strong> – {item.split('–')[1]}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="text-center pt-4">
                            <p className="text-2xl font-bold text-gray-900">
                                Your success depends on <span className="text-purple-600">your effort.</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
