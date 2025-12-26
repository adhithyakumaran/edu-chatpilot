'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { saveUserProfile } from '@/services/placementApi';
import { toast } from 'sonner';
import { GraduationCap, Calendar, Award } from 'lucide-react'; // Removed School, BookOpen as they are inside input now if needed, but styling allows we keep them or simplify
import SearchableInput from '@/components/ui/SearchableInput';
import { COLLEGES } from '@/data/colleges';
import { DEGREES, BRANCHES } from '@/data/academic';

export default function OnboardingPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [formData, setFormData] = useState({
        college: '',
        degree: '',
        branch: '',
        year: '',
        cgpa: ''
    });

    // Check if user already onboarded and set initial name
    useEffect(() => {
        if (user?.displayName) {
            setName(user.displayName);
        }

        const checkProfile = async () => {
            if (!user) return;
            try {
                const { getDashboardData } = await import('@/services/placementApi');
                const data = await getDashboardData(user.uid);

                if (data?.profile?.academic?.college) {
                    router.push('/dashboard');
                } else {
                    setLoading(false);
                }
            } catch (e) {
                setLoading(false);
            }
        };
        checkProfile();
    }, [user, router]);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleNativeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!user) {
            toast.error("You must be logged in.");
            setLoading(false);
            return;
        }

        try {
            await saveUserProfile({
                userId: user.uid,
                email: user.email,
                name: name, // Use the editable name
                photoUrl: user.photoURL,
                academic: formData
            });
            toast.success("Profile updated successfully!");
            router.push('/dashboard');
        } catch (error) {
            toast.error("Failed to save profile. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col pt-16 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center mb-4">
                    <GraduationCap className="h-12 w-12 text-brand-primary" />
                </div>
                <h2 className="text-center text-3xl font-extrabold text-gray-900">
                    Academic Details
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Complete your profile to personalize your placement journey.
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>

                        {/* Name Field */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                required
                                className="mt-1 focus:ring-brand-primary focus:border-brand-primary block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                suppressHydrationWarning
                            />
                        </div>

                        {/* College Autocomplete */}
                        <SearchableInput
                            label="College / University"
                            value={formData.college}
                            onChange={(val) => handleInputChange('college', val)}
                            options={COLLEGES}
                            placeholder="Search your college..."
                            required
                        />

                        {/* Degree Autocomplete */}
                        <SearchableInput
                            label="Degree"
                            value={formData.degree}
                            onChange={(val) => handleInputChange('degree', val)}
                            options={DEGREES}
                            placeholder="Select Degree"
                            required
                        />

                        {/* Branch Autocomplete */}
                        <SearchableInput
                            label="Branch / Stream"
                            value={formData.branch}
                            onChange={(val) => handleInputChange('branch', val)}
                            options={BRANCHES}
                            placeholder="Select Branch"
                            required
                        />

                        {/* Year */}
                        <div>
                            <label htmlFor="year" className="block text-sm font-medium text-gray-700">Graduation Year</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Calendar className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="number"
                                    name="year"
                                    required
                                    min="2020"
                                    max="2030"
                                    className="focus:ring-brand-primary focus:border-brand-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-2 border"
                                    placeholder="e.g. 2026"
                                    value={formData.year}
                                    onChange={handleNativeChange}
                                    suppressHydrationWarning
                                />
                            </div>
                        </div>

                        {/* CGPA */}
                        <div>
                            <label htmlFor="cgpa" className="block text-sm font-medium text-gray-700">Current CGPA</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Award className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="number"
                                    name="cgpa"
                                    required
                                    step="0.01"
                                    min="0"
                                    max="10"
                                    className="focus:ring-brand-primary focus:border-brand-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-2 border"
                                    placeholder="e.g. 8.5"
                                    value={formData.cgpa}
                                    onChange={handleNativeChange}
                                    suppressHydrationWarning
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-primary hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                        >
                            {loading ? 'Saving...' : 'Complete Profile'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
