import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Code2, Loader2, ShieldAlert } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../services/api';
import EditorSkeletonLoader from '../components/vscode/EditorSkeletonLoader';
import UnsavedChangesModal from '../components/vscode/UnsavedChangesModal';

export default function EditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [workspace, setWorkspace] = useState(null);
  const [error, setError] = useState(null);
  const [showExitModal, setShowExitModal] = useState(false);

  useEffect(() => {
    const initWorkspace = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.post(`/vscode/workspace/${id}`);
        if (res.data?.success) setWorkspace(res.data.data);
        else setError(res.data?.error || 'Failed to initialize workspace');
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to connect to VS Code workspace service');
      } finally {
        setLoading(false);
      }
    };
    if (id) initWorkspace();
  }, [id]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || (e.ctrlKey && e.shiftKey && (e.key === 'E' || e.key === 'e'))) {
        e.preventDefault();
        setShowExitModal(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleBackClick = () => {
    api.delete(`/vscode/workspace/${id}`).catch(() => {});
    if (id) navigate('/components/' + id);
    else navigate('/components');
  };

  return (
    <div className="h-screen w-screen bg-[#E0E5EC] flex flex-col overflow-hidden">
      <header className="h-11 px-4 bg-[#E0E5EC] border-b border-[#A3B1C6]/30 shadow-[0_2px_8px_rgba(163,177,198,0.3)] flex items-center justify-between z-10 flex-shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={() => setShowExitModal(true)} className="px-3 py-1 bg-[#E0E5EC] text-[#3D4852] font-bold text-xs rounded-lg shadow-[3px_3px_6px_rgba(163,177,198,0.6),-3px_-3px_6px_rgba(255,255,255,0.5)] hover:text-blue-600 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer border border-[#A3B1C6]/20">
            <ArrowLeft className="w-3.5 h-3.5 text-blue-600" />
            <span>Back to Component</span>
          </button>
          <div className="flex items-center gap-2">
            <h1 className="text-xs font-extrabold text-[#3D4852]">{workspace?.title || 'VS Code Web Studio'}</h1>
            <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200 text-[10px] font-bold flex items-center gap-1">
              <Code2 className="w-3 h-3 text-blue-600" />
              <span>VS Code Workspace</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {loading ? (
            <div className="px-2.5 py-0.5 rounded-full bg-[#E0E5EC] text-blue-600 shadow-[inset_2px_2px_4px_rgba(163,177,198,0.5),inset_-2px_-2px_4px_rgba(255,255,255,0.5)] text-[11px] font-bold flex items-center gap-1.5">
              <Loader2 className="w-3 h-3 animate-spin text-blue-600" />
              <span>Mounting Engine...</span>
            </div>
          ) : error ? (
            <div className="px-2.5 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-200 text-[11px] font-bold flex items-center gap-1">
              <ShieldAlert className="w-3 h-3 text-red-600" />
              <span>Error Loading</span>
            </div>
          ) : (
            <div className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold flex items-center gap-1.5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Workspace Active</span>
            </div>
          )}
        </div>
      </header>

      <main className="h-[calc(100vh-44px)] w-full bg-[#E0E5EC] flex flex-col items-center justify-center p-2 relative overflow-hidden">
        {loading ? (
          <EditorSkeletonLoader />
        ) : error ? (
          <div className="flex flex-col items-center gap-3 p-6 rounded-[24px] bg-[#E0E5EC] shadow-[9px_9px_16px_rgba(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)] border border-red-300/50 max-w-md text-center">
            <div className="p-2.5 rounded-2xl bg-red-50 text-red-600 shadow-inner"><ShieldAlert className="w-6 h-6 text-red-600" /></div>
            <h3 className="text-xs font-extrabold text-[#3D4852]">Workspace Initialization Error</h3>
            <p className="text-xs text-[#6B7280] font-medium">{error}</p>
            <button onClick={() => navigate('/components/' + id)} className="mt-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-[3px_3px_6px_rgba(37,99,235,0.3)] active:scale-95 transition-all cursor-pointer">
              Return to Component
            </button>
          </div>
        ) : (
          <div className="w-full h-full rounded-[20px] bg-[#E0E5EC] shadow-[inset_6px_6px_10px_rgba(163,177,198,0.6),inset_-6px_-6px_10px_rgba(255,255,255,0.5)] border border-[#A3B1C6]/30 overflow-hidden relative p-1">
            <iframe src={workspace?.sessionUrl ? (localStorage.getItem('token') ? `${workspace.sessionUrl}&authToken=${encodeURIComponent(localStorage.getItem('token'))}` : workspace.sessionUrl) : ''} title="Official VS Code Web Workbench" className="w-full h-full border-0 rounded-[16px]" />
          </div>
        )}
      </main>

      <UnsavedChangesModal isOpen={showExitModal} onClose={() => setShowExitModal(false)} onConfirm={handleBackClick} />
    </div>
  );
}
