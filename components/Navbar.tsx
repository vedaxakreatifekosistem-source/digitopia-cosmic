
import React, { useState } from "react";
import { Menu, X, LogOut, KeyRound, ChevronDown, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu.tsx";

import imgRectangle1 from "../src/assets/images/cosmic.png";
import imgAvatar from "../src/assets/images/dummy.jpg"; // Reused user avatar

export default function Navbar({
  onNavigate,
  isLoggedIn = false,
  onLogout,
  isCreator = false
}: {
  onNavigate?: (view: string) => void;
  isLoggedIn?: boolean;
  onLogout?: () => void;
  isCreator?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigate = (view: string) => {
    onNavigate?.(view);
    setIsOpen(false);
  };

  const handleLogout = () => {
    onLogout?.();
    setIsOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-[1440px] h-[60px] md:h-[80px] flex items-center justify-between px-6 md:justify-center md:gap-6 lg:gap-[60px] xl:gap-[80px]">
        {/* Mobile Spacer (for centering logo) */}
        <div className="md:hidden w-[22px]"></div>

        {/* Left Links - Desktop */}
        <div className="hidden md:flex gap-4 lg:gap-8 xl:gap-[80px] items-center">
          <button
            onClick={() => handleNavigate("live-streaming")}
            className="text-white text-[12px] lg:text-[16px] font-medium tracking-[0.16px] text-center hover:text-[#d032e5] transition-colors leading-[1.4] bg-transparent border-none cursor-pointer whitespace-nowrap"
          >
            Live Streaming
          </button>
          <button
            onClick={() => handleNavigate("discover-creator")}
            className="text-white text-[12px] lg:text-[16px] font-medium tracking-[0.16px] text-center hover:text-[#9419BD] transition-colors leading-[1.4] bg-transparent border-none cursor-pointer whitespace-nowrap"
          >
            Discover Creator
          </button>
          <button
            onClick={() => handleNavigate("explore-product")}
            className="text-white text-[12px] lg:text-[16px] font-medium tracking-[0.16px] text-center hover:text-[#9419BD] transition-colors leading-[1.4] bg-transparent border-none cursor-pointer whitespace-nowrap"
          >
            Explore Product
          </button>
        </div>

        {/* Logo - Centered in list */}
        <div
          className="w-[32px] h-[32px] md:w-[50px] md:h-[50px] relative shrink-0 cursor-pointer"
          onClick={() => handleNavigate("landing")}
        >
          <img
            src={imgRectangle1}
            alt="Cosmic Logo"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Links - Desktop */}
        <div className="hidden md:flex gap-4 lg:gap-8 xl:gap-[80px] items-center">
          <button
            onClick={() => handleNavigate("rent-costume")}
            className="text-white text-[12px] lg:text-[16px] font-medium tracking-[0.16px] text-center hover:text-[#9419BD] transition-colors leading-[1.4] bg-transparent border-none cursor-pointer whitespace-nowrap"
          >
            Rent Costume
          </button>
          <button
            onClick={() => handleNavigate("official-merchandise")}
            className="text-white text-[12px] lg:text-[16px] font-medium tracking-[0.16px] text-center hover:text-[#9419BD] transition-colors leading-[1.4] bg-transparent border-none cursor-pointer whitespace-nowrap"
          >
            Official Merchandise
          </button>

          {/* Login State */}
          {isLoggedIn ? (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="flex items-center gap-3 cursor-pointer group outline-none">
                        {/* Avatar */}
                        <div className={`w-[40px] h-[40px] rounded-full p-[2px] group-hover:scale-105 transition-transform ${isCreator ? 'bg-gradient-to-tr from-[#d032e5] to-orange-500' : 'bg-gradient-to-tr from-[#8700a2] to-[#d032e5]'}`}>
                            <div className="w-full h-full rounded-full bg-black overflow-hidden">
                                <img src={imgAvatar} className="w-full h-full object-cover" alt="User Profile" />
                            </div>
                        </div>
                        
                        {/* Name & Username - Hidden on mobile */}
                        <div className="hidden md:flex flex-col items-start">
                            <span className="text-white text-[12px] lg:text-[14px] font-bold leading-tight group-hover:text-[#d032e5] transition-colors">John Doe</span>
                            <span className="text-gray-400 text-[10px] lg:text-[12px]">@johndoe</span>
                        </div>
                        <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-[#18181b] border-[#27272a] text-white">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-[#27272a]" />
                    
                    <DropdownMenuItem className="focus:bg-[#27272a] focus:text-white cursor-pointer" onClick={() => handleNavigate(isCreator ? "creator-profile" : "fans-profile")}>
                        <User className="mr-2 h-4 w-4" />
                        <span>My Profile</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem className="focus:bg-[#27272a] focus:text-white cursor-pointer" onClick={() => handleNavigate("rewrite-password")}>
                        <KeyRound className="mr-2 h-4 w-4" />
                        <span>Change Password</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-[#27272a]" />
                    <DropdownMenuItem className="focus:bg-[#27272a] focus:text-red-400 text-red-500 cursor-pointer" onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Sign Out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <button 
              onClick={() => handleNavigate("login")}
              className="h-[35px] bg-[#8700a2]/60 hover:bg-[#8700a2]/80 transition-colors rounded-full px-[30px] lg:px-[40px] flex items-center justify-center cursor-pointer whitespace-nowrap"
            >
              <span className="text-white text-[12px] lg:text-[16px] font-medium tracking-[0.16px] leading-[1.4]">
                Sign In
              </span>
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="absolute top-[60px] left-0 right-0 bg-black/95 backdrop-blur-xl border-t border-white/10 p-6 flex flex-col gap-6 items-center md:hidden h-[calc(100vh-60px)] overflow-y-auto animate-in slide-in-from-top-5">
          <button
            onClick={() => handleNavigate("live-streaming")}
            className="text-white text-[16px] font-medium hover:text-[#d032e5] bg-transparent border-none cursor-pointer"
          >
            Live Streaming
          </button>
          <button
            onClick={() => handleNavigate("discover-creator")}
            className="text-white text-[16px] font-medium hover:text-[#9419BD] bg-transparent border-none cursor-pointer"
          >
            Discover Creator
          </button>
          <button
            onClick={() => handleNavigate("explore-product")}
            className="text-white text-[16px] font-medium hover:text-[#9419BD] bg-transparent border-none cursor-pointer"
          >
            Explore Product
          </button>
          <button
            onClick={() => handleNavigate("rent-costume")}
            className="text-white text-[16px] font-medium hover:text-[#9419BD] bg-transparent border-none cursor-pointer"
          >
            Rent Costume
          </button>
          <button
            onClick={() => handleNavigate("official-merchandise")}
            className="text-white text-[16px] font-medium hover:text-[#9419BD] bg-transparent border-none cursor-pointer"
          >
            Official Merchandise
          </button>
          
          {isLoggedIn ? (
            <div className="w-full max-w-[240px] flex flex-col gap-3 mt-4 p-4 bg-[#18181b] rounded-2xl border border-[#27272a]">
                 <div 
                    className="flex items-center gap-3 w-full"
                 >
                    <div className={`w-[40px] h-[40px] rounded-full overflow-hidden border ${isCreator ? 'border-orange-500' : 'border-[#27272a]'}`}>
                        <img src={imgAvatar} className="w-full h-full object-cover" alt="User" />
                    </div>
                    <div className="flex flex-col items-start overflow-hidden">
                        <span className="text-white text-[14px] font-bold leading-tight truncate w-full text-left">John Doe</span>
                        <span className="text-gray-400 text-[10px] truncate w-full text-left">@johndoe</span>
                    </div>
                 </div>
                 
                 <div className="h-px bg-[#27272a] w-full my-1" />
                 
                 <button 
                    onClick={() => handleNavigate(isCreator ? "creator-profile" : "fans-profile")} 
                    className="flex items-center gap-3 text-gray-300 hover:text-white text-sm py-2 px-1 hover:bg-white/5 rounded-lg transition-colors"
                 >
                    <User size={16} />
                    My Profile
                 </button>

                 <button 
                    onClick={() => handleNavigate("rewrite-password")} 
                    className="flex items-center gap-3 text-gray-300 hover:text-white text-sm py-2 px-1 hover:bg-white/5 rounded-lg transition-colors"
                 >
                    <KeyRound size={16} />
                    Change Password
                 </button>
                 
                 <button 
                    onClick={handleLogout} 
                    className="flex items-center gap-3 text-red-500 hover:text-red-400 text-sm py-2 px-1 hover:bg-red-500/10 rounded-lg transition-colors"
                 >
                    <LogOut size={16} />
                    Sign Out
                 </button>
            </div>
          ) : (
            <button 
              onClick={() => handleNavigate("login")}
              className="h-[45px] w-full max-w-[200px] bg-[#8700a2]/60 hover:bg-[#8700a2]/80 transition-colors rounded-full flex items-center justify-center mt-2 cursor-pointer"
            >
              <span className="text-white text-[16px] font-medium">
                Sign In
              </span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
