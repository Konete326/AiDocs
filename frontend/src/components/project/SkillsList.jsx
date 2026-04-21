import { useState, useMemo } from 'react';
import { Library, Plus, Cpu, Layout, Cloud, Smartphone, Copy, Check } from 'lucide-react';
import { toggleProjectSkill, getProjectSkills } from '../../services/skillsService';
import { toast } from 'react-hot-toast';
import AddSkillsModal from './AddSkillsModal';
import ConfirmModal from '../common/ConfirmModal';
import SkillItem from './SkillItem';
import SkillFilters from './SkillFilters';

const CATEGORIES = [
  { id: 'all', name: 'All', icon: Library },
  { id: 'core', name: 'Core', icon: Cpu },
  { id: 'mern', name: 'MERN', icon: Smartphone },
  { id: 'ui', name: 'UI/UX', icon: Layout },
  { id: 'ai', name: 'AI/Agents', icon: Cpu },
  { id: 'cloud', name: 'Cloud', icon: Cloud },
];

const SkillsList = ({ projectId, initialSkills = [], onSkillsUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [skillToToggle, setSkillToToggle] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const [copiedAll, setCopiedAll] = useState(false);

  const loadSkills = async () => {
    try {
      const data = await getProjectSkills(projectId);
      if (onSkillsUpdate) onSkillsUpdate(data || []);
    } catch (err) { console.error(err); }
  };

  const handleToggle = async () => {
    if (!skillToToggle) return;
    try {
      await toggleProjectSkill(projectId, skillToToggle.id);
      await loadSkills();
      toast.success(`Skill updated`);
    } catch (err) { toast.error('Update failed'); }
    finally { setSkillToToggle(null); }
  };

  const filteredSkills = useMemo(() => {
    let res = initialSkills;
    if (activeCategory !== 'all') {
      res = res.filter(s => {
        const id = s.id.toLowerCase();
        if (activeCategory === 'mern') return id.includes('mern') || id.includes('node') || id.includes('mongo');
        if (activeCategory === 'ui') return id.includes('tailwind') || id.includes('frontend-design') || id.includes('ui');
        if (activeCategory === 'ai') return id.includes('agent') || id.includes('mcp') || id.includes('ai');
        if (activeCategory === 'cloud') return id.includes('supabase') || id.includes('firebase') || id.includes('foundry') || id.includes('azure') || id.includes('nextjs');
        if (activeCategory === 'core') return id.includes('clean') || id.includes('skill-creator') || id.includes('type') || id.includes('find') || id.includes('frontend-design');
        return true;
      });
    }
    return searchQuery ? res.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase())) : res;
  }, [initialSkills, searchQuery, activeCategory]);

  const copyAll = () => {
    if (!initialSkills.length) return;
    const cmds = initialSkills.map(s => s.command).join('\n');
    navigator.clipboard.writeText(cmds);
    setCopiedAll(true);
    toast.success('All commands copied');
    setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-200px)]">
      <div className="flex items-center justify-between px-1 mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-white/90">Project Skills</h3>
          <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full font-bold">{initialSkills.length}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button 
            onClick={copyAll} 
            className={`p-1.5 rounded-lg transition-all border border-white/5 cursor-pointer ${copiedAll ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-white/5 hover:bg-white/10 text-white/60 hover:text-white'}`}
            title="Copy All Commands"
          >
            {copiedAll ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3 h-3" />}
          </button>
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-1 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] text-white/60 hover:text-white transition-all border border-white/5 cursor-pointer">
            <Library className="w-3 h-3" /> 
            Library
          </button>
        </div>
      </div>

      <SkillFilters searchQuery={searchQuery} setSearchQuery={setSearchQuery} activeCategory={activeCategory} setActiveCategory={setActiveCategory} categories={CATEGORIES} />

      <div className="flex-1 overflow-y-auto pr-1 space-y-2 custom-scrollbar min-h-0">
        {filteredSkills.map(s => <SkillItem key={s.id} skill={s} copiedId={copiedId} onCopy={s => { navigator.clipboard.writeText(s.command); setCopiedId(s.id); toast.success('Copied'); setTimeout(()=>setCopiedId(null), 2000); }} onRemove={setSkillToToggle} />)}
      </div>

      <ConfirmModal isOpen={!!skillToToggle} title="Remove Skill" message={`Remove ${skillToToggle?.name}?`} onConfirm={handleToggle} onCancel={() => setSkillToToggle(null)} isDangerous={true} />
      <AddSkillsModal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); loadSkills(); }} projectId={projectId} currentSkills={initialSkills.map(s => s.id)} onToggleSuccess={loadSkills} />
    </div>
  );
};

export default SkillsList;
