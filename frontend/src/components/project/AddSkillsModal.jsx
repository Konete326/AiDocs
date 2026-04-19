import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Check, Plus, Loader2 } from 'lucide-react';
import { getAllSkills, toggleProjectSkill } from '../../services/skillsService';
import { toast } from 'react-hot-toast';

const AddSkillsModal = ({ isOpen, onClose, projectId, currentSkills = [] }) => {
  const [allSkills, setAllSkills] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [togglingId, setTogglingId] = useState(null);

  useEffect(() => {
    if (isOpen) {
      loadAllSkills();
    }
  }, [isOpen]);

  const loadAllSkills = async () => {
    setIsLoading(true);
    try {
      const data = await getAllSkills();
      setAllSkills(data);
    } catch {
      toast.error('Failed to load skills library');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggle = async (skillId) => {
    setTogglingId(skillId);
    try {
      await toggleProjectSkill(projectId, skillId);
      toast.success('Skill updated');
      // No need to reload allSkills, parent will reload current active skills
    } catch {
      toast.error('Failed to update skill');
    } finally {
      setTogglingId(null);
    }
  };

  const filtered = allSkills.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.description.toLowerCase().includes(search.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-[#0a0a0b] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"
        >
          {/* Header */}
          <div className="px-8 pt-8 pb-6 flex items-center justify-between border-b border-white/5">
            <div>
              <h2 className="text-2xl font-semibold text-white">Skills Library</h2>
              <p className="text-white/40 text-sm mt-1">Browse and add specialized skills to your project.</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/5 rounded-full text-white/40 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="p-6 border-b border-white/5 bg-white/[0.02]">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-blue-400 transition-colors" />
              <input 
                type="text"
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or functionality..."
                className="w-full bg-[#111] border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-all shadow-inner"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                <p className="text-white/20 text-sm">Loading library...</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-white/20">No skills found matching "{search}"</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {filtered.map((skill) => {
                  const isAdded = currentSkills.includes(skill.id);
                  return (
                    <div 
                      key={skill.id}
                      className={`liquid-glass p-5 rounded-3xl border transition-all flex items-center justify-between gap-6 group
                        ${isAdded ? 'border-blue-500/30 bg-blue-500/5' : 'border-white/5 hover:border-white/10'}`}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-sm font-semibold text-white truncate">{skill.name}</h4>
                          {isAdded && (
                            <span className="text-[9px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded-full uppercase tracking-wider font-bold">
                              Added
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-white/40 leading-relaxed line-clamp-2">
                          {skill.description}
                        </p>
                        <div className="mt-3 inline-flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-lg border border-white/5">
                          <Check className="w-3 h-3 text-blue-400" />
                          <code className="text-[10px] text-white/60 font-mono truncate max-w-[200px]">{skill.command}</code>
                        </div>
                      </div>

                      <button
                        onClick={() => handleToggle(skill.id)}
                        disabled={togglingId === skill.id}
                        className={`
                          flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-all cursor-pointer
                          ${isAdded 
                            ? 'bg-blue-500/20 text-blue-400 hover:bg-red-500/20 hover:text-red-400' 
                            : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white'}
                        `}
                      >
                        {togglingId === skill.id ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : isAdded ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          <Plus className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 bg-white/[0.02] border-t border-white/5 flex items-center justify-between">
            <span className="text-[10px] text-white/20 uppercase tracking-widest">
              {filtered.length} Skills in library
            </span>
            <button 
              onClick={onClose}
              className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white text-xs font-medium rounded-xl transition-all cursor-pointer"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AddSkillsModal;
