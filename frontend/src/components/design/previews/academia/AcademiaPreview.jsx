import React from "react";
import { AcademiaHeader } from "./AcademiaHeader";
import { AcademiaHero } from "./AcademiaHero";
import { AcademiaStats } from "./AcademiaStats";
import { AcademiaFeatures } from "./AcademiaFeatures";
import { AcademiaPricing } from "./AcademiaPricing";
import { AcademiaComponentsShowcase } from "./AcademiaComponentsShowcase";
import { AcademiaFooter } from "./AcademiaFooter";

export const AcademiaPreview = ({ mode = "landing" }) => {
  return (
    <div className="w-full bg-[#1C1714] text-[#E8DFD4] font-['Cormorant_Garamond',serif] select-none border border-[#4A3F35]">
      <AcademiaHeader />
      {mode === "showcase" ? (
        <AcademiaComponentsShowcase />
      ) : (
        <>
          <AcademiaHero />
          <AcademiaStats />
          <AcademiaFeatures />
          <AcademiaPricing />
          <AcademiaComponentsShowcase />
        </>
      )}
      <AcademiaFooter />
    </div>
  );
};
