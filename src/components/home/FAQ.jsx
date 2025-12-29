import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * FAQ Component
 * Frequently Asked Questions with accordion
 */
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'How does the AI analysis work?',
      answer: 'Our AI analyzes your ticket using machine learning trained on thousands of traffic cases. It examines violation type, circumstances, legal precedents, and generates a personalized defense strategy based on what has worked in similar cases.',
    },
    {
      question: 'What is your success rate?',
      answer: 'Our strategies have a 95% success rate when properly implemented. This includes dismissals, reduced fines, and reduced points. Success depends on following our recommendations and local court procedures.',
    },
    {
      question: 'How long does the analysis take?',
      answer: 'Most analyses are completed within 1-3 hours. All analyses are guaranteed within 24 hours. You\'ll receive an email notification when your report is ready.',
    },
    {
      question: 'Do you provide legal representation?',
      answer: 'We provide AI-powered analysis and defense strategies, not legal representation. However, our Premium package includes coordination with licensed attorneys in your area if needed.',
    },
    {
      question: 'What if the strategy doesn\'t work?',
      answer: 'We offer a money-back guarantee. If we can\'t find a valid defense strategy for your ticket, you get a full refund. If you follow our strategy and it doesn\'t result in a favorable outcome, contact us for a review.',
    },
    {
      question: 'Is my information secure?',
      answer: 'Absolutely. All data is encrypted end-to-end, and we never share your information. Your privacy is protected by our strict security protocols and privacy policy.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[#0A1A2F]/95 to-[#0A1A2F]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
            Frequently Asked <span className="text-[#C6FF4D]">Questions</span>
          </h2>
          <p className="text-lg text-white/70">
            Everything you need to know about Citation Nation
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="text-lg font-bold text-white pr-8">{faq.question}</span>
                <ChevronDown
                  className={`h-6 w-6 text-[#C6FF4D] flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-white/70">{faq.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;