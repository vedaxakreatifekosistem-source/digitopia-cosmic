
import React, { useState, useEffect } from "react";
import { Search, SortAsc, SortDesc, Check, ChevronRight, ShoppingBag, Star } from "lucide-react";
import Footer from "./Footer";
import { getProducts } from "../src/services/dataService";

// Placeholder images for varied products
const imgCostume1 = "../src/assets/images/Sub Hero 1.jpg";
const imgMerchandise1 = "../src/assets/images/Sub Hero 2.jpg";
const imgService1 = "../src/assets/images/Sub Hero 3a.jpg";
const imgDigital1 = "../src/assets/images/Sign Up 1.jpg";
const imgProp1 = "../src/assets/images/Sub Hero 4.jpg";
const imgDigital2 = "../src/assets/images/Sign Up 5.jpg";
const imgCostume2 = "../src/assets/images/Sub Hero 5a.jpg";
const imgDigital3 = "../src/assets/images/Sign Up 2.jpg";
const imgMerchandise2 = "../src/assets/images/Sub Hero 6a.jpg";
const imgDigital4 = "../src/assets/images/Sign Up 6.jpg";
const imgDigital5 = "../src/assets/images/Sign Up 3.jpg";
const imgCostume3 = "../src/assets/images/hero-2.jpg";

// Dummy Data for Products with Rating
export const productsData = [
  { id: 1, title: "Raiden Shogun Cosplay", category: "Costume", creator: "Zenyth Prime", username: "@zenyth", price: 1200000, image: imgCostume1, verified: true, date: "2023-12-01", rating: 5 },
  { id: 2, title: "Hololive Sticker Pack", category: "Merchandise", creator: "Fareye Closhartt", username: "@fareye", price: 45000, image: imgMerchandise1, verified: true, date: "2023-11-20", rating: 4 },
  { id: 3, title: "Custom Wig Styling", category: "Service", creator: "Avianna Skylark", username: "@avianna", price: 350000, image: imgService1, verified: true, date: "2024-01-05", rating: 5 },
  { id: 4, title: "Digital Art Commission", category: "Digital", creator: "Braum Shield", username: "@braum", price: 500000, image: imgDigital1, verified: false, date: "2023-10-15", rating: 3 },
  { id: 5, title: "Fate/Grand Order Sword", category: "Prop", creator: "Garen Might", username: "@garen", price: 850000, image: imgProp1, verified: true, date: "2023-09-10", rating: 5 },
  { id: 6, title: "Voice Pack Vol.1", category: "Digital", creator: "Celeste Moon", username: "@celeste", price: 9000, image: imgDigital2, verified: true, date: "2023-12-25", rating: 4 },
  { id: 7, title: "Spy x Family Uniform", category: "Costume", creator: "Lux Light", username: "@lux", price: 450000, image: imgCostume2, verified: true, date: "2023-11-01", rating: 4 },
  { id: 8, title: "Chibi Avatar Set", category: "Digital", creator: "Ahri Fox", username: "@ahri", price: 20000, image: imgDigital3, verified: true, date: "2023-10-05", rating: 5 },
  { id: 9, title: "Resin Vision Mondstadt", category: "Merchandise", creator: "Ezreal Explorer", username: "@ezreal", price: 120000, image: imgMerchandise2, verified: true, date: "2023-12-10", rating: 3 },
  { id: 10, title: "Photo Pack: Cyberpunk", category: "Digital", creator: "Jinx Chaos", username: "@jinx", price: 75000, image: imgDigital4, verified: false, date: "2024-01-02", rating: 2 },
  { id: 11, title: "Armor Foam Pattern", category: "Digital", creator: "Draven Axe", username: "@draven", price: 50000, image: imgDigital5, verified: false, date: "2023-08-15", rating: 4 },
  { id: 12, title: "Bunny Girl Costume", category: "Costume", creator: "Caitlyn Sniper", username: "@caitlyn", price: 300000, image: imgCostume3, verified: true, date: "2024-01-10", rating: 5 },
];

// Price Range Constants
const PRICE_RANGES = [
    { id: 'under-10k', label: "Under 10.000", min: 0, max: 9999 },
    { id: '10k-25k', label: "10.000 - 24.999", min: 10000, max: 24999 },
    { id: '25k-50k', label: "25.000 - 49.999", min: 25000, max: 49999 },
    { id: '50k-75k', label: "50.000 - 74.999", min: 50000, max: 74999 },
    { id: '75k-100k', label: "75.000 - 99.999", min: 75000, max: 99999 },
    { id: 'above-100k', label: "Above 100.000", min: 100000, max: Infinity },
];

type SortOption = 'newest' | 'price-low' | 'price-high' | 'a-z' | 'z-a';

// Helper for formatting price
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
};

