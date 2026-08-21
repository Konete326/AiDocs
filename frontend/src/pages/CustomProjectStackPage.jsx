import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getProject, updateProject, triggerGeneration } from '../services/projectService';
import LoadingSpinner from '../components/common/LoadingSpinner';
import CustomStackBuilderPanel from '../components/project/CustomStackBuilderPanel';
import { toast } from 'react-hot-toast';

export default function CustomProjectStackPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        setProject(await getProject(id));
      } catch {
        setErrorMsg('Failed to load project details.');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  const handleSaveCustomStack = async (customConfig) => {
    const currentStack = project?.wizardAnswers?.techPreferences || '';
    if (customConfig.formattedValue.trim().toLowerCase() === currentStack.trim().toLowerCase()) {
      toast.success('This custom architecture is already active for this project');
      navigate(`/projects/${id}`);
      return;
    }

    setIsUpdating(true);
    setErrorMsg('');
    try {
      const updatedAnswers = { ...(project.wizardAnswers || {}), techPreferences: customConfig.formattedValue };
      await updateProject(id, { wizardAnswers: updatedAnswers });
      await triggerGeneration(id, true);
      toast.success('Custom target stack updated successfully!');
      navigate(`/projects/${id}`);
    } catch (err) {
      const msg = err.response?.data?.error;
      const finalMsg = typeof msg === 'string' ? msg : 'Failed to update target stack.';
      setErrorMsg(finalMsg);
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

  const currentCustomConfig = project?.wizardAnswers?.techPreferences?.startsWith('Custom Stack:')
    ? { formattedValue: project.wizardAnswers.techPreferences }
    : null;

  return (
    <div className="min-h-screen w-full bg-[#E0E5EC] text-[#3D4852] pt-20 pb-4 px-3 sm:px-5 lg:px-6 flex flex-col justify-start">
      <div className="max-w-7xl w-full mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={() => navigate(`/projects/${id}/stack`)}
            className="neumorphic-btn rounded-full p-2 text-[#3D4852] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-widest text-[#6C63FF] font-mono font-bold neumorphic-inset">
                Bespoke Configurator
              </span>
              <span className="text-[#6B7280] text-xs font-medium">• {project?.title}</span>
            </div>
            <h1 className="text-lg sm:text-xl font-black text-[#3D4852] tracking-tight">Custom Architecture Configurator</h1>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-2 px-3 py-1.5 rounded-xl neumorphic-inset text-rose-600 text-xs font-bold flex items-center">
            <span>{errorMsg}</span>
          </div>
        )}

        <CustomStackBuilderPanel
          onSaveCustomStack={handleSaveCustomStack}
          currentCustom={currentCustomConfig}
          isUpdating={isUpdating}
          project={project}
        />
      </div>
    </div>
  );
}
