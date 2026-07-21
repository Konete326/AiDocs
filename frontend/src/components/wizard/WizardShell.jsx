import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, X } from 'lucide-react';
import LoadingSpinner from '../common/LoadingSpinner';
import { AlertToast } from '../ui/alert-toast';

const Motion = motion;

const stepsGuide = {
  1: {
    title: 'Define Project Identity',
    description: 'Give your project a name and choose its category. Then, explain the core problem you are trying to solve.',
    sections: [
      {
        label: '💡 Problem statement Tip',
        value: 'Clearly define the frustration you are solving.'
      },
      {
        label: '📝 Example',
        value: '"Freelancers struggle to track unpaid invoices across multiple platforms, leading to lost revenue."'
      }
    ]
  },
  2: {
    title: 'Core Requirements',
    description: 'Outline your target audience and list the core features of your minimum viable product (MVP).',
    sections: [
      {
        label: '💡 Target Audience Tip',
        value: 'Be specific about demographics and daily constraints.'
      },
      {
        label: '📝 Example',
        value: '"Marketing managers at 10-50 person agencies who need quick reports for clients."'
      },
      {
        label: '💡 Core Features Tip',
        value: 'Separate with commas. Focus on the core value.'
      },
      {
        label: '📝 Example',
        value: '"One-click invoice creation, Automated late payment reminders, Stripe integration."'
      }
    ]
  },
  3: {
    title: 'Preferences & Context',
    description: 'Choose your preferred tech stack and monetization model. Add any extra constraints or competitor notes.',
    sections: [
      {
        label: '💡 Tech Preferences',
        value: 'Leave blank if you want the AI to recommend the optimal stack.'
      },
      {
        label: '💡 Monetization & Scale',
        value: 'Define how this project will make money (e.g. SaaS, subscription, one-time payment) or if it is an internal tool.'
      },
      {
        label: '💡 Additional Context',
        value: 'Add details about competitors, specific design styles, or future scaling plans.'
      }
    ]
  },
  4: {
    title: 'Review Suite',
    description: 'Verify your project details. Once submitted, our AI will generate a complete technical documentation suite.',
    sections: [
      {
        label: '📋 Generated Artifacts',
        value: '9 distinct product specifications including PRD, API schemas, and deployment guides.'
      },
      {
        label: '⏳ Generation Time',
        value: 'This process takes ~2-3 minutes. Please keep the browser window open.'
      }
    ]
  }
};

export default function WizardShell({ step, totalSteps, onNext, onBack, onSubmit, onClose, isSubmitting, error, onClearError, children }) {
  return (
    <div className="w-full max-w-5xl h-fit flex flex-col md:flex-row rounded-[32px] overflow-hidden liquid-glass-strong no-hover items-stretch relative">
      {onClose && (
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-20 text-white/40 hover:text-white transition-colors cursor-pointer p-2 hover:bg-white/5 rounded-full"
          title="Cancel and exit"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      <div className="w-full md:w-[58%] p-3.5 sm:p-4 md:p-5 flex flex-col justify-between">
        <div>
          <div className="flex gap-2 justify-center mb-2.5">
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
            <AnimatePresence>
              {error && (
                <div className="fixed top-24 right-6 z-[999999] max-w-sm pointer-events-auto">
                  <AlertToast
                    variant="error"
                    styleVariant="filled"
                    title="Required Field"
                    description={error}
                    onClose={onClearError}
                  />
                </div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <Motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="min-h-0"
              >
                {children}
              </Motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="flex justify-between mt-3.5 pt-2 border-t border-white/5">
          {step > 1 ? (
            <button 
              onClick={onBack}
              className="liquid-glass rounded-full pr-8 pl-6 py-2 text-white/70 text-sm hover:text-white transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          ) : <div />}
          
          <button 
            disabled={isSubmitting}
            onClick={step === totalSteps ? onSubmit : onNext}
            className="bg-[#6C63FF] rounded-2xl px-10 py-2.5 text-sm text-white font-medium hover:scale-105 active:scale-95 disabled:hover:scale-100 disabled:cursor-not-allowed transition-transform cursor-pointer border-none outline-none shadow-[5px_5px_10px_rgba(108,99,255,0.2),-5px_-5px_10px_rgba(255,255,255,0.5)] flex items-center gap-3"
          >
            {isSubmitting ? <><LoadingSpinner size="sm" /><span>Processing</span></> : (step === totalSteps ? "Generate Docs" : "Continue")}
          </button>
        </div>
      </div>

      <div className="hidden md:flex w-[42%] p-5 flex-col justify-between bg-[#E0E5EC] text-[#3D4852] self-stretch select-none relative">
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full shadow-[inset_6px_6px_12px_rgba(163,177,198,0.6),inset_-6px_-6px_12px_rgba(255,255,255,0.5)] flex items-center justify-center pointer-events-none">
          <div className="w-32 h-32 rounded-full shadow-[9px_9px_16px_rgba(163,177,198,0.5),-9px_-9px_16px_rgba(255,255,255,0.6)] flex items-center justify-center">
            <div className="w-16 h-16 rounded-full shadow-[inset_4px_4px_8px_rgba(163,177,198,0.6),inset_-4px_-4px_8px_rgba(255,255,255,0.5)]" />
          </div>
        </div>

        <div className="relative z-10 flex flex-col justify-center h-full gap-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#6C63FF]">
            Step {step} of {totalSteps} Guide
          </span>
          <h2 className="text-xl font-bold tracking-tight leading-tight text-[#3D4852]">
            {stepsGuide[step]?.title}
          </h2>
          <p className="text-[11px] text-[#6B7280] leading-relaxed border-b border-black/5 pb-3">
            {stepsGuide[step]?.description}
          </p>

          <div className="space-y-3 mt-1 overflow-y-auto max-h-[220px] pr-1">
            {stepsGuide[step]?.sections.map((section, i) => (
              <div key={i} className="space-y-1">
                <span className="text-[9px] uppercase tracking-widest text-[#6C63FF] font-semibold block">
                  {section.label}
                </span>
                <p className="text-[10.5px] text-[#3D4852] leading-relaxed italic font-medium">
                  {section.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
