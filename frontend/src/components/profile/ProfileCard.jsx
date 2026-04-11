import UserAvatar from '../common/UserAvatar';
import LoadingSpinner from '../common/LoadingSpinner';
import ProfileInfoLinks from './ProfileInfoLinks';

const ProfileCard = ({ user, subscription, memberSince, isEditing, editData, onChange, onSave, onCancel, isSaving, saveError, onAvatarUpload, isUploadingAvatar }) => {
  return (
    <div className="liquid-glass-strong rounded-[28px] p-8 flex flex-col items-center">
      <div className="relative mt-2">
        <UserAvatar
          user={user}
          size="xl"
          showUpload={isEditing}
          onUpload={onAvatarUpload}
        />
        {isUploadingAvatar && (
          <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center">
            <LoadingSpinner size="md" />
          </div>
        )}
      </div>
      
      <div className="mt-10 w-full flex flex-col items-center text-center">
        {isEditing ? (
          <div className="w-full space-y-4">
            <div className="liquid-glass rounded-xl px-4 py-2">
              <input type="text" value={editData.displayName} onChange={(e) => onChange('displayName', e.target.value)} placeholder="Your name" className="bg-transparent text-white placeholder:text-white/40 outline-none w-full text-center text-2xl font-medium" />
            </div>
            {saveError && <p className="text-xs text-white/50">{saveError}</p>}
            <div className="flex gap-3 justify-center pt-2">
              <button onClick={onSave} disabled={isSaving} className="liquid-glass-strong rounded-full px-6 py-2 text-sm text-white hover:scale-105 transition-transform cursor-pointer flex items-center gap-2">
                {isSaving ? <LoadingSpinner size="sm" /> : 'Save Changes'}
              </button>
              <button onClick={onCancel} className="liquid-glass rounded-full px-6 py-2 text-sm text-white/70 hover:scale-105 transition-transform cursor-pointer">Cancel</button>
            </div>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-medium text-white">{user?.displayName || 'User'}</h3>
            <p className="text-xs uppercase tracking-[0.35em] text-white/45 mt-1">SwiftDocs AI Member</p>
          </>
        )}
      </div>

      <ProfileInfoLinks user={user} subscription={subscription} memberSince={memberSince} />
    </div>
  );
};
export default ProfileCard;
