import { Menu, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import DynamicHeadline from '../ui/DynamicHeadline';

export default function LandingLeftPanel() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  return (
    <div className="relative z-10 w-full lg:w-[52%] min-h-screen flex flex-col p-4 lg:p-6">
      <div className="liquid-glass-strong rounded-3xl absolute inset-4 lg:inset-6 z-0" />
      <div className="relative z-10 flex flex-col min-h-full">
        <nav className="flex items-center justify-between px-6 pt-6">
          <span className="text-2xl font-semibold tracking-tighter text-white select-none">
            SwiftDocs
          </span>
          <button className="liquid-glass rounded-full flex items-center gap-2 px-4 py-2 hover:scale-105 transition-transform cursor-pointer">
            <Menu className="w-4 h-4 text-white/80" />
            <span className="text-sm text-white/80 font-light">Menu</span>
          </button>
        </nav>

        <div className="flex-1 flex flex-col items-center justify-center px-8 text-center gap-8">
          <div className="w-full h-[160px] lg:h-[220px] flex items-center justify-center">
            <DynamicHeadline
              texts={[
                "Generating the spirit of your idea",
                "Architecting your project vision",
                "Documents at the speed of thought",
                "Your AI technical partner"
              ]}
            />
          </div>
          {isAuthenticated ? (
            <button
              onClick={() => navigate('/dashboard')}
              className="liquid-glass-strong rounded-full flex items-center gap-3 px-7 py-3.5 hover:scale-105 transition-transform cursor-pointer"
            >
              <Download className="w-4 h-4 text-white/80" />
              <span className="text-sm font-medium text-white tracking-wide">Go to Dashboard</span>
            </button>
          ) : (
            <button
              onClick={() => navigate('/register')}
              className="liquid-glass-strong rounded-full flex items-center gap-3 px-7 py-3.5 hover:scale-105 transition-transform cursor-pointer"
            >
              <Download className="w-4 h-4 text-white/80" />
              <span className="text-sm font-medium text-white tracking-wide">Start Generating</span>
            </button>
          )}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {['9-Doc Tech Suites', 'AI Generation Cascade', 'Kanban Workspace'].map((pill) => (
              <span
                key={pill}
                className="liquid-glass rounded-full px-4 py-1.5 text-xs text-white/80 tracking-wide hover:scale-105 transition-transform cursor-default"
              >
                {pill}
              </span>
            ))}
          </div>
        </div>

        <div className="px-8 pb-8 flex flex-col gap-4">
          <p className="text-xs tracking-widest uppercase text-white/50 text-center">
            Visionary Engineering
          </p>
          <p className="text-center text-white/80 text-base font-light">
            "We imagined a workflow with{' '}
            <i className="font-serif text-white/70">zero friction</i>."
          </p>
          <div className="flex items-center gap-3 justify-center">
            <div className="flex-1 h-px bg-white/15" />
            <span className="text-xs text-white/50 font-light tracking-wide whitespace-nowrap">
              AiDocs Engine
            </span>
            <div className="flex-1 h-px bg-white/15" />
          </div>
        </div>
      </div>
    </div>
  );
}
