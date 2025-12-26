export default function ProblemSection() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto space-y-6">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                        Why This Program Exists
                    </h2>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Every year, <strong>thousands of students fail placements</strong> not because they are weak — but because they were never <strong>trained properly</strong>.
                    </p>
                </div>

                <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { icon: '📝', title: 'Aptitude & Online Tests', desc: 'Most students struggle with timed quantitative and logical reasoning tests' },
                        { icon: '📄', title: 'Resume Writing', desc: 'Weak resumes that get rejected by ATS systems and recruiters' },
                        { icon: '💻', title: 'Coding Interviews', desc: 'Unable to solve DSA problems under pressure during technical rounds' },
                        { icon: '🗣️', title: 'HR Confidence', desc: 'Poor communication and unprepared answers in behavioral interviews' },
                    ].map((problem, i) => (
                        <div key={i} className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                            <div className="text-4xl mb-4">{problem.icon}</div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{problem.title}</h3>
                            <p className="text-gray-700 text-sm">{problem.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        This Pre-Placement Technical Training Program is built to solve exactly that.
                    </p>
                </div>
            </div>
        </section>
    );
}
