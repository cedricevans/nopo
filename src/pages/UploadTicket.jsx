
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Upload as UploadIcon, FileText, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const UploadTicket = () => {
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const analysisSteps = [
    'Reading ticket image...',
    'Extracting citation details...',
    'Cross-checking statutes...',
    'Drafting strategy outline...'
  ];

  const { toast } = useToast();
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (selectedFile.size > 10 * 1024 * 1024) {
      toast({
        variant: 'destructive',
        title: 'File too large',
        description: 'Please select a file smaller than 10MB',
      });
      return;
    }

    setFile(selectedFile);
    setAnalysisComplete(false);
    setAnalysisStep(0);

    toast({
      variant: 'success',
      title: 'File uploaded',
      description: `${selectedFile.name} ready for analysis`,
    });
  };

  const handleAnalyze = () => {
    if (!file) {
      toast({
        variant: 'destructive',
        title: 'No file selected',
        description: 'Please upload a ticket first',
      });
      return;
    }

    setIsAnalyzing(true);
    setAnalysisStep(0);
    const stepInterval = setInterval(() => {
      setAnalysisStep((prev) => (prev + 1) % analysisSteps.length);
    }, 700);

    // Demo: simulate scan + extraction
    setTimeout(() => {
      clearInterval(stepInterval);
      setIsAnalyzing(false);
      setAnalysisComplete(true);

      toast({
        variant: 'success',
        title: 'Analysis complete',
        description: 'Ticket details extracted successfully',
      });
    }, 2400);
  };

  const handleReset = () => {
    setAnalysisComplete(false);
    setFile(null);
    setAnalysisStep(0);
  };

  return (
    <>
      <Helmet>
        <title>Upload Your Ticket - Citation Nation</title>
        <meta
          name="description"
          content="Upload your traffic ticket and get instant AI-powered analysis with personalized defense strategies."
        />
      </Helmet>

      <main className="min-h-screen pt-24 pb-16 relative">
        <div className="fixed inset-0 z-0 opacity-10 pointer-events-none">
          <img
            className="w-full h-full object-cover"
            alt="Digital security background"
            src="https://images.unsplash.com/photo-1688309917081-8a27311be5b1"
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {!analysisComplete ? (
            <>
              <div className="text-center mb-12">
                <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
                  Upload Your <span className="text-[#C6FF4D]">Citation</span>
                </h1>
                <p className="text-lg text-white/70">
                  Take a photo or upload your ticket. We&apos;ll automatically extract the details and evaluate your case.
                </p>
                <p className="text-sm text-white/60 mt-3">
                  Don&apos;t worry — every ticket is reviewed by our team before moving forward.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 sm:p-12 mb-8 shadow-2xl">
                <div className="mb-8">
                  <label
                    htmlFor="ticket-upload"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-white/30 rounded-2xl cursor-pointer hover:border-[#007BFF] hover:bg-white/5 transition-all duration-300 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                      <UploadIcon className="w-48 h-48" />
                    </div>

                    {file ? (
                      <div className="flex flex-col items-center z-10">
                        <CheckCircle className="h-16 w-16 text-[#C6FF4D] mb-4" />
                        <p className="text-white font-semibold mb-2">{file.name}</p>
                        <p className="text-white/60 text-sm">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center z-10">
                        <UploadIcon className="h-16 w-16 text-[#007BFF] mb-4 group-hover:scale-110 transition-transform" />
                        <p className="text-white font-semibold mb-2">Click to upload or drag and drop</p>
                        <p className="text-white/60 text-sm">PDF, JPG, PNG (Max 10MB)</p>
                      </div>
                    )}

                    <input
                      id="ticket-upload"
                      type="file"
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>

                <div className="flex flex-col gap-4">
                  <Button
                    onClick={handleAnalyze}
                    disabled={!file || isAnalyzing}
                    className="w-full bg-[#007BFF] text-white hover:bg-[#007BFF]/90 font-bold py-6 text-lg rounded-full disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(0,123,255,0.3)]"
                  >
                    {isAnalyzing ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Scanning & Extracting Data...
                      </div>
                    ) : (
                      'Analyze My Ticket'
                    )}
                  </Button>
                  {isAnalyzing && (
                    <p className="text-center text-white/60 text-sm">
                      {analysisSteps[analysisStep]}
                    </p>
                  )}

                  <div className="relative flex items-center py-6">
                    <div className="flex-grow border-t border-white/10"></div>
                    <span className="flex-shrink-0 mx-4 text-white/50 text-sm font-semibold tracking-wider">
                      OR PREFER MANUAL ENTRY?
                    </span>
                    <div className="flex-grow border-t border-white/10"></div>
                  </div>

                  <Button
                    onClick={() => navigate('/intake')}
                    className="w-full bg-transparent border-2 border-[#C6FF4D] text-[#C6FF4D] hover:bg-[#C6FF4D] hover:text-[#0A1A2F] font-bold py-6 text-lg rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(198,255,77,0.1)] hover:shadow-[0_0_25px_rgba(198,255,77,0.4)] group"
                  >
                    Don't have a ticket? Start Manual Intake
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                  <FileText className="h-8 w-8 text-[#007BFF] mx-auto mb-3" />
                  <h3 className="text-white font-bold mb-1">OCR Extraction</h3>
                  <p className="text-white/60 text-sm">Autofills your case details</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                  <CheckCircle className="h-8 w-8 text-[#C6FF4D] mx-auto mb-3" />
                  <h3 className="text-white font-bold mb-1">95% Accuracy</h3>
                  <p className="text-white/60 text-sm">Powered by advanced vision AI</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                  <AlertCircle className="h-8 w-8 text-[#007BFF] mx-auto mb-3" />
                  <h3 className="text-white font-bold mb-1">Secure Upload</h3>
                  <p className="text-white/60 text-sm">Encrypted processing</p>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl text-center">
              <CheckCircle className="h-16 w-16 text-[#C6FF4D] mx-auto mb-4" />
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
                Ticket Uploaded
              </h2>
              <p className="text-white/70 mb-8">
                We&apos;re reviewing your citation details now. Continue to see your eligibility.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  onClick={() => navigate('/eligibility')}
                  className="bg-[#C6FF4D] text-[#0A1A2F] hover:bg-[#C6FF4D]/90 font-bold py-5 px-10 rounded-full"
                >
                  Continue to Eligibility
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleReset}
                  className="text-white/60 hover:text-white"
                >
                  Upload another ticket
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default UploadTicket;
