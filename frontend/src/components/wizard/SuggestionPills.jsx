import { useState, useRef, useEffect } from 'react';
import { Sparkles, RotateCcw, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SuggestionPills({ suggestions, isLoading, onSelect, fieldName, onRefresh }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#E0E5EC] shadow-[2px_2px_5px_rgba(163,177,198,0.5),-2px_-2px_5px_rgba(255,255,255,0.6)] border border-white/50 text-[#6C63FF] hover:text-[#5B52EE] text-[11px] font-bold active:scale-95 transition-all cursor-pointer"
        title="View AI Suggestions"
      >
        <Sparkles className="w-3 h-3 text-[#6C63FF]" />
        <span>AI Ideas</span>
        <ChevronDown className={`w-3 h-3 text-[#6B7280] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-1.5 z-50 w-72 sm:w-80 bg-[#E0E5EC] rounded-2xl p-3 shadow-[8px_8px_16px_rgba(163,177,198,0.7),-8px_-8px_16px_rgba(255,255,255,0.8)] border border-white/70 space-y-2 text-left"
          >
            <div className="flex items-center justify-between px-1 pb-1 border-b border-[#A3B1C6]/20 text-[10px] uppercase tracking-wider font-extrabold text-[#6B7280]">
              <span className="flex items-center gap-1 text-[#6C63FF]">
                <Sparkles className="w-3 h-3" />
                Suggested Ideas
              </span>
              {onRefresh && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRefresh();
                  }}
                  disabled={isLoading}
                  className="inline-flex items-center gap-1 text-[#6B7280] hover:text-[#6C63FF] transition-colors cursor-pointer disabled:opacity-50"
                  title="Generate new ideas"
                >
                  <RotateCcw className={`w-2.5 h-2.5 ${isLoading ? 'animate-spin' : ''}`} />
                  <span>New Ideas</span>
                </button>
              )}
            </div>

            <div className="space-y-1.5 max-h-60 overflow-y-auto custom-scrollbar pr-0.5">
              {suggestions.map((s, i) => (
                <button
                  key={`${fieldName}-${i}`}
                  type="button"
                  onClick={() => {
                    onSelect(s);
                    setIsOpen(false);
                  }}
                  className="w-full text-left p-2.5 rounded-xl bg-[#E0E5EC] shadow-[inset_2px_2px_4px_rgba(163,177,198,0.4),inset_-2px_-2px_4px_rgba(255,255,255,0.5)] hover:bg-white/40 text-xs font-semibold text-[#3D4852] hover:text-[#6C63FF] transition-all cursor-pointer leading-relaxed border border-white/30"
                >
                  {s}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
