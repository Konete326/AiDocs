import { useNavigate } from 'react-router-dom';
import { Pencil, ChevronLeft, Settings as SettingsIcon } from 'lucide-react';
import { useProfileFetch } from '../hooks/useProfileFetch';
import GlassCard from '../components/common/GlassCard';
import ProfileHeader from '../components/profile/ProfileHeader';
import StatsGrid from '../components/profile/StatsGrid';
import ProfileCard from '../components/profile/ProfileCard';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const {
    user, subscription, projectsCount, totalDocs,
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
    <section className="relative min-h-screen overflow-hidden px-4 sm:px-6 py-24 lg:py-32 bg-[#E0E5EC] text-[#3D4852]">
      <div className="relative z-10 mx-auto max-w-6xl">
        <button 
          onClick={() => navigate('/dashboard')}
          className="neumorphic-btn rounded-2xl px-4 py-2 flex items-center gap-2 mb-8 text-xs text-[#3D4852] font-bold cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 text-[#3D4852]" />
          <span>Dashboard</span>
        </button>
        <GlassCard strong className="rounded-[2.5rem] p-6 sm:p-8 md:p-12 relative overflow-visible">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-8">
            <div className="flex-1">
              <ProfileHeader user={user} />
            </div>
            {!isEditing && (
              <button onClick={handleEditToggle} className="neumorphic-btn rounded-2xl px-5 py-2.5 text-xs text-[#3D4852] font-bold flex items-center gap-2 cursor-pointer h-fit self-end sm:self-start">
                <Pencil className="w-4 h-4 text-[#3D4852]" />
                <span>Edit Profile</span>
              </button>
            )}
          </div>
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-8 flex flex-col">
              <StatsGrid projectsCount={projectsCount} totalDocs={totalDocs} plan={subscription?.plan || 'free'} />
            </div>
            <div className="relative">
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
              />
            </div>
          </div>

          <div className="mt-12 flex justify-center border-t border-black/5 pt-8">
            <button 
              onClick={() => navigate('/settings')}
              className="neumorphic-btn rounded-2xl px-6 py-4 flex items-center gap-3 text-xs text-[#3D4852] font-bold w-full sm:w-auto cursor-pointer"
            >
              <SettingsIcon className="w-5 h-5 text-[#6C63FF]" />
              <span>Open Settings Configuration</span>
            </button>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};

export default Profile;
