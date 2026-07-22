import React from "react";
import { HandDrawnHeader } from "./HandDrawnHeader";
import { HandDrawnHero } from "./HandDrawnHero";
import { HandDrawnStats } from "./HandDrawnStats";
import { HandDrawnFeatures } from "./HandDrawnFeatures";
import { HandDrawnPricing } from "./HandDrawnPricing";
import { HandDrawnComponentsShowcase } from "./HandDrawnComponentsShowcase";
import { HandDrawnFooter } from "./HandDrawnFooter";

export const HandDrawnPreview = ({ mode = "landing" }) => {
  return (
    <div className="w-full bg-[#fdfbf7] text-[#2d2d2d] font-['Patrick_Hand',cursive] select-none border-[3px] border-[#2d2d2d] relative overflow-hidden" style={{ backgroundImage: "radial-gradient(#e5e0d8 1px, transparent 1px)", backgroundSize: "24px 24px" }}>
      <HandDrawnHeader />
      {mode === "showcase" ? (
        <HandDrawnComponentsShowcase />
      ) : (
        <>
          <HandDrawnHero />
          <HandDrawnStats />
          <HandDrawnFeatures />
          <HandDrawnPricing />
          <HandDrawnComponentsShowcase />
        </>
      )}
      <HandDrawnFooter />
    </div>
  );
};
