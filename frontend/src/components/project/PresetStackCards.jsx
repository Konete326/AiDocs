import { Check, Sparkles, Loader2 } from 'lucide-react';
import { STACK_CARDS } from '../../constants/stackPresets';
import { renderStackIcon } from '../../utils/stackIconRenderer';
import { renderTechTagIcon } from '../../utils/techTagIcons';
import { calculateAiPresetMatch } from '../../utils/aiMatchCalculator';

export default function PresetStackCards({ selectedStack, onSelectStack, onApplyStack, isUpdating, activeCategory = 'all', project }) {
  const filtered = STACK_CARDS.filter(card => activeCategory === 'all' || card.category === activeCategory);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {filtered.map((card) => {
        const isSelected = selectedStack === card.value;
        const matchScore = calculateAiPresetMatch(card.id, project?.title, project?.wizardAnswers);

        return (
          <div
            key={card.id}
            onClick={() => onSelectStack(card.value)}
            className={`relative rounded-[28px] p-5 transition-all duration-300 cursor-pointer flex flex-col justify-between ${
              isSelected
                ? 'neumorphic-inset ring-2 ring-[#6C63FF]/30'
                : 'liquid-glass hover:-translate-y-1'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-2xl neumorphic-inset-deep flex items-center justify-center">
                  {renderStackIcon(card.iconType)}
                </div>
                <span className="px-2.5 py-1 rounded-full text-[9.5px] font-mono font-bold neumorphic-inset text-[#3D4852]">
                  {matchScore}% Match
                </span>
              </div>

              <div className="flex items-center justify-between gap-1 mb-1">
                <h3 className="text-sm font-bold text-[#3D4852] truncate">{card.name}</h3>
                {isSelected && (
                  <span className="bg-[#6C63FF] text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 shrink-0">
                    <Check className="w-2.5 h-2.5" /> Selected
                  </span>
                )}
              </div>
              <p className="text-[11px] font-semibold text-[#6C63FF] mb-2">{card.subtitle}</p>
              <p className="text-[11px] text-[#6B7280] leading-relaxed mb-4 line-clamp-3">{card.description}</p>
            </div>

            <div className="space-y-3 pt-3 border-t border-black/5">
              <div className="flex flex-wrap gap-1.5">
                {card.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-xl text-[9.5px] font-mono font-medium neumorphic-inset text-[#3D4852] flex items-center gap-1.5">
                    {renderTechTagIcon(tag)}
                    <span>{tag}</span>
                  </span>
                ))}
              </div>

              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onApplyStack(card.value); }}
                disabled={isUpdating}
                className={`w-full py-2 px-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  isSelected ? 'bg-[#6C63FF] text-white shadow-md' : 'neumorphic-btn text-[#3D4852]'
                }`}
              >
                {isUpdating && isSelected ? <Loader2 className="w-3.5 h-3.5 animate-spin text-white" /> : isSelected ? <Check className="w-3.5 h-3.5 text-white" /> : <Sparkles className="w-3.5 h-3.5 text-[#6C63FF]" />}
                <span className={isSelected ? 'text-white font-bold' : 'text-[#3D4852] font-bold'}>{isSelected ? 'Active Architecture' : 'Apply & Re-target Specs'}</span>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
