import { LogOut, KeyRound } from 'lucide-react';
import UserAvatar from '../common/UserAvatar';
import LoadingSpinner from '../common/LoadingSpinner';
import ProfileInfoLinks from './ProfileInfoLinks';
import { SpecialText } from '../ui/SpecialText';

const ProfileCard = ({
  user, subscription, memberSince, isEditing, editData, onChange, onSave, onCancel,
  isSaving, saveError, onAvatarUpload, isUploadingAvatar, onLogout, onResetPassword
}) => {
  return (
    <div className="liquid-glass-strong no-hover rounded-[28px] p-8 flex flex-col items-center">
      <div className="relative mt-2">
        <UserAvatar
          user={user}
          size="xl"
          showUpload={isEditing}
          onUpload={onAvatarUpload}
        />
        {isUploadingAvatar && (
          <div className="absolute inset-0 rounded-full bg-black/20 flex items-center justify-center">
            <LoadingSpinner size="md" />
          </div>
        )}
      </div>

      <div className="mt-10 w-full flex flex-col items-center text-center">
        {isEditing ? (
          <div className="w-full space-y-4">
            <div className="neumorphic-inset rounded-xl px-4 py-2">
              <input type="text" value={editData.displayName} onChange={(e) => onChange('displayName', e.target.value)} placeholder="Your name" className="bg-transparent text-[#3D4852] placeholder:text-[#6B7280] outline-none w-full text-center text-2xl font-medium" />
            </div>
            {saveError && <p className="text-xs text-rose-600">{saveError}</p>}
            <div className="flex gap-3 justify-center pt-2">
              <button onClick={onSave} disabled={isSaving} className="bg-[#6C63FF] hover:bg-[#8B84FF] text-white rounded-full px-6 py-2 text-sm font-semibold hover:scale-105 transition-transform cursor-pointer flex items-center gap-2 shadow-md">
                {isSaving ? <LoadingSpinner size="sm" /> : 'Save Changes'}
              </button>
              <button onClick={onCancel} className="neumorphic-btn rounded-full px-6 py-2 text-sm text-[#6B7280] hover:scale-105 transition-transform cursor-pointer">Cancel</button>
            </div>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-medium text-[#3D4852]">{user?.displayName || 'User'}</h3>
            <div className="mt-1">
              <SpecialText
                inView={true}
                speed={20}
                delay={0.5}
                className="text-[10px] uppercase tracking-[0.35em] text-[#6B7280]"
              >
                ClarifyAI Member
              </SpecialText>
            </div>
          </>
        )}
      </div>

      <ProfileInfoLinks user={user} subscription={subscription} memberSince={memberSince} />

      {!isEditing && (
        <div className="w-full mt-6 space-y-6">
          <div className="neumorphic-inset rounded-3xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-[#6B7280] mb-1">Current Plan</span>
                <span className="text-xl font-semibold text-[#3D4852] capitalize">{subscription?.plan || 'Free'}</span>
              </div>
              <div className="neumorphic-btn rounded-full px-3 py-1 text-[10px] text-[#6C63FF] font-bold">
                ACTIVE
              </div>
            </div>
            <p className="text-xs text-[#6B7280]">
              Your active subscription tier.
            </p>
          </div>

          <div className="pt-2 space-y-3">
            <button
              onClick={onResetPassword}
              className="w-full neumorphic-btn rounded-2xl px-4 py-3 flex items-center gap-3 text-[#6B7280] hover:text-[#3D4852] transition-all active:scale-95 cursor-pointer"
            >
              <KeyRound className="w-5 h-5" />
              <span className="text-sm font-medium">Reset Password</span>
            </button>

            <button
              onClick={onLogout}
              className="w-full neumorphic-btn rounded-2xl px-4 py-3 flex items-center gap-3 text-rose-500 hover:text-rose-600 transition-all active:scale-95 cursor-pointer"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm font-medium">Logout Account</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProfileCard;
