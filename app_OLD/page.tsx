import HeroSection from '@/components/landing/HeroSection';
import ProblemSection from '@/components/landing/ProblemSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import DashboardPreviewSection from '@/components/landing/DashboardPreviewSection';
import SocialProofSection from '@/components/landing/SocialProofSection';
import PricingSection from '@/components/landing/PricingSection';
import TransparencySection from '@/components/landing/TransparencySection';
import Footer from '@/components/landing/Footer';

export default function Home() {
    return (
        <main className="min-h-screen">
            <HeroSection />
            <ProblemSection />
            <FeaturesSection />
            <HowItWorksSection />
            <DashboardPreviewSection />
            <SocialProofSection />
            <PricingSection />
            <TransparencySection />
            <Footer />
        </main>
    );
}
