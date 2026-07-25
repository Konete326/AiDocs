import React from "react";
import { MinDarkHeader } from "./MinDarkHeader";
import { MinDarkHero } from "./MinDarkHero";
import { MinDarkStats } from "./MinDarkStats";
import { MinDarkFeatures } from "./MinDarkFeatures";
import { MinDarkPricing } from "./MinDarkPricing";
import { MinDarkComponentsShowcase } from "./MinDarkComponentsShowcase";
import { MinDarkFooter } from "./MinDarkFooter";

export const MinDarkPreview = ({ mode = "landing" }) => {
  return (
    <div className="w-full bg-[#0A0A0F] text-[#FAFAFA] font-['Space_Grotesk'] select-none border border-white/10 rounded-xl overflow-hidden">
      <MinDarkHeader />
      {mode === "showcase" ? (
        <MinDarkComponentsShowcase />
      ) : (
        <>
          <MinDarkHero />
          <MinDarkStats />
          <MinDarkFeatures />
          <MinDarkPricing />
          <MinDarkComponentsShowcase />
        </>
      )}
      <MinDarkFooter />
    </div>
  );
};
