import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { getProjects, deleteProject, archiveProject, unarchiveProject } from '../services/projectService';
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
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewTab, setViewTab] = useState('active');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const { modal: confirmModal, confirm, close: closeConfirm, handleConfirm } = useConfirmModal();
  const { modal: alertModal, alert: triggerAlert, close: closeAlert } = useAlertModal();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsData = await getProjects({ includeArchived: true });
        setProjects(projectsData || []);
      } catch {
        setProjects([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const activeProjects = useMemo(() => projects.filter(p => !p.isArchived), [projects]);
  const archivedProjects = useMemo(() => projects.filter(p => p.isArchived === true), [projects]);

  const currentTabProjects = viewTab === 'active' ? activeProjects : archivedProjects;

  const filteredProjects = useMemo(() => {
    return currentTabProjects.filter((p) => {
      const matchesSearch =
        !searchQuery.trim() ||
        p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.projectType?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || p.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [currentTabProjects, searchQuery, statusFilter]);

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

  const handleArchive = async (id) => {
    try {
      await archiveProject(id);
      setProjects(prev => prev.map(p => p._id === id ? { ...p, isArchived: true } : p));
      toast.success('Project archived successfully');
    } catch {
      toast.error('Failed to archive project');
    }
  };

  const handleUnarchive = async (id) => {
    try {
      await unarchiveProject(id);
      setProjects(prev => prev.map(p => p._id === id ? { ...p, isArchived: false } : p));
      toast.success('Project restored successfully');
    } catch {
      toast.error('Failed to restore project');
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#E0E5EC] text-[#3D4852]">
      <ConfirmModal isOpen={confirmModal.isOpen} title={confirmModal.title} message={confirmModal.message} confirmLabel={confirmModal.confirmLabel} cancelLabel={confirmModal.cancelLabel} onConfirm={handleConfirm} onCancel={closeConfirm} isDangerous={confirmModal.isDangerous} />
      <AlertModal isOpen={alertModal.isOpen} title={alertModal.title} message={alertModal.message} buttonLabel={alertModal.buttonLabel} onClose={closeAlert} />

      <div className="relative z-10 pt-20 pb-12 px-4 md:px-8 max-w-[95%] xl:max-w-[1500px] mx-auto">
        <DashboardHeader projectCount={activeProjects.length} />

        <DashboardFilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          viewTab={viewTab}
          setViewTab={(tab) => { setViewTab(tab); setCurrentPage(1); }}
          activeCount={activeProjects.length}
          archivedCount={archivedProjects.length}
        />

        <div className="mt-8 space-y-4">
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
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {paginatedProjects.map(project => (
                  <ProjectCard
                    key={project._id}
                    project={project}
                    onDelete={handleDelete}
                    onArchive={handleArchive}
                    onUnarchive={handleUnarchive}
                  />
                ))}
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
