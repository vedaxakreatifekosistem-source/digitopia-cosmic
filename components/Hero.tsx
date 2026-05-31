import React from "react";
import { MousePointer2, ChevronDown } from "lucide-react";

// Valid image links provided in the file
const imgRectangle2 = "../src/assets/images/hero-1.jpg";
const imgRectangle3 = "../src/assets/images/hero-2.jpg";
const imgRectangle4 = "../src/assets/images/hero-3.jpg";
const imgRectangle5 = "../src/assets/images/hero-4.jpg";
const imgRectangle6 = "../src/assets/images/hero-5.jpg";
const imgCosmic072 = "../src/assets/images/cosmic-logo.png";

export default function Hero({ onNavigate }: { onNavigate?: (view: string) => void }) {
  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 flex items-center justify-center gap-2 md:gap-4 opacity-30 mask-image-b-transparent">
        <div className="hidden xl:block flex-1 h-full rounded-[40px] overflow-hidden">
          <img
            src={imgRectangle2}
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
        <div className="hidden md:block flex-1 h-full rounded-[40px] overflow-hidden">
          <img
            src={imgRectangle3}
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
        <div className="w-full md:flex-[2.5] h-full rounded-[20px] md:rounded-[40px] overflow-hidden">
          <img
            src={imgRectangle4}
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
        <div className="hidden md:block flex-1 h-full rounded-[40px] overflow-hidden">
          <img
            src={imgRectangle5}
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
        <div className="hidden xl:block flex-1 h-full rounded-[40px] overflow-hidden">
          <img
            src={imgRectangle6}
            className="w-full h-full object-cover"
            alt=""
          />
        </div>

        {/* Gradient Overlay for fade effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black pointer-events-none"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-[800px] px-4 pt-20">
        {/* Cosmic Logo Image */}
        <div className="w-full max-w-[400px] md:max-w-none md:w-[875px] mb-6">
          <img
            src={imgCosmic072}
            alt="COSMIC"
            className="w-full h-auto drop-shadow-2xl"
          />
        </div>

        <p className="text-white text-[16px] md:text-[26px] font-medium tracking-wide mb-8 px-4">
          Creative Online Space for Market, Interaction, & Connection
        </p>

        <button 
          onClick={() => onNavigate?.('signup')}
          className="group relative px-8 py-2 rounded-full border-2 border-zinc-400 hover:border-white transition-all text-white font-bold text-lg overflow-hidden cursor-pointer"
        >
          <span className="relative z-10">Sign Up</span>
          <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform"></div>
        </button>

        {/* Animation Element Placeholder */}
        <div className="flex flex-col items-center mt-8 animate-bounce">
             <ChevronDown className="w-6 h-6 text-white" />
             <ChevronDown className="w-6 h-6 text-white -mt-4" />
        </div>
      </div>
    </div>
  );
}