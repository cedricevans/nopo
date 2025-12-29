import React from 'react';
import { Button } from '@/components/ui/button';
import { Dumbbell, Activity, Expand as Stretch } from 'lucide-react'; // Updated icons

const Hero = ({ onStart }) => {
  return (
    <section className="relative w-full min-h-screen h-auto flex flex-col items-center justify-center overflow-hidden py-16 md:h-screen md:py-0">
      <div
        className="absolute top-8 left-4 sm:left-6 lg:left-8 z-20 flex items-center space-x-2 text-white"
      >
        <Dumbbell className="h-10 w-10 text-[#B1F82A]" />
        <span className="text-3xl font-bold">FitGen</span>
      </div>

      <div className="absolute inset-0">
        <img
          src="https://horizons-cdn.hostinger.com/5227e500-5420-4761-b19c-43c983dcdd87/eff4f6583bc6e3772ebc771a4afcf413.png"
          alt="Athlete working out with dumbbells on a rooftop at sunset"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-24 md:pt-0">
        <div
          className="max-w-lg"
        >
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mt-10"
          >
            Unlock Your <span className="text-[#B1F82A]">Potential</span>
            <br />
            Personalized Workouts
          </h1>
          <p
            className="mt-4 text-lg text-gray-300 max-w-md"
          >
            Generate custom workout plans tailored to your body, goals, and fitness level.
            Start your transformation today!
          </p>
          <div className="mt-8">
            <Button
              onClick={() => onStart()}
              className="py-4 text-lg font-semibold rounded-full bg-[#B1F82A] text-black hover:bg-[#B1F82A]/90 transition-all duration-300 shadow-lg hover:shadow-xl"
              size="lg"
            >
              Generate workout plan
            </Button>
          </div>
          <div className="mt-8 flex items-center gap-4">
            <div className="flex -space-x-4">
              <img class="w-12 h-12 rounded-full border-2 border-yellow-400 object-cover" alt="Happy user 1" src="https://images.unsplash.com/photo-1554324178-c81140f30897" />
              <img class="w-12 h-12 rounded-full border-2 border-blue-400 object-cover" alt="Happy user 2" src="https://images.unsplash.com/photo-1694858532747-c6ab526ea760" />
              <img class="w-12 h-12 rounded-full border-2 border-purple-400 object-cover" alt="Happy user 3" src="https://images.unsplash.com/photo-1488475105717-be5a9aa6ad97" />
              <img class="w-12 h-12 rounded-full border-2 border-red-400 object-cover" alt="Happy user 4" src="https://images.unsplash.com/photo-1539345834552-944c6df41392" />
              <img class="w-12 h-12 rounded-full border-2 border-teal-400 object-cover" alt="Happy user 5" src="https://images.unsplash.com/photo-1615055257430-4e7c64110317" />
            </div>
            <div>
              <p className="font-bold text-white text-lg">168K+</p>
              <p className="text-sm text-gray-300">Realtime Users</p>
            </div>
          </div>
        </div>

        <div 
          className="flex flex-col gap-4 justify-center mt-8 md:mt-0"
        >
          <div
            onClick={() => onStart()}
            className="cursor-pointer bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 flex items-center text-left"
          >
            <Dumbbell size={32} className="text-[#B1F82A] mr-4 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-bold text-white">Strength</h3>
              <p className="text-gray-300 text-sm">Build muscle and power with our targeted workouts.</p>
            </div>
          </div>
          <div
            onClick={() => onStart()}
            className="cursor-pointer bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 flex items-center text-left"
          >
            <Activity size={32} className="text-[#B1F82A] mr-4 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-bold text-white">Endurance</h3>
              <p className="text-gray-300 text-sm">Boost your stamina and go the extra mile.</p>
            </div>
          </div>
          <div
            onClick={() => onStart()}
            className="cursor-pointer bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 flex items-center text-left"
          >
            <Stretch size={32} className="text-[#B1F82A] mr-4 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-bold text-white">Mobility</h3>
              <p className="text-gray-300 text-sm">Improve flexibility and range of motion for life.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;