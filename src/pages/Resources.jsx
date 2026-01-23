
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  BookOpen, Shield, Gavel, AlertTriangle, FileText, 
  TrendingUp, Search, Download, ChevronRight, Calculator,
  CheckCircle2, DollarSign, ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Accordion, AccordionContent, AccordionItem, AccordionTrigger 
} from '@/components/ui/accordion';
import { Slider } from '@/components/ui/slider';
import { Link } from 'react-router-dom';

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Cost Calculator State
  const [ticketFine, setTicketFine] = useState(200);
  const [monthlyInsurance, setMonthlyInsurance] = useState(150);

  // Constants for Florida
  const INSURANCE_INCREASE_PERCENT = 0.28; // Average 28% increase
  const INSURANCE_INCREASE_YEARS = 3;
  const LAWYER_COST = 97; // Example cost to fight

  const insuranceIncreaseMonthly = monthlyInsurance * INSURANCE_INCREASE_PERCENT;
  const totalInsuranceCost = insuranceIncreaseMonthly * 12 * INSURANCE_INCREASE_YEARS;
  const totalTicketCost = ticketFine + totalInsuranceCost;
  const potentialSavings = totalTicketCost - LAWYER_COST;

  const topics = [
    {
      id: 'defense',
      title: 'Traffic Ticket Defense Guide',
      description: 'Step-by-step process for fighting your ticket in Florida courts.',
      icon: Shield,
      color: 'text-[#C6FF4D]',
      bg: 'bg-[#C6FF4D]/10'
    },
    {
      id: 'laws',
      title: 'Florida Traffic Laws',
      description: 'Understanding the statutes behind common violations.',
      icon: BookOpen,
      color: 'text-[#007BFF]',
      bg: 'bg-[#007BFF]/10'
    },
    {
      id: 'points',
      title: 'Point System & Impact',
      description: 'How points work, suspension limits, and insurance effects.',
      icon: AlertTriangle,
      color: 'text-orange-400',
      bg: 'bg-orange-400/10'
    },
    {
      id: 'court',
      title: 'Court Process Explained',
      description: 'From arraignment to trial: what happens inside the courtroom.',
      icon: Gavel,
      color: 'text-purple-400',
      bg: 'bg-purple-400/10'
    },
    {
      id: 'violations',
      title: 'Common Violations',
      description: 'Detailed breakdown of speeding, red light, and other citations.',
      icon: FileText,
      color: 'text-pink-400',
      bg: 'bg-pink-400/10'
    },
    {
      id: 'prepare',
      title: 'Prepare for Court',
      description: 'Checklist of documents and evidence you need to bring.',
      icon: CheckCircle2,
      color: 'text-cyan-400',
      bg: 'bg-cyan-400/10'
    }
  ];

  const filteredTopics = topics.filter(topic => 
    topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Traffic Defense Resources - Citation Nation</title>
        <meta name="description" content="Comprehensive guide to fighting Florida traffic tickets. Learn about laws, points system, court processes, and calculate your potential savings." />
      </Helmet>

      <div className="min-h-screen bg-[#0A1A2F] text-white pt-32 pb-16">
        
        {/* Header Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C6FF4D]/10 text-[#C6FF4D] text-sm font-bold uppercase tracking-wider mb-6">
              <BookOpen className="w-4 h-4" /> Free Expert Guide
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-6 tracking-tight">
              Florida Traffic Defense <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#007BFF] to-[#C6FF4D]">Resource Hub</span>
            </h1>
            <p className="text-xl text-white/70 mb-8 leading-relaxed">
              Everything you need to know about fighting traffic tickets, understanding your rights, and protecting your driving record.
            </p>

            <div className="relative max-w-xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-white/40" />
              </div>
              <Input 
                type="text"
                placeholder="Search topics (e.g., 'speeding points', 'court date')..."
                className="pl-12 py-6 bg-white/5 border-white/10 rounded-2xl text-white placeholder:text-white/40 focus:border-[#C6FF4D] focus:ring-[#C6FF4D]/20 transition-all text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>
        </div>

        {/* Resource Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTopics.map((topic, index) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 hover:border-[#C6FF4D]/50 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${topic.bg}`}>
                    <topic.icon className={`w-6 h-6 ${topic.color}`} />
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-[#C6FF4D] transform group-hover:translate-x-1 transition-all" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#C6FF4D] transition-colors">{topic.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{topic.description}</p>
                
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#C6FF4D]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Cost Calculator Section */}
        <div className="bg-[#0D2137] py-24 mb-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[#007BFF]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-[#C6FF4D]/10 rounded-full blur-3xl"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#007BFF]/10 text-[#007BFF] text-sm font-bold uppercase tracking-wider mb-6">
                  <Calculator className="w-4 h-4" /> True Cost Calculator
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">
                  What Does That Ticket <br />
                  <span className="text-[#007BFF]">Really Cost You?</span>
                </h2>
                <p className="text-white/70 text-lg mb-8">
                  Most people only look at the fine amount. But the real cost comes from insurance rate hikes that last for 3 years. See what you could save by fighting it.
                </p>
                
                <div className="space-y-8">
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium text-white">Ticket Fine Amount</label>
                      <span className="text-[#C6FF4D] font-bold">${ticketFine}</span>
                    </div>
                    <Slider 
                      value={[ticketFine]} 
                      onValueChange={(val) => setTicketFine(val[0])} 
                      min={50} 
                      max={1000} 
                      step={10} 
                      className="py-4"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium text-white">Monthly Car Insurance</label>
                      <span className="text-[#C6FF4D] font-bold">${monthlyInsurance}</span>
                    </div>
                    <Slider 
                      value={[monthlyInsurance]} 
                      onValueChange={(val) => setMonthlyInsurance(val[0])} 
                      min={50} 
                      max={500} 
                      step={10} 
                      className="py-4"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-[#0A1A2F] p-4 rounded-xl border border-white/5">
                    <p className="text-white/50 text-xs uppercase font-bold mb-1">Ticket Fine</p>
                    <p className="text-xl font-bold text-white">${ticketFine}</p>
                  </div>
                  <div className="bg-[#0A1A2F] p-4 rounded-xl border border-white/5">
                    <p className="text-white/50 text-xs uppercase font-bold mb-1">Insurance Hike (3yr)</p>
                    <p className="text-xl font-bold text-red-400">+${totalInsuranceCost.toFixed(0)}</p>
                  </div>
                </div>

                <div className="mb-8 p-6 bg-[#007BFF]/10 rounded-2xl border border-[#007BFF]/20">
                  <div className="flex justify-between items-end mb-2">
                    <p className="text-white font-bold">Total Cost Without Fighting</p>
                    <p className="text-3xl font-black text-white">${totalTicketCost.toFixed(0)}</p>
                  </div>
                  <p className="text-sm text-white/60">Based on avg. {INSURANCE_INCREASE_PERCENT * 100}% rate increase in FL</p>
                </div>

                <div className="text-center">
                  <p className="text-white/60 mb-2 text-sm">Potential Savings by Fighting</p>
                  <p className="text-4xl sm:text-5xl font-black text-[#C6FF4D] mb-6">
                    ${potentialSavings.toFixed(0)}
                  </p>
                  <Link to="/upload-ticket">
                    <Button className="w-full bg-[#C6FF4D] text-[#0A1A2F] hover:bg-[#C6FF4D]/90 font-bold py-6 text-lg rounded-xl shadow-[0_0_20px_rgba(198,255,77,0.3)] hover:shadow-[0_0_30px_rgba(198,255,77,0.5)] transition-all">
                      Fight My Ticket Now <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-white/60">Common questions about traffic tickets in Florida</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-white/10">
                <AccordionTrigger className="text-white hover:text-[#C6FF4D] text-left">Should I just pay my ticket?</AccordionTrigger>
                <AccordionContent className="text-white/70 leading-relaxed">
                  Paying a ticket is an admission of guilt. This often results in points on your license, which can lead to insurance rate increases of 22-40% for three years. It also goes on your permanent driving record. Fighting it gives you a chance to have the case dismissed or reduced to no points.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-white/10">
                <AccordionTrigger className="text-white hover:text-[#C6FF4D] text-left">Do I have to go to court personally?</AccordionTrigger>
                <AccordionContent className="text-white/70 leading-relaxed">
                  If you hire an attorney, in 95% of traffic infraction cases, you do NOT need to appear in court. Your lawyer files a "Waiver of Appearance" and represents you. If you fight it yourself, you will likely need to attend at least two hearings (arraignment and trial).
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-white/10">
                <AccordionTrigger className="text-white hover:text-[#C6FF4D] text-left">How do points affect my license?</AccordionTrigger>
                <AccordionContent className="text-white/70 leading-relaxed">
                  In Florida, accumulating 12 points in 12 months results in a 30-day license suspension. 18 points in 18 months leads to a 3-month suspension. Points also trigger insurance hikes. Speeding typically adds 3-4 points, while reckless driving can add 4.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="border-white/10">
                <AccordionTrigger className="text-white hover:text-[#C6FF4D] text-left">What if I'm guilty?</AccordionTrigger>
                <AccordionContent className="text-white/70 leading-relaxed">
                  Even if you "did it," the state has the burden of proof. Officers often make mistakes on tickets, fail to file paperwork, or don't show up to court. Technical defects can get a case dismissed regardless of factual guilt. A "Withhold of Adjudication" can also prevent points even if you aren't fully acquitted.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5" className="border-white/10">
                <AccordionTrigger className="text-white hover:text-[#C6FF4D] text-left">How does the 100% Money Back Guarantee work?</AccordionTrigger>
                <AccordionContent className="text-white/70 leading-relaxed">
                  For our AI + Attorney plan, if we cannot get your points dismissed or your fine reduced, we refund our service fee. We are confident in our ability to save you money and protect your record.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Downloads CTA */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#007BFF] to-[#0A1A2F] rounded-3xl p-8 sm:p-12 border border-white/10 relative overflow-hidden">
             <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">Free Traffic Defense Checklist</h3>
                  <p className="text-blue-100 max-w-xl">Download our comprehensive PDF guide on what to do immediately after getting pulled over to strengthen your case.</p>
                </div>
                <Button variant="outline" className="border-white text-[#0A1A2F] hover:bg-white hover:text-[#007BFF] font-bold h-14 px-8 rounded-xl flex items-center gap-2">
                   <Download className="w-5 h-5" /> Download PDF
                </Button>
             </div>
             {/* Decorative */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
          </div>
        </div>

      </div>
    </>
  );
};

export default Resources;
