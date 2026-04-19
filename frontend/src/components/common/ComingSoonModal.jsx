import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Calendar, ArrowLeft } from 'lucide-react';
import { createPortal } from 'react-dom';

const ComingSoonModal = ({ isOpen, onClose }) => {
  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999999] flex items-center justify-center px-4 overflow-y-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative z-10 liquid-glass-strong rounded-[2.5rem] p-7 md:p-8 w-full max-w-md border border-white/10 overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-indigo-500/20 blur-[80px] rounded-full -z-1" />

            {/* Icon Header */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="relative w-16 h-16 rounded-[1.5rem] liquid-glass flex items-center justify-center border border-white/10">
                  <Sparkles className="w-8 h-8 text-white animate-pulse" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full liquid-glass-strong flex items-center justify-center border border-white/20">
                  <Calendar className="w-4 h-4 text-white/70" />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-white tracking-tight">Payments Coming Soon</h2>
              <p className="text-white/60 text-base leading-relaxed">
                Our premium engine is being fine-tuned to deliver the ultimate experience. Payment integrations will be live very soon.
              </p>
            </div>

            {/* Features Preview */}
            <div className="mt-5 space-y-2">
              {[
                "Unlimited Document Generation",
                "Advanced AI Custom Models",
                "Priority Export Options",
                "Team Collaboration Tools"
              ].map((feat, i) => (
                <div key={feat} className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/5">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                  <span className="text-sm text-white/70 font-medium">{feat}</span>
                </div>
              ))}
            </div>

            {/* Footer Buttons */}
            <div className="mt-6 flex flex-col gap-3">
              <button
                onClick={onClose}
                className="w-full liquid-glass-strong rounded-2xl py-4 text-sm text-white font-bold hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer border border-white/20 bg-white/5 hover:bg-white/10 shadow-lg shadow-black/20"
              >
                Notify Me When Live
              </button>
              <button
                onClick={onClose}
                className="w-full flex items-center justify-center gap-2 text-white/40 text-xs font-semibold hover:text-white/70 transition-colors uppercase tracking-widest cursor-pointer"
              >
                <ArrowLeft className="w-3 h-3" /> Go Back
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  if (typeof document !== 'undefined') {
    return createPortal(modalContent, document.body);
  }
  return null;
};

export default ComingSoonModal;
