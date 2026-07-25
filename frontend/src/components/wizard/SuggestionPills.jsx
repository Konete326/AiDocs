import { Zap, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SuggestionPills({ suggestions, isLoading, onSelect, fieldName }) {
  if (isLoading) {
    return (
      <div className="mt-2 space-y-1.5 w-full">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-widest px-1">
          <div className="flex items-center gap-1.5 text-[#38B2AC] font-semibold">
            <Loader2 className="w-3 h-3 animate-spin" />
            <span>Generating smart suggestions...</span>
          </div>
          <span className="text-white/30 font-semibold">Loading</span>
        </div>
        
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden border border-white/5 relative">
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
            className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-[#38B2AC] to-transparent rounded-full"
          />
        </div>
      </div>
    );
  }

  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div className="mt-2 space-y-1">
      <div className="text-[10px] uppercase tracking-[0.2em] text-[#38B2AC] mb-1 flex items-center gap-1.5 font-semibold">
        <Zap className="w-3 h-3 text-[#38B2AC]" />
        <span>Smart Suggestions</span>
      </div>
      <div className="flex gap-2 overflow-x-auto whitespace-nowrap custom-scrollbar pb-1 w-full flex-row">
        {suggestions.map((s, i) => (
          <button
            key={`${fieldName}-${i}`}
            type="button"
            className="liquid-glass no-hover rounded-full px-3.5 py-1 text-xs text-white/80 hover:text-white hover:bg-white/10 transition-all cursor-pointer inline-block flex-shrink-0 border border-white/10"
            onClick={() => onSelect(s)}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
