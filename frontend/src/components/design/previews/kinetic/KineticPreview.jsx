import React from "react";
import { KineticHeader } from "./KineticHeader";
import { KineticHero } from "./KineticHero";
import { KineticStats } from "./KineticStats";
import { KineticFeatures } from "./KineticFeatures";
import { KineticPricing } from "./KineticPricing";
import { KineticComponentsShowcase } from "./KineticComponentsShowcase";
import { KineticFooter } from "./KineticFooter";

export const KineticPreview = ({ mode = "landing" }) => {
  return (
    <div className="w-full bg-[#09090B] text-[#FAFAFA] font-['Space_Grotesk'] select-none border-2 border-[#3F3F46]">
      <KineticHeader />
      {mode === "showcase" ? (
        <KineticComponentsShowcase />
      ) : (
        <>
          <KineticHero />
          <KineticStats />
          <KineticFeatures />
          <KineticPricing />
          <KineticComponentsShowcase />
        </>
      )}
      <KineticFooter />
    </div>
  );
};
