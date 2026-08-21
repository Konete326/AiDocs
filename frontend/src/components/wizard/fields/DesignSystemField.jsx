import React, { useState, useEffect } from "react";
import { DESIGN_PRESETS } from "../../../constants/designSystemPresets";
import { DesignSystemSelector, THEME_PALETTES } from "../../design/DesignSystemSelector";
import { Palette, Check, X, Sparkles } from "lucide-react";

export const PROJECT_TYPE_THEME_MAP = {
  ecommerce: "botanical",
  ai: "cyberpunk",
  saas: "corporatetrust",
  mobile: "claymorphism",
  marketplace: "mindark",
  other: "minimalistmodern"
};

export default function DesignSystemField({ formData, onChange }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const projectType = (formData.projectType || "saas").toLowerCase();
  const autoThemeId = PROJECT_TYPE_THEME_MAP[projectType] || "corporatetrust";

  const currentThemeId = formData.designSystem?.id || autoThemeId;
  const currentPreset = DESIGN_PRESETS.find(p => p.id === currentThemeId) || DESIGN_PRESETS[0];
  const palette = THEME_PALETTES[currentPreset.id] || ['#6C63FF', '#3D4852', '#E0E5EC'];

  useEffect(() => {
    if (!formData.designSystem?.id || formData.designSystem?.isAutoAssigned) {
      const matched = DESIGN_PRESETS.find(p => p.id === autoThemeId) || DESIGN_PRESETS[0];
      if (matched && formData.designSystem?.id !== matched.id) {
        onChange("designSystem", {
          id: matched.id,
          name: matched.name,
          prompt: matched.prompt,
          tokens: matched.tokens,
          isAutoAssigned: true
        });
      }
    }
  }, [projectType, autoThemeId]);

  const handleSelectTheme = (preset) => {
    onChange("designSystem", {
      id: preset.id,
      name: preset.name,
      prompt: preset.prompt,
      tokens: preset.tokens,
      isAutoAssigned: false
    });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-1.5">
      <label className="text-xs font-extrabold text-[#6B7280] uppercase tracking-wider flex items-center gap-1.5">
        <Palette size={13} className="text-[#6C63FF]" />
        <span className="truncate">Design System Theme</span>
      </label>

      <div className="neumorphic-card rounded-2xl p-2.5 px-3 bg-[#E0E5EC] border border-black/5 flex items-center justify-between gap-2 min-w-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-[#6C63FF] text-white flex items-center justify-center font-extrabold text-xs shadow-md shrink-0">
            <Palette className="w-4 h-4 text-white stroke-white" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 min-w-0">
              <h4 className="text-xs font-extrabold text-[#3D4852] truncate">
                {currentPreset.name}
              </h4>
              <div className="flex items-center -space-x-1 shrink-0">
                {palette.map((color, i) => (
                  <span
                    key={i}
                    className="w-2.5 h-2.5 rounded-full border border-black/15 inline-block shadow-xs"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
            <p className="text-[10px] text-[#6C63FF] font-extrabold truncate mt-0.5">Active Theme Studio</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="bg-[#6C63FF] hover:bg-[#8B84FF] text-white !text-white font-extrabold px-3.5 py-1.5 rounded-xl text-xs transition-all shadow-md active:scale-95 cursor-pointer shrink-0 flex items-center justify-center"
        >
          <span className="text-white !text-white font-extrabold tracking-wide">Studio ↗</span>
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center pt-16 md:pt-20 pb-6 px-4 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-7xl w-[94vw] neumorphic-card rounded-[2.5rem] bg-[#E0E5EC] text-[#3D4852] flex flex-col overflow-hidden shadow-2xl max-h-[85vh] mt-2 md:mt-4">
            <div className="flex items-center justify-between p-4 px-6 border-b border-black/5 bg-[#E0E5EC]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-[#6C63FF] text-white flex items-center justify-center font-extrabold text-sm shadow-md">
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

            <div className="p-3.5 overflow-y-auto max-h-[75vh] custom-scrollbar">
              <DesignSystemSelector
                selectedPresetId={currentThemeId}
                onSelectPreset={handleSelectTheme}
              />
            </div>

            <div className="p-3.5 px-6 border-t border-black/5 bg-[#E0E5EC] flex justify-between items-center">
              <span className="text-xs text-[#6B7280] font-semibold">
                Current Active: <strong className="text-[#6C63FF] font-extrabold">{currentPreset.name}</strong>
              </span>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="bg-[#6C63FF] hover:bg-[#8B84FF] text-white !text-white font-extrabold px-5 py-2 rounded-2xl text-xs transition-all shadow-md cursor-pointer"
              >
                <span className="text-white !text-white font-extrabold">Close Preview</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
