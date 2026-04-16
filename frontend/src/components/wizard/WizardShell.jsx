import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X } from 'lucide-react';
import LoadingSpinner from '../common/LoadingSpinner';

export default function WizardShell({ step, totalSteps, onNext, onBack, onSubmit, onClose, isSubmitting, error, children }) {
  return (
    <div className="liquid-glass-strong rounded-3xl p-8 md:p-10 w-full max-w-2xl relative overflow-hidden">
      {onClose && (
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-20 text-white/40 hover:text-white transition-colors cursor-pointer p-2 hover:bg-white/5 rounded-full"
          title="Cancel and exit"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      <div className="flex gap-2 justify-center mb-10">
        {Array.from({ length: totalSteps }).map((_, i) => {
          const num = i + 1;
          const isActive = step === num;
          const isCompleted = step > num;
          return (
            <div 
              key={num} 
              className={`h-2 rounded-full transition-all duration-500 ${
                isActive ? 'w-8 bg-white' : isCompleted ? 'w-2 bg-white/40' : 'w-2 bg-white/10'
              }`} 
            />
          );
        })}
      </div>

      <div className="mb-0">
        <AnimatePresence mode="wait">
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="liquid-glass rounded-xl px-4 py-3 text-sm text-white/80 mb-6 border-l-2 border-white/20"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-[300px]"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-between mt-12 pt-8 border-t border-white/5">
        {step > 1 ? (
          <button 
            onClick={onBack}
            className="liquid-glass rounded-full pr-8 pl-6 py-3 text-white/70 text-sm hover:text-white transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        ) : <div />}
        
        <button 
          disabled={isSubmitting}
          onClick={step === totalSteps ? onSubmit : onNext}
          className="liquid-glass-strong rounded-full px-10 py-3 text-white text-sm font-medium hover:scale-105 active:scale-95 disabled:hover:scale-100 disabled:cursor-not-allowed transition-all flex items-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.05)] cursor-pointer"
        >
          {isSubmitting ? <><LoadingSpinner size="sm" /><span>Processing</span></> : (step === totalSteps ? "Generate Docs" : "Continue")}
        </button>
      </div>
    </div>
  );
}
