import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, CreditCard, LayoutDashboard, User, LogOut, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const NavMobileMenu = ({ isOpen, onClose }) => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLink = async (href, action) => {
    if (action) await action();
    else navigate(href);
    onClose();
  };

  const menuItems = isAuthenticated 
    ? [
        { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
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
    <div className="fixed inset-0 z-40 h-[100dvh]">
      <div onClick={onClose} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
        className="relative top-16 left-4 right-4 z-50 liquid-glass-strong rounded-2xl p-3 space-y-1 shadow-2xl border border-white/10"
      >
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={() => handleLink(item.href, item.action)}
            className="w-full liquid-glass rounded-xl px-4 py-3 flex items-center gap-3 transition-colors hover:scale-[1.02] transition-transform cursor-pointer border-none outline-none group hover:bg-white/5 active:scale-95"
          >
            <item.icon className="w-4 h-4 text-white/50 group-hover:text-white" />
            <span className={`text-sm ${item.danger ? 'text-white/50 group-hover:text-white' : 'text-white/70 group-hover:text-white'}`}>
              {item.label}
            </span>
          </button>
        ))}
      </motion.div>
    </div>
  );
};

export default NavMobileMenu;
