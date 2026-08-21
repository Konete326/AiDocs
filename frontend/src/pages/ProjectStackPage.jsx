import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, Loader2, Sliders } from 'lucide-react';
import { getProject, updateProject, triggerGeneration } from '../services/projectService';
import LoadingSpinner from '../components/common/LoadingSpinner';
import PresetStackCards from '../components/project/PresetStackCards';
import StackCategoryFilters from '../components/project/StackCategoryFilters';
import { DEFAULT_MERN_VALUE } from '../constants/stackPresets';
import { toast } from 'react-hot-toast';

export default function ProjectStackPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedStack, setSelectedStack] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [isUpdating, setIsUpdating] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        const proj = await getProject(id);
        setProject(proj);
        setSelectedStack(proj?.wizardAnswers?.techPreferences || DEFAULT_MERN_VALUE);
      } catch {
        setErrorMsg('Failed to load project details.');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  const handleApplyStack = async (targetValue) => {
    const valToApply = targetValue || selectedStack;
    const currentStack = project?.wizardAnswers?.techPreferences || DEFAULT_MERN_VALUE;

    if (valToApply.trim().toLowerCase() === currentStack.trim().toLowerCase()) {
      toast.success('This architecture blueprint is already active for this project');
      navigate(`/projects/${id}`);
      return;
    }

    setIsUpdating(true);
    setErrorMsg('');
    try {
      const updatedAnswers = { ...(project.wizardAnswers || {}), techPreferences: valToApply };
      const updatedProj = await updateProject(id, { wizardAnswers: updatedAnswers });
      await triggerGeneration(id, true);
      setProject(updatedProj);
      setSelectedStack(valToApply);
      setSuccessMsg('Target stack updated! Tech specification refreshed.');
      toast.success('Target stack updated successfully!');
      navigate(`/projects/${id}`);
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to update target stack.';
      setErrorMsg(msg);
      toast.error('Failed to update target stack.');
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#E0E5EC] flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#E0E5EC] text-[#3D4852] pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(`/projects/${id}`)} className="neumorphic-btn rounded-full p-2.5 text-[#3D4852] cursor-pointer">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-[9px] uppercase tracking-widest text-[#6C63FF] font-mono font-bold neumorphic-inset">
                  Architecture Engine
                </span>
                <span className="text-[#6B7280] text-xs font-medium">• {project?.title}</span>
              </div>
              <h1 className="text-2xl font-extrabold text-[#3D4852] tracking-tight mt-1">Target Architecture Hub</h1>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button onClick={() => navigate(`/projects/${id}/stack/custom`)} className="neumorphic-btn rounded-2xl px-4 py-2 text-xs font-bold text-[#6C63FF] flex items-center gap-2 cursor-pointer">
              <Sliders className="w-4 h-4 text-[#6C63FF]" />
              <span>Build Custom Stack</span>
            </button>
            <button onClick={() => handleApplyStack(selectedStack)} disabled={isUpdating} className="rounded-2xl px-5 py-2.5 text-xs font-bold text-white flex items-center gap-2 cursor-pointer bg-[#6C63FF] hover:bg-[#8B84FF] shadow-md">
              {isUpdating ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : <Sparkles className="w-4 h-4 text-white" />}
              <span>Save & Re-target Specs</span>
            </button>
          </div>
        </div>

        {successMsg && <div className="mb-4 px-4 py-3 rounded-2xl neumorphic-inset text-[#38B2AC] text-xs font-bold">{successMsg}</div>}
        {errorMsg && <div className="mb-4 px-4 py-3 rounded-2xl neumorphic-inset text-rose-600 text-xs font-bold">{errorMsg}</div>}

        <StackCategoryFilters activeCategory={activeCategory} onSelectCategory={setActiveCategory} project={project} />
        <PresetStackCards selectedStack={selectedStack} onSelectStack={setSelectedStack} onApplyStack={handleApplyStack} isUpdating={isUpdating} activeCategory={activeCategory} project={project} />
      </div>
    </div>
  );
}
