
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import UploadTicket from '@/pages/UploadTicket';
import Intake from '@/pages/Intake';
import Tracker from '@/pages/Tracker';
import Pricing from '@/pages/Pricing';
import Eligibility from '@/pages/Eligibility';
import Attorney from '@/pages/Attorney';
import CaseProgress from '@/pages/CaseProgress';
import Dashboard from '@/pages/Dashboard';
import Outcome from '@/pages/Outcome';
import CaseResults from '@/pages/CaseResults';
import VoiceAssistant from '@/pages/VoiceAssistant';
import HowItWorks from '@/pages/HowItWorks';
import About from '@/pages/About';
import AboutThisApp from '@/pages/AboutThisApp';
import Contact from '@/pages/Contact';
import LegalDisclaimer from '@/pages/LegalDisclaimer';
import Terms from '@/pages/Terms';
import Resources from '@/pages/Resources';
import QuickTips from '@/pages/QuickTips'; // Import the QuickTips component
import Confirmation from '@/pages/Confirmation';
import LawyerMatching from '@/pages/LawyerMatching';
import LawyerConfirmation from '@/pages/LawyerConfirmation';
import AttorneyChat from '@/pages/AttorneyChat';
import InvestorGuide from '@/pages/InvestorGuide';
import LawFirmGuide from '@/pages/LawFirmGuide';
import { Toaster } from '@/components/ui/toaster';
import ScrollToTop from '@/components/ScrollToTop';

function App() {
  return (
    <Router>
      <Helmet>
        <title>Citation Nation - Traffic Ticket Defense Strategies</title>
        <meta name="description" content="Choose between affordable DIY defense strategies or professional legal representation for your traffic ticket. Save money and protect your driving record." />
      </Helmet>
      
      <ScrollToTop />

      <div className="min-h-screen bg-[#0A1A2F] text-white font-sans selection:bg-[#C6FF4D] selection:text-[#0A1A2F] flex flex-col">
        <Header />
        
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload-ticket" element={<UploadTicket />} />
            <Route path="/intake" element={<Intake />} />
            <Route path="/eligibility" element={<Eligibility />} />
            <Route path="/tracker" element={<Tracker />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/attorney" element={<Attorney />} />
            <Route path="/case-progress" element={<CaseProgress />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/outcome" element={<Outcome />} />
            <Route path="/case-results" element={<CaseResults />} />
            <Route path="/voice" element={<VoiceAssistant />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/about" element={<About />} />
            <Route path="/about-app" element={<AboutThisApp />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/quick-tips" element={<QuickTips />} /> {/* Route for QuickTips */}
            <Route path="/legal-disclaimer" element={<LegalDisclaimer />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/lawyer-matching" element={<LawyerMatching />} />
            <Route path="/lawyer-confirmation" element={<LawyerConfirmation />} />
            <Route path="/attorney-chat" element={<AttorneyChat />} />
            <Route path="/investor-guide" element={<InvestorGuide />} />
            <Route path="/law-firm-guide" element={<LawFirmGuide />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
        
        <Footer />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
