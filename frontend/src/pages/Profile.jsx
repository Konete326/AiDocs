import { useNavigate } from 'react-router-dom';
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
    user, subscription, projectsCount, completedCount, stats,
    isEditing, setIsEditing, isSaving, saveError,
    editData, setEditData, handleEditToggle, handleSave,
    handleAvatarUpload, isUploadingAvatar,
    handleBgUpload, isUploadingBg,
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
    <div className="min-h-screen w-full flex flex-col bg-[#E0E5EC] overflow-y-auto pt-20 md:pt-24 px-6 md:px-8 pb-12">
      <div className="w-full max-w-none flex flex-col gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 flex flex-col">
            <ProfileCard
              user={user} subscription={subscription} memberSince={memberSince}
              isEditing={isEditing} editData={editData}
              onChange={(f, v) => setEditData({ ...editData, [f]: v })}
              onSave={handleSave} onCancel={() => setIsEditing(false)}
              isSaving={isSaving} saveError={saveError}
              onAvatarUpload={handleAvatarUpload} isUploadingAvatar={isUploadingAvatar}
              onBgUpload={handleBgUpload} isUploadingBg={isUploadingBg}
              onLogout={handleLogout}
              onResetPassword={handleResetPassword}
              onEditToggle={handleEditToggle}
            />
          </div>

          <div className="lg:col-span-7 bg-[#E0E5EC] rounded-[32px] p-6 shadow-[9px_9px_16px_rgba(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)] border border-[#A3B1C6]/30 flex flex-col gap-5">
            <ProfileHeader user={user} />
            <StatsGrid
              projectsCount={projectsCount}
              componentsCount={user?.submittedComponentsCount || 0}
              completedCount={completedCount}
              joinedAt={user?.createdAt}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <MonthlyTokenChart monthlyTokens={stats?.monthlyTokens} />
              <AiUsagePanel stats={stats} />
            </div>

            <McpStatusWidget />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
