export default function FeaturesSection() {
    const features = [
        {
            icon: '💻',
            title: 'Coding & Problem Solving',
            color: 'from-purple-500 to-pink-500',
            items: [
                'Java or Python fundamentals',
                'Data Structures & Algorithms',
                '100 curated LeetCode problems',
                'Weekly coding tests'
            ]
        },
        {
            icon: '🧠',
            title: 'Aptitude & Logical Reasoning',
            color: 'from-blue-500 to-cyan-500',
            items: [
                'Quantitative aptitude',
                'Logical reasoning',
                'Company-pattern mock tests',
                'Time-bound practice sessions'
            ]
        },
        {
            icon: '📄',
            title: 'Resume & HR Interview',
            color: 'from-orange-500 to-red-500',
            items: [
                'ATS-friendly resume builder',
                'Project explanation techniques',
                'HR & behavioral questions',
                'Email and LinkedIn tips'
            ]
        },
        {
            icon: '🎯',
            title: 'Placement Strategy',
            color: 'from-green-500 to-teal-500',
            items: [
                'How to apply smartly',
                'Getting referrals',
                'Reaching out to recruiters',
                'Job application tracking'
            ]
        }
    ];

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                        What You Will Learn
                    </h2>
                    <p className="text-xl text-gray-600">
                        A complete 360° approach to placement preparation
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, i) => (
                        <div key={i} className="group relative">
                            {/* Glass Card */}
                            <div className="glass bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200">
                                {/* Icon with Gradient Background */}
                                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform`}>
                                    {feature.icon}
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-bold text-gray-900 mb-4">
                                    {feature.title}
                                </h3>

                                {/* Features List */}
                                <ul className="space-y-2">
                                    {feature.items.map((item, j) => (
                                        <li key={j} className="flex items-start gap-2 text-gray-700 text-sm">
                                            <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Hover Gradient Glow */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity -z-10 blur-xl`}></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
