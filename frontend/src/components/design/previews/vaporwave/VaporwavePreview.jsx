import React from "react";
import { VaporwaveHeader } from "./VaporwaveHeader";
import { VaporwaveHero } from "./VaporwaveHero";
import { VaporwaveStats } from "./VaporwaveStats";
import { VaporwaveFeatures } from "./VaporwaveFeatures";
import { VaporwavePricing } from "./VaporwavePricing";
import { VaporwaveComponentsShowcase } from "./VaporwaveComponentsShowcase";
import { VaporwaveFooter } from "./VaporwaveFooter";

export const VaporwavePreview = ({ mode = "landing" }) => {
  return (
    <div className="w-full bg-[#090014] text-[#E0E0E0] font-['Orbitron',sans-serif] select-none border-2 border-[#FF00FF]">
      <VaporwaveHeader />
      {mode === "showcase" ? (
        <VaporwaveComponentsShowcase />
      ) : (
        <>
          <VaporwaveHero />
          <VaporwaveStats />
          <VaporwaveFeatures />
          <VaporwavePricing />
          <VaporwaveComponentsShowcase />
        </>
      )}
      <VaporwaveFooter />
    </div>
  );
};
