import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, CreditCard, LayoutDashboard, User, LogOut, LogIn, UserPlus, Briefcase } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import UpgradeModal from '../common/UpgradeModal';

const NavMobileMenu = ({ isOpen, onClose }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [showUpgrade, setShowUpgrade] = useState(false);

  const isFree = !user?.plan || user.plan === 'free';

  const handleLink = async (item) => {
    if (item.isProtected && isFree) {
      setShowUpgrade(true);
      return;
    }

    if (item.action) {
      await item.action();
    } else {
      navigate(item.href);
    }
    onClose();
  };

  const menuItems = isAuthenticated 
    ? [
        { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { label: 'Workspace', href: '/dashboard', icon: Briefcase, isProtected: true },
        { label: 'Pricing', href: '/pricing', icon: CreditCard },
        { label: 'Profile', href: '/profile', icon: User },
        { label: 'Logout', action: logout, icon: LogOut, danger: true },
      ]
    : [
        { label: 'Home', href: '/', icon: Home },
        { label: 'Pricing', href: '/pricing', icon: CreditCard },
        { label: 'Sign In', href: '/login', icon: LogIn },
        { label: 'Get Started', href: '/register', icon: UserPlus },
      ];

  return (
    <>
      <div className="fixed inset-0 z-[100] h-[100dvh]">
        <div onClick={onClose} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }} 
          animate={{ opacity: 1, scale: 1, y: 0 }} 
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          className="relative top-20 left-4 right-4 z-[110] liquid-glass-strong rounded-2xl p-2 space-y-1 shadow-2xl border border-white/5"
        >
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleLink(item)}
              className="w-full liquid-glass rounded-xl px-4 py-2.5 flex items-center gap-3 transition-all hover:bg-white/5 active:scale-95 cursor-pointer text-left"
            >
              <item.icon className={`w-4 h-4 ${item.danger ? 'text-red-400/50' : 'text-white/50'}`} />
              <span className={`text-sm ${item.danger ? 'text-red-400/70' : 'text-white/70'}`}>
                {item.label}
              </span>
            </button>
          ))}
        </motion.div>
      </div>

      <UpgradeModal
        isOpen={showUpgrade}
        onClose={() => setShowUpgrade(false)}
        onUpgrade={() => {
          setShowUpgrade(false);
          onClose();
          navigate('/pricing');
        }}
      />
    </>
  );
};

export default NavMobileMenu;
