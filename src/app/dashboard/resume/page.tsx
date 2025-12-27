'use client';

import { useState } from 'react';
import {
    User, Code, Briefcase, FolderGit2, GraduationCap,
    Award, Search, Eye, Download, Sparkles, CheckCircle2, ChevronRight
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import { toast } from 'sonner';
import { API_URL } from '@/services/placementApi';

// --- Types ---
type SectionTab = 'personal' | 'skills' | 'experience' | 'projects' | 'education' | 'achievements' | 'languages' | 'keywords' | 'preview';

// --- Components ---
const SideNavItem = ({ id, label, icon: Icon, active, onClick }: any) => (
    <button
        onClick={() => onClick(id)}
        className={`flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 rounded-xl font-medium transition-all w-auto md:w-full text-left whitespace-nowrap ${active
            ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/25'
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-transparent hover:border-gray-200'
            }`}
    >
        <Icon className="w-4 h-4 md:w-5 md:h-5 shrink-0" />
        <span className="text-xs md:text-sm">{label}</span>
    </button>
);

export default function PremiumResumeBuilder() {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState<SectionTab>('personal');
    const [isGenerating, setIsGenerating] = useState(false);

    // --- State ---
    const [resumeData, setResumeData] = useState({
        personal: {
            fullName: user?.displayName || '',
            email: user?.email || '',
            phone: '',
            city: '',
            linkedin: '',
            github: '',
            portfolio: ''
        },
        skills: {
            languages: 'Java, Python, TypeScript',
            frameworks: 'React, Next.js, Node.js',
            tools: 'Git, Docker, VS Code',
            databases: 'PostgreSQL, MongoDB'
        },
        experience: [
            { id: '1', role: '', company: '', startDate: '', endDate: '', description: '' }
        ],
        projects: [
            { id: '1', name: 'Edu ChatPilot', stack: 'Next.js, Firebase, AI', description: 'Built an AI-powered coding platform.', github: '', demo: '' }
        ],
        education: [
            { id: '1', college: '', degree: '', branch: '', year: '', cgpa: '' }
        ],
        achievements: [
            { id: '1', title: '', description: '' }
        ],
        languages: [
            { id: '1', name: 'English', proficiency: 'Native/Fluent' }
        ],
        targetRole: 'Full Stack Developer',
        keywords: [] as string[]
    });

    // --- Actions ---
    const calculateAtsScore = () => {
        let score = 40;
        if (resumeData.personal.linkedin) score += 10;
        if (resumeData.skills.languages.length > 5) score += 10;
        if (resumeData.experience[0].description.length > 50) score += 10;
        if (resumeData.projects.length > 1) score += 10;
        if (resumeData.keywords.length > 0) score += 20;
        return Math.min(score, 100);
    };

    return (

        <div className="flex flex-col md:flex-row h-full w-full bg-gray-50/50">
            {/* Left Sidebar Navigation (Horizontal on Mobile, Vertical on Desktop) */}
            <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-gray-200 p-4 md:p-6 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-y-auto shrink-0 no-scrollbar">
                <div className="mb-0 md:mb-4 shrink-0 flex items-center md:block gap-2 px-2 md:px-0">
                    <h2 className="text-lg font-bold text-gray-900 mb-0 md:mb-1 whitespace-nowrap">Resume Builder</h2>
                    <p className="text-xs text-gray-500 hidden md:block">Build your ATS-ready resume</p>
                </div>

                <div className="flex flex-row md:flex-col gap-2 pr-4 md:pr-0">
                    <SideNavItem id="personal" label="Personal" icon={User} active={activeTab === 'personal'} onClick={setActiveTab} />
                    <SideNavItem id="skills" label="Skills" icon={Code} active={activeTab === 'skills'} onClick={setActiveTab} />
                    <SideNavItem id="experience" label="Experience" icon={Briefcase} active={activeTab === 'experience'} onClick={setActiveTab} />
                    <SideNavItem id="projects" label="Projects" icon={FolderGit2} active={activeTab === 'projects'} onClick={setActiveTab} />
                    <SideNavItem id="education" label="Education" icon={GraduationCap} active={activeTab === 'education'} onClick={setActiveTab} />
                    <SideNavItem id="achievements" label="Awards" icon={Award} active={activeTab === 'achievements'} onClick={setActiveTab} />
                    <SideNavItem id="languages" label="Language" icon={User} active={activeTab === 'languages'} onClick={setActiveTab} />
                </div>

                <div className="w-px h-8 md:w-full md:h-px bg-gray-200 mx-2 md:my-2 shrink-0"></div>

                <div className="flex flex-row md:flex-col gap-2">
                    <SideNavItem id="keywords" label="ATS" icon={Search} active={activeTab === 'keywords'} onClick={setActiveTab} />
                    <SideNavItem id="preview" label="Preview" icon={Eye} active={activeTab === 'preview'} onClick={setActiveTab} />
                </div>

                {/* ATS Score Badge */}
                <div className="hidden md:block mt-auto pt-4 border-t border-gray-200">
                    <div className="bg-green-50 text-green-700 px-4 py-3 rounded-xl font-bold text-sm flex items-center gap-2 border border-green-200">
                        <CheckCircle2 className="w-5 h-5" />
                        <div>
                            <div className="text-xs text-green-600">ATS Score</div>
                            <div className="text-lg">{calculateAtsScore()}%</div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto p-8">

                {/* 1. PERSONAL */}
                {activeTab === 'personal' && (
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4 max-w-4xl">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <User className="w-6 h-6 text-brand-primary" /> Personal Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-600">Full Name</label>
                                <input value={resumeData.personal.fullName} onChange={e => setResumeData({ ...resumeData, personal: { ...resumeData.personal, fullName: e.target.value } })} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-600">Email Address</label>
                                <input value={resumeData.personal.email} onChange={e => setResumeData({ ...resumeData, personal: { ...resumeData.personal, email: e.target.value } })} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-600">Phone Number</label>
                                <input value={resumeData.personal.phone} onChange={e => setResumeData({ ...resumeData, personal: { ...resumeData.personal, phone: e.target.value } })} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none transition-all" placeholder="+91 98765 43210" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-600">City / Location</label>
                                <input value={resumeData.personal.city} onChange={e => setResumeData({ ...resumeData, personal: { ...resumeData.personal, city: e.target.value } })} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none transition-all" placeholder="Bangalore, India" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-600">LinkedIn URL</label>
                                <input value={resumeData.personal.linkedin} onChange={e => setResumeData({ ...resumeData, personal: { ...resumeData.personal, linkedin: e.target.value } })} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-600">GitHub URL</label>
                                <input value={resumeData.personal.github} onChange={e => setResumeData({ ...resumeData, personal: { ...resumeData.personal, github: e.target.value } })} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none transition-all" />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-semibold text-gray-600">Portfolio / Website</label>
                                <input value={resumeData.personal.portfolio} onChange={e => setResumeData({ ...resumeData, personal: { ...resumeData.personal, portfolio: e.target.value } })} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none transition-all" />
                            </div>
                        </div>

                        <div className="flex justify-end mt-8">
                            <button onClick={() => setActiveTab('skills')} className="bg-brand-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-secondary transition-all flex items-center gap-2">
                                Next: Skills <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}

                {/* 2. SKILLS */}
                {activeTab === 'skills' && (
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4 space-y-6 max-w-4xl">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <Code className="w-6 h-6 text-brand-primary" /> Technical Skills
                        </h2>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-blue-500"></div> Programming Languages
                            </label>
                            <input
                                value={resumeData.skills.languages}
                                onChange={e => setResumeData({ ...resumeData, skills: { ...resumeData.skills, languages: e.target.value } })}
                                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none transition-all"
                                placeholder="e.g. Java, Python, C++..."
                            />
                            <p className="text-xs text-gray-400 pl-1">Separate keywords with commas for optimal parsing</p>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-purple-500"></div> Frameworks & Libraries
                            </label>
                            <input
                                value={resumeData.skills.frameworks}
                                onChange={e => setResumeData({ ...resumeData, skills: { ...resumeData.skills, frameworks: e.target.value } })}
                                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none transition-all"
                                placeholder="e.g. React, Spring Boot, Django..."
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-orange-500"></div> Developer Tools
                            </label>
                            <input
                                value={resumeData.skills.tools}
                                onChange={e => setResumeData({ ...resumeData, skills: { ...resumeData.skills, tools: e.target.value } })}
                                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none transition-all"
                                placeholder="e.g. Git, Docker, Kubernetes, AWS..."
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500"></div> Databases
                            </label>
                            <input
                                value={resumeData.skills.databases}
                                onChange={e => setResumeData({ ...resumeData, skills: { ...resumeData.skills, databases: e.target.value } })}
                                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none transition-all"
                                placeholder="e.g. PostgreSQL, MongoDB, MySQL..."
                            />
                        </div>

                        <div className="flex justify-end mt-8">
                            <button onClick={() => setActiveTab('keywords')} className="bg-brand-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-secondary transition-all flex items-center gap-2">
                                Next: ATS Keywords <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}

                {/* 3. KEYWORDS */}
                {activeTab === 'keywords' && (
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4 space-y-8 max-w-4xl">
                        <div className="text-center space-y-2 mb-8 border-b border-gray-100 pb-8">
                            <h2 className="text-3xl font-bold text-gray-900">ATS Keyword Optimizer 🚀</h2>
                            <p className="text-gray-500 text-lg">Select your target role. We'll tell you exactly what keywords recruiters are searching for.</p>
                        </div>

                        <div className="max-w-xl mx-auto space-y-4">
                            <label className="text-sm font-bold text-gray-700">Target Role</label>
                            <div className="flex gap-2">
                                <input
                                    value={resumeData.targetRole}
                                    onChange={e => setResumeData({ ...resumeData, targetRole: e.target.value })}
                                    className="flex-1 p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none font-medium text-lg"
                                />
                                <button
                                    onClick={async () => {
                                        setIsGenerating(true);
                                        try {
                                            const { data } = await axios.post(`${API_URL}/ai/generate`, {
                                                prompt: resumeData.targetRole,
                                                type: 'keyword_suggest'
                                            });
                                            if (data.content) {
                                                const newKeywords = data.content.split(',').map((k: string) => k.trim());
                                                setResumeData(prev => ({ ...prev, keywords: newKeywords }));
                                                toast.success("Keywords generated!");
                                            }
                                        } catch (e) { toast.error("Optimization failed"); }
                                        setIsGenerating(false);
                                    }}
                                    disabled={isGenerating}
                                    className="bg-brand-primary text-white px-8 rounded-xl font-bold hover:bg-brand-secondary transition-colors disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-brand-primary/25"
                                >
                                    {isGenerating ? <Sparkles className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                                    Optimize
                                </button>
                            </div>
                        </div>

                        {resumeData.keywords.length > 0 && (
                            <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl animate-in fade-in zoom-in-95">
                                <h3 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                                    <CheckCircle2 className="w-5 h-5" /> Recommended Keywords for "{resumeData.targetRole}"
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {resumeData.keywords.map((k, i) => (
                                        <button
                                            key={i}
                                            onClick={() => {
                                                setResumeData(prev => ({ ...prev, skills: { ...prev.skills, languages: prev.skills.languages + ', ' + k } }));
                                                toast.success(`Added ${k} to skills`);
                                            }}
                                            className="px-4 py-2 bg-white text-blue-700 rounded-full text-sm font-medium border border-blue-100 shadow-sm flex items-center gap-2 hover:bg-blue-100 transition-colors"
                                        >
                                            {k} <span className="text-blue-300 font-light">| +</span>
                                        </button>
                                    ))}
                                </div>
                                <p className="text-xs text-blue-600 mt-4 text-center">Click any keyword to instantly add it to your Resume Skills.</p>
                            </div>
                        )}
                    </div>
                )}

                {/* PREVIEW */}
                {activeTab === 'preview' && (
                    <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4">
                        <div className="mb-8 flex gap-4 print:hidden">
                            <button onClick={() => window.print()} className="bg-brand-primary text-white px-8 py-3 rounded-full font-bold shadow-xl shadow-brand-primary/30 hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center gap-3">
                                <Download className="w-5 h-5" /> Download PDF
                            </button>
                        </div>

                        <div className="w-full overflow-x-auto pb-8 px-4 md:px-0">
                            <div id="resume-preview" className="bg-white min-w-[210mm] w-[210mm] min-h-[297mm] shadow-2xl p-[20mm] text-gray-900 font-serif relative mx-auto">
                                {/* Header */}
                                <header className="text-center border-b-2 border-gray-900 pb-4 mb-4">
                                    <h1 className="text-3xl font-bold uppercase tracking-wide mb-2">{resumeData.personal.fullName || 'YOUR NAME'}</h1>
                                    <div className="flex flex-wrap justify-center gap-3 text-sm">
                                        {resumeData.personal.phone && <span>Phone: {resumeData.personal.phone}</span>}
                                        {resumeData.personal.email && <span>• Email: {resumeData.personal.email}</span>}
                                        {resumeData.personal.city && <span>• {resumeData.personal.city}</span>}
                                        {resumeData.personal.linkedin && <span>• LinkedIn: {resumeData.personal.linkedin}</span>}
                                        {resumeData.personal.github && <span>• GitHub: {resumeData.personal.github}</span>}
                                        {resumeData.personal.portfolio && <span>• Portfolio: {resumeData.personal.portfolio}</span>}
                                    </div>
                                </header>

                                {/* Education */}
                                {resumeData.education.some(e => e.college || e.degree) && (
                                    <div className="mb-6">
                                        <h2 className="text-base font-bold uppercase border-b border-gray-300 mb-3 tracking-wider">Education</h2>
                                        {resumeData.education.filter(e => e.college || e.degree).map(edu => (
                                            <div key={edu.id} className="mb-3">
                                                <div className="flex justify-between font-bold text-sm">
                                                    <span>{edu.college}</span>
                                                    {edu.year && <span className="font-normal">{edu.year}</span>}
                                                </div>
                                                <div className="text-sm">
                                                    {edu.degree} {edu.branch && `in ${edu.branch}`}
                                                    {edu.cgpa && <span className="ml-2">| CGPA: {edu.cgpa}</span>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Technical Skills */}
                                {(resumeData.skills.languages || resumeData.skills.frameworks || resumeData.skills.tools || resumeData.skills.databases) && (
                                    <div className="mb-6">
                                        <h2 className="text-base font-bold uppercase border-b border-gray-300 mb-3 tracking-wider">Technical Skills</h2>
                                        <div className="text-sm space-y-1.5">
                                            {resumeData.skills.languages && <div className="flex"><span className="font-bold w-40 shrink-0">Languages:</span> <span>{resumeData.skills.languages}</span></div>}
                                            {resumeData.skills.frameworks && <div className="flex"><span className="font-bold w-40 shrink-0">Frameworks:</span> <span>{resumeData.skills.frameworks}</span></div>}
                                            {resumeData.skills.tools && <div className="flex"><span className="font-bold w-40 shrink-0">Tools:</span> <span>{resumeData.skills.tools}</span></div>}
                                            {resumeData.skills.databases && <div className="flex"><span className="font-bold w-40 shrink-0">Databases:</span> <span>{resumeData.skills.databases}</span></div>}
                                        </div>
                                    </div>
                                )}

                                {/* Work Experience */}
                                {resumeData.experience.some(e => e.company || e.role) && (
                                    <div className="mb-6">
                                        <h2 className="text-base font-bold uppercase border-b border-gray-300 mb-3 tracking-wider">Work Experience</h2>
                                        {resumeData.experience.filter(e => e.company || e.role).map(exp => (
                                            <div key={exp.id} className="mb-4">
                                                <div className="flex justify-between font-bold text-sm">
                                                    <span>{exp.role || 'Position'}</span>
                                                    {(exp.startDate || exp.endDate) && (
                                                        <span className="font-normal">
                                                            {exp.startDate && new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                                            {exp.startDate && exp.endDate && ' - '}
                                                            {exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : exp.startDate ? 'Present' : ''}
                                                        </span>
                                                    )}
                                                </div>
                                                {exp.company && <div className="text-sm italic mb-1 text-gray-700">{exp.company}</div>}
                                                {exp.description && (
                                                    <div className="text-sm leading-relaxed whitespace-pre-line">{exp.description}</div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Projects */}
                                {resumeData.projects.some(p => p.name) && (
                                    <div className="mb-6">
                                        <h2 className="text-base font-bold uppercase border-b border-gray-300 mb-3 tracking-wider">Projects</h2>
                                        {resumeData.projects.filter(p => p.name).map(proj => (
                                            <div key={proj.id} className="mb-4">
                                                <div className="flex justify-between font-bold text-sm">
                                                    <span>{proj.name}</span>
                                                    {proj.github && <span className="font-normal text-xs">GitHub</span>}
                                                </div>
                                                {proj.stack && <div className="text-sm italic mb-1 text-gray-700">Tech Stack: {proj.stack}</div>}
                                                {proj.description && <p className="text-sm leading-relaxed">{proj.description}</p>}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Achievements & Certifications */}
                                {resumeData.achievements.some(a => a.title) && (
                                    <div className="mb-6">
                                        <h2 className="text-base font-bold uppercase border-b border-gray-300 mb-3 tracking-wider">Achievements & Certifications</h2>
                                        {resumeData.achievements.filter(a => a.title).map(ach => (
                                            <div key={ach.id} className="mb-2">
                                                <div className="font-bold text-sm">{ach.title}</div>
                                                {ach.description && <p className="text-sm text-gray-700">{ach.description}</p>}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Languages Known */}
                                {resumeData.languages.some(l => l.name) && (
                                    <div className="mb-6">
                                        <h2 className="text-base font-bold uppercase border-b border-gray-300 mb-3 tracking-wider">Languages</h2>
                                        <div className="text-sm">
                                            {resumeData.languages.filter(l => l.name).map((lang, idx) => (
                                                <span key={lang.id}>
                                                    {lang.name} ({lang.proficiency})
                                                    {idx < resumeData.languages.filter(l => l.name).length - 1 && ', '}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Placeholders */}
                {activeTab === 'experience' && (
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4 max-w-4xl space-y-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <Briefcase className="w-6 h-6 text-brand-primary" /> Work Experience
                        </h2>

                        {resumeData.experience.map((exp, idx) => (
                            <div key={exp.id} className="p-6 bg-gray-50 rounded-xl space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-600">Company</label>
                                        <input value={exp.company} onChange={e => {
                                            const newExp = [...resumeData.experience];
                                            newExp[idx].company = e.target.value;
                                            setResumeData({ ...resumeData, experience: newExp });
                                        }} className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none" placeholder="e.g. Google" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-600">Role</label>
                                        <input value={exp.role} onChange={e => {
                                            const newExp = [...resumeData.experience];
                                            newExp[idx].role = e.target.value;
                                            setResumeData({ ...resumeData, experience: newExp });
                                        }} className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none" placeholder="e.g. Software Engineer" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-600">Start Date</label>
                                        <input type="month" value={exp.startDate} onChange={e => {
                                            const newExp = [...resumeData.experience];
                                            newExp[idx].startDate = e.target.value;
                                            setResumeData({ ...resumeData, experience: newExp });
                                        }} className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-600">End Date</label>
                                        <input type="month" value={exp.endDate} onChange={e => {
                                            const newExp = [...resumeData.experience];
                                            newExp[idx].endDate = e.target.value;
                                            setResumeData({ ...resumeData, experience: newExp });
                                        }} className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none" placeholder="Leave blank if current" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-600">Description / Achievements</label>
                                    <textarea value={exp.description} onChange={e => {
                                        const newExp = [...resumeData.experience];
                                        newExp[idx].description = e.target.value;
                                        setResumeData({ ...resumeData, experience: newExp });
                                    }} rows={4} className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none" placeholder="• Developed scalable systems...&#10;• Led a team of 5 engineers..."></textarea>
                                </div>
                            </div>
                        ))}

                        <button onClick={() => setResumeData({ ...resumeData, experience: [...resumeData.experience, { id: Date.now().toString(), role: '', company: '', startDate: '', endDate: '', description: '' }] })} className="text-brand-primary font-medium hover:underline">+ Add Another Position</button>
                    </div>
                )}

                {activeTab === 'projects' && (
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4 max-w-4xl space-y-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <FolderGit2 className="w-6 h-6 text-brand-primary" /> Projects
                        </h2>

                        {resumeData.projects.map((proj, idx) => (
                            <div key={proj.id} className="p-6 bg-gray-50 rounded-xl space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-600">Project Name</label>
                                        <input value={proj.name} onChange={e => {
                                            const newProj = [...resumeData.projects];
                                            newProj[idx].name = e.target.value;
                                            setResumeData({ ...resumeData, projects: newProj });
                                        }} className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none" placeholder="e.g. E-commerce Platform" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-600">Tech Stack</label>
                                        <input value={proj.stack} onChange={e => {
                                            const newProj = [...resumeData.projects];
                                            newProj[idx].stack = e.target.value;
                                            setResumeData({ ...resumeData, projects: newProj });
                                        }} className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none" placeholder="e.g. React, Node.js, MongoDB" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-600">GitHub URL</label>
                                        <input value={proj.github} onChange={e => {
                                            const newProj = [...resumeData.projects];
                                            newProj[idx].github = e.target.value;
                                            setResumeData({ ...resumeData, projects: newProj });
                                        }} className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none" placeholder="github.com/..." />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-600">Live Demo</label>
                                        <input value={proj.demo} onChange={e => {
                                            const newProj = [...resumeData.projects];
                                            newProj[idx].demo = e.target.value;
                                            setResumeData({ ...resumeData, projects: newProj });
                                        }} className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none" placeholder="https://..." />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-600">Description</label>
                                    <textarea value={proj.description} onChange={e => {
                                        const newProj = [...resumeData.projects];
                                        newProj[idx].description = e.target.value;
                                        setResumeData({ ...resumeData, projects: newProj });
                                    }} rows={3} className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none" placeholder="Brief description of what the project does..."></textarea>
                                </div>
                            </div>
                        ))}

                        <button onClick={() => setResumeData({ ...resumeData, projects: [...resumeData.projects, { id: Date.now().toString(), name: '', stack: '', description: '', github: '', demo: '' }] })} className="text-brand-primary font-medium hover:underline">+ Add Another Project</button>
                    </div>
                )}

                {activeTab === 'education' && (
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4 max-w-4xl space-y-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <GraduationCap className="w-6 h-6 text-brand-primary" /> Education
                        </h2>

                        {resumeData.education.map((edu, idx) => (
                            <div key={edu.id} className="p-6 bg-gray-50 rounded-xl space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-600">College / University</label>
                                        <input value={edu.college} onChange={e => {
                                            const newEdu = [...resumeData.education];
                                            newEdu[idx].college = e.target.value;
                                            setResumeData({ ...resumeData, education: newEdu });
                                        }} className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none" placeholder="e.g. IIT Bombay" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-600">Degree</label>
                                        <input value={edu.degree} onChange={e => {
                                            const newEdu = [...resumeData.education];
                                            newEdu[idx].degree = e.target.value;
                                            setResumeData({ ...resumeData, education: newEdu });
                                        }} className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none" placeholder="e.g. B.Tech" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-600">Branch / Major</label>
                                        <input value={edu.branch} onChange={e => {
                                            const newEdu = [...resumeData.education];
                                            newEdu[idx].branch = e.target.value;
                                            setResumeData({ ...resumeData, education: newEdu });
                                        }} className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none" placeholder="e.g. Computer Science" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-600">Graduation Year</label>
                                        <input value={edu.year} onChange={e => {
                                            const newEdu = [...resumeData.education];
                                            newEdu[idx].year = e.target.value;
                                            setResumeData({ ...resumeData, education: newEdu });
                                        }} className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none" placeholder="e.g. 2024" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-600">CGPA / Percentage</label>
                                        <input value={edu.cgpa} onChange={e => {
                                            const newEdu = [...resumeData.education];
                                            newEdu[idx].cgpa = e.target.value;
                                            setResumeData({ ...resumeData, education: newEdu });
                                        }} className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none" placeholder="e.g. 8.5" />
                                    </div>
                                </div>
                            </div>
                        ))}

                        <button onClick={() => setResumeData({ ...resumeData, education: [...resumeData.education, { id: Date.now().toString(), college: '', degree: '', branch: '', year: '', cgpa: '' }] })} className="text-brand-primary font-medium hover:underline">+ Add Another Education</button>
                    </div>
                )}

                {activeTab === 'achievements' && (
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4 max-w-4xl space-y-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <Award className="w-6 h-6 text-brand-primary" /> Achievements & Certifications
                        </h2>

                        {resumeData.achievements.map((ach, idx) => (
                            <div key={ach.id} className="p-6 bg-gray-50 rounded-xl space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-600">Title</label>
                                    <input value={ach.title} onChange={e => {
                                        const newAch = [...resumeData.achievements];
                                        newAch[idx].title = e.target.value;
                                        setResumeData({ ...resumeData, achievements: newAch });
                                    }} className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none" placeholder="e.g. AWS Certified Solutions Architect" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-600">Description</label>
                                    <textarea value={ach.description} onChange={e => {
                                        const newAch = [...resumeData.achievements];
                                        newAch[idx].description = e.target.value;
                                        setResumeData({ ...resumeData, achievements: newAch });
                                    }} rows={2} className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none" placeholder="Brief details about the achievement or certification"></textarea>
                                </div>
                            </div>
                        ))}

                        <button onClick={() => setResumeData({ ...resumeData, achievements: [...resumeData.achievements, { id: Date.now().toString(), title: '', description: '' }] })} className="text-brand-primary font-medium hover:underline">+ Add Another Achievement</button>
                    </div>
                )}

                {activeTab === 'languages' && (
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4 max-w-4xl space-y-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <User className="w-6 h-6 text-brand-primary" /> Languages Known
                        </h2>

                        {resumeData.languages.map((lang, idx) => (
                            <div key={lang.id} className="p-6 bg-gray-50 rounded-xl space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-600">Language</label>
                                        <input value={lang.name} onChange={e => {
                                            const newLang = [...resumeData.languages];
                                            newLang[idx].name = e.target.value;
                                            setResumeData({ ...resumeData, languages: newLang });
                                        }} className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none" placeholder="e.g. English, Hindi, Tamil" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-600">Proficiency</label>
                                        <select value={lang.proficiency} onChange={e => {
                                            const newLang = [...resumeData.languages];
                                            newLang[idx].proficiency = e.target.value;
                                            setResumeData({ ...resumeData, languages: newLang });
                                        }} className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none">
                                            <option>Native/Fluent</option>
                                            <option>Professional Working Proficiency</option>
                                            <option>Limited Working Proficiency</option>
                                            <option>Elementary Proficiency</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <button onClick={() => setResumeData({ ...resumeData, languages: [...resumeData.languages, { id: Date.now().toString(), name: '', proficiency: 'Professional Working Proficiency' }] })} className="text-brand-primary font-medium hover:underline">+ Add Another Language</button>
                    </div>
                )}
            </main>

            <style jsx global>{`
                @media print {
                    body * { visibility: hidden; }
                    #resume-preview, #resume-preview * { visibility: visible; }
                    #resume-preview { position: absolute; left: 0; top: 0; width: 100%; margin: 0; padding: 10mm; box-shadow: none; print-color-adjust: exact; }
                    @page { size: auto; margin: 0mm; }
                }
            `}</style>
        </div>
    );
}
