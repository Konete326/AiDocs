import React from "react";
import { TerminalHeader } from "./TerminalHeader";
import { TerminalHero } from "./TerminalHero";
import { TerminalStats } from "./TerminalStats";
import { TerminalFeatures } from "./TerminalFeatures";
import { TerminalPricing } from "./TerminalPricing";
import { TerminalComponentsShowcase } from "./TerminalComponentsShowcase";
import { TerminalFooter } from "./TerminalFooter";

export const TerminalPreview = ({ mode = "landing" }) => {
  return (
    <div className="w-full bg-[#0a0a0a] text-[#33ff00] font-['JetBrains_Mono',monospace] select-none border-2 border-[#1f521f]">
      <TerminalHeader />
      {mode === "showcase" ? (
        <TerminalComponentsShowcase />
      ) : (
        <>
          <TerminalHero />
          <TerminalStats />
          <TerminalFeatures />
          <TerminalPricing />
          <TerminalComponentsShowcase />
        </>
      )}
      <TerminalFooter />
    </div>
  );
};
