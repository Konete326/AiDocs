import { Download, Lock, MessageCircle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { downloadZip } from '../../services/exportService';
import UpgradeModal from '../common/UpgradeModal';

const ProjectHeaderActions = ({ project, isPro }) => {
  const navigate = useNavigate();
  const [isDownloading, setIsDownloading] = useState(false);
  const [upgradeModal, setUpgradeModal] = useState({ open: false, feature: '' });

  const handleZipDownload = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    try {
      await downloadZip(project._id, project.title);
    } catch (err) {
      console.error('Export failed:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleProGate = (feature) => {
    if (isPro) {
      if (feature === 'chat') navigate(`/projects/${project._id}/chat`);
      if (feature === 'workspace') navigate(`/projects/${project._id}/workspace`);
    } else {
      setUpgradeModal({ open: true, feature });
    }
  };

  return (
    <>
      <UpgradeModal
        isOpen={upgradeModal.open}
        onClose={() => setUpgradeModal({ open: false, feature: '' })}
        onUpgrade={() => { setUpgradeModal({ open: false, feature: '' }); navigate('/pricing'); }}
      />
      <div className="flex items-center gap-3 flex-wrap">
        
        <button
          onClick={() => handleProGate('chat')}
          className={`liquid-glass rounded-full px-5 py-2.5 flex items-center gap-2 hover:scale-105 transition-all cursor-pointer flex-shrink-0 ${!isPro ? 'text-white/40' : ''}`}
        >
          {isPro ? <MessageCircle className="w-4 h-4 text-white/80" /> : <Lock className="w-4 h-4" />}
          <span className="text-sm font-medium">AI Chat</span>
        </button>

       
        <button
          onClick={() => handleProGate('workspace')}
          className={`liquid-glass rounded-full px-5 py-2.5 flex items-center gap-2 hover:scale-105 transition-all cursor-pointer flex-shrink-0 ${!isPro ? 'text-white/40' : ''}`}
        >
          {!isPro && <Lock className="w-4 h-4" />}
          <span className="text-sm text-white/80 font-medium">⬡ Workspace</span>
        </button>

        {project.status === 'complete' && (
          isPro ? (
            <button
              onClick={handleZipDownload}
              disabled={isDownloading}
              className="liquid-glass rounded-full px-5 py-2 flex flex-col items-center justify-center hover:scale-105 disabled:hover:scale-100 transition-all cursor-pointer disabled:cursor-not-allowed flex-shrink-0"
            >
              <div className="flex items-center gap-2">
                {isDownloading ? <Loader2 className="w-4 h-4 animate-spin opacity-70" /> : <Download className="w-4 h-4 text-white/80" />}
                <span className="text-sm text-white/90 font-medium">Download All</span>
              </div>
              <span className="text-[10px] text-white/40 mt-1 leading-none">Docs + Skills + Code</span>
            </button>
          ) : (
            <button
              onClick={() => setUpgradeModal({ open: true, feature: 'download' })}
              className="liquid-glass rounded-full px-5 py-2 flex flex-col items-center justify-center hover:scale-105 transition-all cursor-pointer text-white/40 flex-shrink-0"
            >
              <div className="flex items-center gap-2 opacity-50">
                <Lock className="w-4 h-4" />
                <span className="text-sm font-medium">Download All</span>
              </div>
              <span className="text-[10px] text-white/30 mt-1 leading-none">Docs + Skills + Code</span>
            </button>
          )
        )}
      </div>
    </>
  );
};

export default ProjectHeaderActions;
