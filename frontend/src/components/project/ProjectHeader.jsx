import { ChevronLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAlertModal } from '../../hooks/useModal';
import AlertModal from '../common/AlertModal';
import ProjectHeaderActions from './ProjectHeaderActions';

const STATUS_STYLES = {
  draft: 'text-white/40',
  generating: 'text-white/70 animate-pulse',
  complete: 'text-white/80',
  error: 'text-white/40',
};

const ProjectHeader = ({ project, onBack, subscription }) => {
  const { user } = useAuth();
  const { modal, alert: triggerAlert, close } = useAlertModal();
  const isPro = ['pro', 'team'].includes(subscription?.plan) || user?.role === 'admin';

  const handleZipDownload = () => {
    triggerAlert({
      title: 'Coming Soon',
      message: 'ZIP download feature is currently in development. Your Pro plan will give you full access once it launches!'
    });
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 md:mb-8">
      <AlertModal isOpen={modal.isOpen} title={modal.title} message={modal.message} onClose={close} />
      <div className="flex-1">
        <button onClick={onBack} className="liquid-glass rounded-full px-4 py-2 flex items-center gap-2 hover:scale-105 transition-all cursor-pointer text-sm text-white/70">
          <ChevronLeft className="w-4 h-4" /> Dashboard
        </button>
        <div className="mt-4">
          <h1 className="text-3xl font-semibold text-white tracking-tight">{project.title}</h1>
          <div className="flex items-center gap-2 mt-2">
            <span className="liquid-glass rounded-full px-3 py-1 text-[10px] uppercase tracking-wider text-white/50">{project.projectType}</span>
            <span className={`liquid-glass rounded-full px-3 py-1 text-[10px] uppercase tracking-wider ${STATUS_STYLES[project.status] || 'text-white/50'}`}>
              {project.status}
            </span>
          </div>
        </div>
      </div>
      <ProjectHeaderActions project={project} isPro={isPro} handleZipDownload={handleZipDownload} />
    </div>
  );
};

export default ProjectHeader;
