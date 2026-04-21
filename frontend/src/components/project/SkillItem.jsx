import { Copy, Check } from 'lucide-react';

const SkillItem = ({ skill, copiedId, onCopy, onRemove }) => (
  <div className="group relative animate-in fade-in slide-in-from-right-2 duration-300">
    <div className="liquid-glass border border-white/5 rounded-xl p-3 hover:border-white/20 hover:bg-white/[0.03] transition-all cursor-default">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-xs font-medium text-white/90 truncate">{skill.name}</span>
            <span className="text-[8px] text-white/20 font-mono">#{skill.id.slice(0, 8)}</span>
          </div>
          <p className="text-[10px] text-white/40 leading-relaxed">
            {skill.description}
          </p>
        </div>
        
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => onCopy(skill)}
            className="p-1.5 hover:bg-white/10 rounded-lg text-white/40 hover:text-blue-400 transition-all cursor-pointer"
          >
            {copiedId === skill.id ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button 
            onClick={() => onRemove(skill)}
            className="p-1.5 hover:bg-red-500/20 rounded-lg text-white/20 hover:text-red-400 transition-all cursor-pointer"
          >
            <span className="text-[10px]">✕</span>
          </button>
        </div>
      </div>

      <div className="mt-2 overflow-hidden border-t border-white/5 pt-2">
        <div className="bg-black/40 rounded-lg py-1.5 px-2.5 flex items-center justify-between gap-2 border border-white/5">
          <code className="text-[9px] text-blue-300 font-mono truncate">{skill.command}</code>
        </div>
      </div>
    </div>
  </div>
);

export default SkillItem;
