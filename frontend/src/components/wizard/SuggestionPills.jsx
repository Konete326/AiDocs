import { Sparkles } from 'lucide-react';

export default function SuggestionPills({ suggestions, isLoading, onSelect, fieldName }) {
  if (isLoading) {
    return (
      <div className="flex gap-2 overflow-x-auto whitespace-nowrap custom-scrollbar pb-1.5 mt-1.5 w-full flex-row">
        {[1, 2, 3].map((i) => (
          <div key={i} className="liquid-glass rounded-full h-7 w-28 animate-pulse flex-shrink-0" />
        ))}
      </div>
    );
  }

  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div className="mt-1.5 space-y-1">
      <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-1 flex items-center gap-2">
        <Sparkles className="w-3 h-3" />
        <span>AI Suggestions</span>
      </div>
      <div className="flex gap-2 overflow-x-auto whitespace-nowrap custom-scrollbar pb-1.5 w-full flex-row">
        {suggestions.map((s, i) => (
          <button
            key={`${fieldName}-${i}`}
            type="button"
            className="liquid-glass no-hover rounded-full px-4 py-1.5 text-xs text-white/70 cursor-pointer inline-block flex-shrink-0"
            onClick={() => onSelect(s)}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
