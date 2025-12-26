export default function SocialProofSection() {
    const colleges = [
        'Pondicherry University',
        'Sri Manakula Vinayagar Engineering College',
        'MIT Puducherry',
        'Christ College',
        'Tagore Engineering College',
        'SMVEC',
    ];

    const testimonials = [
        {
            quote: 'I joined because I needed structured coding and aptitude practice.',
            role: 'Final Year CSE Student',
            rating: 5
        },
        {
            quote: 'My resume was very weak. This program helps improve it.',
            role: 'Pondicherry University Student',
            rating: 5
        },
        {
            quote: 'Mock interviews and tests make it feel like real placement training.',
            role: 'Engineering Student',
            rating: 5
        },
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Colleges */}
                <div className="mb-20">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
                        Students From These Colleges Have Joined
                    </h2>
                    <p className="text-center text-gray-600 mb-12">
                        Students from colleges across Pondicherry and nearby regions are enrolling
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {colleges.map((college, i) => (
                            <div key={i} className="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4 text-center hover:shadow-lg transition-shadow">
                                <div className="text-3xl mb-2">🎓</div>
                                <p className="text-sm font-medium text-gray-800 leading-tight">{college}</p>
                            </div>
                        ))}
                    </div>

                    <p className="text-center text-sm text-gray-500 mt-6 italic">
                        (College list grows as new students join)
                    </p>
                </div>

                {/* Testimonials */}
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
                        What Early Students Say
                    </h2>

                    <div className="grid md:grid-cols-3 gap-6">
                        {testimonials.map((item, i) => (
                            <div key={i} className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200 hover:border-purple-400 transition-colors">
                                {/* Stars */}
                                <div className="flex gap-1 mb-4">
                                    {[...Array(item.rating)].map((_, j) => (
                                        <svg key={j} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>

                                {/* Quote */}
                                <p className="text-gray-700 italic mb-4">"{item.quote}"</p>

                                {/* Role */}
                                <p className="text-sm font-medium text-gray-900">
                                    — {item.role}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
