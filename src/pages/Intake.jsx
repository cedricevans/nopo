
import React from 'react';
import { useLocation } from 'react-router-dom';
import IntakeWizard from '@/components/intake/IntakeWizard';
import { Helmet } from 'react-helmet-async';

const Intake = () => {
  const location = useLocation();
  const { prefilledData, ticketImage } = location.state || {};

  return (
    <>
      <Helmet>
        <title>Case Intake - Citation Nation</title>
        <meta name="description" content="Provide details about your traffic ticket to generate a custom defense strategy." />
      </Helmet>
      
      <main className="min-h-screen pt-20 pb-16 bg-[#0A1A2F]">
         <IntakeWizard 
            initialData={prefilledData} 
            ticketImage={ticketImage}
         />
      </main>
    </>
  );
};

export default Intake;
