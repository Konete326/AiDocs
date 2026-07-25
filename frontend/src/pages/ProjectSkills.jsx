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

  if (isLoading) return <div className="h-screen flex items-center justify-center bg-[#E0E5EC]"><LoadingSpinner /></div>;
  if (!project) return <div className="h-screen flex items-center justify-center bg-[#E0E5EC] text-[#6B7280]">Project not found.</div>;

  return (
    <div className="relative h-screen max-h-screen w-full overflow-hidden bg-[#E0E5EC] text-[#3D4852]">
      <div className="relative z-10 h-full flex flex-col pt-20 sm:pt-22 px-4 sm:px-6 pb-4 max-w-7xl mx-auto overflow-hidden">
        
        <header className="flex items-center justify-between mb-3 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate(`/projects/${id}`)} 
              className="neumorphic-btn rounded-2xl px-4 py-2 flex items-center gap-2 text-xs sm:text-sm text-[#3D4852] font-bold cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 text-[#3D4852]" /> Back to Project
            </button>
            <h1 className="text-sm sm:text-base font-extrabold text-[#3D4852] truncate max-w-[200px] sm:max-w-md">
              {project?.title} — Skills Manager
            </h1>
          </div>
          <div className="neumorphic-inset rounded-full px-3.5 py-1.5 flex items-center gap-2 text-[10px] text-[#6C63FF] font-mono font-bold uppercase tracking-widest">
            <Cpu className="w-3.5 h-3.5 text-[#6C63FF]" /> {activeSkills.length} Active Skills
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 min-h-0 overflow-hidden">
          
          <div className="lg:col-span-6 flex flex-col liquid-glass rounded-3xl p-4 sm:p-5 h-full overflow-hidden">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-black/5 flex-shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider text-[#3D4852] font-bold">Active Project Skills</span>
                <span className="text-[10px] bg-[#6C63FF] text-white px-2 py-0.5 rounded-full font-bold">{activeSkills.length}</span>
              </div>
              <button
                onClick={copyAllActive}
                disabled={!activeSkills.length}
                className="neumorphic-btn rounded-2xl px-3 py-1.5 text-xs text-[#3D4852] font-bold flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
                title="Copy all active skill commands"
              >
                {copiedAll ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#3D4852]" />}
                <span>Copy All</span>
              </button>
            </div>

            <div className="relative mb-3 flex-shrink-0">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
              <input
                type="text"
                placeholder="Search active skills..."
                value={activeSearch}
                onChange={(e) => setActiveSearch(e.target.value)}
                className="w-full bg-[#E0E5EC] rounded-2xl pl-9 pr-4 py-2 text-xs text-[#3D4852] placeholder-[#6B7280] font-medium outline-none neumorphic-inset"
              />
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 hover-scrollbar custom-scrollbar pr-1 min-h-0">
              {filteredActive.length === 0 ? (
                <div className="h-40 flex flex-col items-center justify-center text-center opacity-70 space-y-2">
                  <Cpu className="w-8 h-8 text-[#6B7280]" />
                  <p className="text-xs text-[#6B7280] font-medium">No active skills added yet.</p>
                </div>
              ) : (
                filteredActive.map((s) => (
                  <div key={s.id} className="neumorphic-btn rounded-2xl p-3.5 space-y-2 group">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#3D4852]">{s.name}</span>
                        <span className="text-[9px] neumorphic-inset text-[#6B7280] px-2 py-0.5 rounded-full font-mono font-bold">{s.source || 'core'}</span>
                      </div>
                      <button
                        onClick={() => handleToggle(s.id)}
                        disabled={togglingId === s.id}
                        className="rounded-2xl px-3 py-1 text-[10px] font-bold flex items-center gap-1 bg-rose-600 hover:bg-rose-700 text-white transition-all cursor-pointer shadow-md"
                        title="Remove skill from project"
                      >
                        <Trash2 className="w-3 h-3 text-white" /> Remove
                      </button>
                    </div>
                    <p className="text-xs text-[#6B7280] leading-relaxed">{s.description}</p>
                    <div className="flex items-center justify-between pt-1 border-t border-black/5">
                      <code className="text-[10px] font-mono text-[#6B7280] truncate max-w-[280px] font-bold">{s.command}</code>
                      <button
                        onClick={() => copyCommand(s.command, s.id)}
                        className="text-[10px] text-[#3D4852] font-bold hover:text-[#6C63FF] flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        {copiedId === s.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        <span>Copy</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col liquid-glass rounded-3xl p-4 sm:p-5 h-full overflow-hidden">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-black/5 flex-shrink-0">
              <div className="flex items-center gap-2">
                <Library className="w-4 h-4 text-[#38B2AC]" />
                <span className="text-xs uppercase tracking-wider text-[#3D4852] font-bold">Available Library Skills</span>
              </div>
              <span className="text-[10px] neumorphic-inset text-[#38B2AC] px-2 py-0.5 rounded-full font-bold">{availableSkills.length}</span>
            </div>

            <div className="relative mb-3 flex-shrink-0">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
              <input
                type="text"
                placeholder="Search skill library..."
                value={librarySearch}
                onChange={(e) => setLibrarySearch(e.target.value)}
                className="w-full bg-[#E0E5EC] rounded-2xl pl-9 pr-4 py-2 text-xs text-[#3D4852] placeholder-[#6B7280] font-medium outline-none neumorphic-inset"
              />
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 hover-scrollbar custom-scrollbar pr-1 min-h-0">
              {filteredAvailable.length === 0 ? (
                <div className="h-40 flex flex-col items-center justify-center text-center opacity-70 space-y-2">
                  <Library className="w-8 h-8 text-[#6B7280]" />
                  <p className="text-xs text-[#6B7280] font-medium">All available skills are active!</p>
                </div>
              ) : (
                filteredAvailable.map((s) => (
                  <div key={s.id} className="neumorphic-btn rounded-2xl p-3.5 space-y-2 group">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#3D4852]">{s.name}</span>
                        <span className="text-[9px] neumorphic-inset text-[#6B7280] px-2 py-0.5 rounded-full font-mono font-bold">{s.source || 'library'}</span>
                      </div>
                      <button
                        onClick={() => handleToggle(s.id)}
                        disabled={togglingId === s.id}
                        className="rounded-2xl px-3 py-1 text-[10px] font-bold flex items-center gap-1 bg-[#6C63FF] hover:bg-[#8B84FF] text-white transition-all cursor-pointer shadow-md"
                        title="Add skill to project"
                      >
                        <Plus className="w-3 h-3 text-white" /> Add to Project
                      </button>
                    </div>
                    <p className="text-xs text-[#6B7280] leading-relaxed">{s.description}</p>
                    <div className="pt-1 border-t border-black/5">
                      <code className="text-[10px] font-mono text-[#6B7280] truncate block font-bold">{s.command}</code>
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
