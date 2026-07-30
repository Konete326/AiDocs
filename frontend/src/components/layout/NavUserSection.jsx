import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Settings, Command } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import NotificationBell from '../notifications/NotificationBell';
import UserAvatar from '../common/UserAvatar';
import ConfirmModal from '../common/ConfirmModal';

const NavUserSection = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutConfirm = async () => {
    await logout();
    setShowLogoutModal(false);
    navigate('/');
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center gap-2">
        <button onClick={() => navigate('/login')} className="neumorphic-btn rounded-full px-4 py-1.5 text-xs font-bold text-[#3D4852] cursor-pointer">
          Sign in
        </button>
        <button onClick={() => navigate('/register')} className="rounded-full px-4 py-1.5 text-xs font-bold bg-[#6C63FF] text-white cursor-pointer shadow-md">
          Get Started
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <button 
        onClick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))}
        className="hidden sm:flex items-center gap-2 neumorphic-inset rounded-full px-3 py-1.5 text-xs text-[#6B7280] font-extrabold cursor-pointer hover:text-[#3D4852]"
        title="Open Command Palette (Ctrl + K)"
      >
        <Command className="w-3.5 h-3.5 text-[#6C63FF]" />
        <span className="text-[10px] font-mono bg-black/5 px-1.5 py-0.5 rounded">Ctrl K</span>
      </button>

      <NotificationBell />
      <div onClick={() => navigate('/profile')} className="cursor-pointer p-0.5 rounded-full neumorphic-inset">
        <UserAvatar size="sm" user={user} />
      </div>
      <button 
        onClick={() => navigate('/settings')}
        className="neumorphic-btn rounded-full w-9 h-9 flex items-center justify-center cursor-pointer"
        title="Settings"
      >
        <Settings className="w-4 h-4 text-[#3D4852]" />
      </button>

      <button 
        onClick={() => setShowLogoutModal(true)}
        className="neumorphic-btn rounded-full w-9 h-9 flex items-center justify-center cursor-pointer hover:bg-rose-50"
        title="Logout"
      >
        <LogOut className="w-4 h-4 text-rose-600 font-bold" />
      </button>

      <ConfirmModal
        isOpen={showLogoutModal}
        onCancel={() => setShowLogoutModal(false)}
        onConfirm={handleLogoutConfirm}
        title="Logout Account"
        message="Are you sure you want to log out?"
        confirmLabel="Logout"
        isDangerous={true}
      />
    </div>
  );
};

export default NavUserSection;
