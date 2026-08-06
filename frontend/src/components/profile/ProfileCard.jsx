import { useRef } from 'react';
import { LogOut, KeyRound, Pencil, ImagePlus, Award, CheckCircle } from 'lucide-react';
import UserAvatar from '../common/UserAvatar';
import LoadingSpinner from '../common/LoadingSpinner';
import ProfileInfoLinks from './ProfileInfoLinks';
import { SpecialText } from '../ui/SpecialText';

const ProfileCard = ({
  user, subscription, memberSince, isEditing, editData, onChange, onSave, onCancel,
  isSaving, saveError, onAvatarUpload, isUploadingAvatar, onBgUpload, isUploadingBg, onLogout, onResetPassword, onEditToggle
}) => {
  const bgInputRef = useRef(null);

  return (
    <div className="liquid-glass-strong no-hover rounded-[28px] flex flex-col h-full relative overflow-hidden">
      <div className="relative w-full flex-shrink-0 overflow-hidden h-[100px]">
        {user?.bgImageUrl ? (
          <img src={user.bgImageUrl} alt="Background" className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-blue-600/20 via-blue-500/10 to-indigo-600/20" />
        )}
        {isEditing && (
          <button onClick={() => bgInputRef.current?.click()} className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 text-white cursor-pointer">
            {isUploadingBg ? <LoadingSpinner size="sm" /> : <><ImagePlus className="w-5 h-5" /><span className="text-[10px] font-semibold">Change Banner</span></>}
          </button>
        )}
        <input ref={bgInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => { if (e.target.files?.[0]) onBgUpload(e.target.files[0]); }} />
      </div>

      <div className="p-4 flex flex-col flex-1 gap-0">
        <div className="flex items-end justify-between -mt-12 mb-2">
          <div className="relative flex-shrink-0">
            <UserAvatar user={user} size="lg" showUpload={isEditing} onUpload={onAvatarUpload} />
            {isUploadingAvatar && <div className="absolute inset-0 rounded-full bg-black/20 flex items-center justify-center"><LoadingSpinner size="sm" /></div>}
          </div>

          {isEditing ? (
            <div className="flex gap-2 mb-1">
              <button onClick={onSave} disabled={isSaving} className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 py-1.5 text-xs font-semibold cursor-pointer flex items-center gap-1 shadow-md">
                {isSaving ? <LoadingSpinner size="sm" /> : 'Save'}
              </button>
              <button onClick={onCancel} className="neumorphic-btn rounded-full px-4 py-1.5 text-xs text-[#6B7280] cursor-pointer">Cancel</button>
            </div>
          ) : (
            <button onClick={onEditToggle} className="neumorphic-btn rounded-xl px-2.5 py-1.5 flex items-center gap-1.5 text-xs text-[#3D4852] font-bold cursor-pointer mb-1">
              <Pencil className="w-3 h-3" /><span>Edit</span>
            </button>
          )}
        </div>

        {isEditing ? (
          <div className="space-y-2 mb-2">
            <div className="neumorphic-inset rounded-xl px-3 py-1.5">
              <input type="text" value={editData.displayName} onChange={(e) => onChange('displayName', e.target.value)} className="bg-transparent text-[#3D4852] outline-none w-full text-base font-semibold" />
            </div>
            <div className="neumorphic-inset rounded-xl px-3 py-2 relative">
              <textarea value={editData.bio} onChange={(e) => onChange('bio', e.target.value)} maxLength={160} rows={2} className="bg-transparent text-[#3D4852] outline-none w-full text-xs resize-none" />
            </div>
            {saveError && <p className="text-xs text-rose-600">{saveError}</p>}
          </div>
        ) : (
          <div className="mb-2">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-[#3D4852] truncate">{user?.displayName || 'User'}</h3>
              {(user?.creatorPoints >= 50) && (
                <span className="bg-blue-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow-sm">
                  <CheckCircle className="w-3 h-3" /> Pro Creator
                </span>
              )}
            </div>

            {user?.bio ? (
              <SpecialText inView speed={25} delay={0.3} className="text-xs text-[#6B7280] mt-0.5 leading-relaxed">{user.bio}</SpecialText>
            ) : (
              <SpecialText inView speed={20} delay={0.5} className="text-[10px] uppercase tracking-[0.35em] text-[#6B7280]">ClarifyAI Member</SpecialText>
            )}

            <div className="mt-2 grid grid-cols-3 gap-2 p-2 bg-[#E0E5EC] rounded-xl shadow-[inset_3px_3px_6px_rgba(163,177,198,0.5),inset_-3px_-3px_6px_rgba(255,255,255,0.5)] text-center">
              <div>
                <span className="text-[10px] text-[#6B7280] block font-bold">Components</span>
                <span className="text-xs font-extrabold text-blue-600">{user?.submittedComponentsCount || 0}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#6B7280] block font-bold">Points</span>
                <span className="text-xs font-extrabold text-blue-600 flex items-center justify-center gap-0.5">
                  <Award className="w-3 h-3 text-blue-600" /> {user?.creatorPoints || 0}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#6B7280] block font-bold">Plan</span>
                <span className="text-xs font-extrabold text-blue-600 capitalize">{subscription?.plan || 'Free'}</span>
              </div>
            </div>
          </div>
        )}

        <ProfileInfoLinks user={user} memberSince={memberSince} />

        {!isEditing && (
          <div className="mt-auto pt-3 grid grid-cols-2 gap-2">
            <button onClick={onResetPassword} className="neumorphic-btn rounded-2xl px-3 py-2.5 flex items-center gap-2 text-[#6B7280] hover:text-[#3D4852] transition-all cursor-pointer justify-center">
              <KeyRound className="w-4 h-4" /><span className="text-xs font-medium">Reset Password</span>
            </button>
            <button onClick={onLogout} className="bg-red-500 hover:bg-red-600 text-white rounded-2xl px-3 py-2.5 flex items-center gap-2 transition-all cursor-pointer justify-center shadow-md">
              <LogOut className="w-4 h-4 text-white" /><span className="text-xs font-medium text-white">Logout</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
