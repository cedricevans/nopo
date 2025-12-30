
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Users, Award, Target, Heart } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Users,
      title: 'Customer First',
      description: 'We put your success and satisfaction at the center of everything we do.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for the highest quality in our AI analysis and customer service.',
    },
    {
      icon: Target,
      title: 'Results Driven',
      description: 'Our focus is on delivering real, measurable outcomes for our clients.',
    },
    {
      icon: Heart,
      title: 'Integrity',
      description: 'We operate with honesty, transparency, and ethical business practices.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>About Us - Citation Nation</title>
        <meta name="description" content="Learn about Citation Nation's mission to help drivers fight unfair traffic tickets using AI-powered analysis." />
      </Helmet>

      <main className="min-h-screen pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6">
              About <span className="text-[#007BFF]">Citation Nation</span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              We're on a mission to level the playing field for drivers facing unfair traffic tickets.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-center">
             <div className="order-2 lg:order-1 bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 sm:p-12">
                <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
                <div className="space-y-4 text-white/80 text-lg">
                <p>
                    Citation Nation was born from a simple frustration: traffic tickets are expensive, time-consuming, and often unfair. Traditional legal help is too costly for most people, leaving millions of drivers to simply pay fines they could have fought.
                </p>
                <p>
                    We leveraged cutting-edge artificial intelligence and machine learning to analyze thousands of successful traffic ticket defenses. The result? An AI system that can identify winning strategies for your specific situation in minutes.
                </p>
                <p>
                    Today, we've helped over 50,000 drivers save money, protect their driving records, and fight back against unfair citations. Our 95% success rate speaks for itself.
                </p>
                </div>
            </div>
            <div className="order-1 lg:order-2 rounded-3xl overflow-hidden border border-white/10 shadow-2xl h-[400px]">
                <img 
                    className="w-full h-full object-cover" 
                    alt="Modern legal team working"
                 src="https://images.unsplash.com/photo-1570126618953-d437176e8c79" />
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-[#007BFF]/20 rounded-2xl flex items-center justify-center mb-4">
                    <value.icon className="h-7 w-7 text-[#007BFF]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                  <p className="text-white/70">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden">
             <div className="absolute inset-0">
                <img 
                    className="w-full h-full object-cover opacity-20" 
                    alt="Court house exterior"
                 src="https://images.unsplash.com/photo-1697367452927-2dff3e25e201" />
                <div className="absolute inset-0 bg-[#007BFF]/20 mix-blend-overlay"></div>
             </div>
            <div className="relative z-10 bg-gradient-to-r from-[#007BFF]/20 to-[#C6FF4D]/20 border border-white/20 p-12 text-center backdrop-blur-sm">
                <h2 className="text-3xl font-bold text-white mb-4">Join Thousands of Satisfied Customers</h2>
                <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
                Experience the power of AI-driven traffic ticket defense and take control of your driving record.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <div className="text-5xl font-black text-[#C6FF4D] mb-2">50K+</div>
                    <div className="text-white/70">Clients Served</div>
                </div>
                <div>
                    <div className="text-5xl font-black text-[#C6FF4D] mb-2">95%</div>
                    <div className="text-white/70">Success Rate</div>
                </div>
                <div>
                    <div className="text-5xl font-black text-[#C6FF4D] mb-2">$8M+</div>
                    <div className="text-white/70">Saved in Fines</div>
                </div>
                </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default About;
