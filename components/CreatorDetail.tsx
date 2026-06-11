
import React, { useState, useEffect, useRef } from "react";
import { Star, MessageCircle, Share2, Heart, Send, Check, MoreHorizontal, UserPlus, UserCheck, Image as ImageIcon, Instagram, Twitter, Youtube, Globe, Crown, Zap, Shield, Bookmark, Smile, X, Search, SortAsc, ShoppingBag, ChevronRight, Trophy, Copy, Facebook, Linkedin, Link as LinkIcon, TrendingUp, Calendar, Coins, Lock, Volume2, Bell } from "lucide-react";
import { Progress } from "./ui/progress";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogDescription } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

// Placeholder images reusing existing assets
import imgBanner from "../src/assets/images/banner.jpg"; 
import imgAvatar from "../src/assets/images/Dummy 2.jpg";
import imgFan from "../src/assets/images/dummy.jpg";
import imgGrid1 from "../src/assets/images/Sub Hero 1.jpg";
import imgGrid2 from "../src/assets/images/Sub Hero 2.jpg";
import imgGrid3 from "../src/assets/images/Sub Hero 4.jpg";
import imgGrid4 from "../src/assets/images/Sub Hero 1a.jpg";
import imgGrid5 from "../src/assets/images/Sub Hero 3a.jpg";
import imgGrid6 from "../src/assets/images/Sub Hero 5a.jpg";

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
    { id: 1, user: "cosplay_lover", text: "This is absolutely stunning! The details are insane 😍", time: "2h", isLiked: false, likes: 0 },
    { id: 2, user: "gaming_wizard", text: "Can't wait to see more of this set!", time: "5h", isLiked: false, likes: 0 },
    { id: 3, user: "artistic_soul", text: "Lighting on point 🔥", time: "1d", isLiked: false, likes: 0 },
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
  const [activeTab, setActiveTab ] = useState("Home");
  const [selectedCat, setSelectedCat] = useState("Semua");
  const [pinnedLiked, setPinnedLiked] = useState(false);
  const [pinnedLikes, setPinnedLikes] = useState(532);
  const [post1Liked, setPost1Liked] = useState(false);
  const [post1Likes, setPost1Likes] = useState(99);
  const [post2Liked, setPost2Liked] = useState(false);
  const [post2Likes, setPost2Likes] = useState(245);
  const [wishAmt, setWishAmt] = useState<number>(25000);
  const [wishMessage, setWishMessage] = useState("");
  const [wishProgress, setWishProgress] = useState(90);
  const [isReminded, setIsReminded] = useState(false);
  const [membershipIndex, setMembershipIndex] = useState(0);
  const [selectedPost, setSelectedPost] = useState<typeof feedGridData[0] | null>(null);
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false);
  
  const [postComments, setPostComments] = useState(mockComments);
  const [newComment, setNewComment] = useState("");
  const commentInputRef = useRef<HTMLInputElement>(null);
  
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

  const handlePostComment = () => {
    if (!newComment.trim()) return;
    setPostComments([{ id: postComments.length + 1, user: "You", text: newComment, time: "Just now", isLiked: false, likes: 0 }, ...postComments]);
    setNewComment("");
  };

  const handleCommentLike = (commentId: number) => {
    setPostComments(prev => prev.map(c => 
      c.id === commentId ? { ...c, isLiked: !c.isLiked, likes: c.isLiked ? (c.likes || 1) - 1 : (c.likes || 0) + 1 } : c
    ));
  };

  const handleCommentReply = (username: string) => {
    setNewComment(`@${username} `);
    commentInputRef.current?.focus();
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
    <div className="bg-black min-h-screen w-full pt-[80px] text-white font-sans animate-in fade-in duration-500 flex flex-col items-center">
      
      <div className="w-full max-w-screen px-4 md:px-10 pb-20">
        
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
        <div className="border-b border-gray-800 mb-8 sticky top-[60px] md:top-[80px] bg-black/80 backdrop-blur-md z-40 mx-[-16px] px-[16px] md:mx-0 md:px-0">
            <div className="flex justify-start md:justify-center gap-6 md:gap-8 px-4 overflow-x-auto scrollbar-none">
                {['Home', 'Feeds', 'Products', 'Subscription', 'Followers', 'Supporters'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab === 'Supporters' ? 'Supporting' : tab)}
                        className={`pb-4 md:pb-5 text-sm sm:text-base md:text-lg font-medium transition-colors relative cursor-pointer whitespace-nowrap ${
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
            <div className="flex flex-col gap-8 animate-in fade-in duration-500">
                
                {/* Main Grid Content (Left Column, Middle Column, Right Column) */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    
                    {/* LEFT COLUMN: Sidebar 1 (Statistik Kreator, Support Board, Jadwal Konten, Membership) */}
                    <div className="flex flex-col gap-6 lg:col-span-1 order-2 lg:order-1">
                        
                        {/* Statistik Kreator */}
                        <div className="bg-[#0c0c0c] border border-[#27272a] rounded-[24px] p-5 shadow-2xl">
                            <div className="flex items-center gap-2 mb-4 text-gray-400">
                                <Trophy size={14} className="text-gray-400" />
                                <span className="text-[11px] font-bold tracking-wider uppercase">STATISTIK KREATOR</span>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-3 mb-4">
                                <div className="bg-[#121214] border border-white/5 rounded-2xl p-4 flex flex-col justify-center">
                                    <span className="text-2xl font-black text-white leading-tight">892</span>
                                    <span className="text-[11px] text-gray-400 font-medium mt-0.5">Subscribers</span>
                                </div>
                                <div className="bg-[#121214] border border-white/5 rounded-2xl p-4 flex flex-col justify-center">
                                    <span className="text-2xl font-black text-white leading-tight">48</span>
                                    <span className="text-[11px] text-gray-400 font-medium mt-0.5">Konten</span>
                                </div>
                                <div className="bg-[#121214] border border-white/5 rounded-2xl p-4 flex flex-col justify-center">
                                    <span className="text-2xl font-black text-white leading-tight">24</span>
                                    <span className="text-[11px] text-gray-400 font-medium mt-0.5">Produk dijual</span>
                                </div>
                                <div className="bg-[#121214] border border-white/5 rounded-2xl p-4 flex flex-col justify-center">
                                    <span className="text-2xl font-black text-white leading-tight">4.8</span>
                                    <span className="text-[11px] text-gray-400 font-medium mt-0.5">Rating</span>
                                </div>
                            </div>

                            <div className="bg-[#052e16]/60 border border-[#22c55e]/20 text-[#4ade80] rounded-[16px] p-3 flex items-center gap-2 text-xs font-semibold">
                                <TrendingUp size={14} className="text-[#4ade80] shrink-0" />
                                <span>247 fans baru subscribe bulan ini</span>
                            </div>
                        </div>

                        {/* Support Board */}
                        <div className="bg-[#0c0c0c] border border-[#27272a] rounded-[24px] p-5 shadow-2xl">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse" />
                                <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase">SUPPORT BOARD</span>
                            </div>
                            
                            {/* Card 1: Benz */}
                            <div className="bg-[#121214] border border-white/5 rounded-[18px] p-4 flex flex-col gap-3 mb-4">
                                <div className="flex items-start gap-2.5">
                                    <div className="w-9 h-9 rounded-full bg-emerald-700 shrink-0 flex items-center justify-center text-sm font-bold text-white shadow-inner">
                                        B
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-baseline justify-between gap-1 flex-wrap">
                                            <span className="font-bold text-sm text-white">Benz</span>
                                            <span className="text-[10px] text-gray-500">19 hari lalu</span>
                                        </div>
                                        <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                                            Membeli <span className="text-[#a855f7] font-semibold">Photopack Spicy Kurumi</span> seharga <span className="text-[#10b981] font-bold">Rp 100.000</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-black/40 p-3 rounded-xl border border-white/5 ml-1 pt-2 pb-2">
                                    <p className="text-xs text-gray-400 italic">"Notes: mantab"</p>
                                </div>
                            </div>

                            {/* Thread Creator Reply */}
                            <div className="bg-transparent pl-4 border-l-2 border-white/10 flex flex-col gap-2">
                                <div className="flex items-start gap-2.5">
                                    <div className="w-8 h-8 rounded-full bg-zinc-800 shrink-0 flex items-center justify-center text-xs font-bold text-white border border-white/10">
                                        F
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-white leading-relaxed">
                                            <span className="font-bold mr-1.5 text-gray-200">Fareye Closhartt</span>
                                            <span className="text-gray-400">Haaalllooo Im so sorry baru balik haluapp lagii</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Jadwal Konten */}
                        <div className="bg-[#0c0c0c] border border-[#27272a] rounded-[24px] p-5 shadow-2xl">
                            <div className="flex items-center gap-2 mb-4 text-gray-400">
                                <Calendar size={14} />
                                <span className="text-[11px] font-bold tracking-wider uppercase">JADWAL KONTEN</span>
                            </div>
                            
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-3.5">
                                    <span className="bg-[#31151a] text-[#f43f5e] text-xs font-black px-3 py-1 rounded-[10px] w-12 text-center select-none shrink-0 border border-[#ef4444]/15">
                                        Sen
                                    </span>
                                    <span className="text-xs text-gray-200 font-medium truncate">Posting fanart baru</span>
                                </div>
                                <div className="flex items-center gap-3.5">
                                    <span className="bg-[#241334] text-[#b249f8] text-xs font-black px-3 py-1 rounded-[10px] w-12 text-center select-none shrink-0 border border-[#a855f7]/15">
                                        Rab
                                    </span>
                                    <span className="text-xs text-gray-200 font-medium truncate">Live cosplay session</span>
                                </div>
                                <div className="flex items-center gap-3.5">
                                    <span className="bg-[#14223d] text-[#3b82f6] text-xs font-black px-3 py-1 rounded-[10px] w-12 text-center select-none shrink-0 border border-[#3b82f6]/15">
                                        Jum
                                    </span>
                                    <span className="text-xs text-gray-200 font-medium truncate">Q&A subscriber</span>
                                </div>
                                <div className="flex items-center gap-3.5">
                                    <span className="bg-[#1c1b4e] text-[#6366f1] text-xs font-black px-3 py-1 rounded-[10px] w-12 text-center select-none shrink-0 border border-[#6366f1]/15">
                                        Min
                                    </span>
                                    <span className="text-xs text-gray-200 font-medium truncate">Behind the scenes</span>
                                </div>
                            </div>
                        </div>

                        {/* Produk Terlaris */}
                        <div className="bg-[#0c0c0c] border border-[#27272a] rounded-[24px] p-5 shadow-2xl">
                            <div className="flex items-center gap-2 mb-4 text-gray-400">
                                <span className="text-base select-none">🛍️</span>
                                <span className="text-[11px] font-bold tracking-wider uppercase">PRODUK TERLARIS</span>
                            </div>
                            
                            <div className="flex flex-col gap-3.5">
                                {/* Product 1 */}
                                <div className="flex items-center gap-3 bg-[#121214] border border-white/5 rounded-2xl p-2 hover:border-white/10 transition-all cursor-pointer">
                                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-zinc-950 shrink-0">
                                        <img src={imgGrid4} className="w-full h-full object-cover" alt="product" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h5 className="font-extrabold text-xs text-white truncate">Moonlight Wallpack</h5>
                                        <span className="text-[11px] font-extrabold text-purple-400 block mt-0.5">IDR 25.000</span>
                                        <span className="text-[9px] text-gray-500 font-semibold block mt-0.5">847 terjual</span>
                                    </div>
                                </div>

                                {/* Product 2 */}
                                <div className="flex items-center gap-3 bg-[#121214] border border-white/5 rounded-2xl p-2 hover:border-white/10 transition-all cursor-pointer">
                                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-zinc-950 shrink-0">
                                        <img src={imgGrid2} className="w-full h-full object-cover" alt="product" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h5 className="font-extrabold text-xs text-white truncate">Spicy Kurumi Photopack</h5>
                                        <span className="text-[11px] font-extrabold text-purple-400 block mt-0.5">IDR 100.000</span>
                                        <span className="text-[9px] text-gray-500 font-semibold block mt-0.5">312 terjual</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* MIDDLE COLUMN: Main Content Feed (Stories, Pills, Posts) */}
                    <div className="lg:col-span-2 flex flex-col gap-6 order-1 lg:order-2">
                        
                        {/* Highlights (Story Circles) */}
                        <div className="flex items-center gap-4 overflow-x-auto pb-2 mb-2 scrollbar-none w-full">
                            {[
                                { id: 1, title: "Cosplay...", img: imgGrid1 },
                                { id: 2, title: "Behind ...", img: imgGrid2 },
                                { id: 3, title: "Live re...", img: imgGrid3 },
                                { id: 4, title: "New pr...", img: imgGrid4 },
                            ].map((story) => (
                                <div key={story.id} className="flex flex-col items-center gap-1.5 shrink-0 select-none group cursor-pointer">
                                    <div className="p-[2.5px] bg-gradient-to-tr from-[#9333ea] via-[#ec4899] to-[#f43f5e] rounded-full group-hover:scale-105 transition-transform duration-300">
                                        <div className="p-[2px] bg-black rounded-full">
                                            <div className="w-[56px] h-[56px] rounded-full overflow-hidden bg-zinc-800 flex items-center justify-center border border-white/10">
                                                <img src={story.img} className="w-full h-full object-cover" alt="story" referrerPolicy="no-referrer" />
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-[11px] text-gray-400 font-medium tracking-wide truncate w-[64px] text-center">
                                        {story.title}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Pills Filter Category Horizontal List */}
                        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                            {["Semua", "Free", "Exclusive", "Live", "Products"].map((cat) => {
                                const isSel = selectedCat === cat;
                                return (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCat(cat)}
                                        className={`flex items-center gap-1.5 px-6 py-2 rounded-full text-xs font-black tracking-wider uppercase transition-all whitespace-nowrap border cursor-pointer ${
                                            isSel 
                                                ? "bg-[#18181b] border-white/20 text-white shadow-xl" 
                                                : "bg-[#050505] border-white/5 text-gray-400 hover:text-white hover:border-white/10"
                                        }`}
                                    >
                                        {cat === "Exclusive" && <Lock size={12} className="shrink-0" />}
                                        {cat === "Live" && <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444] shrink-0" />}
                                        <span>{cat}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* PINNED ANNOUNCEMENT */}
                        <div className="bg-[#0c0c0c] border border-amber-500/25 bg-gradient-to-b from-[#1c1404] to-[#0c0c0c] rounded-[24px] p-5 shadow-2xl relative">
                            <div className="absolute top-4 right-4 flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 text-amber-500 px-2.5 py-1 rounded-full text-[9px] font-black tracking-widest uppercase select-none">
                                📌 PINNED ANNOUNCEMENT
                            </div>

                            <div className="flex items-center gap-3 mb-4 mt-2">
                                <div className="w-11 h-11 rounded-full border border-gray-700 bg-zinc-950 overflow-hidden shrink-0">
                                    <img src={imgAvatar} className="w-full h-full object-cover" alt="avatar" referrerPolicy="no-referrer" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-1">
                                        <span className="font-extrabold text-white text-sm">Celeste Moon</span>
                                        <div className="bg-[#0095f6] rounded-full p-[2px]">
                                            <Check size={9} className="text-white" strokeWidth={4} />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-semibold">
                                        <span>@celestemoon</span>
                                        <span>•</span>
                                        <span>2 hari lalu</span>
                                    </div>
                                </div>
                            </div>

                            <p className="text-gray-200 text-sm leading-relaxed mb-5 font-sans font-normal">
                                Hai semua! Bulan ini ada promo special — subscribe Warrior Tier dan dapatkan wallpaper eksklusif Moonlight Series gratis! Berlaku sampai akhir bulan.
                            </p>

                            <div className="border-t border-white/5 pt-4 flex items-center gap-6">
                                <button 
                                    onClick={() => {
                                        setPinnedLiked(!pinnedLiked);
                                        setPinnedLikes(prev => pinnedLiked ? prev - 1 : prev + 1);
                                    }}
                                    className={`flex items-center gap-1.5 transition-colors text-xs font-semibold select-none group cursor-pointer ${pinnedLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                                >
                                    <Heart size={16} className={`transition-all duration-300 ${pinnedLiked ? 'fill-red-500 scale-110' : 'group-hover:fill-red-500'}`} />
                                    <span>{pinnedLikes}</span>
                                </button>
                                <button className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors text-xs font-semibold select-none group cursor-pointer">
                                    <MessageCircle size={16} className="group-hover:text-blue-400 transition-colors" />
                                    <span>120</span>
                                </button>
                                <button className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors text-xs font-semibold select-none group cursor-pointer">
                                    <Share2 size={16} className="group-hover:text-green-400 transition-colors" />
                                    <span>89</span>
                                </button>
                            </div>
                        </div>

                        {/* POST 1: Text post */}
                        <div className="bg-[#0c0c0c] border border-[#27272a] rounded-[24px] p-5 shadow-2xl">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-11 h-11 rounded-full border border-gray-700 bg-zinc-950 overflow-hidden shrink-0">
                                        <img src={imgAvatar} className="w-full h-full object-cover" alt="avatar" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-1">
                                            <span className="font-extrabold text-white text-sm">Celeste Moon</span>
                                            <div className="bg-[#0095f6] rounded-full p-[2px]">
                                                <Check size={9} className="text-white" strokeWidth={4} />
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-semibold">
                                            <span>@celestemoon</span>
                                            <span>•</span>
                                            <span>2 jam lalu</span>
                                        </div>
                                    </div>
                                </div>
                                <button className="text-gray-500 hover:text-white cursor-pointer transition-colors p-1 rounded-full hover:bg-white/5">
                                    <MoreHorizontal size={18} />
                                </button>
                            </div>

                            <p className="text-gray-200 text-sm leading-relaxed mb-5">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec sapien fermentum, rhoncus arcu sit amet, aliquet risus. Curabitur nec sapien fermentum, rhoncus arcu sit amet, aliquet risus.
                            </p>

                            <div className="border-t border-white/5 pt-4 flex items-center justify-between">
                                <div className="flex gap-6">
                                    <button 
                                        onClick={() => {
                                            setPost1Liked(!post1Liked);
                                            setPost1Likes(prev => post1Liked ? prev - 1 : prev + 1);
                                        }}
                                        className={`flex items-center gap-1.5 transition-colors text-xs font-semibold select-none group cursor-pointer ${post1Liked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                                    >
                                        <Heart size={16} className={`transition-all duration-300 ${post1Liked ? 'fill-red-500 scale-110' : 'group-hover:fill-red-500'}`} />
                                        <span>{post1Likes}</span>
                                    </button>
                                    <button className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors text-xs font-semibold select-none group cursor-pointer">
                                        <MessageCircle size={16} className="group-hover:text-blue-400 transition-colors" />
                                        <span>135</span>
                                    </button>
                                    <button className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors text-xs font-semibold select-none group cursor-pointer">
                                        <Share2 size={16} className="group-hover:text-green-400 transition-colors" />
                                        <span>10</span>
                                    </button>
                                </div>
                                
                                <button className="flex items-center gap-1.5 bg-[#f59e0b]/10 border border-[#f59e0b]/20 hover:bg-[#f59e0b]/20 px-4 py-1.5 rounded-full text-xs font-bold text-[#f59e0b] cursor-pointer transition-colors select-none">
                                    <Coins size={12} className="shrink-0" />
                                    <span>Tip</span>
                                </button>
                            </div>
                        </div>

                        {/* POST 2: Locked Post */}
                        <div className="bg-[#0c0c0c] border border-purple-500/10 rounded-[24px] p-5 shadow-2xl relative">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-11 h-11 rounded-full border border-gray-700 bg-zinc-950 overflow-hidden shrink-0">
                                        <img src={imgAvatar} className="w-full h-full object-cover" alt="avatar" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-1">
                                            <span className="font-extrabold text-white text-sm">Celeste Moon</span>
                                            <div className="bg-[#0095f6] rounded-full p-[2px]">
                                                <Check size={9} className="text-white" strokeWidth={4} />
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-semibold">
                                            <span>@celestemoon</span>
                                            <span>•</span>
                                            <span>6 jam lalu</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-1 bg-[#581c87]/30 border border-[#8b5cf6]/35 text-[#d8b4fe] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider select-none shrink-0">
                                    <Lock size={10} className="shrink-0 text-[#d8b4fe]" />
                                    <span>Warrior only</span>
                                </div>
                            </div>

                            <p className="text-gray-200 text-sm leading-relaxed mb-4">
                                Just finished a new cosplay prop! It was a challenge to get the weathering right, but I think it turned out great!
                            </p>

                            {/* Locked Card banner */}
                            <div className="relative aspect-[16/9] w-full rounded-[18px] overflow-hidden bg-[#121214] border border-white/5 flex flex-col items-center justify-center p-6 text-center mb-5 shadow-inner">
                                <div className="absolute inset-0 bg-black/45 backdrop-blur-[6px] z-0" />
                                
                                <div className="relative z-10 flex flex-col items-center gap-3 w-full max-w-sm">
                                    <div className="w-[52px] h-[52px] rounded-full bg-purple-950/40 border border-purple-500/30 flex items-center justify-center text-[#d8b4fe]">
                                        <Lock size={20} className="animate-pulse" />
                                    </div>
                                    <h5 className="font-black text-sm tracking-wide text-gray-200 uppercase">Konten eksklusif Warrior Tier</h5>
                                    
                                    <button 
                                        onClick={() => setActiveTab("Subscription")}
                                        className="mt-1 flex items-center justify-center font-black text-xs tracking-wider uppercase px-8 py-3.5 bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 text-white rounded-full transition-all cursor-pointer shadow-lg shadow-purple-900/30 w-full"
                                    >
                                        Subscribe IDR 35k/bulan
                                    </button>
                                </div>
                            </div>

                            <div className="border-t border-white/5 pt-4 flex items-center gap-6">
                                <button 
                                    onClick={() => {
                                        setPost2Liked(!post2Liked);
                                        setPost2Likes(prev => post2Liked ? prev - 1 : prev + 1);
                                    }}
                                    className={`flex items-center gap-1.5 transition-colors text-xs font-semibold select-none group cursor-pointer ${post2Liked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                                >
                                    <Heart size={16} className={`transition-all duration-300 ${post2Liked ? 'fill-red-500 scale-110' : 'group-hover:fill-red-500'}`} />
                                    <span>{post2Likes}</span>
                                </button>
                                <button className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors text-xs font-semibold select-none group cursor-pointer">
                                    <MessageCircle size={16} className="group-hover:text-blue-400 transition-colors" />
                                    <span>42</span>
                                </button>
                                <button className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors text-xs font-semibold select-none group cursor-pointer">
                                    <Share2 size={16} className="group-hover:text-green-400 transition-colors" />
                                    <span>15</span>
                                </button>
                            </div>
                        </div>

                    </div>

                    {/* RIGHT COLUMN: Sidebar 2 (Milestone, Top Supporter, Best Seller, Wishlist) */}
                    <div className="flex flex-col gap-6 lg:col-span-1 order-3">
                        
                        {/* Milestone Kreator */}
                        <div className="bg-[#0c0c0c] border border-[#27272a] rounded-[24px] p-5 shadow-2xl">
                            <div className="flex items-center gap-2 mb-4 text-gray-400">
                                <span className="text-base select-none">🎯</span>
                                <span className="text-[11px] font-bold tracking-wider uppercase">MILESTONE KREATOR</span>
                            </div>

                            <p className="font-extrabold text-white text-sm mb-2.5">Menuju 1.000 Subscribers</p>
                            
                            <div className="mb-2">
                                <Progress value={89} className="h-2 bg-[#121214] overflow-hidden rounded-full">
                                    <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: '89%' }} />
                                </Progress>
                            </div>

                            <div className="flex justify-between text-[11px] font-black mb-3">
                                <span className="text-gray-400">892 / 1.000</span>
                                <span className="text-indigo-400">89%</span>
                            </div>

                            <p className="text-xs text-gray-400 italic">
                                Bantu Celeste mencapai milestone-nya!
                            </p>
                        </div>

                        {/* Top Supporter Podium */}
                        <div className="bg-[#0c0c0c] border border-[#27272a] rounded-[24px] p-5 shadow-2xl">
                            <div className="flex items-center gap-2 mb-6 text-gray-400">
                                <Trophy size={14} />
                                <span className="text-[11px] font-bold tracking-wider uppercase">TOP SUPPORTER</span>
                            </div>
                            
                            <div className="flex items-end justify-center gap-2 mb-4 pt-4">
                                {/* Rank 2 */}
                                <div className="flex flex-col items-center gap-1.5 order-1">
                                    <div className="relative group shrink-0">
                                        <div className="p-[2.5px] bg-zinc-600 rounded-full">
                                            <div className="w-11 h-11 rounded-full overflow-hidden bg-zinc-950 flex items-center justify-center border border-white/5">
                                                <div className="text-xs font-extrabold text-white">RS</div>
                                            </div>
                                        </div>
                                        <span className="absolute -top-2 -right-2 bg-zinc-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-black shadow">2</span>
                                    </div>
                                    <span className="text-[10px] text-gray-400 font-bold truncate w-[56px] text-center">Raja_Sa...</span>
                                </div>

                                {/* Rank 1 */}
                                <div className="flex flex-col items-center gap-1.5 order-2 -mt-[14px]">
                                    <div className="relative group shrink-0">
                                        <div className="p-[3px] bg-[#ffd700] rounded-full shadow-lg shadow-yellow-500/10">
                                            <div className="w-[52px] h-[52px] rounded-full overflow-hidden bg-zinc-950 flex items-center justify-center border border-white/5">
                                                <div className="text-sm font-extrabold text-white">SI</div>
                                            </div>
                                        </div>
                                        <span className="absolute -top-2.5 -right-2.5 bg-[#ffd700] text-black text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border border-black shadow">1</span>
                                    </div>
                                    <span className="text-[11px] text-[#ffd700] font-black truncate w-[72px] text-center">Sultan_...</span>
                                </div>

                                {/* Rank 3 */}
                                <div className="flex flex-col items-center gap-1.5 order-3">
                                    <div className="relative group shrink-0">
                                        <div className="p-[2.5px] bg-[#b45309] rounded-full">
                                            <div className="w-11 h-11 rounded-full overflow-hidden bg-zinc-950 flex items-center justify-center border border-white/5">
                                                <div className="text-xs font-extrabold text-white">BM</div>
                                            </div>
                                        </div>
                                        <span className="absolute -top-2 -right-2 bg-[#b45309] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-black shadow">3</span>
                                    </div>
                                    <span className="text-[10px] text-gray-400 font-bold truncate w-[56px] text-center">Boss_...</span>
                                </div>
                            </div>

                            <button 
                                onClick={() => setActiveTab("Subscription")}
                                className="w-full py-3 bg-transparent border border-white/10 hover:border-white/20 rounded-full text-white font-bold text-xs tracking-wider uppercase transition-colors cursor-pointer"
                            >
                                Support Celeste Moon
                            </button>
                        </div>

                        {/* Membership */}
                        <div className="bg-[#0c0c0c] border border-[#27272a] rounded-[24px] p-5 shadow-2xl">
                            <h3 className="text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-4">MEMBERSHIP</h3>
                            
                            <div className="flex flex-col gap-3.5 mb-5">
                                {/* Villager */}
                                <div className="flex items-center justify-between gap-2 p-3 bg-[#121214] border border-white/5 rounded-2xl hover:border-white/10 transition-colors">
                                    <div>
                                        <h4 className="text-sm font-extrabold text-white">Villager</h4>
                                        <p className="text-[10px] text-gray-400 mt-0.5">Exclusive Content & Badges</p>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <span className="text-[10px] text-gray-400 block tracking-wide uppercase font-bold">IDR</span>
                                        <span className="text-sm font-extrabold text-white">15k</span>
                                    </div>
                                </div>

                                {/* Warrior */}
                                <div className="flex items-center justify-between gap-2 p-3 bg-[#121214] border border-white/5 rounded-2xl hover:border-white/10 transition-colors">
                                    <div>
                                        <h4 className="text-sm font-extrabold text-white">Warrior</h4>
                                        <p className="text-[10px] text-gray-400 mt-0.5">Semua benefit + early access</p>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <span className="text-[10px] text-gray-400 block tracking-wide uppercase font-bold">IDR</span>
                                        <span className="text-sm font-extrabold text-white">35k</span>
                                    </div>
                                </div>
                            </div>

                            <button 
                                onClick={() => setActiveTab("Subscription")}
                                className="w-full py-3 bg-transparent border border-white/20 hover:border-white rounded-full text-white font-bold text-xs tracking-wider uppercase transition-colors cursor-pointer"
                            >
                                View All Tiers
                            </button>
                        </div>

                        {/* Wishlist Kreator */}
                        <div className="bg-[#0c0c0c] border border-[#27272a] rounded-[24px] p-5 shadow-2xl">
                            <div className="flex items-center gap-2 mb-4 text-gray-400">
                                <span className="text-base select-none">🎁</span>
                                <span className="text-[11px] font-bold tracking-wider uppercase">WISHLIST KREATOR</span>
                            </div>

                            <p className="text-xs text-gray-300 italic mb-3">
                                "Bantu wujudkan wishlist-ku!"
                            </p>
                            <h4 className="font-black text-sm text-white mb-3">Studio lighting setup</h4>

                            <div className="mb-2">
                                <Progress value={wishProgress} className="h-1.5 bg-[#121214] overflow-hidden rounded-full">
                                    <div className="h-full bg-[#d032e5] rounded-full" style={{ width: `${wishProgress}%` }} />
                                </Progress>
                            </div>

                            <div className="flex justify-between text-[11px] font-black mb-4">
                                <span className="text-gray-400">Rp {wishProgress === 90 ? "900.000" : (wishProgress * 10000).toLocaleString('id-ID')} / Rp 1.000.000</span>
                                <span className="text-[#d032e5]">{wishProgress}%</span>
                            </div>

                            <div className="grid grid-cols-4 gap-1.5 mb-2.5">
                                {[25000, 50000, 100000, 250000].map((num) => {
                                    const label = num >= 1000 ? `${num / 1000}k` : num;
                                    const isSel = wishAmt === num;
                                    return (
                                        <button 
                                            key={num} 
                                            onClick={() => setWishAmt(num)}
                                            className={`border rounded-lg h-[36px] text-xs font-black transition-colors cursor-pointer select-none ${
                                                isSel 
                                                    ? "bg-[#d032e5] border-transparent text-white" 
                                                    : "bg-[#121214] border-gray-800 text-gray-400 hover:text-white"
                                            }`}
                                        >
                                            {label}
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="relative mb-2.5">
                                <input 
                                    type="text" 
                                    placeholder="Tulis pesan..." 
                                    value={wishMessage}
                                    onChange={(e) => setWishMessage(e.target.value)}
                                    className="w-full bg-[#121214] border border-gray-800 rounded-xl py-2.5 px-4 text-xs text-white focus:outline-none focus:border-[#d032e5] transition-colors placeholder-gray-500 font-medium"
                                />
                            </div>

                            <button 
                                onClick={() => {
                                    setWishProgress(prev => Math.min(100, prev + Math.floor(wishAmt / 10000)));
                                    setWishMessage("");
                                    alert(`Dukungan sebesar Rp ${wishAmt.toLocaleString('id-ID')} telah dikirim untuk mewujudkan wishlist ini! Terima kasih! ❤️`);
                                }}
                                className="w-full py-3 bg-[#a855f7] hover:bg-[#c084fc] text-white rounded-full font-black text-xs tracking-wider uppercase transition-all cursor-pointer shadow-lg shadow-purple-900/10"
                            >
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
            <DialogContent className="max-w-[100vw] h-screen sm:max-w-[700px] sm:h-auto sm:max-h-[85vh] p-0 bg-[#242526] border-none text-white overflow-hidden gap-0 rounded-none sm:rounded-xl flex flex-col">
                <DialogTitle className="sr-only">Post Detail</DialogTitle>
                
                {/* Header */}
                <div className="relative flex items-center justify-center p-4 border-b border-[#3e4042] shrink-0 bg-[#242526]">
                    <h2 className="text-xl font-bold text-[#e4e6eb] m-0">Fareye Closhartt&apos;s Post</h2>
                    <DialogClose className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#3a3b3c] hover:bg-[#4e4f50] p-2 rounded-full transition-colors text-[#b0b3b8] [&>svg]:size-5 opacity-100">
                        <X size={20} />
                        <span className="sr-only">Close</span>
                    </DialogClose>
                </div>

                {/* Main scrollable content */}
                <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#3a3b3c] scrollbar-track-transparent flex flex-col">
                    {/* Post Author Info */}
                    <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <img src={imgAvatar} className="w-10 h-10 rounded-full" alt="avatar" loading="lazy" decoding="async" />
                            <div>
                                <h3 className="font-semibold text-[15px] text-[#e4e6eb]">Fareye Closhartt</h3>
                                <p className="text-[13px] text-[#b0b3b8] flex items-center gap-1">Cosmic Creator · {selectedPost.time} · <Globe size={12} /></p>
                            </div>
                        </div>
                        <button className="text-[#b0b3b8] hover:bg-[#3a3b3c] p-2 rounded-full transition-colors">
                            <MoreHorizontal size={20} />
                        </button>
                    </div>

                    {/* Post Content */}
                    <div className="px-4 pb-2 text-[15px] text-[#e4e6eb]">
                        {selectedPost.caption}
                    </div>

                    {/* Post Image */}
                    {selectedPost.image && (
                        <div className="w-full bg-black flex items-center justify-center border-y border-[#3e4042]">
                            <img src={selectedPost.image} className="w-full h-auto object-contain max-h-[500px]" alt="Post Detail" loading="lazy" decoding="async" />
                        </div>
                    )}

                    {/* Action Bar */}
                    <div className="px-4 py-2 border-b border-[#3e4042]">
                        <div className="flex items-center gap-2 sm:gap-6 text-[#b0b3b8] py-1">
                            <button className="flex items-center gap-2 transition-colors hover:bg-[#3a3b3c] px-3 py-1.5 rounded-md hover:text-[#e4e6eb]">
                                <Heart size={20} /> <span className="text-[15px] hidden sm:inline">Like</span>
                            </button>
                            <button className="flex items-center gap-2 hover:text-[#e4e6eb] transition-colors hover:bg-[#3a3b3c] px-3 py-1.5 rounded-md">
                                <MessageCircle size={20} /> <span className="text-[15px]">{postComments.length}</span>
                            </button>
                            <button className="flex items-center gap-2 hover:text-[#e4e6eb] transition-colors hover:bg-[#3a3b3c] px-3 py-1.5 rounded-md">
                                <Share2 size={20} /> <span className="text-[15px] hidden sm:inline">Share</span>
                            </button>
                        </div>
                    </div>

                    {/* Comments Section */}
                    <div className="p-4 pb-[2rem]">
                        <div className="font-semibold text-[15px] text-[#b0b3b8] mb-4 flex items-center gap-1 cursor-pointer w-max hover:bg-[#3a3b3c] px-2 py-1 rounded-md">
                            Newest <Check size={16} className="opacity-0 w-0" />
                        </div>
                        
                        <div className="flex flex-col gap-4">
                            {postComments.length > 0 ? (postComments.map((comment, i) => (
                                <div key={comment.id || i} className="flex gap-2">
                                    <div className="w-8 h-8 rounded-full bg-[#18181b] flex items-center justify-center font-bold text-xs shrink-0 overflow-hidden">
                                        {comment.user.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="flex flex-col max-w-full">
                                        <div className="bg-[#3a3b3c] rounded-2xl px-3 py-2 text-[#e4e6eb] inline-block max-w-max relative">
                                            <span className="font-semibold text-[13px] block leading-tight mb-0.5">{comment.user}</span>
                                            <span className="text-[15px] leading-snug">{comment.text}</span>
                                            {comment.likes > 0 && (
                                                <div className="absolute right-[-10px] bottom-[-10px] bg-[#242526] rounded-full p-[2px] flex items-center shadow-sm">
                                                    <div className="bg-blue-500 rounded-full p-[2px]">
                                                        <Heart size={10} className="fill-white text-white"/>
                                                    </div>
                                                    <span className="text-[#b0b3b8] text-[11px] ml-1 pr-1">{comment.likes}</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-3 text-[12px] font-bold text-[#b0b3b8] mt-1 ml-2">
                                            <span className="font-normal">{comment.time}</span>
                                            <button onClick={() => handleCommentLike(comment.id)} className={`hover:underline ${comment.isLiked ? "text-blue-500" : ""}`}>Like</button>
                                            <button onClick={() => handleCommentReply(comment.user)} className="hover:underline">Reply</button>
                                        </div>
                                    </div>
                                </div>
                            ))) : (
                                <p className="text-[15px] text-[#b0b3b8] italic pl-2">No comments yet. Be the first!</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Input Bar */}
                <div className="p-4 border-t border-[#3e4042] bg-[#242526] shrink-0">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#3a3b3c] flex items-center justify-center shrink-0">
                            <span className="text-xs font-bold text-white">Y</span>
                        </div>
                        <div className="flex-1 bg-[#3a3b3c] rounded-full flex items-center px-4 py-2 gap-2">
                            <input 
                                ref={commentInputRef}
                                type="text" 
                                placeholder="Comment as You..." 
                                className="bg-transparent border-none outline-none text-[#e4e6eb] flex-1 text-[15px] placeholder-[#b0b3b8]" 
                                value={newComment} 
                                onChange={(e) => setNewComment(e.target.value)} 
                                onKeyDown={(e) => e.key === 'Enter' && handlePostComment()}
                            />
                            <div className="flex items-center gap-2 text-[#b0b3b8] shrink-0">
                                <Smile size={20} className="hover:text-[#e4e6eb] cursor-pointer" />
                                <ImageIcon size={20} className="hover:text-[#e4e6eb] cursor-pointer" />
                            </div>
                        </div>
                        <button onClick={handlePostComment} disabled={!newComment.trim()} className="hover:bg-[#3a3b3c] p-2 rounded-full transition-colors shrink-0">
                            <Send size={20} className={newComment.trim() ? "text-[#3b5998]" : "text-[#b0b3b8]"} />
                        </button>
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
