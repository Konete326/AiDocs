import { motion, AnimatePresence } from 'framer-motion';
import { Info } from 'lucide-react';

const AlertModal = ({ 
  isOpen, 
  title, 
  message, 
  buttonLabel = 'Got it', 
  onClose 
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 liquid-glass-strong rounded-3xl p-8 w-full max-w-sm border border-white/5"
          >
            <div className="w-12 h-12 rounded-full liquid-glass flex items-center justify-center mx-auto mb-4">
              <Info className="w-5 h-5 text-white/60" />
            </div>

            <h3 className="text-lg font-medium text-white text-center">{title}</h3>
            <p className="text-sm text-white/60 text-center mt-2 leading-relaxed">
              {message}
            </p>

            <div className="flex mt-8 justify-center">
              <button
                onClick={onClose}
                className="liquid-glass-strong rounded-full px-8 py-2.5 text-sm text-white font-medium hover:scale-105 active:scale-95 transition-transform cursor-pointer border border-white/10"
              >
                {buttonLabel}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AlertModal;
