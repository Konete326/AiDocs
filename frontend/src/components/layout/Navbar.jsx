import { useState } from 'react';
import { Menu, X, Rocket, Shield, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../common/GlassCard';
import logo from '../../assets/logo.png';
import Button from '../common/Button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Platform', icon: Rocket, path: '#' },
    { label: 'Security', icon: Shield, path: '#' },
    { label: 'Support', icon: HelpCircle, path: '#' },
  ];

  return (
    <>
      <nav className="flex justify-between items-center w-full relative z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <img src={logo} alt="Logo" className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg object-cover" />
          <span className="font-semibold text-xl lg:text-2xl tracking-tighter text-white">SwiftDocs AI</span>
        </div>
        
        <GlassCard 
          className="rounded-full px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-white/5 transition-all"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-4 h-4 text-white" /> : <Menu className="w-4 h-4 text-white/80" />}
          <span className="text-sm font-medium text-white/80">{isOpen ? 'Close' : 'Menu'}</span>
        </GlassCard>
      </nav>

      {/* Mobile/Tablet Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setIsOpen(false)} />
          <div className="absolute top-24 left-4 right-4 animate-in fade-in zoom-in duration-300">
            <GlassCard strong className="rounded-[2.5rem] p-6 shadow-2xl border border-white/10">
              <div className="flex flex-col gap-4">
                {menuItems.map((item) => (
                  <button 
                    key={item.label}
                    className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all text-white/70 hover:text-white"
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-lg font-medium">{item.label}</span>
                  </button>
                ))}
                <div className="h-px w-full bg-white/10 my-2" />
                <Button onClick={() => navigate('/login')} variant="strong" className="py-4">
                  Sign In
                </Button>
              </div>
            </GlassCard>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
