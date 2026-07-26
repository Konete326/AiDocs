import React, { useState } from "react";
import { DESIGN_PRESETS } from "../../../constants/designSystemPresets";
import { Palette, Check, ExternalLink, X, Sparkles } from "lucide-react";

export default function DesignSystemField({ formData, onChange }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentThemeId = formData.designSystem?.id || "monochrome";
  const currentPreset = DESIGN_PRESETS.find(p => p.id === currentThemeId) || DESIGN_PRESETS[0];

  const handleSelectTheme = (preset) => {
    onChange("designSystem", {
      id: preset.id,
      name: preset.name,
      prompt: preset.prompt,
      tokens: preset.tokens
    });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-2">
      <label className="text-xs font-extrabold text-[#6B7280] uppercase tracking-wider flex items-center gap-2">
        <Palette size={14} className="text-[#6C63FF]" />
        <span>Design System Theme</span>
      </label>

      <div className="neumorphic-card rounded-2xl p-4 bg-[#E0E5EC] border border-black/5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#6C63FF] text-white flex items-center justify-center font-extrabold text-sm shadow-md">
            🎨
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-[#3D4852] flex items-center gap-2">
              <span>{currentPreset.name}</span>
              <span className="text-[10px] bg-[#6C63FF] text-white px-2 py-0.5 rounded-full font-bold uppercase">Selected</span>
            </h4>
            <p className="text-xs text-[#6B7280] font-medium line-clamp-1 mt-0.5">{currentPreset.tagline}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="bg-[#6C63FF] hover:bg-[#8B84FF] text-white px-4 py-2 rounded-2xl text-xs font-bold transition-all shadow-md cursor-pointer shrink-0 flex items-center gap-1.5"
        >
          <span>Choose Theme ↗</span>
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-150">
          <div className="w-full max-w-4xl neumorphic-card rounded-[2.5rem] bg-[#E0E5EC] text-[#3D4852] flex flex-col overflow-hidden shadow-2xl max-h-[85vh]">
            <div className="flex items-center justify-between p-5 px-7 border-b border-black/5 bg-[#E0E5EC]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-[#6C63FF] text-white flex items-center justify-center font-extrabold text-sm shadow-md">
                  🎨
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-[#3D4852]">Select Design System Theme</h3>
                  <p className="text-xs text-[#6B7280] font-medium mt-0.5">
                    Browse 28+ modern UI theme templates. Select your favorite theme for document suite generation.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full neumorphic-btn flex items-center justify-center text-[#6B7280] hover:text-[#3D4852] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {DESIGN_PRESETS.map((preset) => {
                const isSelected = currentThemeId === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleSelectTheme(preset)}
                    disabled={!preset.isAvailable}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? "bg-[#6C63FF] border-[#6C63FF] text-white shadow-lg ring-2 ring-[#6C63FF]/30"
                        : preset.isAvailable
                        ? "neumorphic-card bg-[#E0E5EC] border-black/5 text-[#3D4852] hover:border-[#6C63FF]/40"
                        : "bg-[#E0E5EC]/50 border-black/5 text-[#9CA3AF] opacity-60 cursor-not-allowed"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-extrabold font-serif">{preset.name}</span>
                        {isSelected && <Check size={16} className="text-white" />}
                        {!preset.isAvailable && <span className="text-[9px] bg-slate-300 px-1.5 py-0.5 rounded text-slate-700 font-bold">Soon</span>}
                      </div>
                      <p className={`text-[11px] leading-relaxed line-clamp-2 ${isSelected ? 'text-white/90' : 'text-[#6B7280]'}`}>{preset.tagline}</p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-black/5 flex items-center justify-between">
                      <span className={`text-[9px] font-extrabold uppercase tracking-wider ${isSelected ? 'text-white' : 'text-[#6C63FF]'}`}>
                        {isSelected ? 'Active Theme' : 'Click to Select'}
                      </span>
                      <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-[#6C63FF]'}`}>Select ↗</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="p-4 px-7 border-t border-black/5 bg-[#E0E5EC] flex justify-between items-center">
              <span className="text-xs text-[#6B7280] font-semibold">
                Current Active: <strong className="text-[#6C63FF]">{currentPreset.name}</strong>
              </span>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="bg-[#6C63FF] hover:bg-[#8B84FF] text-white px-5 py-2 rounded-2xl text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
