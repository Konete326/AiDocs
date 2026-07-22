import React from "react";
import { SwissHeader } from "./SwissHeader";
import { SwissHero } from "./SwissHero";
import { SwissStats } from "./SwissStats";
import { SwissFeatures } from "./SwissFeatures";
import { SwissPricing } from "./SwissPricing";
import { SwissComponentsShowcase } from "./SwissComponentsShowcase";
import { SwissFooter } from "./SwissFooter";

export const SwissPreview = ({ mode = "landing" }) => {
  return (
    <div className="w-full bg-white text-black font-['Inter'] select-none border-4 border-black">
      <SwissHeader />
      {mode === "showcase" ? (
        <SwissComponentsShowcase />
      ) : (
        <>
          <SwissHero />
          <SwissStats />
          <SwissFeatures />
          <SwissPricing />
          <SwissComponentsShowcase />
        </>
      )}
      <SwissFooter />
    </div>
  );
};
