
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Shield, CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const firm = {
  name: "Citation Nation Legal Network",
  firm: "Partner Law Firm",
  experience: "Florida Traffic Defense",
  specialty: "Speeding, Red-Light, and Suspension",
  image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=200&h=200",
  fee: "$49 flat fee",
  location: "Florida-wide"
};

const LawyerMatching = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { caseData } = location.state || {};
  const preferredCity = caseData?.preferredCity;
  const preferredState = caseData?.preferredState;
  const preferredArea = preferredCity
    ? `${preferredCity}${preferredState ? `, ${preferredState}` : ''}`
    : null;

  const handleHire = () => {
    toast({
      title: "Sending to firm...",
      description: "Submitting your scanned ticket for review.",
      duration: 1500,
    });

    setTimeout(() => {
      navigate('/lawyer-confirmation', { 
        state: { 
          caseData, 
          lawyer: firm
        } 
      });
    }, 1500);
  };

  return (
    <>
      <Helmet>
        <title>Firm Review - Citation Nation</title>
        <meta name="description" content="Send your scanned ticket to our partner firm for review and next steps." />
      </Helmet>

      <main className="min-h-screen pt-32 pb-16 bg-[#0A1A2F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-8">
             {caseData?.planType === 'legal-full' ? (
                <Button 
                    variant="ghost" 
                    onClick={() => navigate('/confirmation', { state: { caseData } })}
                    className="text-white/50 hover:text-white pl-0"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Strategy
                </Button>
             ) : (
                <Button 
                    variant="ghost" 
                    onClick={() => navigate(-1)}
                    className="text-white/50 hover:text-white pl-0"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
             )}
          </div>

          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Connect With Our <span className="text-[#007BFF]">Partner Firm</span>
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto">
              Send your scanned ticket to our firm for a full review and next steps.
              {caseData && (
                <span className="block mt-2 text-[#C6FF4D]">
                  Serving {preferredArea || caseData.city || 'your area'}
                </span>
              )}
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-[#007BFF]/50 transition-all duration-300 flex flex-col"
            >
              <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
                 <img src={firm.image} alt={firm.name} className="w-20 h-20 rounded-full object-cover border-2 border-white/10" />
                 <div className="text-center sm:text-left">
                    <h3 className="font-bold text-white text-2xl">{firm.name}</h3>
                    <p className="text-white/50 text-sm">{firm.firm}</p>
                 </div>
              </div>

              <div className="space-y-3 mb-6">
                 <div className="flex items-center text-sm text-white/70">
                    <MapPin className="w-4 h-4 mr-2 text-[#007BFF]" />
                    {preferredArea || firm.location}
                 </div>
                 <div className="flex items-center text-sm text-white/70">
                    <Shield className="w-4 h-4 mr-2 text-[#007BFF]" />
                    {firm.experience}
                 </div>
                 <div className="flex items-center text-sm text-white/70">
                    <CheckCircle className="w-4 h-4 mr-2 text-[#007BFF]" />
                    Focus: {firm.specialty}
                 </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                 <div className="flex justify-between items-center mb-4">
                    <span className="text-white/50 text-sm">Firm Review</span>
                    <span className="text-white font-bold text-lg">{firm.fee}</span>
                 </div>
                 <Button 
                    onClick={handleHire}
                    className="w-full bg-[#007BFF] hover:bg-[#007BFF]/90 text-white font-bold"
                 >
                    Submit to Our Firm
                 </Button>
              </div>
            </motion.div>
          </div>

        </div>
      </main>
    </>
  );
};

export default LawyerMatching;
