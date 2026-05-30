import React, { useState } from "react";
import { Mail } from "lucide-react";

export default function ResetPassword({ onNavigate }: { onNavigate?: (view: string) => void }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    // Handle reset logic here
    console.log("Reset password for:", email);
    onNavigate?.('password-confirmation');
  };

  return (
    <div className="min-h-screen w-full bg-black pt-[80px] flex items-center justify-center px-4">
       <div className="w-full max-w-[500px] animate-in fade-in zoom-in-95 duration-500">
          <div className="bg-[#121212] border border-white/10 rounded-[24px] p-8 shadow-2xl backdrop-blur-md flex flex-col gap-6">
            
            <div className="flex flex-col gap-2 text-center">
              <h1 className="text-white text-[32px] font-bold">Reset your Password</h1>
              <p className="text-gray-400 text-base">
                Enter your email to receive a link to create a new password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
               <div className="flex flex-col gap-2">
                  <label className="text-white text-md font-medium ml-1">Email Address</label>
                  <div className="relative group">
                    <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${error ? 'text-red-500' : 'text-gray-400 group-focus-within:text-[#d032e5]'}`}>
                      <Mail size={18} />
                    </div>
                    <input 
                      type="email" 
                      placeholder="name@example.com"
                      className={`w-full bg-[#1e1e1e] border ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-white/10 focus:border-[#8700a2] focus:ring-[#8700a2]'} rounded-xl py-3 pl-11 pr-4 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-1 transition-all`}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if(error) setError("");
                      }}
                    />
                  </div>
                  {error && <span className="text-red-500 text-[12px] ml-1">{error}</span>}
               </div>

               <button 
                  type="submit"
                  className="self-center px-12 bg-gradient-to-r from-[#8700a2] to-[#d032e5] hover:opacity-90 active:scale-[0.98] text-white font-bold py-3.5 rounded-full transition-all shadow-[0_0_20px_rgba(135,0,162,0.3)] cursor-pointer"
                >
                  Reset Password
                </button>
            </form>

          </div>
       </div>
    </div>
  );
}