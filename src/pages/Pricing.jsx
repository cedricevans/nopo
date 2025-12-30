
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Pricing = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Simple, Transparent Pricing - Citation Nation</title>
        <meta name="description" content="Clear pricing for attorney-backed ticket defense." />
      </Helmet>

      <main className="min-h-screen pt-32 pb-16 relative">
        <div className="absolute top-0 left-0 w-full h-[500px] z-0 overflow-hidden opacity-20 pointer-events-none">
          <img
            className="w-full h-full object-cover"
            alt="Abstract speed lines background"
            src="https://images.unsplash.com/photo-1514806971620-0f088fcd602b"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1A2F]/50 to-[#0A1A2F]"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-lg text-white/70">$49.99 (Varies by jurisdiction)</p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
              <div>
                <div className="text-5xl font-black text-white mb-2">$49.99</div>
                <p className="text-white/60 text-sm">Attorney defense with in-app updates</p>
              </div>
              <Button
                onClick={() => navigate('/attorney')}
                className="bg-[#C6FF4D] text-[#0A1A2F] hover:bg-[#C6FF4D]/90 font-bold py-5 px-10 rounded-full"
              >
                Hire Attorney &amp; Start My Case
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-white/80 text-sm">
              {[
                'Attorney assignment',
                'Court representation',
                'In-app case updates',
                'Final outcome summary',
                'Direct communication with your attorney',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#C6FF4D] mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <p className="text-white/60 text-xs mt-8">
              Court fines are not included. We&apos;ll always notify you before any additional costs.
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Pricing;
