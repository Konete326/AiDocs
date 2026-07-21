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
  isDangerous = false,
  variant = 'default'
}) => {
  const isRed = isDangerous || variant === 'danger';
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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.12 }}
            className="relative z-10 liquid-glass-strong rounded-3xl p-6 w-full max-w-sm border border-white/10"
          >
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center mx-auto mb-3 ${
              isRed ? 'bg-red-500/20 border border-red-500/30' : 'liquid-glass'
            }`}>
              <AlertTriangle className={`w-5 h-5 ${isRed ? 'text-red-400' : 'text-white/60'}`} />
            </div>

            <h3 className="text-base font-semibold text-white text-center">{title}</h3>
            <p className="text-xs text-white/60 text-center mt-1.5 leading-relaxed">
              {message}
            </p>

            <div className="flex gap-3 mt-5 justify-center">
              <button
                onClick={onCancel}
                style={{ color: '#ffffff' }}
                className="liquid-glass rounded-full px-5 py-2 text-xs font-medium hover:scale-105 transition-transform cursor-pointer border border-white/10"
              >
                {cancelLabel}
              </button>

              <button
                onClick={onConfirm}
                style={{ color: '#ffffff' }}
                className={`rounded-full px-5 py-2 text-xs font-semibold hover:scale-105 active:scale-95 transition-transform cursor-pointer ${
                  isRed
                    ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/30 border border-red-500/50'
                    : 'liquid-glass-strong text-white border border-white/10'
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
