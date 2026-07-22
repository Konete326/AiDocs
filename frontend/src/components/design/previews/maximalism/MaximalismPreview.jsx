import React from "react";
import { MaximalismHeader } from "./MaximalismHeader";
import { MaximalismHero } from "./MaximalismHero";
import { MaximalismStats } from "./MaximalismStats";
import { MaximalismFeatures } from "./MaximalismFeatures";
import { MaximalismPricing } from "./MaximalismPricing";
import { MaximalismComponentsShowcase } from "./MaximalismComponentsShowcase";
import { MaximalismFooter } from "./MaximalismFooter";

export const MaximalismPreview = ({ mode = "landing" }) => {
  return (
    <div className="w-full bg-[#0D0D1A] text-white font-['Outfit',sans-serif] select-none border-4 border-[#FF3AF2] rounded-3xl overflow-hidden relative" style={{ backgroundImage: "radial-gradient(circle, #FF3AF2 1px, transparent 1px)", backgroundSize: "24px 24px" }}>
      <MaximalismHeader />
      {mode === "showcase" ? (
        <MaximalismComponentsShowcase />
      ) : (
        <>
          <MaximalismHero />
          <MaximalismStats />
          <MaximalismFeatures />
          <MaximalismPricing />
          <MaximalismComponentsShowcase />
        </>
      )}
      <MaximalismFooter />
    </div>
  );
};
