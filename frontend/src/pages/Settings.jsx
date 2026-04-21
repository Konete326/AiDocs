import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Palette, CheckCircle2 } from 'lucide-react';
import GlassCard from '../components/common/GlassCard';
import { useTheme } from '../context/ThemeContext';

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
  const { currentTheme, updateTheme, allThemes } = useTheme();
  const [activeTab, setActiveTab] = useState('theme');

  const tabs = [
    { id: 'theme', label: 'Display & Theme', icon: Palette }
  ];

  return (
    <section className="relative min-h-screen overflow-hidden px-4 sm:px-6 py-24 lg:py-32">
      <div className="absolute inset-0 bg-black/55 z-[1]" />
      
      <div className="relative z-10 mx-auto max-w-6xl">
        <button 
          onClick={() => navigate(-1)}
          className="liquid-glass rounded-full px-4 py-2 flex items-center gap-2 mb-8 hover:scale-105 transition-transform cursor-pointer shadow-xl border border-white/5"
        >
          <ChevronLeft className="w-4 h-4 text-white/70" />
          <span className="text-sm text-white/70 font-medium">Back</span>
        </button>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <GlassCard className="w-full md:w-64 flex-shrink-0 p-4 h-fit rounded-[2rem] pb-8">
            <h2 className="text-xl font-semibold text-white mb-6 px-4 pt-2 text-center md:text-left tracking-tight">Settings</h2>
            <div className="flex flex-col gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-4 py-3.5 rounded-2xl flex items-center gap-3 transition-all cursor-pointer ${
                    activeTab === tab.id 
                      ? 'bg-white/10 text-white shadow-xl border border-white/10' 
                      : 'text-white/40 hover:bg-white/5 hover:text-white/70 border border-transparent'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </GlassCard>

          {/* Main Content */}
          <GlassCard strong className="flex-1 p-6 md:p-8 lg:p-10 rounded-[2.5rem] min-h-[500px]">
             {activeTab === 'theme' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h3 className="text-2xl font-serif italic text-white tracking-tight mb-2">Display & Theme</h3>
                  <p className="text-white/40 text-sm mb-8">Select a signature background experience for your workspace.</p>
                  
                  <div className="space-y-8 max-w-5xl">
                    <div>
                       <h4 className="text-xs font-semibold text-white/20 uppercase tracking-[0.2em] mb-4 px-2">Background Library</h4>
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                         {allThemes.map((theme) => (
                           <ThemePreview 
                             key={theme.id}
                             theme={theme}
                             isActive={currentTheme.id === theme.id}
                             onSelect={updateTheme}
                           />
                         ))}
                       </div>
                    </div>
                    
                    <div className="liquid-glass p-6 rounded-3xl border border-white/5 flex items-center justify-between mt-8">
                       <div>
                         <div className="text-sm font-medium text-white">Glassmorphism Engine</div>
                         <div className="text-xs text-white/40 mt-1">Enable stunning glass effects across the app</div>
                       </div>
                       <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-500 cursor-pointer shadow-lg shadow-blue-500/20">
                         <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6" />
                       </div>
                    </div>
                  </div>
                </div>
             )}
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

export default Settings;
