import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Cpu, Plus, Trash2, Copy, Check, Search, Library } from 'lucide-react';
import { getProject } from '../services/projectService';
import { getProjectSkills, getAllSkills, toggleProjectSkill } from '../services/skillsService';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { toast } from 'react-hot-toast';

export default function ProjectSkills() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [activeSkills, setActiveSkills] = useState([]);
  const [allLibrarySkills, setAllLibrarySkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSearch, setActiveSearch] = useState('');
  const [librarySearch, setLibrarySearch] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [togglingId, setTogglingId] = useState(null);

  const loadData = async () => {
    try {
      const [proj, active, library] = await Promise.all([
        getProject(id),
        getProjectSkills(id),
        getAllSkills()
      ]);
      setProject(proj);
      setActiveSkills(active || []);
      setAllLibrarySkills(library || []);
    } catch (err) {
      toast.error('Failed to load project skills.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const handleToggle = async (skillId) => {
    setTogglingId(skillId);
    try {
      await toggleProjectSkill(id, skillId);
      const updated = await getProjectSkills(id);
      setActiveSkills(updated || []);
      toast.success('Skill updated');
    } catch {
      toast.error('Failed to update skill.');
    } finally {
      setTogglingId(null);
    }
  };

  const copyCommand = (cmd, skillId) => {
    navigator.clipboard.writeText(cmd);
    setCopiedId(skillId);
    toast.success('Command copied');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const copyAllActive = () => {
    if (!activeSkills.length) return;
    const cmds = activeSkills.map(s => s.command).join('\n');
    navigator.clipboard.writeText(cmds);
    setCopiedAll(true);
    toast.success('All active commands copied');
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const availableSkills = useMemo(() => {
    const activeIds = new Set(activeSkills.map(s => s.id));
    return allLibrarySkills.filter(s => !activeIds.has(s.id));
  }, [activeSkills, allLibrarySkills]);

  const filteredActive = useMemo(() => {
    if (!activeSearch.trim()) return activeSkills;
    const q = activeSearch.toLowerCase();
    return activeSkills.filter(s => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q));
  }, [activeSkills, activeSearch]);

  const filteredAvailable = useMemo(() => {
    if (!librarySearch.trim()) return availableSkills;
    const q = librarySearch.toLowerCase();
    return availableSkills.filter(s => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q));
  }, [availableSkills, librarySearch]);

  if (isLoading) return <div className="h-screen flex items-center justify-center"><LoadingSpinner /></div>;
  if (!project) return <div className="h-screen flex items-center justify-center text-white/60">Project not found.</div>;

  return (
    <div className="relative h-screen max-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 bg-black/55 z-[1]" />
      <div className="relative z-10 h-full flex flex-col pt-20 sm:pt-22 px-4 sm:px-6 pb-4 max-w-7xl mx-auto overflow-hidden">
        
        <header className="flex items-center justify-between mb-3 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate(`/projects/${id}`)} 
              className="liquid-glass rounded-full px-4 py-2 flex items-center gap-2 text-xs sm:text-sm text-white/70 hover:text-white transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> Back to Project
            </button>
            <h1 className="text-sm sm:text-base font-medium text-white truncate max-w-[200px] sm:max-w-md">
              {project?.title} — Skills Manager
            </h1>
          </div>
          <div className="liquid-glass rounded-full px-3.5 py-1.5 flex items-center gap-2 text-[10px] text-white/60 uppercase tracking-widest border border-white/5">
            <Cpu className="w-3.5 h-3.5 text-blue-400" /> {activeSkills.length} Active Skills
          </div>
        </header>

        {/* 2-Column Split View - Strictly Non-Scrolling Outer Page */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 min-h-0 overflow-hidden">
          
          {/* Left Column: Active Skills */}
          <div className="lg:col-span-6 flex flex-col liquid-glass-strong rounded-3xl p-4 sm:p-5 border border-white/10 h-full overflow-hidden">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/5 flex-shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider text-white/80 font-semibold">Active Project Skills</span>
                <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full font-bold">{activeSkills.length}</span>
              </div>
              <button
                onClick={copyAllActive}
                disabled={!activeSkills.length}
                className="liquid-glass rounded-full px-3 py-1.5 text-xs text-white/70 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-40 border border-white/5"
                title="Copy all active skill commands"
              >
                {copiedAll ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy All</span>
              </button>
            </div>

            <div className="relative mb-3 flex-shrink-0">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Search active skills..."
                value={activeSearch}
                onChange={(e) => setActiveSearch(e.target.value)}
                className="w-full bg-white/5 rounded-2xl pl-9 pr-4 py-2 text-xs text-white placeholder-white/40 border border-white/5 focus:outline-none focus:border-white/20"
              />
            </div>

            <div className="flex-1 overflow-y-auto space-y-2.5 hover-scrollbar custom-scrollbar pr-1 min-h-0">
              {filteredActive.length === 0 ? (
                <div className="h-40 flex flex-col items-center justify-center text-center opacity-50 space-y-2">
                  <Cpu className="w-8 h-8 text-white/30" />
                  <p className="text-xs text-white/60">No active skills added yet.</p>
                </div>
              ) : (
                filteredActive.map((s) => (
                  <div key={s.id} className="liquid-glass rounded-2xl p-3.5 border border-white/5 space-y-2 group hover:border-white/10 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-white">{s.name}</span>
                        <span className="text-[9px] bg-white/10 text-white/60 px-2 py-0.5 rounded-full font-mono">{s.source || 'core'}</span>
                      </div>
                      <button
                        onClick={() => handleToggle(s.id)}
                        disabled={togglingId === s.id}
                        className="bg-red-500/25 hover:bg-red-500/40 text-red-200 rounded-full px-3 py-1 text-[10px] font-medium flex items-center gap-1 transition-all cursor-pointer border border-red-500/40 shadow-sm"
                        title="Remove skill from project"
                      >
                        <Trash2 className="w-3 h-3" /> Remove
                      </button>
                    </div>
                    <p className="text-xs text-white/60 leading-relaxed">{s.description}</p>
                    <div className="flex items-center justify-between pt-1 border-t border-white/5">
                      <code className="text-[10px] font-mono text-white/40 truncate max-w-[280px]">{s.command}</code>
                      <button
                        onClick={() => copyCommand(s.command, s.id)}
                        className="text-[10px] text-white/50 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        {copiedId === s.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>Copy</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right Column: Available Library Skills */}
          <div className="lg:col-span-6 flex flex-col liquid-glass rounded-3xl p-4 sm:p-5 border border-white/5 h-full overflow-hidden">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/5 flex-shrink-0">
              <div className="flex items-center gap-2">
                <Library className="w-4 h-4 text-blue-400" />
                <span className="text-xs uppercase tracking-wider text-white/80 font-semibold">Available Library Skills</span>
              </div>
              <span className="text-[10px] bg-white/10 text-white/60 px-2 py-0.5 rounded-full font-bold">{availableSkills.length}</span>
            </div>

            <div className="relative mb-3 flex-shrink-0">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Search skill library..."
                value={librarySearch}
                onChange={(e) => setLibrarySearch(e.target.value)}
                className="w-full bg-white/5 rounded-2xl pl-9 pr-4 py-2 text-xs text-white placeholder-white/40 border border-white/5 focus:outline-none focus:border-white/20"
              />
            </div>

            <div className="flex-1 overflow-y-auto space-y-2.5 hover-scrollbar custom-scrollbar pr-1 min-h-0">
              {filteredAvailable.length === 0 ? (
                <div className="h-40 flex flex-col items-center justify-center text-center opacity-50 space-y-2">
                  <Library className="w-8 h-8 text-white/30" />
                  <p className="text-xs text-white/60">All available skills are active!</p>
                </div>
              ) : (
                filteredAvailable.map((s) => (
                  <div key={s.id} className="liquid-glass-strong rounded-2xl p-3.5 border border-white/5 space-y-2 group hover:border-white/15 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-white">{s.name}</span>
                        <span className="text-[9px] bg-white/10 text-white/60 px-2 py-0.5 rounded-full font-mono">{s.source || 'library'}</span>
                      </div>
                      <button
                        onClick={() => handleToggle(s.id)}
                        disabled={togglingId === s.id}
                        className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-3 py-1 text-[10px] font-medium flex items-center gap-1 transition-all cursor-pointer border border-blue-400/40 shadow-sm"
                        title="Add skill to project"
                      >
                        <Plus className="w-3 h-3" /> Add to Project
                      </button>
                    </div>
                    <p className="text-xs text-white/60 leading-relaxed">{s.description}</p>
                    <div className="pt-1 border-t border-white/5">
                      <code className="text-[10px] font-mono text-white/40 truncate block">{s.command}</code>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
