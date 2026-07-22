import React from "react";
import { PlayfulGeoHeader } from "./PlayfulGeoHeader";
import { PlayfulGeoHero } from "./PlayfulGeoHero";
import { PlayfulGeoStats } from "./PlayfulGeoStats";
import { PlayfulGeoFeatures } from "./PlayfulGeoFeatures";
import { PlayfulGeoPricing } from "./PlayfulGeoPricing";
import { PlayfulGeoComponentsShowcase } from "./PlayfulGeoComponentsShowcase";
import { PlayfulGeoFooter } from "./PlayfulGeoFooter";

export const PlayfulGeoPreview = ({ mode = "landing" }) => {
  return (
    <div className="w-full bg-[#FFFDF5] text-[#1E293B] font-['Outfit',sans-serif] select-none border-2 border-[#1E293B]">
      <PlayfulGeoHeader />
      {mode === "showcase" ? (
        <PlayfulGeoComponentsShowcase />
      ) : (
        <>
          <PlayfulGeoHero />
          <PlayfulGeoStats />
          <PlayfulGeoFeatures />
          <PlayfulGeoPricing />
          <PlayfulGeoComponentsShowcase />
        </>
      )}
      <PlayfulGeoFooter />
    </div>
  );
};
