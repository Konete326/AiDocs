import React from "react";
import { BotanicalHeader } from "./BotanicalHeader";
import { BotanicalHero } from "./BotanicalHero";
import { BotanicalStats } from "./BotanicalStats";
import { BotanicalFeatures } from "./BotanicalFeatures";
import { BotanicalPricing } from "./BotanicalPricing";
import { BotanicalComponentsShowcase } from "./BotanicalComponentsShowcase";
import { BotanicalFooter } from "./BotanicalFooter";

export const BotanicalPreview = ({ mode = "landing" }) => {
  return (
    <div className="w-full bg-[#F9F8F4] text-[#2D3A31] font-['Playfair_Display',serif] select-none border border-[#E6E2DA] rounded-3xl overflow-hidden relative">
      <div
        className="pointer-events-none absolute inset-0 z-50 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />
      <BotanicalHeader />
      {mode === "showcase" ? (
        <BotanicalComponentsShowcase />
      ) : (
        <>
          <BotanicalHero />
          <BotanicalStats />
          <BotanicalFeatures />
          <BotanicalPricing />
          <BotanicalComponentsShowcase />
        </>
      )}
      <BotanicalFooter />
    </div>
  );
};
