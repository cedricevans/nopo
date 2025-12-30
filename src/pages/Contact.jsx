
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      variant: 'success',
      title: 'Message sent successfully!',
      description: 'We\'ll get back to you within 24 hours.',
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'support@citationnation.com',
      link: 'mailto:support@citationnation.com',
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '1-800-CITATION',
      link: 'tel:1-800-248-2846',
    },
    {
      icon: MapPin,
      title: 'Address',
      content: '123 Legal Street, Suite 100, City, State 12345',
      link: null,
    },
    {
      icon: Clock,
      title: 'Hours',
      content: 'Mon-Fri: 9AM-6PM EST',
      link: null,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us - Citation Nation</title>
        <meta name="description" content="Get in touch with Citation Nation. We're here to help with your traffic ticket questions and concerns." />
      </Helmet>

      <main className="min-h-screen pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6">
              Get in <span className="text-[#C6FF4D]">Touch</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Have questions? We're here to help. Reach out to our support team.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 sm:p-12">
              <h2 className="text-2xl font-bold text-white mb-6">Send us a message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-white mb-2">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-white mb-2">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="subject" className="text-white mb-2">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="text-white mb-2">Message</Label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full bg-white/5 border border-white/20 text-white placeholder:text-white/50 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
                    placeholder="Tell us more about your question or concern..."
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#C6FF4D] text-[#0A1A2F] hover:bg-[#C6FF4D]/90 font-bold py-4 rounded-full text-lg"
                >
                  Send Message
                </Button>
              </form>
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl overflow-hidden h-48 border border-white/10 shadow-lg mb-6 relative">
                 <img 
                    className="w-full h-full object-cover" 
                    alt="Map location of office"
                 src="https://images.unsplash.com/photo-1587937533522-b2294fd611f5" />
                <div className="absolute inset-0 bg-[#007BFF]/10"></div>
              </div>

              <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#007BFF]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <info.icon className="h-6 w-6 text-[#007BFF]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">{info.title}</h3>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-white/70 hover:text-[#C6FF4D] transition-colors"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-white/70">{info.content}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <div className="bg-gradient-to-r from-[#007BFF]/20 to-[#C6FF4D]/20 border border-white/20 rounded-2xl p-8 mt-8">
                <h3 className="text-xl font-bold text-white mb-4">Quick Response Guarantee</h3>
                <p className="text-white/70">
                  We typically respond to all inquiries within 24 hours during business days. For urgent matters, please call our support line.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Contact;
