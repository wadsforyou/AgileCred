import React from "react";

const LOGO_URL = "https://media.base44.com/images/public/6a9436b42d7d71eab546e805/41ad23a4a_AgileCred_Logo.svg";

const sizes = {
  sm: "h-7",
  md: "h-[56px] md:h-[60px]",
  lg: "h-11 md:h-12",
  xl: "h-14 md:h-16"
};

export default function Logo({ variant = "dark", size = "md", showText = true, showEmblem = true, className = "" }) {
  const h = sizes[size] || sizes.md;
  // On light backgrounds (footer) render the logo white so it stays visible.
  const filter = variant === "light" ? "brightness(0) invert(1)" : "none";

  return (
    <img
      src={LOGO_URL}
      alt="AgileCred"
      className={`shrink-0 ${h} w-auto ${className}`}
      style={{ filter }} />);


}