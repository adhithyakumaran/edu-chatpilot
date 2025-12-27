import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
    return (
        <section className="relative min-h-[95vh] flex items-center bg-white overflow-hidden pt-36 sm:pt-32 pb-16 sm:pb-20">
            {/* Elegant Background Gradients */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-secondary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* Left Content */}
                    <div className="space-y-6 sm:space-y-8 animate-fade-in-up max-w-2xl">
                        {/* Headline */}
                        <h1 className="text-4xl lg:text-[64px] font-bold text-gray-900 leading-[1.1] tracking-tight font-display">
                            Get Job-Ready for Tech Interviews in <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">24 Days</span>
                        </h1>

                        {/* New Value Prop */}
                        <p className="text-lg text-gray-500 leading-relaxed font-medium max-w-lg mt-4">
                            Colleges teach theory. YouTube teaches syntax.<br />
                            Companies hire people who can build.<br />
                            <span className="text-brand-primary font-bold">That’s what we teach in 24 days.</span>
                        </p>

                        {/* Pricing Block - Reverted */}
                        <div>
                            <div className="flex flex-col sm:flex-row sm:items-end gap-2 sm:gap-3 px-2">
                                <span className="text-lg font-medium text-gray-400 line-through decoration-red-500 decoration-2 w-fit">₹2,499</span>
                                <span className="text-4xl font-extrabold text-brand-dark flex items-baseline flex-wrap gap-2">
                                    ₹499
                                    <span className="text-lg font-medium text-gray-500">Starts Jan 05</span>
                                </span>
                                <span className="mb-1 text-sm font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded w-fit">80% OFF</span>
                            </div>
                            <p className="text-lg text-gray-500 font-medium mt-2 pl-2 sm:pl-3">
                                (One interview call is worth more than this price)
                            </p>

                            {/* Action Area */}
                            <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center pt-6">
                                <Link href="/dashboard" className="bg-brand-primary hover:bg-violet-700 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all shadow-xl shadow-brand-primary/20 flex items-center gap-2 group transform hover:-translate-y-1 block w-fit">
                                    Enroll Now
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Right Visual - Specific Local Image */}
                    <div className="relative hidden lg:block h-full min-h-[600px] flex items-center justify-center">
                        {/* Main Image Container */}
                        <div className="relative w-full max-w-lg mx-auto rounded-[32px] overflow-hidden shadow-2xl shadow-brand-primary/10 border-[8px] border-white transform rotate-2 hover:rotate-0 transition-all duration-700">
                            <img
                                src="/6670916.jpg"
                                alt="Student Success"
                                className="w-full h-auto object-cover"
                            />
                            {/* Overlay Gradient (Subtle) */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                        </div>

                        {/* Background Decor */}
                        <div className="absolute -z-10 top-10 right-10 w-full h-full bg-brand-primary/5 rounded-full blur-3xl"></div>
                    </div>

                </div>
            </div>
        </section >
    );
}
