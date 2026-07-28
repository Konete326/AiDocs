import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useProfileFetch } from '../hooks/useProfileFetch';
import StatsGrid from '../components/profile/StatsGrid';
import ProfileCard from '../components/profile/ProfileCard';
import ProfileHeader from '../components/profile/ProfileHeader';
import McpStatusWidget from '../components/profile/McpStatusWidget';
import MonthlyTokenChart from '../components/profile/ActivityChart';
import AiUsagePanel from '../components/profile/AiUsagePanel';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const {
    user, subscription, projectsCount, completedCount, totalDocs, stats,
    isEditing, setIsEditing, isSaving, saveError,
    editData, setEditData, handleEditToggle, handleSave, handleAvatarUpload,
    isUploadingAvatar
  } = useProfileFetch();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleResetPassword = () => {
    navigate('/forgot-password', { state: { fromProfile: true } });
  };

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : 'N/A';

  return (
    <div className="h-screen w-full flex flex-col bg-[#E0E5EC] overflow-hidden">
      <div className="flex-1 flex flex-col pt-20 px-4 pb-3 md:px-8 min-h-0">
        <div className="max-w-7xl w-full mx-auto flex flex-col flex-1 min-h-0">

          <div className="flex items-center mb-3 mt-2 flex-shrink-0">
            <button
              onClick={() => navigate('/dashboard')}
              className="neumorphic-btn rounded-2xl px-4 py-2 flex items-center gap-2 text-xs text-[#3D4852] font-bold cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 text-[#3D4852]" />
              <span>Dashboard</span>
            </button>
          </div>

          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-0">
            <div className="neumorphic-card rounded-3xl p-5 flex flex-col gap-4 overflow-y-auto min-h-0">
              <ProfileHeader user={user} />
              <StatsGrid projectsCount={projectsCount} completedCount={completedCount} joinedAt={user?.createdAt} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <MonthlyTokenChart monthlyTokens={stats?.monthlyTokens} />
                <AiUsagePanel stats={stats} />
              </div>

              <McpStatusWidget />
            </div>

            <div className="neumorphic-card rounded-3xl overflow-y-auto min-h-0">
              <ProfileCard
                user={user} subscription={subscription} memberSince={memberSince}
                isEditing={isEditing} editData={editData}
                onChange={(f, v) => setEditData({ ...editData, [f]: v })}
                onSave={handleSave} onCancel={() => setIsEditing(false)}
                isSaving={isSaving} saveError={saveError}
                onAvatarUpload={handleAvatarUpload}
                isUploadingAvatar={isUploadingAvatar}
                onLogout={handleLogout}
                onResetPassword={handleResetPassword}
                onEditToggle={handleEditToggle}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
