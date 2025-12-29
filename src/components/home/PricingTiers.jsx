
import React from 'react';
import { Check, User, Gavel, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';

const PricingTiers = ({ caseData }) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handlePlanSelection = (planType) => {
    // If we have case data, proceed to confirmation (Simulating Checkout)
    if (caseData) {
      toast({
        title: "Processing Payment...",
        description: "Securely processing your transaction.",
        duration: 1500,
      });

      // Simulate network delay for payment
      setTimeout(() => {
        // Both tracks go to confirmation first to show the AI report
        // The confirmation page will handle the "Next Steps" based on planType
        navigate('/confirmation', { 
            state: { 
                caseData: {
                    ...caseData,
                    planType: planType
                } 
            } 
        });
      }, 1500);
    } else {
      // If no case data, go to upload flow
      navigate('/upload-ticket');
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-transparent relative overflow-hidden" id="pricing">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
            Select Your <span className="text-[#007BFF]">Defense Plan</span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Review your options based on the ticket analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Option 1: AI Strategy (Budget) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-[#007BFF]/20 rounded-xl text-[#007BFF]">
                    <Zap className="w-8 h-8" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-white">AI Strategy</h3>
                    <p className="text-white/50 text-sm">Best for simple violations</p>
                </div>
            </div>

            <div className="mb-6">
                <div className="text-5xl font-black text-white mb-1">$19</div>
                <p className="text-white/50 text-sm">One-time fee</p>
            </div>

            <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-[#007BFF] flex-shrink-0 mt-0.5" />
                    <span className="text-white/80 text-sm">Instant AI Defense Packet</span>
                </li>
                 <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-[#007BFF] flex-shrink-0 mt-0.5" />
                    <span className="text-white/80 text-sm">Basic Attorney Review</span>
                </li>
                <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-[#007BFF] flex-shrink-0 mt-0.5" />
                    <span className="text-white/80 text-sm">Step-by-step Court Guide</span>
                </li>
            </ul>

            <Button
                onClick={() => handlePlanSelection('ai-basic')}
                className="w-full bg-transparent border border-[#007BFF] text-[#007BFF] hover:bg-[#007BFF] hover:text-white font-bold py-6 rounded-full transition-all duration-300"
            >
                Get AI Strategy
            </Button>
          </motion.div>

          {/* Option 2: Full Legal Defense */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative bg-white/5 backdrop-blur-lg border border-[#C6FF4D] rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 shadow-[0_0_30px_rgba(198,255,77,0.1)] flex flex-col"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#C6FF4D] text-[#0A1A2F] px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                  Most Popular
            </div>

            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-[#C6FF4D]/20 rounded-xl text-[#C6FF4D]">
                    <Gavel className="w-8 h-8" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-white">Full Legal Defense</h3>
                    <p className="text-white/50 text-sm">We handle everything</p>
                </div>
            </div>

            <div className="mb-6">
                <div className="text-5xl font-black text-white mb-1">$49</div>
                <p className="text-white/50 text-sm">Starting at</p>
            </div>

            <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-[#C6FF4D] flex-shrink-0 mt-0.5" />
                    <span className="text-white/80 text-sm font-bold text-[#C6FF4D]">We Go To Court For You</span>
                </li>
                <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-[#C6FF4D] flex-shrink-0 mt-0.5" />
                    <span className="text-white/80 text-sm">Comprehensive Case Review</span>
                </li>
                <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-[#C6FF4D] flex-shrink-0 mt-0.5" />
                    <span className="text-white/80 text-sm">Negotiation & Dismissal</span>
                </li>
                 <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-[#C6FF4D] flex-shrink-0 mt-0.5" />
                    <span className="text-white/80 text-sm">Money-back Guarantee</span>
                </li>
            </ul>

            <Button
                onClick={() => handlePlanSelection('legal-full')}
                className="w-full bg-[#C6FF4D] text-[#0A1A2F] hover:bg-[#C6FF4D]/90 font-bold py-6 rounded-full transition-all duration-300"
            >
                Start Legal Defense
            </Button>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default PricingTiers;
