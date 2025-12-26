export default function DashboardPreviewSection() {
    return (
        <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                        Your Student Dashboard
                    </h2>
                    <p className="text-xl text-gray-600">
                        Every enrolled student gets access to <strong>edu.chatpilot.co.in</strong>
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { icon: '🎥', title: 'Live Class Links', desc: 'Join daily sessions with one click' },
                        { icon: '📹', title: 'Recorded Sessions', desc: 'Lifetime access to all recordings' },
                        { icon: '📚', title: 'Study Resources', desc: 'PDFs, code samples, and notes' },
                        { icon: '✅', title: 'Tests & Mock Interviews', desc: 'Track your progress weekly' },
                        { icon: '📝', title: 'Resume Builder', desc: 'ATS-friendly templates included' },
                        { icon: '📊', title: 'Progress Tracking', desc: 'Visual dashboard of your journey' },
                        { icon: '📅', title: 'Full Syllabus', desc: 'Day-by-day curriculum breakdown' },
                        { icon: '🎯', title: 'Placement Prep', desc: 'Interview tips and strategies' },
                    ].map((feature, i) => (
                        <div key={i} className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-200">
                            <div className="text-4xl mb-3">{feature.icon}</div>
                            <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                            <p className="text-sm text-gray-600">{feature.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-2xl font-bold text-purple-600">
                        This is a complete Pre-Placement Training Platform, not just video classes.
                    </p>
                </div>
            </div>
        </section>
    );
}
