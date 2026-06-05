
import React, { useState } from "react";
import { 
  Search, SortAsc, SortDesc, Play, Check, Users
} from "lucide-react";
import Footer from "./Footer";

// Placeholder images
import imgCreatorCard from "../src/assets/images/dummy.jpg";

// Dummy Data untuk Live Streaming
const liveCreatorsData = [
  { id: 1, name: "Fareye Closhartt", date: "2023-12-01", viewers: 1200, verified: true },
  { id: 2, name: "Avianna Skylark", date: "2023-11-20", viewers: 850, verified: true },
  { id: 3, name: "Zenyth Prime", date: "2023-12-05", viewers: 2300, verified: true },
  { id: 4, name: "Braum Shield", date: "2023-10-15", viewers: 500, verified: false },
  { id: 5, name: "Celeste Moon", date: "2024-01-02", viewers: 3100, verified: true },
  { id: 6, name: "Draven Axe", date: "2023-09-10", viewers: 150, verified: false },
  { id: 7, name: "Ezreal Explorer", date: "2023-11-01", viewers: 900, verified: true },
  { id: 8, name: "Garen Might", date: "2023-08-30", viewers: 400, verified: true },
  { id: 9, name: "Lux Light", date: "2023-12-10", viewers: 5000, verified: true },
  { id: 10, name: "Jinx Chaos", date: "2024-01-05", viewers: 4200, verified: false },
  { id: 11, name: "Ahri Fox", date: "2023-11-25", viewers: 1800, verified: true },
  { id: 12, name: "Yasuo Wind", date: "2023-10-05", viewers: 2100, verified: true },
  { id: 13, name: "Vi Enforcer", date: "2023-09-20", viewers: 700, verified: false },
  { id: 14, name: "Caitlyn Sniper", date: "2023-12-15", viewers: 1100, verified: true },
  { id: 15, name: "Ekko Time", date: "2024-01-01", viewers: 2500, verified: true },
  { id: 16, name: "Seraphine", date: "2024-01-02", viewers: 3200, verified: true },
  { id: 17, name: "Akali", date: "2024-01-03", viewers: 1500, verified: true },
  { id: 18, name: "Kai'sa", date: "2024-01-04", viewers: 2800, verified: true },
];

type SortOption = 'newest' | 'a-z' | 'z-a';

// Fixed: Added optional key to props to satisfy TS compiler in map functions
function CreatorCard({ data }: { data: typeof liveCreatorsData[0]; key?: React.Key }) {
  return (
    <div className="relative rounded-[20px] w-full aspect-[4/5] overflow-hidden group cursor-pointer border border-[#27272a] hover:border-[#d032e5] transition-all duration-300 hover:shadow-[0_0_20px_rgba(208,50,229,0.3)]">
      {/* Background Image */}
      <img
        alt={data.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        src={imgCreatorCard}
      />

      {/* Live Badge */}
      <div className="absolute top-3 left-3 bg-red-600 rounded-[6px] px-2 py-0.5 flex items-center justify-center z-10 animate-pulse">
        <span className="text-white text-[10px] font-bold tracking-wider">LIVE</span>
      </div>

      {/* Play Icon (Centered on Hover) */}
      <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
            <Play size={24} fill="white" className="text-white ml-1" />
        </div>
      </div>

      {/* Bottom Info Gradient */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent pt-12 pb-4 px-4 flex flex-col justify-end z-10">
        <div className="flex items-center gap-1.5 w-full overflow-hidden">
          <span className="text-white text-[16px] font-bold truncate group-hover:text-[#d032e5] transition-colors">
            {data.name}
          </span>
           {data.verified && (
               <div className="bg-[#d032e5] rounded-full p-[2px] flex items-center justify-center w-3.5 h-3.5 shrink-0">
                  <Check size={10} className="text-white" strokeWidth={4} />
               </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default function LiveStreaming() {
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtering Logic
  const filteredCreators = liveCreatorsData.filter(creator => 
    creator.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sorting Logic
  const sortedCreators = [...filteredCreators].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'a-z':
        return a.name.localeCompare(b.name);
      case 'z-a':
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  return (
    <div className="bg-black min-h-screen w-full pt-[80px] flex flex-col items-center">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center gap-4 py-12 px-6 text-center max-w-[800px]">
        <h1 className="text-[32px] md:text-[48px] font-bold text-white leading-tight">
          Who’s Live Now?
        </h1>
        <p className="text-gray-300 text-[16px] md:text-[18px]">
          Don’t miss out — jump into live art, cosplay, and chill
          creator sessions happening right now.
        </p>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-screen px-6 md:px-10 lg:px-20 pb-20 flex flex-col gap-10">
        
        {/* Filter Bar */}
        <div className="flex flex-col gap-2.5 w-full">
            <div className="flex flex-col xl:flex-row items-center justify-between gap-4 py-4 border-b border-[#27272a]">
              {/* Title */}
              <h2 className="text-[24px] font-bold text-white leading-tight shrink-0">Streamer List</h2>
              
              {/* Sort Buttons - Centered */}
              <div className="flex flex-1 justify-center w-full xl:w-auto px-4">
                  <div className="flex flex-wrap items-center justify-center gap-4 md:gap-[40px] lg:gap-[60px] xl:gap-[90px]">
                    <button 
                        onClick={() => setSortBy('newest')}
                        className={`text-[14px] md:text-[16px] leading-[24px] whitespace-nowrap transition-colors ${sortBy === 'newest' ? 'font-bold text-[#d032e5]' : 'font-medium text-gray-400 hover:text-[#d032e5]'}`}
                    >
                        Newest
                    </button>
                    <button 
                        onClick={() => setSortBy('a-z')}
                        className={`flex items-center gap-2 text-[14px] md:text-[16px] leading-[20px] whitespace-nowrap transition-colors ${sortBy === 'a-z' ? 'font-bold text-[#d032e5]' : 'font-medium text-gray-400 hover:text-[#d032e5]'}`}
                    >
                        <SortAsc className="w-4 h-4" /> Sort A to Z
                    </button>
                    <button 
                        onClick={() => setSortBy('z-a')}
                        className={`flex items-center gap-2 text-[14px] md:text-[16px] leading-[20px] whitespace-nowrap transition-colors ${sortBy === 'z-a' ? 'font-bold text-[#d032e5]' : 'font-medium text-gray-400 hover:text-[#d032e5]'}`}
                    >
                        <SortDesc className="w-4 h-4" /> Sort Z to A
                    </button>
                  </div>
              </div>

              {/* Search */}
              <div className="relative w-full md:w-[275px] shrink-0">
                <div className="bg-[#18181b] h-[40px] rounded-full border border-[#27272a] flex items-center px-4 gap-2 focus-within:border-[#d032e5] transition-colors">
                    <input 
                        type="text" 
                        placeholder="Find your favourite creator!" 
                        className="bg-transparent border-none outline-none text-[14px] text-white placeholder-white/40 flex-1 w-full"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search size={16} className="text-gray-400 shrink-0" />
                </div>
              </div>
            </div>
        </div>

        {/* Grid Container - Adjusted for better screen filling */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 w-full">
             {sortedCreators.length > 0 ? (
                sortedCreators.map((creator, index) => (
                    <CreatorCard key={`live-${creator.id || index}`} data={creator} />
                ))
            ) : (
                <div className="col-span-full w-full text-center text-gray-400 text-lg py-20 flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-[#18181b] rounded-full flex items-center justify-center">
                        <Search size={24} />
                    </div>
                    No creators found.
                </div>
            )}
        </div>

      </div>

      <Footer />
    </div>
  );
}
