
import React from "react";
import { Instagram, Twitter, Facebook, MessageCircle, Send, Phone } from "lucide-react";

// Valid image link from Hero/Navbar or placeholder
const imgCosmic072 = "../src/assets/images/cosmic-logo.png";

export default function Footer({ onNavigate }: { onNavigate?: (view: string) => void }) {
  return (
    <div className="w-full py-12 relative border-t border-white/10 bg-black">
      <div className="flex flex-col items-center justify-center gap-6">
        {/* Logo */}
        <div className="w-[300px] h-[60px] relative overflow-hidden flex justify-center items-center">
          <img
            src={imgCosmic072}
            alt="COSMIC"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-5">
          <Instagram className="w-5 h-5 text-white cursor-pointer hover:text-purple-500 transition-colors" />
          <Twitter className="w-5 h-5 text-white cursor-pointer hover:text-purple-500 transition-colors" />
          {/* TikTok substitute */}
          <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-purple-500 transition-colors" title="TikTok">
             <span className="text-black font-bold text-[10px]">T</span>
          </div>
          <MessageCircle className="w-5 h-5 text-white cursor-pointer hover:text-purple-500 transition-colors" />
          <Facebook className="w-5 h-5 text-white cursor-pointer hover:text-purple-500 transition-colors" />
          <Send className="w-5 h-5 text-white cursor-pointer hover:text-purple-500 transition-colors" />
          <Phone className="w-5 h-5 text-white cursor-pointer hover:text-purple-500 transition-colors" />
        </div>

        {/* Copyright & Links */}
        <div className="text-center">
          <p className="text-gray-400 text-[16px] leading-relaxed">
            © 2025 COSMIC by{" "}
            <span className="text-[#8700a2] font-bold">
              Digimates
            </span>
            . All rights reserved.
          </p>
          <div className="text-white text-[16px] font-semibold mt-1 flex items-center justify-center">
            <button 
              onClick={() => onNavigate?.('terms-of-use')}
              className="hover:text-gray-300 bg-transparent border-none cursor-pointer"
            >
              Terms of Service
            </button>
            <span className="mx-2 text-gray-500">|</span>
            <button 
              onClick={() => onNavigate?.('privacy-policy')}
              className="hover:text-gray-300 bg-transparent border-none cursor-pointer"
            >
              Privacy Policy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
