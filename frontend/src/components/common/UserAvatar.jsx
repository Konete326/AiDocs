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
      className={`relative group ${currentSizeClass} ${className}`}
    >
      {hasAvatar ? (
        <img
          src={user.avatarUrl}
          alt={user.displayName}
          onError={() => setImgError(true)}
          className="w-full h-full rounded-full object-cover border border-slate-300/80 shadow-sm"
        />
      ) : (
        <div className={`liquid-glass rounded-full w-full h-full flex items-center justify-center font-medium text-[#3D4852] border border-slate-300/80 ${currentTextSize}`}>
          {initial}
        </div>
      )}

      {showUpload && (
        <>
          <div
            onClick={() => fileInputRef.current?.click()}
            className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          >
            <Camera className="w-5 h-5 text-white" />
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
