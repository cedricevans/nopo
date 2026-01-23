import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, FileText, Gavel, Flag, AlertCircle } from 'lucide-react';

const stages = [
  { id: 'submitted', label: 'Intake Submitted', icon: FileText, desc: 'We have received your details.' },
  { id: 'review', label: 'Case Review', icon: Clock, desc: 'Our experts are analyzing the violation.' },
  { id: 'defense_built', label: 'Defense Built', icon: Gavel, desc: 'Your strategy is ready.' },
  { id: 'filing', label: 'Court Filing', icon: Flag, desc: 'Documents submitted to court.' },
  { id: 'resolved', label: 'Resolved', icon: CheckCircle, desc: 'Case closed. Outcome available.' },
];

const TicketStatus = ({ ticket }) => {
  const currentStageIndex = stages.findIndex(s => s.id === ticket.status) || 0;
  
  // Calculate progress percentage for bar
  const progress = (currentStageIndex / (stages.length - 1)) * 100;

  return (
    <div className="bg-[#0A1A2F] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-8 border-b border-white/10 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Case #{ticket.ticket_number}</h2>
          <p className="text-white/60">Filed on {new Date(ticket.created_at).toLocaleDateString()}</p>
        </div>
        <div className="bg-[#C6FF4D]/10 text-[#C6FF4D] px-4 py-2 rounded-full font-bold border border-[#C6FF4D]/20 capitalize">
           Status: {stages[currentStageIndex]?.label || ticket.status}
        </div>
      </div>

      {/* Progress Tracker */}
      <div className="relative mb-12 px-4 mt-8">
        {/* Progress Bar Background */}
        <div className="absolute top-5 left-0 w-full h-1 bg-white/10 rounded-full -z-10"></div>
        {/* Active Progress */}
        <div 
            className="absolute top-5 left-0 h-1 bg-[#007BFF] rounded-full -z-10 transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
        ></div>

        <div className="flex justify-between items-start w-full">
          {stages.map((stage, index) => {
            const Icon = stage.icon;
            const isCompleted = index <= currentStageIndex;
            const isCurrent = index === currentStageIndex;

            return (
              <div key={stage.id} className="flex flex-col items-center flex-1">
                <div 
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border-4 transition-all duration-500 z-10 bg-[#0A1A2F] ${
                    isCompleted 
                      ? 'border-[#007BFF] text-[#007BFF]' 
                      : 'border-white/10 text-white/30'
                  } ${isCurrent ? 'scale-110 shadow-[0_0_20px_rgba(0,123,255,0.5)] border-[#C6FF4D] text-[#C6FF4D]' : ''}`}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className={`mt-4 text-center transition-opacity duration-500 ${isCompleted ? 'opacity-100' : 'opacity-40'}`}>
                  <p className={`text-xs sm:text-sm font-bold mb-1 ${isCurrent ? 'text-[#C6FF4D]' : 'text-white'}`}>{stage.label}</p>
                  <p className="hidden md:block text-[10px] sm:text-xs text-white/60 max-w-[80px] mx-auto leading-tight">{stage.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Case Details Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/5 rounded-xl p-6 mb-8">
          <div>
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-[#C6FF4D]" />
                Next Steps
            </h3>
            <p className="text-white/70 text-sm">
                {currentStageIndex === 0 && "We are currently assigning a specialist to review your case details. Expect an update within 24 hours."}
                {currentStageIndex === 1 && "Our AI and legal team are analyzing your violation for potential dismissal grounds."}
                {currentStageIndex === 2 && "Defense strategy formulated. We are preparing documents for the court."}
                {currentStageIndex === 3 && "Waiting for court response. This can take 2-4 weeks depending on the jurisdiction."}
                {currentStageIndex === 4 && "Case closed. Check your email for the final disposition and fine reduction details."}
            </p>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Estimated Completion</h3>
            <p className="text-3xl font-black text-white">
                {currentStageIndex === 4 ? "Completed" : "Oct 30, 2026"}
            </p>
            <p className="text-white/50 text-xs mt-1">Timeline is an estimate based on court load.</p>
          </div>
      </div>
    </div>
  );
};

export default TicketStatus;