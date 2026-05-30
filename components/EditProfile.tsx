
import React, { useState } from "react";
import { Camera, Instagram, Twitter, Youtube, Gamepad2, Send, Music } from "lucide-react";

// Placeholder images used for preview
const defaultBanner = "https://lh3.googleusercontent.com/d/1ggsIbS4I3NDFRAx28BDYU4GKgeZg8-4i";
const defaultAvatar = "https://lh3.googleusercontent.com/d/1GlcgkoSnH7h5V41SCFVwHA81WnM4ZoTn";

export default function EditProfile({ onNavigate }: { onNavigate?: (view: string) => void }) {
  const [formData, setFormData] = useState({
    fullName: "John Doe",
    username: "johndoe",
    email: "john.doe@example.com",
    phone: "081234567890",
    bio: "Just a huge fan of cosplay and digital art! Always here to support the community. 🎨✨",
    socials: {
      instagram: "",
      x: "",
      discord: "",
      telegram: "",
      tiktok: "",
      youtube: ""
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      socials: { ...prev.socials, [name]: value }
    }));
  };

  const handleSave = () => {
    // In a real app, save logic here including file uploads
    console.log("Saved Data:", formData);
    onNavigate?.('fans-profile');
  };

  return (
    <div className="bg-black min-h-screen w-full pt-[80px] flex justify-center items-start pb-20 px-4 overflow-y-auto">
      <div className="w-full max-w-[700px] bg-[#121212] border border-[#27272a] rounded-[24px] overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-500 mb-10">
        
        {/* Header */}
        <div className="flex items-center gap-4 p-6 border-b border-[#27272a] bg-[#121212] sticky top-0 z-20">
            <h1 className="text-2xl font-bold text-white">Edit Profile</h1>
        </div>

        <div className="flex flex-col">
            
            {/* 1. Upload Banner & 2. Upload Foto Profile */}
            <div className="relative mb-16 group">
                {/* Banner Area */}
                <div className="h-[200px] w-full bg-[#18181b] relative overflow-hidden">
                    <img src={defaultBanner} alt="Banner Preview" className="w-full h-full object-cover opacity-60" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-all cursor-pointer">
                        <div className="flex flex-col items-center gap-2 text-white/80 hover:text-white">
                            <div className="bg-black/50 p-3 rounded-full backdrop-blur-sm border border-white/20">
                                <Camera size={24} />
                            </div>
                            <span className="text-sm font-bold shadow-black drop-shadow-md">Change Banner</span>
                        </div>
                    </div>
                </div>

                {/* Avatar Area */}
                <div className="absolute -bottom-12 left-6 md:left-10">
                    <div className="w-[100px] h-[100px] rounded-full border-4 border-[#121212] bg-[#18181b] relative overflow-hidden group/avatar cursor-pointer">
                        <img src={defaultAvatar} alt="Avatar Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover/avatar:opacity-100 transition-opacity">
                            <Camera size={20} className="text-white" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6 md:p-10 flex flex-col gap-8">
                
                {/* Personal Information */}
                <div className="flex flex-col gap-5">
                    <h3 className="text-lg font-bold text-white border-b border-[#27272a] pb-2">Personal Information</h3>
                    
                    {/* Row 1: Full Name & Username */}
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* 3. Full Name */}
                        <div className="flex flex-col gap-2 flex-1">
                            <label className="text-sm font-medium text-gray-300">Full Name</label>
                            <input 
                                type="text" 
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                className="w-full bg-[#18181b] border border-[#27272a] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#d032e5] transition-colors"
                                placeholder="Enter your full name"
                            />
                        </div>

                        {/* 4. Username */}
                        <div className="flex flex-col gap-2 flex-1">
                            <label className="text-sm font-medium text-gray-300">Username</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">@</span>
                                <input 
                                    type="text" 
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    className="w-full bg-[#18181b] border border-[#27272a] rounded-xl pl-8 pr-4 py-3 text-white focus:outline-none focus:border-[#d032e5] transition-colors"
                                    placeholder="username"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Row 2: Email & Phone */}
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* 5. Email */}
                        <div className="flex flex-col gap-2 flex-1">
                            <label className="text-sm font-medium text-gray-300">Email Address</label>
                            <input 
                                type="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full bg-[#18181b] border border-[#27272a] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#d032e5] transition-colors"
                                placeholder="name@example.com"
                            />
                        </div>

                        {/* 6. Phone Number */}
                        <div className="flex flex-col gap-2 flex-1">
                            <label className="text-sm font-medium text-gray-300">Phone Number</label>
                            <input 
                                type="tel" 
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="w-full bg-[#18181b] border border-[#27272a] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#d032e5] transition-colors"
                                placeholder="08123456789"
                            />
                        </div>
                    </div>

                    {/* 7. Bio */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-300">Bio</label>
                        <textarea 
                            name="bio"
                            value={formData.bio}
                            onChange={handleInputChange}
                            rows={4}
                            className="w-full bg-[#18181b] border border-[#27272a] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#d032e5] transition-colors resize-none"
                            placeholder="Tell us about yourself..."
                        />
                    </div>
                </div>

                {/* 8. Social Media Links */}
                <div className="flex flex-col gap-5">
                    <h3 className="text-lg font-bold text-white border-b border-[#27272a] pb-2">Social Media Links</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Instagram */}
                        <div className="flex items-center gap-3 bg-[#18181b] border border-[#27272a] rounded-xl px-3 focus-within:border-[#d032e5] transition-colors">
                            <Instagram size={18} className="text-[#E1306C] shrink-0" />
                            <input 
                                type="text"
                                name="instagram"
                                value={formData.socials.instagram}
                                onChange={handleSocialChange}
                                className="w-full bg-transparent border-none outline-none py-3 text-sm text-white placeholder-gray-500"
                                placeholder="Instagram Username"
                            />
                        </div>

                        {/* X (Twitter) */}
                        <div className="flex items-center gap-3 bg-[#18181b] border border-[#27272a] rounded-xl px-3 focus-within:border-[#d032e5] transition-colors">
                            <Twitter size={18} className="text-white shrink-0" />
                            <input 
                                type="text"
                                name="x"
                                value={formData.socials.x}
                                onChange={handleSocialChange}
                                className="w-full bg-transparent border-none outline-none py-3 text-sm text-white placeholder-gray-500"
                                placeholder="X (Twitter) Username"
                            />
                        </div>

                        {/* Discord */}
                        <div className="flex items-center gap-3 bg-[#18181b] border border-[#27272a] rounded-xl px-3 focus-within:border-[#d032e5] transition-colors">
                            <Gamepad2 size={18} className="text-[#5865F2] shrink-0" />
                            <input 
                                type="text"
                                name="discord"
                                value={formData.socials.discord}
                                onChange={handleSocialChange}
                                className="w-full bg-transparent border-none outline-none py-3 text-sm text-white placeholder-gray-500"
                                placeholder="Discord Username"
                            />
                        </div>

                        {/* Telegram */}
                        <div className="flex items-center gap-3 bg-[#18181b] border border-[#27272a] rounded-xl px-3 focus-within:border-[#d032e5] transition-colors">
                            <Send size={18} className="text-[#0088cc] shrink-0" />
                            <input 
                                type="text"
                                name="telegram"
                                value={formData.socials.telegram}
                                onChange={handleSocialChange}
                                className="w-full bg-transparent border-none outline-none py-3 text-sm text-white placeholder-gray-500"
                                placeholder="Telegram Username"
                            />
                        </div>

                        {/* TikTok */}
                        <div className="flex items-center gap-3 bg-[#18181b] border border-[#27272a] rounded-xl px-3 focus-within:border-[#d032e5] transition-colors">
                            <Music size={18} className="text-[#ff0050] shrink-0" />
                            <input 
                                type="text"
                                name="tiktok"
                                value={formData.socials.tiktok}
                                onChange={handleSocialChange}
                                className="w-full bg-transparent border-none outline-none py-3 text-sm text-white placeholder-gray-500"
                                placeholder="TikTok Username"
                            />
                        </div>

                        {/* YouTube */}
                        <div className="flex items-center gap-3 bg-[#18181b] border border-[#27272a] rounded-xl px-3 focus-within:border-[#d032e5] transition-colors">
                            <Youtube size={18} className="text-[#FF0000] shrink-0" />
                            <input 
                                type="text"
                                name="youtube"
                                value={formData.socials.youtube}
                                onChange={handleSocialChange}
                                className="w-full bg-transparent border-none outline-none py-3 text-sm text-white placeholder-gray-500"
                                placeholder="YouTube Channel URL"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 mt-4 pt-4 border-t border-[#27272a]">
                    <button 
                        onClick={() => onNavigate?.('fans-profile')}
                        className="flex-1 py-3 bg-[#27272a] hover:bg-[#3f3f46] text-white font-bold rounded-full transition-colors cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleSave}
                        className="flex-1 py-3 bg-[#d032e5] hover:bg-[#a61cc9] text-white font-bold rounded-full transition-colors shadow-[0_0_15px_rgba(208,50,229,0.3)] cursor-pointer"
                    >
                        Save Changes
                    </button>
                </div>

            </div>
        </div>
      </div>
    </div>
  );
}
