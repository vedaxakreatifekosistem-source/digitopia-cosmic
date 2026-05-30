
import React, { useState } from "react";
import { ChevronRight, Download, Check } from "lucide-react";

// Helper for formatting price
export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(Math.abs(price));
};

export function SidebarSection({ title, children, defaultOpen = true }: { title: string, children?: React.ReactNode, defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="flex flex-col gap-2">
      <div 
        className="flex items-center justify-between py-2 border-b border-[#27272a] cursor-pointer group select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-xl font-bold text-white group-hover:text-[#d032e5] transition-colors">{title}</span>
        <ChevronRight 
          className={`w-5 h-5 text-gray-500 group-hover:text-[#d032e5] transition-transform duration-300 ${isOpen ? 'rotate-90' : 'rotate-0'}`} 
        />
      </div>
      
      {isOpen && (
        <div className="flex flex-col gap-2 mt-2 animate-in slide-in-from-top-2 fade-in duration-200">
          {children}
        </div>
      )}
    </div>
  );
}

export function OrderCard({
  orderId = "purchase-cosmic-001",
  category = "My Dress-up Darling",
  title = "Photopack Shizuku Tan",
  badgeText = "Instant Photo",
  orderDate = "07 September 2025",
  price = "100.000",
  fee = "5.735",
  total = "105.735",
  imageUrl,
}: any) {
  const cleanPrice = parseInt(String(price).replace(/\./g, ''), 10) || 0;
  const cleanFee = parseInt(String(fee).replace(/\./g, ''), 10) || 0;
  const qrisPayment = Math.round((cleanPrice + cleanFee) * 0.007);

  return (
    <div className="bg-white/10 rounded-[10px] p-[10px] w-full">
      <div className="flex flex-col md:flex-row gap-[15px] items-stretch">
        <div className="relative rounded-[10px] shrink-0 w-full aspect-square md:w-auto md:h-auto md:min-w-[130px] md:max-w-[150px] bg-neutral-800 overflow-hidden group">
          <img alt={title} className="absolute inset-0 object-cover w-full h-full" src={imageUrl} loading="lazy" decoding="async" />
        </div>
        <div className="flex flex-col gap-[10px] grow self-stretch min-w-0 justify-between">
          <div className="flex flex-col gap-[5px] items-start">
            <p className="font-sans font-normal text-[10px] leading-[14px] text-gray-400">{orderDate}</p>
            <p className="font-sans font-bold text-[12px] leading-[16px] text-[#9353d3]">Order ID : {orderId}</p>
            <div className="inline-flex items-center justify-center px-2 h-[18px] rounded-[6px] bg-[rgba(135,0,162,0.6)] w-fit mt-1">
              <span className="font-sans font-normal text-[9px] leading-[14px] text-white text-center">{badgeText}</span>
            </div>
            <p className="font-sans font-medium text-[14px] leading-[20px] text-white">{title}</p>
            <button className="mt-2 flex items-center gap-2 bg-[#27272a] hover:bg-[#d032e5] text-white px-4 py-1.5 rounded-full text-[10px] font-bold transition-all cursor-pointer border border-white/5 hover:border-transparent group/btn">
                <Download size={14} className="group-hover/btn:scale-110 transition-transform"/>
                <span>Download</span>
            </button>
          </div>
        </div>
        <div className="hidden md:block w-4" />
        <div className="flex flex-col gap-[5px] w-full md:w-auto min-w-[200px] shrink-0 mt-0 md:mt-0 pt-4 md:pt-0 border-t border-white/10 md:border-none">
          <div className="flex justify-between md:justify-end mb-1">
            <p className="font-sans font-bold text-[14px] leading-[20px] text-white">Order Details</p>
          </div>
          <div className="flex justify-between gap-[10px] text-[12px] text-white font-sans font-normal">
            <p className="text-gray-400">Product Price</p>
            <p className="text-right">{price}</p>
          </div>
          <div className="flex justify-between gap-[10px] text-[12px] text-white font-sans font-normal">
            <p className="text-gray-400">Platform Fee</p>
            <p className="text-right">{fee}</p>
          </div>
          <div className="flex justify-between gap-[10px] text-[12px] text-white font-sans font-normal">
            <p className="text-gray-400">QRIS Payment (0.7%)</p>
            <p className="text-right">{formatPrice(qrisPayment)}</p>
          </div>
          <div className="relative pt-[5px] mt-[5px]">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/20" />
            <div className="flex justify-between gap-[10px] text-[12px] text-white font-sans font-bold pt-1">
              <p>Total Payment</p>
              <p className="text-right text-[#d032e5]">{total}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TransactionCard({ transactionId, type, description, status, date, amount, image }: any) {
  const baseAmount = Math.abs(amount);
  const platformFee = Math.floor(baseAmount * 0.05);
  const qrisPayment = Math.floor((baseAmount + platformFee) * 0.007);
  const totalPayment = baseAmount + platformFee + qrisPayment;

  return (
    <div className="bg-white/10 rounded-[10px] p-[10px] w-full">
      <div className="flex flex-col md:flex-row gap-[10px] items-start">
        <div className="relative rounded-[10px] shrink-0 w-full aspect-square md:w-auto md:h-auto md:min-w-[130px] md:max-w-[150px] bg-neutral-800 overflow-hidden group">
          <img alt={description} className="absolute inset-0 object-cover w-full h-full" src={image} loading="lazy" decoding="async" />
        </div>
        <div className="flex flex-col gap-[15px] grow self-stretch min-w-0">
          <div className="flex flex-col gap-[5px] items-start">
            <p className="font-sans font-normal text-[10px] leading-[14px] text-gray-400">{date}</p>
            <p className="font-sans font-bold text-[12px] leading-[16px] text-[#9353d3]">ID : {transactionId}</p>
            <p className="font-sans font-normal text-[12px] leading-[16px] text-white/50">{type}</p>
            <p className="font-sans font-medium text-[14px] leading-[20px] text-white">{description}</p>
          </div>
          <div className={`inline-flex items-center justify-center px-2 h-[20px] rounded-[10px] w-fit ${status === 'Success' ? 'bg-green-500/20 text-green-500' : 'bg-gray-500/20 text-gray-300'}`}>
            <span className="font-sans font-normal text-[10px] leading-[16px] text-center">{status}</span>
          </div>
        </div>
        <div className="hidden md:block w-8" />
        <div className="flex flex-col gap-[5px] w-full md:w-auto min-w-[200px] shrink-0 mt-4 md:mt-0 pt-4 md:pt-0 border-t border-white/10 md:border-none">
          <div className="flex justify-between md:justify-end mb-1">
            <p className="font-sans font-bold text-[14px] leading-[20px] text-white">Transaction Details</p>
          </div>
          <div className="flex justify-between gap-[10px] text-[12px] text-white font-sans font-normal">
            <p className="text-gray-400">Price Amount</p>
            <p className="text-right">{formatPrice(baseAmount)}</p>
          </div>
          <div className="flex justify-between gap-[10px] text-[12px] text-white font-sans font-normal">
            <p className="text-gray-400">Platform Fee</p>
            <p className="text-right">{formatPrice(platformFee)}</p>
          </div>
          <div className="flex justify-between gap-[10px] text-[12px] text-white font-sans font-normal">
            <p className="text-gray-400">QRIS Payment</p>
            <p className="text-right">{formatPrice(qrisPayment)}</p>
          </div>
          <div className="relative pt-[5px] mt-[5px]">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/20" />
            <div className="flex justify-between gap-[10px] text-[12px] text-white font-sans font-bold pt-1">
              <p>Total Payment</p>
              <p className="text-right text-[#d032e5]">{formatPrice(totalPayment)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SubscriptionCard({ id, creator, plan, status, price, purchaseDate, planDuration, renewalDate, image, features }: any) {
  const subscriptionId = `CSM-SUB-${1000 + id}`;
  const fee = 2500;
  const qrisPayment = Math.round((price + fee) * 0.007);
  const total = price + fee + qrisPayment;

  return (
    <div className="bg-white/10 rounded-[10px] p-[10px] w-full">
      <div className="flex flex-col md:flex-row gap-[15px] items-stretch">
        <div className="relative rounded-[10px] shrink-0 w-full aspect-square md:w-auto md:h-auto md:min-w-[130px] md:max-w-[150px] bg-neutral-800 overflow-hidden">
          <img alt={creator} className="absolute inset-0 object-cover w-full h-full" src={image} loading="lazy" decoding="async" />
        </div>
        <div className="flex flex-col gap-[10px] grow self-stretch min-w-0 justify-between">
          <div className="flex flex-col gap-[2px] items-start">
            <p className="font-sans font-normal text-[10px] leading-[14px] text-gray-400">{purchaseDate}</p>
            <p className="font-sans font-bold text-[12px] leading-[16px] text-[#9353d3]">Subscription ID : {subscriptionId}</p>
            <p className="font-sans font-medium text-[14px] leading-[20px] text-white mt-1">{plan}</p>
            <div className="flex flex-col gap-0.5 mt-1">
                <p className="text-[11px] text-gray-400">Duration: <span className="text-white">{planDuration}</span></p>
                <p className="text-[11px] text-gray-400">Next Renewal: <span className="text-white">{status === 'Expired' ? '-' : renewalDate}</span></p>
            </div>
            <div className={`inline-flex items-center justify-center px-3 h-[20px] rounded-[10px] w-fit mt-2 ${status === 'Active' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
              <span className="font-sans font-normal text-[10px] leading-[16px] text-center">{status}</span>
            </div>
          </div>
        </div>
        <div className="hidden md:block w-4" />
        <div className="flex flex-col gap-[5px] w-full md:w-auto min-w-[220px] shrink-0 mt-4 md:mt-0 pt-4 md:pt-0 border-t border-white/10 md:border-none">
          <div className="flex justify-between md:justify-end mb-1">
            <p className="font-sans font-bold text-[14px] leading-[20px] text-white">Subscription Details</p>
          </div>
          <div className="flex justify-between gap-[10px] text-[12px] text-white font-sans font-normal">
            <p className="text-gray-400">Price</p>
            <p className="text-right">{formatPrice(price)}</p>
          </div>
          <div className="flex justify-between gap-[10px] text-[12px] text-white font-sans font-normal">
            <p className="text-gray-400">Platform Fee</p>
            <p className="text-right">{formatPrice(fee)}</p>
          </div>
          <div className="flex justify-between gap-[10px] text-[12px] text-white font-sans font-normal">
            <p className="text-gray-400">QRIS Payment (0.7%)</p>
            <p className="text-right">{formatPrice(qrisPayment)}</p>
          </div>
          <div className="relative pt-[5px] mt-[5px]">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/20" />
            <div className="flex justify-between gap-[10px] text-[12px] text-white font-sans font-bold pt-1">
              <p>Total Payment</p>
              <p className="text-right text-[#d032e5]">{formatPrice(total)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
