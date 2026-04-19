import { useState, useEffect, useMemo } from 'react';
import { Search, Plus, Trash2, Library, Terminal, Copy, Cpu, Layout, Cloud, Smartphone, Check } from 'lucide-react';
import { getProjectSkills, toggleProjectSkill } from '../../services/skillsService';
import { toast } from 'react-hot-toast';
import AddSkillsModal from './AddSkillsModal';
import ConfirmModal from '../common/ConfirmModal';

const CATEGORIES = [
  { id: 'all', name: 'All', icon: Library },
  { id: 'core', name: 'Core', icon: Cpu },
  { id: 'mern', name: 'MERN', icon: Smartphone },
  { id: 'ui', name: 'UI/UX', icon: Layout },
  { id: 'ai', name: 'AI', icon: Cpu },
  { id: 'cloud', name: 'Cloud', icon: Cloud },
];

const SkillsList = ({ projectId }) => {
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [skillToToggle, setSkillToToggle] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const loadSkills = async () => {
    try {
      const data = await getProjectSkills(projectId);
      setSkills(data || []);
    } catch (err) {
      console.error('Failed to load skills');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSkills();
  }, [projectId]);

  const handleToggle = async () => {
    if (!skillToToggle) return;
    try {
      await toggleProjectSkill(projectId, skillToToggle.id);
      await loadSkills();
      toast.success(`Skill "${skillToToggle.name}" updated`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update skill');
    } finally {
      setSkillToToggle(null);
    }
  };

  const filteredSkills = useMemo(() => {
    let result = skills;

    if (activeCategory !== 'all') {
      result = result.filter(s => {
        const id = s.id.toLowerCase();
        if (activeCategory === 'mern') return id.includes('mern') || id.includes('node') || id.includes('mongo') || id.includes('express');
        if (activeCategory === 'ui') return id.includes('design') || id.includes('ui') || id.includes('ux') || id.includes('tailwind');
        if (activeCategory === 'ai') return id.includes('ai') || id.includes('agent') || id.includes('claude') || id.includes('soultrace');
        if (activeCategory === 'cloud') return id.includes('deploy') || id.includes('azure') || id.includes('vercel') || id.includes('firebase');
        if (activeCategory === 'core') return id.includes('clean') || id.includes('skill-creator') || id.includes('typescript') || id.includes('structure');
        return true;
      });
    }

    if (searchQuery) {
      result = result.filter(skill => 
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return result;
  }, [skills, searchQuery, activeCategory]);

  const handleCopy = (skill) => {
    navigator.clipboard.writeText(skill.command);
    setCopiedId(skill.id);
    toast.success('Command copied');
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (isLoading) return <div className="text-white/20 text-xs p-4">Loading skills...</div>;

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-200px)]">
      <div className="flex items-center justify-between px-1 mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-white/90">Project Skills</h3>
          <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full font-bold">
            {skills.length} Loaded
          </span>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] text-white/60 hover:text-white transition-all border border-white/5"
        >
          <Library className="w-3 h-3" />
          Browse Library
        </button>
      </div>

      <div className="relative group mb-4">
        <Terminal className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30 group-focus-within:text-blue-400 transition-colors" />
        <input 
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="npx search skills..."
          className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 pl-9 pr-4 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-all shadow-inner"
        />
      </div>

      <div className="flex items-center gap-1 overflow-x-auto pb-2 scrollbar-none mb-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`
              flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] whitespace-nowrap transition-all border
              ${activeCategory === cat.id 
                ? 'bg-blue-500/20 border-blue-500/30 text-blue-400' 
                : 'bg-white/5 border-transparent text-white/40 hover:bg-white/10'}
            `}
          >
            <cat.icon className="w-3 h-3" />
            {cat.name}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto pr-1 space-y-2 custom-scrollbar min-h-0">
        {filteredSkills.length > 0 ? (
          filteredSkills.map((skill) => (
            <div 
              key={skill.id} 
              className="group relative animate-in fade-in slide-in-from-right-2 duration-300"
            >
              <div className="liquid-glass border border-white/5 rounded-xl p-3 hover:border-white/20 hover:bg-white/[0.03] transition-all cursor-default">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-medium text-white/90 truncate">{skill.name}</span>
                      <span className="text-[8px] text-white/20 font-mono">#{skill.id.slice(0, 8)}</span>
                    </div>
                    <p className="text-[10px] text-white/40 line-clamp-1 group-hover:line-clamp-none transition-all leading-relaxed">
                      {skill.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleCopy(skill)}
                      className="p-1.5 hover:bg-white/10 rounded-lg text-white/40 hover:text-blue-400 transition-all"
                      title="Copy npx command"
                    >
                      {copiedId === skill.id ? (
                        <Check className="w-3.5 h-3.5 text-green-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <button 
                      onClick={() => setSkillToToggle(skill)}
                      className="p-1.5 hover:bg-red-500/20 rounded-lg text-white/20 hover:text-red-400 transition-all"
                      title="Delete Skill"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="mt-2 h-0 group-hover:h-auto overflow-hidden transition-all border-t border-white/5 pt-2">
                  <div className="bg-black/40 rounded-lg py-1.5 px-2.5 flex items-center justify-between gap-2 overflow-hidden border border-white/5">
                    <code className="text-[9px] text-blue-300 font-mono truncate">{skill.command}</code>
                    <div className="text-[8px] text-white/20 font-mono uppercase tracking-widest shrink-0">Terminal Ready</div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-10 opacity-20">
            <Library className="w-8 h-8 mb-2" />
            <p className="text-[10px]">No skills matching your criteria</p>
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-white/5">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full py-3 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 rounded-2xl text-[11px] font-semibold text-blue-400 flex items-center justify-center gap-2 transition-all group shadow-lg"
        >
          <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
          Add More Skills
        </button>
      </div>

      <ConfirmModal 
        isOpen={!!skillToToggle}
        title="Remove Skill"
        message={`Are you sure you want to remove "${skillToToggle?.name}"? Its expertise will no longer be available in this project's documentation.`}
        confirmLabel="Confirm Removal"
        onConfirm={handleToggle}
        onCancel={() => setSkillToToggle(null)}
        isDangerous={true}
      />

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
