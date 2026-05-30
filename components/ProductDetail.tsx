
import React, { useState } from "react";
import { Star, Check, Share2, ShoppingBag, X, ArrowLeft, Copy, Facebook, Twitter, Linkedin, Link as LinkIcon, Edit } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { ProductForm } from "./ProductForm";

// Helper for formatting price
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
};

interface ProductDetailProps {
  product: any;
  onBack: () => void;
  isLoggedIn: boolean;
  onAuthRedirect: () => void;
  isOwner?: boolean;
}

export default function ProductDetail({ product, onBack, isLoggedIn, onAuthRedirect, isOwner = false }: ProductDetailProps) {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Update logic to handle product data changes (mock)
  const [currentProduct, setCurrentProduct] = useState(product);

  if (!product) return null;

  const productUrl = `https://cosmic.app/product/${currentProduct.id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(productUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBuy = () => {
    if (!isLoggedIn) {
        onAuthRedirect();
    } else {
        // Proceed to checkout logic (mock)
        alert("Proceeding to checkout for " + currentProduct.title);
    }
  };

  const handleEdit = () => {
      setIsEditOpen(true);
  };

  const handleProductUpdate = (updatedData: any) => {
      // Merge updates
      const updatedProduct = { ...currentProduct, ...updatedData };
      setCurrentProduct(updatedProduct);
      alert("Product updated successfully!");
      setIsEditOpen(false);
  };

  return (
    <div className="h-screen w-full bg-black pt-[70px] md:pt-[80px] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-500">
      
      <div className="flex-1 w-full max-w-[1100px] mx-auto p-4 md:p-6 flex flex-col h-full">
        
        {/* Top Bar */}
        <div className="flex-shrink-0 mb-3 md:mb-4 flex items-center justify-between">
             <button 
                onClick={onBack}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
            >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-medium">Back</span>
            </button>
        </div>

        {/* Main Layout - Fits remaining height */}
        <div className="flex-1 flex flex-col lg:flex-row gap-5 lg:gap-10 min-h-0 pb-2">
          
          {/* Left Side: Image */}
          <div className="w-full lg:w-[45%] h-[40vh] lg:h-full flex-shrink-0 relative rounded-[16px] lg:rounded-[20px] overflow-hidden border border-[#27272a] bg-[#0c0c0c]">
              <img 
                src={currentProduct.image} 
                alt={currentProduct.title} 
                className="w-full h-full object-cover"
              />
              
              {/* Overlays */}
              {/* Rating Badge (Top Left) */}
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-white/10 z-10">
                <Star className="text-yellow-400 fill-yellow-400 w-3 h-3" />
                <span className="text-white font-bold text-[10px] md:text-xs">{currentProduct.rating}.0</span>
              </div>

              {/* Category Badge (Top Right) */}
              <div className="absolute top-3 right-3 px-2.5 py-1 flex items-center justify-center rounded-[8px] bg-[#8700a2]/90 backdrop-blur-md z-10">
                <span className="text-white text-center text-[10px] md:text-xs font-bold leading-none tracking-wide">
                  {currentProduct.category}
                </span>
              </div>
          </div>

          {/* Right Side: Details - Scrollable internally if needed */}
          <div className="flex flex-col flex-1 lg:h-full min-h-0">
            
            {/* Scrollable Content Container */}
            <div className="flex-1 overflow-y-auto pr-1 lg:pr-2 scrollbar-none">
                <div className="flex flex-col gap-4">
                    
                    {/* Creator Profile - More Compact */}
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#18181b] border border-[#27272a]">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#8700a2] to-[#d032e5] p-[1.5px]">
                                <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                                    <img src={currentProduct.image} className="w-full h-full object-cover opacity-80" alt="avatar"/>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-1.5">
                                    <span className="text-white font-bold text-sm md:text-base">{currentProduct.creator}</span>
                                    {currentProduct.verified && (
                                    <div className="bg-[#d032e5] rounded-full p-[2px]">
                                        <Check size={8} className="text-white" strokeWidth={4} />
                                    </div>
                                    )}
                                </div>
                                <span className="text-gray-400 text-xs md:text-sm">{currentProduct.username}</span>
                            </div>
                        </div>
                    </div>

                    {/* Product Title - Smaller Font */}
                    <h1 className="text-[20px] md:text-[24px] font-bold text-white leading-tight">
                        {currentProduct.title}
                    </h1>

                    {/* Description - Optimized for readability */}
                    <p className="text-gray-400 text-[13px] md:text-[14px] leading-relaxed">
                        {currentProduct.description || "Ada yang request pakai kostum ini jadi pakai deh :p, dalam Mini Photopack ini ada 8 Photo High Quality. Kalau mau request boleh langsung personally DM aku aja ya! Support kalian sangat berarti buat aku."}
                    </p>
                </div>
            </div>

            {/* Fixed Bottom Section (Divider + Price + Buttons) - More Compact */}
            <div className="flex-shrink-0 pt-3 lg:pt-5 mt-auto bg-black z-10">
                <div className="h-px w-full bg-[#27272a] mb-3 lg:mb-5" />
                
                <div className="flex flex-col gap-3 lg:gap-4">
                    <div className="flex flex-col">
                        <span className="text-gray-500 text-[10px] md:text-xs uppercase tracking-wider font-semibold">Total Price</span>
                        <span className="text-[20px] md:text-[24px] font-bold text-[#d032e5]">{formatPrice(currentProduct.price)}</span>
                    </div>

                    <div className="flex gap-3 h-[40px] md:h-[44px]">
                        <button 
                            onClick={() => setIsShareOpen(true)}
                            className="w-[90px] md:w-[110px] h-full rounded-lg md:rounded-xl border border-[#3f3f46] flex items-center justify-center gap-2 text-white font-bold text-[12px] md:text-[14px] hover:bg-white/5 transition-colors cursor-pointer"
                        >
                            <Share2 size={16} />
                            Share
                        </button>
                        
                        {isOwner ? (
                            <button 
                                onClick={handleEdit}
                                className="flex-1 h-full rounded-lg md:rounded-xl bg-[#27272a] border border-[#3f3f46] flex items-center justify-center gap-2 text-white font-bold text-[12px] md:text-[14px] hover:bg-[#3f3f46] transition-colors cursor-pointer"
                            >
                                <Edit size={16} />
                                Edit Product
                            </button>
                        ) : (
                            <button 
                                onClick={handleBuy}
                                className="flex-1 h-full rounded-lg md:rounded-xl bg-gradient-to-r from-[#8700a2] to-[#d032e5] flex items-center justify-center gap-2 text-white font-bold text-[12px] md:text-[14px] hover:opacity-90 transition-opacity shadow-[0_0_15px_rgba(135,0,162,0.3)] cursor-pointer"
                            >
                                <ShoppingBag size={16} />
                                Buy Now
                            </button>
                        )}
                    </div>
                </div>
            </div>

          </div>
        </div>
      </div>

      {/* Share Dialog */}
      <Dialog open={isShareOpen} onOpenChange={setIsShareOpen}>
        <DialogContent className="sm:max-w-md bg-[#121212] border border-[#27272a] text-white p-6 rounded-xl w-[90%]">
            <DialogHeader>
            <DialogTitle className="text-lg font-bold">Share this product</DialogTitle>
            <DialogDescription className="text-gray-400 text-sm">
                Share this amazing find with your friends.
            </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-4 gap-4 py-4">
                <button className="flex flex-col items-center gap-2 group">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#1877f2]/10 flex items-center justify-center group-hover:bg-[#1877f2] transition-colors">
                        <Facebook className="text-[#1877f2] group-hover:text-white transition-colors" size={20} />
                    </div>
                    <span className="text-[10px] text-gray-400 group-hover:text-white">Facebook</span>
                </button>
                <button className="flex flex-col items-center gap-2 group">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#1da1f2]/10 flex items-center justify-center group-hover:bg-[#1da1f2] transition-colors">
                        <Twitter className="text-[#1da1f2] group-hover:text-white transition-colors" size={20} />
                    </div>
                    <span className="text-[10px] text-gray-400 group-hover:text-white">Twitter</span>
                </button>
                <button className="flex flex-col items-center gap-2 group">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#0a66c2]/10 flex items-center justify-center group-hover:bg-[#0a66c2] transition-colors">
                        <Linkedin className="text-[#0a66c2] group-hover:text-white transition-colors" size={20} />
                    </div>
                    <span className="text-[10px] text-gray-400 group-hover:text-white">LinkedIn</span>
                </button>
                <button className="flex flex-col items-center gap-2 group" onClick={handleCopyLink}>
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#d032e5]/10 flex items-center justify-center group-hover:bg-[#d032e5] transition-colors">
                        <LinkIcon className="text-[#d032e5] group-hover:text-white transition-colors" size={20} />
                    </div>
                    <span className="text-[10px] text-gray-400 group-hover:text-white">Copy Link</span>
                </button>
            </div>

            <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="sr-only">
                Link
                </Label>
                <Input
                id="link"
                defaultValue={productUrl}
                readOnly
                className="bg-[#18181b] border-[#27272a] text-gray-300 text-xs h-9 focus-visible:ring-[#d032e5] focus-visible:ring-offset-0"
                />
            </div>
            <Button type="submit" size="sm" className="px-3 bg-[#27272a] hover:bg-[#3f3f46] h-9" onClick={handleCopyLink}>
                <span className="sr-only">Copy</span>
                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
            </div>
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-[100vw] h-auto sm:max-w-[800px] p-0 bg-transparent border-none shadow-none">
            {/* Hidden Title for Accessibility */}
            <DialogHeader className="sr-only">
                <DialogTitle>Edit Product</DialogTitle>
            </DialogHeader>
            <ProductForm 
                onClose={() => setIsEditOpen(false)} 
                title="Edit Product" 
                initialData={currentProduct}
                onSubmit={handleProductUpdate}
            />
        </DialogContent>
      </Dialog>
    </div>
  );
}
