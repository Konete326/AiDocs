import { Menu } from 'lucide-react';
import GlassCard from '../common/GlassCard';
import logo from '../../assets/logo.png';

const Navbar = () => (
  <nav className="flex justify-between items-center w-full">
    <div className="flex items-center gap-2">
      <img src={logo} alt="Logo" className="w-8 h-8 rounded-lg object-cover" />
      <span className="font-semibold text-2xl tracking-tighter text-white">SwiftDocs AI</span>
    </div>
    <GlassCard className="rounded-full px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-white/5 transition-colors">
      <Menu className="w-4 h-4 text-white/80" />
      <span className="text-sm text-white/80">Menu</span>
    </GlassCard>
  </nav>
);

export default Navbar;
