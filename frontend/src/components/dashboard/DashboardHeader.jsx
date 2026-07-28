import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import UserAvatar from '../common/UserAvatar';
import { useAuth } from '../../context/AuthContext';
import { SpecialText } from '../ui/SpecialText';

export default function DashboardHeader({ projectCount }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const subtitleText = `Free Plan • ${projectCount} Projects Created (Unlimited Access)`;

  return (
    <div className="flex items-center justify-between mt-4">
      <div className="flex items-center gap-4">
        <div className="p-1 rounded-2xl neumorphic-inset">
          <UserAvatar user={user} size="md" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-[#3D4852] tracking-tight">Your Projects</h1>
          <p className="text-xs text-[#6B7280] font-mono font-bold uppercase tracking-wider mt-1">
            <SpecialText inView speed={20} delay={0.1}>
              {subtitleText}
            </SpecialText>
          </p>
        </div>
      </div>
      <button
        onClick={() => navigate('/projects/new')}
        className="rounded-2xl px-6 py-3 bg-[#6C63FF] hover:bg-[#8B84FF] text-white font-bold text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md"
      >
        <Plus className="w-4 h-4 text-white" />
        <span>New Project</span>
      </button>
    </div>
  );
}
