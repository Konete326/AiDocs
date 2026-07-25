import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getProjects, deleteProject } from '../services/projectService';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import ProjectCard from '../components/dashboard/ProjectCard';
import EmptyState from '../components/dashboard/EmptyState';
import { useConfirmModal, useAlertModal } from '../hooks/useModal';
import ConfirmModal from '../components/common/ConfirmModal';
import AlertModal from '../components/common/AlertModal';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { modal: confirmModal, confirm, close: closeConfirm, handleConfirm } = useConfirmModal();
  const { modal: alertModal, alert: triggerAlert, close: closeAlert } = useAlertModal();

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

      <div className="relative z-10 pt-28 p-6 md:p-12 lg:p-16 max-w-7xl mx-auto min-h-screen">
        <DashboardHeader projectCount={projects?.length || 0} />

        <div className="mt-8 space-y-6">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="neumorphic-inset rounded-[32px] p-6 h-48 animate-pulse">
                  <div className="h-4 bg-[#6B7280]/20 rounded-full w-3/4 mb-4" />
                  <div className="h-3 bg-[#6B7280]/20 rounded-full w-1/2" />
                </div>
              ))}
            </div>
          ) : (projects?.length || 0) === 0 ? (
            <EmptyState />
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map(project => (
                <ProjectCard key={project._id} project={project} onDelete={handleDelete} />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
