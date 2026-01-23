
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Lightbulb, Gavel, FileText, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const QuickTips = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const tips = [
    {
      category: "Before Court",
      icon: FileText,
      items: [
        {
          title: "What to bring to court?",
          content: "Always bring your driver's license, proof of insurance, vehicle registration, and your physical ticket. If you have any evidence (photos, dashcam footage), bring printed copies or have them ready on a device you can show."
        },
        {
          title: "How to request a continuance?",
          content: "If you cannot make your court date, contact the court clerk immediately. Most courts allow one rescheduling (continuance) if you call at least 24-48 hours in advance. Do not simply skip court, as this can lead to a warrant."
        },
        {
          title: "Understanding Ticket Codes",
          content: "The code written on your ticket (e.g., VC 22350) refers to the specific law you allegedly violated. Look this code up online before your court date to understand exactly what the officer has to prove."
        }
      ]
    },
    {
      category: "In The Courtroom",
      icon: Gavel,
      items: [
        {
          title: "Courtroom Etiquette",
          content: "Dress professionally (business casual). Address the judge as 'Your Honor'. Do not interrupt the officer or the judge. Stand when speaking. These small signs of respect can significantly influence the judge's discretion."
        },
        {
          title: "Pleading Options",
          content: "Generally, you can plead 'Guilty', 'Not Guilty', or 'No Contest'. Pleading 'Not Guilty' is required if you want to fight the ticket. 'No Contest' has the same immediate penalty as Guilty but cannot be used against you in future civil lawsuits."
        }
      ]
    },
    {
      category: "Common Misconceptions",
      icon: AlertCircle,
      items: [
        {
          title: "Officer didn't show me the radar",
          content: "In most states, officers are not legally required to show you the radar gun reading at the time of the stop. This is generally not a valid defense on its own."
        },
        {
          title: "Mistakes on the ticket",
          content: "Minor clerical errors (like a misspelled name or wrong car color) usually do not invalidate a ticket. However, significant errors regarding the location, time, or identity of the driver can sometimes be grounds for dismissal."
        }
      ]
    }
  ];

  return (
    <div className="pt-32 pb-16 bg-[#0A1A2F] min-h-screen">
      <Helmet>
        <title>Quick Tips & Free Advice - Citation Nation</title>
        <meta name="description" content="Free traffic court tips and advice. Learn what to bring to court, how to read your ticket, and understand the process." />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-[#C6FF4D]/10 rounded-full mb-4">
            <Lightbulb className="w-8 h-8 text-[#C6FF4D]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
            Quick Tips & <span className="text-[#C6FF4D]">Free Advice</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Simple, practical advice to help you navigate the traffic court process. 
            This information is for educational purposes and is not legal advice.
          </p>
        </div>

        <div className="space-y-8">
          {tips.map((section, sectionIndex) => (
            <div key={sectionIndex} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <div className="p-6 bg-white/5 border-b border-white/10 flex items-center gap-3">
                <section.icon className="w-6 h-6 text-[#007BFF]" />
                <h2 className="text-xl font-bold text-white">{section.category}</h2>
              </div>
              <div className="divide-y divide-white/10">
                {section.items.map((item, itemIndex) => {
                  const globalIndex = `${sectionIndex}-${itemIndex}`;
                  const isOpen = openIndex === globalIndex;

                  return (
                    <div key={itemIndex} className="bg-transparent">
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                        className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                      >
                        <span className="font-bold text-white text-lg pr-8">{item.title}</span>
                        <ChevronDown
                          className={`w-5 h-5 text-[#C6FF4D] transition-transform duration-300 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="px-6 pb-6 pt-2 text-white/70 leading-relaxed border-t border-white/5">
                              {item.content}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-[#007BFF]/20 to-[#C6FF4D]/20 border border-white/20 rounded-3xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Need More Help?</h3>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            These tips are a great start, but every case is unique. Get a personalized strategy guide or hire a professional to handle it for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Link to="/pricing">
              <Button className="bg-[#C6FF4D] text-[#0A1A2F] hover:bg-[#C6FF4D]/90 font-bold px-8 py-6 rounded-full text-lg w-full sm:w-auto">
                View Defense Options
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickTips;
