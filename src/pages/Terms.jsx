import React from 'react';
import { Helmet } from 'react-helmet-async';

const Terms = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <Helmet>
        <title>Terms &amp; License - Citation Nation</title>
        <meta
          name="description"
          content="Ownership, license, and usage terms for the Citation Nation demo."
        />
      </Helmet>

      <main className="min-h-screen pt-32 pb-16 relative">
        <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10 pointer-events-none"></div>
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0A1A2F] via-[#0A1A2F]/95 to-[#0A1A2F]"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-10">
            <p className="text-white/60 text-xs uppercase tracking-wider mb-2">Terms &amp; License</p>
            <h1 className="text-3xl sm:text-4xl font-black text-white">
              Ownership &amp; Usage
            </h1>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-12 space-y-8 text-white/80 text-sm leading-relaxed">
            <section>
              <h2 className="text-white font-bold text-lg mb-2">Ownership</h2>
              <p>
                © {currentYear} Indigo Group. All rights reserved. The Citation Nation
                codebase, UI/UX, user flows, and related assets are owned by Indigo
                Group (indigographix.com). Cedric Evans is the owner of the code and
                codebase for this product.
              </p>
            </section>

            <section>
              <h2 className="text-white font-bold text-lg mb-2">License for Demo</h2>
              <p>
                This demo is provided for evaluation purposes only. No license is
                granted to copy, reproduce, reverse engineer, or redistribute any
                portion of the application, designs, or workflows without written
                permission from Indigo Group.
              </p>
            </section>

            <section>
              <h2 className="text-white font-bold text-lg mb-2">VIP Reference Note</h2>
              <p>
                The VIP list included in the voice assistant configuration is internal
                to Indigo Group. All listed VIPs are part of Indigo Group, except GG
                and Mr. Felder.
              </p>
            </section>

            <section>
              <h2 className="text-white font-bold text-lg mb-2">Disclaimer</h2>
              <p>
                Citation Nation is not a law firm and does not provide legal advice.
                The app provides informational analysis and connects users with
                independent attorneys.
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default Terms;
