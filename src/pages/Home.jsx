
import React from 'react';
import { Helmet } from 'react-helmet-async';
import HeroSection from '@/components/home/HeroSection';
import UploadDemo from '@/components/home/UploadDemo';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import AiDemoPreview from '@/components/home/AiDemoPreview';
import PricingTiers from '@/components/home/PricingTiers';
import Testimonials from '@/components/home/Testimonials';
import Guarantees from '@/components/home/Guarantees';
import FAQ from '@/components/home/FAQ';
import TrustBadges from '@/components/home/TrustBadges';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Citation Nation - AI-Powered Traffic Ticket Defense | Save Money & Points</title>
        <meta name="description" content="Fight traffic tickets with AI-powered analysis. Get instant defense strategies, reduce fines by up to 80%, and protect your driving record. 95% success rate." />
      </Helmet>

      <main>
        <HeroSection />
        <TrustBadges />
        <UploadDemo />
        <HowItWorksSection />
        <AiDemoPreview />
        <PricingTiers />
        <Guarantees />
        <Testimonials />
        <FAQ />
      </main>
    </>
  );
};

export default Home;
