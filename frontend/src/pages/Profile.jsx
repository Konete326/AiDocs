import { useState, useEffect, useRef } from 'react';
import { Pencil, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
    <section className="relative min-h-screen overflow-hidden px-4 sm:px-6 py-24 lg:py-32">
      {/* Dark overlay — video from PersistentBackground in App.jsx */}
      <div className="absolute inset-0 bg-black/55 z-[1]" />
      
      <div className="relative z-10 mx-auto max-w-6xl">
        <button 
          onClick={() => navigate('/dashboard')}
          className="liquid-glass rounded-full px-4 py-2 flex items-center gap-2 mb-8 hover:scale-105 transition-transform cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 text-white/70" />
          <span className="text-sm text-white/70 font-medium">Dashboard</span>
        </button>
        <GlassCard strong className="rounded-[2rem] p-6 sm:p-8 md:p-12 relative overflow-visible">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-8">
            <div className="flex-1">
              <ProfileHeader user={user} />
            </div>
            {!isEditing && (
              <button onClick={handleEditToggle} className="liquid-glass rounded-full px-5 py-2.5 text-sm text-white/80 flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer h-fit self-end sm:self-start">
                <Pencil className="w-4 h-4" />
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
        </GlassCard>
      </div>
    </section>
  );
};
export default Profile;
