import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Palette, Moon, Sun, Monitor } from 'lucide-react';
import GlassCard from '../components/common/GlassCard';

const Settings = () => {
  const navigate = useNavigate();
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
          className="liquid-glass rounded-full px-4 py-2 flex items-center gap-2 mb-8 hover:scale-105 transition-transform cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 text-white/70" />
          <span className="text-sm text-white/70 font-medium">Back</span>
        </button>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <GlassCard className="w-full md:w-64 flex-shrink-0 p-4 h-fit rounded-3xl pb-6">
            <h2 className="text-xl font-semibold text-white mb-6 px-4 pt-2">Settings</h2>
            <div className="flex flex-col gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-4 py-3 rounded-2xl flex items-center gap-3 transition-all cursor-pointer ${
                    activeTab === tab.id 
                      ? 'bg-white/10 text-white shadow-lg border border-white/10' 
                      : 'text-white/50 hover:bg-white/5 hover:text-white/80 border border-transparent'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </GlassCard>

          {/* Main Content */}
          <GlassCard strong className="flex-1 p-6 md:p-8 lg:p-10 rounded-[2rem] min-h-[500px]">
             {activeTab === 'theme' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h3 className="text-2xl font-serif italic text-white tracking-tight mb-2">Display & Theme</h3>
                  <p className="text-white/40 text-sm mb-8">Customize how SwiftDocs AI looks on your device.</p>
                  
                  <div className="space-y-6 max-w-2xl">
                    <div className="liquid-glass p-6 rounded-3xl border border-white/5">
                       <h4 className="text-sm font-medium text-white mb-4">Appearance</h4>
                       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                         <div className="border border-blue-500/50 bg-blue-500/10 rounded-2xl p-4 flex flex-col items-center gap-3 cursor-pointer hover:bg-blue-500/20 transition-colors">
                           <Monitor className="w-6 h-6 text-blue-400" />
                           <span className="text-sm text-blue-100">System</span>
                         </div>
                         <div className="border border-white/10 bg-white/5 rounded-2xl p-4 flex flex-col items-center gap-3 cursor-pointer hover:bg-white/10 transition-colors">
                           <Moon className="w-6 h-6 text-white/60" />
                           <span className="text-sm text-white/70">Dark</span>
                         </div>
                         <div className="border border-white/10 bg-white/5 rounded-2xl p-4 flex flex-col items-center gap-3 cursor-pointer hover:bg-white/10 transition-colors opacity-50">
                           <Sun className="w-6 h-6 text-white/60" />
                           <span className="text-sm text-white/70">Light</span>
                           <span className="text-[10px] text-white/40 absolute -mt-5">Coming Soon</span>
                         </div>
                       </div>
                    </div>
                    
                    <div className="liquid-glass p-6 rounded-3xl border border-white/5 flex items-center justify-between">
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
