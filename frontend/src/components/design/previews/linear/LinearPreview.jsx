import React from "react";
import { LinearHeader } from "./LinearHeader";
import { LinearHero } from "./LinearHero";
import { LinearStats } from "./LinearStats";
import { LinearFeatures } from "./LinearFeatures";
import { LinearPricing } from "./LinearPricing";
import { LinearComponentsShowcase } from "./LinearComponentsShowcase";
import { LinearFooter } from "./LinearFooter";

export const LinearPreview = ({ mode = "landing" }) => {
  return (
    <div className="w-full bg-[#050506] text-[#EDEDEF] font-['Inter'] select-none border border-white/[0.06] rounded-xl overflow-hidden">
      <LinearHeader />
      {mode === "showcase" ? (
        <LinearComponentsShowcase />
      ) : (
        <>
          <LinearHero />
          <LinearStats />
          <LinearFeatures />
          <LinearPricing />
          <LinearComponentsShowcase />
        </>
      )}
      <LinearFooter />
    </div>
  );
};
