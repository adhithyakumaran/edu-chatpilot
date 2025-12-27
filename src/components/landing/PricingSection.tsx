import CountdownTimer from './CountdownTimer';
import { Check } from 'lucide-react';
import Link from 'next/link';

export default function PricingSection() {
    const inclusions = [
        'Live Training Sessions (24 Days)',
        'Lifetime Access to Recordings',
        'Company-Specific Mock Tests',
        'ATS-Friendly Resume Builder',
        '100+ LeetCode Problem Set',
        'Placement Strategy Guide',
    ];

    return (
        <section className="py-24 bg-brand-light relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left: Text Context */}
                    <div className="space-y-6">
                        <div className="inline-block bg-white border border-brand-primary/20 rounded-full px-4 py-1 text-sm font-semibold text-brand-primary mb-2">
                            Value for Money
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-bold text-brand-dark">
                            Premium Training,<br /> <span className="text-brand-primary">Student-Friendly Price.</span>
                        </h2>
                        <p className="text-lg text-gray-600">
                            We believe quality education should be affordable. Get the complete placement preparation package for the cost of a pizza.
                        </p>

                        <div className="flex items-center gap-4">
                            <div className="flex -space-x-4">
                                <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-xl z-20">🚀</div>
                                <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-xl z-10">💼</div>
                                <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-xl z-0">🎓</div>
                            </div>
                            <p className="font-medium text-brand-dark">Join 1000+ others in this batch</p>
                        </div>
                    </div>

                    {/* Right: Pricing Card */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-brand-secondary/20 blur-3xl transform rotate-6 scale-95 rounded-3xl"></div>

                        <div className="relative bg-white rounded-3xl shadow-2xl border border-brand-primary/10 overflow-hidden">
                            <div className="bg-brand-primary p-2 text-center text-white text-sm font-bold">
                                FESTIVE OFFER • ENDS SOON
                            </div>

                            <div className="p-6 md:p-10">
                                <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4 font-sans">
                                    <div>
                                        <p className="text-gray-500 font-medium">Full Course Access</p>
                                        <h3 className="text-2xl md:text-3xl font-bold text-brand-dark">January Batch</h3>
                                        <p className="text-sm text-brand-primary font-semibold mt-1">Starts Jan 05 • Tamil/English</p>
                                    </div>
                                    <div className="text-left md:text-right">
                                        <span className="block text-gray-400 line-through text-lg">₹2,499</span>
                                        <span className="flex flex-wrap items-baseline gap-2 text-4xl font-extrabold text-brand-secondary">
                                            ₹499
                                            <span className="text-sm font-medium text-gray-500">/ Starts Jan 05</span>
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-4 mb-8">
                                    {inclusions.map((item, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <Check className="w-3 h-3 text-green-600" />
                                            </div>
                                            <span className="text-gray-700 font-medium">{item}</span>
                                        </div>
                                    ))}
                                </div>

                                <Link href="/dashboard" className="block w-full">
                                    <button className="w-full bg-gradient-primary hover:opacity-90 text-white font-bold py-4 px-6 rounded-xl text-lg shadow-lg shadow-brand-primary/30 transition-all transform hover:-translate-y-1">
                                        Enroll Now for ₹499
                                    </button>
                                </Link>

                                <p className="text-center text-xs text-gray-400 mt-4">
                                    24-Day Money Back Guarantee • Secure Payment
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
