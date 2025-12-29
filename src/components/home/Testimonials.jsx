import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Testimonials Component
 * Displays customer testimonials and reviews
 */
const Testimonials = () => {
  const testimonials = [
    {
      name: 'Sarah Martinez',
      role: 'Small Business Owner',
      rating: 5,
      text: 'Citation Nation saved me $350 and 4 points on my license. The AI analysis was spot-on and the defense strategy worked perfectly in court.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    },
    {
      name: 'David Chen',
      role: 'Software Engineer',
      rating: 5,
      text: "I was skeptical at first, but the detailed analysis gave me the confidence to fight my ticket. Dismissed in court thanks to their strategy!",
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    },
    {
      name: 'Jessica Williams',
      role: 'Teacher',
      rating: 5,
      text: 'The process was so simple! Upload, analyze, and get a defense strategy in minutes. Worth every penny to avoid points on my record.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#0A1A2F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
            What Our <span className="text-[#007BFF]">Clients Say</span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Join thousands of satisfied customers who successfully fought their tickets
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-[#C6FF4D] text-[#C6FF4D]" />
                ))}
              </div>
              <p className="text-white/80 mb-6 italic">&ldquo;{testimonial.text}&rdquo;</p>
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-bold text-white">{testimonial.name}</div>
                  <div className="text-sm text-white/60">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;