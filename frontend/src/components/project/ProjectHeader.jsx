import { useAuth } from '../../context/AuthContext';
import { useAlertModal } from '../../hooks/useModal';
import AlertModal from '../common/AlertModal';
import ProjectHeaderActions from './ProjectHeaderActions';

const STATUS_STYLES = {
  draft: 'text-slate-500 bg-slate-100 border-slate-200',
  generating: 'text-blue-600 bg-blue-50 border-blue-200 animate-pulse',
  complete: 'text-emerald-700 bg-emerald-50 border-emerald-200',
  error: 'text-red-600 bg-red-50 border-red-200',
};

const ProjectHeader = ({ project, subscription, onOpenSkills, onProjectUpdated }) => {
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
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
      <AlertModal isOpen={modal.isOpen} title={modal.title} message={modal.message} onClose={close} />
      <div className="flex-1">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{project.title}</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="liquid-glass rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-600 border border-slate-200">{project.projectType}</span>
            <span className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider border ${STATUS_STYLES[project.status] || 'text-slate-600 bg-slate-100 border-slate-200'}`}>
              {project.status}
            </span>
          </div>
        </div>
      </div>
      <ProjectHeaderActions project={project} isPro={isPro} handleZipDownload={handleZipDownload} onOpenSkills={onOpenSkills} onProjectUpdated={onProjectUpdated} />
    </div>
  );
};

export default ProjectHeader;
