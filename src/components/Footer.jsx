import React from "react";
import bikeImage from "../assets/bikewale.svg";
import cartrade_tech from "../assets/cartrade_tech.svg";
import cartrade from "../assets/cartrade.svg";
import carwale from "../assets/carwale.svg";
import mobility from "../assets/mobility.svg";
import olx from "../assets/olx.svg";

const Footer = () => {
  return (
    <div className="bg-[#1f2937] text-white py-10 px-4 min-h-60 ">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 justify-items-center ">
        <img className="h-20" src={cartrade_tech} alt="Cartrade Tech" />
        <img className="h-20" src={olx} alt="Olx" />
        <img className="h-20" src={carwale} alt="Carwale" />
        <img className="h-20" src={bikeImage} alt="Bikewale" />
        <img className="h-20" src={cartrade} alt="Cartrade" />
        <img className="h-20" src={mobility} alt="Mobility" />
      </div>
      <div className="flex justify-between mt-10">
        <p className="text-sm">Help - Sitemap</p>
        <p className="text-sm">All rights reserved © 2006-2024 OLX</p>
      </div>
    </div>
  );
};

export default Footer;
