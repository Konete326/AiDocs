import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, CreditCard, LayoutDashboard, User, LogOut, LogIn, UserPlus, Settings, Layers } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import ConfirmModal from '../common/ConfirmModal';

const NavMobileMenu = ({ isOpen, onClose }) => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLink = async (item) => {
    if (item.label === 'Logout') {
      setShowLogoutModal(true);
      return;
    }
    if (item.action) {
      await item.action();
    } else {
      navigate(item.href);
    }
    onClose();
  };

  const handleLogoutConfirm = async () => {
    await logout();
    setShowLogoutModal(false);
    onClose();
    navigate('/');
  };

  const menuItems = isAuthenticated 
    ? [
        { label: 'Home', href: '/', icon: Home },
        { label: 'Projects Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { label: 'Components Hub', href: '/components', icon: Layers },
        { label: 'Pricing Plans', href: '/pricing', icon: CreditCard },
        { label: 'User Profile', href: '/profile', icon: User },
        { label: 'Settings', href: '/settings', icon: Settings },
        { label: 'Logout Account', action: logout, icon: LogOut, danger: true },
      ]
    : [
        { label: 'Home', href: '/', icon: Home },
        { label: 'Components Hub', href: '/components', icon: Layers },
        { label: 'Pricing Plans', href: '/pricing', icon: CreditCard },
        { label: 'Sign In', href: '/login', icon: LogIn },
        { label: 'Get Started Free', href: '/register', icon: UserPlus, primary: true },
      ];

  return (
    <>
      <div className="fixed inset-0 z-[100] pointer-events-auto">
        <div onClick={onClose} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }} 
          animate={{ opacity: 1, scale: 1, y: 0 }} 
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          className="relative top-18 left-3 right-3 sm:left-6 sm:right-6 z-[110] bg-[#E0E5EC] rounded-3xl p-3 space-y-1.5 shadow-[9px_9px_16px_rgba(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)] border border-[#CAD1DB]"
        >
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleLink(item)}
              className={`w-full rounded-2xl px-4 py-2.5 flex items-center justify-between transition-all active:scale-[0.98] cursor-pointer text-left ${
                item.primary
                  ? 'bg-[#6C63FF] text-white shadow-md'
                  : item.danger
                  ? 'neumorphic-btn text-rose-600 hover:bg-rose-50'
                  : 'neumorphic-btn text-[#3D4852]'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className={`w-4 h-4 ${item.primary ? 'text-white' : item.danger ? 'text-rose-600' : 'text-[#6C63FF]'}`} />
                <span className={`text-xs font-bold ${item.primary ? 'text-white' : item.danger ? 'text-rose-600' : 'text-[#3D4852]'}`}>
                  {item.label}
                </span>
              </div>
              {item.badge && (
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#6C63FF] text-white">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </motion.div>
      </div>

      <ConfirmModal
        isOpen={showLogoutModal}
        onCancel={() => setShowLogoutModal(false)}
        onConfirm={handleLogoutConfirm}
        title="Logout Account"
        message="Are you sure you want to log out?"
        confirmLabel="Logout"
        isDangerous={true}
      />
    </>
  );
};

export default NavMobileMenu;
