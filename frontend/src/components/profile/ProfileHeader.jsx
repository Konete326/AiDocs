import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProfileHeader = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-3">
      <div className="neumorphic-inset inline-flex rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-[#6B7280]">
        Your Profile
      </div>
      <h2 className="text-2xl lg:text-3xl font-medium tracking-tight text-[#3D4852]">
        {user?.displayName || 'Welcome'}
      </h2>
      <p className="text-[#6B7280] text-sm leading-relaxed">
        Manage your account, view your subscription, and upload a photo.
      </p>
      <button
        onClick={() => navigate('/dashboard')}
        className="neumorphic-btn rounded-full px-6 py-2.5 flex items-center gap-2 text-sm text-[#3D4852] font-semibold cursor-pointer"
      >
        <span>View My Projects</span>
        <ArrowUpRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ProfileHeader;

