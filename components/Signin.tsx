
import React, { useState } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

// Assets reused from other components for consistency
const bgImage = "../src/assets/images/login-3.png"; 

export default function Login({ onNavigate, onLogin }: { onNavigate?: (view: string) => void, onLogin?: () => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      setLoading(true);
      // Mock login delay
      setTimeout(() => {
        setLoading(false);
        if (onLogin) {
          onLogin();
        } else {
          onNavigate?.('landing');
        }
      }, 1000);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.email;
        return newErrors;
      });
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.password;
        return newErrors;
      });
    }
  };

  return (
    <div className="h-screen w-full bg-black relative flex flex-col overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 pointer-events-none"
        style={{ backgroundImage: `url('${bgImage}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/40 to-black/80"></div>
      </div>

      {/* Main Content Container */}
      {/* pt-[80px] allows space for the navbar. flex-1 + justify-center centers vertically in the remaining space. */}
      {/* lg:px-24 ensures the form isn't too close to the right edge. items-end pushes it to the right on desktop. */}
      <div className="flex-1 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 flex flex-col justify-center items-center lg:items-end pt-[80px]">
        
        {/* Login Card */}
        <div className="relative z-10 w-full max-w-[320px] sm:max-w-[360px] md:max-w-[400px] animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="bg-[#121212]/80 border border-white/10 rounded-[24px] p-6 md:p-8 shadow-2xl backdrop-blur-xl">
            
            {/* Header */}
            <div className="flex flex-col items-center text-center mb-6 md:mb-8">
              <h1 className="text-white text-[24px] md:text-[32px] font-bold mb-2 tracking-tight">Welcome Back</h1>
              <p className="text-gray-400 text-[12px] md:text-[14px] leading-relaxed">
                Enter your credentials to access your creative space
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-5">
              {errors.auth && <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-xs text-center">{errors.auth}</div>}
              
              {/* Email Field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-300 text-[12px] md:text-[13px] font-medium ml-1">Email Address</label>
                <div className="relative group">
                  <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${errors.email ? 'text-red-500' : 'text-gray-500 group-focus-within:text-[#d032e5]'}`}>
                    <Mail size={18} />
                  </div>
                  <input 
                    type="text" 
                    placeholder="name@example.com"
                    className={`w-full bg-[#0a0a0a]/50 border ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-[#8700a2]'} rounded-xl h-[44px] md:h-[48px] pl-11 pr-4 text-white text-[13px] md:text-[14px] placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-transparent transition-all`}
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
                {errors.email && <span className="text-red-500 text-[11px] ml-1">{errors.email}</span>}
              </div>

              {/* Password Field */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-gray-300 text-[12px] md:text-[13px] font-medium">Password</label>
                  <button 
                    type="button" 
                    onClick={() => onNavigate?.('reset-password')}
                    className="text-[#d032e5] text-[11px] md:text-[12px] font-medium hover:text-[#e055f5] hover:underline transition-colors cursor-pointer bg-transparent border-none"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative group">
                  <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${errors.password ? 'text-red-500' : 'text-gray-500 group-focus-within:text-[#d032e5]'}`}>
                    <Lock size={18} />
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Enter your password"
                    className={`w-full bg-[#0a0a0a]/50 border ${errors.password ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-[#8700a2]'} rounded-xl h-[44px] md:h-[48px] pl-11 pr-11 text-white text-[13px] md:text-[14px] placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-transparent transition-all`}
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  <button 
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors cursor-pointer bg-transparent border-none"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <span className="text-red-500 text-[11px] ml-1">{errors.password}</span>}
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                disabled={loading}
                className="w-full h-[44px] md:h-[48px] bg-gradient-to-r from-[#8700a2] to-[#d032e5] hover:opacity-90 active:scale-[0.98] text-white font-bold text-[14px] md:text-[15px] rounded-xl transition-all shadow-[0_4px_20px_rgba(135,0,162,0.25)] mt-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            {/* Footer */}
            <div className="text-center mt-6 md:mt-8">
              <p className="text-gray-500 text-[12px] md:text-[13px]">
                Don't have an account?{" "}
                <button 
                  onClick={() => onNavigate?.('signup')}
                  className="text-[#d032e5] font-bold hover:text-[#e055f5] hover:underline transition-colors bg-transparent border-none cursor-pointer"
                >
                  Sign Up
                </button>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
