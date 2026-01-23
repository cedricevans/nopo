import React from 'react';
import { Helmet } from 'react-helmet-async';
import { AlertCircle, Calendar, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <>
      <Helmet>
        <title>Case Dashboard - Citation Nation</title>
        <meta name="description" content="Your case dashboard with next steps, court date, and risk level." />
      </Helmet>

      <main className="min-h-screen pt-32 pb-16 relative">
        <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10 pointer-events-none"></div>
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0A1A2F] via-[#0A1A2F]/95 to-[#0A1A2F]"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
              Case Dashboard
            </h1>
            <p className="text-lg text-white/70">
              No action needed. We&apos;ll notify you if anything is required.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-4 text-[#C6FF4D]">
                <AlertCircle className="w-5 h-5" />
                <span className="text-sm font-semibold">Next Action</span>
              </div>
              <p className="text-white/80 text-sm">
                No action needed. We&apos;ll notify you if anything is required.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-4 text-[#007BFF]">
                <Calendar className="w-5 h-5" />
                <span className="text-sm font-semibold">Court Date</span>
              </div>
              <p className="text-white/80 text-sm">Handled by your attorney.</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-4 text-white/80">
                <Shield className="w-5 h-5" />
                <span className="text-sm font-semibold">Risk Level</span>
              </div>
              <div className="text-white/70 text-sm space-y-2">
                <div>
                  <span className="text-white/80 font-semibold">Low:</span> Minimal impact expected.
                </div>
                <div>
                  <span className="text-white/80 font-semibold">Medium:</span> Some reduction likely.
                </div>
                <div>
                  <span className="text-white/80 font-semibold">High:</span> Active defense in progress.
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/case-progress"
              className="bg-[#007BFF] text-white hover:bg-[#007BFF]/90 font-bold py-4 px-8 rounded-full transition-colors"
            >
              View Case Progress
            </Link>
            <Link
              to="/outcome"
              className="bg-white/10 text-white hover:bg-white/20 font-bold py-4 px-8 rounded-full transition-colors"
            >
              View Case Summary
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
