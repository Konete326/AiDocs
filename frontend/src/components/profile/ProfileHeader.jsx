import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const ProfileHeader = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="neumorphic-btn rounded-xl px-3 py-1.5 flex items-center gap-1 text-[11px] text-[#3D4852] font-bold cursor-pointer flex-shrink-0"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </button>
          <h2 className="text-xl font-bold tracking-tight text-[#3D4852] truncate">
            {user?.displayName || 'Welcome'}
          </h2>
        </div>
        <span className="bg-[#6C63FF] text-white rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.3em] flex-shrink-0">
          Your Profile
        </span>
      </div>
      <p className="text-[#6B7280] text-xs leading-relaxed">
        Manage your account, view your subscription, and upload a photo.
      </p>
    </div>
  );
};

export default ProfileHeader;
