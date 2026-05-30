
import React, { useState, useEffect } from "react";
import { Star, MessageCircle, Share2, Heart, Send, Check, MoreHorizontal, UserPlus, UserCheck, Image as ImageIcon, Instagram, Twitter, Youtube, Globe, Crown, Zap, Shield, Bookmark, Smile, X, Search, SortAsc, ShoppingBag, ChevronRight, Trophy, Copy, Facebook, Linkedin, Link as LinkIcon } from "lucide-react";
import { Progress } from "./ui/progress";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogDescription } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

// Placeholder images reusing existing assets
const imgBanner = "https://lh3.googleusercontent.com/d/1nGaMCnUeumJTB6-P96n9ntMSi87FDXdf"; 
const imgAvatar = "https://lh3.googleusercontent.com/d/1h3GWacwUbXO7_PUSNWaWXFqygtqZs4V3";
const imgFan = "https://lh3.googleusercontent.com/d/1vzPTInYqz8nNJ35tz2TzjY1QUX7P0BbR";
const imgGrid1 = "https://lh3.googleusercontent.com/d/1h3GWacwUbXO7_PUSNWaWXFqygtqZs4V3";
const imgGrid2 = "https://lh3.googleusercontent.com/d/1nGaMCnUeumJTB6-P96n9ntMSi87FDXdf";
const imgGrid3 = "https://lh3.googleusercontent.com/d/1dpOwrgiwfee0M2R_kQtFlTJqu-GKLYXS";
const imgGrid4 = "https://lh3.googleusercontent.com/d/13wi6zNzDTnNyQwIOlapuAQkjQI_xB2YT";
const imgGrid5 = "https://lh3.googleusercontent.com/d/139h177kzzKVtlJsldCkfDS3Bf0L3KUIE";
const imgGrid6 = "https://lh3.googleusercontent.com/d/1GlcgkoSnH7h5V41SCFVwHA81WnM4ZoTn";

// Mock Data for Support Board
const supportData = [
  { id: 1, user: "Benz", type: "Photopack", item: "Spicy Kurumi Photopack🧧", price: "Rp 100.000", message: "Notes: mantab", time: "19 days ago", reply: "Haaalllooo Im so sorry baru buka haluapp lagii TwT I hope you lovee itt yaaah❤️", replyUser: "Fareye Closhartt", avatarColor: "from-orange-400 to-red-500" },
  { id: 2, user: "KaelThas", type: "Tipping", item: "Coffee Treat ☕", price: "Rp 25.000", message: "Semangat terus kak kontennya!", time: "2 hours ago", reply: null, avatarColor: "from-blue-400 to-cyan-500" },
  { id: 3, user: "LinaInverse", type: "Voice Pack", item: "Morning Alarm", price: "Rp 50.000", message: "Suaranya adem banget...", time: "1 day ago", reply: "Makasih kak Lina! Semoga bangun pagi terus ya hehe", replyUser: "Fareye Closhartt", avatarColor: "from-pink-400 to-rose-500" },
  { id: 4, user: "Arthas", type: "Saweria", item: "Nasi Padang", price: "Rp 35.000", message: "Makan bang", time: "3 days ago", reply: null, avatarColor: "from-purple-400 to-indigo-500" },
  { id: 5, user: "Jaina", type: "Photopack", item: "Summer Vibes 🏖️", price: "Rp 150.000", message: "Cantik banget kak!", time: "5 days ago", reply: "Thank you Jaina! <3", replyUser: "Fareye Closhartt", avatarColor: "from-green-400 to-emerald-500" },
  { id: 6, user: "Thrall", type: "Support", item: "Energy Drink", price: "Rp 10.000", message: "For the Horde!", time: "1 week ago", reply: null, avatarColor: "from-yellow-400 to-amber-500" },
];

// Mock Data for Leaderboard
const leaderboardData = [
    { id: 1, name: "Sultan_Indo", total: 15500000, image: imgFan },
    { id: 2, name: "Raja_Sawer", total: 12000000, image: imgFan },
    { id: 3, name: "Boss_Muda", total: 9500000, image: imgFan },
    { id: 4, name: "KaelThas", total: 5000000, image: imgFan },
    { id: 5, name: "Jaina Proudmoore", total: 4200000, image: imgFan },
    { id: 6, name: "Arthas Menethil", total: 3800000, image: imgFan },
    { id: 7, name: "Sylvanas", total: 3000000, image: imgFan },
    { id: 8, name: "Thrall", total: 2500000, image: imgFan },
    { id: 9, name: "Illidan", total: 2000000, image: imgFan },
    { id: 10, name: "Tyrande", total: 1500000, image: imgFan },
];

// Mock Data for Supporting Leaderboard (My Top Supported)
const supportingLeaderboard = [
    { id: 1, name: "Zenyth Prime", total: 5500000, image: imgGrid1 },
    { id: 2, name: "Avianna Skylark", total: 3200000, image: imgGrid3 },
    { id: 3, name: "Fareye Closhartt", total: 1500000, image: imgGrid5 },
    { id: 4, name: "Celeste Moon", total: 750000, image: imgGrid2 },
    { id: 5, name: "Garen Might", total: 500000, image: imgGrid4 },
];

// Mock Data for Posts
const postsData = [
  { 
    id: 1, 
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec sapien fermentum, rhoncus arcu sit amet, aliquet risus. Vestibulum tempus, nunc in luctus lobortis...", 
    likes: 99, 
    comments: 135, 
    shares: 10, 
    time: "2h ago" 
  },
  { 
    id: 2, 
    content: "Just finished a new cosplay prop! It was a challenge to get the weathering right, but I think it turned out great. What do you think? 🛡️✨", 
    likes: 245, 
    comments: 42, 
    shares: 15, 
    time: "6h ago" 
  },
  { 
    id: 3, 
    content: "Thank you to everyone who joined the stream last night! You guys are the best community ever. Stay tuned for next week's schedule! 🎮💜", 
    likes: 532, 
    comments: 120, 
    shares: 89, 
    time: "1d ago" 
  },
  {
    id: 4,
    content: "New exclusive photopack is dropping this weekend! Make sure you are subscribed to the 'Warrior' tier or higher to get early access! 📸🔥",
    likes: 310,
    comments: 67,
    shares: 40,
    time: "2d ago"
  }
];

// Mock Data for Feed Grid
const feedGridData = [
    { id: 101, image: imgGrid1, likes: 1240, comments: 35, caption: "Behind the scenes of the latest shoot! 📸✨ #cosplay #bts", time: "1d ago" },
    { id: 102, image: imgGrid2, likes: 890, comments: 12, caption: "New profile pic, who dis? 😎", time: "2d ago" },
    { id: 103, image: imgGrid3, likes: 2100, comments: 89, caption: "Thank you for the amazing fan art! ❤️🎨", time: "3d ago" },
    { id: 104, image: imgGrid4, likes: 560, comments: 20, caption: "Check out my new merch collection! Link in bio.", time: "4d ago" },
    { id: 105, image: imgGrid5, likes: 1100, comments: 45, caption: "Throwback to Comifuro! 🦊 It was so much fun meeting everyone.", time: "5d ago" },
    { id: 106, image: imgGrid6, likes: 950, comments: 30, caption: "Streaming tonight at 8 PM! Be there! 🎮", time: "6d ago" },
    { id: 107, image: imgGrid2, likes: 1500, comments: 60, caption: "Just vibing 🌸", time: "1w ago" },
    { id: 108, image: imgGrid4, likes: 2300, comments: 112, caption: "Collaboration with @zenyth coming soon!", time: "1w ago" },
    { id: 109, image: imgGrid1, likes: 800, comments: 25, caption: "My setup tour is up on YouTube!", time: "2w ago" },
];

