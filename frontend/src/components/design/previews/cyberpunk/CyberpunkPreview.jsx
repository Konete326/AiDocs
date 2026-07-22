import React from "react";
import { CyberpunkHeader } from "./CyberpunkHeader";
import { CyberpunkHero } from "./CyberpunkHero";
import { CyberpunkStats } from "./CyberpunkStats";
import { CyberpunkFeatures } from "./CyberpunkFeatures";
import { CyberpunkPricing } from "./CyberpunkPricing";
import { CyberpunkComponentsShowcase } from "./CyberpunkComponentsShowcase";
import { CyberpunkFooter } from "./CyberpunkFooter";

export const CyberpunkPreview = ({ mode = "landing" }) => {
  return (
    <div className="w-full bg-[#0a0a0f] text-[#e0e0e0] font-['Orbitron',sans-serif] select-none border border-[#00ff88]/40">
      <CyberpunkHeader />
      {mode === "showcase" ? (
        <CyberpunkComponentsShowcase />
      ) : (
        <>
          <CyberpunkHero />
          <CyberpunkStats />
          <CyberpunkFeatures />
          <CyberpunkPricing />
          <CyberpunkComponentsShowcase />
        </>
      )}
      <CyberpunkFooter />
    </div>
  );
};
