import React, { useState } from "react";
import { DESIGN_PRESETS } from "../../../constants/designSystemPresets";
import { DesignSystemSelector } from "../../design/DesignSystemSelector";
import { Palette, Check, X, Sparkles } from "lucide-react";

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
    <div className="space-y-1.5">
      <label className="text-xs font-extrabold text-[#6B7280] uppercase tracking-wider flex items-center gap-1.5">
        <Palette size={13} className="text-[#2563EB]" />
        <span className="truncate">Design System Theme</span>
      </label>

      <div className="neumorphic-card rounded-2xl p-2.5 px-3 bg-[#E0E5EC] border border-black/5 flex items-center justify-between gap-2 min-w-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-[#2563EB] text-white flex items-center justify-center font-extrabold text-xs shadow-[2px_2px_4px_rgba(37,99,235,0.35)] shrink-0">
            <Palette className="w-4 h-4 text-white" />
          </div>
          <div className="min-w-0">
            <h4 className="text-xs font-extrabold text-[#3D4852] truncate">
              {currentPreset.name}
            </h4>
            <p className="text-[10px] text-[#2563EB] font-extrabold truncate mt-0.5">Active Theme Studio</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-extrabold px-3.5 py-1.5 rounded-xl text-xs transition-all shadow-[2px_2px_5px_rgba(37,99,235,0.35)] cursor-pointer shrink-0 flex items-center justify-center"
        >
          <span className="text-white font-extrabold tracking-wide">Studio ↗</span>
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center pt-16 md:pt-20 pb-6 px-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-150">
          <div className="w-full max-w-7xl w-[94vw] neumorphic-card rounded-[2.5rem] bg-[#E0E5EC] text-[#3D4852] flex flex-col overflow-hidden shadow-2xl max-h-[85vh] mt-2 md:mt-4">
            <div className="flex items-center justify-between p-4 px-6 border-b border-black/5 bg-[#E0E5EC]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-[#2563EB] text-white flex items-center justify-center font-extrabold text-sm shadow-md">
                  🎨
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-[#3D4852]">Design System Presets & Live Interactive Preview Studio</h3>
                  <p className="text-xs text-[#6B7280] font-medium mt-0.5">
                    Explore live UI Kit components, landing page layouts, and color tokens for all 28 theme presets before selecting.
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

            <div className="p-4 overflow-y-auto max-h-[75vh]">
              <DesignSystemSelector
                selectedPresetId={currentThemeId}
                onSelectPreset={handleSelectTheme}
              />
            </div>

            <div className="p-3.5 px-6 border-t border-black/5 bg-[#E0E5EC] flex justify-between items-center">
              <span className="text-xs text-[#6B7280] font-semibold">
                Current Active: <strong className="text-[#2563EB] font-extrabold">{currentPreset.name}</strong>
              </span>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-extrabold px-5 py-2 rounded-2xl text-xs transition-all shadow-md cursor-pointer"
              >
                <span className="text-white font-extrabold">Close Preview</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