// --- Components ---

interface ProductCardProps {
  data: any;
  onClick?: (product: any) => void;
  key?: React.Key;
}

function ProductCard({ data, onClick }: ProductCardProps) {
  return (
    <div 
      onClick={() => onClick?.(data)}
      className="w-full flex flex-col rounded-[10px] border border-[#27272a] bg-[#0C0C0C] overflow-hidden hover:border-[#d032e5] transition-colors group cursor-pointer"
    >
      {/* Image Section */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={data.image}
          alt={data.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Rating Badge */}
        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-full flex items-center gap-1">
            <Star size={12} className="text-yellow-400 fill-yellow-400" />
            <span className="text-white text-[12px] font-bold">{data.rating}.0</span>
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 right-3 px-2 py-0.5 rounded-lg bg-[#8700a2] text-white text-[12px] font-bold uppercase tracking-wider">
            {data.category}
        </div>
      </div>
      
      {/* Product Details Section */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div className="flex flex-col gap-1">
          <span className="text-white text-base font-bold line-clamp-1 group-hover:text-[#d032e5] transition-colors">
            {data.title}
          </span>
          <div className="flex items-center gap-1.5 text-white/50 text-[12px] font-bold">
             <span className="truncate max-w-[150px]">{data.creator}</span>
             {data.verified &&(
               <div className="bg-[#d032e5] rounded-full p-[1px] flex items-center justify-center w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0">
                  <Check size={8} className="text-white" strokeWidth={4} />
               </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="text-white font-bold text-lg">
            {formatPrice(data.price)}
          </span>
          <button className="h-9 w-14 flex items-center justify-center rounded-lg bg-[#27272a] group-hover:bg-[#d032e5] transition-colors">
            <ShoppingBag size={18} className="text-white" />
          </button>
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

interface FilterProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

function FilterBar({ currentSort, onSortChange, searchQuery, onSearchChange }: FilterProps) {
  return (
    <div className="flex flex-col gap-2.5 w-full">
      <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4 py-2.5 border-b border-[#27272a]">
        <div className="flex items-center gap-[70px]">
          <h2 className="text-[24px] font-bold text-white leading-tight">
            Product List
          </h2>
        </div>

        <div className="flex flex-col md:flex-row flex-wrap items-center gap-4 md:gap-[55px] text-white w-full md:w-auto">
          
          <div className="flex flex-wrap items-center justify-between md:justify-start gap-4 md:gap-[55px] w-full md:w-auto">
            <button 
              onClick={() => onSortChange('newest')}
              className={`text-[12px] md:text-[16px] whitespace-nowrap transition-colors ${currentSort === 'newest' ? 'font-bold text-[#d032e5]' : 'font-medium hover:text-[#d032e5]'}`}
            >
              Newest
            </button>
            
            <button 
              onClick={() => onSortChange('price-low')}
              className={`text-[12px] md:text-[16px] whitespace-nowrap transition-colors ${currentSort === 'price-low' ? 'font-bold text-[#d032e5]' : 'font-medium hover:text-[#d032e5]'}`}
            >
              Price: Low to High
            </button>

             <button 
              onClick={() => onSortChange('price-high')}
              className={`text-[12px] md:text-[16px] whitespace-nowrap transition-colors ${currentSort === 'price-high' ? 'font-bold text-[#d032e5]' : 'font-medium hover:text-[#d032e5]'}`}
            >
              Price: High to Low
            </button>

            <button 
              onClick={() => onSortChange('a-z')}
              className={`flex items-center gap-1 text-[12px] md:text-[16px] whitespace-nowrap transition-colors ${currentSort === 'a-z' ? 'font-medium text-[#d032e5]' : 'font-medium hover:text-[#d032e5]'}`}
            >
              <SortAsc className="w-4 h-4" /> A to Z
            </button>

            <button 
              onClick={() => onSortChange('z-a')}
              className={`flex items-center gap-1 text-[12px] md:text-[16px] whitespace-nowrap transition-colors ${currentSort === 'z-a' ? 'font-medium text-[#d032e5]' : 'font-medium hover:text-[#d032e5]'}`}
            >
              <SortDesc className="w-4 h-4" /> Z to A
            </button>
          </div>

          <div className="relative w-full md:w-[275px]">
            <div className="bg-[#1e1e1e] h-[35px] rounded-full border border-[#444] flex items-center px-4 gap-2 focus-within:border-[#d032e5] transition-colors">
              <input 
                type="text" 
                placeholder="Search products..." 
                className="bg-transparent border-none outline-none text-[12px] md:text-[14px] text-white placeholder-white/40 flex-1"
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

export default function ExploreProduct({ onProductSelect }: { onProductSelect?: (product: any) => void }) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data.length > 0 ? data : productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts(productsData);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const togglePriceRange = (rangeId: string) => {
    setSelectedPriceRanges(prev => 
      prev.includes(rangeId)
        ? prev.filter(r => r !== rangeId)
        : [...prev, rangeId]
    );
  };

  const toggleRating = (rating: number) => {
    setSelectedRatings(prev => 
      prev.includes(rating) 
        ? prev.filter(r => r !== rating) 
        : [...prev, rating]
    );
  };

  // Calculate Category Counts
  const categoryCounts = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Filter Logic
  const filteredProducts = products.filter(product => {
    // 1. Category Filter
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    
    // 2. Search Filter
    const searchMatch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        product.creator.toLowerCase().includes(searchQuery.toLowerCase());

    // 3. Price Filter
    const priceMatch = selectedPriceRanges.length === 0 || selectedPriceRanges.some(rangeId => {
        const range = PRICE_RANGES.find(r => r.id === rangeId);
        return range ? product.price >= range.min && product.price <= range.max : false;
    });

    // 4. Rating Filter
    const ratingMatch = selectedRatings.length === 0 || selectedRatings.includes(product.rating);

    return categoryMatch && searchMatch && priceMatch && ratingMatch;
  });

  // Sort Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'a-z':
        return a.title.localeCompare(b.title);
      case 'z-a':
        return b.title.localeCompare(a.title);
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
                Explore Creative Marketplace
            </h1>
            <p className="text-gray-300 text-[16px] md:text-[18px]">
                Browse unique costumes, digital assets, merchandise, and creative services from your favorite creators.
            </p>
        </div>

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
            {/* Sidebar - Adjusted width to allow more space for grid */}
            <div className={`${isSidebarOpen ? 'flex' : 'hidden'} md:flex w-full md:w-[240px] flex-col gap-[30px] shrink-0`}>
               {/* Product Category */}
               <SidebarSection title="Product Category" defaultOpen={true}>
                    {['Costume', 'Merchandise', 'Digital', 'Service', 'Prop'].map((cat) => {
                        const isSelected = selectedCategories.includes(cat);
                        const count = categoryCounts[cat] || 0;
                        return (
                            <div 
                            key={cat} 
                            className={`flex items-center justify-between py-1 cursor-pointer rounded px-2 transition-colors ${isSelected ? 'bg-white/10' : 'hover:bg-white/5'}`}
                            onClick={() => toggleCategory(cat)}
                            >
                            <span className={`text-[14px] transition-colors ${isSelected ? 'text-[#d032e5] font-bold' : 'text-gray-300'}`}>{cat}</span>
                            <span className="text-[14px] text-gray-500">({count})</span>
                            </div>
                        )
                    })}
               </SidebarSection>

               {/* Price Range */}
               <SidebarSection title="Price" defaultOpen={true}>
                   {PRICE_RANGES.map((range) => {
                       const isSelected = selectedPriceRanges.includes(range.id);
                       return (
                           <div 
                            key={range.id}
                            className={`flex items-center gap-2 py-1 cursor-pointer rounded px-2 transition-colors ${isSelected ? 'bg-white/10' : 'hover:bg-white/5'}`}
                            onClick={() => togglePriceRange(range.id)}
                           >
                               <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${isSelected ? 'border-[#d032e5] bg-[#d032e5]/10' : 'border-gray-600'}`}>
                                    {isSelected && <Check size={12} className="text-[#d032e5]" />}
                               </div>
                               <span className={`text-[14px] ${isSelected ? 'text-white' : 'text-gray-300'}`}>{range.label}</span>
                           </div>
                       )
                   })}
               </SidebarSection>

               {/* Rating */}
               <SidebarSection title="Rating" defaultOpen={true}>
                    {[5, 4, 3, 2, 1].map((stars, i) => {
                        const isSelected = selectedRatings.includes(stars);
                        return (
                            <div 
                            key={`rating-${stars}-${i}`} 
                            className="flex items-center gap-3 p-2 hover:bg-white/5 rounded cursor-pointer group"
                            onClick={() => toggleRating(stars)}
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
                                <span className="text-[12px] text-gray-400">{stars === 5 ? "" : "& Up"}</span>
                            </div>
                        )
                    })}
               </SidebarSection>
            </div>

            {/* Grid - Adjusted to grid layout with 4 cols on lg screens */}
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
                {sortedProducts.length > 0 ? (
                  sortedProducts.map((product, index) => (
                      <ProductCard key={`product-${product.id || index}`} data={product} onClick={onProductSelect} />
                  ))
                ) : (
                  <div className="col-span-full w-full flex flex-col items-center justify-center py-20 text-center">
                    <p className="text-gray-400 text-lg">No products found matching your filters.</p>
                  </div>
                )}
            </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
