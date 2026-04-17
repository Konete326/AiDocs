import { Sparkles } from 'lucide-react';

export default function SuggestionPills({ suggestions, isLoading, onSelect, fieldName }) {
  if (isLoading) {
    return (
      <div className="flex gap-2 flex-wrap mt-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="liquid-glass rounded-full h-7 w-28 animate-pulse" />
        ))}
      </div>
    );
  }

  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div className="mt-3 space-y-1">
      <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-2 flex items-center gap-2">
        <Sparkles className="w-3 h-3" />
        <span>AI Suggestions</span>
      </div>
      <div className="flex gap-2 flex-wrap">
        {suggestions.map((s, i) => (
          <button
            key={`${fieldName}-${i}`}
            type="button"
            className="liquid-glass rounded-full px-4 py-1.5 text-xs text-white/70 hover:text-white hover:scale-105 transition-all cursor-pointer text-left max-w-xs truncate"
            onClick={() => onSelect(s)}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
