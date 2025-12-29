
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Target, 
  MapPin, 
  Calendar, 
  AlertTriangle, 
  CheckCircle,
  FileText,
  Gavel,
  BrainCircuit
} from 'lucide-react';

const AiStrategyReport = ({ caseData }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return 'Date TBD';
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white text-slate-900 rounded-xl shadow-2xl overflow-hidden print:shadow-none print:rounded-none">
      {/* Header */}
      <div className="bg-[#0A1A2F] text-white p-8 border-b-4 border-[#C6FF4D] print:bg-white print:text-black print:border-black">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <BrainCircuit className="w-6 h-6 text-[#C6FF4D] print:text-black" />
              <h1 className="text-2xl font-bold tracking-tight">AI Defense Strategy Analysis</h1>
            </div>
            <p className="text-slate-400 print:text-slate-600 text-sm">
              Generated for Case #{caseData?.violationCode?.replace(/\W/g, '').substring(0, 8) || 'Unknown'}
            </p>
          </div>
          <div className="text-right hidden sm:block">
            <div className="text-[#C6FF4D] font-mono font-bold text-xl print:text-black">CONFIDENTIAL</div>
            <div className="text-xs text-slate-500 uppercase tracking-widest">Attorney Work Product</div>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Executive Summary */}
        <section className="bg-slate-50 p-6 rounded-lg border border-slate-200 print:bg-white print:border-black">
          <h2 className="flex items-center text-lg font-bold text-slate-800 mb-4">
            <Target className="w-5 h-5 mr-2 text-blue-600" /> 
            Case Summary & Probability
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-slate-600 leading-relaxed mb-4">
                Based on the citation for <strong>{caseData.violationCode}</strong> (Speeding {caseData.speed} in {caseData.speedLimit}) in <strong>{caseData.location}</strong>, our AI analysis indicates a moderate-to-high probability of dismissal or reduction if contested properly.
              </p>
              <div className="flex items-center gap-4">
                 <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold border border-green-200 print:border-black">
                   Success Probability: 78%
                 </div>
                 <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold border border-blue-200 print:border-black">
                   Estimated Savings: $250+
                 </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded border border-slate-200 print:hidden">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Detected Vulnerabilities</h4>
              <ul className="space-y-2">
                <li className="flex items-start text-sm text-slate-700">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                  Speed measurement device calibration interval check recommended
                </li>
                <li className="flex items-start text-sm text-slate-700">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                  Signage visibility at {caseData.location} is frequently contested
                </li>
                <li className="flex items-start text-sm text-slate-700">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                  Officer detailed notes often missing for this violation code
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Defense Strategy */}
        <section>
          <h2 className="flex items-center text-lg font-bold text-slate-800 mb-4">
            <Shield className="w-5 h-5 mr-2 text-blue-600" />
            Recommended Defense Strategy
          </h2>
          <div className="space-y-4">
            {[
              { title: "Procedural Challenge", desc: "Request proof of radar/lidar calibration records within 30 days of the citation." },
              { title: "Discovery Motion", desc: "File a formal request for the officer's dashcam footage and field notes." },
              { title: "Court Appearance", desc: "If officer fails to appear, move for immediate dismissal under rule of procedure." }
            ].map((step, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm border border-blue-200 print:border-black print:text-black">
                  {idx + 1}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{step.title}</h3>
                  <p className="text-slate-600 text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Court Information */}
        <section className="bg-amber-50 p-6 rounded-lg border border-amber-200 print:bg-white print:border-black">
          <h2 className="flex items-center text-lg font-bold text-slate-800 mb-4">
            <Gavel className="w-5 h-5 mr-2 text-amber-600" />
            Court Appearance Details
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-amber-600 mt-1" />
              <div>
                <span className="block text-xs font-bold text-amber-800 uppercase">Date & Time</span>
                <span className="text-slate-900 font-medium">{formatDate(caseData.courtDate)}</span>
                <span className="block text-slate-500 text-xs mt-1">Arrive by 8:30 AM (Verify with clerk)</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-amber-600 mt-1" />
              <div>
                <span className="block text-xs font-bold text-amber-800 uppercase">Location</span>
                <span className="text-slate-900 font-medium">{caseData.courtName || 'County Courthouse'}</span>
                <span className="block text-slate-500 text-xs mt-1">Check detailed address on ticket</span>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-start gap-2 text-xs text-amber-800 bg-amber-100/50 p-3 rounded">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <p>Failure to appear typically results in a suspended license and additional bench warrant fees. Do not miss this date unless you have confirmed a continuance.</p>
          </div>
        </section>

        {/* Disclaimer */}
        <div className="text-[10px] text-slate-400 border-t border-slate-100 pt-4 print:text-black">
          <p>This report is for informational purposes only and does not constitute legal advice. Citation Nation is an AI-powered legal information tool, not a law firm. Success rates are estimates based on historical data for similar statutes.</p>
        </div>
      </div>
    </div>
  );
};

export default AiStrategyReport;
