import React from "react";
import { NeoBrutalismHeader } from "./NeoBrutalismHeader";
import { NeoBrutalismHero } from "./NeoBrutalismHero";
import { NeoBrutalismStats } from "./NeoBrutalismStats";
import { NeoBrutalismFeatures } from "./NeoBrutalismFeatures";
import { NeoBrutalismPricing } from "./NeoBrutalismPricing";
import { NeoBrutalismComponentsShowcase } from "./NeoBrutalismComponentsShowcase";
import { NeoBrutalismFooter } from "./NeoBrutalismFooter";

export const NeoBrutalismPreview = ({ mode = "landing" }) => {
  return (
    <div className="w-full bg-[#FFFDF5] text-black font-['Space_Grotesk'] select-none border-4 border-black">
      <NeoBrutalismHeader />
      {mode === "showcase" ? (
        <NeoBrutalismComponentsShowcase />
      ) : (
        <>
          <NeoBrutalismHero />
          <NeoBrutalismStats />
          <NeoBrutalismFeatures />
          <NeoBrutalismPricing />
          <NeoBrutalismComponentsShowcase />
        </>
      )}
      <NeoBrutalismFooter />
    </div>
  );
};
