
import React, { useState } from "react";
import { ChevronDown, Calendar, Upload as UploadIcon, X } from "lucide-react";

interface ProductFormProps {
  onClose: () => void;
  title?: string;
  initialData?: any;
  onSubmit?: (data: any) => void;
}

export const ProductForm = ({ onClose, title = "Create Product", initialData, onSubmit }: ProductFormProps) => {
    // Initialize state with initialData or defaults
    const [formData, setFormData] = useState({
        image: initialData?.image || null,
        category: initialData?.category || "Digital Product",
        title: initialData?.title || "",
        tag: initialData?.tag || "", // Assuming tag exists in data or default empty
        price: initialData?.price || 100000,
        discountPrice: initialData?.discountPrice || 0,
        isDiscountActive: !!initialData?.discountPrice,
        startDate: initialData?.startDate || "",
        endDate: initialData?.endDate || "",
        isActive: initialData?.isActive ?? true, // Default to true if undefined
        description: initialData?.description || "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleToggleDiscount = () => {
        setFormData(prev => ({ ...prev, isDiscountActive: !prev.isDiscountActive }));
    };

    const handleToggleActive = () => {
        setFormData(prev => ({ ...prev, isActive: !prev.isActive }));
    };

    const handleSubmit = () => {
        if (onSubmit) {
            onSubmit(formData);
        }
        onClose();
    };

    return (
        <div className="flex flex-col w-full max-w-[700px] mx-auto items-start gap-5 p-5 relative bg-[#0c0c0c] rounded-[25px] overflow-hidden border border-[#27272a] max-h-[85vh] overflow-y-auto scrollbar-thin scrollbar-thumb-[#27272a]">
            {/* Title Header */}
            <div className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
                <div className="relative w-fit font-medium text-white text-lg tracking-wide leading-normal whitespace-nowrap mx-auto">
                    {title}
                </div>
                {/* Close button for better UX inside the form header */}
                <button onClick={onClose} className="absolute right-0 text-gray-400 hover:text-white transition-colors">
                    <X size={20} />
                </button>
            </div>

            <div className="w-full h-px bg-[#27272a]" />

            {/* Policy Section */}
            <div className="flex flex-col items-start gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
                <div className="relative w-fit mt-[-1.00px] font-medium text-white text-base tracking-wide leading-normal whitespace-nowrap">
                    Content Submission Policy
                </div>

                <p className="relative self-stretch font-normal text-white text-xs text-justify tracking-wide leading-relaxed">
                    <span className="font-bold text-gray-300">
                        Use respectful and appropriate language —{" "}
                    </span>
                    <span className="text-gray-400">
                        Avoid harsh, offensive, discriminatory, or targeted statements
                        toward individuals, groups, or organizations.
                        <br />
                    </span>

                    <span className="font-bold text-gray-300">
                        Do not use tags or terms associated with adult content —{" "}
                    </span>
                    <span className="text-gray-400">
                        This includes (but is not limited to): NSFW, 18+, 21+, Sexy, Nude,
                        OnlyFans, Spicy, Gravure, or similar terms.
                        <br />
                    </span>

                    <span className="font-bold text-gray-300">
                        Pornographic content is strictly prohibited —{" "}
                    </span>
                    <span className="text-gray-400">
                        This applies to product descriptions, thumbnails, and any uploaded media.
                        <br />
                    </span>

                    <span className="font-bold text-gray-300">
                        Avoid inappropriate outfits, poses, or visually explicit presentation.
                        <br />
                    </span>

                    <span className="font-bold text-gray-300">
                        Cover photos should be clear and informative, not suggestive —{" "}
                    </span>
                    <span className="text-gray-400">
                        Avoid blurred or censored effects that imply hidden or sensitive body areas.
                        <br />
                    </span>
                </p>
            </div>

            <div className="w-full h-px bg-[#27272a]" />

            {/* Product Info Section */}
            <div className="flex flex-col md:flex-row items-start gap-5 relative self-stretch w-full flex-[0_0_auto]">
                {/* Image Placeholder */}
                <div className="relative self-stretch w-full md:w-[150px] aspect-[1] bg-[#18181b] rounded-[17px] border border-[#27272a] flex items-center justify-center overflow-hidden shrink-0">
                     {formData.image ? (
                        <img src={formData.image} className="w-full h-full object-cover" alt="Preview" />
                     ) : (
                        <div className="w-full h-full bg-[url(../src/assets/images/hero-2.jpg)] bg-cover bg-center opacity-50" />
                     )}
                </div>

                <div className="flex flex-col items-start gap-5 relative flex-1 grow w-full">
                    {/* Product Type */}
                    <div className="gap-1 flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                        <div className="flex items-center pl-0 pr-2 pt-0 pb-2 relative self-stretch w-full flex-[0_0_auto]">
                            <div className="relative w-fit mt-[-1.00px] font-normal text-gray-400 text-xs tracking-wide leading-normal whitespace-nowrap">
                                Product Type
                            </div>
                        </div>

                        <div className="min-w-[116px] flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                            <div className="flex min-h-10 items-center px-3 py-2 relative self-stretch w-full flex-[0_0_auto] rounded-xl border border-[#27272a] bg-[#18181b]">
                                <div className="justify-center flex flex-col items-start relative flex-1 self-stretch grow">
                                    <input 
                                        type="text"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="w-full bg-transparent border-none outline-none text-white text-sm font-medium"
                                    />
                                </div>
                                <ChevronDown className="relative w-4 h-4 text-gray-400" />
                            </div>
                        </div>
                    </div>

                    {/* Product Name */}
                    <div className="self-stretch w-full flex-[0_0_auto] flex flex-col min-w-[116px] items-start relative">
                        <div className="flex items-center pl-0 pr-2 pt-0 pb-2 relative self-stretch w-full flex-[0_0_auto]">
                            <div className="relative w-fit mt-[-1.00px] font-normal text-gray-400 text-xs tracking-wide leading-normal whitespace-nowrap">
                                Product Name
                            </div>
                        </div>

                        <div className="min-h-10 items-center px-3 py-2 self-stretch w-full flex-[0_0_auto] rounded-xl border border-[#27272a] bg-[#18181b] flex relative">
                            <div className="justify-center flex flex-col items-start relative flex-1 self-stretch grow">
                                <input 
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="e.g. Photopack Shizuku Tan"
                                    className="w-full bg-transparent border-none outline-none text-white text-sm font-medium placeholder-gray-600"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Product Tag */}
                    <div className="gap-1 flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                        <div className="flex items-center pl-0 pr-2 pt-0 pb-2 relative self-stretch w-full flex-[0_0_auto]">
                            <div className="relative w-fit mt-[-1.00px] font-normal text-gray-400 text-xs tracking-wide leading-normal whitespace-nowrap">
                                Product Tag
                            </div>
                        </div>

                        <div className="flex flex-col min-w-[116px] items-start relative self-stretch w-full flex-[0_0_auto]">
                            <div className="flex min-h-10 items-center px-3 py-2 relative self-stretch w-full flex-[0_0_auto] rounded-xl border border-[#27272a] bg-[#18181b]">
                                <div className="justify-center flex flex-col items-start relative flex-1 self-stretch grow">
                                    <input 
                                        type="text"
                                        name="tag"
                                        value={formData.tag}
                                        onChange={handleChange}
                                        placeholder="e.g. Boruto Next Generation"
                                        className="w-full bg-transparent border-none outline-none text-white text-sm font-medium placeholder-gray-600"
                                    />
                                </div>
                                <ChevronDown className="relative w-4 h-4 text-gray-400" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Upload Section */}
            <div className="flex items-start gap-5 relative self-stretch w-full flex-[0_0_auto]">
                <div className="flex items-start gap-5 relative flex-1 grow">
                    <div className="gap-2.5 flex-1 grow flex flex-col min-w-[116px] items-start relative">
                        <div className="flex-[0_0_auto] flex items-center relative self-stretch w-full">
                            <div className="relative flex-1 mt-[-1.00px] font-normal text-gray-400 text-xs tracking-wide leading-normal">
                                Product Upload
                            </div>
                        </div>

                        <div className="flex items-start gap-5 relative self-stretch w-full flex-[0_0_auto]">
                            <div className="min-h-12 items-center px-3 py-2 flex-1 grow rounded-xl border-2 border-dashed border-[#27272a] bg-[#18181b] hover:border-[#d032e5] hover:bg-[#27272a] transition-colors cursor-pointer flex relative">
                                <div className="justify-center flex flex-col items-start relative flex-1 self-stretch grow">
                                    <div className="items-center justify-center gap-2.5 self-stretch w-full flex-[0_0_auto] flex relative text-gray-400">
                                        <span className="text-sm">Click to upload file</span>
                                        <UploadIcon className="relative w-[18px] h-[18px]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Price Section */}
            <div className="flex items-start gap-5 relative self-stretch w-full flex-[0_0_auto]">
                <div className="flex flex-col md:flex-row items-start gap-5 relative flex-1 grow">
                    <div className="flex-1 grow flex flex-col min-w-[116px] items-start relative w-full">
                        <div className="flex items-center pl-0 pr-2 pt-0 pb-2 relative self-stretch w-full flex-[0_0_auto]">
                            <div className="relative w-fit mt-[-1.00px] font-normal text-gray-400 text-xs tracking-wide leading-normal whitespace-nowrap">
                                Product Price
                            </div>
                        </div>

                        <div className="min-h-10 items-center px-3 py-2 self-stretch w-full flex-[0_0_auto] rounded-xl border border-[#27272a] bg-[#18181b] flex relative">
                            <div className="justify-center flex flex-col items-start relative flex-1 self-stretch grow">
                                <div className="flex gap-2.5 self-stretch w-full items-center relative flex-[0_0_auto]">
                                    <input 
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        className="relative flex-1 bg-transparent border-none outline-none text-white text-sm font-medium text-right"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 grow flex flex-col min-w-[116px] items-start relative w-full">
                        <div className="flex items-center pl-0 pr-2 pt-0 pb-2 relative self-stretch w-full flex-[0_0_auto]">
                            <div className="relative flex-1 mt-[-1.00px] font-normal text-gray-400 text-xs tracking-wide leading-normal">
                                Discount Price
                            </div>

                            {/* Toggle Switch */}
                            <div 
                                className="inline-flex items-center relative flex-[0_0_auto] cursor-pointer"
                                onClick={handleToggleDiscount}
                            >
                                <div className={`flex w-10 h-5 items-center rounded-full px-1 transition-colors ${formData.isDiscountActive ? 'bg-[#d032e5] justify-end' : 'bg-zinc-600 justify-start'}`}>
                                    <div className="w-3.5 h-3.5 bg-white rounded-full shadow-md transform transition-transform" />
                                </div>
                            </div>
                        </div>

                        <div className={`min-h-10 items-center px-3 py-2 self-stretch w-full flex-[0_0_auto] rounded-xl border border-[#27272a] bg-[#18181b] flex relative transition-opacity ${formData.isDiscountActive ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
                            <div className="justify-center flex flex-col items-start relative flex-1 self-stretch grow">
                                <div className="flex gap-2.5 self-stretch w-full items-center relative flex-[0_0_auto]">
                                    <input
                                        type="number"
                                        name="discountPrice"
                                        value={formData.discountPrice}
                                        onChange={handleChange}
                                        className="relative flex-1 bg-transparent border-none outline-none text-white text-sm font-medium text-right"
                                        placeholder="0"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Active Date Section */}
            <div className="flex items-start gap-5 relative self-stretch w-full flex-[0_0_auto]">
                <div className="flex flex-col md:flex-row items-start gap-5 relative flex-1 grow">
                    <div className="flex-1 grow flex flex-col min-w-[116px] items-start relative w-full">
                        <div className="flex items-center pl-0 pr-2 pt-0 pb-2 relative self-stretch w-full flex-[0_0_auto]">
                            <div className="relative flex-1 mt-[-1.00px] font-normal text-gray-400 text-xs tracking-wide leading-normal">
                                Product Active Date
                            </div>

                            <div className="inline-flex items-center relative flex-[0_0_auto] cursor-pointer">
                                <div className="flex w-10 h-5 items-center bg-zinc-600 rounded-full px-1">
                                    <div className="w-3.5 h-3.5 bg-white rounded-full shadow-md transform translate-x-0 transition-transform" />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start p-1 relative self-stretch w-full mb-2">
                            <p className="relative flex-1 mt-[-1.00px] font-normal text-gray-500 text-[10px] tracking-wide leading-normal">
                                Set the start and end date to make your product available for a limited time.
                            </p>
                        </div>

                        <div className="flex items-start gap-5 relative self-stretch w-full flex-[0_0_auto] opacity-50 pointer-events-none">
                            <div className="min-h-10 items-center px-3 py-2 flex-1 grow rounded-xl border border-[#27272a] bg-[#18181b] flex relative">
                                <div className="justify-center flex flex-col items-start relative flex-1 self-stretch grow">
                                    <div className="items-center justify-between gap-2.5 self-stretch w-full flex-[0_0_auto] flex relative">
                                        <span className="text-gray-500 text-sm">Start Date</span>
                                        <Calendar className="relative w-[18px] h-[18px] text-gray-500" />
                                    </div>
                                </div>
                            </div>

                            <div className="min-h-10 items-center px-3 py-2 flex-1 grow rounded-xl border border-[#27272a] bg-[#18181b] flex relative">
                                <div className="justify-center flex flex-col items-start relative flex-1 self-stretch grow">
                                    <div className="items-center justify-between gap-2.5 self-stretch w-full flex-[0_0_auto] flex relative">
                                        <span className="text-gray-500 text-sm">End Date</span>
                                        <Calendar className="relative w-[18px] h-[18px] text-gray-500" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 grow flex flex-col min-w-[116px] items-start relative w-full">
                        <div className="flex items-center pl-0 pr-2 pt-0 pb-2 relative self-stretch w-full flex-[0_0_auto]">
                            <div className="relative flex-1 mt-[-1.00px] font-normal text-gray-400 text-xs tracking-wide leading-normal">
                                Product Status
                            </div>

                            <div 
                                className="inline-flex items-center relative flex-[0_0_auto] cursor-pointer"
                                onClick={handleToggleActive}
                            >
                                <div className={`flex w-10 h-5 items-center rounded-full px-1 transition-colors ${formData.isActive ? 'bg-[#d032e5] justify-end' : 'bg-zinc-600 justify-start'}`}>
                                    <div className="w-3.5 h-3.5 bg-white rounded-full shadow-md transform transition-transform" />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center p-1 relative flex-1 self-stretch w-full grow">
                            <p className="relative flex-1 mt-[-1.00px] font-normal text-gray-500 text-[10px] tracking-wide leading-normal">
                                Toggle this option to control whether your product is visible to
                                customers. When turned on, the product will appear in your shop
                                and search results.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Description Section */}
            <div className="flex items-start gap-5 relative self-stretch w-full flex-[0_0_auto]">
                <div className="flex items-start gap-5 relative flex-1 grow">
                    <div className="flex-1 grow flex flex-col min-w-[116px] items-start relative">
                        <div className="flex items-center pl-0 pr-2 pt-0 pb-2 relative self-stretch w-full flex-[0_0_auto]">
                            <div className="relative flex-1 mt-[-1.00px] font-normal text-gray-400 text-xs tracking-wide leading-normal">
                                Description
                            </div>
                        </div>

                        <div className="flex-1 grow flex items-center relative self-stretch w-full">
                            <div className="items-start px-3 py-2 flex-1 self-stretch grow rounded-xl border border-[#27272a] bg-[#18181b] flex relative min-h-[100px]">
                                <textarea 
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full h-full bg-transparent border-none outline-none text-white text-sm font-normal placeholder-gray-600 resize-none"
                                    placeholder="Say Something..."
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full h-px bg-[#27272a]" />

            {/* Footer Buttons */}
            <div className="flex flex-col items-end gap-5 relative self-stretch w-full flex-[0_0_auto]">
                <div className="flex items-center justify-end gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
                    <button 
                        onClick={onClose}
                        className="bg-transparent border border-[#27272a] text-white hover:bg-[#27272a] h-[32px] px-6 rounded-full text-xs font-bold transition-colors cursor-pointer"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSubmit}
                        className="bg-[#d032e5] hover:bg-[#a61cc9] text-white h-[32px] px-6 rounded-full text-xs font-bold transition-colors cursor-pointer"
                    >
                        Post
                    </button>
                </div>
            </div>
        </div>
    );
};
