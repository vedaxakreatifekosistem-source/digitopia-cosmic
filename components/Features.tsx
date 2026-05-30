
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel.tsx";

// Use placeholders for missing assets
const imgRectangle9 = "../src/assets/images/Sub Hero 1.jpg";
const imgRectangle10 = "../src/assets/images/Sub Hero 2.jpg";
const imgRectangle11 = "../src/assets/images/Sub Hero 3a.jpg";
const imgRectangle12 = "../src/assets/images/Sub Hero 4.jpg";
const imgRectangle13 = "../src/assets/images/Sub Hero 5a.jpg";
const imgRectangle14 = "../src/assets/images/Sub Hero 6a.jpg";

const features = [
  {
    title: "Time for your work to Shine!",
    description:
      "We help you manage your work, build your community, and open up a direct line of income from your fans, all from one place.",
    images: [imgRectangle9, imgRectangle10, imgRectangle11],
  },
  {
    title: "Instant Support with Real Impact",
    description:
      "Make it easy for your fans to show appreciation for your content with our real-time tipping system. It’s simple, fast, and meaningful.",
    images: [imgRectangle10, imgRectangle11, imgRectangle12],
  },
  {
    title: "Manage Your Digital Storefront",
    description:
      "Sell merchandise, digital creations, or creative services. All transactions are handled within a single, easy-to-use dashboard.",
    images: [imgRectangle11, imgRectangle12, imgRectangle13],
  },
  {
    title: "Offer Exclusive Memberships",
    description:
      "You can create a membership system with custom benefits like private content, early access, or closed communities.",
    images: [imgRectangle12, imgRectangle13, imgRectangle14],
  },
  {
    title: "Get Paid Easily with QRIS",
    description:
      "You can receive payments instantly through QRIS, It’s seamless, secure, and fan-friendly. Just scan and support.",
    images: [imgRectangle13, imgRectangle14, imgRectangle9],
  },
  {
    title: "Build Your Creative Ecosystem",
    description:
      "You are not just a content creator, but a space organizer, brand owner, and leader of your own community. The control is entirely yours.",
    images: [imgRectangle14, imgRectangle9, imgRectangle10],
  },
];

export default function Features() {
  return (
    <div className="w-full h-screen py-12 relative overflow-hidden bg-black flex flex-col justify-center">
      <Carousel
        className="w-full max-w-none px-4 md:px-12 mx-auto"
        opts={{ loop: true, align: "center" }}
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
      >
        <CarouselContent>
          {features.map((feature, index) => (
            <CarouselItem key={index} className="basis-full">
              <div className="flex flex-col items-center justify-center text-center px-4">
                {/* Text Content */}
                <div className="max-w-[700px]">
                  <h2 className="text-[32px] md:text-[40px] font-bold text-white mb-4 leading-tight">
                    {feature.title}
                  </h2>
                  <p className="text-[16px] md:text-[20px] text-gray-300 leading-relaxed mb-8">
                    {feature.description}
                  </p>
                </div>

                {/* Images Container */}
                <div className="flex items-end justify-center gap-4 md:gap-6 w-full max-w-[90vw] md:max-w-[70vw] mx-auto h-[45vh] md:h-[50vh]">
                  {/* Left Image (Smaller, Dimmed) */}
                  <div className="hidden md:block flex-1 max-w-[20vw] h-[80%] rounded-[20px] md:rounded-[32px] overflow-hidden relative opacity-50 transition-all duration-500 shrink-0">
                    <img
                      src={feature.images[0]}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50" />
                  </div>

                  {/* Center Image (Main) */}
                  <div className="w-[80vw] md:flex-[1.5] max-w-[80vw] md:max-w-[28vw] h-full rounded-[20px] md:rounded-[32px] overflow-hidden relative shadow-2xl scale-105 z-10 shrink-0">
                    <img
                      src={feature.images[1]}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 ring-1 ring-white/10" />
                  </div>

                  {/* Right Image (Smaller, Dimmed) */}
                  <div className="hidden md:block flex-1 max-w-[20vw] h-[80%] rounded-[20px] md:rounded-[32px] overflow-hidden relative opacity-50 transition-all duration-500 shrink-0">
                    <img
                      src={feature.images[2]}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50" />
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Buttons */}
        <div className="hidden md:block">
          <CarouselPrevious className="left-10 bg-white/10 border-none hover:bg-white/20 text-white" />
          <CarouselNext className="right-10 bg-white/10 border-none hover:bg-white/20 text-white" />
        </div>
      </Carousel>
    </div>
  );
}
