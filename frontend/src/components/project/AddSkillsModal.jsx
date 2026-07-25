import { useState, useEffect, useMemo } from 'react';
import { Search, X, Library } from 'lucide-react';
import { getAllSkills, toggleProjectSkill } from '../../services/skillsService';
import AddSkillItem from './AddSkillItem';

const AddSkillsModal = ({ isOpen, onClose, projectId, currentSkills = [], onToggleSuccess }) => {
  const [allSkills, setAllSkills] = useState([]);
  const [localAddedIds, setLocalAddedIds] = useState(currentSkills);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [togglingId, setTogglingId] = useState(null);

  // Fix Hang: Only load library on open
  useEffect(() => {
    if (isOpen) {
      const load = async () => {
        setIsLoading(true);
        try { const data = await getAllSkills(); setAllSkills(data); }
        catch (err) { console.error('Failed to load library'); }
        finally { setIsLoading(false); }
      };
      load();
    }
  }, [isOpen]);

  // Sync local selection state without re-fetching library
  useEffect(() => {
    setLocalAddedIds(currentSkills);
  }, [currentSkills]);

  const filtered = useMemo(() => 
    allSkills.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.description.toLowerCase().includes(searchQuery.toLowerCase()))
  , [allSkills, searchQuery]);

  const handleToggle = async (skillId) => {
    setTogglingId(skillId);
    // Optimistic Update
    const wasAdded = localAddedIds.includes(skillId);
    setLocalAddedIds(prev => wasAdded ? prev.filter(id => id !== skillId) : [...prev, skillId]);
    try {
      await toggleProjectSkill(projectId, skillId);
      if (onToggleSuccess) onToggleSuccess();
    } catch { 
      setLocalAddedIds(currentSkills); // Rollback
    } finally { setTogglingId(null); }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl max-h-[85vh] liquid-glass-strong border border-white/10 rounded-[2.5rem] flex flex-col overflow-hidden shadow-2xl">
        <div className="p-8 pb-4 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400">
              <Library className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Skills Library</h2>
              <p className="text-xs text-white/40">Browse and add specialized skills to your project.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors cursor-pointer"><X className="w-5 h-5 text-white/40" /></button>
        </div>

        <div className="px-8 py-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-blue-400 transition-colors" />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search specialized skills..." className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/40 transition-all shadow-inner" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-8 pb-8 space-y-3 custom-scrollbar">
          {isLoading ? <div className="py-20 text-center text-white/20 animate-pulse">Loading Library...</div> : filtered.map(s => <AddSkillItem key={s.id} skill={s} isAdded={localAddedIds.includes(s.id)} isToggling={togglingId === s.id} onToggle={handleToggle} />)}
        </div>
      </div>
    </div>
  );
};

export default AddSkillsModal;
