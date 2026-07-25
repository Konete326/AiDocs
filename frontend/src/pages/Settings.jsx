import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Palette, CheckCircle2, Cpu, Sparkles } from 'lucide-react';
import GlassCard from '../components/common/GlassCard';
import { useTheme } from '../context/ThemeContext';
import McpSettings from '../components/settings/McpSettings';
import ClarifyationSettings from '../components/settings/ClarifyationSettings';

const ThemePreview = ({ theme, isActive, onSelect }) => {
  const videoRef = React.useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  React.useEffect(() => {
    if (videoRef.current) {
      // Seek to first frame to avoid black screen
      videoRef.current.currentTime = 0.1;
    }
  }, [theme.video]);

  return (
    <div 
      onClick={() => onSelect(theme.id)}
      className={`relative group rounded-3xl overflow-hidden cursor-pointer border-2 transition-all duration-300 ${
        isActive 
          ? 'border-blue-500 scale-[0.98] shadow-2xl shadow-blue-500/20' 
          : 'border-white/5 hover:border-white/20'
      }`}
    >
       <div className="aspect-video relative overflow-hidden bg-white/5">
         {!isLoaded && !hasError && (
           <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-6 h-6 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
           </div>
         )}
         
         <video 
           ref={videoRef}
           src={theme.video}
           muted
           playsInline
           loop
           preload="auto"
           onLoadedData={() => setIsLoaded(true)}
           onError={() => setHasError(true)}
           onMouseEnter={(e) => e.target.play().catch(() => {})}
           onMouseLeave={(e) => {
              if (!isActive) {
                e.target.pause();
                e.target.currentTime = 0.1;
              }
           }}
           autoPlay={isActive}
           className={`w-full h-full object-cover transition-all duration-700 ${
             isActive ? 'scale-105 opacity-100' : 'opacity-60 group-hover:opacity-100 group-hover:scale-110'
           }`}
         />
         
         {hasError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-500/10 gap-2 p-4 text-center">
              <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                <span className="text-red-400 text-xs font-bold">!</span>
              </div>
              <span className="text-[10px] text-red-300 font-bold uppercase tracking-wider">Load Failed</span>
              <p className="text-[9px] text-white/30 break-all">{theme.video}</p>
            </div>
         )}

         <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
         
         {isActive && (
           <div className="absolute top-3 right-3 bg-blue-500 text-white p-1 rounded-full animate-in zoom-in duration-300 shadow-lg shadow-blue-500/40">
             <CheckCircle2 className="w-3.5 h-3.5" />
           </div>
         )}
       </div>

       <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
          <div>
            <div className={`text-sm font-medium transition-colors ${isActive ? 'text-white' : 'text-white/70'}`}>
              {theme.name}
            </div>
            <div className="text-[9px] text-white/40 uppercase tracking-widest mt-0.5">Dynamic Visual</div>
          </div>
          <div 
            className="w-1.5 h-1.5 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.3)]"
            style={{ backgroundColor: theme.color }}
          />
       </div>
    </div>
  );
};

const Settings = () => {
  const navigate = useNavigate();
  const { currentTheme, updateTheme, allThemes, isGlassEnabled, toggleGlass } = useTheme();
  const [activeTab, setActiveTab] = useState('theme');

  const tabs = [
    { id: 'theme', label: 'Display & Theme', icon: Palette },
    { id: 'clarifyation', label: 'Clarifyation SDK', icon: Sparkles },
    { id: 'mcp', label: 'MCP Integration', icon: Cpu }
  ];

  return (
    <section className="relative min-h-screen overflow-hidden px-4 sm:px-6 pt-28 pb-8 bg-[#E0E5EC] text-[#3D4852]">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => navigate(-1)}
          className="neumorphic-btn rounded-2xl px-4 py-2 flex items-center gap-2 mb-8 text-xs text-[#3D4852] font-bold cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 text-[#3D4852]" />
          <span>Back</span>
        </button>
        
        <div className="md:hidden flex overflow-x-auto gap-2 pb-4 scrollbar-none mb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-2xl flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap text-xs font-bold ${
                activeTab === tab.id 
                  ? 'bg-[#6C63FF] text-white shadow-md' 
                  : 'neumorphic-btn text-[#3D4852]'
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start w-full">
          <GlassCard className="hidden md:block w-64 flex-shrink-0 p-4 h-fit rounded-[2.5rem] pb-8 no-hover">
            <h2 className="text-xl font-extrabold text-[#3D4852] mb-6 px-4 pt-2 text-left tracking-tight">Settings</h2>
            <div className="flex flex-col gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-4 py-3.5 rounded-2xl flex items-center gap-3 transition-all cursor-pointer text-xs font-bold ${
                    activeTab === tab.id 
                      ? 'bg-[#6C63FF] text-white shadow-md' 
                      : 'neumorphic-btn text-[#3D4852]'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </GlassCard>

          <GlassCard strong className="flex-1 w-full p-6 md:p-8 lg:p-10 rounded-[2.5rem] min-h-[350px] no-hover">
             {activeTab === 'theme' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h3 className="text-2xl font-bold text-[#3D4852] tracking-tight mb-2">Display & Theme</h3>
                  <p className="text-[#6B7280] text-sm mb-8 font-medium">Your workspace is styled with a premium tactile design system.</p>
                  
                  <div className="space-y-8 max-w-5xl">
                    <div className="neumorphic-btn p-6 rounded-3xl flex items-center justify-between">
                       <div>
                         <div className="text-sm font-bold text-[#3D4852]">Neumorphic Soft UI Engine</div>
                         <div className="text-xs mt-1 text-[#6B7280] font-medium">
                            The visual system uses dual-opposing shadows on a cool-monochromatic surface (#E0E5EC) for maximum physical depth and accessibility.
                         </div>
                       </div>
                       <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#38B2AC] neumorphic-inset px-4 py-2 rounded-full h-fit flex items-center justify-center">
                         Active
                       </div>
                    </div>
                  </div>
                </div>
             )}
             {activeTab === 'clarifyation' && <ClarifyationSettings />}
             {activeTab === 'mcp' && <McpSettings />}
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

export default Settings;
