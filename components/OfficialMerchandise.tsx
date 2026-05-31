import React from "react";

// Using the background image URL from the reference code
import bgImage from "../src/assets/images/banner-2.jpg";
import overlayImage from "../src/assets/images/Oshiverse.png";

export default function OfficialMerchandise() {
  return (
    <div className="h-screen w-full relative bg-black overflow-hidden pt-[80px] flex flex-col">
      {/* Base Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat fixed opacity-40"
        style={{
          backgroundImage: `url('${bgImage}')`,
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Secondary Overlay Image (20% Opacity) - Fits screen */}
      <div 
        className="absolute inset-0 bg-contain bg-center bg-no-repeat fixed opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url('${overlayImage}')`,
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center w-full">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-black mb-6 uppercase tracking-[0.35em]">
            Coming Soon
          </h1>
          <p className="text-white/80 text-lg md:text-xl italic">
            “Unlock the door to a world where the handcrafted creations you love are ready to be yours.”
          </p>
        </div>
      </div>
    </div>
  );
}
