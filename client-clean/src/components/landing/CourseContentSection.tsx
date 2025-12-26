'use client';

import { useState } from 'react';
import { ChevronDown, PlayCircle, FileText, CheckCircle2 } from 'lucide-react';

export default function CourseContentSection() {
    const [openSection, setOpenSection] = useState<number | null>(0);

    const curriculum = [
        {
            title: 'Week 1: Foundations & Core Logic',
            subtitle: 'Java/Python Basics, Loops, Arrays',
            lessons: [
                { title: 'Environment Setup & "Hello World"', type: 'video', duration: '45m' },
                { title: 'Variables, Types, & Operators Deep Dive', type: 'video', duration: '1h 10m' },
                { title: 'Mastering Loops & Conditionals', type: 'video', duration: '1h 30m' },
                { title: 'Functions & Modular Code', type: 'video', duration: '1h 15m' },
                { title: 'Live Coding Test 1', type: 'test', duration: '1h' }
            ]
        },
        {
            title: 'Week 2: Data Structures (DSA)',
            subtitle: 'Arrays, Strings, HashMaps, Stacks',
            lessons: [
                { title: 'Arrays & String Manipulation Tricks', type: 'video', duration: '1h 45m' },
                { title: 'The Power of HashMaps', type: 'video', duration: '1h 20m' },
                { title: 'Two Pointers & Sliding Window', type: 'video', duration: '1h 30m' },
                { title: 'Stack & Queue Real-world Examples', type: 'video', duration: '1h 15m' },
                { title: 'LeetCode Marathon', type: 'video', duration: '2h' }
            ]
        },
        {
            title: 'Week 3: Aptitude Mastery',
            subtitle: 'Quant, Logical, Data Interpretation',
            lessons: [
                { title: 'Speed Math & Number Systems', type: 'video', duration: '1h 30m' },
                { title: 'Percentages, Profit & Loss', type: 'video', duration: '1h' },
                { title: 'Blood Relations & Direction Sense', type: 'video', duration: '1h 15m' },
                { title: 'Data Interpretation Visuals', type: 'video', duration: '1h' },
                { title: 'Mock Aptitude Test', type: 'test', duration: '1h 30m' }
            ]
        },
        {
            title: 'Week 4: The Final Polish',
            subtitle: 'Resume, Mock Interviews, HR Skills',
            lessons: [
                { title: 'Building a 1-Page ATS Resume', type: 'video', duration: '1h' },
                { title: 'HR Question Bank Decoded', type: 'video', duration: '45m' },
                { title: 'Mock Interview: Common Mistakes', type: 'video', duration: '1h' },
                { title: 'LinkedIn Profile Optimization', type: 'video', duration: '1h 30m' },
                { title: 'Final Certification Test', type: 'test', duration: '2h' }
            ]
        }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl font-bold text-brand-dark">Curriculum Designed for <span className="text-brand-primary">Success</span></h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Covering every aspect of placement preparation. From writing your first line of code to signing your offer letter.
                    </p>
                </div>

                {/* Accordion */}
                <div className="space-y-4">
                    {curriculum.map((section, index) => (
                        <div key={index} className={`border rounded-2xl transition-all duration-300 ${openSection === index ? 'border-brand-primary/30 shadow-md bg-brand-light/30' : 'border-gray-200 hover:border-brand-primary/20 bg-white'}`}>
                            <button
                                onClick={() => setOpenSection(openSection === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-colors ${openSection === index ? 'bg-brand-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
                                        {index + 1}
                                    </div>
                                    <div>
                                        <h3 className={`text-lg font-bold ${openSection === index ? 'text-brand-dark' : 'text-gray-700'}`}>{section.title}</h3>
                                        <p className="text-sm text-gray-500">{section.subtitle}</p>
                                    </div>
                                </div>
                                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openSection === index ? 'rotate-180 text-brand-primary' : ''}`} />
                            </button>

                            <div className={`grid transition-all duration-300 ease-in-out ${openSection === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                <div className="overflow-hidden">
                                    <div className="p-6 pt-0 space-y-3">
                                        <div className="h-px bg-gray-200 mb-4"></div>
                                        {section.lessons.map((lesson, i) => (
                                            <div key={i} className="flex items-center justify-between group p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all">
                                                <div className="flex items-center gap-3">
                                                    {lesson.type === 'video' ?
                                                        <PlayCircle className="w-5 h-5 text-brand-secondary group-hover:scale-110 transition-transform" /> :
                                                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                                                    }
                                                    <span className="text-gray-700 font-medium group-hover:text-brand-primary transition-colors">{lesson.title}</span>
                                                </div>
                                                <span className="text-xs font-semibold px-2 py-1 bg-gray-100 rounded text-gray-500">{lesson.duration}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <button className="text-brand-primary font-bold hover:text-brand-dark flex items-center justify-center gap-2 mx-auto hover:underline transition-all">
                        <FileText className="w-4 h-4" />
                        Download Detailed Syllabus (PDF)
                    </button>
                </div>
            </div>
        </section>
    );
}
