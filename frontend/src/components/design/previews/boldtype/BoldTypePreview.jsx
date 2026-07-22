import React from "react";
import { BoldTypeHeader } from "./BoldTypeHeader";
import { BoldTypeHero } from "./BoldTypeHero";
import { BoldTypeStats } from "./BoldTypeStats";
import { BoldTypeFeatures } from "./BoldTypeFeatures";
import { BoldTypePricing } from "./BoldTypePricing";
import { BoldTypeComponentsShowcase } from "./BoldTypeComponentsShowcase";
import { BoldTypeFooter } from "./BoldTypeFooter";

export const BoldTypePreview = ({ mode = "landing" }) => {
  return (
    <div className="w-full bg-[#0A0A0A] text-[#FAFAFA] font-['Inter_Tight',sans-serif] select-none border border-[#262626]">
      <BoldTypeHeader />
      {mode === "showcase" ? (
        <BoldTypeComponentsShowcase />
      ) : (
        <>
          <BoldTypeHero />
          <BoldTypeStats />
          <BoldTypeFeatures />
          <BoldTypePricing />
          <BoldTypeComponentsShowcase />
        </>
      )}
      <BoldTypeFooter />
    </div>
  );
};
