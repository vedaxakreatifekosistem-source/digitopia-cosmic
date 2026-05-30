import React from "react";

export default function SuccessChangePassword({ onNavigate }: { onNavigate?: (view: string) => void }) {
  return (
    <div className="min-h-screen w-full bg-black pt-[80px] flex items-center justify-center px-4">
      <div className="w-full max-w-[1000px] flex flex-col items-center text-center gap-8 animate-in fade-in zoom-in-95 duration-500">
        <div className="flex flex-col gap-4 items-center">
          <span className="text-white text-[36px] font-bold leading-tight">
            Your password has been successfully reset!
          </span>
          <span className="text-gray-400 text-base md:text-lg leading-relaxed max-w-[600px]">
            You can now log in using your new password.
          </span>
        </div>
      </div>
    </div>
  );
}