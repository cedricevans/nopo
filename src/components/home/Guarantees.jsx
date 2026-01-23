import React from 'react';
import { Shield, DollarSign, Clock, Award } from 'lucide-react';

/**
 * Guarantees Component
 * Displays money-back and service guarantees
 */
const Guarantees = () => {
  const guarantees = [
    {
      icon: DollarSign,
      title: 'Money-Back Guarantee',
      description: "If we can't find a valid defense strategy, you get a full refund. No questions asked.",
    },
    {
      icon: Shield,
      title: 'Privacy Protected',
      description: 'Your ticket information is encrypted and never shared. We take your privacy seriously.',
    },
    {
      icon: Clock,
      title: '24-Hour Analysis',
      description: 'Get your complete analysis within 24 hours, or your money back guaranteed.',
    },
    {
      icon: Award,
      title: 'Success Guarantee',
      description: 'Our strategies have a 95% success rate. We stand behind our analysis.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[#0A1A2F] to-[#0A1A2F]/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
            Our <span className="text-[#C6FF4D]">Guarantees</span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            We're committed to your success. Here's what we promise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {guarantees.map((guarantee, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-[#007BFF]/20 rounded-2xl flex items-center justify-center mb-4">
                <guarantee.icon className="h-7 w-7 text-[#007BFF]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{guarantee.title}</h3>
              <p className="text-white/70">{guarantee.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Guarantees;