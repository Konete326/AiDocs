import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getProjects, deleteProject } from '../services/projectService';
import { getMySubscription } from '../services/subscriptionService';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import ProjectCard from '../components/dashboard/ProjectCard';
import EmptyState from '../components/dashboard/EmptyState';
import SubscriptionBanner from '../components/dashboard/SubscriptionBanner';
import { useConfirmModal, useAlertModal } from '../hooks/useModal';
import ConfirmModal from '../components/common/ConfirmModal';
import AlertModal from '../components/common/AlertModal';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { modal: confirmModal, confirm, close: closeConfirm, handleConfirm } = useConfirmModal();
  const { modal: alertModal, alert: triggerAlert, close: closeAlert } = useAlertModal();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsData, subData] = await Promise.all([
          getProjects(),
          getMySubscription()
        ]);
        setProjects(projectsData || []);
        setSubscription(subData || null);
      } catch (err) {
        setError('Failed to load dashboard data.');
        setProjects([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    confirm({
      title: 'Delete Project',
      message: 'This project and all its documents will be permanently deleted. This cannot be undone.',
      confirmLabel: 'Delete',
      onConfirm: async () => {
        try {
          await deleteProject(id);
          setProjects(prev => prev.filter(p => p._id !== id));
        } catch (err) {
          triggerAlert({
            title: 'Delete Failed',
            message: 'We could not delete the project at this time.'
          });
        }
      }
    });
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        confirmLabel={confirmModal.confirmLabel}
        cancelLabel={confirmModal.cancelLabel}
        onConfirm={handleConfirm}
        onCancel={closeConfirm}
      />
      
      <AlertModal
        isOpen={alertModal.isOpen}
        title={alertModal.title}
        message={alertModal.message}
        buttonLabel={alertModal.buttonLabel}
        onClose={closeAlert}
      />

      {/* Dark overlay — video from PersistentBackground in App.jsx */}
      <div className="fixed inset-0 bg-black/55 z-[1]" />
      
      <div className="relative z-10 pt-20 p-6 md:p-12 lg:p-16 max-w-7xl mx-auto min-h-screen">
        <DashboardHeader projectCount={projects?.length || 0} plan={subscription?.plan || 'free'} />

        <div className="mt-12 space-y-8">
          {projects.length >= (subscription?.projectLimit || 3) && (
            <SubscriptionBanner 
              projectsUsed={projects.length}
              projectLimit={subscription?.projectLimit || 3}
            />
          )}

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="liquid-glass rounded-3xl p-6 h-48 animate-pulse">
                  <div className="h-4 bg-white/10 rounded-full w-3/4 mb-4" />
                  <div className="h-3 bg-white/10 rounded-full w-1/2" />
                </div>
              ))}
            </div>
          ) : (projects?.length || 0) === 0 ? (
            <EmptyState />
          ) : (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
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
