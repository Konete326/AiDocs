import { Sparkles, RotateCcw } from 'lucide-react';

export default function SuggestionPills({ suggestions, isLoading, onSelect, fieldName, onRefresh }) {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div className="mt-2 space-y-1.5 w-full">
      <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-[#6C63FF] font-extrabold px-0.5">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-[#6C63FF]" />
          <span>Smart AI Ideas</span>
        </div>
        {onRefresh && (
          <button
            type="button"
            onClick={onRefresh}
            disabled={isLoading}
            className="inline-flex items-center gap-1 text-[#6B7280] hover:text-[#6C63FF] transition-colors cursor-pointer disabled:opacity-50"
            title="Refresh suggestions"
          >
            <RotateCcw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
            <span className="text-[10px] font-bold">New Ideas</span>
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5 items-center w-full">
        {suggestions.slice(0, 3).map((s, i) => (
          <button
            key={`${fieldName}-${i}`}
            type="button"
            className="bg-[#E0E5EC] rounded-xl px-3 py-1.5 text-xs text-[#3D4852] font-semibold shadow-[3px_3px_6px_rgba(163,177,198,0.5),-3px_-3px_6px_rgba(255,255,255,0.6)] hover:shadow-[inset_2px_2px_4px_rgba(163,177,198,0.5),inset_-2px_-2px_4px_rgba(255,255,255,0.6)] hover:text-[#6C63FF] border border-white/40 active:scale-95 transition-all cursor-pointer text-left line-clamp-2 max-w-full"
            onClick={() => onSelect(s)}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
