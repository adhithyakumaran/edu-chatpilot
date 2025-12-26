import HeroSection from '@/components/landing/HeroSection';
import ProblemSection from '@/components/landing/ProblemSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import CourseContentSection from '@/components/landing/CourseContentSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import DashboardPreviewSection from '@/components/landing/DashboardPreviewSection';
import Navbar from '@/components/landing/Navbar';

import PricingSection from '@/components/landing/PricingSection';
import TransparencySection from '@/components/landing/TransparencySection';
import Footer from '@/components/landing/Footer';

import HeaderLayout from '@/components/landing/HeaderLayout';

export default function Home() {
    return (
        <main className="min-h-screen">
            <HeaderLayout />
            <HeroSection />
            <ProblemSection />
            <FeaturesSection />
            <CourseContentSection />
            <HowItWorksSection />
            <DashboardPreviewSection />
            <DashboardPreviewSection />
            <PricingSection />
            <TransparencySection />
            <Footer />
        </main>
    );
}
