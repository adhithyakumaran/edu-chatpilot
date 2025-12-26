'use client';

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import TopBanner from "@/components/landing/TopBanner";
import { Check, Clock, Calendar, Users, Trophy, BookOpen } from "lucide-react";
import Link from 'next/link';

export default function CoursesPage() {
    return (
        <main className="min-h-screen bg-gray-50">
            <TopBanner />
            <Navbar bannerVisible={true} />

            <section className="pt-40 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Our Premium Courses</h1>
                        <p className="text-xl text-gray-600">Hand-picked, industry-relevant curriculum designed for results.</p>
                    </div>

                    {/* Featured Course Card - "Floating" Style */}
                    <div className="max-w-5xl mx-auto">
                        <div className="bg-white rounded-[32px] shadow-2xl overflow-hidden border border-brand-primary/10 relative transform hover:-translate-y-1 transition-all duration-300">
                            {/* Floating Badge */}
                            <div className="absolute top-6 right-6 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full z-10 animate-pulse">
                                PLACEMENT READY
                            </div>

                            <div className="grid lg:grid-cols-2">
                                <div className="p-8 lg:p-12 space-y-8 flex flex-col justify-center">
                                    <div>
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-light text-brand-primary text-sm font-semibold mb-4">
                                            <Trophy className="w-4 h-4" /> Jan 05 Batch
                                        </div>
                                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                            Placement Ready Program for Jan Batch
                                        </h2>
                                        <p className="text-gray-600 text-lg leading-relaxed">
                                            Everything you need to crack your placements. Daily live classes, mentorship, and extensive practice.
                                        </p>
                                        <p className="text-xs text-gray-400 mt-2 font-mono">ID: course_jan_2025_placement</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                                <Clock className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Duration</p>
                                                <p className="font-semibold text-gray-900">24 Days</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                                                <Users className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Daily Class</p>
                                                <p className="font-semibold text-gray-900">1 Hour Live</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                                                <Calendar className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Start Date</p>
                                                <p className="font-semibold text-gray-900">Jan 05</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
                                                <BookOpen className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Language</p>
                                                <p className="font-semibold text-gray-900">Tamil/English</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-gray-100">
                                        <div className="w-full sm:w-auto">
                                            <p className="text-sm text-gray-400 line-through mb-1">₹2,499</p>
                                            <p className="text-4xl font-bold text-brand-primary">₹499</p>
                                        </div>
                                        <div className="flex flex-1 gap-3 w-full">
                                            <Link href="/dashboard" className="flex-1">
                                                <button className="w-full bg-brand-primary hover:bg-violet-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg hover:shadow-brand-primary/25">
                                                    Enroll Now
                                                </button>
                                            </Link>
                                            <button className="px-6 py-3.5 rounded-xl border-2 border-brand-primary/20 text-brand-primary font-bold hover:bg-brand-primary/5 transition-colors">
                                                Get Notified
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-8 lg:p-12 border-t lg:border-t-0 lg:border-l border-gray-100 flex flex-col justify-center">
                                    <h3 className="text-xl font-bold text-gray-900 mb-6">What you'll master:</h3>
                                    <ul className="space-y-4">
                                        {[
                                            'Solve 100+ LeetCode Problems',
                                            'Complete System Design Basics',
                                            'Aptitude & Reasoning Classes',
                                            'Build 2 Major Side Projects',
                                            'Earn Course Certification',
                                            'Resume & Interview Tips',
                                            'Mock Interviews with Experts',
                                            'Class Links in Student Dashboard'
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                                <span className="text-gray-700 font-medium">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
