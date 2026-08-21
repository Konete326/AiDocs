import React, { useState, useMemo } from "react";
import { DESIGN_PRESETS } from "../../constants/designSystemPresets";
import { MonochromePreview } from "./previews/monochrome/MonochromePreview";
import { BauhausPreview } from "./previews/bauhaus/BauhausPreview";
import { LinearPreview } from "./previews/linear/LinearPreview";
import { LuxuryPreview } from "./previews/luxury/LuxuryPreview";
import { MinimalistModernPreview } from "./previews/minimalistModern/MinimalistModernPreview";
import { TerminalPreview } from "./previews/terminal/TerminalPreview";
import { SwissPreview } from "./previews/swiss/SwissPreview";
import { KineticPreview } from "./previews/kinetic/KineticPreview";
import { FlatPreview } from "./previews/flat/FlatPreview";
import { ArtDecoPreview } from "./previews/artdeco/ArtDecoPreview";
import { BoldTypePreview } from "./previews/boldtype/BoldTypePreview";
import { NeoBrutalismPreview } from "./previews/neobrutalism/NeoBrutalismPreview";
import { MaterialPreview } from "./previews/material/MaterialPreview";
import { AcademiaPreview } from "./previews/academia/AcademiaPreview";
import { CyberpunkPreview } from "./previews/cyberpunk/CyberpunkPreview";
import { BitcoinDeFiPreview } from "./previews/bitcoindefi/BitcoinDeFiPreview";
import { PlayfulGeoPreview } from "./previews/playfulgeo/PlayfulGeoPreview";
import { MinDarkPreview } from "./previews/mindark/MinDarkPreview";
import { ClaymorphismPreview } from "./previews/claymorphism/ClaymorphismPreview";
import { SerifPreview } from "./previews/serif/SerifPreview";
import { BotanicalPreview } from "./previews/botanical/BotanicalPreview";
import { VaporwavePreview } from "./previews/vaporwave/VaporwavePreview";
import { CorporateTrustPreview } from "./previews/corporatetrust/CorporateTrustPreview";
import { HandDrawnPreview } from "./previews/handdrawn/HandDrawnPreview";
import { IndustrialSkeuoPreview } from "./previews/industrialkeuo/IndustrialSkeuoPreview";
import { NeumorphismPreview } from "./previews/neumorphism/NeumorphismPreview";
import { OrganicNaturalPreview } from "./previews/organicnatural/OrganicNaturalPreview";
import { MaximalismPreview } from "./previews/maximalism/MaximalismPreview";
import { DesignPromptModal } from "./DesignPromptModal";
import { Check, Palette, Layout, Layers, Download } from "lucide-react";
import { toast } from "react-hot-toast";

