import { useState, useEffect } from 'react';
import { Wand2, Copy, Check } from 'lucide-react';
import { getProjectSkills } from '../../services/skillsService';

export default function SkillsList({ projectId }) {
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);
  const [error, setError] = useState(false);

  const fetchSkills = () => {
    setIsLoading(true); setError(false);
    getProjectSkills(projectId).then(d => setSkills(d.skills || [])).catch(() => setError(true)).finally(() => setIsLoading(false));
  };

  useEffect(() => { fetchSkills(); }, [projectId]);

  const handleCopy = (skill) => {
    navigator.clipboard.writeText(skill.command);
    setCopiedId(skill.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (isLoading) return <div className="liquid-glass rounded-3xl p-4 animate-pulse h-32" />;
  if (error) return (
    <div className="liquid-glass-strong border border-red-500/20 rounded-3xl flex flex-col items-center justify-center gap-2 h-32">
      <p className="text-sm text-red-400">Failed to load skills</p>
      <button onClick={fetchSkills} className="text-xs text-white/50 hover:text-white px-4 py-1.5 liquid-glass rounded-full cursor-pointer">Retry</button>
    </div>
  );
  if (!skills.length) return <div className="liquid-glass-strong rounded-3xl flex items-center justify-center h-32 text-sm text-white/40">No skills found</div>;

  return (
    <div className="liquid-glass-strong rounded-3xl p-4 space-y-2">
      <div className="flex items-center justify-between px-2 mb-2">
        <div className="flex items-center gap-2">
          <Wand2 className="w-4 h-4 text-white/50" />
          <span className="text-xs uppercase tracking-widest text-white/50">Skills</span>
        </div>
        <span className="text-xs text-white/30">{skills.length} available</span>
      </div>

      {skills.map(s => (
        <div key={s.id} className="liquid-glass rounded-2xl px-4 py-3 flex flex-col gap-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-sm font-medium text-white/80">{s.name}</p>
              <p className="text-xs text-white/50 mt-0.5 leading-relaxed">{s.description}</p>
            </div>
            <button onClick={() => handleCopy(s)} className="liquid-glass w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 cursor-pointer hover:scale-105">
              {copiedId === s.id ? <Check className="w-3.5 h-3.5 text-white/60" /> : <Copy className="w-3.5 h-3.5 text-white/40" />}
            </button>
          </div>
          <code className="liquid-glass rounded-xl px-3 py-2 text-[10px] text-white/40 font-mono truncate block text-left">
            {s.command}
          </code>
        </div>
      ))}
    </div>
  );
}
