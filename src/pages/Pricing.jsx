
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import PricingTiers from '@/components/home/PricingTiers';

const Pricing = () => {
  const location = useLocation();
  const { caseData } = location.state || {};

  return (
    <>
      <Helmet>
        <title>Select Defense Plan - Citation Nation</title>
        <meta name="description" content="Choose your defense strategy. Affordable AI-powered plans or full legal representation." />
      </Helmet>

      <main className="min-h-screen pt-24 pb-16 relative">
         <div className="absolute top-0 left-0 w-full h-[500px] z-0 overflow-hidden opacity-20 pointer-events-none">
            <img 
                className="w-full h-full object-cover" 
                alt="Abstract speed lines background"
             src="https://images.unsplash.com/photo-1514806971620-0f088fcd602b" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A1A2F]/50 to-[#0A1A2F]"></div>
         </div>
         
        <div className="relative z-10">
            {caseData && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                 <div className="bg-[#007BFF]/10 border border-[#007BFF]/30 p-4 rounded-xl text-center">
                    <p className="text-white text-sm">
                       <span className="font-bold text-[#007BFF]">Case Loaded:</span> Analysis for {caseData.violationCode} ready. Select a plan to generate your defense.
                    </p>
                 </div>
              </div>
            )}
            <PricingTiers caseData={caseData} />
        </div>
      </main>
    </>
  );
};

export default Pricing;
