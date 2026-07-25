import React from "react";
import { FlatHeader } from "./FlatHeader";
import { FlatHero } from "./FlatHero";
import { FlatStats } from "./FlatStats";
import { FlatFeatures } from "./FlatFeatures";
import { FlatPricing } from "./FlatPricing";
import { FlatComponentsShowcase } from "./FlatComponentsShowcase";
import { FlatFooter } from "./FlatFooter";

export const FlatPreview = ({ mode = "landing" }) => {
  return (
    <div className="w-full bg-white text-gray-900 font-['Outfit'] select-none border border-gray-200 rounded-lg overflow-hidden shadow-none">
      <FlatHeader />
      {mode === "showcase" ? (
        <FlatComponentsShowcase />
      ) : (
        <>
          <FlatHero />
          <FlatStats />
          <FlatFeatures />
          <FlatPricing />
          <FlatComponentsShowcase />
        </>
      )}
      <FlatFooter />
    </div>
  );
};
