import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Palette, Cpu, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import McpSettings from '../components/settings/McpSettings';
import ClarifyationSettings from '../components/settings/ClarifyationSettings';

const Settings = () => {
  const navigate = useNavigate();
  const { currentTheme, updateTheme, allThemes } = useTheme();
  const [activeTab, setActiveTab] = useState('theme');

  const tabs = [
    { id: 'theme', label: 'Display & Theme', icon: Palette },
    { id: 'clarifyation', label: 'Clarifyation SDK', icon: Sparkles },
    { id: 'mcp', label: 'MCP Integration', icon: Cpu }
  ];

  return (
    <div className="h-screen w-full flex flex-col bg-[#E0E5EC] overflow-hidden">
      <div className="flex-1 flex flex-col pt-20 px-4 pb-3 md:px-8 min-h-0">
        <div className="max-w-7xl w-full mx-auto flex flex-col flex-1 min-h-0">

          <div className="flex items-center gap-3 mb-3 flex-shrink-0">
            <button
              onClick={() => navigate(-1)}
              className="neumorphic-btn rounded-2xl px-4 py-2 flex items-center gap-2 text-xs text-[#3D4852] font-bold cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 text-[#3D4852]" />
              <span>Back</span>
            </button>

            <div className="md:hidden flex overflow-x-auto gap-2 scrollbar-none flex-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-2xl flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap text-xs font-bold flex-shrink-0 ${
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
          </div>

          <div className="flex-1 flex flex-col md:flex-row gap-4 min-h-0">

            <div className="hidden md:flex flex-col w-56 flex-shrink-0 neumorphic-card rounded-3xl p-4 gap-2">
              <h2 className="text-sm font-extrabold text-[#3D4852] mb-2 px-2 tracking-tight">Settings</h2>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-4 py-3 rounded-2xl flex items-center gap-3 transition-all cursor-pointer text-xs font-bold ${
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

            <div className="flex-1 neumorphic-card rounded-3xl p-6 md:p-8 overflow-y-auto min-h-0">
              {activeTab === 'theme' && (
                <div className="animate-in fade-in duration-300">
                  <h3 className="text-xl font-bold text-[#3D4852] tracking-tight mb-1">Display & Theme</h3>
                  <p className="text-[#6B7280] text-xs mb-6 font-medium">Your workspace is styled with a premium tactile design system.</p>
                  <div className="neumorphic-btn p-5 rounded-3xl flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-[#3D4852]">Neumorphic Soft UI Engine</div>
                      <div className="text-xs mt-1 text-[#6B7280] font-medium max-w-md">
                        Dual-opposing shadows on a cool-monochromatic surface (#E0E5EC) for maximum physical depth and accessibility.
                      </div>
                    </div>
                    <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#38B2AC] neumorphic-inset px-4 py-2 rounded-full flex-shrink-0 ml-4">
                      Active
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'clarifyation' && <ClarifyationSettings />}
              {activeTab === 'mcp' && <McpSettings />}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

