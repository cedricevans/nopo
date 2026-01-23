
import React from 'react';
import { Helmet } from 'react-helmet-async';
import HeroSection from '@/components/home/HeroSection';
import AiDemoPreview from '@/components/home/AiDemoPreview';
import Guarantees from '@/components/home/Guarantees';
import Testimonials from '@/components/home/Testimonials';
import FAQ from '@/components/home/FAQ';
import TrustBadges from '@/components/home/TrustBadges';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Citation Nation - Traffic Ticket Defense</title>
        <meta
          name="description"
          content="Got a ticket? Scan your citation and we’ll take care of the rest."
        />
      </Helmet>

      <main>
        <HeroSection />
        <TrustBadges />
        <AiDemoPreview />
        <Guarantees />
        <Testimonials />
        <FAQ />
      </main>
    </>
  );
};

export default Home;
