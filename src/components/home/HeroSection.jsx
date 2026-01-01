import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Upload, CheckCircle2, Gavel } from 'lucide-react';
import { motion } from 'framer-motion';
import VoiceWidget from '@/components/VoiceWidget';

/**
 * Hero Section Component
 * Updated hero image and standardized button sizing
 */
const HeroSection = () => {
  const navigate = useNavigate();
  return <section className="relative min-h-screen flex items-center overflow-hidden pt-20 lg:pt-16 pb-12 lg:pb-16 bg-[#0A1A2F]">
      {/* Background radial gradient effect */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#007BFF]/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#C6FF4D]/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          
          {/* Left Column: Content - ORDER 1 on Mobile (First) */}
          <div className="text-center lg:text-left order-1 lg:order-1 pt-0">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6
          }}>
              <div className="inline-flex items-center px-4 py-2 rounded-full border border-[#C6FF4D]/30 text-[#C6FF4D] text-xs sm:text-sm font-bold mb-6 bg-[#C6FF4D]/5">
                <Gavel className="w-4 h-4 mr-2" />
                #1 Traffic Ticket Defense Service
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6 tracking-tight">
                Got a Ticket?
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#007BFF] to-[#C6FF4D]">
                  We&apos;ve Got You.
                </span>
              </h1>
            </motion.div>

            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.1
          }} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-6 text-[#C6FF4D] text-sm font-semibold">
                <div className="flex items-center gap-2">
                   <CheckCircle2 className="w-4 h-4" />
                   <span>Clean, confident, friendly</span>
                </div>
                <div className="hidden sm:block text-white/20">•</div>
                <div className="flex items-center gap-2">
                   <CheckCircle2 className="w-4 h-4" />
                   <span>Clear next steps in minutes</span>
                </div>
            </motion.div>

            <motion.p initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.2
          }} className="text-lg sm:text-xl text-white/70 mb-4 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">Scan your citation, we&apos;ll take care of the rest.</motion.p>

            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.3
          }} className="flex items-center justify-center lg:justify-start mb-6">
              <p className="text-white/70 text-sm sm:text-base font-semibold tracking-wide">
                <span className="uppercase text-white/50 text-xs sm:text-sm tracking-[0.2em]">Starting at</span>
                <span className="ml-2 text-[#CCFF00] text-xl sm:text-2xl font-black">$49</span>
              </p>
            </motion.div>

            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.4
          }} className="flex flex-col sm:flex-row sm:flex-nowrap items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-4 lg:mb-4">
              <Button onClick={() => navigate('/upload-ticket')} className="bg-[#CCFF00] hover:bg-[#CCFF00]/90 text-[#0A1A2F] font-bold text-base sm:text-lg px-6 sm:px-7 py-6 sm:py-7 rounded-full shadow-[0_0_20px_rgba(204,255,0,0.3)] hover:shadow-[0_0_30px_rgba(204,255,0,0.4)] transition-all duration-300 w-full sm:w-auto h-[64px] sm:h-[76px] whitespace-nowrap">
                <span className="flex items-center justify-center w-full">
                  Scan or Upload Your Ticket
                  <ArrowRight className="ml-2 h-5 w-5 flex-shrink-0" />
                </span>
              </Button>
              <div className="w-full sm:w-auto">
                <VoiceWidget />
              </div>
            </motion.div>

            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.5
          }} className="flex justify-center lg:justify-start mb-8">
              <Button onClick={() => navigate('/tracker')} variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10 font-semibold">
                Check Ticket Status
              </Button>
            </motion.div>

            <p className="text-white/60 text-xs sm:text-sm mb-6 text-center lg:text-left">
              Eligibility is based on your citation details. Start by scanning your ticket.
            </p>


            {/* Trust Badges */}
            <motion.div initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            delay: 0.8
          }} className="flex items-center justify-center lg:justify-start gap-6 pt-4 border-t border-white/10">
                <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map(i => <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0A1A2F] bg-gray-600 overflow-hidden">
                             <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" className="w-full h-full object-cover" />
                        </div>)}
                </div>
                <div className="text-left">
                    <div className="flex text-[#FFD700]">★★★★★</div>
                    <p className="text-white/50 text-xs font-medium">Trusted by drivers nationwide</p>
                </div>
            </motion.div>
          </div>

          {/* Right Column: Phone Mockup Visual - ORDER 2 on Mobile (Second) */}
          <motion.div initial={{
          opacity: 0,
          x: 50
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.8,
          delay: 0.4
        }} className="relative order-2 lg:order-2 flex justify-center lg:justify-end mt-8 lg:mt-0">
             <div className="relative w-[85%] sm:w-full max-w-md mx-auto lg:mr-0 scale-100 lg:scale-100">
                {/* Main Phone Image */}
                <div className="relative rounded-[2.5rem] overflow-hidden border-8 border-gray-900 shadow-2xl bg-gray-900 aspect-[9/18]">
                    {/* Screen Content - Replaced Image */}
                    <img src="https://images.unsplash.com/photo-1645273092626-cc81ab9581c2" alt="Legal app interface showing case status" className="w-full h-full object-cover opacity-90" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A2F] via-transparent to-transparent opacity-60"></div>
                    
                    {/* UI Overlay Elements */}
                    <div className="absolute top-12 left-6 right-6 flex justify-between items-center text-white/80">
                        <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                            <Shield className="w-4 h-4" />
                        </div>
                         <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                            <Upload className="w-4 h-4" />
                        </div>
                    </div>
                </div>

                {/* Floating Notification: Case Dismissed */}
                <motion.div initial={{
              scale: 0.8,
              opacity: 0,
              y: 20
            }} animate={{
              scale: 1,
              opacity: 1,
              y: 0
            }} transition={{
              delay: 1,
              type: "spring"
            }} className="absolute top-[20%] -left-8 sm:-left-12 bg-[#0F213A] border border-[#2D3F59] p-3 sm:p-4 rounded-2xl shadow-xl flex items-center gap-3 sm:gap-4 pr-6 sm:pr-8 z-20 max-w-[200px] sm:max-w-[240px]">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#CCFF00]/20 flex items-center justify-center text-[#CCFF00]">
                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                        <p className="text-white/60 text-[10px] sm:text-xs font-bold uppercase tracking-wider">Status Update</p>
                        <p className="text-white text-lg sm:text-xl font-bold">Case Dismissed</p>
                    </div>
                </motion.div>

                {/* Floating Notification: Attorney Assigned */}
                <motion.div initial={{
              scale: 0.8,
              opacity: 0,
              y: -20
            }} animate={{
              scale: 1,
              opacity: 1,
              y: 0
            }} transition={{
              delay: 1.2,
              type: "spring"
            }} className="absolute bottom-[15%] -right-4 sm:-right-4 bg-[#0F213A] border border-[#2D3F59] p-3 sm:p-4 rounded-2xl shadow-xl flex items-center gap-3 sm:gap-4 pl-4 sm:pl-6 z-20 max-w-[200px] sm:max-w-[240px]">
                    <div>
                        <p className="text-white/60 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-right">Legal Team</p>
                        <p className="text-white text-lg sm:text-xl font-bold text-right">Attorney Assigned</p>
                    </div>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#007BFF]/20 flex items-center justify-center text-[#007BFF]">
                        <Gavel className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                </motion.div>

                 {/* Decorative Glow */}
                 <div className="absolute inset-0 bg-gradient-to-tr from-[#007BFF]/20 to-[#CCFF00]/20 rounded-full filter blur-3xl -z-10 scale-110"></div>
             </div>
          </motion.div>
        </div>
      </div>
    </section>;
};
export default HeroSection;
