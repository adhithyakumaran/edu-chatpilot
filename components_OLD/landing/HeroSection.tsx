import CountdownTimer from './CountdownTimer';

export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left Content */}
                    <div className="text-white space-y-8 animate-slide-up">

                        {/* Countdown Timer */}
                        <div className="flex justify-start">
                            <CountdownTimer />
                        </div>

                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-sm">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                            <span>Pre-Placement Technical Training • January 2026 Batch</span>
                        </div>

                        {/* Main Headline */}
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
                            Become <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">Interview-Ready</span> in 30 Days
                        </h1>

                        {/* Subheadline */}
                        <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
                            A structured live training program covering <strong>coding, aptitude, resume building</strong> and <strong>interview preparation</strong> — designed for Indian college students and job seekers.
                        </p>

                        {/* Pricing */}
                        <div className="space-y-4">
                            <div className="flex items-baseline gap-4">
                                <span className="text-2xl text-gray-300 line-through">₹2,499</span>
                                <span className="text-5xl font-bold text-white">₹499</span>
                                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">80% OFF</span>
                            </div>
                            <p className="text-sm text-gray-300">One-time fee • No subscriptions • Lifetime access to recordings</p>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="bg-white text-purple-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl">
                                Join January Batch – ₹499 🚀
                            </button>
                            <button className="glass border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all">
                                View Curriculum
                            </button>
                        </div>

                        {/* Trust Indicator */}
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span><strong>No fake placement promises.</strong> Only real skills.</span>
                        </div>
                    </div>

                    {/* Right Visual - Dashboard Preview */}
                    <div className="hidden lg:block animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        <div className="relative">
                            {/* Glass Card Mockup */}
                            <div className="glass-dark rounded-2xl p-8 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                                <div className="space-y-4">
                                    {/* Header */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gradient-primary rounded-full"></div>
                                            <div>
                                                <h3 className="text-white font-bold">Student Dashboard</h3>
                                                <p className="text-gray-400 text-sm">Your Learning Hub</p>
                                            </div>
                                        </div>
                                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Stats */}
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="bg-white/5 rounded-lg p-4">
                                            <div className="text-2xl font-bold text-white">28</div>
                                            <div className="text-xs text-gray-400">Days Active</div>
                                        </div>
                                        <div className="bg-white/5 rounded-lg p-4">
                                            <div className="text-2xl font-bold text-white">67</div>
                                            <div className="text-xs text-gray-400">Tests Done</div>
                                        </div>
                                        <div className="bg-white/5 rounded-lg p-4">
                                            <div className="text-2xl font-bold text-white">92%</div>
                                            <div className="text-xs text-gray-400">Progress</div>
                                        </div>
                                    </div>

                                    {/* Features List */}
                                    <div className="space-y-2">
                                        {['Live Classes & Recordings', 'Mock Interviews', '100 LeetCode Problems', 'Resume Builder', 'Aptitude Tests'].map((item, i) => (
                                            <div key={i} className="flex items-center gap-2 text-white text-sm bg-white/5 rounded-lg p-3">
                                                <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                                <span>{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Floating Badge */}
                            <div className="absolute -top-4 -right-4 bg-yellow-400 text-purple-900 px-4 py-2 rounded-full font-bold text-sm shadow-lg animate-float">
                                ⭐ 4.8/5 Rating
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Wave */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white" />
                </svg>
            </div>
        </section>
    );
}
