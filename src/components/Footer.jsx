import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Twitter, Linkedin, Facebook, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050e19] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-[#007BFF]/10 border border-[#007BFF]/20 group-hover:bg-[#007BFF]/20 transition-colors">
                <Shield className="w-6 h-6 text-[#007BFF]" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                Citation Nation
              </span>
            </Link>
            <p className="text-sm text-white/50 leading-relaxed">
              Empowering drivers with AI-driven analysis and connecting them with top-tier legal defense professionals.
            </p>
            <div className="flex gap-4">
              <SocialLink href="#" icon={Twitter} />
              <SocialLink href="#" icon={Linkedin} />
              <SocialLink href="#" icon={Facebook} />
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h3 className="text-white font-bold mb-6">Platform</h3>
            <ul className="space-y-4">
              <FooterLink to="/about-app">About This App</FooterLink>
              <FooterLink to="/how-it-works">How It Works</FooterLink>
              <FooterLink to="/pricing">Pricing</FooterLink>
              <FooterLink to="/tracker">Track Ticket</FooterLink>
              <FooterLink to="/upload-ticket">Start Intake</FooterLink>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="text-white font-bold mb-6">Legal</h3>
            <ul className="space-y-4">
              <FooterLink to="/legal-disclaimer">Disclaimer</FooterLink>
              <FooterLink to="/legal-disclaimer">Privacy Policy</FooterLink>
              <FooterLink to="/terms">Terms &amp; License</FooterLink>
              <li className="text-xs text-white/30 pt-2 leading-relaxed">
                * Citation Nation is not a law firm. We provide informational analysis and connect users to independent attorneys.
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-white font-bold mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-white/60">
                <MapPin className="w-5 h-5 text-[#007BFF] shrink-0" />
                <span>123 Legal Tech Blvd<br />San Francisco, CA 94105</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Mail className="w-5 h-5 text-[#007BFF] shrink-0" />
                <a href="mailto:support@citationnation.com" className="hover:text-white transition-colors">support@citationnation.com</a>
              </li>
              <li>
                <Button asChild variant="outline" size="sm" className="mt-2 border-white/10 hover:bg-white/5 text-white w-full">
                  <Link to="/contact">Contact Support</Link>
                </Button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mb-10 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 md:px-6 md:py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/40">Investor Guide</p>
            <p className="text-sm text-white/80 mt-2">
              Review the full pricing ladder, partnership paths, and white-label roadmap. If you are exploring
              strategic investment or channel partnership, start here.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button asChild variant="outline" size="sm" className="border-white/15 hover:bg-white/10 text-white">
              <Link to="/investor-guide">Open Investor Guide</Link>
            </Button>
            <Button asChild size="sm" className="bg-[#C6FF4D] text-[#0A1A2F] hover:bg-[#C6FF4D]/90">
              <Link to="/law-firm-guide">Law Firm Buying Guide</Link>
            </Button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40">
            © {currentYear} Indigo Group. All rights reserved.{' '}
            <a href="https://indigographix.com" className="hover:text-white transition-colors">indigographix.com</a>
          </p>
          <div className="flex gap-6 text-xs text-white/40">
             <span>v2.1.0 (Stable)</span>
             <span>Status: All Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ to, children }) => (
  <li>
    <Link to={to} className="text-sm text-white/60 hover:text-[#C6FF4D] transition-colors">
      {children}
    </Link>
  </li>
);

const SocialLink = ({ href, icon: Icon }) => (
  <a 
    href={href} 
    className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:bg-[#007BFF] hover:text-white transition-all"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Icon className="w-4 h-4" />
  </a>
);

export default Footer;
