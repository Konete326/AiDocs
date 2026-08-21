import React, { useState, useEffect, useMemo } from "react";
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
import { Check, Palette, Layout, Layers } from "lucide-react";

export const THEME_PALETTES = {
  monochrome: ['#000000', '#71717A', '#FFFFFF'],
  bauhaus: ['#D02020', '#1040C0', '#F0C020'],
  linear: ['#5E6AD2', '#050506', '#8A99AD'],
  luxury: ['#D4AF37', '#1A1A1A', '#F9F8F6'],
  minimalistmodern: ['#0052FF', '#0F172A', '#F8FAFC'],
  terminal: ['#00FF66', '#0D1117', '#30363D'],
  swiss: ['#FF3B30', '#000000', '#F4F4F4'],
  kinetic: ['#DFE104', '#09090B', '#FFFFFF'],
  flat: ['#3B82F6', '#10B981', '#F3F4F6'],
  artdeco: ['#D4AF37', '#0A0A0A', '#E5E5E5'],
  boldtype: ['#FF3D00', '#111111', '#FFFFFF'],
  neobrutalism: ['#FF4D4D', '#FFD166', '#FFFDF5'],
  material: ['#6750A4', '#625B71', '#FEF7FF'],
  academia: ['#C9A962', '#1C1714', '#E8DFD4'],
  cyberpunk: ['#00FF88', '#FF00FF', '#0A0A0F'],
  bitcoindefi: ['#F7931A', '#FFD700', '#08080C'],
  playfulgeo: ['#8B5CF6', '#F472B6', '#FFFDF5'],
  mindark: ['#F59E0B', '#0A0A0F', '#64748B'],
  claymorphism: ['#7C3AED', '#DB2777', '#F4F1FA'],
  serif: ['#B8860B', '#1A1A1A', '#FAFAF8'],
  botanical: ['#2D3A31', '#8C9A84', '#F9F8F4'],
  vaporwave: ['#FF00FF', '#00FFFF', '#090014'],
  corporatetrust: ['#4F46E5', '#7C3AED', '#F8FAFC'],
  handdrawn: ['#FF4D4D', '#2D2D2D', '#FDFBF7'],
  industrialkeuo: ['#FF4757', '#3D4852', '#E0E5EC'],
  neumorphism: ['#6C63FF', '#3D4852', '#E0E5EC'],
  organicnatural: ['#5D7052', '#C18C5D', '#FDFCF8'],
  maximalism: ['#FF007F', '#00F0FF', '#0D0D1A']
};

