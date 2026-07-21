import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';
import { createPortal } from 'react-dom';

const ComingSoonModal = ({ isOpen, onClose }) => {
  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="relative z-10 liquid-glass-strong rounded-3xl p-6 w-full max-w-sm border border-white/10 text-center shadow-2xl"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/10 transition-colors text-white/40 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-10 h-10 rounded-2xl liquid-glass flex items-center justify-center mx-auto mb-3 border border-white/10">
              <Sparkles className="w-5 h-5 text-[#38B2AC]" />
            </div>

            <h2 className="text-xl font-bold text-white tracking-tight mb-1">Payments Coming Soon</h2>
            <p className="text-white/60 text-xs leading-relaxed mb-5">
              Payment integrations will be live very soon. All features are currently 100% free!
            </p>

            <button
              onClick={onClose}
              className="w-full liquid-glass-strong rounded-xl py-2.5 text-xs text-white font-semibold hover:scale-105 transition-transform cursor-pointer border border-white/10 bg-white/10"
            >
              Got It
            </button>
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
