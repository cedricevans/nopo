import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Star, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Attorney = () => {
  const navigate = useNavigate();
  const attorneys = [
    {
      name: 'Ulyses Reyes',
      years: '12+ years',
      cases: '5,200+ cases',
      rating: '4.8 outcome rating',
      image: 'https://i.pravatar.cc/200?img=12',
    },
    {
      name: 'Elena Park',
      years: '9+ years',
      cases: '3,100+ cases',
      rating: '4.9 outcome rating',
      image: 'https://i.pravatar.cc/200?img=32',
    },
    {
      name: 'Marcus Bennett',
      years: '14+ years',
      cases: '6,400+ cases',
      rating: '4.7 outcome rating',
      image: 'https://i.pravatar.cc/200?img=22',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Meet Your Defense Team - Citation Nation</title>
        <meta name="description" content="Get to know your defense team and the attorneys who will handle your case." />
      </Helmet>

      <main className="min-h-screen pt-32 pb-16 relative">
        <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1521790797524-b2497295b8a0?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10 pointer-events-none"></div>
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0A1A2F] via-[#0A1A2F]/95 to-[#0A1A2F]"></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
              Meet Your Defense Team
            </h1>
            <p className="text-lg text-white/70">
              You can message your legal team anytime through the app.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {attorneys.map((attorney) => (
              <div
                key={attorney.name}
                className="bg-white/5 border border-white/10 rounded-3xl p-6"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={attorney.image}
                    alt={`${attorney.name} profile`}
                    className="w-14 h-14 rounded-full object-cover border-2 border-[#C6FF4D]/40"
                  />
                  <div>
                    <h3 className="text-white font-bold text-lg">{attorney.name}</h3>
                    <p className="text-white/60 text-sm">{attorney.years}</p>
                  </div>
                </div>
                <div className="text-white/70 text-sm space-y-2 mb-4">
                  <div>{attorney.cases}</div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-[#C6FF4D]" />
                    <span>{attorney.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-white/60 text-xs">
                  <MessageCircle className="w-4 h-4" />
                  Direct message available in app
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button
              onClick={() => navigate('/dashboard')}
              className="bg-[#C6FF4D] text-[#0A1A2F] hover:bg-[#C6FF4D]/90 font-bold py-5 px-10 rounded-full"
            >
              Continue to Case Dashboard
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Attorney;
