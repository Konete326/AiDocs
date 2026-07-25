import React from "react";
import { ArtDecoHeader } from "./ArtDecoHeader";
import { ArtDecoHero } from "./ArtDecoHero";
import { ArtDecoStats } from "./ArtDecoStats";
import { ArtDecoFeatures } from "./ArtDecoFeatures";
import { ArtDecoPricing } from "./ArtDecoPricing";
import { ArtDecoComponentsShowcase } from "./ArtDecoComponentsShowcase";
import { ArtDecoFooter } from "./ArtDecoFooter";

export const ArtDecoPreview = ({ mode = "landing" }) => {
  return (
    <div className="w-full bg-[#0A0A0A] text-[#F2F0E4] font-['Marcellus'] select-none border-2 border-[#D4AF37]">
      <ArtDecoHeader />
      {mode === "showcase" ? (
        <ArtDecoComponentsShowcase />
      ) : (
        <>
          <ArtDecoHero />
          <ArtDecoStats />
          <ArtDecoFeatures />
          <ArtDecoPricing />
          <ArtDecoComponentsShowcase />
        </>
      )}
      <ArtDecoFooter />
    </div>
  );
};
