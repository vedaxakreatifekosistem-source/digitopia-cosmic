
import React, { useState, useEffect, useRef } from "react";
import { Star, MessageCircle, Share2, Heart, Send, Check, MoreHorizontal, Edit, Settings, Image as ImageIcon, Instagram, Twitter, Youtube, Globe, Crown, Zap, Shield, Bookmark, Smile, X, Search, SortAsc, ShoppingBag, ChevronRight, Trophy, Copy, Facebook, Linkedin, Link as LinkIcon, Paperclip, ArrowLeft, MoreVertical, Phone, Video, Download, Calendar, Flame, Coins, Wallet, Award, Lock, Plus, Sparkles, Clock } from "lucide-react";
import { Progress } from "./ui/progress";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogDescription } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { SidebarSection, OrderCard, TransactionCard, SubscriptionCard, formatPrice } from "./ProfileShared";

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

const PRICE_RANGES = [
    { id: 'under-50k', label: "Under 50.000", min: 0, max: 49999 },
    { id: '50k-100k', label: "50.000 - 100.000", min: 50000, max: 100000 },
    { id: 'above-100k', label: "Above 100.000", min: 100001, max: Infinity },
];

// Mock Data for Support Board (Received)
const supportData = [
  { id: 1, user: "Fareye Closhartt", type: "Gift", item: "High Five ✋", price: "Rp 0", message: "Thanks for joining my stream!", time: "1 day ago", reply: "You're welcome! It was fun!", replyUser: "John Doe", avatarColor: "from-purple-400 to-indigo-500" },
  { id: 2, user: "Zenyth Prime", type: "Tipping", item: "Coffee ☕", price: "Rp 25.000", message: "Nice fanart you made!", time: "3 days ago", reply: null, avatarColor: "from-blue-400 to-cyan-500" },
];

// Mock Data for Creator Feed (Posts from people the fan follows)
const initialCreatorFeedData = [
  { 
    id: 101, 
    creator: "Zenyth Prime",
    username: "@zenyth",
    avatar: imgGrid1,
    content: "My Raiden Shogun cosplay set is finally complete! ⚡💜 Check out the full photopack in my shop. It was a long journey crafting this armor.", 
    image: imgGrid4, // Optional image
    likes: 1240, 
    comments: 89, 
    shares: 245, 
    time: "2h ago",
    verified: true,
    isLiked: false
  },
  { 
    id: 102, 
    creator: "Avianna Skylark",
    username: "@avianna",
    avatar: imgGrid3,
    content: "Stream starts in 1 hour! We're doing a karaoke endurance stream today 🎤🎶 don't miss it!", 
    likes: 850, 
    comments: 120, 
    shares: 40, 
    time: "5h ago",
    verified: true,
    isLiked: false
  },
  { 
    id: 103, 
    creator: "Fareye Closhartt",
    username: "@fareye",
    avatar: imgGrid5,
    content: "Thank you for the support on the sticker pack launch! You guys are amazing 😭💖 new designs coming next month.", 
    likes: 2100, 
    comments: 340, 
    shares: 112, 
    time: "1d ago",
    verified: true,
    isLiked: false
  }
];

// Mock Data for Purchases
const purchaseHistory = [
    { 
        id: 1, 
        orderId: "CSM-ORD-8821",
        item: "Raiden Shogun Cosplay", 
        category: "Costume",
        creator: "Zenyth Prime", 
        price: 1200000, 
        fee: 5000,
        total: 1205000,
        date: "01 Dec 2023", 
        image: imgGrid4, 
        status: "Shipped",
        badgeText: "Physical Item"
    },
    { 
        id: 2, 
        orderId: "CSM-ORD-9932",
        item: "Voice Pack Vol.1", 
        category: "Digital",
        creator: "Celeste Moon", 
        price: 9000, 
        fee: 1000,
        total: 10000,
        date: "25 Dec 2023", 
        image: imgGrid6, 
        status: "Completed",
        badgeText: "Instant Download"
    },
    { 
        id: 3, 
        orderId: "CSM-ORD-7714",
        item: "Hololive Sticker Pack", 
        category: "Merchandise",
        creator: "Fareye Closhartt", 
        price: 45000, 
        fee: 2500,
        total: 47500,
        date: "20 Nov 2023", 
        image: imgGrid2, 
        status: "Completed",
        badgeText: "Physical Item"
    },
];

// Mock Data for Transactions
const transactionHistory = [
    { 
        id: 1, 
        transactionId: "TRX-TIP-7731", 
        type: "Tipping", 
        description: "Gift to Zenyth Prime", 
        amount: -25000, 
        date: "05 Dec 2023", 
        status: "Success", 
        image: imgGrid1 
    },
    { 
        id: 2, 
        transactionId: "TRX-SUB-3355", 
        type: "Subscription", 
        description: "Monthly Tier - Avianna", 
        amount: -50000, 
        date: "01 Jan 2024", 
        status: "Success", 
        image: imgGrid3 
    },
    { 
        id: 3, 
        transactionId: "TRX-SUP-8822", 
        type: "Support", 
        description: "Crowdfunding Project X", 
        amount: -100000, 
        date: "10 Jan 2024", 
        status: "Success", 
        image: imgGrid5 
    },
    { 
        id: 4, 
        transactionId: "TRX-SUP-9911", 
        type: "Support", 
        description: "Charity Stream Donation", 
        amount: -50000, 
        date: "15 Jan 2024", 
        status: "Success", 
        image: imgGrid2 
    },
];

// Mock Data for Subscriptions
const subscriptionHistory = [
    {
        id: 1,
        creator: "Zenyth Prime",
        plan: "Warrior Tier",
        status: "Active",
        purchaseDate: "05 Jan 2024",
        planDuration: "1 Month",
        renewalDate: "05 Feb 2024",
        price: 50000,
        image: imgGrid1,
        features: ["Exclusive Content", "Fan Badge", "Discord Access"]
    },
    {
        id: 2,
        creator: "Avianna Skylark",
        plan: "Angel Tier",
        status: "Active",
        purchaseDate: "12 Jan 2024",
        planDuration: "1 Month",
        renewalDate: "12 Feb 2024",
        price: 75000,
        image: imgGrid3,
        features: ["Early Access", "Shoutout on Stream", "Digital Wallpaper"]
    },
    {
        id: 3,
        creator: "Fareye Closhartt",
        plan: "Basic Supporter",
        status: "Expired",
        purchaseDate: "20 Dec 2023",
        planDuration: "1 Month",
        renewalDate: "20 Jan 2024",
        price: 25000,
        image: imgGrid5,
        features: ["Supporter Badge", "Vote on Content"]
    },
    {
        id: 4,
        creator: "Celeste Moon",
        plan: "Moonlight VIP",
        status: "Active",
        purchaseDate: "01 Dec 2023",
        planDuration: "3 Months",
        renewalDate: "01 Mar 2024",
        price: 150000,
        image: imgGrid6,
        features: ["VIP Discord Role", "Monthly Merch Discount", "Private Live Stream"]
    }
];

// Mock Data for Followers/Following
const followersData = [
  { id: 1, name: "Zenyth Prime", role: "Cosplayer", rating: 5, verified: true, image: imgGrid1, banner: imgGrid2 },
  { id: 2, name: "Avianna Skylark", role: "Vtuber", rating: 4, verified: true, image: imgGrid3, banner: imgGrid4 },
  { id: 3, name: "Fareye Closhartt", role: "Illustrator", rating: 5, verified: true, image: imgGrid5, banner: imgGrid6 },
];

const mockStories = [
  {
    id: 1,
    creator: "Zenyth Prime",
    avatar: imgGrid1,
    media: imgGrid4,
    caption: "WIP: Styling the Raiden Shogun wig for the upcoming photoshoot! ⚡💜",
    seen: false
  },
  {
    id: 2,
    creator: "Avianna Skylark",
    avatar: imgGrid3,
    media: imgGrid3,
    caption: "Endurance karaoke playlist is ready! See you guys in an hour 🎤🎶",
    seen: false
  },
  {
    id: 3,
    creator: "Fareye Closhartt",
    avatar: imgGrid5,
    media: imgGrid5,
    caption: "New sticker designs sneak peek... what do you think? 👀💖",
    seen: false
  },
  {
    id: 4,
    creator: "Celeste Moon",
    avatar: imgGrid6,
    media: imgGrid6,
    caption: "Moonlight VIP photoshoot sneak peek! 🌕✨ Exclusive content is ready.",
    seen: false
  }
];

// Mock Data for Supporting Leaderboard (My Top Supported)
const supportingLeaderboard = [
    { id: 1, name: "Zenyth Prime", total: 5500000, image: imgGrid1 },
    { id: 2, name: "Avianna Skylark", total: 3200000, image: imgGrid3 },
    { id: 3, name: "Fareye Closhartt", total: 1500000, image: imgGrid5 },
    { id: 4, name: "Celeste Moon", total: 750000, image: imgGrid2 },
    { id: 5, name: "Garen Might", total: 500000, image: imgGrid4 },
];

// --- MOCK DATA FOR MESSAGES ---
const initialConversations = [
    {
        id: 1,
        creatorId: 1,
        name: "Zenyth Prime",
        avatar: imgGrid1,
        verified: true,
        lastMessage: "Thank you for purchasing the Raiden Shogun set! 💜 Let me know if you need help wearing it.",
        time: "10:30 AM",
        unread: 2,
        type: "order_reply" 
    },
    {
        id: 2,
        creatorId: 2,
        name: "Avianna Skylark",
        avatar: imgGrid3,
        verified: true,
        lastMessage: "Hey! Just wanted to say thanks for the support on the stream yesterday! 🎤",
        time: "Yesterday",
        unread: 0,
        type: "chat"
    },
    {
        id: 3,
        creatorId: 3,
        name: "Fareye Closhartt",
        avatar: imgGrid5,
        verified: true,
        lastMessage: "The sticker pack has been shipped! Here is your tracking number: CSM-8821.",
        time: "2 days ago",
        unread: 0,
        type: "order_reply"
    }
];

