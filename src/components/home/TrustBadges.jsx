import React from 'react';
import { ShieldCheck, MessageCircle, Gavel, Award, CheckCircle2 } from 'lucide-react';

/**
 * Trust Badges Component
 * Displays credibility indicators and trust signals
 */
const TrustBadges = () => {
  const badges = [
    { icon: ShieldCheck, text: 'Real, Licensed, Experienced Attorneys' },
    { icon: MessageCircle, text: 'Clear Communication. No Surprises.' },
    { icon: Gavel, text: 'No Court Appearances (Most Cases)' },
    { icon: Award, text: 'Winning Traffic Cases Since 2017' },
    { icon: CheckCircle2, text: 'Over 100,000 Tickets Successfully Defended' },
  ];

  return (
    <section className="bg-[#0A1A2F] py-12 border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-4 group hover:scale-105 transition-transform duration-300"
            >
              <badge.icon className="h-8 w-8 text-[#007BFF] mb-2 group-hover:text-[#C6FF4D] transition-colors" />
              <span className="text-sm font-semibold text-white/70 text-center">
                {badge.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
