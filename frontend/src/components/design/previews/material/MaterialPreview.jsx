import React from "react";
import { MaterialHeader } from "./MaterialHeader";
import { MaterialHero } from "./MaterialHero";
import { MaterialStats } from "./MaterialStats";
import { MaterialFeatures } from "./MaterialFeatures";
import { MaterialPricing } from "./MaterialPricing";
import { MaterialComponentsShowcase } from "./MaterialComponentsShowcase";
import { MaterialFooter } from "./MaterialFooter";

export const MaterialPreview = ({ mode = "landing" }) => {
  return (
    <div className="w-full bg-[#FFFBFE] text-[#1C1B1F] font-['Roboto'] select-none border border-[#E7E0EC] rounded-[32px] overflow-hidden">
      <MaterialHeader />
      {mode === "showcase" ? (
        <MaterialComponentsShowcase />
      ) : (
        <>
          <MaterialHero />
          <MaterialStats />
          <MaterialFeatures />
          <MaterialPricing />
          <MaterialComponentsShowcase />
        </>
      )}
      <MaterialFooter />
    </div>
  );
};
