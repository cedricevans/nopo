import React from 'react';
import { Upload, FileSearch, Scale, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * How It Works Section Component
 * Updated to reflect the streamlined scan-to-strategy flow
 */
const HowItWorksSection = () => {
  const steps = [
    {
      icon: Upload,
      title: '1. Upload Ticket',
      description: 'Simply upload a photo of your ticket. We instantly extract the details.',
      color: '#007BFF',
    },
    {
      icon: FileSearch,
      title: '2. Get Analysis',
      description: 'We review your ticket for errors and identify the best defense options.',
      color: '#C6FF4D',
    },
    {
      icon: Scale,
      title: '3. Get Your Strategy',
      description: 'Receive your AI strategy and review the recommended next steps.',
      color: '#007BFF',
    },
    {
      icon: CheckCircle,
      title: '4. Fight & Win',
      description: 'Follow the plan or upgrade to firm review for full support.',
      color: '#C6FF4D',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#0A1A2F] relative overflow-hidden">
       {/* Background decorative element */}
       <div className="absolute top-0 right-0 w-full md:w-1/3 h-full opacity-5 pointer-events-none">
         <img 
          className="w-full h-full object-cover" 
          alt="Abstract neural network connection nodes"
         src="https://images.unsplash.com/photo-1678995635432-d9e89c7a8fc5" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
            How <span className="text-[#007BFF]">Citation Nation</span> Works
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            A simple process to clear your record, whether you do it yourself or hire us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-white/20 to-transparent -z-10"></div>
              )}

              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group h-full">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 relative overflow-hidden"
                  style={{ backgroundColor: step.color + '20' }}
                >
                  <step.icon className="h-8 w-8 relative z-10" style={{ color: step.color }} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-white/70">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Visual reinforcement */}
        <div className="mt-16 rounded-3xl overflow-hidden relative h-64 md:h-80 w-full border border-white/10">
           <img 
            className="w-full h-full object-cover opacity-60 hover:opacity-80 transition-opacity duration-500" 
            alt="Person successfully analyzing document on tablet"
           src="https://images.unsplash.com/photo-1619722087489-f0b1a6fdbc6d" />
           <div className="absolute inset-0 flex items-center justify-center bg-black/40">
             <div className="text-center p-6 backdrop-blur-sm bg-black/30 rounded-2xl border border-white/10">
               <p className="text-xl md:text-2xl font-bold text-white">Join over 50,000 drivers who fought back</p>
             </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
