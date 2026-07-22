import React from "react";
import { ClaymorphismHeader } from "./ClaymorphismHeader";
import { ClaymorphismHero } from "./ClaymorphismHero";
import { ClaymorphismStats } from "./ClaymorphismStats";
import { ClaymorphismFeatures } from "./ClaymorphismFeatures";
import { ClaymorphismPricing } from "./ClaymorphismPricing";
import { ClaymorphismComponentsShowcase } from "./ClaymorphismComponentsShowcase";
import { ClaymorphismFooter } from "./ClaymorphismFooter";

export const ClaymorphismPreview = ({ mode = "landing" }) => {
  return (
    <div className="w-full bg-[#F4F1FA] text-[#332F3A] font-['Nunito',sans-serif] select-none border border-[#332F3A]/10 rounded-[48px] overflow-hidden shadow-[20px_20px_40px_rgba(160,150,180,0.25)]">
      <ClaymorphismHeader />
      {mode === "showcase" ? (
        <ClaymorphismComponentsShowcase />
      ) : (
        <>
          <ClaymorphismHero />
          <ClaymorphismStats />
          <ClaymorphismFeatures />
          <ClaymorphismPricing />
          <ClaymorphismComponentsShowcase />
        </>
      )}
      <ClaymorphismFooter />
    </div>
  );
};
