
import React from 'react';
import { Helmet } from 'react-helmet-async';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const HowItWorks = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>How It Works - Citation Nation</title>
        <meta name="description" content="Learn how Citation Nation's AI-powered system analyzes your traffic ticket and generates winning defense strategies." />
      </Helmet>

      <main className="min-h-screen pt-32 pb-16">
        <HowItWorksSection />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-16">
          <div className="bg-gradient-to-r from-[#007BFF]/20 to-[#C6FF4D]/20 border border-white/20 rounded-3xl p-12">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Ready to Fight Your Ticket?
            </h2>
            <p className="text-lg text-white/70 mb-8">
              Upload your ticket now and get your personalized defense strategy
            </p>
            <Button
              onClick={() => navigate('/upload-ticket')}
              className="bg-[#C6FF4D] text-[#0A1A2F] hover:bg-[#C6FF4D]/90 font-bold px-12 py-6 rounded-full text-lg"
            >
              Get Started Now
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default HowItWorks;
