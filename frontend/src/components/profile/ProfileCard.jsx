import LoadingSpinner from '../common/LoadingSpinner';
import ProfileInfoLinks from './ProfileInfoLinks';

const ProfileCard = ({ user, subscription, memberSince, isEditing, editData, onChange, onSave, onCancel, isSaving, saveError, onAvatarUpload }) => {
  const initial = user?.displayName?.charAt(0) || '?';

  return (
    <div className="liquid-glass-strong rounded-[28px] p-8 flex flex-col items-center">
      <div className="relative group mt-2">
        {user?.avatarUrl ? (
          <img src={user.avatarUrl} alt="Avatar" className="w-32 h-32 rounded-full object-cover" />
        ) : (
          <div className="w-32 h-32 rounded-full bg-white/10 flex flex-col items-center justify-center text-4xl text-white font-medium">{initial}</div>
        )}
        {isEditing && (
          <button onClick={onAvatarUpload} className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 liquid-glass rounded-full px-4 py-2 text-xs text-white/70 whitespace-nowrap cursor-pointer hover:text-white transition-colors shadow-lg">Upload Photo</button>
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
