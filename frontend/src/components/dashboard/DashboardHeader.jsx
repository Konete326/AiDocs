import { Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import UserAvatar from '../common/UserAvatar';
import { useAuth } from '../../context/AuthContext';
import UpgradeModal from '../common/UpgradeModal';
import { useState } from 'react';
import { SpecialText } from '../ui/SpecialText';

export default function DashboardHeader({ projectCount, plan, projectLimit }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showUpgrade, setShowUpgrade] = useState(false);

  const handleNewProject = () => {
    if (projectCount >= projectLimit) {
      setShowUpgrade(true);
    } else {
      navigate('/projects/new');
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <UserAvatar user={user} size="md" />
        <div>
          <h1 className="text-3xl font-medium text-white">Your Projects</h1>
          <p className="text-sm text-white/50 mt-1 uppercase tracking-wider flex items-center gap-1">
            <SpecialText speed={15} inView={true} className="text-white/50">
              {`${plan} plan · ${projectCount} / ${projectLimit} projects`}
            </SpecialText>
          </p>
        </div>
      </div>
      <button
        onClick={handleNewProject}
        className="liquid-glass-strong rounded-full px-6 py-3 flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer"
      >
        <Sparkles className="w-4 h-4 text-white" />
        <span className="text-sm text-white font-medium">New Project</span>
      </button>

      <UpgradeModal 
        isOpen={showUpgrade} 
        onClose={() => setShowUpgrade(false)} 
        onUpgrade={() => { setShowUpgrade(false); navigate('/pricing'); }}
      />
    </div>
  );
}
