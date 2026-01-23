
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ShieldCheck, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LawyerConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { caseData, lawyer } = location.state || {};

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Pending Court Schedule';
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleMessageAttorney = () => {
    navigate('/attorney-chat', {
        state: {
            caseData,
            lawyer
        }
    });
  };

  if (!lawyer) {
     return (
        <div className="min-h-screen bg-[#0A1A2F] flex items-center justify-center text-white">
           <div className="text-center">
              <p>No firm selected.</p>
              <Button onClick={() => navigate('/upload-ticket')} className="mt-4">Start Over</Button>
           </div>
        </div>
     );
  }

  return (
    <>
      <Helmet>
        <title>Firm Review Confirmed - Citation Nation</title>
      </Helmet>

      <main className="min-h-screen pt-32 pb-16 bg-[#0A1A2F]">
         <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center mb-12">
               <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-20 h-20 bg-[#C6FF4D] rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(198,255,77,0.4)]"
               >
                  <Check className="w-10 h-10 text-[#0A1A2F] stroke-[3px]" />
               </motion.div>
               <h1 className="text-3xl sm:text-4xl font-black text-white mb-4">
                  Firm <span className="text-[#C6FF4D]">Review Started</span>
               </h1>
               <p className="text-lg text-white/70">
                  Your case has been submitted to our partner firm for review.
               </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8">
               <div className="flex flex-col md:flex-row gap-8 items-center md:items-start border-b border-white/10 pb-8 mb-8">
                  <img src={lawyer.image} alt={lawyer.name} className="w-24 h-24 rounded-full border-4 border-[#007BFF]/20" />
                  <div className="text-center md:text-left">
                     <h2 className="text-2xl font-bold text-white">{lawyer.name}</h2>
                     <p className="text-[#007BFF] font-medium">{lawyer.firm}</p>
                     <div className="mt-2 flex items-center justify-center md:justify-start text-white/60 text-sm gap-2">
                        <ShieldCheck className="w-4 h-4" /> Bar Verified • License Active
                     </div>
                  </div>
               </div>

               <div className="space-y-6">
                  <h3 className="text-white font-bold uppercase tracking-wider text-sm">Next Steps</h3>
                  
                  <div className="flex gap-4">
                     <div className="w-8 h-8 rounded-full bg-[#007BFF]/20 flex items-center justify-center text-[#007BFF] flex-shrink-0">1</div>
                     <div>
                        <h4 className="text-white font-bold">Case Review</h4>
                        <p className="text-white/60 text-sm">Our firm will review your ticket details ({caseData?.violationCode}) within 24 hours.</p>
                     </div>
                  </div>

                  <div className="flex gap-4">
                     <div className="w-8 h-8 rounded-full bg-[#007BFF]/20 flex items-center justify-center text-[#007BFF] flex-shrink-0">2</div>
                     <div>
                        <h4 className="text-white font-bold">Initial Consultation</h4>
                        <p className="text-white/60 text-sm">You will receive a secure message or call from the firm to discuss strategy.</p>
                     </div>
                  </div>

                  <div className="flex gap-4">
                     <div className="w-8 h-8 rounded-full bg-[#007BFF]/20 flex items-center justify-center text-[#007BFF] flex-shrink-0">3</div>
                     <div>
                        <h4 className="text-white font-bold">Recommended Action Plan</h4>
                        <p className="text-white/60 text-sm">We’ll outline the next steps for your court date: <span className="text-[#C6FF4D]">{formatDate(caseData?.courtDate)}</span>.</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="flex justify-center gap-4">
               <Button variant="outline" onClick={() => navigate('/')} className="border-white/20 text-white hover:bg-white/10">
                  Return Home
               </Button>
               <Button 
                    onClick={handleMessageAttorney}
                    className="bg-[#007BFF] text-white hover:bg-[#007BFF]/90"
               >
                  <Mail className="w-4 h-4 mr-2" /> Message Firm
               </Button>
            </div>

         </div>
      </main>
    </>
  );
};

export default LawyerConfirmation;
