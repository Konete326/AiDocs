import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ExternalLink } from 'lucide-react';

const ProfileHeader = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between gap-3">
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

        <button
          onClick={() => {
            const uid = user?._id || user?.id;
            if (uid) navigate(`/profile/${uid}`);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-3.5 py-1.5 flex items-center gap-1.5 text-xs font-bold shadow-[3px_3px_6px_rgba(37,99,235,0.3)] active:scale-95 transition-all cursor-pointer flex-shrink-0"
          title="View how others see your public creator profile"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>View Public Profile</span>
        </button>
      </div>
      <p className="text-[#6B7280] text-xs leading-relaxed">
        Manage your account, view your subscription, and upload a photo.
      </p>
    </div>
  );
};

export default ProfileHeader;
