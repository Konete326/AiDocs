import React from "react";
import { SerifHeader } from "./SerifHeader";
import { SerifHero } from "./SerifHero";
import { SerifStats } from "./SerifStats";
import { SerifFeatures } from "./SerifFeatures";
import { SerifPricing } from "./SerifPricing";
import { SerifComponentsShowcase } from "./SerifComponentsShowcase";
import { SerifFooter } from "./SerifFooter";

export const SerifPreview = ({ mode = "landing" }) => {
  return (
    <div className="w-full bg-[#FAFAF8] text-[#1A1A1A] font-['Playfair_Display',serif] select-none border border-[#E8E4DF]">
      <SerifHeader />
      {mode === "showcase" ? (
        <SerifComponentsShowcase />
      ) : (
        <>
          <SerifHero />
          <SerifStats />
          <SerifFeatures />
          <SerifPricing />
          <SerifComponentsShowcase />
        </>
      )}
      <SerifFooter />
    </div>
  );
};
