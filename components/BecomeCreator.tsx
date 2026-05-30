
import React, { useState, useEffect } from "react";
import { ArrowLeft, Check, Instagram, Twitter, Youtube, Gamepad2, Send, Music } from "lucide-react";

export default function BecomeCreator({ onNavigate, termsAccepted }: { onNavigate?: (view: string) => void; termsAccepted?: boolean }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    artistName: "",
    talentType: "",
    bankAccountNumber: "",
    bankAccountName: "",
    bio: "",
    socials: {
      instagram: "",
      x: "",
      discord: "",
      telegram: "",
      tiktok: "",
      youtube: ""
    }
  });
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (termsAccepted) {
      setAgreed(true);
      if (errors.agreed) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.agreed;
          return newErrors;
        });
      }
    }
  }, [termsAccepted]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
        setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[name];
            return newErrors;
        });
    }
  };

  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      socials: { ...prev.socials, [name]: value }
    }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.artistName.trim()) newErrors.artistName = "Artist Name is required";
    if (!formData.talentType) newErrors.talentType = "Please select a talent type";
    if (!formData.bankAccountNumber.trim()) newErrors.bankAccountNumber = "Bank Account Number is required";
    if (!formData.bankAccountName.trim()) newErrors.bankAccountName = "Bank Account Name is required";
    if (!formData.bio.trim()) newErrors.bio = "Bio is required";
    if (!agreed) newErrors.agreed = "You must agree to the Terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validate()) {
        setLoading(true);
        // Mock submission delay
        setTimeout(() => {
            setLoading(false);
            onNavigate?.('creator-enrollment'); 
        }, 1500);
    }
  };

  return (
    <div className="bg-black min-h-screen w-full pt-[80px] flex justify-center items-start pb-20 px-4 overflow-y-auto">
      <div className="w-full max-w-[800px] bg-[#121212] border border-[#27272a] rounded-[24px] p-6 md:p-10 shadow-2xl animate-in fade-in zoom-in-95 duration-500 mb-10">
        
        <div className="flex items-center gap-4 mb-2">
            <button 
                onClick={() => onNavigate?.('fans-profile')}
                className="p-2 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
            >
                <ArrowLeft size={24} />
            </button>
            <h1 className="text-3xl font-bold text-white">Join as a Creator</h1>
        </div>
        <p className="text-gray-400 mb-8 ml-14">Unlock your potential, start earning, and build your community on Cosmic.</p>

        <div className="flex flex-col gap-6">
            {errors.auth && <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center">{errors.auth}</div>}
            
            {/* Row 1: Full Name & Username */}
            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-300">Full Name (as in ID)</label>
                    <input 
                        type="text" 
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className={`w-full bg-[#18181b] border ${errors.fullName ? 'border-red-500' : 'border-[#27272a]'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#d032e5] transition-colors`}
                        placeholder="John Doe"
                    />
                    {errors.fullName && <span className="text-red-500 text-xs">{errors.fullName}</span>}
                </div>
                <div className="flex-1 flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-300">Username</label>
                    <input 
                        type="text" 
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        className={`w-full bg-[#18181b] border ${errors.username ? 'border-red-500' : 'border-[#27272a]'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#d032e5] transition-colors`}
                        placeholder="username"
                    />
                    {errors.username && <span className="text-red-500 text-xs">{errors.username}</span>}
                </div>
            </div>

            {/* Row 2: Artist Name & Talent Type */}
            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-300">Artist Name</label>
                    <input 
                        type="text" 
                        name="artistName"
                        value={formData.artistName}
                        onChange={handleInputChange}
                        className={`w-full bg-[#18181b] border ${errors.artistName ? 'border-red-500' : 'border-[#27272a]'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#d032e5] transition-colors`}
                        placeholder="Your Stage Name"
                    />
                    {errors.artistName && <span className="text-red-500 text-xs">{errors.artistName}</span>}
                </div>
                <div className="flex-1 flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-300">Talent Type</label>
                    <div className="relative">
                        <select 
                            name="talentType"
                            value={formData.talentType}
                            onChange={handleInputChange}
                            className={`w-full bg-[#18181b] border ${errors.talentType ? 'border-red-500' : 'border-[#27272a]'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#d032e5] transition-colors appearance-none`}
                        >
                            <option value="" disabled>Select your main talent</option>
                            <option value="cosplayer">Cosplayer</option>
                            <option value="vtuber">VTuber</option>
                            <option value="illustrator">Illustrator / Artist</option>
                            <option value="streamer">Streamer</option>
                            <option value="voice_actor">Voice Actor</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                            <ArrowLeft size={16} className="-rotate-90" />
                        </div>
                    </div>
                    {errors.talentType && <span className="text-red-500 text-xs">{errors.talentType}</span>}
                </div>
            </div>

            {/* Row 3: Bank Info */}
            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-300">Bank Account Number</label>
                    <input 
                        type="text" 
                        name="bankAccountNumber"
                        value={formData.bankAccountNumber}
                        onChange={handleInputChange}
                        className={`w-full bg-[#18181b] border ${errors.bankAccountNumber ? 'border-red-500' : 'border-[#27272a]'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#d032e5] transition-colors`}
                        placeholder="Account Number"
                    />
                    {errors.bankAccountNumber && <span className="text-red-500 text-xs">{errors.bankAccountNumber}</span>}
                </div>
                <div className="flex-1 flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-300">Bank Account Name</label>
                    <input 
                        type="text" 
                        name="bankAccountName"
                        value={formData.bankAccountName}
                        onChange={handleInputChange}
                        className={`w-full bg-[#18181b] border ${errors.bankAccountName ? 'border-red-500' : 'border-[#27272a]'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#d032e5] transition-colors`}
                        placeholder="Account Holder Name"
                    />
                    {errors.bankAccountName && <span className="text-red-500 text-xs">{errors.bankAccountName}</span>}
                </div>
            </div>

            {/* Bio */}
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-300">Bio</label>
                <textarea 
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full bg-[#18181b] border ${errors.bio ? 'border-red-500' : 'border-[#27272a]'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#d032e5] transition-colors resize-none`}
                    placeholder="Tell us about yourself and your content..."
                />
                {errors.bio && <span className="text-red-500 text-xs">{errors.bio}</span>}
            </div>

            {/* Social Media Links */}
            <div className="flex flex-col gap-4 mt-2">
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

            {/* Agreement */}
            <div className="flex items-start gap-3 mt-4">
                <div 
                    className={`w-5 h-5 rounded border-2 ${agreed ? 'bg-[#d032e5] border-[#d032e5]' : 'border-[#3f3f46]'} cursor-pointer hover:border-[#d032e5] shrink-0 flex items-center justify-center transition-all duration-200 mt-0.5`}
                    onClick={() => {
                        setAgreed(!agreed);
                        if(errors.agreed) {
                            setErrors(prev => { const n = {...prev}; delete n.agreed; return n; });
                        }
                    }}
                >
                    {agreed && <Check size={14} className="text-white" strokeWidth={4} />}
                </div>
                <div className="text-sm text-gray-400">
                    I confirm that the information provided is accurate and I agree to the <span onClick={() => onNavigate?.('creator-terms')} className="text-[#d032e5] font-bold cursor-pointer hover:underline">Creator Terms & Conditions</span>.
                </div>
            </div>
            {errors.agreed && <span className="text-red-500 text-xs ml-8">{errors.agreed}</span>}

            <button 
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-[#8700a2] to-[#d032e5] hover:opacity-90 active:scale-[0.98] text-white font-bold rounded-full transition-all shadow-[0_4px_20px_rgba(135,0,162,0.3)] mt-4 text-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? "Submitting Application..." : "Submit Application"}
            </button>

        </div>
      </div>
    </div>
  );
}
