
import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Paperclip, ArrowLeft, Phone, MoreVertical, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';

const AttorneyChat = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { caseData, lawyer } = location.state || {};
  const scrollRef = useRef(null);

  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!caseData || !lawyer) {
      navigate('/upload-ticket');
      return;
    }

    if (messages.length === 0) {
      setTimeout(() => {
        const initialMessage = {
          id: 1,
          sender: 'attorney',
          text: `Hello! You're connected with ${lawyer.name}'s intake team. We received your case file for the ${caseData.violationCode || 'traffic'} violation in ${caseData.city || 'your area'}. We’re reviewing the details now. Do you have any specific questions about the incident?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages([initialMessage]);
      }, 500);
    }
  }, [caseData, lawyer, navigate]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      
      let responseText = "I understand. I'll make a note of that in your file.";
      
      const lowerInput = userMsg.text.toLowerCase();
      if (lowerInput.includes('cost') || lowerInput.includes('price') || lowerInput.includes('fee')) {
        responseText = `Our flat fee of ${lawyer.fee} covers the initial review and case preparation. If we proceed beyond that, we’ll outline any additional costs before moving forward.`;
      } else if (lowerInput.includes('court') || lowerInput.includes('date')) {
        responseText = `Your court date is currently set for ${caseData.courtDate || 'a future date'}. If representation is confirmed, we can file a waiver of appearance where allowed.`;
      } else if (lowerInput.includes('points') || lowerInput.includes('record')) {
        responseText = "Our goal is to reduce or dismiss the charge to help protect your driving record and insurance rates.";
      } else if (lowerInput.includes('guarantee')) {
        responseText = "We can't guarantee outcomes, but we will outline the strongest options available for your situation.";
      }

      const attorneyMsg = {
        id: Date.now() + 1,
        sender: 'attorney',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages((prev) => [...prev, attorneyMsg]);
    }, 2000 + Math.random() * 1000);
  };

  if (!lawyer) return null;

  return (
    <>
      <Helmet>
        <title>Chat with {lawyer.name} - Citation Nation</title>
      </Helmet>

      <div className="flex flex-col h-screen bg-[#0A1A2F] pt-20">
        
        <div className="bg-[#0A1A2F] border-b border-white/10 px-4 py-3 shadow-lg z-10">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate(-1)} 
                className="text-white/70 hover:text-white hover:bg-white/10 -ml-2"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              
              <div className="relative">
                <Avatar className="h-10 w-10 border border-white/20">
                  <AvatarImage src={lawyer.image} alt={lawyer.name} />
                  <AvatarFallback>{lawyer.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#C6FF4D] border-2 border-[#0A1A2F] rounded-full"></span>
              </div>
              
              <div>
                <h2 className="text-white font-bold text-sm sm:text-base flex items-center gap-2">
                  {lawyer.name}
                  <ShieldCheck className="w-3 h-3 text-[#007BFF]" />
                </h2>
                <p className="text-white/50 text-xs flex items-center gap-2">
                  {lawyer.firm} • <span className="text-[#C6FF4D]">Online</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10 hidden sm:inline-flex">
                <Phone className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-grow overflow-hidden relative">
           <div className="absolute inset-0 opacity-5 pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#007BFF] rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#C6FF4D] rounded-full blur-3xl"></div>
           </div>

           <div 
             className="h-full overflow-y-auto p-4 sm:p-6 space-y-6 scroll-smooth"
             ref={scrollRef}
           >
             <div className="max-w-3xl mx-auto space-y-6 pb-4">
                <div className="flex justify-center">
                  <span className="text-xs text-white/30 bg-white/5 px-3 py-1 rounded-full">
                    Today
                  </span>
                </div>

                <AnimatePresence>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex max-w-[85%] sm:max-w-[70%] gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        {msg.sender === 'attorney' && (
                          <Avatar className="h-8 w-8 mt-1 border border-white/10 flex-shrink-0">
                            <AvatarImage src={lawyer.image} />
                            <AvatarFallback>AT</AvatarFallback>
                          </Avatar>
                        )}
                        
                        <div className={`group relative px-4 py-3 rounded-2xl ${
                          msg.sender === 'user' 
                            ? 'bg-[#007BFF] text-white rounded-tr-sm' 
                            : 'bg-white/10 text-white border border-white/10 rounded-tl-sm'
                        }`}>
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                          <span className={`text-[10px] absolute bottom-1 ${
                            msg.sender === 'user' ? 'left-2 text-white/50' : 'right-2 text-white/30'
                          } opacity-0 group-hover:opacity-100 transition-opacity`}>
                            {msg.timestamp}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isTyping && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex gap-3">
                       <Avatar className="h-8 w-8 mt-1 border border-white/10">
                          <AvatarImage src={lawyer.image} />
                          <AvatarFallback>AT</AvatarFallback>
                       </Avatar>
                       <div className="bg-white/10 border border-white/10 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                          <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                          <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce"></span>
                       </div>
                    </div>
                  </motion.div>
                )}
             </div>
           </div>
        </div>

        <div className="bg-[#0A1A2F] border-t border-white/10 p-4">
          <div className="max-w-3xl mx-auto">
             <form onSubmit={handleSendMessage} className="flex items-end gap-3 bg-white/5 border border-white/10 rounded-xl p-2 focus-within:border-white/30 focus-within:bg-white/10 transition-all">
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  className="text-white/50 hover:text-white h-10 w-10 shrink-0 rounded-lg"
                >
                   <Paperclip className="w-5 h-5" />
                </Button>
                
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-white placeholder:text-white/30 min-h-[44px] py-3 px-0 resize-none"
                  autoComplete="off"
                />

                <Button 
                  type="submit" 
                  disabled={!inputMessage.trim() || isTyping}
                  className={`h-10 w-10 shrink-0 rounded-lg transition-all ${
                    inputMessage.trim() 
                      ? 'bg-[#C6FF4D] text-[#0A1A2F] hover:bg-[#C6FF4D]/90' 
                      : 'bg-white/10 text-white/30'
                  }`}
                  size="icon"
                >
                   <Send className="w-4 h-4" />
                </Button>
             </form>
             <div className="text-center mt-2">
                <p className="text-[10px] text-white/30 flex items-center justify-center gap-1">
                   <ShieldCheck className="w-3 h-3" /> Messages are encrypted and privileged attorney-client communication.
                </p>
             </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default AttorneyChat;
