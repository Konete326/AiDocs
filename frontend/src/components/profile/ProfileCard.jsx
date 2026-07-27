import { LogOut, KeyRound, Pencil } from 'lucide-react';
import UserAvatar from '../common/UserAvatar';
import LoadingSpinner from '../common/LoadingSpinner';
import ProfileInfoLinks from './ProfileInfoLinks';
import { SpecialText } from '../ui/SpecialText';

const ProfileCard = ({
  user, subscription, memberSince, isEditing, editData, onChange, onSave, onCancel,
  isSaving, saveError, onAvatarUpload, isUploadingAvatar, onLogout, onResetPassword, onEditToggle
}) => {
  return (
    <div className="liquid-glass-strong no-hover rounded-[28px] p-6 flex flex-col h-full relative">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <div className="relative flex-shrink-0">
            <UserAvatar user={user} size="lg" showUpload={isEditing} onUpload={onAvatarUpload} />
            {isUploadingAvatar && (
              <div className="absolute inset-0 rounded-full bg-black/20 flex items-center justify-center">
                <LoadingSpinner size="sm" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="space-y-3">
                <div className="neumorphic-inset rounded-xl px-3 py-1.5">
                  <input
                    type="text"
                    value={editData.displayName}
                    onChange={(e) => onChange('displayName', e.target.value)}
                    placeholder="Your name"
                    className="bg-transparent text-[#3D4852] placeholder:text-[#6B7280] outline-none w-full text-lg font-medium"
                  />
                </div>
                {saveError && <p className="text-xs text-rose-600">{saveError}</p>}
                <div className="flex gap-2">
                  <button onClick={onSave} disabled={isSaving} className="bg-[#6C63FF] hover:bg-[#8B84FF] text-white rounded-full px-4 py-1.5 text-xs font-semibold cursor-pointer flex items-center gap-1.5 shadow-md">
                    {isSaving ? <LoadingSpinner size="sm" /> : 'Save'}
                  </button>
                  <button onClick={onCancel} className="neumorphic-btn rounded-full px-4 py-1.5 text-xs text-[#6B7280] cursor-pointer">Cancel</button>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-bold text-[#3D4852] truncate">{user?.displayName || 'User'}</h3>
                <SpecialText inView speed={20} delay={0.5} className="text-[10px] uppercase tracking-[0.35em] text-[#6B7280]">
                  ClarifyAI Member
                </SpecialText>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-widest text-[#6B7280]">Plan:</span>
                  <span className="text-xs font-bold text-[#3D4852] capitalize">{subscription?.plan || 'Free'}</span>
                  <span className="bg-emerald-100 text-emerald-700 border border-emerald-300 rounded-full px-2.5 py-0.5 text-[9px] font-bold ml-1">ACTIVE</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {!isEditing && (
          <button onClick={onEditToggle} className="neumorphic-btn rounded-xl px-3 py-1.5 flex items-center gap-1.5 text-xs text-[#3D4852] font-bold cursor-pointer flex-shrink-0">
            <Pencil className="w-3.5 h-3.5 text-[#3D4852]" />
            <span>Edit</span>
          </button>
        )}
      </div>

      <ProfileInfoLinks user={user} memberSince={memberSince} />

      {!isEditing && (
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button onClick={onResetPassword} className="neumorphic-btn rounded-2xl px-3 py-2.5 flex items-center gap-2 text-[#6B7280] hover:text-[#3D4852] transition-all active:scale-95 cursor-pointer justify-center">
            <KeyRound className="w-4 h-4 flex-shrink-0" />
            <span className="text-xs font-medium">Reset Password</span>
          </button>
          <button onClick={onLogout} className="bg-red-500 hover:bg-red-600 !text-white rounded-2xl px-3 py-2.5 flex items-center gap-2 transition-all active:scale-95 cursor-pointer justify-center shadow-md">
            <LogOut className="w-4 h-4 flex-shrink-0 !text-white" style={{ stroke: '#ffffff' }} />
            <span className="text-xs font-medium !text-white" style={{ color: '#ffffff' }}>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};
export default ProfileCard;


