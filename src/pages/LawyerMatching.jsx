
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MapPin, Shield, CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const lawyers = [
  {
    id: 1,
    name: "Sarah Jenkins, Esq.",
    firm: "Jenkins Traffic Law",
    rating: 4.9,
    reviews: 124,
    experience: "12 Years",
    specialty: "Speeding & DUI",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200",
    fee: "$119 flat fee",
    location: "Miami-Dade County"
  },
  {
    id: 2,
    name: "Michael Ross",
    firm: "Ross & Associates",
    rating: 4.7,
    reviews: 89,
    experience: "8 Years",
    specialty: "Traffic Violations",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200&h=200",
    fee: "$79 flat fee",
    location: "Broward County"
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    firm: "The Defense Group",
    rating: 5.0,
    reviews: 210,
    experience: "18 Years",
    specialty: "Complex Cases",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200",
    fee: "$159 flat fee",
    location: "Statewide FL"
  }
];

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

  const handleHire = (lawyer) => {
    toast({
      title: "Connecting...",
      description: `Sending your case details to ${lawyer.name}`,
      duration: 1500,
    });

    setTimeout(() => {
      navigate('/lawyer-confirmation', { 
        state: { 
          caseData, 
          lawyer 
        } 
      });
    }, 1500);
  };

  return (
    <>
      <Helmet>
        <title>Select Attorney - Citation Nation</title>
        <meta name="description" content="Choose a top-rated local traffic attorney to handle your case." />
      </Helmet>

      <main className="min-h-screen pt-24 pb-16 bg-[#0A1A2F]">
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
              Match With A <span className="text-[#007BFF]">Top Attorney</span>
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto">
              Skip the AI strategy and work directly with a vetted professional.
              {caseData && (
                <span className="block mt-2 text-[#C6FF4D]">
                  Showing attorneys near {preferredArea || caseData.city || 'your area'}
                </span>
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lawyers.map((lawyer, index) => (
              <motion.div
                key={lawyer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#007BFF]/50 transition-all duration-300 group flex flex-col"
              >
                <div className="flex items-start gap-4 mb-4">
                   <img src={lawyer.image} alt={lawyer.name} className="w-16 h-16 rounded-full object-cover border-2 border-white/10" />
                   <div>
                      <h3 className="font-bold text-white text-lg">{lawyer.name}</h3>
                      <p className="text-white/50 text-sm">{lawyer.firm}</p>
                      <div className="flex items-center mt-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-white text-sm ml-1 font-bold">{lawyer.rating}</span>
                        <span className="text-white/40 text-xs ml-1">({lawyer.reviews} reviews)</span>
                      </div>
                   </div>
                </div>

                <div className="space-y-3 mb-6 flex-grow">
                   <div className="flex items-center text-sm text-white/70">
                      <MapPin className="w-4 h-4 mr-2 text-[#007BFF]" />
                      {preferredArea || lawyer.location}
                   </div>
                   <div className="flex items-center text-sm text-white/70">
                      <Shield className="w-4 h-4 mr-2 text-[#007BFF]" />
                      {lawyer.experience} Experience
                   </div>
                   <div className="flex items-center text-sm text-white/70">
                      <CheckCircle className="w-4 h-4 mr-2 text-[#007BFF]" />
                      Specializes in {lawyer.specialty}
                   </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                   <div className="flex justify-between items-center mb-4">
                      <span className="text-white/50 text-sm">Estimated Fee</span>
                      <span className="text-white font-bold text-lg">{lawyer.fee}</span>
                   </div>
                   <Button 
                      onClick={() => handleHire(lawyer)}
                      className="w-full bg-[#007BFF] hover:bg-[#007BFF]/90 text-white font-bold"
                   >
                      Select Attorney
                   </Button>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </main>
    </>
  );
};

export default LawyerMatching;
