
import React, { useState, useEffect } from "react";
import { Search, ChevronRight, Star, Check, SortAsc, SortDesc } from "lucide-react";
import Footer from "./Footer";
import { getCreators } from "../src/services/dataService";

// Placeholder images
const imgBanner1 = "../src/assets/images/banner.jpg"; // Creator Banner
const imgAvatar1 = "../src/assets/images/dummy.jpg"; // Creator Avatar

// Dummy Data untuk simulasi sorting
const creatorsData = [
  { id: 1, name: "Fareye Closhartt", role: "Illustrator", rating: 5, date: "2023-12-01", verified: true },
  { id: 2, name: "Avianna Skylark", role: "Vtuber", rating: 4, date: "2023-11-15", verified: true },
  { id: 3, name: "Zenyth Prime", role: "Cosplayer", rating: 5, date: "2023-10-20", verified: true },
  { id: 4, name: "Braum Shield", role: "Illustrator", rating: 3, date: "2023-09-05", verified: false },
  { id: 5, name: "Celeste Moon", role: "Vtuber", rating: 5, date: "2024-01-01", verified: true },
  { id: 6, name: "Draven Axe", role: "Cosplayer", rating: 2, date: "2023-08-22", verified: false },
  { id: 7, name: "Ezreal Explorer", role: "Illustrator", rating: 4, date: "2023-11-10", verified: true },
  { id: 8, name: "Garen Might", role: "Cosplayer", rating: 5, date: "2023-05-30", verified: true },
  { id: 9, name: "Lux Light", role: "Vtuber", rating: 4, date: "2023-09-01", verified: true },
];

type SortOption = 'newest' | 'rating' | 'a-z' | 'z-a';

interface FilterBarProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

