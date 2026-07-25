import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getProject, updateProject, triggerGeneration } from '../services/projectService';
import LoadingSpinner from '../components/common/LoadingSpinner';
import CustomStackBuilderPanel from '../components/project/CustomStackBuilderPanel';

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
    setIsUpdating(true);
    setErrorMsg('');
    try {
      const updatedAnswers = { ...(project.wizardAnswers || {}), techPreferences: customConfig.formattedValue };
      await updateProject(id, { wizardAnswers: updatedAnswers });
      await triggerGeneration(id, true);
      navigate(`/projects/${id}`);
    } catch (err) {
      const msg = err.response?.data?.error;
      setErrorMsg(typeof msg === 'string' ? msg : 'Failed to update target custom stack.');
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-white flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const currentCustomConfig = project?.wizardAnswers?.techPreferences?.startsWith('Custom Stack:')
    ? { formattedValue: project.wizardAnswers.techPreferences }
    : null;

  return (
    <div className="min-h-screen w-full bg-white pt-24 pb-8 px-3 sm:px-5 lg:px-6">
      <div className="max-w-7xl w-full mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate(`/projects/${id}/stack`)}
            className="rounded-full p-2 bg-slate-100 hover:bg-slate-200 transition-all text-slate-700 hover:text-slate-900 border border-slate-200 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-widest text-blue-600 font-mono font-bold bg-blue-50 border border-blue-200">
                Bespoke Configurator
              </span>
              <span className="text-slate-500 text-xs font-medium">• {project?.title}</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Custom Architecture Configurator</h1>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-3 px-3 py-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center">
            <span>{errorMsg}</span>
          </div>
        )}

        <CustomStackBuilderPanel
          onSaveCustomStack={handleSaveCustomStack}
          currentCustom={currentCustomConfig}
          isUpdating={isUpdating}
        />
      </div>
    </div>
  );
}
