import React from "react";
import { BauhausHeader } from "./BauhausHeader";
import { BauhausHero } from "./BauhausHero";
import { BauhausStats } from "./BauhausStats";
import { BauhausFeatures } from "./BauhausFeatures";
import { BauhausPricing } from "./BauhausPricing";
import { BauhausComponentsShowcase } from "./BauhausComponentsShowcase";
import { BauhausFooter } from "./BauhausFooter";

export const BauhausPreview = ({ mode = "landing" }) => {
  return (
    <div className="w-full bg-[#F0F0F0] text-[#121212] font-['Outfit'] select-none border-4 border-[#121212]">
      <BauhausHeader />
      {mode === "showcase" ? (
        <BauhausComponentsShowcase />
      ) : (
        <>
          <BauhausHero />
          <BauhausStats />
          <BauhausFeatures />
          <BauhausPricing />
          <BauhausComponentsShowcase />
        </>
      )}
      <BauhausFooter />
    </div>
  );
};
