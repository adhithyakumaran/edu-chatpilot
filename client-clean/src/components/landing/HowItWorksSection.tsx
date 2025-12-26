export default function HowItWorksSection() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                        How the Training Works
                    </h2>
                    <p className="text-xl text-gray-600">
                        Structured daily learning with live instruction and hands-on practice
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left - Key Info */}
                    <div className="space-y-6">
                        <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-8 text-white shadow-2xl">
                            <div className="grid grid-cols-3 gap-6 text-center">
                                <div>
                                    <div className="text-4xl font-bold">24</div>
                                    <div className="text-sm opacity-90">Days</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-bold">6</div>
                                    <div className="text-sm opacity-90">Days/Week</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-bold">2</div>
                                    <div className="text-sm opacity-90">Hours/Day</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-8 border-2 border-gray-200">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Daily Format</h3>
                            <div className="space-y-4">
                                {[
                                    { duration: '1 hour', activity: 'Coding Practice', icon: '💻', color: 'bg-purple-500' },
                                    { duration: '30-45 min', activity: 'Aptitude Training', icon: '🧮', color: 'bg-blue-500' },
                                    { duration: '15 min', activity: 'Resume / HR / Career Strategy', icon: '📝', color: 'bg-green-500' },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4">
                                        <div className={`${item.color} w-12 h-12 rounded-lg flex items-center justify-center text-2xl flex-shrink-0`}>
                                            {item.icon}
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-bold text-gray-900">{item.activity}</div>
                                            <div className="text-sm text-gray-600">{item.duration}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right - Weekend Activities */}
                    <div className="space-y-6">
                        <div className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 rounded-2xl p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
                                    📅
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">Weekends Include</h3>
                            </div>
                            <div className="space-y-3">
                                {[
                                    { icon: '🎤', title: 'Mock Interviews', desc: 'Real interview simulations with feedback' },
                                    { icon: '⚡', title: 'Coding Tests', desc: 'Timed assessments to track progress' },
                                    { icon: '📊', title: 'Aptitude Tests', desc: 'Full-length company-pattern tests' },
                                    { icon: '✍️', title: 'Resume Reviews', desc: 'One-on-one resume improvement sessions' },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-3 bg-white rounded-lg p-4 border border-orange-100">
                                        <span className="text-2xl">{item.icon}</span>
                                        <div>
                                            <div className="font-bold text-gray-900">{item.title}</div>
                                            <div className="text-sm text-gray-600">{item.desc}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white">
                            <div className="flex items-center gap-2 mb-2">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="font-bold">All sessions are live & recorded</span>
                            </div>
                            <p className="text-sm opacity-90">Missed a class? No problem. Access recordings anytime during your enrollment.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
