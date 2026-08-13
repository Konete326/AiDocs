import { useState, useEffect, useRef } from 'react';
import { Camera } from 'lucide-react';

const UserAvatar = ({ user, size = 'md', showUpload = false, onUpload, className = '', onClick }) => {
  const fileInputRef = useRef(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [user?.avatarUrl]);

  const initial = user?.displayName?.charAt(0)?.toUpperCase() || '?';
  const hasAvatar = user?.avatarUrl && !imgError;

  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-20 h-20',
    xl: 'w-32 h-32'
  };

  const textSize = {
    xs: 'text-[10px]',
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-xl',
    xl: 'text-4xl'
  };

  const currentSizeClass = sizeClasses[size] || sizeClasses.md;
  const currentTextSize = textSize[size] || textSize.md;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) return;
    onUpload?.(file);
  };

  return (
    <div 
      onClick={onClick}
      style={{ borderRadius: '9999px' }}
      role="img"
      aria-label={user?.displayName ? `${user.displayName}'s avatar` : 'User profile avatar'}
      className={`relative group rounded-full overflow-hidden flex-shrink-0 ${currentSizeClass} ${className}`}
    >
      {hasAvatar ? (
        <img
          src={user.avatarUrl}
          alt={user.displayName || 'User avatar'}
          onError={() => setImgError(true)}
          style={{ borderRadius: '9999px' }}
          className="w-full h-full rounded-full object-cover border border-slate-300/80 shadow-sm"
        />
      ) : (
        <div 
          style={{ borderRadius: '9999px' }}
          role="img"
          aria-label={user?.displayName ? `${user.displayName}'s initial avatar` : 'User initial avatar fallback'}
          className={`bg-[#E0E5EC] rounded-full w-full h-full flex items-center justify-center font-bold text-[#3D4852] shadow-[inset_3px_3px_6px_rgba(163,177,198,0.5),inset_-3px_-3px_6px_rgba(255,255,255,0.5)] border border-[#A3B1C6]/30 ${currentTextSize}`}
        >
          {initial}
        </div>
      )}

      {showUpload && (
        <>
          <div
            onClick={() => fileInputRef.current?.click()}
            className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          >
            <Camera className="w-5 h-5 text-white" aria-label="Upload avatar camera icon" />
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleFileChange}
          />
        </>
      )}
    </div>
  );
};

export default UserAvatar;
