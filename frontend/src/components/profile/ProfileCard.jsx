import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, KeyRound, Pencil, ImagePlus, Award, CheckCircle, Share2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import UserAvatar from '../common/UserAvatar';
import LoadingSpinner from '../common/LoadingSpinner';
import ProfileInfoLinks from './ProfileInfoLinks';
import { SpecialText } from '../ui/SpecialText';

const ProfileCard = ({
  user, subscription, memberSince, isEditing, editData, onChange, onSave, onCancel,
  isSaving, saveError, onAvatarUpload, isUploadingAvatar, onBgUpload, isUploadingBg, onLogout, onResetPassword, onEditToggle
}) => {
  const navigate = useNavigate();
  const bgInputRef = useRef(null);

  return (
    <div className="bg-[#E0E5EC] rounded-[32px] shadow-[9px_9px_16px_rgba(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)] border border-[#A3B1C6]/30 flex flex-col h-full relative overflow-hidden">
      <div className="relative w-full flex-shrink-0 overflow-hidden h-[110px]">
        {user?.bgImageUrl ? (
          <img src={user.bgImageUrl} alt="Background" className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-blue-600/30 via-blue-500/20 to-indigo-600/30" />
        )}
        {isEditing && (
          <button onClick={() => bgInputRef.current?.click()} className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white cursor-pointer transition-opacity hover:opacity-90">
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

        {isEditing ? (() => {
          const displayNameClean = (editData.displayName || '').trim();
          const displayNameError = displayNameClean.length < 2 || displayNameClean.length > 50
            ? 'Display name must be between 2 and 50 characters'
            : null;

          return (
            <div className="space-y-2 mb-2">
              <div className="neumorphic-inset rounded-xl px-3 py-1.5">
                <input
                  type="text"
                  value={editData.displayName}
                  onChange={(e) => onChange('displayName', e.target.value)}
                  placeholder="Your Display Name"
                  className="bg-transparent text-[#3D4852] outline-none w-full text-base font-semibold"
                />
              </div>
              {displayNameError && (
                <p className="text-[10px] font-bold text-rose-600 px-1 animate-in fade-in">⚠️ {displayNameError}</p>
              )}
              <div className="neumorphic-inset rounded-xl px-3 py-2 relative">
                <textarea
                  value={editData.bio}
                  onChange={(e) => onChange('bio', e.target.value)}
                  maxLength={160}
                  rows={2}
                  placeholder="Tell us about yourself..."
                  className="bg-transparent text-[#3D4852] outline-none w-full text-xs resize-none"
                />
              </div>
              {saveError && <p className="text-xs text-rose-600 font-bold px-1">{saveError}</p>}
            </div>
          );
        })() : (
          <div className="mb-2">
            <div className="flex items-center gap-1.5">
              <h3 className="text-base font-bold text-[#3D4852] truncate">{user?.displayName || 'User'}</h3>
              <span className="inline-flex items-center" title="Verified Creator">
                <CheckCircle className="w-4 h-4 text-blue-600 fill-blue-600/15" />
              </span>
            </div>

            {user?.bio ? (
              <SpecialText inView speed={25} delay={0.3} className="text-xs text-[#6B7280] mt-0.5 leading-relaxed">{user.bio}</SpecialText>
            ) : (
              <SpecialText inView speed={20} delay={0.5} className="text-[10px] uppercase tracking-[0.35em] text-[#6B7280]">ClarifyAI Member</SpecialText>
            )}

            <div className="mt-2 grid grid-cols-4 gap-1.5 p-2 bg-[#E0E5EC] rounded-xl shadow-[inset_3px_3px_6px_rgba(163,177,198,0.5),inset_-3px_-3px_6px_rgba(255,255,255,0.5)] text-center">
              <div>
                <span className="text-[10px] text-[#6B7280] block font-bold">Components</span>
                <span className="text-xs font-extrabold text-blue-600">{user?.submittedComponentsCount || 0}</span>
              </div>
              <div
                onClick={() => {
                  const uid = user?._id || user?.id;
                  if (uid) navigate(`/profile/${uid}/followers`);
                }}
                className="cursor-pointer hover:opacity-85 transition-opacity"
                title="View my community followers"
              >
                <span className="text-[10px] text-[#6B7280] block font-bold">Followers</span>
                <span className="text-xs font-extrabold text-emerald-600 underline decoration-dotted">{user?.followers?.length || 0}</span>
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
          <div className="mt-auto pt-3 flex flex-col gap-2">
            <button
              onClick={() => {
                const userId = user?._id || user?.id;
                if (userId) {
                  navigator.clipboard.writeText(`${window.location.origin}/profile/${userId}`);
                  toast.success('Your public profile link copied!');
                }
              }}
              className="w-full py-2 bg-[#E0E5EC] hover:bg-white/50 text-blue-600 rounded-xl text-xs font-bold shadow-[3px_3px_6px_rgba(163,177,198,0.5),-3px_-3px_6px_rgba(255,255,255,0.35)] border border-[#A3B1C6]/20 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-blue-600" /><span>Share My Profile Link</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button onClick={onResetPassword} className="neumorphic-btn rounded-xl px-3 py-2 flex items-center gap-1.5 text-[#6B7280] hover:text-[#3D4852] transition-all cursor-pointer justify-center">
                <KeyRound className="w-3.5 h-3.5" /><span className="text-xs font-medium">Reset Password</span>
              </button>
              <button onClick={onLogout} className="bg-red-500 hover:bg-red-600 text-white rounded-xl px-3 py-2 flex items-center gap-1.5 transition-all cursor-pointer justify-center shadow-md">
                <LogOut className="w-3.5 h-3.5 text-white" /><span className="text-xs font-medium text-white">Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
