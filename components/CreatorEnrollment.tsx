
import React from "react";

export default function CreatorEnrollment({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="min-h-screen w-full bg-black pt-[80px] flex items-center justify-center px-4">
      <div className="w-full max-w-[1000px] flex flex-col items-center text-center gap-8 animate-in fade-in zoom-in-95 duration-500">
        <div className="flex flex-col gap-4 items-center">
          <span className="text-white text-[32px] md:text-[40px] font-bold leading-tight">
            You’ve unlocked your next chapter: Creator Mode activated!
          </span>
          <span className="text-gray-400 text-base md:text-lg leading-relaxed max-w-[600px]">
            Welcome to the stage! Start building your community and showcase what makes you unique.
          </span>
        </div>
        
        <button 
          onClick={onNavigate}
          className="h-[50px] px-12 bg-gradient-to-r from-[#8700a2] to-[#d032e5] hover:opacity-90 transition-all rounded-full text-white font-bold text-lg shadow-[0_0_20px_rgba(135,0,162,0.3)] cursor-pointer"
        >
           Go to Creator Dashboard
        </button>
      </div>
    </div>
  );
}
