import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, X, Check } from 'lucide-react';

const UpgradeModal = ({ isOpen, onClose, onUpgrade }) => {
  const features = [
    'AI-Powered Collaboration',
    'Advanced Workspace Tools',
    'Priority Doc Generation',
    'Unlimited Project Variants'
  ];

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center px-4 md:p-6" style={{ width: '100vw', height: '100vh' }}>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-md overflow-hidden"
          >
            <div className="bg-black/90 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 p-8 md:p-10 text-center shadow-[0_0_50px_rgba(0,0,0,0.8)]">
              {/* Close Button */}
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 transition-colors text-white/40 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Icon */}
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-white/20 to-transparent flex items-center justify-center mx-auto mb-6 shadow-xl border border-white/5">
                <Crown className="w-8 h-8 text-white" />
              </div>

              {/* Header */}
              <h2 className="text-2xl font-semibold text-white mb-3">Unlock Pro Workspace</h2>
              <p className="text-white/60 text-sm leading-relaxed mb-8">
                The advanced workspace is a Pro feature. Upgrade your plan to unlock AI collaboration and advanced tools.
              </p>

              {/* Features List */}
              <ul className="space-y-3 mb-10 text-left bg-white/5 p-6 rounded-2xl border border-white/5">
                {features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-white/80">
                    <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-white/60" />
                    </div>
                    {feat}
                  </li>
                ))}
              </ul>

              {/* Actions */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={onUpgrade}
                  className="w-full liquid-glass-strong py-4 rounded-2xl text-white font-medium hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_40px_rgba(0,0,0,0.3)] border border-white/10 cursor-pointer"
                >
                  View Pricing
                </button>
                <button
                  onClick={onClose}
                  className="text-white/40 text-sm hover:text-white/60 transition-colors py-2 cursor-pointer"
                >
                  Maybe Later
                </button>
              </div>
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

export default UpgradeModal;
