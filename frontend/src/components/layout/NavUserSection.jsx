import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Settings } from 'lucide-react';
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
      <div className="flex items-center gap-1.5 sm:gap-2">
        <button onClick={() => navigate('/login')} className="hidden sm:inline-flex neumorphic-btn rounded-full px-3.5 py-1.5 text-xs font-bold text-[#3D4852] cursor-pointer">
          Sign in
        </button>
        <button onClick={() => navigate('/register')} className="rounded-full px-3.5 sm:px-4 py-1.5 text-xs font-bold bg-[#6C63FF] hover:bg-[#8B84FF] text-white cursor-pointer shadow-md">
          Get Started
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <NotificationBell />
      <div onClick={() => navigate('/profile')} className="cursor-pointer p-0.5 rounded-full neumorphic-inset">
        <UserAvatar size="sm" user={user} />
      </div>

      <button 
        onClick={() => navigate('/settings')}
        className="hidden md:flex neumorphic-btn rounded-full w-9 h-9 items-center justify-center cursor-pointer"
        title="Settings"
      >
        <Settings className="w-4 h-4 text-[#3D4852]" />
      </button>

      <button 
        onClick={() => setShowLogoutModal(true)}
        className="hidden md:flex neumorphic-btn rounded-full w-9 h-9 items-center justify-center cursor-pointer hover:bg-rose-50"
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
