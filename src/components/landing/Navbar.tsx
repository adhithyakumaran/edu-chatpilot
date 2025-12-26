'use client';

import { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, Rocket } from 'lucide-react';
import Link from 'next/link';

interface NavbarProps {
    bannerVisible: boolean;
}

export default function Navbar({ bannerVisible }: NavbarProps) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Resources', href: '#resources' },
        { name: 'About', href: '/about' },
        { name: 'Courses', href: '/courses' },
    ];

    const topPosition = bannerVisible ? 'top-[42px]' : 'top-0';

    return (
        <nav className={`fixed ${topPosition} left-0 right-0 z-50 transition-all duration-300 border-b ${scrolled ? 'bg-white/90 backdrop-blur-md border-gray-200 py-3 shadow-sm' : 'bg-white/50 backdrop-blur-sm border-gray-100 py-5'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">

                    {/* Logo & Brand */}
                    {/* Logo & Brand */}
                    {/* Logo & Brand */}
                    <div className="flex flex-col items-center gap-0 cursor-pointer group">
                        <img src="/edu-chapilot-removebg-preview.png" alt="EduChatPilot" className="h-[55px] md:h-[80px] w-auto object-contain transform group-hover:scale-105 transition-transform duration-300" />
                        <span className="text-[9px] md:text-[10px] font-bold text-gray-500 uppercase tracking-widest -mt-3 md:-mt-5">by ChatPilot</span>
                    </div>

                    {/* Desktop Menu - Centered & Clean */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-gray-500 hover:text-brand-primary transition-colors flex flex-col group"
                            >
                                {link.name}
                                <span className="h-0.5 w-0 bg-brand-primary group-hover:w-full transition-all duration-300"></span>
                            </a>
                        ))}
                    </div>

                    {/* Premium CTA Button */}
                    <div className="hidden md:block">
                        <Link href="/dashboard">
                            <button className="bg-brand-dark text-white px-7 py-2.5 rounded-lg font-semibold text-sm transition-all hover:bg-gray-900 hover:shadow-lg flex items-center gap-2">
                                Start Learning <ChevronRight className="w-4 h-4" />
                            </button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-gray-600"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 p-4 md:hidden flex flex-col gap-4 shadow-xl animate-fade-in-up">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-gray-600 font-medium py-3 border-b border-gray-50"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {link.name}
                        </a>
                    ))}
                    <Link href="/dashboard" className="block w-full">
                        <button className="bg-brand-primary text-white w-full py-4 rounded-lg font-bold">
                            Join Batch Now
                        </button>
                    </Link>
                </div>
            )}
        </nav>
    );
}
