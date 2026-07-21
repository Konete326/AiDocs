import { Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import UserAvatar from '../common/UserAvatar';
import { useAuth } from '../../context/AuthContext';
import { SpecialText } from '../ui/SpecialText';

export default function DashboardHeader({ projectCount }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleNewProject = () => {
    navigate('/projects/new');
  };

  return (
    <div className="flex items-center justify-between mt-6">
      <div className="flex items-center gap-4">
        <UserAvatar user={user} size="md" />
        <div>
          <h1 className="text-3xl font-medium text-white">Your Projects</h1>
          <p className="text-sm text-white/50 mt-1 uppercase tracking-wider flex items-center gap-1">
            <SpecialText speed={15} inView={true} className="text-white/50">
              {`free plan · ${projectCount} projects created (limited time offer - unlimited access)`}
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
    </div>
  );
}
