import { Video, Award, Users, Clock } from 'lucide-react';

export default function FeaturesSection() {
    const features = [
        {
            icon: <Award className="w-6 h-6 text-brand-dark" />,
            title: "Get Certificate",
            desc: "Add immediate value to your resume. Recognized by recruiters."
        },
        {
            icon: <Users className="w-6 h-6 text-brand-dark" />,
            title: "Interview-Driven Training",
            desc: "Learn exactly what interviewers ask. No fluff, just what gets you hired."
        },
        {
            icon: <Clock className="w-6 h-6 text-brand-dark" />,
            title: "Life Time Support",
            desc: "Placement support doesn't end until you are hired."
        },
        {
            icon: <Video className="w-6 h-6 text-brand-dark" />,
            title: "Recruiter-Grade Projects",
            desc: "Build projects that pass the 10-second recruiter screening test."
        }
    ];

    return (
        <section className="py-24 bg-brand-light">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left: Dark Feature Highlight - Adapted to Purple */}
                    <div className="bg-gradient-to-br from-brand-secondary to-brand-primary rounded-[32px] p-10 flex flex-col justify-center text-white relative overflow-hidden shadow-xl">
                        {/* Decor */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-[100px] opacity-50"></div>

                        <h2 className="text-4xl font-bold mb-2 font-display">Our <span className="text-white italic font-serif opacity-90">Features</span></h2>
                        <h2 className="text-4xl font-bold mb-8 font-display text-purple-100">Special For you</h2>

                        <button className="bg-white text-brand-secondary px-6 py-3 rounded-full font-bold w-fit hover:scale-105 transition-transform shadow-lg">
                            See All Features ↗
                        </button>
                    </div>

                    {/* Right: Feature Grid */}
                    <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
                        {features.map((feature, i) => (
                            <div key={i} className="bg-white p-8 rounded-[24px] shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                                <div className="w-12 h-12 bg-brand-primary/20 rounded-xl flex items-center justify-center mb-6">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-brand-dark mb-3">{feature.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
