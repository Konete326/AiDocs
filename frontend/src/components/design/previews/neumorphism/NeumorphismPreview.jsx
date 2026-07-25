import React from "react";
import { NeumorphismHeader } from "./NeumorphismHeader";
import { NeumorphismHero } from "./NeumorphismHero";
import { NeumorphismStats } from "./NeumorphismStats";
import { NeumorphismFeatures } from "./NeumorphismFeatures";
import { NeumorphismPricing } from "./NeumorphismPricing";
import { NeumorphismComponentsShowcase } from "./NeumorphismComponentsShowcase";
import { NeumorphismFooter } from "./NeumorphismFooter";

export const NeumorphismPreview = ({ mode = "landing" }) => {
  return (
    <div className="w-full bg-[#E0E5EC] text-[#3D4852] font-['Plus_Jakarta_Sans',sans-serif] select-none rounded-[32px] overflow-hidden shadow-[9px_9px_16px_rgb(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)]">
      <NeumorphismHeader />
      {mode === "showcase" ? (
        <NeumorphismComponentsShowcase />
      ) : (
        <>
          <NeumorphismHero />
          <NeumorphismStats />
          <NeumorphismFeatures />
          <NeumorphismPricing />
          <NeumorphismComponentsShowcase />
        </>
      )}
      <NeumorphismFooter />
    </div>
  );
};
