
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  User, 
  Car, 
  AlertTriangle, 
  Gavel, 
  FileText,
  Sparkles,
  Maximize2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const steps = [
  { id: 'driver', title: 'Driver Info', icon: User },
  { id: 'vehicle', title: 'Vehicle', icon: Car },
  { id: 'violation', title: 'Violation', icon: AlertTriangle },
  { id: 'court', title: 'Court', icon: Gavel },
  { id: 'review', title: 'Review', icon: FileText },
];

const IntakeWizard = ({ initialData, ticketImage }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    dlNumber: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    plateNumber: '',
    violationCode: '',
    speed: '',
    speedLimit: '',
    location: '',
    courtDate: '',
    courtName: '',
  });
  const [isImageExpanded, setIsImageExpanded] = useState(false);

  const { toast } = useToast();
  const navigate = useNavigate();

  // Load initial data if provided (OCR results)
  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({
        ...prev,
        firstName: initialData.driver?.firstName || '',
        lastName: initialData.driver?.lastName || '',
        address: initialData.driver?.address || '',
        city: initialData.driver?.city || '',
        state: initialData.driver?.state || '',
        zip: initialData.driver?.zip || '',
        dlNumber: initialData.driver?.dlNumber || '',
        vehicleMake: initialData.vehicle?.make || '',
        vehicleModel: initialData.vehicle?.model || '', // Might be missing in OCR
        vehicleYear: initialData.vehicle?.year || '',
        plateNumber: initialData.vehicle?.plate || '',
        violationCode: initialData.violation?.statute || '',
        speed: initialData.violation?.actualSpeedMph || '',
        speedLimit: initialData.violation?.postedSpeedMph || '',
        location: initialData.violation?.location || '',
        courtDate: initialData.court?.courtDate || '',
        courtName: initialData.court?.courtName || '',
      }));
      
      toast({
        title: "✨ Data Auto-filled",
        description: "We've pre-populated the form from your ticket scan. Please review for accuracy.",
        variant: "success",
        duration: 5000,
      });
    }
  }, [initialData, toast]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setDirection(1);
      setCurrentStep(curr => curr + 1);
    } else {
      // Submit
      navigate('/confirmation', { state: { caseData: formData } });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(curr => curr - 1);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction > 0 ? -50 : 50,
      opacity: 0
    })
  };

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 ${ticketImage ? 'lg:grid-cols-2' : ''} gap-8 h-full`}>
      
      {/* LEFT COLUMN: FORM WIZARD */}
      <div className="flex flex-col min-h-[600px]">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -z-10 rounded-full"></div>
            <div 
              className="absolute top-1/2 left-0 h-1 bg-[#C6FF4D] -z-10 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            ></div>
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              return (
                <div key={step.id} className="flex flex-col items-center">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 bg-[#0A1A2F]
                    ${isActive ? 'border-[#C6FF4D] text-[#C6FF4D] scale-110 shadow-[0_0_15px_rgba(198,255,77,0.3)]' : 
                      isCompleted ? 'border-[#C6FF4D] bg-[#C6FF4D] text-[#0A1A2F]' : 'border-white/20 text-white/40'}`}
                  >
                    {isCompleted ? <CheckCircle className="w-6 h-6" /> : <Icon className="w-5 h-5" />}
                  </div>
                  <span className={`text-xs mt-2 font-medium transition-colors duration-300 ${isActive ? 'text-[#C6FF4D]' : 'text-white/40'}`}>
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-grow bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
          {initialData && (
             <div className="absolute top-0 right-0 p-2 bg-[#C6FF4D]/10 rounded-bl-xl border-b border-l border-[#C6FF4D]/20 flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-[#C6FF4D]" />
                <span className="text-[10px] font-bold text-[#C6FF4D] uppercase tracking-wider">Auto-filled via Scan</span>
             </div>
          )}

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="h-full"
            >
              <h2 className="text-2xl font-bold text-white mb-6">{steps[currentStep].title}</h2>
              
              {/* Step 1: Driver Info */}
              {currentStep === 0 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-white">First Name</Label>
                      <Input name="firstName" value={formData.firstName} onChange={handleChange} className="bg-white/5 border-white/10 text-white" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white">Last Name</Label>
                      <Input name="lastName" value={formData.lastName} onChange={handleChange} className="bg-white/5 border-white/10 text-white" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Address</Label>
                    <Input name="address" value={formData.address} onChange={handleChange} className="bg-white/5 border-white/10 text-white" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2 col-span-2">
                      <Label className="text-white">City</Label>
                      <Input name="city" value={formData.city} onChange={handleChange} className="bg-white/5 border-white/10 text-white" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white">Zip</Label>
                      <Input name="zip" value={formData.zip} onChange={handleChange} className="bg-white/5 border-white/10 text-white" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">License Number</Label>
                    <Input name="dlNumber" value={formData.dlNumber} onChange={handleChange} className="bg-white/5 border-white/10 text-white" />
                  </div>
                </div>
              )}

              {/* Step 2: Vehicle Info */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                      <Label className="text-white">Year</Label>
                      <Input name="vehicleYear" value={formData.vehicleYear} onChange={handleChange} className="bg-white/5 border-white/10 text-white" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white">Make</Label>
                      <Input name="vehicleMake" value={formData.vehicleMake} onChange={handleChange} className="bg-white/5 border-white/10 text-white" />
                    </div>
                  </div>
                  <div className="space-y-2">
                      <Label className="text-white">Model</Label>
                      <Input name="vehicleModel" value={formData.vehicleModel} onChange={handleChange} placeholder="e.g. Mustang" className="bg-white/5 border-white/10 text-white" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">License Plate</Label>
                    <Input name="plateNumber" value={formData.plateNumber} onChange={handleChange} className="bg-white/5 border-white/10 text-white" />
                  </div>
                </div>
              )}

              {/* Step 3: Violation */}
              {currentStep === 2 && (
                <div className="space-y-4">
                   <div className="space-y-2">
                      <Label className="text-white">Violation / Statute Code</Label>
                      <Input name="violationCode" value={formData.violationCode} onChange={handleChange} className="bg-white/5 border-white/10 text-white" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-white">Your Speed</Label>
                      <Input name="speed" value={formData.speed} onChange={handleChange} className="bg-white/5 border-white/10 text-white" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white">Speed Limit</Label>
                      <Input name="speedLimit" value={formData.speedLimit} onChange={handleChange} className="bg-white/5 border-white/10 text-white" />
                    </div>
                  </div>
                   <div className="space-y-2">
                      <Label className="text-white">Location of Stop</Label>
                      <Input name="location" value={formData.location} onChange={handleChange} className="bg-white/5 border-white/10 text-white" />
                  </div>
                </div>
              )}

              {/* Step 4: Court Info */}
              {currentStep === 3 && (
                 <div className="space-y-4">
                   <div className="space-y-2">
                      <Label className="text-white">Court Name</Label>
                      <Input name="courtName" value={formData.courtName} onChange={handleChange} className="bg-white/5 border-white/10 text-white" />
                  </div>
                  <div className="space-y-2">
                      <Label className="text-white">Court Date (if set)</Label>
                      <Input type="date" name="courtDate" value={formData.courtDate} onChange={handleChange} className="bg-white/5 border-white/10 text-white" />
                  </div>
                </div>
              )}

              {/* Step 5: Review */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="bg-white/5 rounded-lg p-4 space-y-3">
                    <h3 className="font-bold text-[#C6FF4D]">Summary</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span className="text-white/50">Driver:</span>
                      <span className="text-white text-right">{formData.firstName} {formData.lastName}</span>
                      
                      <span className="text-white/50">Violation:</span>
                      <span className="text-white text-right">{formData.violationCode}</span>
                      
                      <span className="text-white/50">Details:</span>
                      <span className="text-white text-right">{formData.speed} in {formData.speedLimit}</span>
                      
                      <span className="text-white/50">Court:</span>
                      <span className="text-white text-right">{formData.courtDate}</span>
                    </div>
                  </div>
                  <p className="text-white/70 text-sm">
                    By clicking submit, our AI will generate a preliminary defense strategy based on these details.
                  </p>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            onClick={handleBack}
            disabled={currentStep === 0}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 w-28"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button
            onClick={handleNext}
            className="bg-[#C6FF4D] text-[#0A1A2F] hover:bg-[#C6FF4D]/90 font-bold w-28"
          >
            {currentStep === steps.length - 1 ? 'Submit' : 'Next'} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* RIGHT COLUMN: TICKET PREVIEW (If Image Exists) */}
      {ticketImage && (
         <div className="hidden lg:block relative">
           <div className="sticky top-24 bg-[#050e19] border border-white/10 rounded-2xl overflow-hidden shadow-2xl h-[calc(100vh-8rem)]">
              <div className="absolute top-0 left-0 right-0 bg-black/60 backdrop-blur-md p-4 flex justify-between items-center z-10 border-b border-white/10">
                 <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#C6FF4D]" />
                    <span className="text-white font-bold text-sm">Scanned Ticket Source</span>
                 </div>
                 <Button size="icon" variant="ghost" className="h-8 w-8 text-white hover:bg-white/10" onClick={() => setIsImageExpanded(!isImageExpanded)}>
                    <Maximize2 className="w-4 h-4" />
                 </Button>
              </div>
              <div className="h-full overflow-auto p-4 flex items-start justify-center bg-[#050e19]">
                 <img 
                    src={ticketImage} 
                    alt="Scanned Ticket" 
                    className="w-full h-auto rounded shadow-lg object-contain"
                 />
              </div>
           </div>
         </div>
      )}

      {/* Mobile Image Toggle would go here ideally */}
    </div>
  );
};

export default IntakeWizard;
