import React from "react";
import { MonochromeHeader } from "./MonochromeHeader";
import { MonochromeHero } from "./MonochromeHero";
import { MonochromeStats } from "./MonochromeStats";
import { MonochromeFeatures } from "./MonochromeFeatures";
import { MonochromePricing } from "./MonochromePricing";
import { MonochromeComponentsShowcase } from "./MonochromeComponentsShowcase";
import { MonochromeFooter } from "./MonochromeFooter";

export const MonochromePreview = ({ mode = "landing" }) => {
  return (
    <div className="w-full bg-white text-black font-serif overflow-hidden select-none border-2 border-black">
      <MonochromeHeader />
      {mode === "showcase" ? (
        <MonochromeComponentsShowcase />
      ) : (
        <>
          <MonochromeHero />
          <MonochromeStats />
          <MonochromeFeatures />
          <MonochromePricing />
          <MonochromeComponentsShowcase />
        </>
      )}
      <MonochromeFooter />
    </div>
  );
};
