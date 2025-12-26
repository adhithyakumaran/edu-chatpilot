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
                        <div key={i} className="bg-white border border-gray-100 rounded-xl p-8 hover:shadow-xl transition-all duration-300 hover:border-brand-primary/20 group">
                            <div className="w-14 h-14 bg-brand-light rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300">
                                {problem.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-brand-primary transition-colors">{problem.title}</h3>
                            <p className="text-gray-600 text-[15px] leading-relaxed">{problem.desc}</p>
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
