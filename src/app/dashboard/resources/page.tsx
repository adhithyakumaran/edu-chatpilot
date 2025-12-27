'use client';

import { useState } from 'react';
import {
    BookOpen, Cpu, Globe, Database, Smartphone, Code, Shield, Cloud, Terminal,
    ExternalLink, Layers, Search, GraduationCap
} from 'lucide-react';

// --- DATA ---
const resourceCategories = [
    {
        id: 'upsc',
        label: 'UPSC Prep',
        icon: BookOpen,
        color: 'text-orange-600',
        bg: 'bg-orange-50',
        desc: 'General Studies & Strategy',
        items: [
            { title: 'Unacademy Free Classes', url: 'https://unacademy.com/goal/ias/YOUR-FREE-CLASSES', desc: 'UPSC basics, current affairs, strategy', image: 'https://images.unsplash.com/photo-1576779435017-cbe0dce08285?q=80&w=800&auto=format&fit=crop' },
            { title: 'BYJU’S Free Prep', url: 'https://byjus.com/upsc-free/', desc: 'Comprehensive preparation videos', image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop' },
            { title: 'NCERT Books (PDFs)', url: 'https://ncert.nic.in/textbook.php', desc: 'Core UPSC foundation textbooks', image: 'https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?q=80&w=800&auto=format&fit=crop' }
        ]
    },
    {
        id: 'iot',
        label: 'Electronics & IoT',
        icon: Cpu,
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        desc: 'Embedded Systems, ESP32, LoRa',
        items: [
            { title: 'NPTEL: Intro to IoT', url: 'https://onlinecourses.nptel.ac.in/noc24_ee29/preview', desc: 'Free certificate option available', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop' },
            { title: 'Coursera: IoT & Wireless', url: 'https://www.coursera.org/learn/iot', desc: 'Introduction to Wireless Comms', image: 'https://images.unsplash.com/photo-1563770095-39d468f9a51d?q=80&w=800&auto=format&fit=crop' },
            { title: 'ESP32 Beginner Guide', url: 'https://randomnerdtutorials.com/getting-started-with-esp32/', desc: 'Random Nerd Tutorials', image: 'https://images.unsplash.com/photo-1555664424-778a69022365?q=80&w=800&auto=format&fit=crop' },
            { title: 'LoRaWAN Basics', url: 'https://www.thethingsnetwork.org/docs/lorawan/', desc: 'The Things Network Documentation', image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=800&auto=format&fit=crop' }
        ]
    },
    {
        id: 'web',
        label: 'Web Development',
        icon: Globe,
        color: 'text-pink-600',
        bg: 'bg-pink-50',
        desc: 'Full Stack, Frontend, Backend',
        items: [
            { title: 'freeCodeCamp', url: 'https://www.freecodecamp.org/', desc: 'Full Stack Certification', image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=800&auto=format&fit=crop' },
            { title: 'The Odin Project', url: 'https://www.theodinproject.com/', desc: 'Full Web Dev Pattern', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop' },
            { title: 'React Official Docs', url: 'https://react.dev/learn', desc: 'Learn React from the creators', image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop' },
            { title: 'Node.js Playlist', url: 'https://www.youtube.com/playlist?list=PL4cUxeGkcC9gQeDH6xYhmO-db2mhoTSrT', desc: 'The Net Ninja (YouTube)', image: 'https://images.unsplash.com/photo-1618477247222-ac5913054c90?q=80&w=800&auto=format&fit=crop' }
        ]
    },
    {
        id: 'cloud',
        label: 'Cloud & DevOps',
        icon: Cloud,
        color: 'text-sky-600',
        bg: 'bg-sky-50',
        desc: 'AWS, Google Cloud, Azure',
        items: [
            { title: 'AWS Cloud Practitioner', url: 'https://www.aws.training/Details/Curriculum?id=20685', desc: 'Official Free Essentials Course', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop' },
            { title: 'Google Cloud Skills', url: 'https://cloud.google.com/training', desc: 'Free Quests & Labs', image: 'https://images.unsplash.com/photo-1484557052118-f32bd2515076?q=80&w=800&auto=format&fit=crop' },
            { title: 'Azure Fundamentals', url: 'https://learn.microsoft.com/en-us/training/azure/', desc: 'Microsoft Learn Path', image: 'https://images.unsplash.com/photo-1506399558188-acca3f85ed41?q=80&w=800&auto=format&fit=crop' },
            { title: 'DevOps Beginner', url: 'https://www.youtube.com/watch?v=R8-O2AXtMTM', desc: 'freeCodeCamp Video', image: 'https://images.unsplash.com/photo-1667372393119-c81c0e839adb?q=80&w=800&auto=format&fit=crop' }
        ]
    },
    {
        id: 'db',
        label: 'Databases',
        icon: Database,
        color: 'text-indigo-600',
        bg: 'bg-indigo-50',
        desc: 'SQL, MongoDB',
        items: [
            { title: 'SQL for Data Science', url: 'https://www.coursera.org/learn/sql-for-data-science', desc: 'Coursera Audit Free', image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=800&auto=format&fit=crop' },
            { title: 'MongoDB University', url: 'https://university.mongodb.com', desc: 'Format MongoDB Courses', image: 'https://images.unsplash.com/photo-1594904351111-a072f80b1a71?q=80&w=800&auto=format&fit=crop' }
        ]
    },
    {
        id: 'mobile',
        label: 'Mobile App Dev',
        icon: Smartphone,
        color: 'text-teal-600',
        bg: 'bg-teal-50',
        desc: 'Flutter, React Native',
        items: [
            { title: 'Flutter & Dart', url: 'https://www.youtube.com/watch?v=VPvVD8t02U8', desc: 'freeCodeCamp Full Course', image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=800&auto=format&fit=crop' },
            { title: 'React Native', url: 'https://www.youtube.com/playlist?list=PL4cUxeGkcC9hL6uk5M8bvVYRjTP25wZs8', desc: 'The Net Ninja Playlist', image: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80&w=800&auto=format&fit=crop' }
        ]
    },
    {
        id: 'cs',
        label: 'CS Fundamentals',
        icon: Code,
        color: 'text-violet-600',
        bg: 'bg-violet-50',
        desc: 'DSA, AI/ML',
        items: [
            { title: 'CS50', url: 'https://cs50.harvard.edu', desc: 'Harvard\'s Full CS Course', image: 'https://images.unsplash.com/photo-1623479322729-28b25c16b011?q=80&w=800&auto=format&fit=crop' },
            { title: 'Machine Learning', url: 'https://www.coursera.org/learn/machine-learning', desc: 'Andrew Ng (Audit Free)', image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=800&auto=format&fit=crop' },
            { title: 'Data Structures', url: 'https://www.freecodecamp.org/learn', desc: 'JS / Python DSA', image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=800&auto=format&fit=crop' }
        ]
    },
    {
        id: 'misc',
        label: 'Essentials',
        icon: Layers,
        color: 'text-gray-600',
        bg: 'bg-gray-50',
        desc: 'Git, UX, Security',
        items: [
            { title: 'Learn Git', url: 'https://www.codecademy.com/learn/learn-git', desc: 'Version Control Basics', image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?q=80&w=800&auto=format&fit=crop' },
            { title: 'Google UX Design', url: 'https://www.coursera.org/professional-certificates/google-ux-design', desc: 'Professional Certificate (Audit)', image: 'https://images.unsplash.com/photo-1586717791821-3f44a5638d0f?q=80&w=800&auto=format&fit=crop' },
            { title: 'Cybersecurity', url: 'https://www.coursera.org/professional-certificates/google-cybersecurity', desc: 'Google Certificate (Audit)', image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=800&auto=format&fit=crop' }
        ]
    }
];

export default function ResourcesPage() {
    const [selectedId, setSelectedId] = useState('upsc');

    const activeCategory = resourceCategories.find(c => c.id === selectedId) || resourceCategories[0];

    return (
        <div className="min-h-screen bg-gray-50 p-8 space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <GraduationCap className="w-8 h-8 text-brand-primary" /> Free Learning Resources
                </h1>
                <p className="text-gray-500 mt-1">Hand-picked collection of top-tier free courses and documentation.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Navigation */}
                <div className="w-full lg:w-64 flex-shrink-0 space-y-1">
                    {resourceCategories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedId(cat.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${selectedId === cat.id
                                    ? 'bg-white text-brand-primary shadow-sm ring-1 ring-brand-primary/10'
                                    : 'text-gray-600 hover:bg-white/60 hover:text-gray-900'
                                }`}
                        >
                            <cat.icon className={`w-4 h-4 ${cat.color}`} />
                            <div className="text-left">
                                <div>{cat.label}</div>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Content Grid */}
                <div className="flex-1">
                    <div className="mb-6">
                        <h2 className="text-xl font-bold text-gray-900">{activeCategory.label}</h2>
                        <p className="text-sm text-gray-500">{activeCategory.desc}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {activeCategory.items.map((item, idx) => (
                            <div key={idx} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                <div className="h-32 bg-gray-100 relative overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                                </div>
                                <div className="p-5">
                                    <h3 className="font-bold text-gray-900 mb-1 line-clamp-1">{item.title}</h3>
                                    <p className="text-xs text-gray-500 mb-4 line-clamp-2 min-h-[2.5em]">{item.desc}</p>

                                    <a
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-xs font-bold text-brand-primary hover:text-violet-700 bg-violet-50 hover:bg-violet-100 px-3 py-2 rounded-lg transition-colors w-full justify-center"
                                    >
                                        Start Learning <ExternalLink className="w-3 h-3" />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