export const DesignSystemSelector = ({ selectedPresetId, onSelectPreset }) => {
  const [activePresetId, setActivePresetId] = useState(selectedPresetId || "corporatetrust");
  const [viewMode, setViewMode] = useState("landing");
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);

  const activePreset = useMemo(() => {
    return DESIGN_PRESETS.find(p => p.id === activePresetId) || DESIGN_PRESETS[0];
  }, [activePresetId]);

  const handleDownloadTailwindConfig = () => {
    const colors = activePreset.tokens?.colors || {
      primary: '#6C63FF',
      secondary: '#38B2AC',
      background: '#E0E5EC',
      surface: '#F0F4F8',
      text: '#3D4852',
      muted: '#6B7280'
    };

    const fontFamily = activePreset.tokens?.fontFamily || 'Inter, sans-serif';

    const configContent = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: ${JSON.stringify(colors, null, 8)},
      fontFamily: {
        preset: ["${fontFamily.split(',')[0].replace(/['"]/g, '').trim()}", "sans-serif"]
      },
      boxShadow: {
        'neumorphic-raised': '9px 9px 16px rgba(163,177,198,0.6), -9px -9px 16px rgba(255,255,255,0.5)',
        'neumorphic-inset': 'inset 6px 6px 10px rgba(163,177,198,0.6), inset -6px -6px 10px rgba(255,255,255,0.5)',
      }
    },
  },
  plugins: [],
};
`;

    const blob = new Blob([configContent], { type: 'application/javascript;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'tailwind.config.js';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success(`tailwind.config.js downloaded for ${activePreset.name}!`);
  };

  const renderActivePreview = () => {
    switch (activePresetId) {
      case "monochrome": return <MonochromePreview mode={viewMode} />;
      case "bauhaus": return <BauhausPreview mode={viewMode} />;
      case "linear": return <LinearPreview mode={viewMode} />;
      case "luxury": return <LuxuryPreview mode={viewMode} />;
      case "minimalistmodern": return <MinimalistModernPreview mode={viewMode} />;
      case "terminal": return <TerminalPreview mode={viewMode} />;
      case "swiss": return <SwissPreview mode={viewMode} />;
      case "kinetic": return <KineticPreview mode={viewMode} />;
      case "flat": return <FlatPreview mode={viewMode} />;
      case "artdeco": return <ArtDecoPreview mode={viewMode} />;
      case "boldtype": return <BoldTypePreview mode={viewMode} />;
      case "neobrutalism": return <NeoBrutalismPreview mode={viewMode} />;
      case "material": return <MaterialPreview mode={viewMode} />;
      case "academia": return <AcademiaPreview mode={viewMode} />;
      case "cyberpunk": return <CyberpunkPreview mode={viewMode} />;
      case "bitcoindefi": return <BitcoinDeFiPreview mode={viewMode} />;
      case "playfulgeo": return <PlayfulGeoPreview mode={viewMode} />;
      case "mindark": return <MinDarkPreview mode={viewMode} />;
      case "claymorphism": return <ClaymorphismPreview mode={viewMode} />;
      case "serif": return <SerifPreview mode={viewMode} />;
      case "botanical": return <BotanicalPreview mode={viewMode} />;
      case "vaporwave": return <VaporwavePreview mode={viewMode} />;
      case "corporatetrust": return <CorporateTrustPreview mode={viewMode} />;
      case "handdrawn": return <HandDrawnPreview mode={viewMode} />;
      case "industrialkeuo": return <IndustrialSkeuoPreview mode={viewMode} />;
      case "neumorphism": return <NeumorphismPreview mode={viewMode} />;
      case "organicnatural": return <OrganicNaturalPreview mode={viewMode} />;
      case "maximalism": return <MaximalismPreview mode={viewMode} />;
      default: return <CorporateTrustPreview mode={viewMode} />;
    }
  };

  return (
    <div className="w-full liquid-glass rounded-2xl overflow-hidden flex flex-col lg:flex-row min-h-[460px] h-[520px]">
      <div className="w-full lg:w-56 xl:w-60 shrink-0 p-2 flex flex-col space-y-1 shadow-[inset_-2px_0_6px_rgba(163,177,198,0.3)] overflow-hidden bg-[#E0E5EC]">
        <div className="flex items-center justify-between px-1 py-0.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">Design Presets ({DESIGN_PRESETS.length})</span>
        </div>

        <div className="space-y-1 overflow-y-auto flex-1 pr-1 custom-scrollbar">
          {DESIGN_PRESETS.map(preset => {
            const isActive = activePresetId === preset.id;
            const isSelected = selectedPresetId === preset.id;
            return (
              <button 
                key={preset.id} 
                onClick={() => setActivePresetId(preset.id)} 
                className={`w-full text-left px-2.5 py-1.5 rounded-xl transition-all cursor-pointer border ${
                  isActive 
                    ? "bg-[#6C63FF]/15 border border-[#6C63FF] shadow-[0_0_8px_rgba(108,99,255,0.3)]" 
                    : "bg-white/40 border-black/5 hover:border-[#6C63FF]/40"
                }`}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <span className={`text-[11px] font-extrabold truncate ${isActive ? "text-[#6C63FF]" : "text-[#3D4852]"}`}>{preset.name}</span>
                  {isSelected && (
                    <span className="text-[8px] bg-[#6C63FF] text-white px-1.5 py-0.2 rounded-full font-bold uppercase shrink-0 ml-1">
                      Active
                    </span>
                  )}
                </div>
                <p className={`text-[9.5px] line-clamp-1 ${isActive ? "text-[#3D4852] font-medium" : "text-[#6B7280]"}`}>{preset.tagline}</p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 min-w-0 flex flex-col overflow-hidden bg-[#E0E5EC]">
        <div className="p-2.5 px-4 flex flex-wrap items-center justify-between gap-2 shadow-[0_2px_6px_rgba(163,177,198,0.3)] border-b border-black/5">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-lg bg-[#6C63FF] text-white flex items-center justify-center">
              <Palette size={12} className="text-white stroke-white" />
            </div>
            <span className="text-xs font-bold text-[#3D4852] tracking-wide">{activePreset.name} Studio Preview</span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleDownloadTailwindConfig}
              className="bg-[#6C63FF] hover:bg-[#8B84FF] text-white px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center space-x-1.5 transition-transform hover:scale-105 cursor-pointer shadow-md"
              title="Download tailwind.config.js theme preset"
            >
              <Download size={12} className="text-white" />
              <span>tailwind.config.js</span>
            </button>

            {onSelectPreset && (
              <button 
                onClick={() => onSelectPreset(activePreset)} 
                className="bg-[#6C63FF] hover:bg-[#8B84FF] text-white !text-white px-4 py-1.5 rounded-xl text-xs font-extrabold flex items-center justify-center space-x-1.5 transition-transform hover:scale-105 cursor-pointer min-w-[105px] shadow-md"
              >
                <Check size={12} className="text-white stroke-white" />
                <span className="text-white !text-white font-extrabold">{selectedPresetId === activePreset.id ? "Applied ✓" : "Apply Theme"}</span>
              </button>
            )}

            <div className="flex items-center liquid-glass rounded-xl p-0.5 space-x-1">
              <button onClick={() => setViewMode("landing")} className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center space-x-1 transition-all cursor-pointer ${viewMode === "landing" ? "bg-[#6C63FF] text-white shadow-sm" : "text-[#6B7280] hover:text-[#3D4852]"}`}>
                <Layout size={11} />
                <span>Landing</span>
              </button>
              <button onClick={() => setViewMode("showcase")} className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center space-x-1 transition-all cursor-pointer ${viewMode === "showcase" ? "bg-[#6C63FF] text-white shadow-sm" : "text-[#6B7280] hover:text-[#3D4852]"}`}>
                <Layers size={11} />
                <span>UI Kit</span>
              </button>
            </div>
          </div>
        </div>

        <div className="p-3.5 flex-1 overflow-y-auto max-h-[440px] custom-scrollbar">
          {renderActivePreview()}
        </div>
      </div>

      <DesignPromptModal isOpen={isPromptModalOpen} onClose={() => setIsPromptModalOpen(false)} preset={activePreset} />
    </div>
  );
};