const initialChatHistory = {
    1: [
        { id: 1, sender: "system", type: "order_notification", text: "You purchased Raiden Shogun Cosplay", product: { name: "Raiden Shogun Cosplay", image: imgGrid4, price: 1200000 }, time: "Yesterday, 2:00 PM" },
        { id: 2, sender: "creator", text: "Hi John! Thank you so much for your purchase! 💜", time: "Yesterday, 2:05 PM" },
        { id: 3, sender: "me", text: "Can't wait to receive it! Is it pre-styled?", time: "Yesterday, 2:10 PM" },
        { id: 4, sender: "creator", text: "Yes, the wig comes pre-styled but might need a little touch-up after shipping.", time: "Yesterday, 2:12 PM" },
        { id: 5, sender: "creator", text: "Thank you for purchasing the Raiden Shogun set! 💜 Let me know if you need help wearing it.", time: "10:30 AM" }
    ],
    2: [
        { id: 1, sender: "creator", text: "Hey! Just wanted to say thanks for the support on the stream yesterday! 🎤", time: "Yesterday, 9:00 PM" }
    ],
    3: [
        { id: 1, sender: "system", type: "order_notification", text: "You purchased Hololive Sticker Pack", product: { name: "Hololive Sticker Pack", image: imgGrid2, price: 45000 }, time: "2 days ago" },
        { id: 2, sender: "creator", text: "The sticker pack has been shipped! Here is your tracking number: CSM-8821.", time: "2 days ago" }
    ]
};

const initialComments = [
    { id: 1, user: "cosplay_lover", text: "Good luck with your project!", time: "2h", isLiked: false, likes: 0 },
];

