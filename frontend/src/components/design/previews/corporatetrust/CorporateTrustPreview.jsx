import React from "react";
import { CorporateTrustHeader } from "./CorporateTrustHeader";
import { CorporateTrustHero } from "./CorporateTrustHero";
import { CorporateTrustStats } from "./CorporateTrustStats";
import { CorporateTrustFeatures } from "./CorporateTrustFeatures";
import { CorporateTrustPricing } from "./CorporateTrustPricing";
import { CorporateTrustComponentsShowcase } from "./CorporateTrustComponentsShowcase";
import { CorporateTrustFooter } from "./CorporateTrustFooter";

export const CorporateTrustPreview = ({ mode = "landing" }) => {
  return (
    <div className="w-full bg-slate-50 text-slate-900 font-['Plus_Jakarta_Sans',sans-serif] select-none border border-slate-200">
      <CorporateTrustHeader />
      {mode === "showcase" ? (
        <CorporateTrustComponentsShowcase />
      ) : (
        <>
          <CorporateTrustHero />
          <CorporateTrustStats />
          <CorporateTrustFeatures />
          <CorporateTrustPricing />
          <CorporateTrustComponentsShowcase />
        </>
      )}
      <CorporateTrustFooter />
    </div>
  );
};
