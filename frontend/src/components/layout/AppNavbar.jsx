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
  const [isSandboxOpen, setIsSandboxOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => { setMobileOpen(false); }, [location]);

  useEffect(() => {
    const checkSandbox = () => {
      setIsSandboxOpen(document.body.classList.contains('sandbox-open'));
    };
    checkSandbox();
    const observer = new MutationObserver(checkSandbox);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  if (isSandboxOpen || location.pathname.includes('/preview') || location.pathname.startsWith('/components') || location.pathname.startsWith('/embed') || location.pathname.startsWith('/editor')) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-6 md:px-8 py-2.5 pointer-events-none">
      <div className="max-w-7xl mx-auto neumorphic-card rounded-2xl px-3.5 sm:px-6 h-[56px] sm:h-[60px] flex items-center justify-between pointer-events-auto border border-[#CAD1DB] shadow-[9px_9px_16px_rgba(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)]">
        <div 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 sm:gap-3 cursor-pointer shrink-0"
        >
          <img src={logo} alt="ClarifyAI Logo" className="h-7 sm:h-8 w-auto object-contain rounded-lg" />
          <span className="text-sm sm:text-base font-black tracking-tight text-[#3D4852]">
            ClarifyAI
          </span>
        </div>

        <div className="hidden md:flex flex-1 justify-center">
          <NavLinks />
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <NavUserSection />
          
          <button 
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden neumorphic-btn rounded-xl w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center cursor-pointer text-[#3D4852]"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X className="w-4 h-4 text-[#3D4852]" /> : <Menu className="w-4 h-4 text-[#3D4852]" />}
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
