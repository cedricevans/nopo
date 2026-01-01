
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, RefreshCw, Sparkles, FileSearch } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';

/**
 * Ticket Analysis Results Component
 * Displays comprehensive AI analysis results and offers two distinct flows:
 * 1. AI Strategy (Scan -> Confirmation)
 */
const TicketAnalysisResults = ({ analysis, ticketFile, onReset }) => {
  const navigate = useNavigate();
  const [locationStatus, setLocationStatus] = useState('idle');
  const [nearestCity, setNearestCity] = useState(null);
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactError, setContactError] = useState('');
  const [caseNumber] = useState(() => `CN-${Math.floor(100000 + Math.random() * 900000)}`);

  // Use passed analysis or fallback to default structure if missing (safeguard)
  const data = analysis || {
    violationType: 'Unknown',
    fineEstimate: 0,
    points: 0,
    successProbability: 0
  };

  // Helper to normalize the OCR data into a flat structure for the app's intake/confirmation pages
  const normalizeCaseData = (ocrData) => {
    return {
      firstName: ocrData.driver?.firstName || '',
      lastName: ocrData.driver?.lastName || '',
      address: ocrData.driver?.address || '',
      city: ocrData.driver?.city || '',
      state: ocrData.driver?.state || '',
      zip: ocrData.driver?.zip || '',
      dlNumber: ocrData.driver?.dlNumber || '',
      vehicleMake: ocrData.vehicle?.make || '',
      vehicleModel: ocrData.vehicle?.model || '',
      vehicleYear: ocrData.vehicle?.year || '',
      plateNumber: ocrData.vehicle?.plate || '',
      violationCode: ocrData.violation?.statute || 'Unknown',
      speed: ocrData.violation?.actualSpeedMph || '',
      speedLimit: ocrData.violation?.postedSpeedMph || '',
      location: ocrData.violation?.location || '',
      courtDate: ocrData.court?.courtDate || '',
      courtName: ocrData.court?.courtName || '',
      rawAnalysis: ocrData // Preserve original structure if needed
    };
  };

  const handleAiStrategyFlow = () => {
    const emailLooksValid = contactEmail.includes('@') && contactEmail.includes('.');
    if (!contactPhone.trim() || !emailLooksValid) {
      setContactError('Please enter a valid email and phone number to continue.');
      return;
    }
    setContactError('');
    const caseData = normalizeCaseData(data);
    const contactPayload = {
      fullName: caseData.firstName || caseData.lastName ? `${caseData.firstName} ${caseData.lastName}`.trim() : '',
      email: contactEmail,
      phone: contactPhone
    };
    localStorage.setItem('citationNationContact', JSON.stringify(contactPayload));
    if (!localStorage.getItem('citationNationCaseId')) {
      localStorage.setItem('citationNationCaseId', caseNumber);
    }
    navigate('/eligibility', {
      state: {
        caseData,
        ticketImage: data.ticketImage || null,
        flow: 'ai-strategy'
      }
    });
  };

  const floridaCities = [
    { name: 'Jacksonville', state: 'FL', lat: 30.3322, lon: -81.6557 },
    { name: 'Palm Beach', state: 'FL', lat: 26.7056, lon: -80.0364 },
    { name: 'Miami', state: 'FL', lat: 25.7617, lon: -80.1918 },
    { name: 'Orlando', state: 'FL', lat: 28.5383, lon: -81.3792 },
    { name: 'Tampa', state: 'FL', lat: 27.9506, lon: -82.4572 }
  ];

  const toRadians = (value) => (value * Math.PI) / 180;

  const getDistanceMiles = (lat1, lon1, lat2, lon2) => {
    const earthRadiusMiles = 3959;
    const deltaLat = toRadians(lat2 - lat1);
    const deltaLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(deltaLon / 2) *
        Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadiusMiles * c;
  };

  const findNearestCity = (lat, lon) => {
    let closest = null;
    let smallestDistance = Infinity;

    floridaCities.forEach((city) => {
      const distance = getDistanceMiles(lat, lon, city.lat, city.lon);
      if (distance < smallestDistance) {
        smallestDistance = distance;
        closest = city;
      }
    });

    return { ...closest, distance: smallestDistance };
  };

  const handleUseLocation = () => {
    if (!navigator?.geolocation) {
      setLocationStatus('error');
      return;
    }

    setLocationStatus('locating');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const closest = findNearestCity(latitude, longitude);
        const withinFloridaRange = closest.distance <= 300;
        setNearestCity(
          withinFloridaRange
            ? closest
            : { name: 'your area', state: '', distance: closest.distance }
        );
        setLocationStatus('found');
      },
      (error) => {
        setLocationStatus(error?.code === 1 ? 'denied' : 'error');
      },
      { timeout: 8000, maximumAge: 600000, enableHighAccuracy: false }
    );
  };

  const handleDemoLocation = () => {
    setNearestCity({ name: 'Jacksonville', state: 'FL', distance: 0, demo: true });
    setLocationStatus('found');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center justify-center w-20 h-20 bg-[#C6FF4D]/20 rounded-full mb-6 relative"
        >
          <div className="absolute inset-0 rounded-full animate-ping bg-[#C6FF4D]/20"></div>
          <FileSearch className="h-10 w-10 text-[#C6FF4D]" />
        </motion.div>
        <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
          Scan <span className="text-[#C6FF4D]">Successful</span>
        </h1>
        <p className="text-lg text-white/70">
          We've extracted the details from your ticket. Choose how you want to proceed.
        </p>
      </div>

      {!data?.aiMeta?.usedAi && (
        <div className="bg-white/10 border border-white/10 rounded-2xl p-4 text-white/70 text-sm">
          <span className="font-semibold text-white">AI is cooling down:</span> Showing the built-in strategy for now.
        </div>
      )}

      {/* Extracted Data Summary */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
        <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">Extracted Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
           <div>
             <span className="text-white/40 text-xs uppercase tracking-wider font-bold block mb-1">Violation</span>
             <p className="text-white font-medium text-lg">{data.violation?.description || 'N/A'}</p>
           </div>
           <div>
             <span className="text-white/40 text-xs uppercase tracking-wider font-bold block mb-1">Location</span>
             <p className="text-white font-medium">{data.violation?.location || 'N/A'}</p>
           </div>
           <div>
             <span className="text-white/40 text-xs uppercase tracking-wider font-bold block mb-1">Defendant</span>
             <p className="text-white font-medium">{data.driver?.fullName || 'N/A'}</p>
           </div>
           <div>
             <span className="text-white/40 text-xs uppercase tracking-wider font-bold block mb-1">Court Date</span>
             <p className="text-[#C6FF4D] font-bold">{data.court?.courtDate || 'Not specified'}</p>
           </div>
        </div>
        
        {data.ai?.quickSummary && (
          <div className="mt-6 bg-[#007BFF]/10 border border-[#007BFF]/20 rounded-lg p-4">
            <span className="text-[#007BFF] text-xs font-bold uppercase tracking-wider mb-1 block">AI Summary</span>
            <p className="text-white/80 text-sm">{data.ai.quickSummary}</p>
          </div>
        )}

        {data.ai?.sources?.length ? (
          <div className="mt-4 text-xs text-white/60">
            <span className="font-semibold text-white/70">Sources:</span>{' '}
            {data.ai.sources.map((source, index) => (
              <a
                key={`${source.url}-${index}`}
                href={source.url}
                target="_blank"
                rel="noreferrer"
                className="text-[#C6FF4D] hover:text-[#C6FF4D]/80 underline mr-3"
              >
                {source.label || `Source ${index + 1}`}
              </a>
            ))}
          </div>
        ) : null}

        {data.ai?.strategy?.length ? (
          <div className="mt-6 bg-white/5 border border-white/10 rounded-lg p-4">
            <span className="text-white/60 text-xs font-bold uppercase tracking-wider mb-3 block">Strategy Notes</span>
            <div className="space-y-3 text-sm text-white/80">
              {data.ai.strategy.map((item, index) => (
                <div key={`${item.title}-${index}`}>
                  <p className="text-white font-semibold">{item.title}</p>
                  <p className="text-white/70">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {data.ai?.parkingTips?.length ? (
          <div className="mt-6 bg-[#C6FF4D]/10 border border-[#C6FF4D]/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2 text-[#C6FF4D]">
              <div className="w-7 h-7 rounded-full bg-[#C6FF4D]/20 flex items-center justify-center text-xs font-bold">
                P
              </div>
              <span className="text-xs font-bold uppercase tracking-wider">Parking Ticket Playbook</span>
            </div>
            <p className="text-white/70 text-xs mb-3">
              Common parking defenses: unclear signage, valid permit, meter proof, and timing errors.
            </p>
            <div className="space-y-3 text-sm text-white/80">
              {data.ai.parkingTips.map((item, index) => (
                <div key={`${item.title}-${index}`}>
                  <p className="text-white font-semibold">{item.title}</p>
                  <p className="text-white/70">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
        <h3 className="text-xl font-bold text-white mb-4">Contact Details</h3>
        <p className="text-white/60 text-sm mb-6">
          We use this to personalize your eligibility result and send updates.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            type="email"
            placeholder="Email address"
            value={contactEmail}
            onChange={(e) => {
              setContactEmail(e.target.value);
              if (contactError) setContactError('');
            }}
            className="bg-white/5 border-white/10 text-white"
          />
          <Input
            type="tel"
            placeholder="Phone number"
            value={contactPhone}
            onChange={(e) => {
              setContactPhone(e.target.value);
              if (contactError) setContactError('');
            }}
            className="bg-white/5 border-white/10 text-white"
          />
        </div>
        {contactError && (
          <p className="mt-3 text-sm text-red-300">{contactError}</p>
        )}
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
        <h3 className="text-xl font-bold text-white mb-3">Local Attorney Network</h3>
        <p className="text-white/70 text-sm">
          Personalize your next step with a nearby attorney network after your scan.
        </p>
        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <Button
            onClick={handleUseLocation}
            disabled={locationStatus === 'locating'}
            className="bg-[#007BFF] text-white hover:bg-[#007BFF]/90"
          >
            {locationStatus === 'locating'
              ? 'Locating...'
              : nearestCity
              ? `Find attorneys in ${nearestCity.name}`
              : 'Use my location'}
          </Button>
          <button
            type="button"
            onClick={handleDemoLocation}
            className="text-sm font-semibold text-[#C6FF4D] hover:text-[#C6FF4D]/80"
          >
            Use demo location
          </button>
        </div>
        {locationStatus === 'found' && nearestCity && (
          <div className="mt-4 bg-[#C6FF4D]/10 border border-[#C6FF4D]/20 rounded-lg p-4 text-white/80 text-sm">
            We can connect you with attorneys in{' '}
            <span className="font-bold text-white">
              {nearestCity.name}{nearestCity.state ? `, ${nearestCity.state}` : ''}
            </span>
            .
          </div>
        )}
        {locationStatus === 'denied' && (
          <p className="mt-3 text-sm text-white/60">
            Location access was denied. You can still use the demo location.
          </p>
        )}
        {locationStatus === 'error' && (
          <p className="mt-3 text-sm text-white/60">
            We could not access location. Try again or use the demo location.
          </p>
        )}
      </div>

      {/* Primary Action */}
      <div className="pt-4">
        <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex flex-col h-full"
        >
          <Button
            onClick={handleAiStrategyFlow}
            className="w-full min-h-[140px] flex flex-col items-center justify-center bg-[#C6FF4D] text-[#0A1A2F] hover:bg-[#C6FF4D]/90 font-bold p-6 rounded-2xl shadow-[0_0_20px_rgba(198,255,77,0.3)] space-y-3"
          >
            <Sparkles className="h-8 w-8 mb-2" />
            <div className="text-xl">Continue to Eligibility</div>
            <span className="text-sm font-normal opacity-80">See if your ticket qualifies for defense</span>
            <div className="flex items-center text-xs font-bold uppercase tracking-wider bg-black/10 px-3 py-1 rounded-full mt-2">
              Next Step <ArrowRight className="ml-1 w-3 h-3" />
            </div>
          </Button>
        </motion.div>
      </div>

      {/* Reset Link */}
      <div className="text-center pt-4">
        <button 
          onClick={onReset} 
          className="text-white/40 hover:text-white flex items-center justify-center gap-2 mx-auto text-sm transition-colors"
        >
          <RefreshCw className="w-4 h-4" /> Scan a different ticket
        </button>
      </div>
    </motion.div>
  );
};

export default TicketAnalysisResults;