export default function FansProfile({ onProductSelect, onNavigate }: { onProductSelect?: (product: any) => void; onNavigate?: (view: string) => void }) {
  const [activeTab, setActiveTab] = useState("Home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [feedPosts, setFeedPosts] = useState(initialCreatorFeedData);
  const [selectedPost, setSelectedPost] = useState<any>(null);

  // Stories State & useEffect
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);
  const [stories, setStories] = useState(mockStories);

  useEffect(() => {
    if (activeStoryIndex === null) return;
    
    const timer = setTimeout(() => {
      if (activeStoryIndex < stories.length - 1) {
        const nextIndex = activeStoryIndex + 1;
        setStories(prev => prev.map((s, i) => i === nextIndex ? { ...s, seen: true } : s));
        setActiveStoryIndex(nextIndex);
      } else {
        setActiveStoryIndex(null);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [activeStoryIndex, stories.length]);
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false);
  const [postComments, setPostComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");
  const [quickComments, setQuickComments] = useState<Record<number, string>>({});
  
  // Messages State
  const [conversations, setConversations] = useState(initialConversations);
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  const [chatMessages, setChatMessages] = useState<Record<number, any[]>>(initialChatHistory);
  const [chatInput, setChatInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Share Dialog State
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [copied, setCopied] = useState(false);

  // Filter States
  const [purchaseSearch, setPurchaseSearch] = useState('');
  const [selectedPurchaseCategories, setSelectedPurchaseCategories] = useState<string[]>([]);
  const [selectedPurchasePrices, setSelectedPurchasePrices] = useState<string[]>([]);
  const [transactionSearch, setTransactionSearch] = useState('');
  const [selectedTransactionTypes, setSelectedTransactionTypes] = useState<string[]>([]);
  const [selectedTransactionPrices, setSelectedTransactionPrices] = useState<string[]>([]);
  const [subscriptionSearch, setSubscriptionSearch] = useState('');
  const [selectedSubscriptionStatus, setSelectedSubscriptionStatus] = useState<string[]>([]);

  // Toggle Handlers
  const togglePurchaseCategory = (cat: string) => setSelectedPurchaseCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
  const togglePurchasePrice = (rangeId: string) => setSelectedPurchasePrices(prev => prev.includes(rangeId) ? prev.filter(r => r !== rangeId) : [...prev, rangeId]);
  const toggleTransactionType = (type: string) => setSelectedTransactionTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
  const toggleTransactionPrice = (rangeId: string) => setSelectedTransactionPrices(prev => prev.includes(rangeId) ? prev.filter(r => r !== rangeId) : [...prev, rangeId]);
  const toggleSubscriptionStatus = (status: string) => setSelectedSubscriptionStatus(prev => prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]);

  // Filters
  const filteredPurchases = purchaseHistory.filter(item => {
    const matchSearch = item.item.toLowerCase().includes(purchaseSearch.toLowerCase()) || item.orderId.toLowerCase().includes(purchaseSearch.toLowerCase());
    const matchCategory = selectedPurchaseCategories.length === 0 || selectedPurchaseCategories.includes(item.badgeText);
    const matchPrice = selectedPurchasePrices.length === 0 || selectedPurchasePrices.some(rangeId => {
        const range = PRICE_RANGES.find(r => r.id === rangeId);
        return range ? item.total >= range.min && item.total <= range.max : false;
    });
    return matchSearch && matchCategory && matchPrice;
  });

  const filteredTransactions = transactionHistory.filter(item => {
    const matchSearch = item.description.toLowerCase().includes(transactionSearch.toLowerCase()) || item.transactionId.toLowerCase().includes(transactionSearch.toLowerCase());
    const matchType = selectedTransactionTypes.length === 0 || selectedTransactionTypes.includes(item.type);
    const absAmount = Math.abs(item.amount);
    const matchPrice = selectedTransactionPrices.length === 0 || selectedTransactionPrices.some(rangeId => {
        const range = PRICE_RANGES.find(r => r.id === rangeId);
        return range ? absAmount >= range.min && absAmount <= range.max : false;
    });
    return matchSearch && matchType && matchPrice;
  });

  const filteredSubscriptions = subscriptionHistory.filter(item => {
    const matchSearch = item.creator.toLowerCase().includes(subscriptionSearch.toLowerCase()) || item.plan.toLowerCase().includes(subscriptionSearch.toLowerCase());
    const matchStatus = selectedSubscriptionStatus.length === 0 || selectedSubscriptionStatus.includes(item.status);
    return matchSearch && matchStatus;
  });

  // Post Actions
  const handleLike = (postId: number) => {
    setFeedPosts(prev => prev.map(post => post.id === postId ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 } : post));
    if (selectedPost && selectedPost.id === postId) {
        setSelectedPost((prev: any) => ({ ...prev, isLiked: !prev.isLiked, likes: !prev.isLiked ? prev.likes + 1 : prev.likes - 1 }));
    }
  };

  const handlePostClick = (post: any) => {
    setSelectedPost(post);
    setIsPostDialogOpen(true);
  };

  const handleShare = (post: any) => {
    setShareLink(`https://cosmic.app/post/${post.id}`);
    setIsShareOpen(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const commentInputRef = useRef<HTMLInputElement>(null);

  const handlePostComment = () => {
    if (!newComment.trim()) return;
    setPostComments([{ id: postComments.length + 1, user: "You", text: newComment, time: "Just now", isLiked: false, likes: 0 }, ...postComments]);
    if (selectedPost) {
        setFeedPosts(prev => prev.map(post => post.id === selectedPost.id ? {...post, comments: post.comments + 1} : post));
        setSelectedPost((prev: any) => ({...prev, comments: prev.comments + 1}));
    }
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

  const handleQuickCommentChange = (postId: number, value: string) => setQuickComments(prev => ({...prev, [postId]: value}));
  const handleQuickCommentSubmit = (postId: number) => {
    if (!quickComments[postId]?.trim()) return;
    setFeedPosts(prev => prev.map(post => post.id === postId ? { ...post, comments: post.comments + 1 } : post));
    setQuickComments(prev => ({...prev, [postId]: ""}));
  };

  // Chat Functions
  const handleSendMessage = () => {
    if (!chatInput.trim() || activeChatId === null) return;
    const newMessage = { id: Date.now(), sender: "me", text: chatInput, time: "Just now" };
    setChatMessages(prev => ({ ...prev, [activeChatId]: [...(prev[activeChatId] || []), newMessage] }));
    setConversations(prev => prev.map(conv => conv.id === activeChatId ? { ...conv, lastMessage: chatInput, time: "Just now" } : conv));
    setChatInput("");
  };

  useEffect(() => {
    if (activeChatId && chatEndRef.current) {
        chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, activeChatId]);

  return (
    <div className="bg-black min-h-screen w-full pt-[80px] text-white font-sans animate-in fade-in duration-500 flex flex-col items-center">
      
      <div className="w-full max-w-screen px-4 md:px-10 pb-20">
        
        {/* Banner Area */}
        <div className="relative w-full h-[150px] md:h-[250px] rounded-b-[24px] md:rounded-[24px] overflow-hidden bg-gray-900 mt-0 md:mt-6">
            <img src={imgBanner} className="w-full h-full object-cover opacity-80" alt="Banner" loading="lazy" decoding="async" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </div>

        {/* Profile Header Content */}
        <div className="relative px-2 md:px-10 -mt-[50px] md:-mt-[80px] z-10 mb-8">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
                <div className="relative w-[100px] h-[100px] md:w-[160px] md:h-[160px] rounded-[24px] md:rounded-[32px] border-4 border-black bg-black overflow-hidden shrink-0 shadow-2xl group">
                    <img src={imgAvatar} className="w-full h-full object-cover" alt="John Doe" loading="lazy" decoding="async" />
                </div>
                <div className="flex-1 flex flex-col md:flex-row items-center md:items-end justify-between w-full gap-4 text-center md:text-left">
                    <div className="flex flex-col gap-1 md:gap-2 items-center md:items-start">
                        <div className="flex items-center gap-2">
                            <h1 className="text-[24px] md:text-[36px] font-bold leading-tight">John Doe</h1>
                        </div>
                        <p className="text-gray-400 text-sm md:text-lg">@johndoe</p>
                    </div>
                    <div className="flex gap-3 w-full md:w-auto mt-4 md:mt-0 justify-center">
                        <button onClick={() => onNavigate?.('edit-profile')} className="h-[40px] px-6 bg-[#27272a] text-white font-bold rounded-full hover:bg-[#3f3f46] transition-colors flex items-center justify-center gap-2 cursor-pointer text-sm">
                            <Edit size={16} /> Edit Profile
                        </button>
                        <button onClick={() => onNavigate?.('become-creator')} className="h-[40px] px-6 bg-[#d032e5] text-white font-bold rounded-full hover:bg-[#a61cc9] transition-colors flex items-center justify-center gap-2 cursor-pointer text-sm shadow-[0_0_15px_rgba(208,50,229,0.3)]">
                            <Zap size={16} fill="white" /> Become Creator
                        </button>
                        <button onClick={() => onNavigate?.('creator-profile')} className="h-[40px] px-6 bg-[#27272a] border border-[#3f3f46] text-gray-300 font-bold rounded-full hover:bg-[#3f3f46] hover:text-white transition-colors flex items-center justify-center gap-2 cursor-pointer text-sm">
                            Creator Page
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-8 max-w-[800px] mx-auto md:mx-0 text-center md:text-left flex flex-col gap-4">
                <div>
                    <h3 className="text-lg font-bold text-white mb-2">About Me</h3>
                    <p className="text-gray-300 leading-relaxed text-sm md:text-base">Just a huge fan of cosplay and digital art! Always here to support the community. 🎨✨</p>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-3">
                    <button className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-gray-400 hover:text-[#E1306C] transition-all cursor-pointer"><Instagram size={18} /></button>
                    <button className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-gray-400 hover:text-[#1DA1F2] transition-all cursor-pointer"><Twitter size={18} /></button>
                </div>
            </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-800 mb-8 sticky top-[60px] md:top-[80px] bg-black/80 backdrop-blur-md z-40 mx-[-16px] px-[16px] md:mx-0 md:px-0">
            <div className="flex justify-start md:justify-center gap-8 px-4 overflow-x-auto scrollbar-none">
                {['Home', 'Messages', 'Purchase', 'Transaction', 'Subscribed', 'Following', 'Supporting', 'Badges'].map((tab) => (
                    <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-4 md:pb-5 text-sm sm:text-base md:text-lg font-medium transition-colors relative cursor-pointer whitespace-nowrap ${activeTab === tab ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}>
                        {tab}
                        {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white" />}
                    </button>
                ))}
            </div>
        </div>

        {/* Messages Tab Content */}
        {activeTab === 'Messages' && (
            <div className="w-full h-[calc(100vh-250px)] min-h-[500px] border border-[#27272a] rounded-[24px] bg-[#0c0c0c] overflow-hidden flex flex-col md:flex-row">
                <div className={`w-full md:w-[350px] border-r border-[#27272a] flex flex-col ${activeChatId !== null ? 'hidden md:flex' : 'flex'}`}>
                    <div className="p-4 border-b border-[#27272a]">
                        <h2 className="text-xl font-bold text-white mb-4">Messages</h2>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Search size={16} className="text-gray-500" /></div>
                            <input type="text" placeholder="Search messages..." className="w-full bg-[#18181b] border border-transparent focus:border-[#d032e5] rounded-xl py-2 pl-10 pr-4 text-sm text-white placeholder-gray-500 outline-none transition-all"/>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#27272a]">
                        {conversations.map((conv) => (
                            <div key={conv.id} onClick={() => setActiveChatId(conv.id)} className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-white/5 transition-colors border-b border-[#27272a] last:border-0 ${activeChatId === conv.id ? 'bg-white/5' : ''}`}>
                                <div className="relative shrink-0">
                                    <div className="w-12 h-12 rounded-full border border-gray-700 overflow-hidden"><img src={conv.avatar} alt={conv.name} className="w-full h-full object-cover" /></div>
                                    {conv.type === 'order_reply' && <div className="absolute -bottom-1 -right-1 bg-[#d032e5] rounded-full p-1 border-2 border-[#0c0c0c]"><ShoppingBag size={10} className="text-white" /></div>}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-0.5"><div className="flex items-center gap-1"><span className="font-bold text-sm text-white truncate">{conv.name}</span>{conv.verified && <Check size={10} className="text-[#d032e5]" strokeWidth={4} />}</div><span className="text-[10px] text-gray-500">{conv.time}</span></div>
                                    <div className="flex justify-between items-center"><p className={`text-xs truncate max-w-[180px] ${conv.unread > 0 ? 'text-white font-medium' : 'text-gray-400'}`}>{conv.lastMessage}</p>{conv.unread > 0 && <div className="w-5 h-5 bg-[#d032e5] rounded-full flex items-center justify-center text-[10px] font-bold text-white">{conv.unread}</div>}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={`flex-1 flex-col bg-[#080808] ${activeChatId !== null ? 'flex' : 'hidden md:flex'}`}>
                    {activeChatId ? (
                        <>
                            <div className="h-[70px] border-b border-[#27272a] flex items-center justify-between px-6 bg-[#0c0c0c]">
                                <div className="flex items-center gap-4">
                                    <button onClick={() => setActiveChatId(null)} className="md:hidden text-gray-400 hover:text-white"><ArrowLeft size={20} /></button>
                                    <div className="w-10 h-10 rounded-full border border-gray-700 overflow-hidden relative"><img src={conversations.find(c => c.id === activeChatId)?.avatar} alt="Active User" className="w-full h-full object-cover" /><div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#0c0c0c] rounded-full"></div></div>
                                    <div><h3 className="font-bold text-white text-base leading-tight">{conversations.find(c => c.id === activeChatId)?.name}</h3><span className="text-xs text-green-500 font-medium">Online</span></div>
                                </div>
                                <div className="flex items-center gap-4 text-gray-400"><Phone size={20} className="cursor-pointer hover:text-white transition-colors" /><Video size={22} className="cursor-pointer hover:text-white transition-colors" /><div className="w-px h-6 bg-[#27272a]" /><MoreVertical size={20} className="cursor-pointer hover:text-white transition-colors" /></div>
                            </div>
                            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                {chatMessages[activeChatId]?.map((msg, idx) => (
                                    <div key={msg.id} className={`flex w-full ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`flex flex-col gap-1 max-w-[70%] ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}>
                                            {msg.type === 'order_notification' && msg.product && (
                                                <div className="bg-[#18181b] border border-[#27272a] rounded-xl overflow-hidden mb-2 w-full max-w-[280px]">
                                                    <div className="h-[140px] w-full bg-gray-800"><img src={msg.product.image} alt={msg.product.name} className="w-full h-full object-cover" /></div>
                                                    <div className="p-3"><p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold mb-1">Purchased Product</p><h4 className="text-sm font-bold text-white line-clamp-1">{msg.product.name}</h4><p className="text-[#d032e5] text-sm font-bold mt-1">{formatPrice(msg.product.price)}</p></div>
                                                </div>
                                            )}
                                            <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.sender === 'me' ? 'bg-[#d032e5] text-white rounded-br-none' : msg.sender === 'system' ? 'bg-transparent text-gray-400 text-center w-full italic' : 'bg-[#27272a] text-gray-200 rounded-bl-none'}`}>{msg.text}</div>
                                            {msg.sender !== 'system' && <span className="text-[10px] text-gray-500 px-1">{msg.time}</span>}
                                        </div>
                                    </div>
                                ))}
                                <div ref={chatEndRef} />
                            </div>
                            <div className="p-4 bg-[#0c0c0c] border-t border-[#27272a]">
                                <div className="flex items-center gap-3 bg-[#18181b] p-2 pr-3 rounded-full border border-[#27272a] focus-within:border-[#d032e5] transition-colors">
                                    <button className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"><Paperclip size={20} /></button>
                                    <input type="text" placeholder="Type a message..." className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder-gray-500" value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}/>
                                    <button onClick={handleSendMessage} disabled={!chatInput.trim()} className={`p-2 rounded-full transition-all ${chatInput.trim() ? 'bg-[#d032e5] text-white hover:bg-[#b02bc4]' : 'bg-transparent text-gray-600'}`}><Send size={18} /></button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center p-8 gap-4"><div className="w-20 h-20 bg-[#18181b] rounded-full flex items-center justify-center mb-2"><MessageCircle size={40} className="text-gray-600" /></div><h3 className="text-xl font-bold text-white">Select a Conversation</h3><p className="text-gray-400 max-w-[300px]">Choose a chat from the list to start messaging with creators or view order updates.</p></div>
                    )}
                </div>
            </div>
        )}

        {/* Home Tab Content */}
        {activeTab === 'Home' && (
            <div className="flex flex-col gap-10">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    
                    {/* Left Column (Sticky Sidebar) */}
                    <div className="flex flex-col gap-6 lg:col-span-1 order-2 lg:order-1 lg:sticky lg:top-[140px] lg:h-fit lg:self-start">
                        
                        {/* Activity Feed Widget */}
                        <div className="bg-[#0b0a10] border border-[#221e35] rounded-[24px] p-4 md:p-6 flex flex-col gap-6">
                            <div className="flex items-center gap-2">
                                <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                <h3 className="text-sm font-bold text-gray-400 tracking-wider uppercase">Activity Feed</h3>
                            </div>
                            <div className="flex flex-col gap-5">
                                {/* Feed item 1 */}
                                <div className="flex gap-3 items-start">
                                    <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 font-bold text-xs flex items-center justify-center shrink-0 text-zinc-300">
                                        ZP
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-sm text-gray-300 leading-tight">
                                            <span className="font-bold text-white hover:underline cursor-pointer">Zenyth Prime</span> membalas komentar kamu
                                        </p>
                                        <span className="text-xs text-gray-500 mt-1">5 menit lalu</span>
                                    </div>
                                </div>
                                {/* Feed item 2 */}
                                <div className="flex gap-3 items-start">
                                    <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 font-bold text-xs flex items-center justify-center shrink-0 text-zinc-300">
                                        AS
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-sm text-gray-300 leading-tight">
                                            Kamu baru <span className="font-bold text-white">subscribe</span> <span className="font-semibold text-gray-200">Avianna Skylark — Angel Tier</span>
                                        </p>
                                        <span className="text-xs text-gray-500 mt-1">2 hari lalu</span>
                                    </div>
                                </div>
                                {/* Feed item 3 */}
                                <div className="flex gap-3 items-start">
                                    <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 font-bold text-xs flex items-center justify-center shrink-0 text-zinc-300">
                                        ZP
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-sm text-gray-300 leading-tight">
                                            Kamu <span className="font-bold text-white">tipping</span> Rp 25.000 ke Zenyth Prime
                                        </p>
                                        <span className="text-xs text-gray-500 mt-1">3 hari lalu</span>
                                    </div>
                                </div>
                                {/* Feed item 4 */}
                                <div className="flex gap-3 items-start">
                                    <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 font-bold text-xs flex items-center justify-center shrink-0 text-zinc-300">
                                        CM
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-sm text-gray-300 leading-tight">
                                            Kamu beli produk <span className="font-bold text-white">Moonlight Wallpack</span>
                                        </p>
                                        <span className="text-xs text-gray-500 mt-1">1 minggu lalu</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Upcoming Events Widget */}
                        <div className="bg-[#0b0a10] border border-[#221e35] rounded-[24px] p-4 md:p-6 flex flex-col gap-6">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-violet-400" />
                                <h3 className="text-xs font-bold text-gray-400 tracking-wider uppercase">Upcoming Events</h3>
                            </div>
                            <div className="flex flex-col gap-6">
                                {/* Event 1 */}
                                <div className="flex flex-col gap-1">
                                    <h4 className="font-bold text-sm text-white hover:text-violet-400 cursor-pointer transition-colors leading-snug">Cosplay Fest Jakarta 2025</h4>
                                    <p className="text-xs text-gray-500">14 Juli 2025 · JCC Senayan</p>
                                    <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-[#1e293b]/50 border border-violet-500/20 text-violet-400 font-bold text-[11px] rounded-full w-fit">
                                        <Clock size={12} className="text-violet-400" />
                                        <span>40 hari lagi</span>
                                    </div>
                                </div>
                                {/* Event 2 */}
                                <div className="flex flex-col gap-1">
                                    <h4 className="font-bold text-sm text-white hover:text-violet-400 cursor-pointer transition-colors leading-snug">Zenyth Prime Meet & Greet</h4>
                                    <p className="text-xs text-gray-500">22 Juni 2025 · Online</p>
                                    <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-[#1e293b]/50 border border-violet-500/20 text-violet-400 font-bold text-[11px] rounded-full w-fit">
                                        <Clock size={12} className="text-violet-400" />
                                        <span>18 hari lagi</span>
                                    </div>
                                </div>
                                {/* Event 3 */}
                                <div className="flex flex-col gap-1">
                                    <h4 className="font-bold text-sm text-white hover:text-violet-400 cursor-pointer transition-colors leading-snug">Avianna Live Painting Session</h4>
                                    <p className="text-xs text-gray-500">30 Juni 2025 · Live Stream</p>
                                    <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-[#1e293b]/50 border border-violet-500/20 text-violet-400 font-bold text-[11px] rounded-full w-fit">
                                        <Clock size={12} className="text-violet-400" />
                                        <span>26 hari lagi</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Rekomendasi Creator Widget */}
                        <div className="bg-[#0b0a10] border border-[#221e35] rounded-[24px] p-4 md:p-6 flex flex-col gap-6">
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-violet-400" />
                                <h3 className="text-xs font-bold text-gray-400 tracking-wider uppercase">REKOMENDASI CREATOR</h3>
                            </div>
                            <div className="flex flex-col gap-5">
                                {/* Creator 1 */}
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-2 min-w-0">
                                        <div className="w-9 h-9 rounded-full bg-zinc-800 border border-zinc-700 font-bold text-xs flex items-center justify-center text-zinc-300 shrink-0">RK</div>
                                        <div className="min-w-0">
                                            <p className="text-xs font-bold text-white truncate hover:underline cursor-pointer">Rika Kurosawa</p>
                                            <p className="text-[10px] text-gray-500 truncate mt-0.5">Cosplay · Anime</p>
                                        </div>
                                    </div>
                                    <button className="px-4 py-1.5 bg-white text-black hover:bg-neutral-200 transition-colors rounded-full text-xs font-bold shrink-0 shadow-lg cursor-pointer">
                                        Follow
                                    </button>
                                </div>
                                {/* Creator 2 */}
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-2 min-w-0">
                                        <div className="w-9 h-9 rounded-full bg-zinc-800 border border-zinc-700 font-bold text-xs flex items-center justify-center text-zinc-300 shrink-0">HM</div>
                                        <div className="min-w-0">
                                            <p className="text-xs font-bold text-white truncate hover:underline cursor-pointer">Hana Mizuki</p>
                                            <p className="text-[10px] text-gray-500 truncate mt-0.5">Digital Art</p>
                                        </div>
                                    </div>
                                    <button className="px-4 py-1.5 bg-white text-black hover:bg-neutral-200 transition-colors rounded-full text-xs font-bold shrink-0 shadow-lg cursor-pointer">
                                        Follow
                                    </button>
                                </div>
                                {/* Creator 3 */}
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-2 min-w-0">
                                        <div className="w-9 h-9 rounded-full bg-zinc-800 border border-zinc-700 font-bold text-xs flex items-center justify-center text-zinc-300 shrink-0">YC</div>
                                        <div className="min-w-0">
                                            <p className="text-xs font-bold text-white truncate hover:underline cursor-pointer">Yuna Chen</p>
                                            <p className="text-[10px] text-gray-500 truncate mt-0.5">Cosplay · Photographer</p>
                                        </div>
                                    </div>
                                    <button className="px-4 py-1.5 bg-white text-black hover:bg-neutral-200 transition-colors rounded-full text-xs font-bold shrink-0 shadow-lg cursor-pointer">
                                        Follow
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Middle Column (Filters, and Feed Posts) */}
                    <div className="lg:col-span-2 flex flex-col gap-6 order-1 lg:order-2">

                        {/* Creator Stories Row Inside Middle Column */}
                        <div className="bg-[#0b0a10] border border-[#221e35] rounded-[24px] p-5">
                            <div className="flex gap-4 overflow-x-auto scrollbar-none pb-2">
                                {stories.map((story, idx) => (
                                    <button
                                        key={story.id}
                                        onClick={() => {
                                            setActiveStoryIndex(idx);
                                            setStories(prev => prev.map((s, i) => i === idx ? { ...s, seen: true } : s));
                                        }}
                                        className="flex flex-col items-center gap-2 group shrink-0 outline-none cursor-pointer"
                                    >
                                        <div className={`relative p-[3px] rounded-full transition-transform hover:scale-105 duration-300 ${story.seen ? 'bg-[#221e35]' : 'bg-gradient-to-tr from-[#9419BD] via-[#d032e5] to-[#f472b6]'}`}>
                                            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-black overflow-hidden bg-black">
                                                <img src={story.avatar} className="w-full h-full object-cover" alt={story.creator} loading="lazy" decoding="async" />
                                            </div>
                                            {!story.seen && (
                                                <div className="absolute -bottom-1 -right-1 bg-[#d032e5] text-white rounded-full p-[2px] border-2 border-black">
                                                    <Sparkles size={8} className="fill-white" />
                                                </div>
                                            )}
                                        </div>
                                        <span className={`text-[11px] md:text-xs transition-colors max-w-[80px] truncate text-center ${story.seen ? 'text-gray-500' : 'text-gray-200 group-hover:text-white font-medium'}`}>
                                            {story.creator}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Filter Tags */}
                        <div className="flex flex-wrap items-center gap-3 py-1">
                            <button className="px-5 py-2 rounded-xl bg-white text-black font-semibold text-sm transition-all hover:bg-neutral-200 cursor-pointer">
                                Semua
                            </button>
                            <button className="px-5 py-2 rounded-xl bg-[#0b0a10] border border-[#221e35] text-gray-300 font-semibold text-sm transition-all hover:border-zinc-600 hover:text-white cursor-pointer">
                                Art
                            </button>
                            <button className="px-5 py-2 rounded-xl bg-[#0b0a10] border border-[#221e35] text-gray-300 font-semibold text-sm transition-all hover:border-zinc-600 hover:text-white cursor-pointer">
                                Cosplay
                            </button>
                            <button className="px-5 py-2 rounded-xl bg-[#0b0a10] border border-[#221e35] text-gray-300 font-semibold text-sm transition-all hover:border-zinc-600 hover:text-white cursor-pointer">
                                Live
                            </button>
                            <button className="px-5 py-2 rounded-xl bg-[#0b0a10] border border-[#221e35] text-gray-300 font-semibold text-sm transition-all hover:border-zinc-600 hover:text-white cursor-pointer flex items-center gap-1.5">
                                <Lock size={12} className="text-zinc-500" />
                                <span>Exclusive</span>
                            </button>
                        </div>

                        {/* Feed Posts */}
                        <div className="flex flex-col gap-6">
                            
                            {/* Post 1 (Zenyth Prime) */}
                            {feedPosts[0] && (
                                <div className="bg-[#0b0a10] border border-[#221e35] rounded-[24px] p-4 md:p-6 flex flex-col gap-4">
                                    {/* Header */}
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-xs border border-zinc-700">ZP</div>
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-1">
                                                    <span className="font-bold text-sm text-white hover:underline cursor-pointer">Zenyth Prime</span>
                                                    <div className="bg-[#d032e5] rounded-full p-[2px] w-3.5 h-3.5 flex items-center justify-center"><Check size={8} className="text-white" strokeWidth={5} /></div>
                                                </div>
                                                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                                    <span>@zenyth</span>
                                                    <span>•</span>
                                                    <span>2h ago</span>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Status Badge Upper Right */}
                                        <div className="flex items-center gap-2">
                                            <button className="text-gray-500 hover:text-white cursor-pointer"><MoreHorizontal size={20}/></button>
                                        </div>
                                    </div>
                                    {/* Description */}
                                    <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                                        My Raiden Shogun cosplay set is finally complete! Check out the full photopack in my shop. It was a long journey crafting this armor.
                                    </p>
                                    {/* Post Visual Content Widget */}
                                    <div className="w-full h-[240px] md:h-[325px] bg-[#07060a] border border-[#221e35] rounded-2xl overflow-hidden hover:border-[#d032e5]/50 transition-all cursor-pointer">
                                        <img src={feedPosts[0].image || imgGrid4} className="w-full h-full object-cover" alt="Post content" loading="lazy" decoding="async" referrerPolicy="no-referrer" />
                                    </div>
                                    {/* Actions */}
                                    <div className="flex items-center justify-between border-t border-zinc-800/60 pt-4 mt-2">
                                        <div className="flex gap-6 items-center">
                                            <button onClick={() => handleLike(feedPosts[0].id)} className={`flex items-center gap-2 group cursor-pointer text-sm font-medium ${feedPosts[0].isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}>
                                                <Heart size={18} className={feedPosts[0].isLiked ? 'fill-red-500 text-red-500' : 'group-hover:fill-red-500 text-gray-400'} />
                                                <span>{feedPosts[0].likes}</span>
                                            </button>
                                            <button onClick={() => handlePostClick(feedPosts[0])} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors cursor-pointer text-sm font-medium">
                                                <MessageCircle size={18} />
                                                <span>{feedPosts[0].comments}</span>
                                            </button>
                                            <button onClick={() => handleShare(feedPosts[0])} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors cursor-pointer text-sm font-medium">
                                                <Share2 size={18} />
                                                <span>{feedPosts[0].shares}</span>
                                            </button>
                                        </div>
                                        {/* Tipping quick action */}
                                        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#d032e5]/10 hover:bg-[#d032e5]/20 text-[#d032e5] text-xs font-bold rounded-lg border border-[#d032e5]/30 transition-all">
                                            <Coins size={14} className="text-[#d032e5]" />
                                            <span>Support</span>
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Post 2 (Avianna Skylark) */}
                            {feedPosts[1] && (
                                <div className="bg-[#0b0a10] border border-[#221e35] rounded-[24px] p-4 md:p-6 flex flex-col gap-4">
                                    {/* Header */}
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-xs border border-zinc-700">AS</div>
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-1">
                                                    <span className="font-bold text-sm text-white hover:underline cursor-pointer">Avianna Skylark</span>
                                                    <div className="bg-[#d032e5] rounded-full p-[2px] w-3.5 h-3.5 flex items-center justify-center"><Check size={8} className="text-white" strokeWidth={5} /></div>
                                                </div>
                                                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                                    <span>@avianna</span>
                                                    <span>•</span>
                                                    <span>5h ago</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="text-gray-500 hover:text-white cursor-pointer"><MoreHorizontal size={20}/></button>
                                    </div>
                                    {/* Description */}
                                    <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                                        Speed paint session malam ini jam 8! Mau gambar fanart Oshi no Ko tema Galaxy. Jangan lupa hadir ya!
                                    </p>
                                    {/* Actions */}
                                    <div className="flex items-center justify-between border-t border-zinc-800/60 pt-4 mt-2">
                                        <div className="flex gap-6 items-center">
                                            <button onClick={() => handleLike(feedPosts[1].id)} className={`flex items-center gap-2 group cursor-pointer text-sm font-medium ${feedPosts[1].isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}>
                                                <Heart size={18} className={feedPosts[1].isLiked ? 'fill-red-500 text-red-500' : 'group-hover:fill-red-500 text-gray-400'} />
                                                <span>892</span>
                                            </button>
                                            <button onClick={() => handlePostClick(feedPosts[1])} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors cursor-pointer text-sm font-medium">
                                                <MessageCircle size={18} />
                                                <span>134</span>
                                            </button>
                                            <button onClick={() => handleShare(feedPosts[1])} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors cursor-pointer text-sm font-medium">
                                                <Share2 size={18} />
                                                <span>67</span>
                                            </button>
                                        </div>
                                        {/* Tipping quick action */}
                                        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#d032e5]/10 hover:bg-[#d032e5]/20 text-[#d032e5] text-xs font-bold rounded-lg border border-[#d032e5]/30 transition-all">
                                            <Coins size={14} className="text-[#d032e5]" />
                                            <span>Support</span>
                                        </button>
                                    </div>
                                </div>
                            )}

                        </div>

                    </div>

                    {/* Right Column (Sidebar Widgets) */}
                    <div className="flex flex-col gap-6 lg:col-span-1 order-3 lg:sticky lg:top-[140px] lg:h-fit lg:self-start">

                        {/* Total Monthly Support Widget */}
                        <div className="bg-[#0b0a10] border border-[#221e35] rounded-[24px] p-4 md:p-6 flex flex-col gap-4">
                            <div className="flex items-center gap-2">
                                <Wallet className="w-4 h-4 text-emerald-400" />
                                <h3 className="text-xs font-bold text-gray-400 tracking-wider uppercase">TOTAL SUPPORT BULAN INI</h3>
                            </div>
                            <div className="bg-[#062414] border border-[#0d502d] rounded-2xl p-4 flex flex-col">
                                <span className="text-xs text-emerald-400 font-medium">Total dikeluarkan</span>
                                <span className="text-xl font-bold text-emerald-400 mt-1">Rp 175.000</span>
                                <span className="text-xs text-emerald-500 font-medium mt-1">3 subscription + 2 tipping</span>
                            </div>
                        </div>

                        {/* My Subscription Widget */}
                        <div className="bg-[#0b0a10] border border-[#221e35] rounded-[24px] p-4 md:p-6 flex flex-col gap-6">
                            <div className="flex items-center gap-2">
                                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500/10" />
                                <h3 className="text-xs font-bold text-gray-400 tracking-wider uppercase">MY SUBSCRIPTION</h3>
                            </div>
                            <div className="flex flex-col gap-4">
                                {/* Sub row 1 */}
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-2 min-w-0">
                                        <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 font-bold text-[10px] flex items-center justify-center text-zinc-300 shrink-0">ZP</div>
                                        <div className="min-w-0">
                                            <p className="text-xs font-bold text-white truncate max-w-[90px]">Zenyth Prime</p>
                                            <p className="text-[10px] text-gray-500 truncate mt-0.5">Warrior Tier</p>
                                        </div>
                                    </div>
                                    <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-[10px] px-2 py-0.5 rounded-full shrink-0">
                                        Active
                                    </span>
                                </div>
                                {/* Sub row 2 */}
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-2 min-w-0">
                                        <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 font-bold text-[10px] flex items-center justify-center text-zinc-300 shrink-0">AS</div>
                                        <div className="min-w-0">
                                            <p className="text-xs font-bold text-white truncate max-w-[90px]">Avianna Skylark</p>
                                            <p className="text-[10px] text-gray-500 truncate mt-0.5">Angel Tier</p>
                                        </div>
                                    </div>
                                    <span className="bg-amber-500/10 border border-amber-500/20 text-amber-500 font-bold text-[10px] px-2 py-0.5 rounded-full shrink-0">
                                        3 hari lagi
                                    </span>
                                </div>
                                {/* Sub row 3 */}
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-2 min-w-0">
                                        <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 font-bold text-[10px] flex items-center justify-center text-zinc-300 shrink-0">CM</div>
                                        <div className="min-w-0">
                                            <p className="text-xs font-bold text-white truncate max-w-[90px]">Celeste Moon</p>
                                            <p className="text-[10px] text-gray-500 truncate mt-0.5">Moonlight VIP</p>
                                        </div>
                                    </div>
                                    <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-[10px] px-2 py-0.5 rounded-full shrink-0">
                                        Active
                                    </span>
                                </div>
                            </div>
                            <button onClick={() => setActiveTab('Subscribed')} className="w-full py-2.5 bg-transparent border border-zinc-800 hover:border-zinc-700 hover:bg-white/5 rounded-xl text-xs font-bold text-gray-300 hover:text-white transition-all cursor-pointer">
                                Manage Subscriptions
                            </button>
                        </div>

                        {/* Virtual Gifts Widget */}
                        <div className="bg-[#0b0a10] border border-[#221e35] rounded-[24px] p-4 md:p-6 flex flex-col gap-6">
                            <div className="flex items-center gap-2">
                                <Award className="w-4 h-4 text-violet-400" />
                                <h3 className="text-xs font-bold text-gray-400 tracking-wider uppercase">VIRTUAL GIFTS</h3>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                {/* Badge slot 1 */}
                                <div className="relative bg-zinc-950 border border-zinc-900 rounded-xl p-3 flex flex-col items-center text-center gap-1.5 hover:border-[#d032e5] transition-colors cursor-pointer group">
                                    <div className="absolute top-1.5 right-1.5 bg-[#d032e5]/20 text-[#d032e5] text-[8px] font-bold px-1.5 py-0.5 rounded-full">x10</div>
                                    <Flame size={16} className="text-orange-500 fill-orange-500/10 mb-1" />
                                    <span className="text-[10px] font-bold text-white leading-tight">Cosmic Flame</span>
                                    <span className="text-[8px] text-[#d032e5] font-medium leading-tight">Zenyth Prime</span>
                                </div>
                                {/* Badge slot 2 */}
                                <div className="relative bg-zinc-950 border border-zinc-900 rounded-xl p-3 flex flex-col items-center text-center gap-1.5 hover:border-[#d032e5] transition-colors cursor-pointer group">
                                    <div className="absolute top-1.5 right-1.5 bg-[#d032e5]/20 text-[#d032e5] text-[8px] font-bold px-1.5 py-0.5 rounded-full">x5</div>
                                    <Heart size={16} className="text-rose-500 fill-rose-500/10 mb-1" />
                                    <span className="text-[10px] font-bold text-white leading-tight">Ruby Heart</span>
                                    <span className="text-[8px] text-[#d032e5] font-medium leading-tight">Avianna Skylark</span>
                                </div>
                                {/* Badge slot 3 */}
                                <div className="relative bg-zinc-950 border border-zinc-900 rounded-xl p-3 flex flex-col items-center text-center gap-1.5 hover:border-[#d032e5] transition-colors cursor-pointer group">
                                    <div className="absolute top-1.5 right-1.5 bg-[#d032e5]/20 text-[#d032e5] text-[8px] font-bold px-1.5 py-0.5 rounded-full">x2</div>
                                    <Crown size={16} className="text-violet-500 fill-violet-500/10 mb-1" />
                                    <span className="text-[10px] font-bold text-white leading-tight">Golden Crown</span>
                                    <span className="text-[8px] text-[#d032e5] font-medium leading-tight">Celeste Moon</span>
                                </div>
                                {/* Badge slot 4 */}
                                <div className="bg-zinc-950/50 border border-zinc-950 rounded-xl p-3 flex flex-col items-center text-center gap-1.5 opacity-50">
                                    <Lock size={16} className="text-zinc-600 mb-1" />
                                    <span className="text-[10px] font-bold text-zinc-600 leading-tight">Locked</span>
                                    <span className="text-[8px] text-zinc-600 font-medium leading-tight text-center">Koleksi belum<br/>tersedia</span>
                                </div>
                            </div>
                        </div>

                        {/* Streak Support Widget */}
                        <div className="bg-[#0b0a10] border border-[#221e35] rounded-[24px] p-4 md:p-6 flex flex-col gap-6">
                            <div className="flex items-center gap-2">
                                <Flame className="w-4 h-4 text-orange-500" />
                                <h3 className="text-xs font-bold text-gray-400 tracking-wider uppercase">Streak Support</h3>
                            </div>
                            <div className="flex flex-col gap-4">
                                {/* Streak 1 */}
                                <div className="flex items-center justify-between gap-3">
                                    <div>
                                        <p className="font-bold text-sm text-white">Zenyth Prime</p>
                                        <span className="text-[11px] text-gray-500">4 hari berturut-turut</span>
                                    </div>
                                    <span className="bg-[#d032e5]/10 border border-[#d032e5]/30 text-[#d032e5] font-bold text-xs px-2.5 py-1 rounded-sm">
                                        4 hari
                                    </span>
                                </div>
                                {/* Streak 2 */}
                                <div className="flex items-center justify-between gap-3">
                                    <div>
                                        <p className="font-bold text-sm text-white">Avianna Skylark</p>
                                        <span className="text-[11px] text-gray-500">2 hari berturut-turut</span>
                                    </div>
                                    <span className="bg-[#d032e5]/10 border border-[#d032e5]/30 text-[#d032e5] font-bold text-xs px-2.5 py-1 rounded-sm">
                                        2 hari
                                    </span>
                                </div>
                                {/* Streak 3 */}
                                <div className="flex items-center justify-between gap-3">
                                    <div>
                                        <p className="font-bold text-sm text-white">Celeste Moon</p>
                                        <span className="text-[11px] text-gray-500">1 hari berturut-turut</span>
                                    </div>
                                    <span className="bg-[#d032e5]/10 border border-[#d032e5]/30 text-[#d032e5] font-bold text-xs px-2.5 py-1 rounded-sm">
                                        1 hari
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        )}

        {/* Purchase Tab Content */}
        {activeTab === 'Purchase' && (
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start w-full">
                {/* Mobile Filter Toggle */}
                <div className="lg:hidden w-full mb-4">
                    <button 
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="w-full flex items-center justify-center gap-2 bg-[#18181b] border border-[#27272a] py-3 rounded-xl text-white font-bold"
                    >
                        <SortAsc size={20} />
                        {isSidebarOpen ? 'Hide Filters' : 'Show Filters'}
                    </button>
                </div>

                <div className={`${isSidebarOpen ? 'flex' : 'hidden'} lg:flex w-full lg:w-[280px] flex-col gap-8 shrink-0`}>
                    <div className="flex flex-col gap-2">
                        <h3 className="text-xl font-bold text-white mb-2">Search</h3>
                        <div className="relative w-full"><div className="bg-[#1e1e1e] h-[40px] rounded-xl border border-[#444] flex items-center px-4 gap-2 focus-within:border-[#d032e5] transition-colors"><input type="text" placeholder="Search order..." className="bg-transparent border-none outline-none text-base text-white placeholder-white/40 flex-1" value={purchaseSearch} onChange={(e) => setPurchaseSearch(e.target.value)} /><Search size={18} className="text-white shrink-0" /></div></div>
                    </div>
                    <SidebarSection title="Category" defaultOpen={true}>
                        {['Physical Item', 'Instant Download'].map((cat) => (
                            <div key={cat} onClick={() => togglePurchaseCategory(cat)} className={`flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer transition-colors ${selectedPurchaseCategories.includes(cat) ? 'bg-white/10' : 'hover:bg-white/5'}`}>
                                <span className={`text-base ${selectedPurchaseCategories.includes(cat) ? 'text-[#d032e5] font-bold' : 'text-gray-400'}`}>{cat}</span>
                                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedPurchaseCategories.includes(cat) ? 'border-[#d032e5] bg-[#d032e5]/10' : 'border-gray-600'}`}>{selectedPurchaseCategories.includes(cat) && <Check size={12} className="text-[#d032e5]" />}</div>
                            </div>
                        ))}
                    </SidebarSection>
                    <SidebarSection title="Price" defaultOpen={true}>
                        {PRICE_RANGES.map((range) => (
                            <div key={range.id} onClick={() => togglePurchasePrice(range.id)} className={`flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer transition-colors ${selectedPurchasePrices.includes(range.id) ? 'bg-white/10' : 'hover:bg-white/5'}`}>
                                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedPurchasePrices.includes(range.id) ? 'border-[#d032e5] bg-[#d032e5]/10' : 'border-gray-600'}`}>{selectedPurchasePrices.includes(range.id) && <Check size={12} className="text-[#d032e5]" />}</div>
                                <span className={`text-base ${selectedPurchasePrices.includes(range.id) ? 'text-white' : 'text-gray-400'}`}>{range.label}</span>
                            </div>
                        ))}
                    </SidebarSection>
                </div>
                <div className="flex-1 w-full flex flex-col gap-6">
                    {filteredPurchases.length > 0 ? (filteredPurchases.map((item) => <OrderCard key={item.id} orderId={item.orderId} category={item.category} title={item.item} badgeText={item.badgeText} orderDate={item.date} price={formatPrice(item.price)} fee={formatPrice(item.fee)} total={formatPrice(item.total)} imageUrl={item.image} />)) : (<div className="w-full flex flex-col items-center justify-center py-20 text-center"><div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4"><Search size={32} className="text-gray-600" /></div><p className="text-gray-400 text-lg">No orders found.</p></div>)}
                </div>
            </div>
        )}

        {/* Transaction Tab Content */}
        {activeTab === 'Transaction' && (
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start w-full">
                {/* Mobile Filter Toggle */}
                <div className="lg:hidden w-full mb-4">
                    <button 
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="w-full flex items-center justify-center gap-2 bg-[#18181b] border border-[#27272a] py-3 rounded-xl text-white font-bold"
                    >
                        <SortAsc size={20} />
                        {isSidebarOpen ? 'Hide Filters' : 'Show Filters'}
                    </button>
                </div>

                <div className={`${isSidebarOpen ? 'flex' : 'hidden'} lg:flex w-full lg:w-[280px] flex-col gap-8 shrink-0`}>
                    <div className="flex flex-col gap-2">
                        <h3 className="text-xl font-bold text-white mb-2">Search</h3>
                        <div className="relative w-full"><div className="bg-[#1e1e1e] h-[40px] rounded-xl border border-[#444] flex items-center px-4 gap-2 focus-within:border-[#d032e5] transition-colors"><input type="text" placeholder="Search transaction..." className="bg-transparent border-none outline-none text-base text-white placeholder-white/40 flex-1" value={transactionSearch} onChange={(e) => setTransactionSearch(e.target.value)} /><Search size={18} className="text-white shrink-0" /></div></div>
                    </div>
                    <SidebarSection title="Type" defaultOpen={true}>
                        {['Tipping', 'Subscription', 'Support'].map((type) => (
                            <div key={type} onClick={() => toggleTransactionType(type)} className={`flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer transition-colors ${selectedTransactionTypes.includes(type) ? 'bg-white/10' : 'hover:bg-white/5'}`}>
                                <span className={`text-base ${selectedTransactionTypes.includes(type) ? 'text-[#d032e5] font-bold' : 'text-gray-400'}`}>{type}</span>
                                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedTransactionTypes.includes(type) ? 'border-[#d032e5] bg-[#d032e5]/10' : 'border-gray-600'}`}>{selectedTransactionTypes.includes(type) && <Check size={12} className="text-[#d032e5]" />}</div>
                            </div>
                        ))}
                    </SidebarSection>
                    <SidebarSection title="Amount" defaultOpen={true}>
                        {PRICE_RANGES.map((range) => (
                            <div key={range.id} onClick={() => toggleTransactionPrice(range.id)} className={`flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer transition-colors ${selectedTransactionPrices.includes(range.id) ? 'bg-white/10' : 'hover:bg-white/5'}`}>
                                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedTransactionPrices.includes(range.id) ? 'border-[#d032e5] bg-[#d032e5]/10' : 'border-gray-600'}`}>{selectedTransactionPrices.includes(range.id) && <Check size={12} className="text-[#d032e5]" />}</div>
                                <span className={`text-base ${selectedTransactionPrices.includes(range.id) ? 'text-white' : 'text-gray-400'}`}>{range.label}</span>
                            </div>
                        ))}
                    </SidebarSection>
                </div>
                <div className="flex-1 w-full flex flex-col gap-6">
                    {filteredTransactions.length > 0 ? (filteredTransactions.map((item) => <TransactionCard key={item.id} transactionId={item.transactionId} type={item.type} description={item.description} amount={item.amount} date={item.date} status={item.status} image={item.image} />)) : (<div className="w-full flex flex-col items-center justify-center py-20 text-center"><div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4"><Search size={32} className="text-gray-600" /></div><p className="text-gray-400 text-lg">No transactions found.</p></div>)}
                </div>
            </div>
        )}

        {/* Subscribed Tab Content */}
        {activeTab === 'Subscribed' && (
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start w-full">
                {/* Mobile Filter Toggle */}
                <div className="lg:hidden w-full mb-4">
                    <button 
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="w-full flex items-center justify-center gap-2 bg-[#18181b] border border-[#27272a] py-3 rounded-xl text-white font-bold"
                    >
                        <SortAsc size={20} />
                        {isSidebarOpen ? 'Hide Filters' : 'Show Filters'}
                    </button>
                </div>

                <div className={`${isSidebarOpen ? 'flex' : 'hidden'} lg:flex w-full lg:w-[280px] flex-col gap-8 shrink-0`}>
                    <div className="flex flex-col gap-2">
                        <h3 className="text-xl font-bold text-white mb-2">Search</h3>
                        <div className="relative w-full"><div className="bg-[#1e1e1e] h-[40px] rounded-xl border border-[#444] flex items-center px-4 gap-2 focus-within:border-[#d032e5] transition-colors"><input type="text" placeholder="Search subscription..." className="bg-transparent border-none outline-none text-base text-white placeholder-white/40 flex-1" value={subscriptionSearch} onChange={(e) => setSubscriptionSearch(e.target.value)} /><Search size={18} className="text-white shrink-0" /></div></div>
                    </div>
                    <SidebarSection title="Status" defaultOpen={true}>
                        {['Active', 'Expired', 'Cancelled'].map((status) => (
                            <div key={status} onClick={() => toggleSubscriptionStatus(status)} className={`flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer transition-colors ${selectedSubscriptionStatus.includes(status) ? 'bg-white/10' : 'hover:bg-white/5'}`}>
                                <span className={`text-base ${selectedSubscriptionStatus.includes(status) ? 'text-[#d032e5] font-bold' : 'text-gray-400'}`}>{status}</span>
                                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedSubscriptionStatus.includes(status) ? 'border-[#d032e5] bg-[#d032e5]/10' : 'border-gray-600'}`}>{selectedSubscriptionStatus.includes(status) && <Check size={12} className="text-[#d032e5]" />}</div>
                            </div>
                        ))}
                    </SidebarSection>
                </div>
                <div className="flex-1 w-full flex flex-col gap-6">
                    {filteredSubscriptions.length > 0 ? (filteredSubscriptions.map((item) => <SubscriptionCard key={item.id} id={item.id} creator={item.creator} plan={item.plan} status={item.status} price={item.price} purchaseDate={item.purchaseDate} planDuration={item.planDuration} renewalDate={item.renewalDate} image={item.image} features={item.features} />)) : (<div className="w-full flex flex-col items-center justify-center py-20 text-center"><div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4"><Search size={32} className="text-gray-600" /></div><p className="text-gray-400 text-lg">No subscriptions found.</p></div>)}
                </div>
            </div>
        )}

        {/* ... Rest of tabs (Following, Supporting) use simple grids/lists and are already responsive ... */}
        {activeTab === 'Following' && (
            <div className="w-full">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                    {followersData.map((follower) => (
                        <div key={follower.id} className="flex flex-col items-center gap-4 p-4 rounded-[24px] cursor-pointer group transition-all">
                            <div className="w-[80px] h-[80px] rounded-full border-2 border-[#27272a] group-hover:border-[#d032e5] overflow-hidden transition-colors bg-black"><img src={follower.image} alt={follower.name} className="w-full h-full object-cover" loading="lazy" decoding="async" /></div>
                            <div className="flex flex-col items-center text-center"><div className="flex items-center gap-2 mb-1"><h3 className="text-white text-[16px] font-bold truncate max-w-[150px] group-hover:text-[#d032e5] transition-colors">{follower.name}</h3>{follower.verified && <div className="bg-[#d032e5] rounded-full p-[2px] flex items-center justify-center w-4 h-4 shrink-0"><Check size={10} className="text-white" strokeWidth={4} /></div>}</div><p className="text-gray-500 text-[14px]">@{follower.name.toLowerCase().replace(/\s+/g, '')}</p></div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {activeTab === 'Supporting' && (
            <div className="w-full flex flex-col items-center gap-[7rem]">
                <div className="text-center"><h2 className="text-3xl font-bold text-white mb-2">My Top Supported Creators</h2><p className="text-gray-400">The creators you've supported the most on your journey.</p></div>
                <div className="w-full max-w-[800px] flex flex-col gap-8">
                    <div className="flex items-end justify-center gap-4 md:gap-8 pb-8 border-b border-[#27272a]">
                        {supportingLeaderboard[1] && <div className="flex flex-col items-center gap-3"><div className="relative"><div className="w-20 h-20 rounded-full border-[3px] border-[#C0C0C0] overflow-hidden"><img src={supportingLeaderboard[1].image} className="w-full h-full object-cover" alt="Rank 2" loading="lazy" decoding="async" /></div><div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#C0C0C0] text-black text-xs font-bold px-2 py-0.5 rounded-full">#2</div></div><div className="text-center"><h3 className="font-bold text-white text-sm">{supportingLeaderboard[1].name}</h3><p className="text-[#d032e5] font-bold text-xs">{formatPrice(supportingLeaderboard[1].total)}</p></div></div>}
                        {supportingLeaderboard[0] && <div className="flex flex-col items-center gap-3 -mt-10 z-10"><div className="relative"><Crown className="absolute -top-8 left-1/2 -translate-x-1/2 text-[#FFD700] fill-[#FFD700] w-8 h-8 animate-bounce" /><div className="w-28 h-28 rounded-full border-[4px] border-[#FFD700] overflow-hidden shadow-[0_0_30px_rgba(255,215,0,0.3)]"><img src={supportingLeaderboard[0].image} className="w-full h-full object-cover" alt="Rank 1" loading="lazy" decoding="async" /></div><div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#FFD700] text-black text-sm font-bold px-3 py-0.5 rounded-full">#1</div></div><div className="text-center"><h3 className="font-bold text-white text-lg">{supportingLeaderboard[0].name}</h3><p className="text-[#d032e5] font-bold text-base">{formatPrice(supportingLeaderboard[0].total)}</p></div></div>}
                        {supportingLeaderboard[2] && <div className="flex flex-col items-center gap-3"><div className="relative"><div className="w-20 h-20 rounded-full border-[3px] border-[#CD7F32] overflow-hidden"><img src={supportingLeaderboard[2].image} className="w-full h-full object-cover" alt="Rank 3" loading="lazy" decoding="async" /></div><div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#CD7F32] text-black text-xs font-bold px-2 py-0.5 rounded-full">#3</div></div><div className="text-center"><h3 className="font-bold text-white text-sm">{supportingLeaderboard[2].name}</h3><p className="text-[#d032e5] font-bold text-xs">{formatPrice(supportingLeaderboard[2].total)}</p></div></div>}
                    </div>
                    <div className="flex flex-col gap-3">{supportingLeaderboard.slice(3).map((creator, index) => <div key={creator.id} className="flex items-center gap-4 p-4 rounded-xl bg-[#18181b] border border-[#27272a] hover:border-[#d032e5] transition-all group"><span className="text-gray-500 font-bold text-lg w-8 text-center">{index + 4}</span><div className="w-12 h-12 rounded-full bg-gray-800 overflow-hidden shrink-0 border border-gray-700 group-hover:border-[#d032e5] transition-colors"><img src={creator.image} className="w-full h-full object-cover" alt={creator.name} loading="lazy" decoding="async" /></div><span className="text-white font-bold flex-1">{creator.name}</span><div className="flex items-center gap-2"><Trophy size={14} className="text-gray-600 group-hover:text-[#d032e5] transition-colors" /><span className="text-[#d032e5] font-bold">{formatPrice(creator.total)}</span></div></div>)}</div>
                </div>
            </div>
        )}

        {activeTab === 'Badges' && (
            <div className="w-full flex flex-col items-center gap-6">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-white mb-2">Virtual Gifts</h2>
                    <p className="text-gray-400">Koleksi virtual gifts eksklusif yang diproduksi dan diunggah oleh kreator favoritmu.</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-[800px] w-full mt-8">
                    <div className="relative bg-[#0c0c0c] border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center gap-3 hover:border-[#d032e5] transition-colors cursor-pointer">
                        <div className="absolute top-3 right-3 bg-[#d032e5]/20 border border-[#d032e5]/50 text-[#d032e5] text-[10px] font-bold px-2 py-0.5 rounded-full">x10</div>
                        <div className="w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500">
                            <Flame size={32} />
                        </div>
                        <h4 className="font-bold text-white text-base">Cosmic Flame</h4>
                        <p className="text-xs text-[#d032e5] font-medium">Zenyth Prime</p>
                    </div>
                    <div className="relative bg-[#0c0c0c] border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center gap-3 hover:border-[#d032e5] transition-colors cursor-pointer">
                        <div className="absolute top-3 right-3 bg-[#d032e5]/20 border border-[#d032e5]/50 text-[#d032e5] text-[10px] font-bold px-2 py-0.5 rounded-full">x5</div>
                        <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                            <Heart size={32} />
                        </div>
                        <h4 className="font-bold text-white text-base">Ruby Heart</h4>
                        <p className="text-xs text-[#d032e5] font-medium">Avianna Skylark</p>
                    </div>
                    <div className="relative bg-[#0c0c0c] border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center gap-3 hover:border-[#d032e5] transition-colors cursor-pointer">
                        <div className="absolute top-3 right-3 bg-[#d032e5]/20 border border-[#d032e5]/50 text-[#d032e5] text-[10px] font-bold px-2 py-0.5 rounded-full">x2</div>
                        <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                            <Crown size={32} />
                        </div>
                        <h4 className="font-bold text-white text-base">Golden Crown</h4>
                        <p className="text-xs text-[#d032e5] font-medium">Celeste Moon</p>
                    </div>
                    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center gap-3 opacity-50">
                        <div className="w-16 h-16 rounded-full bg-gray-500/10 flex items-center justify-center text-gray-500">
                            <Lock size={32} />
                        </div>
                        <h4 className="font-bold text-gray-400 text-base">Locked</h4>
                        <p className="text-xs text-gray-500">Koleksi belum tersedia</p>
                    </div>
                </div>
            </div>
        )}

      </div>

      {/* Post Detail Dialog (Same logic as before, just kept concise) */}
      {selectedPost && (
        <Dialog open={isPostDialogOpen} onOpenChange={setIsPostDialogOpen}>
            <DialogContent className="max-w-[100vw] h-screen sm:max-w-[700px] sm:h-auto sm:max-h-[85vh] p-0 bg-[#242526] border-none text-white overflow-hidden gap-0 rounded-none sm:rounded-xl flex flex-col">
                <DialogTitle className="sr-only">Post Detail</DialogTitle>
                
                {/* Header */}
                <div className="relative flex items-center justify-center p-4 border-b border-[#3e4042] shrink-0 bg-[#242526]">
                    <h2 className="text-xl font-bold text-[#e4e6eb] m-0">{selectedPost.creator}&apos;s Post</h2>
                    <DialogClose className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#3a3b3c] hover:bg-[#4e4f50] p-2 rounded-full transition-colors text-[#b0b3b8] [&>svg]:size-5 opacity-100">
                        <X size={20} />
                        <span className="sr-only">Close</span>
                    </DialogClose>
                </div>

                {/* Main scrollable content */}
                <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#3a3b3c] scrollbar-track-transparent pb-4">
                    {/* Post Author Info */}
                    <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <img src={selectedPost.avatar} className="w-10 h-10 rounded-full" alt="avatar" loading="lazy" decoding="async" />
                            <div>
                                <h3 className="font-semibold text-[15px] text-[#e4e6eb]">{selectedPost.creator}</h3>
                                <p className="text-[13px] text-[#b0b3b8] flex items-center gap-1">Cosmic Creator · {selectedPost.time} · <Globe size={12} /></p>
                            </div>
                        </div>
                        <button className="text-[#b0b3b8] hover:bg-[#3a3b3c] p-2 rounded-full transition-colors">
                            <MoreHorizontal size={20} />
                        </button>
                    </div>

                    {/* Post Content */}
                    <div className="px-4 pb-2 text-[15px] text-[#e4e6eb]">
                        {selectedPost.content || selectedPost.caption}
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
                            <button onClick={() => handleLike(selectedPost.id)} className={`flex items-center gap-2 transition-colors hover:bg-[#3a3b3c] px-3 py-1.5 rounded-md ${selectedPost.isLiked ? 'text-blue-500' : 'hover:text-[#e4e6eb]'}`}>
                                <Heart size={20} className={selectedPost.isLiked ? 'fill-blue-500' : ''} /> <span className="text-[15px] hidden sm:inline">Like</span>
                            </button>
                            <button className="flex items-center gap-2 hover:text-[#e4e6eb] transition-colors hover:bg-[#3a3b3c] px-3 py-1.5 rounded-md">
                                <MessageCircle size={20} /> <span className="text-[15px]">{postComments.length}</span>
                            </button>
                            <button onClick={() => handleShare(selectedPost)} className="flex items-center gap-2 hover:text-[#e4e6eb] transition-colors hover:bg-[#3a3b3c] px-3 py-1.5 rounded-md">
                                <Share2 size={20} /> <span className="text-[15px] hidden sm:inline">Share</span>
                            </button>
                        </div>
                    </div>

                    {/* Comments Section */}
                    <div className="p-4">
                        <div className="font-semibold text-[15px] text-[#b0b3b8] mb-4 flex items-center gap-1 cursor-pointer w-max hover:bg-[#3a3b3c] px-2 py-1 rounded-md">
                            Newest <Check size={16} className="opacity-0 w-0" />
                        </div>
                        
                        <div className="flex flex-col gap-4">
                            {postComments.length > 0 ? (postComments.map((comment, i) => (
                                <div key={comment.id || i} className="flex gap-2">
                                    <div className="w-8 h-8 rounded-full bg-[#18181b] flex items-center justify-center font-bold text-xs shrink-0 overflow-hidden">
                                        {comment.user.charAt(0)}
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

      <Dialog open={isShareOpen} onOpenChange={setIsShareOpen}>
        <DialogContent className="sm:max-w-md bg-[#121212] border border-[#27272a] text-white p-6 rounded-xl w-[90%]">
            <DialogHeader><DialogTitle className="text-lg font-bold">Share Post</DialogTitle><DialogDescription className="text-gray-400 text-sm">Share this post with your friends.</DialogDescription></DialogHeader>
            <div className="grid grid-cols-4 gap-4 py-4">
                <button className="flex flex-col items-center gap-2 group"><div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#1877f2]/10 flex items-center justify-center group-hover:bg-[#1877f2] transition-colors"><Facebook className="text-[#1877f2] group-hover:text-white transition-colors" size={20} /></div><span className="text-[10px] text-gray-400 group-hover:text-white">Facebook</span></button>
                <button className="flex flex-col items-center gap-2 group"><div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#1da1f2]/10 flex items-center justify-center group-hover:bg-[#1da1f2] transition-colors"><Twitter className="text-[#1da1f2] group-hover:text-white transition-colors" size={20} /></div><span className="text-[10px] text-gray-400 group-hover:text-white">Twitter</span></button>
                <button className="flex flex-col items-center gap-2 group"><div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#0a66c2]/10 flex items-center justify-center group-hover:bg-[#0a66c2] transition-colors"><Linkedin className="text-[#0a66c2] group-hover:text-white transition-colors" size={20} /></div><span className="text-[10px] text-gray-400 group-hover:text-white">LinkedIn</span></button>
                <button className="flex flex-col items-center gap-2 group" onClick={handleCopyLink}><div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#d032e5]/10 flex items-center justify-center group-hover:bg-[#d032e5] transition-colors"><LinkIcon className="text-[#d032e5] group-hover:text-white transition-colors" size={20} /></div><span className="text-[10px] text-gray-400 group-hover:text-white">Copy Link</span></button>
            </div>
            <div className="flex items-center space-x-2"><div className="grid flex-1 gap-2"><Label htmlFor="link" className="sr-only">Link</Label><Input id="link" defaultValue={shareLink} readOnly className="bg-[#18181b] border-[#27272a] text-gray-300 text-xs h-9 focus-visible:ring-[#d032e5] focus-visible:ring-offset-0" /></div><Button type="submit" size="sm" className="px-3 bg-[#27272a] hover:bg-[#3f3f46] h-9" onClick={handleCopyLink}><span className="sr-only">Copy</span>{copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}</Button></div>
        </DialogContent>
      </Dialog>

      {/* Creator Story Viewer Dialog */}
      {activeStoryIndex !== null && (
        <Dialog open={activeStoryIndex !== null} onOpenChange={(open) => !open && setActiveStoryIndex(null)}>
            <DialogContent className="w-[90vw] h-[80vh] max-w-[420px] max-h-[850px] p-0 bg-neutral-950 border-none text-white overflow-hidden rounded-2xl flex flex-col justify-between shadow-[0_0_50px_rgba(208,50,229,0.2)]">
                <DialogTitle className="sr-only">Creator Story</DialogTitle>
                
                {/* Progress Indicators */}
                <div className="absolute top-4 left-4 right-4 flex gap-1.5 z-50">
                    {stories.map((_, idx) => (
                        <div key={idx} className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                            <div 
                                className={`h-full bg-white rounded-full ${
                                    idx < activeStoryIndex 
                                        ? "w-full" 
                                        : idx === activeStoryIndex 
                                            ? "w-full animate-[story-progress_5s_linear_forwards]" 
                                            : "w-0"
                                }`}
                            />
                        </div>
                    ))}
                </div>

                {/* Header info */}
                <div className="absolute top-8 left-4 right-4 flex items-center justify-between z-50">
                    <div className="flex items-center gap-2.5 bg-black/55 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-lg">
                        <img 
                            src={stories[activeStoryIndex].avatar} 
                            className="w-8 h-8 rounded-full border border-white/20 object-cover" 
                            alt="avatar" 
                        />
                        <div className="flex flex-col">
                            <span className="font-bold text-xs text-white leading-tight">{stories[activeStoryIndex].creator}</span>
                            <span className="text-[9px] text-[#d032e5] font-semibold tracking-wide uppercase">Cosmic Story</span>
                        </div>
                    </div>
                    <DialogClose className="bg-black/55 hover:bg-black/80 p-2 rounded-full text-white/80 hover:text-white transition-colors cursor-pointer border border-white/5 shadow-lg">
                        <X size={16} />
                    </DialogClose>
                </div>

                {/* Navigation Areas */}
                <div className="absolute inset-x-0 top-16 bottom-24 flex z-30 pointer-events-none">
                    <div 
                        onClick={(e) => {
                            e.stopPropagation();
                            if (activeStoryIndex > 0) setActiveStoryIndex(activeStoryIndex - 1);
                        }} 
                        className="w-1/3 h-full cursor-pointer pointer-events-auto"
                    />
                    <div 
                        onClick={(e) => {
                            e.stopPropagation();
                            if (activeStoryIndex < stories.length - 1) {
                                const nextIdx = activeStoryIndex + 1;
                                setStories(prev => prev.map((s, i) => i === nextIdx ? { ...s, seen: true } : s));
                                setActiveStoryIndex(nextIdx);
                            } else {
                                setActiveStoryIndex(null);
                            }
                        }} 
                        className="w-2/3 h-full cursor-pointer pointer-events-auto"
                    />
                </div>

                {/* Media Image */}
                <div className="flex-1 w-full h-full bg-zinc-950 flex items-center justify-center relative overflow-hidden">
                    <img 
                        src={stories[activeStoryIndex].media} 
                        className="w-full h-full object-cover select-none pointer-events-none" 
                        alt="Story" 
                    />
                </div>

                {/* Footer and interactions */}
                <div className="p-4 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col gap-4 z-40 relative pt-12 shrink-0">
                    <p className="text-xs md:text-sm text-gray-200 leading-relaxed font-normal bg-black/40 backdrop-blur-sm p-3.5 rounded-xl border border-white/10 shadow-lg">
                        {stories[activeStoryIndex].caption}
                    </p>
                    
                    <div className="flex items-center gap-2">
                        <div className="flex-1 bg-white/10 border border-white/5 rounded-full px-4 py-2 text-xs text-gray-400 select-none">
                            Comment on this story...
                        </div>
                        <button 
                            onClick={() => {
                                setActiveStoryIndex(null);
                                setActiveTab("Supporting");
                            }}
                            className="bg-[#d032e5] hover:bg-[#a61cc9] text-white font-bold text-xs px-4 py-2.5 rounded-full shrink-0 flex items-center gap-1.5 transition-colors cursor-pointer shadow-[0_0_15px_rgba(208,50,229,0.4)]"
                        >
                            <Coins size={14} />
                            <span>Support</span>
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
      )}

      {/* Dynamic Keyframes for smooth story bar */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes story-progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}} />
    </div>
  );
}
