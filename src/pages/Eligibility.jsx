import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';

const Eligibility = () => {
  const navigate = useNavigate();
  const [contactInfo, setContactInfo] = useState({
    fullName: '',
    email: '',
    phone: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('citationNationContact');
    const savedCaseId = localStorage.getItem('citationNationCaseId');
    if (saved) {
      try {
        setContactInfo(JSON.parse(saved));
      } catch {
        localStorage.removeItem('citationNationContact');
      }
    }
    if (!savedCaseId) {
      const newCaseId = `CN-${Math.floor(100000 + Math.random() * 900000)}`;
      localStorage.setItem('citationNationCaseId', newCaseId);
    }
  }, []);

  const handleChange = (field, value) => {
    setContactInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    const emailLooksValid = contactInfo.email.includes('@') && contactInfo.email.includes('.');
    if (!contactInfo.fullName.trim() || !emailLooksValid || !contactInfo.phone.trim()) {
      setError('Please enter your name, email, and phone to continue.');
      return;
    }
    setError('');
    localStorage.setItem('citationNationContact', JSON.stringify(contactInfo));
    navigate('/pricing');
  };

  return (
    <>
      <Helmet>
        <title>Eligibility Results - Citation Nation</title>
        <meta
          name="description"
          content="See if your citation is eligible for defense and preview possible outcomes."
        />
      </Helmet>

      <main className="min-h-screen pt-32 pb-16 relative">
        <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10 pointer-events-none"></div>
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0A1A2F] via-[#0A1A2F]/95 to-[#0A1A2F]"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl">
            <div className="flex items-center gap-3 mb-4 text-[#C6FF4D]">
              <CheckCircle2 className="h-6 w-6" />
              <span className="text-sm font-semibold uppercase tracking-wider">Eligibility Result</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Good News, You&apos;re Eligible for Defense
            </h1>
            <p className="text-white/70 text-lg mb-6">
              Based on your citation, we can assign a licensed attorney to contest or mitigate your ticket.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
              <h2 className="text-white font-bold mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <Label htmlFor="fullName" className="text-white text-sm">Full Name</Label>
                  <Input
                    id="fullName"
                    value={contactInfo.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    placeholder="Jane Doe"
                    className="mt-2 bg-white/5 border-white/20 text-white h-12"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-white text-sm">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="jane@email.com"
                    className="mt-2 bg-white/5 border-white/20 text-white h-12"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-white text-sm">Phone</Label>
                  <Input
                    id="phone"
                    value={contactInfo.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="(555) 123-4567"
                    className="mt-2 bg-white/5 border-white/20 text-white h-12"
                  />
                </div>
              </div>
              <p className="text-white/60 text-xs mt-3">
                We&apos;ll use this to send updates about your case.
              </p>
              {error && (
                <p className="text-red-300 text-xs mt-3">{error}</p>
              )}
            </div>

            <div className="space-y-3 text-white/80 text-sm mb-6">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C6FF4D] mt-0.5" />
                <span>Potential dismissal or reduction</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C6FF4D] mt-0.5" />
                <span>Protection against points (when applicable)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C6FF4D] mt-0.5" />
                <span>Court handled on your behalf</span>
              </div>
            </div>

            <p className="text-white/60 text-sm mb-8">
              While full dismissal isn&apos;t guaranteed, our attorneys work to reduce penalties and negotiate the best possible outcome.
            </p>

            <Button
              onClick={handleNext}
              className="bg-[#C6FF4D] text-[#0A1A2F] hover:bg-[#C6FF4D]/90 font-bold py-5 px-10 rounded-full"
            >
              Next
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Eligibility;
