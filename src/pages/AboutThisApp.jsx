
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Shield, 
  Users, 
  Zap, 
  Database, 
  BarChart, 
  Lock, 
  Scale, 
  CheckCircle, 
  ArrowRight,
  Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AboutThisApp = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <>
      <Helmet>
        <title>About This App - Platform Overview | Citation Nation</title>
        <meta name="description" content="Overview of the Citation Nation platform technology, AI capabilities, and value proposition for investors and partners." />
      </Helmet>

      <div className="pt-32 pb-16">
        
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C6FF4D]/10 text-[#C6FF4D] text-xs font-bold uppercase tracking-wider mb-6 border border-[#C6FF4D]/20">
                <Target className="w-4 h-4" /> Platform Overview
              </div>
              <h1 className="text-4xl sm:text-6xl font-black text-white mb-6 leading-tight">
                The Operating System for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C6FF4D] to-[#007BFF]">Modern Legal Defense</span>
              </h1>
              <p className="text-xl text-white/60 mb-8 leading-relaxed">
                Citation Nation bridges the gap between high-volume traffic litigation and consumer access to justice using advanced AI intake and workflow automation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-[#C6FF4D] text-[#0A1A2F] hover:bg-[#C6FF4D]/90 font-bold">
                  <Link to="/contact">Request Investor Deck</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <Link to="/upload-ticket">Try the Demo</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-white/5 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">Core Workflow Engine</h2>
              <p className="text-white/60 max-w-2xl mx-auto">
                Our platform automates the most labor-intensive parts of legal client acquisition and case preparation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Users,
                  title: "1. Intelligent Intake",
                  desc: "Replaces 20-minute phone consultations with a smart, self-guided wizard that captures all critical case data, documents, and user intent."
                },
                {
                  icon: Cpu,
                  title: "2. AI Analysis Layer",
                  desc: "Instantly processes citation data against statutory databases to generate preliminary risk assessments and identify potential procedural defenses."
                },
                {
                  icon: Scale,
                  title: "3. Attorney Routing",
                  desc: "Cases are either routed to a DIY strategy report (SaaS model) or handed off to partner attorneys (Marketplace model) based on user selection."
                }
              ].map((step, idx) => (
                <div key={idx} className="bg-[#0A1A2F] p-8 rounded-2xl border border-white/10 relative overflow-hidden group hover:border-[#007BFF]/50 transition-colors">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#007BFF]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-[#007BFF]/10 transition-colors"></div>
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-[#007BFF] mb-6">
                    <step.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-white/60 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 text-[#007BFF] font-bold uppercase tracking-wider text-sm">
                <BriefcaseIcon className="w-4 h-4" /> For Legal Partners
              </div>
              <h2 className="text-4xl font-bold text-white">Slash Customer Acquisition Costs</h2>
              <p className="text-white/60 text-lg">
                Traditional traffic law firms spend heavily on ads and support staff to field low-value leads. Citation Nation flips the script.
              </p>
              
              <div className="space-y-4">
                {[
                  "Zero ad spend—receive pre-qualified, pre-paid cases.",
                  "Automated document collection (citations, licenses).",
                  "Structured data output (JSON/CSV) for easy filing.",
                  "Filter cases by jurisdiction and violation type."
                ].map((item, i) => (
                  <motion.div key={i} variants={itemVariants} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#007BFF] mt-1 flex-shrink-0" />
                    <span className="text-white/80">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-[#C6FF4D] rounded-3xl p-8 sm:p-12 text-[#0A1A2F]"
            >
              <div className="inline-flex items-center gap-2 text-[#0A1A2F]/60 font-bold uppercase tracking-wider text-sm mb-6">
                <Users className="w-4 h-4" /> For Consumers
              </div>
              <h2 className="text-3xl sm:text-4xl font-black mb-6">Democratizing Legal Access</h2>
              <p className="text-[#0A1A2F]/70 text-lg mb-8">
                We give users the clarity and confidence to fight tickets, whether they want to do it themselves or hire a pro.
              </p>
              
              <ul className="space-y-4 mb-8">
                {[
                  "Instant educational analysis (Free/Low cost).",
                  "Transparent flat-rate pricing for representation.",
                  "Mobile-first experience, no office visits.",
                  "Track case status in real-time."
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-medium">
                    <div className="w-6 h-6 rounded-full bg-[#0A1A2F]/10 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-[#0A1A2F]" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              
              <div className="pt-6 border-t border-[#0A1A2F]/10">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-2xl">95%</span>
                  <span className="text-sm font-medium opacity-60">Customer Satisfaction Score</span>
                </div>
              </div>
            </motion.div>

          </div>
        </section>

        <section className="py-20 bg-[#007BFF]/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
             <div className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">Built for Scale & Security</h2>
              <p className="text-white/60">Enterprise-grade architecture designed for data privacy and high availability.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
               <TechCard icon={Lock} title="SOC 2 Ready" desc="End-to-end encryption for all sensitive user data." />
               <TechCard icon={Database} title="Supabase" desc="Scalable PostgreSQL backend with real-time capabilities." />
               <TechCard icon={Zap} title="Edge Functions" desc="Serverless architecture for instant global response times." />
               <TechCard icon={BarChart} title="Analytics" desc="Comprehensive funnel tracking and conversion optimization." />
            </div>
          </div>
        </section>

        <section className="py-24">
           <div className="max-w-4xl mx-auto px-4 text-center">
              <h2 className="text-4xl font-bold text-white mb-6">Ready to Disrupt the Industry?</h2>
              <p className="text-xl text-white/60 mb-10">
                We are actively seeking partnerships with forward-thinking law firms and strategic investors.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                 <Button asChild className="h-14 px-8 bg-white text-[#0A1A2F] hover:bg-white/90 font-bold text-lg">
                    <Link to="/contact">Partner With Us</Link>
                 </Button>
                 <Button asChild variant="ghost" className="h-14 px-8 text-white hover:bg-white/10 font-medium text-lg">
                    <Link to="/legal-disclaimer">View Legal Disclaimers <ArrowRight className="ml-2 w-4 h-4" /></Link>
                 </Button>
              </div>
           </div>
        </section>
      </div>
    </>
  );
};

const TechCard = ({ icon: Icon, title, desc }) => (
  <div className="bg-[#0A1A2F] p-6 rounded-xl border border-white/10 flex flex-col items-center">
    <Icon className="w-8 h-8 text-[#007BFF] mb-4" />
    <h3 className="text-white font-bold mb-2">{title}</h3>
    <p className="text-xs text-white/50">{desc}</p>
  </div>
);

const BriefcaseIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

export default AboutThisApp;
