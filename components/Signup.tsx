
import React, { useState } from "react";
import { Check } from "lucide-react";

export default function Signup({ onNavigate }: { onNavigate?: (view: string) => void }) {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Enforce numeric only input for phone number
    if (name === "phone" && !/^\d*$/.test(value)) {
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone Number is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!agreed) newErrors.agreed = "You must agree to the Terms of Use";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validate()) {
      setLoading(true);
      // Mock signup delay
      setTimeout(() => {
        setLoading(false);
        onNavigate?.('account-confirmation');
      }, 1000);
    }
  };

  return (
    <div className="w-full bg-black pt-[60px] md:pt-[80px] flex justify-center items-center h-[100dvh] lg:h-screen overflow-hidden">
      <div className="relative w-full max-w-[1440px] h-full lg:h-[795px] mx-auto bg-black flex flex-col lg:block justify-center">
        
        {/* Background Group */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 scale-[0.45] sm:scale-60 lg:scale-100 opacity-20 lg:opacity-75 lg:top-[40px] lg:right-[40px] xl:right-[80px] lg:left-auto lg:translate-x-0 lg:z-0 origin-top pointer-events-none">
          
          <div className="relative w-[540px] h-[715px]">
             {/* Rectangle 0 */}
             <div className="absolute w-[165px] h-[350px] top-0 right-[187px] bg-black/10 bg-cover bg-center rounded-b-[100px] -z-10" 
                  style={{ backgroundImage: 'url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-01-01/8V0Ut5m9GP.png)' }} />
             
             {/* Rectangle 1 */}
             <div className="absolute w-[165px] h-[475px] top-0 right-[374px] bg-black/10 bg-cover bg-center rounded-[100px] z-10"
                  style={{ backgroundImage: 'url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-01-01/sYtVsOcgzp.png)' }} />
             
             {/* Rectangle 2 */}
             <div className="absolute w-[165px] h-[425px] top-[50px] right-0 bg-black/10 bg-cover bg-center rounded-[100px] z-10"
                  style={{ backgroundImage: 'url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-01-01/E5QjLCkHPR.png)' }} />
             
             {/* Rectangle 3 */}
             <div className="absolute w-[165px] h-[350px] bottom-0 right-[187px] bg-black/10 bg-cover bg-center rounded-t-[100px] z-0"
                  style={{ backgroundImage: 'url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-01-01/nRLyZxdEbU.png)' }} />
                  
             {/* Rectangle 4 */}
             <div className="absolute w-[165px] h-[200px] bottom-0 right-[374px] bg-black/10 bg-cover bg-center rounded-t-[100px] z-20"
                  style={{ backgroundImage: 'url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-01-01/hWHzGz11gQ.png)' }} />
                  
             {/* Rectangle 5 */}
             <div className="absolute w-[165px] h-[200px] bottom-0 right-0 bg-black/10 bg-cover bg-center rounded-t-[100px] z-0"
                  style={{ backgroundImage: 'url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-01-01/x9jVsSYuxM.png)' }} />
          </div>
        </div>

        {/* Content/Form Container */}
        {/* Adjusted: Removed large padding, centering via flex, reduced gaps for fit-to-screen */}
        <div className="relative w-full max-w-[500px] mx-auto px-6 z-10 flex flex-col items-center justify-center h-full gap-4 md:gap-8 lg:absolute lg:w-[540px] lg:max-w-none lg:top-1/2 lg:left-[60px] xl:left-[120px] lg:-translate-y-1/2 lg:p-0 lg:my-0 lg:mx-0 lg:gap-[40px] lg:h-auto lg:block">
          
          <div className="flex flex-col items-center gap-2 lg:gap-3 w-full text-center lg:items-start lg:text-left shrink-0">
            <span className="text-white text-center text-[26px] md:text-[38px] lg:text-[42px] font-extrabold leading-tight w-full">Welcome Aboard!</span>
            <span className="text-center text-gray-300 text-[13px] md:text-[16px] font-normal leading-relaxed w-full max-w-[300px] lg:max-w-none mx-auto lg:mx-0">
              Set up your account and connect with the community.
            </span>
          </div>

          <div className="flex flex-col gap-3 md:gap-4 lg:gap-[20px] w-full shrink-0 my-[2rem]">
            {errors.auth && <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-xs text-center">{errors.auth}</div>}
            {/* Row 1: Full Name & Username */}
            <div className="flex flex-col md:flex-row items-start gap-3 md:gap-4 lg:gap-[20px] w-full">
              <div className="flex flex-col items-start gap-1 flex-1 w-full">
                <label className="text-gray-300 text-[12px] md:text-[14px] font-medium leading-[18px] ml-1">Full Name</label>
                <div className={`flex items-center w-full h-[40px] md:h-[46px] px-4 bg-[#1e1e1e] border ${errors.fullName ? 'border-red-500' : 'border-[#3f3f46] focus-within:border-[#8700a2]'} rounded-xl transition-all`}>
                  <input 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="bg-transparent border-none outline-none text-white text-[13px] md:text-[14px] w-full placeholder-gray-500" 
                    type="text" 
                    placeholder="John Doe" 
                  />
                </div>
                {errors.fullName && <span className="text-red-500 text-[10px] md:text-[11px] ml-1">{errors.fullName}</span>}
              </div>
              <div className="flex flex-col items-start gap-1 flex-1 w-full">
                <label className="text-gray-300 text-[12px] md:text-[14px] font-medium leading-[18px] ml-1">Username</label>
                <div className={`flex items-center w-full h-[40px] md:h-[46px] px-4 bg-[#1e1e1e] border ${errors.username ? 'border-red-500' : 'border-[#3f3f46] focus-within:border-[#8700a2]'} rounded-xl transition-all`}>
                  <input 
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="bg-transparent border-none outline-none text-white text-[13px] md:text-[14px] w-full placeholder-gray-500" 
                    type="text" 
                    placeholder="johndoe123" 
                  />
                </div>
                {errors.username && <span className="text-red-500 text-[10px] md:text-[11px] ml-1">{errors.username}</span>}
              </div>
            </div>

            {/* Row 2: Email & Phone */}
            <div className="flex flex-col md:flex-row items-start gap-3 md:gap-4 lg:gap-[20px] w-full">
              <div className="flex flex-col items-start gap-1 flex-1 w-full">
                <label className="text-gray-300 text-[12px] md:text-[14px] font-medium leading-[18px] ml-1">Email</label>
                <div className={`flex items-center w-full h-[40px] md:h-[46px] px-4 bg-[#1e1e1e] border ${errors.email ? 'border-red-500' : 'border-[#3f3f46] focus-within:border-[#8700a2]'} rounded-xl transition-all`}>
                  <input 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-transparent border-none outline-none text-white text-[13px] md:text-[14px] w-full placeholder-gray-500" 
                    type="email" 
                    placeholder="john@example.com" 
                  />
                </div>
                {errors.email && <span className="text-red-500 text-[10px] md:text-[11px] ml-1">{errors.email}</span>}
              </div>
              <div className="flex flex-col items-start gap-1 flex-1 w-full">
                <label className="text-gray-300 text-[12px] md:text-[14px] font-medium leading-[18px] ml-1">Phone Number</label>
                <div className={`flex items-center w-full h-[40px] md:h-[46px] px-4 bg-[#1e1e1e] border ${errors.phone ? 'border-red-500' : 'border-[#3f3f46] focus-within:border-[#8700a2]'} rounded-xl transition-all`}>
                  <input 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="bg-transparent border-none outline-none text-white text-[13px] md:text-[14px] w-full placeholder-gray-500" 
                    type="tel" 
                    placeholder="081234567890" 
                  />
                </div>
                {errors.phone && <span className="text-red-500 text-[10px] md:text-[11px] ml-1">{errors.phone}</span>}
              </div>
            </div>

            {/* Row 3: Password & Confirm */}
            <div className="flex flex-col md:flex-row items-start gap-3 md:gap-4 lg:gap-[20px] w-full">
              <div className="flex flex-col items-start gap-1 flex-1 w-full">
                <label className="text-gray-300 text-[12px] md:text-[14px] font-medium leading-[18px] ml-1">Password</label>
                <div className={`flex items-center w-full h-[40px] md:h-[46px] px-4 bg-[#1e1e1e] border ${errors.password ? 'border-red-500' : 'border-[#3f3f46] focus-within:border-[#8700a2]'} rounded-xl transition-all`}>
                  <input 
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="bg-transparent border-none outline-none text-white text-[13px] md:text-[14px] w-full placeholder-gray-500" 
                    type="password" 
                    placeholder="••••••••" 
                  />
                </div>
                {errors.password && <span className="text-red-500 text-[10px] md:text-[11px] ml-1">{errors.password}</span>}
              </div>
              <div className="flex flex-col items-start gap-1 flex-1 w-full">
                <label className="text-gray-300 text-[12px] md:text-[14px] font-medium leading-[18px] ml-1">Confirm Password</label>
                <div className={`flex items-center w-full h-[40px] md:h-[46px] px-4 bg-[#1e1e1e] border ${errors.confirmPassword ? 'border-red-500' : 'border-[#3f3f46] focus-within:border-[#8700a2]'} rounded-xl transition-all`}>
                  <input 
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="bg-transparent border-none outline-none text-white text-[13px] md:text-[14px] w-full placeholder-gray-500" 
                    type="password" 
                    placeholder="••••••••" 
                  />
                </div>
                {errors.confirmPassword && <span className="text-red-500 text-[10px] md:text-[11px] ml-1">{errors.confirmPassword}</span>}
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full gap-2 shrink-0">
            <div className="flex items-start md:items-center justify-start gap-2.5 w-full">
              <div 
                className={`w-5 h-5 rounded border-2 ${agreed ? 'bg-[#d032e5] border-[#d032e5]' : 'border-[#3f3f46]'} cursor-pointer hover:border-[#d032e5] shrink-0 flex items-center justify-center transition-all duration-200 mt-0.5 md:mt-0`}
                onClick={() => {
                  setAgreed(!agreed);
                  if (errors.agreed) {
                    setErrors((prev) => {
                      const newErrors = { ...prev };
                      delete newErrors.agreed;
                      return newErrors;
                    });
                  }
                }}
              >
                {agreed && <Check size={14} className="text-white" strokeWidth={4} />}
              </div>
              <div className="text-[12px] md:text-[15px] text-gray-300 font-normal leading-tight select-none">
                <span>By signing up, you agree to Cosmic </span>
                <span 
                  className="font-bold cursor-pointer hover:text-[#d032e5] transition-colors"
                  onClick={() => onNavigate?.('terms-of-use')}
                >
                  Terms of Use
                </span>
                <span> and </span>
                <span 
                  className="font-bold cursor-pointer hover:text-[#d032e5] transition-colors"
                  onClick={() => onNavigate?.('privacy-policy')}
                >
                  Privacy Policy
                </span>
                <span>.</span>
              </div>
            </div>
            {errors.agreed && <span className="text-red-500 text-[10px] md:text-[11px] ml-[30px]">{errors.agreed}</span>}
          </div>

          <div className="w-full flex justify-center mt-8">
            <button 
              onClick={handleSubmit}
              disabled={loading}
              className="w-full md:w-auto px-12 bg-gradient-to-r from-[#8700a2] to-[#d032e5] hover:opacity-90 active:scale-[0.98] text-white font-bold h-[44px] md:h-[52px] rounded-full transition-all shadow-[0_4px_20px_rgba(135,0,162,0.3)] cursor-pointer flex items-center justify-center text-[14px] md:text-[16px] shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
