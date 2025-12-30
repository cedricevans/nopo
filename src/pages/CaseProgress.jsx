import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const CaseProgress = () => {
  const [showUpdate, setShowUpdate] = useState(false);
  const [progressWidth, setProgressWidth] = useState('100%');
  const steps = [
    'Ticket uploaded',
    'Attorney assigned',
    'Motion filed',
    'Case closed',
  ];

  useEffect(() => {
    const stored = sessionStorage.getItem('caseProgressSeen');
    const expiry = sessionStorage.getItem('caseProgressSeenExpiry');
    const now = Date.now();
    const isExpired = !expiry || Number(expiry) <= now;

    if (stored && !isExpired) {
      setShowUpdate(false);
      setProgressWidth('100%');
      return;
    }
    setShowUpdate(true);
    setProgressWidth('33%');
    const timer = setTimeout(() => setShowUpdate(false), 2000);
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => setProgressWidth('100%'));
    });
    sessionStorage.setItem('caseProgressSeen', 'true');
    sessionStorage.setItem('caseProgressSeenExpiry', String(now + 2 * 60 * 1000));
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Case Progress - Citation Nation</title>
        <meta name="description" content="Track your case progress from upload to resolution." />
      </Helmet>

      <main className="min-h-screen pt-32 pb-16 relative">
        <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10 pointer-events-none"></div>
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0A1A2F] via-[#0A1A2F]/95 to-[#0A1A2F]"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
              Case Progress
            </h1>
            <p className="text-lg text-white/70">Shows how far you are from case completion.</p>
          </div>

          {showUpdate && (
            <div className="mb-8 bg-[#007BFF]/10 border border-[#007BFF]/40 rounded-2xl p-4 text-center text-white/80 text-sm shadow-[0_0_24px_rgba(0,123,255,0.35)] animate-pulse">
              Update in progress — we’ll refresh your case status shortly.
            </div>
          )}

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl">
            <div className="mb-8">
              <div className="flex justify-between text-xs text-white/60 mb-2">
                <span>Upload</span>
                <span>Complete</span>
              </div>
              <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-[#C6FF4D] rounded-full transition-[width] duration-[6000ms] ease-in-out"
                  style={{ width: progressWidth }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {steps.map((step) => (
                <div key={step} className="flex items-center gap-3 text-white/80">
                  <CheckCircle2 className="w-5 h-5 text-[#C6FF4D]" />
                  <span className="text-sm">{step}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/outcome"
              className="bg-[#C6FF4D] text-[#0A1A2F] hover:bg-[#C6FF4D]/90 font-bold py-4 px-8 rounded-full transition-colors"
            >
              View Case Summary
            </Link>
            <Link
              to="/dashboard"
              className="bg-white/10 text-white hover:bg-white/20 font-bold py-4 px-8 rounded-full transition-colors"
            >
              Go to Case Dashboard
            </Link>
            <Link
              to="/dashboard"
              className="bg-[#007BFF] text-white hover:bg-[#007BFF]/90 font-bold py-4 px-8 rounded-full transition-colors"
            >
              Resume Case
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default CaseProgress;
