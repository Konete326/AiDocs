import { useState, useEffect } from 'react';
import { Search, Plus, Trash2, Library, Terminal } from 'lucide-react';
import { getProjectSkills, toggleProjectSkill } from '../../services/skillsService';
import { toast } from 'react-hot-toast';
import AddSkillsModal from './AddSkillsModal';

const SkillsList = ({ projectId }) => {
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quickSkill, setQuickSkill] = useState('');

  const loadSkills = async () => {
    try {
      const data = await getProjectSkills(projectId);
      setSkills(data);
    } catch (err) {
      console.error('Failed to load skills');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSkills();
  }, [projectId]);

  const handleToggle = async (skillId) => {
    try {
      await toggleProjectSkill(projectId, skillId);
      loadSkills();
      toast.success('Skill updated');
    } catch (err) {
      toast.error('Failed to update skill');
    }
  };

  const handleQuickAdd = async (e) => {
    if (e.key === 'Enter' && quickSkill.trim()) {
      const input = quickSkill.trim();
      
      // Try to parse skill ID from npx command: --skill [id]
      const skillMatch = input.match(/--skill\s+([a-zA-Z0-9-]+)/);
      const skillId = skillMatch ? skillMatch[1] : input.toLowerCase();

      try {
        await toggleProjectSkill(projectId, skillId);
        loadSkills();
        toast.success(`Skill ${skillId} updated`);
        setQuickSkill('');
      } catch {
        // If not a direct match, open modal with search
        setIsModalOpen(true);
        // keep quickSkill in input for modal to use (if we pass it)
      }
    }
  };

  if (isLoading) return <div className="text-white/20 text-xs p-4">Loading skills...</div>;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-sm font-medium text-white/80 flex items-center gap-2">
          Skills <span className="text-[10px] bg-white/5 px-1.5 py-0.5 rounded-full">{skills.length}</span>
        </h3>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="p-1.5 hover:bg-white/5 rounded-lg text-white/40 hover:text-white/80 transition-colors"
          title="Browse Library"
        >
          <Library className="w-4 h-4" />
        </button>
      </div>

      <div className="relative group">
        <Terminal className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30 group-focus-within:text-blue-400 transition-colors" />
        <input 
          type="text"
          value={quickSkill}
          onChange={(e) => setQuickSkill(e.target.value)}
          onKeyDown={handleQuickAdd}
          placeholder="npx skills add..."
          className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-9 pr-4 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-all shadow-inner"
        />
      </div>

      <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
        {skills.map((skill) => (
          <div 
            key={skill.id} 
            className="liquid-glass-strong border border-white/5 rounded-2xl p-3 flex flex-col gap-2 group hover:border-white/20 transition-all"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-semibold text-white/90">{skill.name}</span>
                <p className="text-[10px] text-white/40 leading-relaxed line-clamp-2">
                  {skill.description}
                </p>
              </div>
              <button 
                onClick={() => handleToggle(skill.id)}
                className="opacity-0 group-hover:opacity-100 p-1 text-white/20 hover:text-red-400 transition-all"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
            
            <div className="bg-black/40 rounded-lg p-2 flex items-center justify-between gap-2">
              <code className="text-[9px] text-blue-300 font-mono truncate">{skill.command}</code>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(skill.command);
                  toast.success('Command copied');
                }}
                className="text-[9px] text-white/30 hover:text-white transition-colors"
              >
                Copy
              </button>
            </div>
          </div>
        ))}
      </div>

      <AddSkillsModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          loadSkills(); 
        }} 
        projectId={projectId}
        currentSkills={skills.map(s => s.id)}
      />
    </div>
  );
};

export default SkillsList;
