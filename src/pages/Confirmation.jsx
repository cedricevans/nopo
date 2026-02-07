
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Download, Calendar, ArrowRight, Check, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from '@/components/ui/use-toast';
import AiStrategyReport from '@/components/intake/AiStrategyReport';
import { getGoogleCalendarUrl, getOutlookCalendarUrl, downloadIcsFile } from '@/lib/calendar';

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { caseData } = location.state || {};
  const trackingCode =
    caseData?.tracking?.tracking_code ||
    caseData?.tracking_code ||
    '';
  const trackingHint =
    caseData?.tracking?.verifier_hint ||
    caseData?.tracking_verifier_hint ||
    '';
  

  useEffect(() => {
    if (!caseData) {
      navigate('/upload-ticket');
      toast({
        variant: 'destructive',
        title: 'No case data found',
        description: 'Please upload a ticket or complete the intake form first.',
      });
    }
  }, [caseData, navigate, toast]);

  if (!caseData) return null;

  const handlePrint = () => {
    window.print();
    toast({
      title: "Generating PDF",
      description: "Use the system dialog to 'Save as PDF'",
    });
  };

  const handleCalendar = (type) => {
    let url;
    switch (type) {
      case 'google':
        url = getGoogleCalendarUrl(caseData);
        window.open(url, '_blank');
        break;
      case 'outlook':
        url = getOutlookCalendarUrl(caseData);
        window.open(url, '_blank');
        break;
      case 'ics':
        downloadIcsFile(caseData);
        toast({
          title: "Downloaded",
          description: "Calendar file (.ics) has been saved.",
          variant: "success",
        });
        return; 
      default:
        return;
    }
  };

  const handleUpgradeToLawyer = () => {
    navigate('/lawyer-matching', { 
        state: { 
            caseData: {
                ...caseData,
                planType: 'legal-full'
            } 
        } 
    });
  };

  return (
    <>
      <Helmet>
        <title>Your Defense Strategy - Citation Nation</title>
        <meta name="description" content="View and download your AI-generated traffic ticket defense strategy." />
      </Helmet>

      <div className="min-h-screen pt-32 pb-16 bg-[#0A1A2F] relative print:bg-white print:p-0 print:min-h-0">
        
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none print:hidden">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#007BFF] rounded-full blur-[120px] mix-blend-screen opacity-20"></div>
           <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#C6FF4D] rounded-full blur-[100px] mix-blend-screen opacity-10"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center mb-10 print:hidden">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#C6FF4D] rounded-full mb-6 shadow-[0_0_20px_rgba(198,255,77,0.4)]">
                <Check className="h-8 w-8 text-[#0A1A2F] stroke-[3px]" />
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-white mb-4">
                Strategy <span className="text-[#C6FF4D]">Ready</span>
              </h1>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                Our AI has analyzed your ticket ({caseData.violationCode}) and generated a personalized defense plan.
              </p>
            </motion.div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-6 text-sm text-white/70 print:hidden">
            <p>
              This strategy is informational and AI-generated. When available, a licensed attorney may review it as a quality check,
              but you are not hiring a lawyer unless you separately retain one. Results vary, and you assume all risk in using this information.
            </p>
          </div>

          {trackingCode ? (
            <div className="bg-[#C6FF4D]/10 border border-[#C6FF4D]/30 rounded-xl p-5 mb-6 text-center print:hidden">
              <div className="text-xs uppercase tracking-[0.3em] text-[#C6FF4D] font-bold">
                Tracking Code
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white mt-2 tracking-[0.25em]">
                {trackingCode}
              </div>
              <div className="text-sm text-white/70 mt-2">
                Verification: {trackingHint || 'Use the phone number you provided.'}
              </div>
            </div>
          ) : null}

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 mb-8 justify-end print:hidden"
          >
            <Button 
              onClick={handlePrint}
              variant="outline" 
              className="bg-white/5 border-white/20 text-white hover:bg-white/10 gap-2"
            >
              <Download className="w-4 h-4" /> Download Strategy PDF
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-[#007BFF] hover:bg-[#007BFF]/90 text-white gap-2 shadow-lg shadow-blue-500/20">
                  <Calendar className="w-4 h-4" /> Add to Calendar
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-[#0A1A2F] border-white/20 text-white">
                <DropdownMenuItem onClick={() => handleCalendar('google')} className="focus:bg-white/10 focus:text-white cursor-pointer">
                  Google Calendar
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleCalendar('outlook')} className="focus:bg-white/10 focus:text-white cursor-pointer">
                  Outlook Calendar
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleCalendar('ics')} className="focus:bg-white/10 focus:text-white cursor-pointer">
                  Apple / iCal (.ics)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="print:block print:w-full print:absolute print:top-0 print:left-0"
          >
            <AiStrategyReport caseData={caseData} />
          </motion.div>

          <div className="mt-12 text-center print:hidden">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-white font-bold text-xl mb-4">Want a law firm to handle this for you?</h3>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="text-left">
                      <div className="flex items-center gap-2 mb-2">
                           <ShieldCheck className="text-[#C6FF4D] h-5 w-5" />
                           <h4 className="font-bold text-white">Law Firm Review - $49</h4>
                      </div>
                      <p className="text-sm text-white/60">
                          Send your scanned ticket to our firm for a full review and next steps.
                      </p>
                  </div>
                  <Button 
                      onClick={handleUpgradeToLawyer}
                      className="bg-transparent border border-[#C6FF4D] text-[#C6FF4D] hover:bg-[#C6FF4D] hover:text-[#0A1A2F] font-bold"
                  >
                      Send to Our Firm
                      <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Confirmation;
