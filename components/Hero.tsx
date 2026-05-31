import React from "react";
import { MousePointer2, ChevronDown } from "lucide-react";

// Valid image links provided in the file
import imgRectangle2 from "../src/assets/images/hero-1.jpg";
import imgRectangle3 from "../src/assets/images/hero-2.jpg";
import imgRectangle4 from "../src/assets/images/hero-3.jpg";
import imgRectangle5 from "../src/assets/images/hero-4.jpg";
import imgRectangle6 from "../src/assets/images/hero-5.jpg";
import imgCosmic072 from "../src/assets/images/cosmic-logo.png";
import svgPaths from "../src/assets/images/cosmic.png";

function MouseIcon() {
  return (
    <div className="relative shrink-0 w-[36px] h-[36px] animate-bounce mt-8">
      <svg
        className="block w-full h-full"
        fill="none"
        viewBox="0 0 36 36"
      >
        <path
          d="M7.5 13.5C7.5 7.70101 12.201 3 18 3C23.799 3 28.5 7.70101 28.5 13.5V22.5C28.5 28.299 23.799 33 18 33C12.201 33 7.5 28.299 7.5 22.5V13.5Z"
          stroke="white"
          strokeWidth="1.5"
        />
        <path
          d="M15.75 12.75C15.75 11.5074 16.7574 10.5 18 10.5C19.2426 10.5 20.25 11.5074 20.25 12.75V15.75C20.25 16.9926 19.2426 18 18 18C16.7574 18 15.75 16.9926 15.75 15.75V12.75Z"
          stroke="white"
          strokeWidth="1.5"
        />
        <path
          d="M18 3V10.5"
          stroke="white"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}

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

        <MouseIcon />
      </div>
    </div>
  );
}
