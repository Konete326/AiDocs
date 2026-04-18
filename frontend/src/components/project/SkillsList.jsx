import { useState, useEffect } from 'react';
import { Wand2, Copy, Check } from 'lucide-react';
import { getProjectSkills } from '../../services/skillsService';

export default function SkillsList({ projectId }) {
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    getProjectSkills(projectId)
      .then(data => setSkills(data.skills || []))
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, [projectId]);

  const handleCopy = (skill) => {
    navigator.clipboard.writeText(skill.command);
    setCopiedId(skill.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (isLoading) {
    return <div className="liquid-glass rounded-3xl p-4 animate-pulse h-32" />;
  }

  return (
    <div className="liquid-glass-strong rounded-3xl p-4 space-y-2">
      <div className="flex items-center justify-between px-2 mb-3">
        <div className="flex items-center gap-2">
          <Wand2 className="w-4 h-4 text-white/50" />
          <span className="text-xs uppercase tracking-widest text-white/50">Skills</span>
        </div>
        <span className="text-xs text-white/30">{skills.length} available</span>
      </div>

      {skills.map(skill => (
        <div key={skill.id} className="liquid-glass rounded-2xl px-4 py-3 flex flex-col gap-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-sm font-medium text-white/80">{skill.name}</p>
              <p className="text-xs text-white/50 mt-0.5 leading-relaxed">{skill.description}</p>
            </div>
            <button
              onClick={() => handleCopy(skill)}
              className="liquid-glass rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 hover:scale-105 transition-transform cursor-pointer"
            >
              {copiedId === skill.id ? (
                <Check className="w-3.5 h-3.5 text-white/60" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-white/40" />
              )}
            </button>
          </div>
          <div className="liquid-glass rounded-xl px-3 py-2 flex items-center justify-between gap-2 mt-1">
            <code className="text-[10px] text-white/40 font-mono truncate flex-1">
              {skill.command}
            </code>
          </div>
        </div>
      ))}
    </div>
  );
}
