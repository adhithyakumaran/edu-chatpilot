'use client';

import {
    LayoutDashboard,
    BookOpen,
    FolderKanban,
    FileText,
    Award,
    Briefcase,
    MessageCircle,
    Settings,
    LogOut,
    Rocket,
    Code
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Sidebar() {
    const pathname = usePathname();
    const { user, logout } = useAuth();

    const menuItems = [
        { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
        { name: 'Courses', icon: BookOpen, href: '/dashboard/courses' },
        { name: 'Coding IDE', icon: Code, href: '/dashboard/ide' },
        { name: 'Tests & Interviews', icon: FileText, href: '/dashboard/tests' },
        { name: 'Resume Builder', icon: Briefcase, href: '/dashboard/resume' },
        { name: 'Exam Prep', icon: Rocket, href: '/dashboard/placemen-prep' },
        { name: 'Mentor Support', icon: MessageCircle, href: '/dashboard/mentor' },
        { name: 'Resources', icon: FolderKanban, href: '/dashboard/resources' },
        { name: 'Certificates', icon: Award, href: '/dashboard/certificates' },
        { name: 'Settings', icon: Settings, href: '/dashboard/settings' },
    ];

    // Get initials
    const initials = user?.displayName
        ? user.displayName.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()
        : 'S';

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-gray-900 text-white flex flex-col z-40 hidden md:flex">
            {/* Branding */}
            <div className="p-6 flex justify-center">
                <h1 className="text-3xl font-bold tracking-tighter text-white">
                    Dev<span className="text-brand-primary">lup</span>
                </h1>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20'
                                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                }`}
                        >
                            <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-white'}`} />
                            <span className="font-medium text-sm">{item.name}</span>
                        </Link>
                    );
                })}
            </div>

            {/* Logout Button */}
            <div className="px-4 py-2">
                <button
                    onClick={async () => {
                        if (window.confirm('Are you sure you want to log out?')) {
                            await logout();
                        }
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-500 transition-all duration-200 group"
                >
                    <LogOut className="w-5 h-5 group-hover:scale-105 transition-transform" />
                    <span className="font-medium text-sm">Log Out</span>
                </button>
            </div>
        </aside>
    );
}
