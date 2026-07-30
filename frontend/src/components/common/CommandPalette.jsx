import { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, Command, FileText, LayoutDashboard, PlusCircle, 
  CreditCard, User, Settings, MessageSquare, Layers, Cpu, Code,
  Sparkles, X, ChevronRight, Check
} from 'lucide-react';

const GLOBAL_COMMANDS = [
  { id: 'dash', title: 'Go to Dashboard', category: 'Navigation', icon: LayoutDashboard, path: '/dashboard' },
  { id: 'create', title: 'Create New Project', category: 'Navigation', icon: PlusCircle, path: '/projects/new' },
  { id: 'pricing', title: 'View Pricing & Plans', category: 'Navigation', icon: CreditCard, path: '/pricing' },
  { id: 'profile', title: 'Manage Profile', category: 'Navigation', icon: User, path: '/profile' },
  { id: 'settings', title: 'Open Settings & MCP', category: 'Navigation', icon: Settings, path: '/settings' },
];

const DOC_COMMANDS = [
  { id: 'prd', title: 'Product Requirements (PRD)', category: 'Documents', icon: FileText, docType: 'prd' },
  { id: 'srd', title: 'Software Requirements (SRD)', category: 'Documents', icon: FileText, docType: 'srd' },
  { id: 'tech', title: 'Tech Stack Specification', category: 'Documents', icon: Cpu, docType: 'techStack' },
  { id: 'db', title: 'Database Schema & Models', category: 'Documents', icon: Layers, docType: 'dbSchema' },
  { id: 'uf', title: 'User Flows & Logic', category: 'Documents', icon: Code, docType: 'userFlows' },
  { id: 'mvp', title: 'MVP Plan & Milestones', category: 'Documents', icon: Sparkles, docType: 'mvpPlan' },
  { id: 'fs', title: 'Folder Structure Blueprint', category: 'Documents', icon: Layers, docType: 'folderStructure' },
  { id: 'cc', title: 'Claude Context (CLAUDE.md)', category: 'Documents', icon: FileText, docType: 'claudeContext' },
  { id: 'asp', title: 'Agent System Prompts', category: 'Documents', icon: Code, docType: 'agentSystemPrompt' },
  { id: 'ds', title: 'Design System Specification', category: 'Documents', icon: Sparkles, docType: 'designSystem' },
  { id: 'sk', title: 'Project Skills & CLI Commands', category: 'Documents', icon: Cpu, docType: 'skills' },
];

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef(null);

  const currentProjectId = useMemo(() => {
    const match = location.pathname.match(/\/projects\/([a-f0-9]{24})/i);
    return match ? match[1] : null;
  }, [location.pathname]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => setIsOpen(true);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-command-palette', handleCustomOpen);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-command-palette', handleCustomOpen);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const allItems = useMemo(() => {
    const items = [...GLOBAL_COMMANDS];
    if (currentProjectId) {
      items.push(
        { id: 'tool-chat', title: 'Open AI Co-founder Chat', category: 'Project Tools', icon: MessageSquare, path: `/projects/${currentProjectId}/chat` },
        { id: 'tool-stack', title: 'Target Stack Architecture Hub', category: 'Project Tools', icon: Cpu, path: `/projects/${currentProjectId}/stack` },
        { id: 'tool-skills', title: 'Project Skills Commands', category: 'Project Tools', icon: Code, path: `/projects/${currentProjectId}/skills` },
        { id: 'tool-[#ds]', title: 'Design System Specification', category: 'Project Tools', icon: Sparkles, path: `/projects/${currentProjectId}/design-system` }
      );
      DOC_COMMANDS.forEach((d) => {
        items.push({
          ...d,
          path: `/projects/${currentProjectId}`
        });
      });
    }
    return items;
  }, [currentProjectId]);

  const filteredItems = useMemo(() => {
    if (!query.trim()) return allItems;
    const q = query.toLowerCase();
    return allItems.filter(
      (item) => item.title.toLowerCase().includes(q) || item.category.toLowerCase().includes(q)
    );
  }, [allItems, query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleSelect = (item) => {
    setIsOpen(false);
    if (item.path) {
      navigate(item.path);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        handleSelect(filteredItems[selectedIndex]);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] bg-black/55 backdrop-blur-sm flex items-start justify-center pt-16 md:pt-24 px-4 animate-in fade-in duration-150">
      <div 
        className="fixed inset-0" 
        onClick={() => setIsOpen(false)} 
      />

      <div 
        className="relative z-10 w-full max-w-2xl neumorphic-card rounded-[32px] bg-[#E0E5EC] text-[#3D4852] border border-white/60 shadow-[12px_12px_24px_rgba(163,177,198,0.7),-12px_-12px_24px_rgba(255,255,255,0.6)] overflow-hidden flex flex-col max-h-[80vh]"
        onKeyDown={handleKeyDown}
      >
        <div className="p-4 border-b border-black/5 flex items-center gap-3 shrink-0 bg-[#E0E5EC]">
          <Search className="w-5 h-5 text-[#6C63FF] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, document name, or search tools..."
            className="flex-1 bg-transparent text-sm font-extrabold text-[#3D4852] placeholder:text-[#6B7280] outline-none border-none"
          />
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[10px] bg-black/5 text-[#6B7280] font-mono px-2 py-1 rounded-lg border border-black/5 font-extrabold">ESC</span>
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-[#6B7280] hover:text-[#3D4852] p-1 rounded-full hover:bg-black/5 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-2 hover-scrollbar custom-scrollbar">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-[#6B7280] font-bold text-xs">
              No matching commands or documents found.
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id + idx}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`rounded-2xl px-4 py-3 flex items-center justify-between cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-[#6C63FF] text-white border-[#6C63FF] shadow-[4px_4px_12px_rgba(108,99,255,0.35)]'
                      : 'bg-[#E0E5EC] border-white/50 text-[#3D4852] hover:bg-white/40 shadow-[3px_3px_6px_rgba(163,177,198,0.4),-3px_-3px_6px_rgba(255,255,255,0.5)]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isSelected ? 'bg-white/20' : 'bg-black/5'}`}>
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-[#6C63FF]'}`} />
                    </div>
                    <div className="truncate">
                      <p className={`text-xs font-extrabold truncate ${isSelected ? 'text-white' : 'text-[#3D4852]'}`}>
                        {item.title}
                      </p>
                      <span className={`text-[10px] font-bold ${isSelected ? 'text-white/80' : 'text-[#6B7280]'}`}>
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-[#6B7280]'}`} />
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="p-3 border-t border-black/5 bg-[#E0E5EC] flex items-center justify-between text-[11px] text-[#6B7280] font-extrabold shrink-0">
          <div className="flex items-center gap-3">
            <span><kbd className="font-mono bg-black/5 px-1.5 py-0.5 rounded">↑</kbd> <kbd className="font-mono bg-black/5 px-1.5 py-0.5 rounded">↓</kbd> to navigate</span>
            <span><kbd className="font-mono bg-black/5 px-1.5 py-0.5 rounded">↵</kbd> to select</span>
          </div>
          <span className="flex items-center gap-1 text-[#6C63FF]">
            <Command className="w-3 h-3" /> Quick Command Palette
          </span>
        </div>
      </div>
    </div>
  );
}
