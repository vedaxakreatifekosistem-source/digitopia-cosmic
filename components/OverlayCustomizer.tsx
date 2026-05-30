
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Upload, Image as ImageIcon, Type, Palette, Layout, MessageSquare, ListOrdered, Gift, Clock, Save, Eye, MonitorPlay, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';

interface OverlayCustomizerProps {
  onNavigate: (view: string) => void;
  overlayData?: any;
}

export default function OverlayCustomizer({ onNavigate, overlayData }: OverlayCustomizerProps) {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [streamTitle, setStreamTitle] = useState("My Awesome Stream");
  
  // Alert Settings
  const [alertBgColor, setAlertBgColor] = useState("#18181b");
  const [alertImage, setAlertImage] = useState<string | null>(null);
  const [alertTextBaseColor, setAlertTextBaseColor] = useState("#ffffff");
  const [alertHighlightColor, setAlertHighlightColor] = useState("#d032e5");
  const [minAlertAmount, setMinAlertAmount] = useState(10000);
  
  // Widget Toggles
  const [showLeaderboard, setShowLeaderboard] = useState(true);
  const [showRunningText, setShowRunningText] = useState(true);
  const [runningTextContent, setRunningTextContent] = useState("Welcome to the stream! Don't forget to follow and subscribe!");
  const [showChatbox, setShowChatbox] = useState(true);
  const [showWishlist, setShowWishlist] = useState(false);
  
  // Subathon Settings
  const [subathonActive, setSubathonActive] = useState(false);
  const [subathonTime, setSubathonTime] = useState(60); // minutes

  const creatorId = overlayData?.creatorId || "default_creator";

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setAlertImage(reader.result as string);
        };
        reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    // Mock save delay
    setTimeout(() => {
      setSaving(false);
      alert("Overlay settings saved!");
      onNavigate('creator-profile');
    }, 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d032e5]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-[80px] pb-20 font-sans">
      {/* Header */}
      <div className="fixed top-[80px] left-0 right-0 z-40 bg-black/80 backdrop-blur-md border-b border-[#27272a] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
            <button 
                onClick={() => onNavigate('creator-profile')}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
                <ArrowLeft size={20} />
            </button>
            <div>
                <h1 className="text-xl font-bold">Customize Overlay</h1>
                <p className="text-xs text-gray-400">Editing: {overlayData?.name || "Custom Overlay"}</p>
            </div>
        </div>
        <div className="flex gap-3">
            <Button variant="outline" className="border-[#27272a] text-white hover:bg-[#27272a]">
                <Eye size={16} className="mr-2" /> Preview
            </Button>
            <Button onClick={handleSave} disabled={saving} className="bg-[#d032e5] hover:bg-[#b02bc4] text-white shadow-[0_0_15px_rgba(208,50,229,0.3)]">
                {saving ? <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white mr-2" /> : <Save size={16} className="mr-2" />}
                {saving ? "Saving..." : "Save Changes"}
            </Button>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 mt-20 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Panel: Settings */}
        <div className="lg:col-span-4 flex flex-col gap-6 h-[calc(100vh-180px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#27272a]">
            
            {/* 1. Stream Title */}
            <section className="bg-[#0c0c0c] border border-[#27272a] rounded-2xl p-5 space-y-4">
                <div className="flex items-center gap-2 text-[#d032e5] font-bold uppercase text-xs tracking-wider">
                    <MonitorPlay size={14} /> Stream Info
                </div>
                <div className="space-y-2">
                    <Label>Stream Title</Label>
                    <Input 
                        value={streamTitle}
                        onChange={(e) => setStreamTitle(e.target.value)}
                        className="bg-[#18181b] border-[#27272a] focus-visible:ring-[#d032e5]"
                    />
                </div>
            </section>

            {/* 2. Alert Design */}
            <section className="bg-[#0c0c0c] border border-[#27272a] rounded-2xl p-5 space-y-6">
                <div className="flex items-center gap-2 text-[#d032e5] font-bold uppercase text-xs tracking-wider">
                    <Palette size={14} /> Alert Design
                </div>
                
                {/* 2a. Background Color */}
                <div className="space-y-2">
                    <Label>Background Color</Label>
                    <div className="flex gap-2 flex-wrap">
                        {['#18181b', '#000000', '#1e1b4b', '#312e81', '#4c0519', '#450a0a'].map(color => (
                            <button
                                key={color}
                                onClick={() => setAlertBgColor(color)}
                                className={`w-8 h-8 rounded-full border-2 transition-all ${alertBgColor === color ? 'border-white scale-110' : 'border-transparent hover:scale-105'}`}
                                style={{ backgroundColor: color }}
                            />
                        ))}
                        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#27272a]">
                             <input type="color" value={alertBgColor} onChange={(e) => setAlertBgColor(e.target.value)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                             <div className="w-full h-full" style={{ backgroundColor: alertBgColor }} />
                        </div>
                    </div>
                </div>

                {/* 2b. Alert Image */}
                <div className="space-y-2">
                    <Label>Alert Image</Label>
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-[#18181b] rounded-lg border border-[#27272a] flex items-center justify-center overflow-hidden">
                            {alertImage ? <img src={alertImage} alt="Alert" className="w-full h-full object-cover" /> : <ImageIcon className="text-gray-500" />}
                        </div>
                        <label className="flex-1 cursor-pointer">
                            <div className="px-4 py-2 bg-[#18181b] border border-[#27272a] rounded-lg text-sm text-center hover:bg-[#27272a] transition-colors">
                                Upload Image
                            </div>
                            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                        </label>
                    </div>
                </div>

                {/* 2c. Alert Text Preview (Mockup) */}
                <div className="p-4 rounded-xl border border-white/10" style={{ backgroundColor: alertBgColor }}>
                    <div className="flex gap-3 items-center">
                        {alertImage && <img src={alertImage} alt="Alert" className="w-12 h-12 object-cover rounded-lg" />}
                        <div className="text-sm">
                            <span style={{ color: alertHighlightColor, fontWeight: 'bold' }}>Haruka</span>
                            <span style={{ color: alertTextBaseColor }}> baru saja membeli </span>
                            <span style={{ color: alertHighlightColor, fontWeight: 'bold' }}>Nama Produk</span>
                            <span style={{ color: alertTextBaseColor }}> seharga Rp 50.000</span>
                            <div className="text-xs italic mt-1 opacity-80" style={{ color: alertTextBaseColor }}>"Semangat ya Kak"</div>
                        </div>
                    </div>
                </div>

                {/* 2d & 2e. Colors */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Base Text Color</Label>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full border border-[#27272a]" style={{ backgroundColor: alertTextBaseColor }} />
                            <Input type="color" value={alertTextBaseColor} onChange={(e) => setAlertTextBaseColor(e.target.value)} className="w-full h-8 p-0 border-none" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Highlight Color</Label>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full border border-[#27272a]" style={{ backgroundColor: alertHighlightColor }} />
                            <Input type="color" value={alertHighlightColor} onChange={(e) => setAlertHighlightColor(e.target.value)} className="w-full h-8 p-0 border-none" />
                        </div>
                    </div>
                </div>

                {/* 2f. Min Amount */}
                <div className="space-y-2">
                    <Label>Min. Amount for Alert (Rp)</Label>
                    <Input 
                        type="number" 
                        value={minAlertAmount} 
                        onChange={(e) => setMinAlertAmount(Number(e.target.value))}
                        className="bg-[#18181b] border-[#27272a] focus-visible:ring-[#d032e5]"
                    />
                </div>
            </section>

            {/* 3, 4, 5, 7. Widgets */}
            <section className="bg-[#0c0c0c] border border-[#27272a] rounded-2xl p-5 space-y-6">
                <div className="flex items-center gap-2 text-[#d032e5] font-bold uppercase text-xs tracking-wider">
                    <Layout size={14} /> Widgets
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <ListOrdered size={18} className="text-gray-400" />
                        <Label>Leaderboard</Label>
                    </div>
                    <Switch checked={showLeaderboard} onCheckedChange={setShowLeaderboard} className="data-[state=checked]:bg-[#d032e5]" />
                </div>

                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Type size={18} className="text-gray-400" />
                            <Label>Running Text</Label>
                        </div>
                        <Switch checked={showRunningText} onCheckedChange={setShowRunningText} className="data-[state=checked]:bg-[#d032e5]" />
                    </div>
                    {showRunningText && (
                        <Input 
                            value={runningTextContent}
                            onChange={(e) => setRunningTextContent(e.target.value)}
                            className="bg-[#18181b] border-[#27272a] text-xs"
                            placeholder="Enter running text..."
                        />
                    )}
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <MessageSquare size={18} className="text-gray-400" />
                        <Label>Chatbox</Label>
                    </div>
                    <Switch checked={showChatbox} onCheckedChange={setShowChatbox} className="data-[state=checked]:bg-[#d032e5]" />
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Gift size={18} className="text-gray-400" />
                        <Label>Wishlist</Label>
                    </div>
                    <Switch checked={showWishlist} onCheckedChange={setShowWishlist} className="data-[state=checked]:bg-[#d032e5]" />
                </div>
            </section>

            {/* 6. Subathon */}
            <section className="bg-[#0c0c0c] border border-[#27272a] rounded-2xl p-5 space-y-4">
                <div className="flex items-center gap-2 text-[#d032e5] font-bold uppercase text-xs tracking-wider">
                    <Clock size={14} /> Subathon
                </div>
                <div className="flex items-center justify-between">
                    <Label>Enable Subathon</Label>
                    <Switch checked={subathonActive} onCheckedChange={setSubathonActive} className="data-[state=checked]:bg-[#d032e5]" />
                </div>
                {subathonActive && (
                    <div className="space-y-2">
                        <Label>Initial Time (Minutes)</Label>
                        <div className="flex items-center gap-4">
                            <Slider 
                                value={[subathonTime]} 
                                onValueChange={(val) => setSubathonTime(val[0])} 
                                max={600} 
                                step={10} 
                                className="flex-1"
                            />
                            <span className="text-sm font-mono bg-[#18181b] px-2 py-1 rounded border border-[#27272a]">{subathonTime}m</span>
                        </div>
                    </div>
                )}
            </section>

        </div>

        {/* Right Panel: Preview */}
        <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="bg-[#18181b] border border-[#27272a] rounded-2xl aspect-video w-full relative overflow-hidden shadow-2xl flex items-center justify-center">
                {/* Background (Simulated Stream) */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                    <p className="text-gray-600 font-bold text-2xl uppercase tracking-widest opacity-20">Stream Feed Preview</p>
                </div>

                {/* Overlay Elements */}
                <div className="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none">
                    
                    {/* Top Bar */}
                    <div className="flex justify-between items-start">
                        {showLeaderboard && (
                            <div className="bg-black/40 backdrop-blur-md p-4 rounded-xl border border-white/10 w-64">
                                <h4 className="text-[#d032e5] font-bold text-xs uppercase mb-2">Top Supporters</h4>
                                <div className="space-y-2">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="flex justify-between text-xs">
                                            <span className="text-white">User{i}</span>
                                            <span className="text-gray-400">Rp {100000 - (i*10000)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        {showWishlist && (
                            <div className="bg-black/40 backdrop-blur-md p-4 rounded-xl border border-white/10 w-48">
                                <h4 className="text-[#d032e5] font-bold text-xs uppercase mb-2">Wishlist</h4>
                                <div className="space-y-2">
                                    <div className="text-xs text-white">New Mic</div>
                                    <div className="h-1.5 w-full bg-gray-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-[#d032e5] w-[70%]" />
                                    </div>
                                    <div className="text-[10px] text-gray-400 text-right">70%</div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Middle: Alert */}
                    <div className="self-center">
                         {/* This would animate in real app */}
                         <div className="p-6 rounded-2xl border border-white/10 shadow-2xl max-w-lg transform scale-110" style={{ backgroundColor: alertBgColor }}>
                            <div className="flex flex-col items-center text-center gap-4">
                                {alertImage && <img src={alertImage} alt="Alert" className="w-24 h-24 object-cover rounded-xl" />}
                                <div className="text-lg">
                                    <span style={{ color: alertHighlightColor, fontWeight: 'bold' }}>Haruka</span>
                                    <span style={{ color: alertTextBaseColor }}> baru saja membeli </span>
                                    <span style={{ color: alertHighlightColor, fontWeight: 'bold' }}>Nama Produk</span>
                                    <span style={{ color: alertTextBaseColor }}> seharga Rp 50.000</span>
                                    <div className="text-base italic mt-2 opacity-90" style={{ color: alertTextBaseColor }}>"Semangat ya Kak"</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="flex items-end justify-between gap-8">
                        <div className="flex flex-col gap-4 w-full">
                            {showChatbox && (
                                <div className="bg-black/40 backdrop-blur-md p-4 rounded-xl border border-white/10 w-80 h-48 flex flex-col justify-end gap-2">
                                    <div className="text-xs"><span className="font-bold text-[#d032e5]">User1:</span> <span className="text-white">Hello streamer!</span></div>
                                    <div className="text-xs"><span className="font-bold text-blue-400">Mod:</span> <span className="text-white">Welcome everyone.</span></div>
                                    <div className="text-xs"><span className="font-bold text-green-400">Fan:</span> <span className="text-white">PogChamp!</span></div>
                                </div>
                            )}
                            
                            <div className="flex items-end gap-4 w-full">
                                <div className="bg-black/60 backdrop-blur-md rounded-xl border border-white/10 p-4 flex-1">
                                    <h2 className="text-2xl font-bold text-white mb-1">{streamTitle}</h2>
                                    {showRunningText && (
                                        <div className="overflow-hidden whitespace-nowrap">
                                            <p className="text-sm text-[#d032e5] animate-pulse">{runningTextContent}</p>
                                        </div>
                                    )}
                                </div>
                                
                                {subathonActive && (
                                    <div className="bg-[#d032e5] p-4 rounded-xl border border-white/20 shadow-[0_0_20px_rgba(208,50,229,0.4)] text-center min-w-[120px]">
                                        <div className="text-xs font-bold uppercase text-white/80 mb-1">Subathon</div>
                                        <div className="text-3xl font-black text-white font-mono">{Math.floor(subathonTime / 60)}:{(subathonTime % 60).toString().padStart(2, '0')}:00</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="flex justify-between items-center text-gray-500 text-sm px-2">
                <p>Preview Mode: 1920x1080 Canvas</p>
                <div className="flex gap-4">
                    <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500"/> System Healthy</span>
                    <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500"/> OBS Connected</span>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}