export const DesignSystemSelector = ({ selectedPresetId, onSelectPreset }) => {
  const [activePresetId, setActivePresetId] = useState(selectedPresetId || "corporatetrust");
  const [viewMode, setViewMode] = useState("landing");
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);

  const activePreset = useMemo(() => {
    return DESIGN_PRESETS.find(p => p.id === activePresetId) || DESIGN_PRESETS[0];
  }, [activePresetId]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActivePresetId((prev) => {
          const currentIndex = DESIGN_PRESETS.findIndex((p) => p.id === prev);
          const nextIndex = (currentIndex + 1) % DESIGN_PRESETS.length;
          return DESIGN_PRESETS[nextIndex].id;
        });
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActivePresetId((prev) => {
          const currentIndex = DESIGN_PRESETS.findIndex((p) => p.id === prev);
          const prevIndex = (currentIndex - 1 + DESIGN_PRESETS.length) % DESIGN_PRESETS.length;
          return DESIGN_PRESETS[prevIndex].id;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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
    <div className="w-full liquid-glass rounded-2xl overflow-hidden flex flex-col lg:flex-row min-h-[380px] h-[440px]">
      <div className="w-full lg:w-56 xl:w-60 shrink-0 p-2 flex flex-col space-y-1 shadow-[inset_-2px_0_6px_rgba(163,177,198,0.3)] overflow-hidden bg-[#E0E5EC]">
        <div className="flex items-center justify-between px-1 py-0.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">Design Presets ({DESIGN_PRESETS.length})</span>
          <span className="text-[9px] text-[#6C63FF] font-semibold">↑↓ Keys</span>
        </div>

        <div className="space-y-1 overflow-y-auto flex-1 pr-1 custom-scrollbar">
          {DESIGN_PRESETS.map(preset => {
            const isActive = activePresetId === preset.id;
            const isSelected = selectedPresetId === preset.id;
            const colors = THEME_PALETTES[preset.id] || ['#6C63FF', '#3D4852', '#E0E5EC'];
            return (
              <button 
                key={preset.id} 
                onClick={() => setActivePresetId(preset.id)} 
                className={`w-full text-left px-2.5 py-1 rounded-xl transition-all cursor-pointer border ${
                  isActive 
                    ? "bg-[#6C63FF]/15 border border-[#6C63FF] shadow-[0_0_8px_rgba(108,99,255,0.3)]" 
                    : "bg-white/40 border-black/5 hover:border-[#6C63FF]/40"
                }`}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <div className="flex items-center -space-x-1 shrink-0">
                      {colors.map((c, i) => (
                        <span key={i} className="w-2 h-2 rounded-full border border-black/10 inline-block shadow-xs" style={{ backgroundColor: c }} />
                      ))}
                    </div>
                    <span className={`text-[11px] font-extrabold truncate ${isActive ? "text-[#6C63FF]" : "text-[#3D4852]"}`}>{preset.name}</span>
                  </div>
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
        <div className="p-2 px-3.5 flex flex-wrap items-center justify-between gap-2 shadow-[0_2px_6px_rgba(163,177,198,0.3)] border-b border-black/5">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 rounded-lg bg-[#6C63FF] text-white flex items-center justify-center">
              <Palette size={11} className="text-white stroke-white" />
            </div>
            <span className="text-xs font-bold text-[#3D4852] tracking-wide">{activePreset.name} Studio Preview</span>
            <div className="flex items-center -space-x-1 ml-1">
              {(THEME_PALETTES[activePreset.id] || ['#6C63FF', '#3D4852', '#E0E5EC']).map((c, i) => (
                <span key={i} className="w-2.5 h-2.5 rounded-full border border-black/10 inline-block shadow-xs" style={{ backgroundColor: c }} />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {onSelectPreset && (
              <button 
                onClick={() => onSelectPreset(activePreset)} 
                className="bg-[#6C63FF] hover:bg-[#8B84FF] text-white !text-white px-3.5 py-1 rounded-xl text-xs font-extrabold flex items-center justify-center space-x-1.5 transition-transform hover:scale-105 cursor-pointer min-w-[95px] shadow-md"
              >
                <Check size={11} className="text-white stroke-white" />
                <span className="text-white !text-white font-extrabold">{selectedPresetId === activePreset.id ? "Applied ✓" : "Apply Theme"}</span>
              </button>
            )}

            <div className="flex items-center liquid-glass rounded-xl p-0.5 space-x-1">
              <button onClick={() => setViewMode("landing")} className={`px-2.5 py-0.5 rounded-lg text-[11px] font-bold flex items-center space-x-1 transition-all cursor-pointer ${viewMode === "landing" ? "bg-[#6C63FF] text-white shadow-sm" : "text-[#6B7280] hover:text-[#3D4852]"}`}>
                <Layout size={10} />
                <span>Landing</span>
              </button>
              <button onClick={() => setViewMode("showcase")} className={`px-2.5 py-0.5 rounded-lg text-[11px] font-bold flex items-center space-x-1 transition-all cursor-pointer ${viewMode === "showcase" ? "bg-[#6C63FF] text-white shadow-sm" : "text-[#6B7280] hover:text-[#3D4852]"}`}>
                <Layers size={10} />
                <span>UI Kit</span>
              </button>
            </div>
          </div>
        </div>

        <div className="p-3 flex-1 overflow-y-auto max-h-[380px] custom-scrollbar">
          {renderActivePreview()}
        </div>
      </div>

      <DesignPromptModal isOpen={isPromptModalOpen} onClose={() => setIsPromptModalOpen(false)} preset={activePreset} />
    </div>
  );
};
