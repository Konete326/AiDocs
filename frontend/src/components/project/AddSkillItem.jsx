import { Check, Plus } from 'lucide-react';

const AddSkillItem = ({ skill, isAdded, isToggling, onToggle }) => (
  <div className="group relative">
    <div className={`
      liquid-glass border transition-all duration-300 rounded-2xl p-4
      ${isAdded ? 'border-blue-500/30 bg-blue-500/5' : 'border-white/5 hover:border-white/20'}
    `}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-sm font-semibold text-white/90">{skill.name}</h4>
            <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-white/5 text-white/40 font-mono">
              {skill.source}
            </span>
          </div>
          <p className="text-xs text-white/50 leading-relaxed line-clamp-2">
            {skill.description}
          </p>
        </div>

        <button
          onClick={() => onToggle(skill.id)}
          disabled={isToggling}
          className={`
            shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer
            ${isAdded 
              ? 'bg-blue-500/20 text-blue-400 hover:bg-red-500/20 hover:text-red-400' 
              : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white'}
            ${isToggling ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          {isToggling ? (
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : isAdded ? (
            <Check className="w-5 h-5 group-hover:hidden" />
          ) : (
            <Plus className="w-5 h-5" />
          )}
          {isAdded && !isToggling && (
            <span className="hidden group-hover:block text-[10px] font-bold">✕</span>
          )}
        </button>
      </div>
    </div>
  </div>
);

export default AddSkillItem;
