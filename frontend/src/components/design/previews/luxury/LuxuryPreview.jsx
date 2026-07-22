import React from "react";
import { LuxuryHeader } from "./LuxuryHeader";
import { LuxuryHero } from "./LuxuryHero";
import { LuxuryStats } from "./LuxuryStats";
import { LuxuryFeatures } from "./LuxuryFeatures";
import { LuxuryPricing } from "./LuxuryPricing";
import { LuxuryComponentsShowcase } from "./LuxuryComponentsShowcase";
import { LuxuryFooter } from "./LuxuryFooter";

export const LuxuryPreview = ({ mode = "landing" }) => {
  return (
    <div className="w-full bg-[#F9F8F6] text-[#1A1A1A] font-['Inter'] select-none border border-[#1A1A1A]/20">
      <LuxuryHeader />
      {mode === "showcase" ? (
        <LuxuryComponentsShowcase />
      ) : (
        <>
          <LuxuryHero />
          <LuxuryStats />
          <LuxuryFeatures />
          <LuxuryPricing />
          <LuxuryComponentsShowcase />
        </>
      )}
      <LuxuryFooter />
    </div>
  );
};
