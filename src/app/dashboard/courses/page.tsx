'use client';

import { useState, useEffect } from 'react';
import { BookOpen, Clock, Star, ChevronRight, PlayCircle, Lock, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { getCourses } from '@/services/placementApi';

export default function CoursesPage() {
    const [activeTab, setActiveTab] = useState<'my-courses' | 'explore'>('my-courses');
    const [allCourses, setAllCourses] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    // Initial Fetch for Explore Tab
    useEffect(() => {
        if (activeTab === 'explore' && allCourses.length === 0) {
            const fetchCourses = async () => {
                setLoading(true);
                const data = await getCourses();
                setAllCourses(data);
                setLoading(false);
            };
            fetchCourses();
        }
    }, [activeTab]);

    const myCourses = [
        {
            id: 'placement-ready-jan-2025',
            title: 'Placement Ready Program (Jan Batch)',
            progress: 5,
            totalLessons: 24,
            completedLessons: 1,
            lastAccessed: 'Just now',
            image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop', // Business/Meeting image
            instructor: 'Edu ChatPilot Team',
            nextLesson: 'Day 1: Arrays & Hashing (LeetCode 75)'
        }
    ];

    // Placeholder removed, fetching real data now


    return (
        <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
                    <p className="text-gray-500 text-sm">Manage your learning journey and explore new skills.</p>
                </div>

                {/* Tabs */}
                <div className="flex bg-white rounded-lg p-1 shadow-sm border border-gray-200">
                    <button
                        onClick={() => setActiveTab('my-courses')}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'my-courses'
                            ? 'bg-brand-primary text-white shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        My Courses
                    </button>
                    <button
                        onClick={() => setActiveTab('explore')}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'explore'
                            ? 'bg-brand-primary text-white shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Explore Library
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="min-h-[60vh]">
                {activeTab === 'my-courses' ? (
                    <div className="grid grid-cols-1 gap-6">
                        {myCourses.map(course => (
                            <div key={course.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow">
                                {/* Course Image */}
                                <div className="w-full md:w-64 h-40 rounded-xl overflow-hidden flex-shrink-0 relative">
                                    <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                        <PlayCircle className="w-12 h-12 text-white drop-shadow-lg" />
                                    </div>
                                </div>

                                {/* Course Details */}
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900 mb-1">{course.title}</h3>
                                                <p className="text-sm text-gray-500 mb-4">Instructor: {course.instructor}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                                    Featured
                                                </span>
                                                <span className="bg-brand-primary/10 text-brand-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                                    Powerpack Course
                                                </span>
                                            </div>
                                        </div>

                                        <div className="space-y-2 mb-4">
                                            <p className="text-gray-600 text-sm line-clamp-2">
                                                Master 100+ LeetCode problems, Aptitude, and Interview Prep in just 24 days.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <PlayCircle className="w-4 h-4 text-brand-primary" />
                                            <span>Values: <strong>{course.nextLesson}</strong></span>
                                        </div>
                                        <Link
                                            href={`/dashboard/courses/${course.id}`}
                                            className="px-6 py-2 bg-brand-primary text-white font-bold rounded-lg hover:bg-violet-700 transition-colors shadow-sm ml-auto"
                                        >
                                            Enroll Now
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {loading ? (
                            <div className="col-span-full py-12 text-center text-gray-500 flex flex-col items-center">
                                <Loader2 className="w-8 h-8 animate-spin mb-2 text-brand-primary" />
                                <p>Loading courses...</p>
                            </div>
                        ) : allCourses.length === 0 ? (
                            <div className="col-span-full py-12 text-center text-gray-500">
                                No courses available yet.
                            </div>
                        ) : (
                            allCourses.map(course => (
                                <div key={course.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                                    <div className="h-48 overflow-hidden relative">
                                        <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-bold shadow-sm">
                                            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                            {course.rating || 5.0}
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <div className="flex gap-2 mb-3 flex-wrap">
                                            {course.tags?.map((tag: string) => (
                                                <span key={tag} className="text-[10px] font-semibold bg-violet-50 text-violet-600 px-2 py-1 rounded-md">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3rem]">{course.title}</h3>
                                        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                                            <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> {course.students?.toLocaleString() || 0} Students</span>
                                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {course.duration}</span>
                                        </div>
                                        <button className="w-full py-2.5 rounded-xl border border-gray-200 text-gray-700 font-medium text-sm hover:bg-gray-50 hover:border-gray-300 transition-colors flex items-center justify-center gap-2">
                                            <Lock className="w-4 h-4 text-gray-400" /> View Details
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
