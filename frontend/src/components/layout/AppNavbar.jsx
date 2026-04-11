import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import logo from '../../assets/logo.png';
import NavLinks from './NavLinks';
import NavUserSection from './NavUserSection';
import NavMobileMenu from './NavMobileMenu';

const AppNavbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => { setMobileOpen(false); }, [location]);

  const authRoutes = ['/login', '/register', '/forgot-password', '/reset-password'];
  if (authRoutes.includes(location.pathname)) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-3 pointer-events-none">
      <div className="max-w-7xl mx-auto liquid-glass-strong rounded-2xl px-5 h-12 flex items-center justify-between pointer-events-auto shadow-2xl !overflow-visible">
        <div 
          onClick={() => navigate('/')}
          className="flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform"
        >
          <img src={logo} alt="Logo" className="w-7 h-7 rounded-lg object-cover" />
          <span className="hidden sm:block text-sm font-semibold tracking-tighter text-white">
            SwiftDocs AI
          </span>
        </div>

        <div className="hidden md:flex flex-1 justify-center">
          <NavLinks />
        </div>

        <div className="flex items-center gap-3">
          <NavUserSection />
          
          <button 
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden liquid-glass rounded-full w-9 h-9 flex items-center justify-center hover:scale-105 transition-transform"
          >
            {mobileOpen ? <X className="w-4 h-4 text-white" /> : <Menu className="w-4 h-4 text-white" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <NavMobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
        )}
      </AnimatePresence>
    </nav>
  );
};

export default AppNavbar;
