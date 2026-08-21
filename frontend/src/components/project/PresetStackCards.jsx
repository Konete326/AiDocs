import { useMemo } from 'react';
import { Check, Sparkles, Loader2, Award } from 'lucide-react';
import { STACK_CARDS } from '../../constants/stackPresets';
import { renderStackIcon } from '../../utils/stackIconRenderer';
import { renderTechTagIcon } from '../../utils/techTagIcons';
import { calculateAiPresetMatch } from '../../utils/aiMatchCalculator';

export default function PresetStackCards({ selectedStack, onSelectStack, onApplyStack, isUpdating, activeCategory = 'all', project }) {
  const processedCards = useMemo(() => {
    const tech = (project?.wizardAnswers?.techPreferences || '').toLowerCase();
    const type = (project?.projectType || '').toLowerCase();
    const isMobile = type === 'mobile' || tech.includes('flutter') || tech.includes('react-native') || tech.includes('react native') || tech.includes('ios') || tech.includes('android') || tech.includes('swift') || tech.includes('kotlin');
    const isEcommerce = type === 'ecommerce' || type === 'marketplace';
    const isAi = type === 'ai' || tech.includes('python') || tech.includes('fastapi');

    const domainKey = isMobile ? 'mobile' : isEcommerce ? 'ecommerce' : isAi ? 'ai' : 'saas';

    const scored = STACK_CARDS
      .filter((card) => {
        if (!card.suitableFor || card.suitableFor.length === 0) return true;
        if (isMobile) return card.suitableFor.includes('mobile');
        if (isEcommerce) return card.suitableFor.includes('ecommerce');
        if (isAi) return card.suitableFor.includes('ai');
        return card.suitableFor.includes('saas') || card.suitableFor.includes('web');
      })
      .map((card) => {
        const match = calculateAiPresetMatch(card.id, project?.title, project?.wizardAnswers, project?.projectType);
        return {
          ...card,
          matchScore: match.score,
          matchLabel: match.label,
          isTop: match.isTop
        };
      });

    const filtered = scored.filter((card) => {
      if (activeCategory === 'all') return true;
      if (card.category === activeCategory) return true;
      if (card.subCategories && card.subCategories.includes(activeCategory)) return true;
      return false;
    });

    return filtered.sort((a, b) => b.matchScore - a.matchScore);
  }, [activeCategory, project]);

  return (
    <div>
      <div className="flex items-center justify-between gap-2 mb-4 px-1">
        <span className="text-xs font-bold text-[#3D4852] flex items-center gap-1.5">
          <Award className="w-4 h-4 text-[#6C63FF]" />
          <span>Showing {processedCards.length} architectures tailored for your project</span>
        </span>
        <span className="text-[11px] font-bold text-[#6C63FF] neumorphic-inset px-3 py-1 rounded-full">
          Target Domain: <strong className="uppercase">{project?.projectType || 'Fullstack'}</strong>
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {processedCards.map((card) => {
          const isSelected = selectedStack === card.value;
          const score = card.matchScore;

          return (
            <div
              key={card.id}
              onClick={() => onSelectStack(card.value)}
              className={`relative rounded-[28px] p-5 transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'neumorphic-inset border-2 border-[#6C63FF]'
                  : card.isTop
                  ? 'neumorphic-card border-2 border-[#6C63FF]/30 hover:-translate-y-1'
                  : 'neumorphic-card hover:-translate-y-1'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-2xl neumorphic-inset flex items-center justify-center">
                    {renderStackIcon(card.iconType)}
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black border ${
                      score >= 90
                        ? 'bg-emerald-500/10 text-emerald-700 border-emerald-500/30'
                        : score >= 75
                        ? 'bg-[#6C63FF]/10 text-[#6C63FF] border-[#6C63FF]/30'
                        : 'bg-black/5 text-[#6B7280] border-[#CAD1DB]'
                    }`}>
                      {score}% Match
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-1 mb-1">
                  <h3 className="text-sm font-black text-[#3D4852] truncate">{card.name}</h3>
                  {isSelected && (
                    <span className="bg-[#6C63FF] text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 shrink-0">
                      <Check className="w-2.5 h-2.5" /> Active
                    </span>
                  )}
                </div>

                <p className="text-[10.5px] font-bold text-[#6C63FF] mb-1.5 truncate">{card.matchLabel}</p>
                <p className="text-[11px] font-semibold text-[#6B7280] mb-2">{card.subtitle}</p>
                <p className="text-[11px] text-[#4B5563] leading-relaxed mb-4 line-clamp-3">{card.description}</p>
              </div>

              <div className="space-y-3 pt-3 border-t border-black/5">
                <div className="flex flex-wrap gap-1.5">
                  {card.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded-xl text-[9.5px] font-mono font-medium neumorphic-inset text-[#3D4852] flex items-center gap-1.5">
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
                  <span className={isSelected ? 'text-white font-bold' : 'text-[#3D4852] font-bold'}>{isSelected ? 'Current Active Blueprint' : 'Apply & Retarget Specs'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
