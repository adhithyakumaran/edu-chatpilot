'use client';

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import TopBanner from "@/components/landing/TopBanner";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white">
            <TopBanner />
            <Navbar bannerVisible={true} />

            <section className="pt-40 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto space-y-12">
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">About LetsLearn by ChatPilot</h1>
                        <p className="text-xl text-gray-600">Bridging the gap between academic theory and industry reality.</p>
                    </div>

                    <div className="prose prose-lg mx-auto text-gray-700">
                        <p>
                            At <strong>LetsLearn by ChatPilot</strong>, we believe that talent is everywhere, but opportunity is not.
                            Our mission is to democratize high-quality technical education and make top-tier placement preparation accessible to every student,
                            regardless of their college tier or background.
                        </p>

                        <h3>Why We Started</h3>
                        <p>
                            We noticed a glaring gap in the current education system. Students spend four years learning theory but struggle to write
                            production-ready code or clear technical interviews. We created this platform to fix that—providing a structured,
                            intensive, and practical pathway to your dream job.
                        </p>

                        <h3>Our Philosophy</h3>
                        <p>
                            We don't sell courses; we sell outcomes. Our 24-day intensive program is designed not just to teach you syntax,
                            but to teach you how to think like an engineer.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 text-center pt-8">
                        <div className="p-6 bg-brand-light/30 rounded-2xl">
                            <h3 className="text-3xl font-bold text-brand-primary mb-2">1000+</h3>
                            <p className="font-medium text-gray-600">Students Mentored</p>
                        </div>
                        <div className="p-6 bg-brand-light/30 rounded-2xl">
                            <h3 className="text-3xl font-bold text-brand-primary mb-2">85%</h3>
                            <p className="font-medium text-gray-600">Placement Success Rate</p>
                        </div>
                        <div className="p-6 bg-brand-light/30 rounded-2xl">
                            <h3 className="text-3xl font-bold text-brand-primary mb-2">24/7</h3>
                            <p className="font-medium text-gray-600">Doubt Support</p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
