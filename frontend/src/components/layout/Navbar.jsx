import { useState } from 'react';
import { Menu, X, LogIn, Layout, FileText, Settings, UserPlus, LogOut, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../common/GlassCard';
import logo from '../../assets/logo.png';
import BiomeMenu from '../common/BiomeMenu';
import { useAuth } from '../../context/AuthContext';
import NotificationBell from '../notifications/NotificationBell';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
    navigate('/');
  };

  const navItems = isAuthenticated
    ? [
        { title: "Dashboard", href: "/dashboard", icon: <Layout className="w-4 h-4 text-white" />, onClick: () => { setIsOpen(false); navigate('/dashboard'); } },
        { title: "Pricing", href: "/pricing", icon: <CreditCard className="w-4 h-4 text-white" />, onClick: () => { setIsOpen(false); navigate('/pricing'); } },
        { title: "Settings", href: "/profile", icon: <Settings className="w-4 h-4 text-white" />, onClick: () => { setIsOpen(false); navigate('/profile'); } },
        { title: "Logout", icon: <LogOut className="w-4 h-4 text-white" />, onClick: handleLogout },
      ]
    : [
        { title: "Sign In", href: "/login", icon: <LogIn className="w-4 h-4 text-white" />, onClick: () => { setIsOpen(false); navigate('/login'); } },
        { title: "Create Account", href: "/register", icon: <UserPlus className="w-4 h-4 text-white" />, onClick: () => { setIsOpen(false); navigate('/register'); } },
      ];

  return (
    <>
      <nav className="flex justify-between items-center w-full relative z-50">
        <div className="flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95 transition-transform" onClick={() => navigate('/')}>
          <img src={logo} alt="Logo" className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg object-cover" />
          <span className="font-semibold text-xl lg:text-2xl tracking-tighter text-white">SwiftDocs AI</span>
        </div>
        
        <div className="flex items-center gap-3">
          {isAuthenticated && <NotificationBell />}
          <GlassCard 
            className="rounded-full px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-white/5 hover:scale-105 active:scale-95 transition-all"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-4 h-4 text-white" /> : <Menu className="w-4 h-4 text-white/80" />}
            <span className="text-sm font-medium text-white/80">{isOpen ? 'Close' : 'Menu'}</span>
          </GlassCard>
        </div>
      </nav>

      <BiomeMenu 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        items={navItems}
      />
    </>
  );
};

export default Navbar;
