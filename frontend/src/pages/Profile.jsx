import { useRef } from 'react';
import { Pencil } from 'lucide-react';
import { useProfileFetch } from '../hooks/useProfileFetch';
import GlassCard from '../components/common/GlassCard';
import ProfileHeader from '../components/profile/ProfileHeader';
import StatsGrid from '../components/profile/StatsGrid';
import ProfileCard from '../components/profile/ProfileCard';

const VIDEO_URL = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4';

const Profile = () => {
  const fileRef = useRef(null);
  const {
    user, subscription, projectsCount, totalDocs,
    isEditing, setIsEditing, isSaving, saveError,
    editData, setEditData, handleEditToggle, handleSave, handleAvatarChange
  } = useProfileFetch();

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : 'N/A';

  return (
    <section className="relative min-h-screen overflow-hidden px-4 sm:px-6 py-24 lg:py-32 bg-black">
      <video src={VIDEO_URL} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0" />
      <div className="absolute inset-0 bg-black/50 z-[1]" />
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
      <div className="relative z-10 mx-auto max-w-6xl">
        <GlassCard strong className="rounded-[2rem] p-6 sm:p-8 md:p-12 relative">
          {!isEditing && (
            <button onClick={handleEditToggle} className="absolute top-4 sm:top-6 right-4 sm:right-6 liquid-glass rounded-full px-4 py-2 text-sm text-white/80 flex items-center gap-2 hover:scale-105 transition-transform z-20 cursor-pointer">
              <Pencil className="w-4 h-4" />
              <span className="hidden sm:inline">Edit Profile</span>
            </button>
          )}
          <div className="grid gap-12 lg:grid-cols-2 mt-10 sm:mt-0">
            <div className="space-y-8 flex flex-col">
              <ProfileHeader user={user} />
              <StatsGrid projectsCount={projectsCount} totalDocs={totalDocs} plan={subscription?.plan || 'free'} />
            </div>
            <div className="relative">
              <ProfileCard
                user={user} subscription={subscription} memberSince={memberSince}
                isEditing={isEditing} editData={editData}
                onChange={(f, v) => setEditData({ ...editData, [f]: v })}
                onSave={handleSave} onCancel={() => setIsEditing(false)}
                isSaving={isSaving} saveError={saveError}
                onAvatarUpload={() => fileRef.current?.click()}
              />
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};
export default Profile;
