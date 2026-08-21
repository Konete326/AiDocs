import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';
import { createPortal } from 'react-dom';

const ComingSoonModal = ({ 
  isOpen, 
  onClose, 
  title = "Feature Coming Soon", 
  description = "This feature is currently under active development and will be available in the next release.",
  icon: Icon = Sparkles
}) => {
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
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.15 }}
            className="relative z-10 bg-[#E0E5EC] rounded-[28px] p-6 w-full max-w-sm border-2 border-[#CAD1DB] text-center shadow-[9px_9px_18px_rgba(163,177,198,0.6),-9px_-9px_18px_rgba(255,255,255,0.7)]"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-black/5 transition-colors text-[#6B7280] hover:text-[#3D4852] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-2xl neumorphic-inset flex items-center justify-center mx-auto mb-3.5 border border-white/60">
              <Icon className="w-6 h-6 text-[#6C63FF]" />
            </div>

            <h2 className="text-lg font-extrabold text-[#3D4852] tracking-tight mb-1.5">{title}</h2>
            <p className="text-[#6B7280] text-xs leading-relaxed mb-5 font-medium px-2">
              {description}
            </p>

            <button
              onClick={onClose}
              className="w-full bg-[#6C63FF] hover:bg-[#8B84FF] rounded-2xl py-2.5 text-xs text-white font-extrabold hover:scale-105 active:scale-95 transition-transform cursor-pointer border-none shadow-[4px_4px_10px_rgba(108,99,255,0.35)]"
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