// Mock Data for Products
const productsData = [
  { id: 1, title: "Raiden Shogun Cosplay", category: "Costume", creator: "Fareye Closhartt", username: "@fareyecloshartt", price: 1200000, image: imgGrid1, verified: true, date: "2023-12-01", rating: 5 },
  { id: 2, title: "Hololive Sticker Pack", category: "Merchandise", creator: "Fareye Closhartt", username: "@fareyecloshartt", price: 45000, image: imgGrid2, verified: true, date: "2023-11-20", rating: 4 },
  { id: 3, title: "Custom Wig Styling", category: "Service", creator: "Fareye Closhartt", username: "@fareyecloshartt", price: 350000, image: imgGrid3, verified: true, date: "2024-01-05", rating: 5 },
  { id: 4, title: "Digital Art Commission", category: "Digital", creator: "Fareye Closhartt", username: "@fareyecloshartt", price: 500000, image: imgGrid4, verified: true, date: "2023-10-15", rating: 3 },
  { id: 5, title: "Cosplay Prop Sword", category: "Prop", creator: "Fareye Closhartt", username: "@fareyecloshartt", price: 850000, image: imgGrid5, verified: true, date: "2023-09-10", rating: 5 },
  { id: 6, title: "Voice Pack Vol.1", category: "Digital", creator: "Fareye Closhartt", username: "@fareyecloshartt", price: 9000, image: imgGrid6, verified: true, date: "2023-12-25", rating: 4 },
];

// Mock Data for Followers
const followersData = [
  { id: 1, name: "Zenyth Prime", role: "Cosplayer", rating: 5, verified: true, image: imgGrid1, banner: imgGrid2 },
  { id: 2, name: "Avianna Skylark", role: "Vtuber", rating: 4, verified: true, image: imgGrid3, banner: imgGrid4 },
  { id: 3, name: "Braum Shield", role: "Illustrator", rating: 3, verified: false, image: imgGrid5, banner: imgGrid6 },
  { id: 4, name: "Celeste Moon", role: "Vtuber", rating: 5, verified: true, image: imgGrid2, banner: imgGrid1 },
  { id: 5, name: "Garen Might", role: "Cosplayer", rating: 5, verified: true, image: imgGrid4, banner: imgGrid3 },
  { id: 6, name: "Draven Axe", role: "Streamer", rating: 4, verified: true, image: imgGrid6, banner: imgGrid5 },
  { id: 7, name: "Lux Light", role: "Cosplayer", rating: 5, verified: true, image: imgGrid1, banner: imgGrid3 },
  { id: 8, name: "Jinx Chaos", role: "Gamer", rating: 4, verified: false, image: imgGrid2, banner: imgGrid4 },
  { id: 9, name: "Ezreal Explorer", role: "Illustrator", rating: 5, verified: true, image: imgGrid3, banner: imgGrid5 },
  { id: 10, name: "Ahri Fox", role: "Vtuber", rating: 5, verified: true, image: imgGrid4, banner: imgGrid6 },
  { id: 11, name: "Yasuo Wind", role: "Gamer", rating: 3, verified: false, image: imgGrid5, banner: imgGrid1 },
  { id: 12, name: "Vi Enforcer", role: "Cosplayer", rating: 4, verified: true, image: imgGrid6, banner: imgGrid2 },
  { id: 13, name: "Caitlyn Sniper", role: "Illustrator", rating: 5, verified: true, image: imgGrid1, banner: imgGrid4 },
  { id: 14, name: "Ekko Time", role: "Streamer", rating: 4, verified: true, image: imgGrid2, banner: imgGrid5 },
  { id: 15, name: "Seraphine Song", role: "Vtuber", rating: 5, verified: true, image: imgGrid3, banner: imgGrid6 },
  { id: 16, name: "Akali Rogue", role: "Cosplayer", rating: 4, verified: true, image: imgGrid4, banner: imgGrid1 },
  { id: 17, name: "Kai'sa Void", role: "Illustrator", rating: 5, verified: true, image: imgGrid5, banner: imgGrid2 },
  { id: 18, name: "Evelynn Shadow", role: "Vtuber", rating: 4, verified: false, image: imgGrid6, banner: imgGrid3 },
  { id: 19, name: "Sett Boss", role: "Gamer", rating: 5, verified: true, image: imgGrid1, banner: imgGrid5 },
  { id: 20, name: "Yone Spirit", role: "Streamer", rating: 4, verified: true, image: imgGrid2, banner: imgGrid6 },
  { id: 21, name: "Lillia Dream", role: "Illustrator", rating: 3, verified: false, image: imgGrid3, banner: imgGrid1 },
  { id: 22, name: "Teemo Scout", role: "Gamer", rating: 2, verified: false, image: imgGrid4, banner: imgGrid2 },
  { id: 23, name: "Thresh Chain", role: "Cosplayer", rating: 5, verified: true, image: imgGrid5, banner: imgGrid3 },
  { id: 24, name: "Vayne Hunter", role: "Streamer", rating: 4, verified: true, image: imgGrid6, banner: imgGrid4 },
  { id: 25, name: "Riven Exile", role: "Gamer", rating: 5, verified: true, image: imgGrid1, banner: imgGrid6 },
  { id: 26, name: "Irelia Blade", role: "Cosplayer", rating: 4, verified: true, image: imgGrid2, banner: imgGrid5 },
  { id: 27, name: "Sona Maven", role: "Vtuber", rating: 5, verified: true, image: imgGrid3, banner: imgGrid4 },
  { id: 28, name: "Soraka Star", role: "Illustrator", rating: 4, verified: true, image: imgGrid4, banner: imgGrid3 },
  { id: 29, name: "Nami Tide", role: "Vtuber", rating: 3, verified: false, image: imgGrid5, banner: imgGrid2 },
  { id: 30, name: "Miss Fortune", role: "Cosplayer", rating: 5, verified: true, image: imgGrid6, banner: imgGrid1 },
];

// Subscription Tiers Data
const subscriptionTiers = [
    {
        id: 1,
        name: "Sugar Candy Tier",
        image: imgGrid5,
        description: "Go beyond the limit and get exclusive contents by subscribing to your Favourite Creator",
        plans: [
            { label: "1-Month Plan", price: 50000 },
            { label: "3-Month Package", price: 135000 },
            { label: "6-Month Deal", price: 250000 },
            { label: "Annual Plan", price: 500000 },
        ],
        features: [
            "Unlock all Post Content",
            "Join My Community",
            "Discord/ Fam Group Access",
            "Up to 10 digital photoshot for you"
        ]
    },
    {
        id: 2,
        name: "Chocolate Bar Tier",
        image: imgGrid6,
        description: "Get more exclusive content and direct interaction with your favorite creator.",
        plans: [
            { label: "1-Month Plan", price: 75000 },
            { label: "3-Month Package", price: 200000 },
            { label: "6-Month Deal", price: 380000 },
            { label: "Annual Plan", price: 750000 },
        ],
        features: [
            "All Sugar Candy Tier Benefits",
            "Exclusive Video Content",
            "Monthly Live Stream Access",
            "Priority Reply on DM"
        ]
    },
    {
        id: 3,
        name: "Royal Cake Tier",
        image: imgGrid1,
        description: "The ultimate support tier for true fans. Get everything and more.",
        plans: [
            { label: "1-Month Plan", price: 150000 },
            { label: "3-Month Package", price: 400000 },
            { label: "6-Month Deal", price: 750000 },
            { label: "Annual Plan", price: 1400000 },
        ],
        features: [
            "All Chocolate Bar Benefits",
            "Personalized Video Message",
            "Merchandise Discount 10%",
            "Early Access to New Products"
        ]
    }
];

const topSupporters = [
    { rank: 1, name: "Sultan_Indo", image: imgFan },
    { rank: 2, name: "Raja_Sawer", image: imgFan },
    { rank: 3, name: "Boss_Muda", image: imgFan },
];

const membershipTiers = [
    { id: 1, name: "Villager", price: "IDR 15k", icon: <Shield size={14} />, color: "bg-blue-500" },
    { id: 2, name: "Warrior", price: "IDR 50k", icon: <Zap size={14} />, color: "bg-purple-500" },
    { id: 3, name: "Hero", price: "IDR 100k", icon: <Crown size={14} />, color: "bg-orange-500" },
];

const PRICE_RANGES = [
    { id: 'under-10k', label: "Under 10.000", min: 0, max: 9999 },
    { id: '10k-25k', label: "10.000 - 24.999", min: 10000, max: 24999 },
    { id: '25k-50k', label: "25.000 - 49.999", min: 25000, max: 49999 },
    { id: '50k-75k', label: "50.000 - 74.999", min: 50000, max: 74999 },
    { id: '75k-100k', label: "75.000 - 99.999", min: 75000, max: 99999 },
    { id: 'above-100k', label: "Above 100.000", min: 100000, max: Infinity },
];

