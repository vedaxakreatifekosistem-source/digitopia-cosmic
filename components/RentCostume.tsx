import React from "react";

// Using the background image URL from the reference code
const bgImage = "https://lh3.googleusercontent.com/d/1t30Xzoc7XkH3Ijg8NikzKofhNrspOt5i";
const overlayImage = "https://lh3.googleusercontent.com/d/1yY5MPQY4U1s_abvLrjicH9NXWByRueb9";

export default function RentCostume() {
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
            “A new chapter in cosplay is about to unfold. Brace yourself for greatness.”
          </p>
        </div>
      </div>
    </div>
  );
}