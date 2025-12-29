import React, { useState } from 'react';
import { Upload, File, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * Upload Ticket Demo Component
 * Interactive demo showing the ticket upload process
 */
const UploadDemo = () => {
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    navigate('/upload-ticket');
  };

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[#0A1A2F] to-[#0A1A2F]/95 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
                <div className="mb-8">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
                    Upload Your Ticket in <span className="text-[#C6FF4D]">Seconds</span>
                </h2>
                <p className="text-lg text-white/70">
                    Drag & drop your traffic ticket, or click to browse. Our AI analyzes it instantly to find errors and defense opportunities.
                </p>
                </div>

                <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                >
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`relative border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 cursor-pointer ${
                    isDragging
                        ? 'border-[#C6FF4D] bg-[#C6FF4D]/10'
                        : 'border-white/30 bg-white/5 hover:border-[#007BFF] hover:bg-white/10'
                    }`}
                    onClick={() => navigate('/upload-ticket')}
                >
                    <Upload className="h-16 w-16 text-[#007BFF] mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-2">
                    Drop Your Ticket Here
                    </h3>
                    <p className="text-white/70 mb-6">
                    or click to select from your device
                    </p>
                    <Button className="bg-[#007BFF] text-white hover:bg-[#007BFF]/90 font-bold px-8 py-3 rounded-full">
                    Browse Files
                    </Button>

                    <div className="mt-8 flex items-center justify-center gap-6 text-sm text-white/50">
                    <div className="flex items-center gap-2">
                        <File className="h-4 w-4" />
                        <span>PDF, JPG, PNG</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        <span>Max 10MB</span>
                    </div>
                    </div>
                </div>
                </motion.div>
            </div>

            <div className="relative h-64 sm:h-96 lg:h-full lg:min-h-[500px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl mt-8 lg:mt-0">
                 <img 
                    className="absolute inset-0 w-full h-full object-cover" 
                    alt="Close up of a speeding ticket"
                 src="https://images.unsplash.com/photo-1597183298696-62d1f645a07c" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A2F] via-[#0A1A2F]/50 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                     <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-[#007BFF] rounded-full flex items-center justify-center">
                                <CheckCircle className="text-white w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white">AI Analysis Ready</h4>
                                <p className="text-white/70 text-sm">Identifying violation codes...</p>
                            </div>
                        </div>
                        <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                             <div className="bg-[#C6FF4D] h-full w-3/4"></div>
                        </div>
                     </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default UploadDemo;