const ProfileHeader = ({ user }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight text-[#3D4852]">
          {user?.displayName || 'Welcome'}
        </h2>
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


