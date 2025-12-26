export default function SocialProofSection() {
    const colleges = [
        'Pondicherry University', 'SMVEC', 'MIT Puducherry', 'Christ College', 'Tagore Eng.', 'RGCET'
    ];

    const mentors = [
        {
            name: 'Kavin',
            role: 'Lead Instructor (SDE-2)',
            company: 'Ex-Zoho, 4+ Yrs Exp',
            image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
        },
        {
            name: 'Priya',
            role: 'Aptitude Trainer',
            company: 'CAT 99%ile Scorer',
            image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka'
        },
        {
            name: 'Rahul',
            role: 'Mock Interviewer',
            company: 'Placed in TCS Digital',
            image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob'
        }
    ];

    return (
        <section className="py-24 bg-brand-light/30 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold text-brand-dark mb-4">
                        Learn from the <span className="text-brand-primary">Best</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Our mentors are industry professionals and top rankers who have cracked the exact exams you are preparing for.
                    </p>
                </div>

                {/* Mentors Grid (Reference Style) */}
                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    {mentors.map((mentor, i) => (
                        <div key={i} className="bg-white rounded-[24px] p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 group">
                            <div className="flex flex-col items-center text-center">
                                <div className="w-24 h-24 rounded-full p-1 bg-gradient-brand mb-4 ring-4 ring-brand-light group-hover:ring-brand-primary/20 transition-all">
                                    <img src={mentor.image} alt={mentor.name} className="w-full h-full rounded-full bg-gray-100" />
                                </div>
                                <h3 className="text-xl font-bold text-brand-dark mb-1">@{mentor.name}</h3>
                                <p className="text-brand-primary font-semibold text-sm mb-1">{mentor.role}</p>
                                <p className="text-gray-500 text-xs uppercase tracking-wider font-bold">{mentor.company}</p>
                            </div>
                        </div>
                    ))}
                </div>


            </div>
        </section>
    );
}
