import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Zap } from 'lucide-react';
import { getProjects, deleteProject } from '../services/projectService';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import DashboardPagination from '../components/dashboard/DashboardPagination';
import ProjectCard from '../components/dashboard/ProjectCard';
import EmptyState from '../components/dashboard/EmptyState';
import { useConfirmModal, useAlertModal } from '../hooks/useModal';
import ConfirmModal from '../components/common/ConfirmModal';
import AlertModal from '../components/common/AlertModal';
import { toast } from 'react-hot-toast';

const Dashboard = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [draftInfo, setDraftInfo] = useState(null);
  const [activeGenInfo, setActiveGenInfo] = useState(null);

  const { modal: confirmModal, confirm, close: closeConfirm, handleConfirm } = useConfirmModal();
  const { modal: alertModal, alert: triggerAlert, close: closeAlert } = useAlertModal();

  useEffect(() => {
    try {
      const rawDraft = localStorage.getItem('draft_wizard_state');
      if (rawDraft) {
        const parsed = JSON.parse(rawDraft);
        const isExpired = parsed.expiresAt && new Date(parsed.expiresAt) < new Date();
        if (isExpired) {
          localStorage.removeItem('draft_wizard_state');
        } else if (parsed.formData?.title || parsed.formData?.wizardAnswers?.problemStatement) {
          setDraftInfo(parsed);
        }
      }

      const rawGen = localStorage.getItem('clarifyai_active_generation');
      if (rawGen) {
        const parsedGen = JSON.parse(rawGen);
        const isFresh = parsedGen.startedAt && (Date.now() - parsedGen.startedAt < 30 * 60 * 1000);
        if (isFresh && parsedGen.projectId) {
          setActiveGenInfo(parsedGen);
        } else {
          localStorage.removeItem('clarifyai_active_generation');
        }
      }
    } catch {}
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsData = await getProjects();
        setProjects(projectsData || []);
        const activeGen = projectsData?.find(p => p.status === 'generating');
        if (activeGen) {
          const genObj = {
            projectId: activeGen._id,
            title: activeGen.title,
            startedAt: Date.now()
          };
          setActiveGenInfo(genObj);
          localStorage.setItem('clarifyai_active_generation', JSON.stringify(genObj));
        } else if (activeGenInfo && !projectsData?.some(p => p._id === activeGenInfo.projectId && p.status === 'generating')) {
          localStorage.removeItem('clarifyai_active_generation');
          setActiveGenInfo(null);
        }
      } catch {
        setProjects([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalPages = Math.ceil(projects.length / itemsPerPage) || 1;

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProjects = useMemo(() => {
    return projects.slice(startIndex, endIndex);
  }, [projects, startIndex, endIndex]);

  const handleDelete = (id) => {
    confirm({
      title: 'Delete Project',
      message: 'This project and all its documents will be permanently deleted.',
      confirmLabel: 'Delete',
      isDangerous: true,
      onConfirm: async () => {
        try {
          await deleteProject(id);
          setProjects(prev => prev.filter(p => p._id !== id));
          toast.success('Project deleted successfully');
        } catch {
          triggerAlert({ title: 'Delete Failed', message: 'Could not delete project.' });
        }
      }
    });
  };

  return (
    <div className="relative min-h-screen w-full bg-[#E0E5EC] text-[#3D4852]">
      <ConfirmModal isOpen={confirmModal.isOpen} title={confirmModal.title} message={confirmModal.message} confirmLabel={confirmModal.confirmLabel} cancelLabel={confirmModal.cancelLabel} onConfirm={handleConfirm} onCancel={closeConfirm} isDangerous={confirmModal.isDangerous} />
      <AlertModal isOpen={alertModal.isOpen} title={alertModal.title} message={alertModal.message} buttonLabel={alertModal.buttonLabel} onClose={closeAlert} />

      <div className="relative z-10 pt-16 sm:pt-20 pb-8 px-4 md:px-8 max-w-[95%] xl:max-w-[1500px] mx-auto">
        <DashboardHeader projectCount={projects.length} />

        {activeGenInfo && (
          <div className="my-3 p-3.5 rounded-2xl neumorphic-card bg-[#E0E5EC] flex flex-wrap items-center justify-between gap-3 border border-emerald-500/40 shadow-lg animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-600 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <Zap className="w-4 h-4 relative z-10" />
              </div>
              <div>
                <p className="text-xs font-extrabold text-[#3D4852] flex items-center gap-2">
                  <span>AI Document Generation in Progress: &ldquo;{activeGenInfo.title || 'Active Project'}&rdquo;</span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 animate-pulse">
                    Live Stream
                  </span>
                </p>
                <p className="text-[11px] text-[#6B7280]">
                  Your AI documentation stream is actively generating in the background.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  localStorage.removeItem('clarifyai_active_generation');
                  setActiveGenInfo(null);
                }}
                className="neumorphic-btn rounded-xl px-3 py-1.5 text-xs text-[#6B7280] font-bold hover:scale-105 transition-transform cursor-pointer"
              >
                Dismiss
              </button>
              <button
                onClick={() => navigate(`/projects/${activeGenInfo.projectId}`)}
                className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl px-4 py-1.5 text-xs font-extrabold shadow-md hover:scale-105 transition-transform cursor-pointer border-none flex items-center gap-1.5"
              >
                <span>View Live Progress</span>
                <span>↗</span>
              </button>
            </div>
          </div>
        )}

        {draftInfo && (
          <div className="my-3 p-3.5 rounded-2xl neumorphic-card bg-[#E0E5EC] flex flex-wrap items-center justify-between gap-3 border border-[#6C63FF]/40 shadow-lg animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#6C63FF]/15 flex items-center justify-center text-[#6C63FF]">
                <RotateCcw className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-extrabold text-[#3D4852]">
                  Unfinished Wizard Draft Found: &ldquo;{draftInfo.formData?.title || 'Untitled Project'}&rdquo; (Step {draftInfo.step || 1})
                </p>
                <p className="text-[11px] text-[#6B7280]">
                  You have an active setup draft saved within the last 12 hours.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  localStorage.removeItem('draft_wizard_state');
                  setDraftInfo(null);
                }}
                className="neumorphic-btn rounded-xl px-3 py-1.5 text-xs text-[#6B7280] font-bold hover:scale-105 transition-transform cursor-pointer"
              >
                Dismiss
              </button>
              <button
                onClick={() => navigate('/create-project')}
                className="bg-[#6C63FF] hover:bg-[#8B84FF] text-white rounded-xl px-4 py-1.5 text-xs font-extrabold shadow-md hover:scale-105 transition-transform cursor-pointer border-none"
              >
                Resume Wizard
              </button>
            </div>
          </div>
        )}

        <div className="mt-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-extrabold text-[#3D4852]">
              All Projects ({projects.length})
            </h2>
            <button
              onClick={() => navigate('/create-project')}
              className="bg-[#6C63FF] hover:bg-[#8B84FF] text-white rounded-xl px-4 py-2 text-xs font-extrabold shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer border-none"
            >
              + New Project
            </button>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-48 rounded-2xl bg-black/5 animate-pulse" />
              ))}
            </div>
          ) : projects.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {paginatedProjects.map((p) => (
                  <ProjectCard key={p._id} project={p} onDelete={handleDelete} />
                ))}
              </div>
              <DashboardPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                itemsPerPage={itemsPerPage}
                onItemsPerPageChange={setItemsPerPage}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
