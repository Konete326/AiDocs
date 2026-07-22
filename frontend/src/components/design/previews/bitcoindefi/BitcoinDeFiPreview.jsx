import React from "react";
import { BitcoinDeFiHeader } from "./BitcoinDeFiHeader";
import { BitcoinDeFiHero } from "./BitcoinDeFiHero";
import { BitcoinDeFiStats } from "./BitcoinDeFiStats";
import { BitcoinDeFiFeatures } from "./BitcoinDeFiFeatures";
import { BitcoinDeFiPricing } from "./BitcoinDeFiPricing";
import { BitcoinDeFiComponentsShowcase } from "./BitcoinDeFiComponentsShowcase";
import { BitcoinDeFiFooter } from "./BitcoinDeFiFooter";

export const BitcoinDeFiPreview = ({ mode = "landing" }) => {
  return (
    <div className="w-full bg-[#08080C] text-[#F4F4F6] font-['Space_Grotesk'] select-none border border-[#F7931A]/30 rounded-2xl overflow-hidden">
      <BitcoinDeFiHeader />
      {mode === "showcase" ? (
        <BitcoinDeFiComponentsShowcase />
      ) : (
        <>
          <BitcoinDeFiHero />
          <BitcoinDeFiStats />
          <BitcoinDeFiFeatures />
          <BitcoinDeFiPricing />
          <BitcoinDeFiComponentsShowcase />
        </>
      )}
      <BitcoinDeFiFooter />
    </div>
  );
};
