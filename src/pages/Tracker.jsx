
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Search, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/customSupabaseClient';
import TicketStatus from '@/components/tracker/TicketStatus';
import { useToast } from '@/components/ui/use-toast';

const Tracker = () => {
  const [searchParams] = useSearchParams();
  const [ticketNumber, setTicketNumber] = useState('CN-104928');
  const [email, setEmail] = useState('joe.doe@mail.com');
  const [loading, setLoading] = useState(false);
  const [ticketData, setTicketData] = useState(null);
  const { toast } = useToast();

  const demoTicket = {
    ticket_number: 'CN-104928',
    email: 'joe.doe@mail.com',
    status: 'defense_built',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString()
  };

  useEffect(() => {
    const ticketParam = searchParams.get('ticket');
    const emailParam = searchParams.get('email');
    if (ticketParam) setTicketNumber(ticketParam);
    if (emailParam) setEmail(emailParam);
    
    if (ticketParam && emailParam) {
        fetchTicket(ticketParam, emailParam);
    }
  }, [searchParams]);

  const fetchTicket = async (tNum, tEmail) => {
    setLoading(true);
    setTicketData(null);
    try {
        if (
          tNum.trim().toLowerCase() === demoTicket.ticket_number.toLowerCase() &&
          tEmail.trim().toLowerCase() === demoTicket.email.toLowerCase()
        ) {
            setTicketData(demoTicket);
            return;
        }
        const { data, error } = await supabase
            .from('cases')
            .select('*')
            .eq('ticket_number', tNum)
            .eq('email', tEmail)
            .single();

        if (error) throw error;
        if (data) {
            setTicketData(data);
        } else {
            toast({
                variant: "destructive",
                title: "Ticket Not Found",
                description: "We couldn't find a ticket with those details.",
            });
        }
    } catch (err) {
        console.error(err);
        if (err.code !== 'PGRST116') {
             toast({
                variant: "destructive",
                title: "Error",
                description: "Something went wrong while searching.",
            });
        } else {
             toast({
                variant: "destructive",
                title: "Not Found",
                description: "No record matches that ticket number and email.",
            });
        }
    } finally {
        setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!ticketNumber || !email) {
         toast({
            variant: "destructive",
            title: "Missing Information",
            description: "Please enter both Ticket Number and Email.",
        });
        return;
    }
    fetchTicket(ticketNumber, email);
  };

  return (
    <>
      <Helmet>
        <title>Track Your Ticket - Citation Nation</title>
        <meta name="description" content="Check the real-time status of your traffic ticket case." />
      </Helmet>

      <main className="min-h-screen pt-32 pb-20 relative">
        <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10 pointer-events-none"></div>
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0A1A2F] via-[#0A1A2F]/90 to-[#0A1A2F]"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
              Track Your <span className="text-[#C6FF4D]">Case Status</span>
            </h1>
            <p className="text-lg text-white/70">
              Enter your ticket number to see real-time updates on your defense.
            </p>
          </div>

          {!ticketData ? (
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl max-w-xl mx-auto">
                <form onSubmit={handleSearch} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="ticketNumber" className="text-white">Ticket Number</Label>
                        <Input 
                            id="ticketNumber" 
                            value={ticketNumber} 
                            onChange={(e) => setTicketNumber(e.target.value)} 
                            placeholder="e.g. CN-X9Y2Z"
                            className="bg-white/5 border-white/20 text-white h-12"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-white">Email Address</Label>
                        <Input 
                            id="email" 
                            type="email"
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="john@example.com"
                            className="bg-white/5 border-white/20 text-white h-12"
                        />
                    </div>
                    <Button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-[#007BFF] text-white hover:bg-[#007BFF]/90 font-bold h-12 rounded-full text-lg mt-4"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <><Search className="mr-2 h-5 w-5" /> Track Ticket</>}
                    </Button>
                </form>
            </div>
          ) : (
            <div>
                 <Button 
                    variant="ghost" 
                    onClick={() => setTicketData(null)}
                    className="mb-6 text-white/60 hover:text-white pl-0"
                 >
                    ← Search Another Ticket
                 </Button>
                 <TicketStatus ticket={ticketData} />
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Tracker;
