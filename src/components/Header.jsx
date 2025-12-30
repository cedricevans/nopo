
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Menu, X, Search, Upload, BookOpen, Info, Phone, DollarSign, Lightbulb, ChevronRight, Mail, Instagram, Twitter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Quick Tips', path: '/quick-tips', icon: Lightbulb },
    { name: 'Pricing', path: '/pricing', icon: DollarSign },
    { name: 'How It Works', path: '/how-it-works', icon: Info },
    { name: 'Recent Results', path: '/case-results', icon: Shield },
  ];

  const isActive = (path) => location.pathname === path;

  // Animation variants for staggered reveal
  const menuVariants = {
    hidden: { 
      opacity: 0,
      y: -10,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.2,
        when: "beforeChildren",
        staggerChildren: 0.05
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2,
        when: "afterChildren",
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -10 }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-[#0A1A2F]/95 backdrop-blur-md border-b border-white/10 shadow-lg supports-[backdrop-filter]:bg-[#0A1A2F]/80">
      <div className="bg-[#071225] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-10 flex items-center justify-between text-xs text-white/70">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C6FF4D]" />
                (305) 555-0199
              </span>
              <span className="hidden sm:flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C6FF4D]" />
                support@citationnation.com
              </span>
            </div>
            <div className="flex items-center gap-3">
              <a href="https://twitter.com" className="hover:text-white transition-colors" aria-label="Twitter">
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a href="https://instagram.com" className="hover:text-white transition-colors" aria-label="Instagram">
                <Instagram className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 relative z-[101]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group relative z-[102]" onClick={() => setIsOpen(false)}>
            <div className="bg-gradient-to-tr from-[#007BFF] to-[#C6FF4D] p-2 rounded-lg group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(0,123,255,0.3)]">
              <Shield className="h-6 w-6 text-[#0A1A2F] fill-current" />
            </div>
            <span className="text-xl font-black text-white tracking-tight">
              Citation<span className="text-[#007BFF]">Nation</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-bold transition-all hover:text-[#C6FF4D] hover:scale-105 flex items-center gap-2 ${
                    isActive(link.path) ? 'text-[#C6FF4D]' : 'text-white/80'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.name}
                </Link>
              );
            })}
            
            <Link 
              to="/resources" 
              className={`flex items-center gap-2 text-sm font-bold transition-all hover:text-[#C6FF4D] hover:scale-105 ${
                isActive('/resources') ? 'text-[#C6FF4D]' : 'text-white/80'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Resources
            </Link>

            <Link 
              to="/tracker"
              className={`flex items-center gap-2 text-sm font-bold transition-all hover:text-[#C6FF4D] hover:scale-105 ${
                isActive('/tracker') ? 'text-[#C6FF4D]' : 'text-white/80'
              }`}
            >
              <Search className="w-4 h-4" />
              My Case
            </Link>
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/upload-ticket">
              <Button className="bg-[#C6FF4D] text-[#0A1A2F] hover:bg-[#C6FF4D]/90 font-bold rounded-full px-6 shadow-[0_0_15px_rgba(198,255,77,0.3)] hover:shadow-[0_0_25px_rgba(198,255,77,0.5)] transition-all duration-300 flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Upload Ticket
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            className="lg:hidden p-2 text-white hover:bg-white/10 active:bg-white/20 rounded-lg transition-colors z-[102] relative flex items-center justify-center"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            type="button"
          >
            {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu-overlay"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 top-[120px] bg-[#0A1A2F]/95 backdrop-blur-xl z-[100] overflow-y-auto lg:hidden flex flex-col border-t border-white/10"
            style={{ height: 'calc(100dvh - 120px)' }} // Account for mini bar + main header
          >
            <div className="flex flex-col p-6 min-h-full">
              
              {/* Primary Actions Section */}
              <div className="grid grid-cols-1 gap-4 mb-8">
                <motion.div variants={itemVariants}>
                  <Link to="/upload-ticket" onClick={() => setIsOpen(false)} className="block">
                    <Button className="w-full bg-[#C6FF4D] text-[#0A1A2F] hover:bg-[#C6FF4D]/90 font-bold rounded-xl h-14 text-base shadow-lg flex items-center justify-center gap-2.5">
                      <Upload className="w-5 h-5" />
                      Upload Your Ticket
                    </Button>
                  </Link>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <Link to="/resources" onClick={() => setIsOpen(false)} className="block">
                    <Button variant="outline" className="w-full bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-[#C6FF4D] hover:border-[#C6FF4D]/30 font-bold rounded-xl h-14 text-base flex items-center justify-center gap-2.5 transition-all">
                      <BookOpen className="w-5 h-5" />
                      View Resources
                    </Button>
                  </Link>
                </motion.div>
              </div>

              {/* Navigation Links */}
              <div className="space-y-1">
                <motion.p variants={itemVariants} className="text-white/40 text-xs font-bold uppercase tracking-wider px-4 mb-2">
                  Menu
                </motion.p>
                
                {/* My Case Link (Styled specially) */}
                <motion.div variants={itemVariants}>
                   <Link
                    to="/tracker"
                    onClick={() => setIsOpen(false)}
                    className={`group flex items-center justify-between p-4 rounded-xl transition-all border ${
                      isActive('/tracker') 
                        ? 'bg-[#007BFF]/10 border-[#007BFF]/30' 
                        : 'hover:bg-white/5 border-transparent hover:border-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                        isActive('/tracker') ? 'bg-[#007BFF] text-white' : 'bg-[#007BFF]/10 text-[#007BFF] group-hover:bg-[#007BFF] group-hover:text-white'
                      }`}>
                        <Search className="w-5 h-5" />
                      </div>
                      <span className={`text-base font-bold ${
                        isActive('/tracker') ? 'text-white' : 'text-white group-hover:text-[#C6FF4D]'
                      }`}>My Case</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-white/60" />
                  </Link>
                </motion.div>

                {/* Standard Links */}
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const active = isActive(link.path);
                  
                  return (
                    <motion.div variants={itemVariants} key={link.name}>
                      <Link
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={`group flex items-center justify-between p-4 rounded-xl transition-all border ${
                          active 
                            ? 'bg-white/10 border-white/10' 
                            : 'hover:bg-white/5 border-transparent hover:border-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                            active ? 'bg-white text-[#0A1A2F]' : 'bg-white/5 text-white/60 group-hover:bg-white/20 group-hover:text-white'
                          }`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className={`text-base font-bold transition-colors ${
                            active ? 'text-white' : 'text-white/90 group-hover:text-[#C6FF4D]'
                          }`}>
                            {link.name}
                          </span>
                        </div>
                        <ChevronRight className={`w-5 h-5 transition-colors ${
                          active ? 'text-white' : 'text-white/20 group-hover:text-white/60'
                        }`} />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
              
              <motion.div variants={itemVariants} className="mt-auto pt-8 pb-4 text-center">
                 <p className="text-white/20 text-xs font-medium">© 2026 Citation Nation</p>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
