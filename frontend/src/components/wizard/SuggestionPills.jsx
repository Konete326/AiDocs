import { useState, useEffect } from 'react';
import { Sparkles, RotateCcw, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SuggestionPills({ suggestions, isLoading, onSelect, fieldName, onRefresh }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!suggestions || suggestions.length === 0) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#E0E5EC] shadow-[2px_2px_5px_rgba(163,177,198,0.5),-2px_-2px_5px_rgba(255,255,255,0.6)] border border-white/50 text-[#6C63FF] hover:text-[#5B52EE] text-[11px] font-bold active:scale-95 transition-all cursor-pointer"
        title="View AI Suggestions"
      >
        <Sparkles className="w-3 h-3 text-[#6C63FF]" />
        <span>AI Ideas</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-150"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.15 }}
              className="bg-[#E0E5EC] rounded-[28px] w-full max-w-md p-5 md:p-6 shadow-[14px_14px_28px_rgba(163,177,198,0.7),-14px_-14px_28px_rgba(255,255,255,0.8)] border border-white/70 relative text-left"
            >
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-xl bg-[#E0E5EC] text-[#6B7280] hover:text-[#3D4852] shadow-[2px_2px_5px_rgba(163,177,198,0.5),-2px_-2px_5px_rgba(255,255,255,0.5)] active:scale-95 transition-all cursor-pointer border border-white/40"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-between pr-8 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#E0E5EC] shadow-[inset_2px_2px_4px_rgba(163,177,198,0.5),inset_-2px_-2px_4px_rgba(255,255,255,0.6)] flex items-center justify-center text-[#6C63FF] border border-white/40">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-[#3D4852]">Smart AI Ideas</h3>
                    <p className="text-[10px] text-[#6B7280] font-medium">Select an idea to auto-fill your field</p>
                  </div>
                </div>

                {onRefresh && (
                  <button
                    type="button"
                    onClick={onRefresh}
                    disabled={isLoading}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#E0E5EC] shadow-[2px_2px_4px_rgba(163,177,198,0.5),-2px_-2px_4px_rgba(255,255,255,0.5)] text-[#6C63FF] hover:text-[#5B52EE] text-[11px] font-bold transition-all cursor-pointer disabled:opacity-50 active:scale-95 border border-white/40"
                    title="Generate new ideas"
                  >
                    <RotateCcw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
                    <span>New Ideas</span>
                  </button>
                )}
              </div>

              {isLoading ? (
                <div className="space-y-2.5 py-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-2xl bg-[#E0E5EC] shadow-[inset_2px_2px_5px_rgba(163,177,198,0.4),inset_-2px_-2px_5px_rgba(255,255,255,0.5)] border border-white/30 space-y-2 animate-pulse"
                    >
                      <div className="h-3 bg-[#A3B1C6]/35 rounded-full w-4/5" />
                      <div className="h-2.5 bg-[#A3B1C6]/20 rounded-full w-3/5" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2 max-h-[55vh] overflow-y-auto custom-scrollbar pr-1 py-1">
                  {suggestions.map((s, i) => (
                    <button
                      key={`${fieldName}-${i}`}
                      type="button"
                      onClick={() => {
                        onSelect(s);
                        setIsOpen(false);
                      }}
                      className="w-full text-left p-3.5 rounded-2xl bg-[#E0E5EC] shadow-[3px_3px_6px_rgba(163,177,198,0.45),-3px_-3px_6px_rgba(255,255,255,0.6)] hover:shadow-[inset_2px_2px_5px_rgba(163,177,198,0.5),inset_-2px_-2px_5px_rgba(255,255,255,0.6)] hover:text-[#6C63FF] text-xs font-semibold text-[#3D4852] transition-all cursor-pointer leading-relaxed border border-white/40 group flex items-start justify-between gap-2 active:scale-[0.99]"
                    >
                      <span className="flex-1">{s}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#6C63FF] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
