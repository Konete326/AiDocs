import React from "react";
import { IndustrialSkeuoHeader } from "./IndustrialSkeuoHeader";
import { IndustrialSkeuoHero } from "./IndustrialSkeuoHero";
import { IndustrialSkeuoStats } from "./IndustrialSkeuoStats";
import { IndustrialSkeuoFeatures } from "./IndustrialSkeuoFeatures";
import { IndustrialSkeuoPricing } from "./IndustrialSkeuoPricing";
import { IndustrialSkeuoComponentsShowcase } from "./IndustrialSkeuoComponentsShowcase";
import { IndustrialSkeuoFooter } from "./IndustrialSkeuoFooter";

export const IndustrialSkeuoPreview = ({ mode = "landing" }) => {
  return (
    <div className="w-full bg-[#e0e5ec] text-[#2d3436] font-['Inter',sans-serif] select-none border border-[#a3b1c6] rounded-2xl overflow-hidden shadow-[12px_12px_24px_#babecc,-12px_-12px_24px_#ffffff]">
      <IndustrialSkeuoHeader />
      {mode === "showcase" ? (
        <IndustrialSkeuoComponentsShowcase />
      ) : (
        <>
          <IndustrialSkeuoHero />
          <IndustrialSkeuoStats />
          <IndustrialSkeuoFeatures />
          <IndustrialSkeuoPricing />
          <IndustrialSkeuoComponentsShowcase />
        </>
      )}
      <IndustrialSkeuoFooter />
    </div>
  );
};
