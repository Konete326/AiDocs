import React, { useState } from "react";
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
import { FileText, Check, Sparkles, Layout, Layers, Copy } from "lucide-react";

export const DesignSystemSelector = ({ selectedPresetId, onSelectPreset }) => {
  const [activePresetId, setActivePresetId] = useState(selectedPresetId || "monochrome");
  const [viewMode, setViewMode] = useState("landing");
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const activePreset = DESIGN_PRESETS.find(p => p.id === activePresetId) || DESIGN_PRESETS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activePreset.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderActivePreview = () => {
    switch (activePresetId) {
      case "monochrome": return <MonochromePreview mode={viewMode} />;
      case "bauhaus": return <BauhausPreview mode={viewMode} />;
      case "linear": return <LinearPreview mode={viewMode} />;
      case "luxury": return <LuxuryPreview mode={viewMode} />;
      case "minimalist-modern": return <MinimalistModernPreview mode={viewMode} />;
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
      default: return <div className="py-24 text-center text-slate-500 font-mono text-xs">Preview coming soon for {activePreset.name}!</div>;
    }
  };

  return (
    <div className="w-full liquid-glass rounded-2xl overflow-hidden grid lg:grid-cols-12 min-h-[340px] h-[400px]">
      <div className="lg:col-span-3 p-3 flex flex-col space-y-2 shadow-[inset_-2px_0_6px_rgba(163,177,198,0.3)] overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">Design Presets</span>
          <span className="text-[9px] liquid-glass text-[#38B2AC] px-1.5 py-0.5 rounded-full font-mono font-semibold">28 Themes</span>
        </div>

        <div className="space-y-1.5 overflow-y-auto flex-1 pr-1 custom-scrollbar">
          {DESIGN_PRESETS.map(preset => (
            <button key={preset.id} onClick={() => setActivePresetId(preset.id)} className={`w-full text-left p-2.5 rounded-xl transition-all cursor-pointer ${activePresetId === preset.id ? "liquid-glass-strong text-[#38B2AC] font-semibold" : "liquid-glass text-[#3D4852] hover:scale-[1.01]"}`}>
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-xs font-bold">{preset.name}</span>
                {selectedPresetId === preset.id && <span className="text-[9px] liquid-glass text-[#38B2AC] px-1.5 py-0.2 rounded-full font-mono font-bold">Active</span>}
              </div>
              <p className="text-[10px] text-[#6B7280] line-clamp-1">{preset.tagline}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="lg:col-span-9 flex flex-col overflow-hidden">
        <div className="p-2.5 flex flex-wrap items-center justify-between gap-2 shadow-[0_2px_6px_rgba(163,177,198,0.3)]">
          <div className="flex items-center space-x-2">
            <Sparkles size={13} className="text-[#38B2AC]" />
            <span className="text-xs font-bold text-[#3D4852] tracking-wide">{activePreset.name} Studio Preview</span>
          </div>

          <div className="flex items-center space-x-1.5">
            {onSelectPreset && (
              <button onClick={() => onSelectPreset(activePreset)} className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-transform hover:scale-105 cursor-pointer ${selectedPresetId === activePreset.id ? "liquid-glass text-[#38B2AC]" : "liquid-glass-strong text-[#3D4852]"}`}>
                <Check size={12} className={selectedPresetId === activePreset.id ? "text-[#38B2AC]" : "text-[#3D4852]"} />
                <span>{selectedPresetId === activePreset.id ? "Applied" : "Apply Theme"}</span>
              </button>
            )}

            <button onClick={() => setIsPromptModalOpen(true)} className="liquid-glass text-[#3D4852] hover:scale-105 px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-transform cursor-pointer">
              <FileText size={12} className="text-[#38B2AC]" />
              <span>Prompt</span>
            </button>

            <button onClick={handleCopy} title="Copy System Prompt" className="liquid-glass text-[#3D4852] hover:scale-105 px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-transform cursor-pointer">
              <Copy size={12} />
              <span>{copied ? "Copied!" : "Copy"}</span>
            </button>

            <div className="flex items-center liquid-glass rounded-lg p-0.5 space-x-0.5">
              <button onClick={() => setViewMode("landing")} className={`px-2 py-0.5 rounded-md text-xs font-medium flex items-center space-x-1 transition-all cursor-pointer ${viewMode === "landing" ? "liquid-glass-strong text-[#38B2AC] font-semibold" : "text-[#6B7280] hover:text-[#3D4852]"}`}>
                <Layout size={11} />
                <span>Landing</span>
              </button>
              <button onClick={() => setViewMode("showcase")} className={`px-2 py-0.5 rounded-md text-xs font-medium flex items-center space-x-1 transition-all cursor-pointer ${viewMode === "showcase" ? "liquid-glass-strong text-[#38B2AC] font-semibold" : "text-[#6B7280] hover:text-[#3D4852]"}`}>
                <Layers size={11} />
                <span>UI Kit</span>
              </button>
            </div>
          </div>
        </div>

        <div className="p-3 flex-1 overflow-y-auto max-h-[340px] custom-scrollbar">
          {renderActivePreview()}
        </div>
      </div>

      <DesignPromptModal isOpen={isPromptModalOpen} onClose={() => setIsPromptModalOpen(false)} preset={activePreset} />
    </div>
  );
};
