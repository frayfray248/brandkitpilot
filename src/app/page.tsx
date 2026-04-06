import HeroSection from '@/components/landing/HeroSection';
import ProblemSection from '@/components/landing/ProblemSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import AuthoritySection from '@/components/landing/AuthoritySection';
import ValuePropSection from '@/components/landing/ValuePropSection';
import SocialProofSection from '@/components/landing/SocialProofSection';
import PricingSection from '@/components/landing/PricingSection';
import CTASection from '@/components/landing/CTASection';

export default async function Home() {
    return (
        <>
            <HeroSection />
            <ProblemSection />
            <AuthoritySection />
            <HowItWorksSection />
            <ValuePropSection />
            <SocialProofSection />
            <PricingSection />
            <CTASection />
        </>
    );
}