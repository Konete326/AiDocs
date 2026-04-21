import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { createPortal } from 'react-dom';

const ConfirmModal = ({ 
  isOpen, 
  title, 
  message, 
  confirmLabel = 'Confirm', 
  cancelLabel = 'Cancel', 
  onConfirm, 
  onCancel,
  isDangerous = false 
}) => {
  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999999] flex items-center justify-center px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 liquid-glass-strong rounded-3xl p-8 w-full max-w-sm border border-white/5"
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${
              isDangerous ? 'bg-red-500/15 border border-red-500/20' : 'liquid-glass'
            }`}>
              <AlertTriangle className={`w-5 h-5 ${isDangerous ? 'text-red-400' : 'text-white/60'}`} />
            </div>

            <h3 className="text-lg font-medium text-white text-center">{title}</h3>
            <p className="text-sm text-white/60 text-center mt-2 leading-relaxed">
              {message}
            </p>

            <div className="flex gap-3 mt-8 justify-center">
              <button
                onClick={onCancel}
                className="liquid-glass rounded-full px-6 py-2.5 text-sm text-white/60 hover:scale-105 transition-transform cursor-pointer"
              >
                {cancelLabel}
              </button>

              <button
                onClick={onConfirm}
                className={`rounded-full px-6 py-2.5 text-sm font-medium hover:scale-105 active:scale-95 transition-transform cursor-pointer border ${
                  isDangerous
                    ? 'bg-red-500/20 hover:bg-red-500/30 text-red-300 border-red-500/30'
                    : 'liquid-glass-strong text-white border-white/10'
                }`}
              >
                {confirmLabel}
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

export default ConfirmModal;