const mockComments = [
    { id: 1, user: "cosplay_lover", text: "This is absolutely stunning! The details are insane 😍", time: "2h" },
    { id: 2, user: "gaming_wizard", text: "Can't wait to see more of this set!", time: "5h" },
    { id: 3, user: "artistic_soul", text: "Lighting on point 🔥", time: "1d" },
];

// Helper for formatting price
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
};

function SidebarSection({ title, children, defaultOpen = true }: { title: string, children?: React.ReactNode, defaultOpen?: boolean }) {
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

export default function CreatorDetail({ creator, onProductSelect, onCreatorSelect }: { creator?: any, onProductSelect?: (product: any) => void, onCreatorSelect?: (creator: any) => void }) {
  const [activeTab, setActiveTab] = useState("Home");
  const [membershipIndex, setMembershipIndex] = useState(0);
  const [selectedPost, setSelectedPost] = useState<typeof feedGridData[0] | null>(null);
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false);
  
  // Follow State
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(1927);

  // Share State
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Subscription Plan Selection State (Defaulting index 0 selected for each of the 3 cards)
  const [tierSelections, setTierSelections] = useState<Record<number, number>>({ 0: 0, 1: 0, 2: 0 });
  const [isSubscriptionDialogOpen, setIsSubscriptionDialogOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<any>(null);

  // Products Tab Specific States
  const [productSort, setProductSort] = useState<'newest' | 'price-low' | 'price-high' | 'a-z'>('newest');
  const [productSearch, setProductSearch] = useState('');
  const [selectedProductCategories, setSelectedProductCategories] = useState<string[]>([]);
  const [selectedProductPriceRanges, setSelectedProductPriceRanges] = useState<string[]>([]);
  const [selectedProductRatings, setSelectedProductRatings] = useState<number[]>([]);

  // Post Interactive States
  const [posts, setPosts] = useState(postsData.map(post => ({ ...post, isLiked: false })));
  const [commentInputs, setCommentInputs] = useState<Record<number, string>>({});

  // Auto-play for Membership Stack
  useEffect(() => {
    const interval = setInterval(() => {
        setMembershipIndex((prev) => (prev + 1) % membershipTiers.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handlePostClick = (post: typeof feedGridData[0]) => {
    setSelectedPost(post);
    setIsPostDialogOpen(true);
  };

  const handleSubscriptionClick = (tier: any, index: number) => {
    const selectedPlanIndex = tierSelections[index] || 0;
    const selectedPlan = tier.plans[selectedPlanIndex];
    
    setSelectedSubscription({
        ...tier,
        selectedPlan,
        selectedPlanIndex // Store index if needed for display logic
    });
    setIsSubscriptionDialogOpen(true);
  };

  const toggleProductCategory = (category: string) => {
    setSelectedProductCategories(prev => 
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const toggleProductPriceRange = (rangeId: string) => {
    setSelectedProductPriceRanges(prev => 
      prev.includes(rangeId) ? prev.filter(r => r !== rangeId) : [...prev, rangeId]
    );
  };

  const toggleProductRating = (rating: number) => {
    setSelectedProductRatings(prev => 
      prev.includes(rating) ? prev.filter(r => r !== rating) : [...prev, rating]
    );
  };

  // Follow Function
  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
    setFollowerCount(prev => isFollowing ? prev - 1 : prev + 1);
  };

  // Copy Link Function
  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://cosmic.app/creator/fareyecloshartt");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Post Interactive Functions
  const handleLike = (postId: number) => {
    setPosts(currentPosts => currentPosts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const handleCommentChange = (postId: number, value: string) => {
    setCommentInputs(prev => ({...prev, [postId]: value}));
  };

  const handleSendComment = (postId: number) => {
    if (!commentInputs[postId]?.trim()) return;
    
    setPosts(currentPosts => currentPosts.map(post => 
        post.id === postId ? { ...post, comments: post.comments + 1 } : post
    ));
    
    // Clear input
    setCommentInputs(prev => ({...prev, [postId]: ""}));
  };

  const handleSharePost = (postId: number) => {
    // Just open the share dialog for now
    setIsShareOpen(true);
  };

  // Filter & Sort Logic for Products
  const filteredProducts = productsData.filter(product => {
    const categoryMatch = selectedProductCategories.length === 0 || selectedProductCategories.includes(product.category);
    const searchMatch = product.title.toLowerCase().includes(productSearch.toLowerCase());
    const priceMatch = selectedProductPriceRanges.length === 0 || selectedProductPriceRanges.some(rangeId => {
        const range = PRICE_RANGES.find(r => r.id === rangeId);
        return range ? product.price >= range.min && product.price <= range.max : false;
    });
    const ratingMatch = selectedProductRatings.length === 0 || selectedProductRatings.includes(product.rating);
    return categoryMatch && searchMatch && priceMatch && ratingMatch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (productSort) {
      case 'newest': return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'a-z': return a.title.localeCompare(b.title);
      default: return 0;
    }
  });

  return (
    <div className="bg-black min-h-screen w-full pt-[80px] text-white font-sans animate-in fade-in zoom-in-95 duration-500 flex flex-col items-center">
      
      <div className="w-full max-w-[1440px] px-4 md:px-10 pb-20">
        
        {/* Banner Area */}
        <div className="relative w-full h-[120px] md:h-[300px] rounded-b-[24px] md:rounded-[24px] overflow-hidden bg-gray-900 mt-0 md:mt-6">
            <img src={imgBanner} className="w-full h-full object-cover opacity-80" alt="Banner" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </div>

        {/* Profile Header Content */}
        <div className="relative px-2 md:px-10 -mt-[40px] md:-mt-[100px] z-10 mb-8">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-4 md:gap-8">
                
                {/* Avatar */}
                <div className="w-[80px] h-[80px] md:w-[160px] md:h-[160px] rounded-[24px] md:rounded-[32px] border-4 border-black bg-black overflow-hidden shrink-0 shadow-2xl">
                    <img src={imgAvatar} className="w-full h-full object-cover" alt="Fareye" />
                </div>

                {/* Info & Stats */}
                <div className="flex-1 flex flex-col md:flex-row items-center md:items-end justify-between w-full gap-4 text-center md:text-left">
                    <div className="flex flex-col gap-1 md:gap-2 items-center md:items-start">
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl md:text-4xl font-bold leading-tight">{creator?.name || "Fareye Closhartt"}</h1>
                            <div className="bg-[#0095f6] rounded-full p-1">
                                <Check size={12} className="text-white" strokeWidth={4} />
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm md:text-lg">@{creator?.name?.toLowerCase().replace(/\s+/g, '') || "fareyecloshartt"}</p>
                        
                        {/* Stats Row */}
                        <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 md:gap-6 mt-2">
                            <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                                <span className="font-bold text-xs md:text-sm">{postsData.length}</span>
                                <span className="text-gray-500 text-[10px] md:text-xs">Posts</span>
                            </div>
                            <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                                <Star className="text-yellow-400 fill-yellow-400" size={12} />
                                <span className="font-bold text-xs md:text-sm">5.0</span>
                                <span className="text-gray-500 text-[10px] md:text-xs">(235 Reviews)</span>
                            </div>
                            <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                                <span className="font-bold text-xs md:text-sm">{followerCount}</span>
                                <span className="text-gray-500 text-[10px] md:text-xs">Followers</span>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 w-full md:w-auto mt-2 md:mt-0 justify-center">
                        <button 
                            onClick={toggleFollow}
                            className={`h-[36px] md:h-[44px] flex-1 md:flex-none px-6 md:px-8 font-bold rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer text-sm md:text-base ${isFollowing ? 'bg-[#27272a] text-white hover:bg-[#3f3f46]' : 'bg-[#006fee] text-white hover:bg-[#005bc4]'}`}
                        >
                            {isFollowing ? (
                                <><UserCheck size={18} /> Following</>
                            ) : (
                                <><UserPlus size={18} /> Follow</>
                            )}
                        </button>
                        <button 
                            onClick={() => setIsShareOpen(true)}
                            className="h-[36px] md:h-[44px] flex-1 md:flex-none px-6 md:px-8 bg-[#9353d3] text-white font-bold rounded-full hover:bg-[#7a40b5] transition-colors flex items-center justify-center gap-2 cursor-pointer text-sm md:text-base"
                        >
                            <Share2 size={18} /> Share
                        </button>
                    </div>
                </div>
            </div>

            {/* Bio Section */}
            <div className="mt-6 md:mt-8 max-w-[800px] mx-auto md:mx-0 text-center md:text-left flex flex-col gap-4">
                <div>
                    <h3 className="text-base md:text-lg font-bold text-white mb-1 md:mb-2">About Me</h3>
                    <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                        Im the strongest warrior from Ch.02, I am {creator?.name || "Fareye Closhartt"} and I will protect you with all my soul.
                    </p>
                </div>
                
                {/* Social Media Icons */}
                <div className="flex items-center justify-center md:justify-start gap-3">
                    <button className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-gray-400 hover:text-[#E1306C] transition-all cursor-pointer">
                        <Instagram size={18} />
                    </button>
                    <button className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-gray-400 hover:text-[#1DA1F2] transition-all cursor-pointer">
                        <Twitter size={18} />
                    </button>
                    <button className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-gray-400 hover:text-[#FF0000] transition-all cursor-pointer">
                        <Youtube size={18} />
                    </button>
                    <button className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-gray-400 hover:text-white transition-all cursor-pointer">
                        <Globe size={18} />
                    </button>
                </div>
            </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-800 mb-8 sticky top-[80px] bg-black/80 backdrop-blur-md z-40 mx-[-16px] px-[16px] md:mx-0 md:px-0">
            <div className="flex justify-start md:justify-center gap-6 md:gap-8 px-4 overflow-x-auto scrollbar-none">
                {['Home', 'Feeds', 'Products', 'Subscription', 'Followers', 'Supporters'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab === 'Supporters' ? 'Supporting' : tab)}
                        className={`pb-4 md:pb-5 text-sm md:text-lg font-medium transition-colors relative cursor-pointer whitespace-nowrap ${
                            activeTab === (tab === 'Supporters' ? 'Supporting' : tab) ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                        }`}
                    >
                        {tab}
                        {activeTab === (tab === 'Supporters' ? 'Supporting' : tab) && (
                            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white" />
                        )}
                    </button>
                ))}
            </div>
        </div>

        {/* Home Tab Content */}
        {activeTab === 'Home' && (
            <div className="flex flex-col gap-10">
                
                {/* Main Grid Content (Left Section, Feed, Right Sidebar) */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    
                    {/* Left Column (New Support Board & Membership Section) - Sticky */}
                    <div className="flex flex-col gap-6 lg:col-span-1 order-2 lg:order-1 lg:sticky lg:top-[140px] lg:h-fit lg:self-start">
                        
                        {/* New Support Board Section with Carousel */}
                        <div className="bg-[#0c0c0c] border border-[#27272a] rounded-[24px] p-4 md:p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <h3 className="text-lg md:text-xl font-bold text-white">Support Board</h3>
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            </div>
                            
                            <Carousel 
                                plugins={[
                                    Autoplay({
                                        delay: 4000,
                                        stopOnMouseEnter: true,
                                        stopOnInteraction: false,
                                    }),
                                ]}
                                opts={{
                                    align: "start",
                                    loop: true,
                                }}
                                className="w-full select-none"
                            >
                                <CarouselContent>
                                    {supportData.map((item) => (
                                        <CarouselItem key={item.id} className="basis-full">
                                            <div className="flex flex-col gap-3 p-4 rounded-xl bg-[#18181b] border border-white/5 hover:border-[#d032e5] transition-colors group cursor-grab active:cursor-grabbing">
                                                {/* Transaction Info */}
                                                <div className="flex gap-3">
                                                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${item.avatarColor} shrink-0 flex items-center justify-center text-xs font-bold text-white shadow-inner`}>
                                                        {item.user.charAt(0)}
                                                    </div>
                                                    
                                                    <div className="flex-1">
                                                        <p className="text-sm leading-relaxed text-gray-300">
                                                            <span className="font-bold text-white">{item.user}</span>
                                                            <span className="text-gray-400"> Membeli </span>
                                                            <span className="text-[#d032e5] font-medium">{item.type}</span>
                                                            <span className="font-medium text-white"> {item.item} </span>
                                                            <span className="text-gray-400">dengan harga </span>
                                                            <span className="font-bold text-white">{item.price}.</span>
                                                        </p>
                                                        <span className="text-[10px] text-gray-500 mt-1 block">{item.time}</span>
                                                    </div>
                                                </div>

                                                {/* User Message */}
                                                {item.message && (
                                                    <div className="bg-black/40 p-3 rounded-lg border border-white/5 ml-[44px] relative">
                                                        <div className="absolute -top-1 left-4 w-2 h-2 bg-black/40 border-t border-l border-white/5 transform rotate-45"></div>
                                                        <p className="text-xs text-gray-300 italic leading-relaxed">
                                                            "{item.message}"
                                                        </p>
                                                    </div>
                                                )}

                                                {/* Creator Reply */}
                                                {item.reply && (
                                                    <div className="flex gap-2 items-start ml-[44px] mt-1 relative animate-in fade-in slide-in-from-top-1 duration-300">
                                                        <div className="shrink-0 mt-0.5">
                                                            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M11.6414 14.6087C11.3973 14.3646 11.3973 13.9689 11.6414 13.7248L14.7411 10.6251L7.91667 10.6251C7.12221 10.6251 5.94443 10.3919 4.94731 9.67396C3.91832 8.93308 3.125 7.70378 3.125 5.83341C3.125 5.48824 3.40482 5.20841 3.75 5.20841C4.09518 5.20841 4.375 5.48824 4.375 5.83341C4.375 7.29638 4.97057 8.15041 5.67769 8.65954C6.41668 9.19161 7.32224 9.37508 7.91667 9.37508L14.7411 9.37508L11.6414 6.27536C11.3973 6.03128 11.3973 5.63555 11.6414 5.39147C11.8855 5.14739 12.2812 5.14739 12.5253 5.39147C12.2812 14.8528 11.8855 14.8528 11.6414 14.6087Z" fill="white"/>
                                                            </svg>
                                                        </div>
                                                        <p className="text-xs leading-relaxed text-gray-400">
                                                            <span className="font-bold text-white mr-1">{item.replyUser}</span>
                                                            {item.reply}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                            </Carousel>
                        </div>

                        {/* Membership Section */}
                        <div className="bg-[#0c0c0c] border border-[#27272a] rounded-[24px] p-4 md:p-6 sticky top-[100px]">
                            <h3 className="text-lg md:text-xl font-bold mb-6">Membership</h3>
                            
                            {/* Membership Stack Carousel */}
                            <div className="relative h-[220px] w-full mb-6">
                                {membershipTiers.map((tier, index) => {
                                    // Calculate visual position (0 = Front, 1 = Middle, 2 = Back)
                                    const position = (index - membershipIndex + membershipTiers.length) % membershipTiers.length;
                                    
                                    let positionClasses = "";
                                    if (position === 0) positionClasses = "z-30 top-0 scale-100 opacity-100";
                                    else if (position === 1) positionClasses = "z-20 top-4 scale-95 opacity-60";
                                    else if (position === 2) positionClasses = "z-10 top-8 scale-90 opacity-30";
                                    else positionClasses = "z-0 top-12 scale-80 opacity-0"; // Fallback for safety

                                    return (
                                        <div 
                                            key={tier.id} 
                                            className={`absolute w-full bg-[#18181b] rounded-[18px] p-4 border border-white/5 shadow-xl transition-all duration-700 ease-in-out cursor-pointer group hover:border-[#d032e5] ${positionClasses}`}
                                        >
                                            <div className="flex items-center justify-between mb-3">
                                                <div className={`flex items-center gap-2 px-2.5 py-1 rounded-md ${tier.color} text-white`}>
                                                    {tier.icon}
                                                    <span className="text-xs font-bold">{tier.name}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-baseline gap-1 mb-2">
                                                <span className="text-xl font-bold text-white">{tier.price}</span>
                                            </div>
                                            <div className="w-full h-px bg-white/5 mb-3" />
                                            <div className="flex flex-col gap-1.5">
                                                <span className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Includes</span>
                                                <span className="text-xs text-gray-300">Exclusive Content & Badges</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <button className="w-full py-3 bg-white text-black rounded-full font-bold text-sm hover:bg-gray-200 transition-colors cursor-pointer">
                                View All Tiers
                            </button>
                        </div>
                    </div>

                    {/* Middle Column (Main Content - Feed) */}
                    <div className="lg:col-span-2 flex flex-col gap-8 order-1 lg:order-2">
                        
                        {/* Feed Posts */}
                        <div className="flex flex-col gap-6">
                            {posts.map((post) => (
                                <div key={post.id} className="bg-[#0c0c0c] border border-[#27272a] rounded-[24px] p-4 md:p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-full border border-gray-700 bg-black overflow-hidden">
                                                <img src={imgAvatar} className="w-full h-full object-cover" alt="avatar" />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-1">
                                                    <span className="font-bold text-white text-base">{creator?.name || "Fareye Closhartt"}</span>
                                                    <div className="bg-[#0095f6] rounded-full p-[3px]">
                                                        <Check size={10} className="text-white" strokeWidth={3} />
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-500 text-sm">
                                                    <span>@{creator?.name?.toLowerCase().replace(/\s+/g, '') || "fareyecloshartt"}</span>
                                                    <span>•</span>
                                                    <span>{post.time}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="text-gray-500 hover:text-white cursor-pointer"><MoreHorizontal size={24}/></button>
                                    </div>

                                    <p className="text-gray-300 text-base leading-relaxed mb-4">
                                        {post.content}
                                    </p>

                                    <div className="border-t border-white/5 py-4 flex items-center justify-between">
                                        <div className="flex gap-8">
                                            <button 
                                                onClick={() => handleLike(post.id)}
                                                className={`flex items-center gap-2 transition-colors group cursor-pointer ${post.isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                                            >
                                                <Heart size={20} className={`transition-all duration-300 ${post.isLiked ? 'fill-red-500 scale-110' : 'group-hover:fill-red-500'}`} />
                                                <span className={`text-sm font-medium ${post.isLiked ? 'text-red-500' : ''}`}>{post.likes}</span>
                                            </button>
                                            <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors cursor-pointer group">
                                                <MessageCircle size={20} className="group-hover:text-blue-400 transition-colors" />
                                                <span className="text-sm font-medium group-hover:text-blue-400">{post.comments}</span>
                                            </button>
                                            <button 
                                                onClick={() => handleSharePost(post.id)}
                                                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors cursor-pointer group"
                                            >
                                                <Share2 size={20} className="group-hover:text-green-400 transition-colors" />
                                                <span className="text-sm font-medium group-hover:text-green-400">{post.shares}</span>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex gap-3 items-center mt-2">
                                        <div className="w-10 h-10 rounded-full bg-gray-800 shrink-0 overflow-hidden border border-gray-700">
                                            <img src={imgAvatar} className="w-full h-full object-cover" alt="User" />
                                        </div>
                                        <div className="flex-1 relative">
                                            <input 
                                                type="text" 
                                                placeholder="Type your Comment..." 
                                                value={commentInputs[post.id] || ""}
                                                onChange={(e) => handleCommentChange(post.id, e.target.value)}
                                                onKeyDown={(e) => e.key === 'Enter' && handleSendComment(post.id)}
                                                className="w-full bg-[#18181b] border border-gray-800 rounded-full py-3 pl-5 pr-12 text-sm text-white focus:outline-none focus:border-[#d032e5] transition-colors placeholder-gray-500"
                                            />
                                            <button 
                                                onClick={() => handleSendComment(post.id)}
                                                className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors ${commentInputs[post.id]?.trim() ? 'text-[#d032e5] hover:bg-[#d032e5]/10' : 'text-gray-500 cursor-default'}`}
                                                disabled={!commentInputs[post.id]?.trim()}
                                            >
                                                <Send size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>

                    {/* Right Column (Sidebar) - Sticky */}
                    <div className="flex flex-col gap-8 lg:col-span-1 order-3 lg:sticky lg:top-[140px] lg:h-fit lg:self-start">
                        
                        {/* Top Supporter */}
                        <div className="bg-[#0c0c0c] border border-[#27272a] rounded-[24px] p-4 md:p-6">
                            <h3 className="text-lg md:text-xl font-bold mb-14">Top Supporter</h3>
                            
                            <div className="flex flex-col gap-6 mb-8">
                                {/* Top 3 Podium */}
                                <div className="flex items-end justify-center gap-3">
                                    {/* Rank 2 */}
                                    <div className="flex flex-col items-center gap-2 order-1">
                                        <div className="w-14 h-14 rounded-[18px] border-2 border-gray-600 overflow-hidden relative shadow-lg">
                                            <img src={topSupporters[1].image} className="w-full h-full object-cover" alt="Rank 2" />
                                            <div className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[10px] font-bold text-center py-0.5">2</div>
                                        </div>
                                        <span className="text-xs text-center text-gray-300 font-medium truncate w-[60px]">{topSupporters[1].name}</span>
                                    </div>

                                    {/* Rank 1 */}
                                    <div className="flex flex-col items-center gap-2 order-2 -mt-6">
                                        <div className="relative">
                                            <div className="w-[72px] h-[72px] rounded-[22px] border-2 border-[#ffd700] overflow-hidden shadow-xl shadow-yellow-900/20 z-10 relative">
                                                <img src={topSupporters[0].image} className="w-full h-full object-cover" alt="Rank 1" />
                                                <div className="absolute bottom-0 inset-x-0 bg-[#ffd700] text-black text-[12px] font-bold text-center py-0.5">1</div>
                                            </div>
                                        </div>
                                        <span className="text-sm text-center text-[#ffd700] font-bold truncate w-[80px]">{topSupporters[0].name}</span>
                                    </div>

                                    {/* Rank 3 */}
                                    <div className="flex flex-col items-center gap-2 order-3">
                                        <div className="w-14 h-14 rounded-[18px] border-2 border-orange-700 overflow-hidden relative shadow-lg">
                                            <img src={topSupporters[2].image} className="w-full h-full object-cover" alt="Rank 3" />
                                            <div className="absolute bottom-0 inset-x-0 bg-orange-700/80 text-white text-[10px] font-bold text-center py-0.5">3</div>
                                        </div>
                                        <span className="text-xs text-center text-gray-300 font-medium truncate w-[60px]">{topSupporters[2].name}</span>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full py-3 bg-transparent border border-gray-600 rounded-full text-white font-bold text-base hover:bg-white hover:text-black transition-colors cursor-pointer">
                                Support {creator?.name || "Fareye Closhartt"}
                            </button>
                        </div>

                        {/* Wishlist */}
                        <div className="bg-[#0c0c0c] border border-[#27272a] rounded-[24px] p-4 md:p-6">
                            <h3 className="text-lg md:text-xl font-bold mb-6">Wishlist</h3>
                            
                            <div className="flex gap-4 mb-6">
                                <div className="w-24 h-24 rounded-[18px] bg-gray-800 shrink-0 border border-gray-700 flex items-center justify-center">
                                    <ImageIcon size={32} className="text-gray-500" />
                                </div>
                                <p className="text-sm text-gray-300 leading-relaxed italic py-1">
                                    "Bantu wujudkan wishlist-ku, yuk! ✨ Dengan dukungan kalian, mimpi ini makin dekat!"
                                </p>
                            </div>
                            
                            <div className="mb-6">
                                <div className="flex justify-between text-sm font-bold mb-2 text-gray-400">
                                    <span>Rp 900.000 / Rp 1.000.000</span>
                                    <span className="text-[#006fee]">90% Fulfilled</span>
                                </div>
                                <Progress value={90} className="h-2 bg-gray-800" />
                            </div>

                            {/* Donation Buttons */}
                            <div className="flex items-center border border-gray-700 rounded-lg overflow-hidden h-[40px] mb-2 focus-within:border-[#d032e5] transition-colors">
                                <div className="bg-gray-800 px-3 h-full flex items-center text-xs text-gray-400 font-bold border-r border-gray-700 shrink-0">IDR</div>
                                <input 
                                    type="number" 
                                    placeholder="10.000" 
                                    className="flex-1 h-full bg-transparent px-3 text-sm font-bold text-white placeholder-gray-600 focus:outline-none"
                                />
                            </div>
                            
                            <div className="grid grid-cols-4 gap-2 mb-4">
                                {['25k', '50k', '100k', '250k'].map((amt) => (
                                    <button key={amt} className="border border-gray-700 rounded-lg h-[40px] text-sm font-bold hover:bg-gray-800 transition-colors cursor-pointer">
                                        {amt}
                                    </button>
                                ))}
                            </div>

                            <div className="relative mb-4">
                                <input 
                                    type="text" 
                                    placeholder="Send a message..." 
                                    className="w-full bg-[#18181b] border border-gray-700 rounded-lg py-3 px-4 text-sm text-white focus:outline-none focus:border-[#d032e5] transition-colors"
                                />
                            </div>

                            <button className="w-full py-3 bg-white text-black rounded-full font-bold text-base hover:bg-gray-200 transition-all cursor-pointer shadow-lg shadow-white/10">
                                Tip this Wishlist
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        )}

        {/* Subscription Tab Content */}
        {activeTab === 'Subscription' && (
            <div className="flex items-start justify-center gap-[20px] md:gap-[40px] p-4 md:p-10 relative flex-wrap">
                {subscriptionTiers.map((tier, index) => (
                    <div key={tier.id} className="flex flex-col w-full md:w-[304px] items-start gap-1 relative bg-[#0c0c0c] rounded-[20px] border-2 border-solid border-white overflow-hidden pb-4">
                        {/* Image Area with Gradient */}
                        <div className="relative self-stretch w-full aspect-[1]">
                            <img
                                className="w-full h-full object-cover"
                                alt={tier.name}
                                src={tier.image}
                            />
                            {/* Gradient Overlay: Transparent top -> Black bottom */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-[#0c0c0c]" />
                            
                            {/* Tier Title (Absolute as per design, adjusted for gradient visibility) */}
                            <div className="absolute bottom-0 left-0 w-full flex justify-center z-10">
                                 <div className="text-white text-3xl font-bold drop-shadow-md tracking-wide text-center px-2">
                                    {tier.name}
                                 </div>
                            </div>
                        </div>

                        <div className="flex h-auto items-start justify-center gap-2.5 p-2.5 relative self-stretch w-full">
                            <p className="relative flex items-center justify-center flex-1 text-white text-base text-center tracking-wide leading-relaxed">
                                <span>
                                    {tier.description.length > 77
                                        ? `${tier.description.substring(0, 77)}...`
                                        : tier.description}
                                </span>
                            </p>
                        </div>

                        <div className="flex flex-col items-center justify-center p-2.5 w-full gap-2">
                            <div className="text-gray-400 text-base tracking-wider uppercase font-bold">
                                Subscription Plan
                            </div>

                            <div className="flex flex-col items-start justify-center relative self-stretch w-full bg-[#ffffff0d] rounded-[10px] overflow-hidden">
                                {tier.plans.map((plan, i) => {
                                    const isSelected = tierSelections[index] === i;
                                    return (
                                        <div 
                                            key={i} 
                                            onClick={() => setTierSelections(prev => ({...prev, [index]: i}))}
                                            className={`flex h-9 items-center gap-2 p-2 w-full cursor-pointer transition-colors border-b border-white/5 last:border-0 ${isSelected ? 'bg-white/10' : 'hover:bg-white/5'}`}
                                        >
                                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${isSelected ? 'border-[#d032e5] bg-[#d032e5]' : 'border-white/50'}`}>
                                                {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                                            </div>
                                            <div className={`flex-1 text-sm font-medium ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                                                {plan.label}
                                            </div>
                                            <div className={`text-sm font-bold whitespace-nowrap ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                                                {plan.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-center gap-2.5 p-2.5 relative self-stretch w-full">
                            <div className="text-gray-400 text-base tracking-wider uppercase font-bold">
                                What’s Included
                            </div>

                            <div className="flex flex-col items-start justify-center relative self-stretch w-full gap-1">
                                {tier.features.map((text, i) => (
                                    <div key={i} className="flex items-center gap-2 p-1 w-full">
                                        <Check size={16} className="text-white shrink-0" />
                                        <div className="text-white text-sm font-medium leading-tight">
                                            {text}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-center p-2.5 w-full mt-auto">
                            <button 
                                onClick={() => handleSubscriptionClick(tier, index)}
                                className="flex h-10 items-center justify-center gap-2 w-full bg-[#8600a1] rounded-xl hover:bg-[#6a0080] transition-colors cursor-pointer text-white shadow-lg shadow-[#8600a1]/20"
                            >
                                <span className="text-base font-bold tracking-wide">
                                    Get Started
                                </span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        )}

        {/* Feeds Tab Content */}
        {activeTab === 'Feeds' && (
            <div className="w-full">
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1 md:gap-4 lg:gap-8">
                    {feedGridData.map((item) => (
                        <div 
                            key={item.id} 
                            onClick={() => handlePostClick(item)}
                            className="relative aspect-square group overflow-hidden bg-[#18181b] cursor-pointer rounded-lg"
                        >
                            <img 
                                src={item.image} 
                                alt={`Feed ${item.id}`} 
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6">
                                <div className="flex items-center gap-2 text-white font-bold">
                                    <Heart className="fill-white" size={20} />
                                    <span>{item.likes}</span>
                                </div>
                                <div className="flex items-center gap-2 text-white font-bold">
                                    <MessageCircle className="fill-white" size={20} />
                                    <span>{item.comments}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* Products Tab Content */}
        {activeTab === 'Products' && (
            <div className="flex flex-col md:flex-row gap-10 items-start w-full">
                {/* Sidebar with Search and Sort at the top */}
                <div className="w-full md:w-[280px] flex flex-col gap-8 shrink-0">
                    
                    {/* Search Bar */}
                    <div className="flex flex-col gap-2">
                        <h3 className="text-xl font-bold text-white mb-2">Search</h3>
                        <div className="relative w-full">
                            <div className="bg-[#1e1e1e] h-[40px] rounded-xl border border-[#444] flex items-center px-4 gap-2 focus-within:border-[#d032e5] transition-colors">
                                <input 
                                    type="text" 
                                    placeholder="Search products..." 
                                    className="bg-transparent border-none outline-none text-base text-white placeholder-white/40 flex-1"
                                    value={productSearch}
                                    onChange={(e) => setProductSearch(e.target.value)}
                                />
                                <Search size={18} className="text-white shrink-0" />
                            </div>
                        </div>
                    </div>

                    {/* Vertical Sort Options */}
                    <SidebarSection title="Sort By" defaultOpen={true}>
                        {[
                            { id: 'newest', label: 'Newest' },
                            { id: 'price-low', label: 'Price: Low to High' },
                            { id: 'price-high', label: 'Price: High to Low' },
                            { id: 'a-z', label: 'A to Z' }
                        ].map((option) => (
                            <button
                                key={option.id}
                                onClick={() => setProductSort(option.id as any)}
                                className={`w-full text-left px-4 py-2 rounded-xl text-base font-medium transition-colors ${productSort === option.id ? 'bg-[#d032e5] text-white shadow-lg shadow-[#d032e5]/20' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'}`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </SidebarSection>

                    {/* Product Categories */}
                    <SidebarSection title="Categories" defaultOpen={true}>
                        {['Costume', 'Merchandise', 'Digital', 'Service', 'Prop'].map((cat) => {
                            const isSelected = selectedProductCategories.includes(cat);
                            return (
                                <div 
                                    key={cat}
                                    onClick={() => toggleProductCategory(cat)}
                                    className={`flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer transition-colors ${isSelected ? 'bg-white/10' : 'hover:bg-white/5'}`}
                                >
                                    <span className={`text-base ${isSelected ? 'text-[#d032e5] font-bold' : 'text-gray-400'}`}>{cat}</span>
                                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${isSelected ? 'border-[#d032e5] bg-[#d032e5]/10' : 'border-gray-600'}`}>
                                        {isSelected && <Check size={12} className="text-[#d032e5]" />}
                                    </div>
                                </div>
                            );
                        })}
                    </SidebarSection>

                    {/* Price Filter */}
                    <SidebarSection title="Price" defaultOpen={true}>
                        {PRICE_RANGES.map((range) => {
                            const isSelected = selectedProductPriceRanges.includes(range.id);
                            return (
                                <div 
                                    key={range.id}
                                    onClick={() => toggleProductPriceRange(range.id)}
                                    className={`flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer transition-colors ${isSelected ? 'bg-white/10' : 'hover:bg-white/5'}`}
                                >
                                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${isSelected ? 'border-[#d032e5] bg-[#d032e5]/10' : 'border-gray-600'}`}>
                                        {isSelected && <Check size={12} className="text-[#d032e5]" />}
                                    </div>
                                    <span className={`text-base ${isSelected ? 'text-white' : 'text-gray-400'}`}>{range.label}</span>
                                </div>
                            );
                        })}
                    </SidebarSection>

                    {/* Rating Filter */}
                    <SidebarSection title="Rating" defaultOpen={true}>
                        {[5, 4, 3, 2, 1].map((stars) => {
                            const isSelected = selectedProductRatings.includes(stars);
                            return (
                                <div 
                                    key={stars}
                                    onClick={() => toggleProductRating(stars)}
                                    className={`flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer transition-colors ${isSelected ? 'bg-white/10' : 'hover:bg-white/5'}`}
                                >
                                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${isSelected ? 'border-[#d032e5] bg-[#d032e5]/10' : 'border-gray-600'}`}>
                                        {isSelected && <Check size={12} className="text-[#d032e5]" />}
                                    </div>
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={14} fill={i < stars ? "white" : "none"} className={i < stars ? "text-white" : "text-gray-600"} />
                                        ))}
                                    </div>
                                    <span className="text-sm text-gray-500">{stars === 5 ? "" : "& Up"}</span>
                                </div>
                            );
                        })}
                    </SidebarSection>
                </div>

                {/* Product Grid Area */}
                <div className="flex-1">
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {sortedProducts.length > 0 ? (
                            sortedProducts.map((product) => (
                                <div 
                                    key={product.id} 
                                    className="w-full flex flex-col rounded-[10px] border border-[#27272a] bg-[#0C0C0C] overflow-hidden hover:border-[#d032e5] transition-colors group cursor-pointer"
                                    onClick={() => onProductSelect?.(product)}
                                >
                                    <div className="relative aspect-[4/5] overflow-hidden">
                                        <img src={product.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-full flex items-center gap-1">
                                            <Star size={12} className="text-yellow-400 fill-yellow-400" />
                                            <span className="text-white text-[12px] font-bold">{product.rating}.0</span>
                                        </div>
                                        <div className="absolute top-3 right-3 px-2 py-0.5 rounded-lg bg-[#8700a2] text-white text-[12px] font-bold uppercase tracking-wider">
                                            {product.category}
                                        </div>
                                    </div>
                                    <div className="p-4 flex flex-col gap-3">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-white text-base font-bold line-clamp-1 group-hover:text-[#d032e5] transition-colors">{product.title}</span>
                                            <span className="text-white/50 text-[12px] font-bold uppercase">{product.category} Collection</span>
                                        </div>
                                        <div className="flex items-center justify-between mt-auto">
                                            <span className="text-white font-bold text-lg">{formatPrice(product.price)}</span>
                                            <button className="h-9 w-14 flex items-center justify-center rounded-lg bg-[#27272a] group-hover:bg-[#d032e5] transition-colors">
                                                <ShoppingBag size={18} className="text-white" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center flex flex-col items-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                                    <Search size={32} className="text-gray-600" />
                                </div>
                                <p className="text-gray-400 text-lg">No products found matching your search.</p>
                                <button onClick={() => {
                                    setProductSearch('');
                                    setSelectedProductCategories([]);
                                    setSelectedProductPriceRanges([]);
                                    setSelectedProductRatings([]);
                                }} className="text-[#d032e5] font-bold hover:underline">Clear all filters</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )}

        {/* Followers Tab Content */}
        {activeTab === 'Followers' && (
            <div className="w-full">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                    {followersData.map((follower) => (
                        <div 
                            key={follower.id}
                            onClick={() => onCreatorSelect?.(follower)}
                            className="flex flex-col items-center gap-4 p-4 rounded-[24px] cursor-pointer group transition-all"
                        >
                            {/* Avatar */}
                            <div className="w-[80px] h-[80px] rounded-full border-2 border-[#27272a] group-hover:border-[#d032e5] overflow-hidden transition-colors bg-black">
                                <img src={follower.image} alt={follower.name} className="w-full h-full object-cover" />
                            </div>

                            {/* Content */}
                            <div className="flex flex-col items-center text-center">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-white text-[16px] font-bold truncate max-w-[150px] group-hover:text-[#d032e5] transition-colors">{follower.name}</h3>
                                    {follower.verified && (
                                        <div className="bg-[#d032e5] rounded-full p-[2px] flex items-center justify-center w-4 h-4 shrink-0">
                                            <Check size={10} className="text-white" strokeWidth={4} />
                                        </div>
                                    )}
                                </div>
                                <p className="text-gray-500 text-[14px]">@{follower.name.toLowerCase().replace(/\s+/g, '')}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* Supporting Tab Content */}
        {activeTab === 'Supporting' && (
            <div className="w-full flex flex-col items-center gap-[7rem]">
                <div className="text-center"><h2 className="text-3xl font-bold text-white mb-2">Top Supporters</h2><p className="text-gray-400">The fans who have supported this creator the most.</p></div>
                <div className="w-full max-w-[800px] flex flex-col gap-8">
                    <div className="flex items-end justify-center gap-4 md:gap-8 pb-8 border-b border-[#27272a]">
                        {leaderboardData[1] && <div className="flex flex-col items-center gap-3"><div className="relative"><div className="w-20 h-20 rounded-full border-[3px] border-[#C0C0C0] overflow-hidden"><img src={leaderboardData[1].image} className="w-full h-full object-cover" alt="Rank 2" loading="lazy" decoding="async" /></div><div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#C0C0C0] text-black text-xs font-bold px-2 py-0.5 rounded-full">#2</div></div><div className="text-center"><h3 className="font-bold text-white text-sm">{leaderboardData[1].name}</h3><p className="text-[#d032e5] font-bold text-xs">{formatPrice(leaderboardData[1].total)}</p></div></div>}
                        {leaderboardData[0] && <div className="flex flex-col items-center gap-3 -mt-10 z-10"><div className="relative"><Crown className="absolute -top-8 left-1/2 -translate-x-1/2 text-[#FFD700] fill-[#FFD700] w-8 h-8 animate-bounce" /><div className="w-28 h-28 rounded-full border-[4px] border-[#FFD700] overflow-hidden shadow-[0_0_30px_rgba(255,215,0,0.3)]"><img src={leaderboardData[0].image} className="w-full h-full object-cover" alt="Rank 1" loading="lazy" decoding="async" /></div><div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#FFD700] text-black text-sm font-bold px-3 py-0.5 rounded-full">#1</div></div><div className="text-center"><h3 className="font-bold text-white text-lg">{leaderboardData[0].name}</h3><p className="text-[#d032e5] font-bold text-base">{formatPrice(leaderboardData[0].total)}</p></div></div>}
                        {leaderboardData[2] && <div className="flex flex-col items-center gap-3"><div className="relative"><div className="w-20 h-20 rounded-full border-[3px] border-[#CD7F32] overflow-hidden"><img src={leaderboardData[2].image} className="w-full h-full object-cover" alt="Rank 3" loading="lazy" decoding="async" /></div><div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#CD7F32] text-black text-xs font-bold px-2 py-0.5 rounded-full">#3</div></div><div className="text-center"><h3 className="font-bold text-white text-sm">{leaderboardData[2].name}</h3><p className="text-[#d032e5] font-bold text-xs">{formatPrice(leaderboardData[2].total)}</p></div></div>}
                    </div>
                    <div className="flex flex-col gap-3">{leaderboardData.slice(3).map((supporter, index) => <div key={supporter.id} className="flex items-center gap-4 p-4 rounded-xl bg-[#18181b] border border-[#27272a] hover:border-[#d032e5] transition-all group"><span className="text-gray-500 font-bold text-lg w-8 text-center">{index + 4}</span><div className="w-12 h-12 rounded-full bg-gray-800 overflow-hidden shrink-0 border border-gray-700 group-hover:border-[#d032e5] transition-colors"><img src={supporter.image} className="w-full h-full object-cover" alt={supporter.name} loading="lazy" decoding="async" /></div><span className="text-white font-bold flex-1">{supporter.name}</span><div className="flex items-center gap-2"><Trophy size={14} className="text-gray-600 group-hover:text-[#d032e5] transition-colors" /><span className="text-[#d032e5] font-bold">{formatPrice(supporter.total)}</span></div></div>)}</div>
                </div>
            </div>
        )}

      </div>

      {/* Post Detail Dialog */}
      {selectedPost && (
        <Dialog open={isPostDialogOpen} onOpenChange={setIsPostDialogOpen}>
            <DialogContent className="max-w-[100vw] h-screen sm:max-w-[95vw] md:max-w-[900px] sm:h-[85vh] p-0 bg-[#0c0c0c] border-[#27272a] text-white overflow-hidden gap-0 flex flex-col sm:flex-row">
                <DialogTitle className="sr-only">Post Detail</DialogTitle>
                
                {/* Left: Image Container */}
                <div className="w-full sm:w-[55%] h-[40vh] sm:h-full bg-black flex items-center justify-center relative border-b sm:border-b-0 sm:border-r border-[#27272a]">
                    <img 
                        src={selectedPost.image} 
                        alt="Post Detail" 
                        className="max-w-full max-h-full object-contain"
                    />
                    <div className="absolute top-4 left-4 sm:hidden">
                        <DialogClose className="bg-black/50 p-2 rounded-full text-white">
                            <X size={20} />
                        </DialogClose>
                    </div>
                </div>

                {/* Right: Interaction Panel */}
                <div className="w-full sm:w-[45%] h-full flex flex-col bg-[#0c0c0c]">
                    
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-[#27272a] shrink-0 pr-12">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full border border-gray-700 bg-black overflow-hidden">
                                <img src={imgAvatar} className="w-full h-full object-cover" alt="avatar" />
                            </div>
                            <span className="font-bold text-base md:text-lg">Fareye Closhartt</span>
                        </div>
                    </div>

                    {/* Scrollable Content (Caption + Comments) */}
                    <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-[#27272a] scrollbar-track-transparent">
                        
                        {/* Caption */}
                        <div className="flex gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full border border-gray-700 bg-black overflow-hidden shrink-0">
                                <img src={imgAvatar} className="w-full h-full object-cover" alt="avatar" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="text-base">
                                    <span className="font-bold mr-2">Fareye Closhartt</span>
                                    <span className="text-gray-300 text-base">{selectedPost.caption}</span>
                                </div>
                                <span className="text-sm text-gray-500">{selectedPost.time}</span>
                            </div>
                        </div>

                        {/* Comments List */}
                        <div className="flex flex-col gap-4 border-t border-[#27272a]" >
                            <div className="font-bold text-base md:text-base mt-[1rem]">Comments</div>
                            {mockComments.map(comment => (
                                <div key={comment.id} className="flex gap-3 group mt-[1rem]">
                                    <div className="w-10 h-10 rounded-full bg-gray-800 shrink-0">
                                        <img src={imgFan} className="w-full h-full object-cover rounded-full" alt={comment.user} />
                                    </div>
                                    <div className="flex flex-col gap-0.5 w-full">
                                        <div className="flex justify-between items-start">
                                            <div className="text-base">
                                                <span className="font-bold mr-2">{comment.user}</span>
                                                <span className="text-gray-300 text-base">{comment.text}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-4 border-t border-[#27272a] bg-[#0c0c0c] shrink-0">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex gap-4">
                                <Heart size={24} className="cursor-pointer hover:text-red-500 hover:scale-110 transition-all" />
                                <Share2 size={24} className="cursor-pointer hover:text-gray-300 hover:scale-110 transition-all" />
                            </div>
                        </div>
                        <div className="font-bold text-base mb-1">{selectedPost.likes.toLocaleString()} likes</div>
                        <div className="text-xs text-gray-500 uppercase tracking-wide mb-3">{selectedPost.time.toUpperCase()}</div>
                        
                        <div className="flex items-center gap-3 pt-3 border-t border-[#27272a]">
                            <Smile size={24} className="text-gray-400 cursor-pointer" />
                            <input 
                                type="text" 
                                placeholder="Add a comment..." 
                                className="bg-transparent border-none outline-none text-base w-full placeholder-gray-500 text-white"
                            />
                            <button className="text-blue-500 font-bold text-base hover:text-blue-400 cursor-pointer">Post</button>
                        </div>
                    </div>

                </div>
            </DialogContent>
        </Dialog>
      )}

      {/* Subscription Detail Dialog */}
      {selectedSubscription && (
        <Dialog open={isSubscriptionDialogOpen} onOpenChange={setIsSubscriptionDialogOpen}>
            <DialogContent className="max-w-[100vw] h-auto sm:max-w-[95vw] md:max-w-[850px] p-0 bg-[#0c0c0c] border border-[#27272a] text-white overflow-hidden gap-0 flex flex-col md:flex-row rounded-[24px]">
                <DialogTitle className="sr-only">Subscription Detail</DialogTitle>
                
                {/* Left Side: Tier Image (Hidden on mobile if needed, or displayed at top) */}
                <div className="w-full md:w-[450px] h-[250px] md:h-auto bg-black relative shrink-0">
                    <img 
                        src={selectedSubscription.image} 
                        alt={selectedSubscription.name} 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] to-transparent md:hidden" />
                </div>

                {/* Right Side: Content */}
                <div className="flex-1 flex flex-col p-6 md:p-8 bg-[#0c0c0c]">
                    
                    {/* Header: Creator Info */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full border border-gray-700 bg-black overflow-hidden shrink-0">
                                <img src={imgAvatar} className="w-full h-full object-cover" alt="avatar" />
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-1.5">
                                    <span className="font-bold text-white text-xl">Fareye Closhartt</span>
                                    <div className="bg-[#0095f6] rounded-full p-[3px] flex items-center justify-center">
                                        <Check size={8} className="text-white" strokeWidth={4} />
                                    </div>
                                </div>
                                <span className="text-gray-500 text-base">@fareyecloshartt</span>
                            </div>
                        </div>
                    </div>

                    {/* Subscription Details */}
                    <div className="flex flex-col gap-1 mb-6">
                        <span className="text-white/50 text-base">Subscription-00{selectedSubscription.id}</span>
                        <h2 className="text-[28px] font-bold text-white leading-tight">{selectedSubscription.name}</h2>
                        <span className="text-white/90 text-base">{selectedSubscription.selectedPlan.label} Subscription</span>
                    </div>

                    {/* What's Included */}
                    <div className="flex flex-col gap-3 mb-8">
                        <span className="text-[#a1a1aa] text-base">What’s Included</span>
                        <div className="flex flex-col gap-2">
                            {selectedSubscription.features.map((feature: string, idx: number) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <div className="flex items-center justify-center w-5 h-5">
                                        <Check size={18} className="text-white" />
                                    </div>
                                    <span className="text-white text-base">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer: Price & Action */}
                    <div className="mt-auto flex flex-col gap-4 pt-4 border-t border-[#27272a]">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400 text-base">Total</span>
                            <span className="text-[20px] font-bold text-white">
                                {selectedSubscription.selectedPlan.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })}
                            </span>
                        </div>
                        
                        <div className="flex gap-3">
                            <button className="flex-1 h-[40px] bg-[#3f3f46] hover:bg-[#52525b] text-white text-base font-bold rounded-full transition-colors">
                                Cancel
                            </button>
                            <button className="flex-[2] h-[40px] bg-gradient-to-r from-[#8700a2] to-[#d032e5] hover:opacity-90 text-white text-base font-bold rounded-full transition-opacity shadow-lg shadow-[#8700a2]/20">
                                Proceed
                            </button>
                        </div>
                    </div>

                </div>
            </DialogContent>
        </Dialog>
      )}

      {/* Share Dialog */}
      <Dialog open={isShareOpen} onOpenChange={setIsShareOpen}>
        <DialogContent className="sm:max-w-md bg-[#121212] border border-[#27272a] text-white p-6 rounded-xl w-[90%]">
            <DialogHeader>
            <DialogTitle className="text-lg font-bold">Share Profile</DialogTitle>
            <DialogDescription className="text-gray-400 text-sm">
                Share Fareye Closhartt's profile with your friends.
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
                defaultValue="https://cosmic.app/creator/fareyecloshartt"
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
    </div>
  );
}
