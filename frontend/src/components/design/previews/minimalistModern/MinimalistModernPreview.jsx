import React from "react";
import { MinimalistModernHeader } from "./MinimalistModernHeader";
import { MinimalistModernHero } from "./MinimalistModernHero";
import { MinimalistModernStats } from "./MinimalistModernStats";
import { MinimalistModernFeatures } from "./MinimalistModernFeatures";
import { MinimalistModernPricing } from "./MinimalistModernPricing";
import { MinimalistModernComponentsShowcase } from "./MinimalistModernComponentsShowcase";
import { MinimalistModernFooter } from "./MinimalistModernFooter";

export const MinimalistModernPreview = ({ mode = "landing" }) => {
  return (
    <div className="w-full bg-[#FAFAFA] text-[#0F172A] font-['Inter'] select-none border border-slate-200 rounded-xl overflow-hidden">
      <MinimalistModernHeader />
      {mode === "showcase" ? (
        <MinimalistModernComponentsShowcase />
      ) : (
        <>
          <MinimalistModernHero />
          <MinimalistModernStats />
          <MinimalistModernFeatures />
          <MinimalistModernPricing />
          <MinimalistModernComponentsShowcase />
        </>
      )}
      <MinimalistModernFooter />
    </div>
  );
};
