import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import NotificationBell from '../notifications/NotificationBell';
import UserAvatar from '../common/UserAvatar';

const NavUserSection = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate('/login')}
          className="liquid-glass rounded-full px-4 py-1.5 text-xs font-medium text-white/70 hover:scale-105 transition-transform border-none outline-none cursor-pointer"
        >
          Sign in
        </button>
        <button
          onClick={() => navigate('/register')}
          className="liquid-glass-strong rounded-full px-4 py-1.5 text-xs font-medium text-white border border-white/10 hover:scale-105 transition-transform cursor-pointer"
        >
          Get Started
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <NotificationBell />
      <UserAvatar 
        size="sm" 
        user={user} 
        onClick={() => navigate('/profile')}
        className="cursor-pointer hover:scale-105 transition-transform"
      />
      <button 
        onClick={handleLogout}
        className="liquid-glass rounded-full w-9 h-9 flex items-center justify-center transition-all hover:scale-110 hover:text-white group border-none outline-none cursor-pointer"
      >
        <LogOut className="w-3.5 h-3.5 text-white/50 group-hover:text-white/80" />
      </button>
    </div>
  );
};

export default NavUserSection;
