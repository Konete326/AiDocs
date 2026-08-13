import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { getProjects, deleteProject } from '../services/projectService';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import DashboardFilterBar from '../components/dashboard/DashboardFilterBar';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [draftInfo, setDraftInfo] = useState(null);

  const { modal: confirmModal, confirm, close: closeConfirm, handleConfirm } = useConfirmModal();
  const { modal: alertModal, alert: triggerAlert, close: closeAlert } = useAlertModal();

  useEffect(() => {
    try {
      const raw = localStorage.getItem('draft_wizard_state');
      if (raw) {
        const parsed = JSON.parse(raw);
        const isExpired = parsed.expiresAt && new Date(parsed.expiresAt) < new Date();
        if (isExpired) {
          localStorage.removeItem('draft_wizard_state');
        } else if (parsed.formData?.title || parsed.formData?.wizardAnswers?.problemStatement) {
          setDraftInfo(parsed);
        }
      }
    } catch {}
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsData = await getProjects();
        setProjects(projectsData || []);
      } catch {
        setProjects([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch =
        !searchQuery.trim() ||
        p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.projectType?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || p.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [projects, searchQuery, statusFilter]);

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage) || 1;

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProjects = useMemo(() => {
    return filteredProjects.slice(startIndex, endIndex);
  }, [filteredProjects, startIndex, endIndex]);

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

        <DashboardFilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        <div className="mt-5 space-y-4">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="neumorphic-inset rounded-[24px] p-4 h-36 animate-pulse">
                  <div className="h-4 bg-[#6B7280]/20 rounded-full w-3/4 mb-3" />
                  <div className="h-3 bg-[#6B7280]/20 rounded-full w-1/2" />
                </div>
              ))}
            </div>
          ) : filteredProjects.length === 0 ? (
            projects.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="bg-[#E0E5EC] rounded-[32px] p-10 text-center border border-white/60 shadow-[inset_6px_6px_10px_rgba(163,177,198,0.6),inset_-6px_-6px_10px_rgba(255,255,255,0.5)] my-6">
                <p className="text-[#3D4852] font-bold text-sm">No projects match your current search or filter criteria.</p>
                <button
                  onClick={() => { setSearchQuery(''); setStatusFilter('all'); }}
                  className="mt-4 rounded-2xl px-4 py-2 bg-[#6C63FF] text-white text-xs font-bold shadow-md hover:bg-[#8B84FF] transition-all cursor-pointer"
                >
                  Clear Filters
                </button>
              </div>
            )
          ) : (
            <>
              <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <AnimatePresence mode="popLayout">
                  {paginatedProjects.map(project => (
                    <motion.div
                      key={project._id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: 'easeInOut' }}
                    >
                      <ProjectCard
                        project={project}
                        onDelete={handleDelete}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              <DashboardPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                totalItems={filteredProjects.length}
                startIndex={startIndex}
                endIndex={endIndex}
                itemsPerPage={itemsPerPage}
                onItemsPerPageChange={(size) => { setItemsPerPage(size); setCurrentPage(1); }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
