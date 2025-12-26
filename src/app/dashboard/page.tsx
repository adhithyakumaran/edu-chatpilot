'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';
import StatsOverview from '@/components/dashboard/widgets/StatsOverview';
import PlacementTimeline from '@/components/dashboard/widgets/PlacementTimeline';
import ReadinessGraph from '@/components/dashboard/widgets/ReadinessGraph';
import JobReadinessMeter from '@/components/dashboard/widgets/JobReadinessMeter';
import DailyHabits from '@/components/dashboard/widgets/DailyHabits';
import LearningTracks from '@/components/dashboard/widgets/LearningTracks';
import PlacementHub from '@/components/dashboard/widgets/PlacementHub';
import { getDashboardData } from '@/services/placementApi';

export default function DashboardPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            if (!user) return;
            const dashboardData = await getDashboardData(user.uid);

            // Check if onboarding is needed (if dashboardData returns a flag or check academic property)
            // Ideally backend returns this, but for now lets check if academic data is present in the response
            // We need to update backend dashboard route to return profile info first.
            // Assumption: dashboardData.profile.academic exists if onboarded.

            if (dashboardData) {
                setData(dashboardData);
                if (!dashboardData.profile?.academic?.college) {
                    router.push('/onboarding');
                    return; // Stop execution
                }
            } else {
                // Fetch failed (likely user not in DB due to Render wipe)
                // Redirect to onboarding to recreate profile
                router.push('/onboarding');
                return;
            }
            setLoading(false);
        };
        loadData();
    }, [user, router]);

    if (loading || !data?.profile?.academic?.college) {
        return <div className="p-8 text-center text-gray-500">Loading your command center...</div>;
    }

    return (
        <div className="space-y-8 max-w-7xl mx-auto">


            {/* 1. Top Stats */}
            <section>
                <StatsOverview data={data} />
            </section>

            {/* 2. Middle Section: Timeline, Graph, Meter */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Timeline (Left - 4 cols) */}
                <div className="lg:col-span-4">
                    <PlacementTimeline events={data?.timeline} />
                </div>

                {/* Graph (Middle - 5 cols) */}
                <div className="lg:col-span-5">
                    <ReadinessGraph />
                </div>

                {/* Meter (Right - 3 cols) */}
                <div className="lg:col-span-3">
                    <JobReadinessMeter readiness={data?.jobReadiness} />
                </div>
            </section>

            {/* 3. Bottom Section: Habits, Tracks, Hub */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Daily Habits (Left - 4 cols) */}
                <div className="lg:col-span-4">
                    <DailyHabits />
                </div>

                {/* Learning Tracks + Hub (Right - 8 cols) */}
                <div className="lg:col-span-8 space-y-6">
                    <LearningTracks />
                    <PlacementHub />
                </div>
            </section>
        </div>
    );
}
