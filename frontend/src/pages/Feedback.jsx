import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';

const Feedback = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full bg-black flex items-center justify-center p-6 pt-24">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/10 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-lg liquid-glass-strong rounded-3xl p-8 text-center"
      >
        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/10">
          <MessageSquare className="w-8 h-8 text-white/50" />
        </div>
        
        <h1 className="text-3xl font-medium text-white mb-4 tracking-tight">Your Voice <span className="font-serif italic text-white/80">Matters</span></h1>
        <p className="text-white/60 mb-8 leading-relaxed">
          The feedback system is currently being integrated. We're excited to hear your thoughts on how we can improve AiDocs.
        </p>

        <div className="space-y-4">
          <div className="py-4 px-6 rounded-2xl bg-white/5 border border-white/10 text-white/40 text-sm">
            Feedback Portal Opening Soon
          </div>
          
          <Button 
            className="w-full flex items-center justify-center gap-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Feedback;
