import { useRef } from 'react';
import { LogOut, KeyRound, Pencil, ImagePlus } from 'lucide-react';
import UserAvatar from '../common/UserAvatar';
import LoadingSpinner from '../common/LoadingSpinner';
import ProfileInfoLinks from './ProfileInfoLinks';
import { SpecialText } from '../ui/SpecialText';

const ProfileCard = ({
  user, subscription, memberSince, isEditing, editData, onChange, onSave, onCancel,
  isSaving, saveError, onAvatarUpload, isUploadingAvatar,
  onBgUpload, isUploadingBg, onLogout, onResetPassword, onEditToggle
}) => {
  const bgInputRef = useRef(null);

  const handleBgClick = () => {
    if (isEditing) bgInputRef.current?.click();
  };

  const handleBgChange = (e) => {
    const file = e.target.files?.[0];
    if (file) onBgUpload(file);
    e.target.value = '';
  };

  return (
    <div className="liquid-glass-strong no-hover rounded-[28px] flex flex-col h-full relative overflow-hidden">
      <div
        className="relative w-full flex-shrink-0 overflow-hidden"
        style={{ height: '100px' }}
      >
        {user?.bgImageUrl ? (
          <img
            src={user.bgImageUrl}
            alt="Profile background"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        ) : (
          <div
            className="w-full h-full"
            style={{
              background: 'linear-gradient(135deg, rgba(108,99,255,0.25) 0%, rgba(108,99,255,0.08) 50%, rgba(16,185,129,0.12) 100%)',
            }}
          />
        )}

        {isEditing && (
          <button
            onClick={handleBgClick}
            className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-black/30 hover:bg-black/45 transition-colors cursor-pointer"
          >
            {isUploadingBg ? (
              <LoadingSpinner size="sm" />
            ) : (
              <>
                <ImagePlus className="w-5 h-5 text-white" />
                <span className="text-white text-[10px] font-semibold">Change Banner</span>
              </>
            )}
          </button>
        )}

        <input
          ref={bgInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={handleBgChange}
        />
      </div>

      <div className="p-4 flex flex-col flex-1 gap-0">
        <div className="flex items-end justify-between -mt-12 mb-2">
          <div className="relative flex-shrink-0">
            <UserAvatar user={user} size="lg" showUpload={isEditing} onUpload={onAvatarUpload} />
            {isUploadingAvatar && (
              <div className="absolute inset-0 rounded-full bg-black/20 flex items-center justify-center">
                <LoadingSpinner size="sm" />
              </div>
            )}
          </div>

          {isEditing ? (
            <div className="flex gap-2 mb-1">
              <button onClick={onSave} disabled={isSaving} className="bg-[#6C63FF] hover:bg-[#8B84FF] text-white rounded-full px-4 py-1.5 text-xs font-semibold cursor-pointer flex items-center gap-1.5 shadow-md">
                {isSaving ? <LoadingSpinner size="sm" /> : 'Save'}
              </button>
              <button onClick={onCancel} className="neumorphic-btn rounded-full px-4 py-1.5 text-xs text-[#6B7280] cursor-pointer">Cancel</button>
            </div>
          ) : (
            <button
              onClick={onEditToggle}
              className="neumorphic-btn rounded-xl px-2.5 py-1.5 flex items-center gap-1.5 text-xs text-[#3D4852] font-bold cursor-pointer mb-1"
            >
              <Pencil className="w-3 h-3" />
              <span>Edit</span>
            </button>
          )}
        </div>

        {isEditing ? (
          <div className="space-y-2 mb-2">
            <div className="neumorphic-inset rounded-xl px-3 py-1.5">
              <input
                type="text"
                value={editData.displayName}
                onChange={(e) => onChange('displayName', e.target.value)}
                placeholder="Your name"
                className="bg-transparent text-[#3D4852] placeholder:text-[#6B7280] outline-none w-full text-base font-semibold"
              />
            </div>
            <div className="neumorphic-inset rounded-xl px-3 py-2 relative">
              <textarea
                value={editData.bio}
                onChange={(e) => onChange('bio', e.target.value)}
                placeholder="Write a short bio..."
                maxLength={160}
                rows={2}
                className="bg-transparent text-[#3D4852] placeholder:text-[#6B7280] outline-none w-full text-xs resize-none leading-relaxed"
              />
              <span className="absolute bottom-1.5 right-2.5 text-[9px] text-[#6B7280]">
                {editData.bio?.length || 0}/160
              </span>
            </div>
            {saveError && <p className="text-xs text-rose-600">{saveError}</p>}
          </div>
        ) : (
          <div className="mb-2">
            <h3 className="text-base font-bold text-[#3D4852] truncate">{user?.displayName || 'User'}</h3>
            {user?.bio ? (
              <SpecialText inView speed={25} delay={0.3} className="text-xs text-[#6B7280] mt-0.5 leading-relaxed">
                {user.bio}
              </SpecialText>
            ) : (
              <SpecialText inView speed={20} delay={0.5} className="text-[10px] uppercase tracking-[0.35em] text-[#6B7280]">
                ClarifyAI Member
              </SpecialText>
            )}
            <div className="mt-1.5 flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-widest text-[#6B7280]">Plan:</span>
              <span className="text-xs font-bold text-[#3D4852] capitalize">{subscription?.plan || 'Free'}</span>
              <span className="bg-emerald-100 text-emerald-700 border border-emerald-300 rounded-full px-2.5 py-0.5 text-[9px] font-bold ml-1">ACTIVE</span>
            </div>
          </div>
        )}

        <ProfileInfoLinks user={user} memberSince={memberSince} />

        {!isEditing && (
          <div className="mt-auto pt-3 grid grid-cols-2 gap-2">
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
    </div>
  );
};

export default ProfileCard;
