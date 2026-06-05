
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
import imgRectangle9 from "../src/assets/images/Sub Hero 1.jpg";
import imgRectangle10 from "../src/assets/images/Sub Hero 2.jpg";
import imgRectangle11 from "../src/assets/images/Sub Hero 3a.jpg";
import imgRectangle12 from "../src/assets/images/Sub Hero 4.jpg";
import imgRectangle13 from "../src/assets/images/Sub Hero 5a.jpg";
import imgRectangle14 from "../src/assets/images/Sub Hero 6a.jpg";

const features = [
  {
    title: "Build Your Creative Ecosystem",
    description:
      "You are not just a content creator, but a space organizer, brand owner, and leader of your own community. The control is entirely yours.",
    image: imgRectangle9,
  },
  {
    title: "Time for your work to Shine!",
    description:
      "We help you manage your work, build your community, and open up a direct line of income from your fans, all from one place.",
    image: imgRectangle10,
  },
  {
    title: "Instant Support with Real Impact",
    description:
      "Make it easy for your fans to show appreciation for your content with our real-time tipping system. It's simple, fast, and meaningful.",
    image: imgRectangle11,
  },
  {
    title: "Manage Your Digital Storefront",
    description:
      "Sell merchandise, digital creations, or creative services. All transactions are handled within a single, easy-to-use dashboard.",
    image: imgRectangle12,
  },
  {
    title: "Offer Exclusive Memberships",
    description:
      "You can create a membership system with custom benefits like private content, early access, or closed communities.",
    image: imgRectangle13,
  },
  {
    title: "Get Paid Easily with QRIS",
    description:
      "You can receive payments instantly through QRIS. It's seamless, secure, and fan-friendly. Just scan and support.",
    image: imgRectangle14,
  },
];

export default function Features() {
  const [api, setApi] = React.useState<any>();
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setActiveIndex(api.selectedScrollSnap());
    };

    onSelect(); // Initial call
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <div className="w-full min-h-screen py-20 px-6 relative overflow-hidden bg-black flex flex-col justify-center">
      {/* Title & Introduction */}
      <div className="text-center mb-12 md:mb-16 px-4 animate-in fade-in duration-750">
        <h2 className="text-[36px] md:text-[54px] font-extrabold text-white tracking-tight mb-4 leading-tight">
          Everything You Need to Scale
        </h2>
        <p className="text-[20px] md:text-[24px] text-gray-400 max-w-[750px] mx-auto leading-relaxed">
          Cosmic provides the tools for creators to grow their own ecosystem, engage
          with fans, and monetize their passion effortlessly.
        </p>
      </div>

      {/* Responsive Carousel */}
      <div className="w-full max-w-screen mx-auto px-2 md:px-12 relative group">
        <Carousel
          className="w-full"
          opts={{ loop: true, align: "center" }}
          setApi={setApi}
          plugins={[
            Autoplay({
              delay: 4000,
              stopOnInteraction: true,
            }),
          ]}
        >
          <CarouselContent className="-ml-6 items-center">
            {features.map((feature, index) => {
              const isActive = index === activeIndex;
              return (
                <CarouselItem
                  key={index}
                  className="pl-6 basis-full sm:basis-1/2 lg:basis-1/3 flex items-center justify-center py-10"
                >
                  <div
                    onClick={() => api?.scrollTo(index)}
                    className={`relative w-full aspect-[3/4.2] sm:aspect-[3/4.5] md:aspect-[3/4] lg:aspect-[3/4] xl:aspect-[3/4.2] min-h-[480px] rounded-[32px] overflow-hidden border bg-[#0c0c0c] flex flex-col justify-end p-8 group/card cursor-pointer transition-all duration-500 ease-in-out h-full
                      ${isActive 
                        ? "scale-105 md:scale-112 border-[#d032e5]/80 shadow-[0_0_35px_rgba(208,50,229,0.3)] z-10" 
                        : "scale-90 border-[#27272a] hover:border-white/10"
                      }`}
                  >
                    {/* Darkening / Dimming 70% Overlay for non-active cards */}
                    <div className={`absolute inset-0 bg-black transition-opacity duration-500 pointer-events-none z-20 
                      ${isActive ? "opacity-0" : "opacity-70"}`} 
                    />

                    {/* Image Background */}
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-700 brightness-[0.7] md:brightness-[0.75]"
                    />

                    {/* Elegant Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent opacity-95 group-hover/card:opacity-100 transition-opacity duration-500" />

                    {/* Card Content stacked at bottom */}
                    <div className="relative z-10 flex flex-col items-start text-left">
                      <h3 className="text-white text-[24px] md:text-[30px] font-extrabold tracking-tight mb-3 leading-tight select-none">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 text-[13px] md:text-[14px] leading-relaxed font-normal select-none">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>

          {/* Custom premium navigation buttons - shown on overall hover with transition */}
          <div className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <CarouselPrevious className="absolute left-[-20px] lg:left-[-40px] top-1/2 -translate-y-1/2 z-30 size-12 rounded-full border-none bg-[#d032e5] hover:bg-[#b022c5] text-white shadow-[0_0_20px_rgba(208,50,229,0.4)] transition-all duration-300 flex items-center justify-center cursor-pointer pointer-events-auto" />
            <CarouselNext className="absolute right-[-20px] lg:right-[-40px] top-1/2 -translate-y-1/2 z-30 size-12 rounded-full border border-white/10 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all duration-300 flex items-center justify-center cursor-pointer pointer-events-auto" />
          </div>
        </Carousel>

        {/* Pagination Dots / Slider Dots below carousel */}
        <div className="flex justify-center items-center gap-2 mt-6">
          {features.map((_, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-2.5 rounded-full transition-all duration-500 cursor-pointer ${
                  isActive 
                    ? "w-10 bg-[#d032e5] shadow-[0_0_12px_rgba(208,50,229,0.6)]" 
                    : "w-2.5 bg-[#27272a] hover:bg-gray-600"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

