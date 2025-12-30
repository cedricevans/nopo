import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, AlertTriangle, TrendingDown, Target, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

/**
 * Strategy Preview Component
 * Replaces the old AI Demo with a more neutral "Strategy Preview"
 */
const AiDemoPreview = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const handleDemo = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 3000);
  };

  const analysisResults = {
    violation: 'Speeding - 15 mph over limit',
    points: 3,
    fineEstimate: '$250',
    successProbability: 87,
    defenseStrategy: 'Challenge radar calibration and officer training records',
  };

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[#0A1A2F]/95 to-[#0A1A2F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
            Visual <span className="text-[#C6FF4D]">Preview</span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            A quick look at how your case moves from scan to resolution
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 sm:p-12">
            <AnimatePresence mode="wait">
              {!isAnalyzing && !showResults && (
                <motion.div
                  key="initial"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <Sparkles className="h-16 w-16 text-[#C6FF4D] mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Preview The Process
                  </h3>
                  <p className="text-white/70 mb-8">
                    See a sample case card and outcome preview
                  </p>
                  <Button
                    onClick={handleDemo}
                    className="bg-[#007BFF] text-white hover:bg-[#007BFF]/90 font-bold px-8 py-4 rounded-full text-lg"
                  >
                    Run Sample Analysis
                  </Button>
                </motion.div>
              )}

              {isAnalyzing && (
                <motion.div
                  key="analyzing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <div className="relative w-24 h-24 mx-auto mb-6">
                    <div className="absolute inset-0 border-4 border-[#007BFF] border-t-transparent rounded-full animate-spin"></div>
                    <div className="absolute inset-2 border-4 border-[#C6FF4D] border-t-transparent rounded-full animate-spin animation-delay-150"></div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Analyzing Ticket Details...
                  </h3>
                  <p className="text-white/70">
                    Processing violation type, court location, and fine amount...
                  </p>
                </motion.div>
              )}

              {showResults && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-bold text-white mb-6 text-center">
                    Analysis Complete ✓
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <AlertTriangle className="h-5 w-5 text-[#C6FF4D]" />
                        <span className="text-sm text-white/70">Violation Type</span>
                      </div>
                      <p className="text-lg font-bold text-white">
                        {analysisResults.violation}
                      </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <TrendingDown className="h-5 w-5 text-[#007BFF]" />
                        <span className="text-sm text-white/70">Points at Risk</span>
                      </div>
                      <p className="text-lg font-bold text-white">
                        {analysisResults.points} Points
                      </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <BarChart3 className="h-5 w-5 text-[#C6FF4D]" />
                        <span className="text-sm text-white/70">Fine Estimate</span>
                      </div>
                      <p className="text-lg font-bold text-white">
                        {analysisResults.fineEstimate}
                      </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Target className="h-5 w-5 text-[#007BFF]" />
                        <span className="text-sm text-white/70">Defense Viability</span>
                      </div>
                      <p className="text-lg font-bold text-[#C6FF4D]">
                        High ({analysisResults.successProbability}%)
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-[#007BFF]/20 to-[#C6FF4D]/20 border border-white/20 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-white mb-2">
                      Potential Strategy
                    </h4>
                    <p className="text-white/80">
                      {analysisResults.defenseStrategy}
                    </p>
                  </div>

                  <div className="text-center pt-4">
                  <Button
                    onClick={() => navigate('/upload-ticket')}
                    className="bg-[#C6FF4D] text-[#0A1A2F] hover:bg-[#C6FF4D]/90 font-bold px-8 py-4 rounded-full text-lg"
                  >
                    Scan or Upload Your Ticket
                  </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiDemoPreview;
