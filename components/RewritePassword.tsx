import React, { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";

export default function RewritePassword({ onNavigate }: { onNavigate?: (view: string) => void }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      // Handle password reset logic here
      console.log("Password reset submitted");
      onNavigate?.('success-change-password');
    }
  };

  return (
    <div className="min-h-screen w-full bg-black pt-[80px] flex items-center justify-center px-4">
       <div className="w-full max-w-[500px] animate-in fade-in zoom-in-95 duration-500">
          <div className="bg-[#121212] border border-white/10 rounded-[24px] p-8 shadow-2xl backdrop-blur-md flex flex-col gap-6">
            
            <div className="flex flex-col gap-2 text-center">
              <h1 className="text-white text-[32px] font-bold">Let’s Get You Back In</h1>
              <p className="text-gray-400 text-base">
                Create a new password to continue your journey with us.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
               {/* New Password Input */}
               <div className="flex flex-col gap-2">
                  <label className="text-white text-md font-medium ml-1">Please enter new password</label>
                  <div className="relative group">
                    <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${errors.password ? 'text-red-500' : 'text-gray-400 group-focus-within:text-[#d032e5]'}`}>
                      <Lock size={18} />
                    </div>
                    <input 
                      type={showPassword ? "text" : "password"}
                      className={`w-full bg-[#1e1e1e] border ${errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-white/10 focus:border-[#8700a2] focus:ring-[#8700a2]'} rounded-xl py-3 pl-11 pr-12 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-1 transition-all`}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if(errors.password) setErrors({...errors, password: ""});
                      }}
                    />
                     <button 
                      type="button"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors cursor-pointer bg-transparent border-none"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && <span className="text-red-500 text-[12px] ml-1">{errors.password}</span>}
               </div>

               {/* Confirm Password Input */}
                <div className="flex flex-col gap-2">
                  <label className="text-white text-md font-medium ml-1">Confirm new password</label>
                  <div className="relative group">
                    <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${errors.confirmPassword ? 'text-red-500' : 'text-gray-400 group-focus-within:text-[#d032e5]'}`}>
                      <Lock size={18} />
                    </div>
                    <input 
                      type={showConfirmPassword ? "text" : "password"}
                      className={`w-full bg-[#1e1e1e] border ${errors.confirmPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-white/10 focus:border-[#8700a2] focus:ring-[#8700a2]'} rounded-xl py-3 pl-11 pr-12 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-1 transition-all`}
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        if(errors.confirmPassword) setErrors({...errors, confirmPassword: ""});
                      }}
                    />
                    <button 
                      type="button"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors cursor-pointer bg-transparent border-none"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.confirmPassword && <span className="text-red-500 text-[12px] ml-1">{errors.confirmPassword}</span>}
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