function FilterBar({ currentSort, onSortChange, searchQuery, onSearchChange }: FilterBarProps) {
  return (
    <div className="flex flex-col gap-2.5 w-full">
      <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4 py-2.5 border-b border-[#27272a]">
        <div className="flex items-center gap-[70px]">
          <h2 className="text-[24px] font-bold text-white leading-tight">
            Creator List
          </h2>
        </div>

        {/* Group Sort Buttons and Search Bar together for consistent spacing */}
        <div className="flex flex-col md:flex-row flex-wrap items-center gap-4 md:gap-[90px] text-white w-full md:w-auto">
          
          <div className="flex flex-wrap items-center justify-between md:justify-start gap-2 md:gap-[90px] w-full md:w-auto">
            <button 
              onClick={() => onSortChange('newest')}
              className={`text-[11px] sm:text-[12px] md:text-[16px] leading-[24px] whitespace-nowrap transition-colors ${currentSort === 'newest' ? 'font-bold text-[#d032e5]' : 'font-medium hover:text-[#d032e5]'}`}
            >
              Newest
            </button>
            
            <button 
              onClick={() => onSortChange('rating')}
              className={`text-[11px] sm:text-[12px] md:text-[16px] leading-[24px] whitespace-nowrap transition-colors ${currentSort === 'rating' ? 'font-bold text-[#d032e5]' : 'font-medium hover:text-[#d032e5]'}`}
            >
              Highest Rated
            </button>

            <button 
              onClick={() => onSortChange('a-z')}
              className={`flex items-center gap-1 md:gap-2 text-[11px] sm:text-[12px] md:text-[14px] leading-[20px] whitespace-nowrap transition-colors ${currentSort === 'a-z' ? 'font-medium text-[#d032e5]' : 'font-medium hover:text-[#d032e5]'}`}
            >
              <SortAsc className="w-3 h-3 md:w-4 md:h-4" /> Sort A to Z
            </button>

            <button 
              onClick={() => onSortChange('z-a')}
              className={`flex items-center gap-1 md:gap-2 text-[11px] sm:text-[12px] md:text-[14px] leading-[20px] whitespace-nowrap transition-colors ${currentSort === 'z-a' ? 'font-medium text-[#d032e5]' : 'font-medium hover:text-[#d032e5]'}`}
            >
              <SortDesc className="w-3 h-3 md:w-4 md:h-4" /> Sort Z to A
            </button>
          </div>

          <div className="relative w-full md:w-[275px]">
            <div className="bg-[#1e1e1e] h-[35px] rounded-full border border-[#444] flex items-center px-4 gap-2 focus-within:border-[#d032e5] transition-colors">
              <input 
                type="text" 
                placeholder="Find your favourite creator!" 
                className="bg-transparent border-none outline-none text-[14px] text-white placeholder-white/40 flex-1"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
              <Search size={16} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Fixed: Made children optional to fix "children is missing" TS error
function SidebarSection({ title, children, defaultOpen = false }: { title: string, children?: React.ReactNode, defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="flex flex-col gap-2.5">
      <div 
        className="flex items-center justify-between py-2 cursor-pointer group select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-[18px] font-bold text-white">{title}</span>
        <ChevronRight 
          className={`w-6 h-6 text-white group-hover:text-[#d032e5] transition-transform duration-300 ${isOpen ? 'rotate-90' : 'rotate-0'}`} 
        />
      </div>
      <div className="h-px w-full bg-[#27272a]" />
      
      {isOpen && (
        <div className="flex flex-col gap-2 mt-1 animate-in slide-in-from-top-2 fade-in duration-200">
          {children}
        </div>
      )}
    </div>
  );
}

interface SidebarProps {
  selectedCategories: string[];
  selectedRatings: number[];
  onToggleCategory: (category: string) => void;
  onToggleRating: (rating: number) => void;
}

function Sidebar({ selectedCategories, selectedRatings, onToggleCategory, onToggleRating }: SidebarProps) {
  return (
    <div className="w-full md:w-[240px] flex flex-col gap-[30px] shrink-0">
      {/* Categories Accordion */}
      <div className="flex flex-col gap-5">
        <SidebarSection title="Categories" defaultOpen={true}>
             {['Anime', 'Illustrator', 'Cosplayer', 'Vtuber'].map((cat, i) => {
               const isSelected = selectedCategories.includes(cat);
               return (
                <div 
                  key={cat} 
                  className={`flex items-center justify-between py-1 cursor-pointer rounded px-2 transition-colors ${isSelected ? 'bg-white/10' : 'hover:bg-white/5'}`}
                  onClick={() => onToggleCategory(cat)}
                >
                  <span className={`text-[14px] transition-colors ${isSelected ? 'text-[#d032e5] font-bold' : 'text-gray-300'}`}>{cat}</span>
                  <span className="text-[14px] text-gray-500">({10 + i * 5})</span>
                </div>
               )
             })}
        </SidebarSection>
      </div>

      {/* Ratings Accordion */}
      <div className="flex flex-col gap-5">
        <SidebarSection title="Rating" defaultOpen={true}>
            {[5, 4, 3, 2, 1].map((stars, i) => {
              const isSelected = selectedRatings.includes(stars);
              return (
                <div 
                  key={`rating-${stars}-${i}`} 
                  className="flex items-center gap-3 p-2 hover:bg-white/5 rounded cursor-pointer group"
                  onClick={() => onToggleRating(stars)}
                >
                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${isSelected ? 'border-[#d032e5] bg-[#d032e5]/10' : 'border-gray-600'}`}>
                    {isSelected && <Check size={12} className="text-[#d032e5]" />}
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={14} 
                        fill={i < stars ? "white" : "none"} 
                        className={i < stars ? "text-white" : "text-gray-600"} 
                      />
                    ))}
                  </div>
                </div>
              )
            })}
        </SidebarSection>
      </div>
    </div>
  );
}

// Fixed: Added optional key to props to satisfy TS compiler
function CreatorCard({ data, onClick }: { data: typeof creatorsData[0], onClick?: () => void, key?: React.Key }) {
  return (
    <div 
      onClick={onClick}
      className="w-full h-[200px] bg-[#0c0c0c] rounded-[10px] overflow-hidden relative group cursor-pointer border border-[#27272a] hover:border-[#d032e5] transition-colors duration-300"
    >
      {/* Banner */}
      <div className="h-[100px] w-full relative overflow-hidden">
        <img 
          src={imgBanner1} 
          alt="Banner" 
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0c0c0c]" />
        
        {/* Rating Badge (Top Left) */}
        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full flex items-center gap-1 sm:gap-1.5 z-20">
            <Star size={10} className="text-yellow-400 fill-yellow-400 sm:w-3 sm:h-3" />
            <span className="text-[10px] sm:text-[12px] text-white font-bold">{data.rating}.0</span>
        </div>

        {/* Tag (Top Right) */}
        <div className="absolute top-3 right-3 bg-[#8600a1]/80 backdrop-blur-sm px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-[7px] z-20">
            <span className="text-[10px] sm:text-[12px] text-white font-medium">{data.role}</span>
        </div>
      </div>

      {/* Avatar */}
      <div className="absolute top-[65px] left-3 w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] rounded-[14px] sm:rounded-[17px] border-2 border-white overflow-hidden z-10 bg-black">
        <img src={imgAvatar1} alt="Avatar" className="w-full h-full object-cover" />
      </div>

      {/* Content */}
      <div className="absolute top-[100px] left-[80px] sm:left-[90px] right-3">
         <div className="flex items-center gap-1">
            <h3 className="text-white text-[14px] sm:text-[16px] font-bold truncate">{data.name}</h3>
             {data.verified && (
               <div className="bg-[#d032e5] rounded-full p-[1px] flex items-center justify-center w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0">
                  <Check size={8} className="text-white" strokeWidth={4} />
               </div>
            )}
         </div>
         <p className="text-white/60 text-[10px] sm:text-[12px] truncate">@{data.name.toLowerCase().replace(/\s+/g, '')}</p>
      </div>

      <div className="absolute bottom-3 left-3 right-3">
         <p className="text-white/80 text-[10px] sm:text-[12px] line-clamp-2 leading-relaxed">
            Im the strongest warrior from Ch.02, I am {data.name} and I will protect you with all my soul.
         </p>
      </div>
    </div>
  );
}

export default function DiscoverCreator({ onCreatorSelect }: { onCreatorSelect?: (creator: any) => void }) {
  const [creators, setCreators] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const data = await getCreators();
        setCreators(data.length > 0 ? data : creatorsData);
      } catch (error) {
        console.error("Error fetching creators:", error);
        setCreators(creatorsData);
      } finally {
        setLoading(false);
      }
    };
    fetchCreators();
  }, []);

  // Toggle Function for Categories
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  // Toggle Function for Ratings
  const toggleRating = (rating: number) => {
    setSelectedRatings(prev => 
      prev.includes(rating) 
        ? prev.filter(r => r !== rating) 
        : [...prev, rating]
    );
  };

  // 1. Filter Logic
  const filteredCreators = creators.filter(creator => {
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(creator.role);
    const ratingMatch = selectedRatings.length === 0 || selectedRatings.includes(creator.rating);
    const searchMatch = creator.name.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && ratingMatch && searchMatch;
  });

  // 2. Sort Logic (Applied to filtered results)
  const sortedCreators = [...filteredCreators].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'rating':
        return b.rating - a.rating;
      case 'a-z':
        return a.name.localeCompare(b.name);
      case 'z-a':
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <div className="bg-black min-h-screen w-full pt-[80px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d032e5]"></div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen w-full pt-[80px] flex flex-col items-center">
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center gap-4 py-12 px-6 text-center max-w-[800px]">
            <h1 className="text-[32px] md:text-[48px] font-bold text-white leading-tight">
                Discover Inspiring Creators
            </h1>
            <p className="text-gray-300 text-[16px] md:text-[18px]">
                Explore top creators across creative industries — from illustrators to VTubers. Follow their work and support their journey.
            </p>
        </div>

        {/* Main Content */}
        <div className="w-full max-w-[1440px] px-6 md:px-20 pb-20 flex flex-col gap-10">
            <div className="flex flex-col gap-4">
                <FilterBar 
                  currentSort={sortBy} 
                  onSortChange={setSortBy} 
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                />
                
                {/* Mobile Filter Toggle */}
                <button 
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="md:hidden flex items-center justify-center gap-2 w-full py-3 bg-[#18181b] border border-[#27272a] rounded-xl text-white font-bold transition-colors hover:bg-[#27272a]"
                >
                    <Search size={18} />
                    {isSidebarOpen ? 'Hide Filters' : 'Show Filters'}
                </button>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className={`${isSidebarOpen ? 'flex' : 'hidden'} md:flex w-full md:w-auto`}>
                    <Sidebar 
                      selectedCategories={selectedCategories}
                      selectedRatings={selectedRatings}
                      onToggleCategory={toggleCategory}
                      onToggleRating={toggleRating}
                    />
                </div>
                
                {/* Grid */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                    {sortedCreators.length > 0 ? (
                      sortedCreators.map((creator, index) => (
                          <CreatorCard key={`creator-${creator.id || index}`} data={creator} onClick={() => onCreatorSelect?.(creator)} />
                      ))
                    ) : (
                      <div className="col-span-full w-full flex flex-col items-center justify-center py-20 text-center">
                        <p className="text-gray-400 text-lg">No creators found matching your filters.</p>
                      </div>
                    )}
                </div>
            </div>
        </div>

        <Footer />
    </div>
  );
}
