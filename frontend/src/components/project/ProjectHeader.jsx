import { useState, useEffect, useRef } from 'react';
import { Pencil, Check, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAlertModal } from '../../hooks/useModal';
import AlertModal from '../common/AlertModal';
import ProjectHeaderActions from './ProjectHeaderActions';
import { updateProject } from '../../services/projectService';
import { toast } from 'react-hot-toast';

const STATUS_STYLES = {
  draft: 'text-[#6B7280] bg-black/5 border-[#CAD1DB]',
  generating: 'text-[#6C63FF] bg-[#6C63FF]/10 border-[#6C63FF]/30 animate-pulse',
  complete: 'text-emerald-700 bg-emerald-500/10 border-emerald-500/30',
  error: 'text-rose-600 bg-rose-500/10 border-rose-500/30',
};

const ProjectHeader = ({ project, subscription, onOpenSkills, onProjectUpdated }) => {
  const { user } = useAuth();
  const { modal, alert: triggerAlert, close } = useAlertModal();
  const isPro = ['pro', 'team'].includes(subscription?.plan) || user?.role === 'admin';

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleValue, setTitleValue] = useState(project?.title || '');
  const [isSavingTitle, setIsSavingTitle] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setTitleValue(project?.title || '');
  }, [project?.title]);

  useEffect(() => {
    if (isEditingTitle && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditingTitle]);

  const handleSaveTitle = async () => {
    const trimmed = titleValue.trim();
    if (!trimmed || trimmed === project?.title) {
      setTitleValue(project?.title || '');
      setIsEditingTitle(false);
      return;
    }

    setIsSavingTitle(true);
    try {
      const updated = await updateProject(project._id, { title: trimmed });
      if (onProjectUpdated) {
        onProjectUpdated({ ...project, title: trimmed });
      }
      toast.success('Project renamed successfully');
      setIsEditingTitle(false);
    } catch (err) {
      toast.error('Failed to rename project');
      setTitleValue(project?.title || '');
      setIsEditingTitle(false);
    } finally {
      setIsSavingTitle(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSaveTitle();
    } else if (e.key === 'Escape') {
      setTitleValue(project?.title || '');
      setIsEditingTitle(false);
    }
  };

  const handleZipDownload = () => {
    triggerAlert({
      title: 'Coming Soon',
      message: 'ZIP download feature is currently in development. Your Pro plan will give you full access once it launches!'
    });
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
      <AlertModal isOpen={modal.isOpen} title={modal.title} message={modal.message} onClose={close} />
      <div className="flex-1 min-w-0">
        <div>
          {isEditingTitle ? (
            <div className="flex items-center gap-2 max-w-md">
              <input
                ref={inputRef}
                type="text"
                value={titleValue}
                onChange={(e) => setTitleValue(e.target.value)}
                onBlur={handleSaveTitle}
                onKeyDown={handleKeyDown}
                disabled={isSavingTitle}
                className="w-full bg-[#E0E5EC] text-lg sm:text-xl font-black text-[#3D4852] px-3 py-1 rounded-xl outline-none neumorphic-inset border border-[#CAD1DB]"
                placeholder="Project title..."
              />
              {isSavingTitle ? (
                <Loader2 className="w-4 h-4 animate-spin text-[#6C63FF] shrink-0" />
              ) : (
                <button
                  onClick={handleSaveTitle}
                  className="w-7 h-7 rounded-lg neumorphic-btn flex items-center justify-center text-[#6C63FF] shrink-0 cursor-pointer"
                  title="Save title"
                >
                  <Check className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 group">
              <h1 
                onDoubleClick={() => setIsEditingTitle(true)}
                title="Double-click to rename project"
                className="text-xl sm:text-2xl font-black text-[#3D4852] tracking-tight truncate cursor-pointer hover:text-[#6C63FF] transition-colors"
              >
                {project.title}
              </h1>
              <button
                onClick={() => setIsEditingTitle(true)}
                className="p-1 rounded-lg hover:bg-black/5 text-[#6B7280] hover:text-[#6C63FF] opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shrink-0"
                title="Rename Project"
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <div className="flex items-center gap-2 mt-1.5">
            <span className="neumorphic-inset rounded-full px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#6B7280] border border-[#CAD1DB]">
              {project.projectType || 'Full-Stack Web App'}
            </span>
            <span className={`rounded-full px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider border ${STATUS_STYLES[project.status] || 'text-[#6B7280] bg-black/5 border-[#CAD1DB]'}`}>
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
