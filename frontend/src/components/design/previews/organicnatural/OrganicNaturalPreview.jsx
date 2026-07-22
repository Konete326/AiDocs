import React from "react";
import { OrganicNaturalHeader } from "./OrganicNaturalHeader";
import { OrganicNaturalHero } from "./OrganicNaturalHero";
import { OrganicNaturalStats } from "./OrganicNaturalStats";
import { OrganicNaturalFeatures } from "./OrganicNaturalFeatures";
import { OrganicNaturalPricing } from "./OrganicNaturalPricing";
import { OrganicNaturalComponentsShowcase } from "./OrganicNaturalComponentsShowcase";
import { OrganicNaturalFooter } from "./OrganicNaturalFooter";

export const OrganicNaturalPreview = ({ mode = "landing" }) => {
  return (
    <div className="w-full bg-[#FDFCF8] text-[#2C2C24] font-['Fraunces',serif] select-none border border-[#DED8CF]/50 rounded-[2.5rem] overflow-hidden relative">
      <div
        className="pointer-events-none absolute inset-0 z-50 opacity-[0.03] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />
      <OrganicNaturalHeader />
      {mode === "showcase" ? (
        <OrganicNaturalComponentsShowcase />
      ) : (
        <>
          <OrganicNaturalHero />
          <OrganicNaturalStats />
          <OrganicNaturalFeatures />
          <OrganicNaturalPricing />
          <OrganicNaturalComponentsShowcase />
        </>
      )}
      <OrganicNaturalFooter />
    </div>
  );
};
