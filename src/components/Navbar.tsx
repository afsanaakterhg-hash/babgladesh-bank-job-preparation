import React from 'react';
import { 
  Landmark, 
  BookOpen, 
  CheckCircle2, 
  Sparkles, 
  Download, 
  Mic, 
  Layers, 
  Flame,
  Globe,
  Radio
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  lang: 'bn' | 'en';
  setLang: (lang: 'bn' | 'en') => void;
  onOpenVoiceSearch: () => void;
  bookmarksCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  lang,
  setLang,
  onOpenVoiceSearch,
  bookmarksCount
}) => {
  const navItems = [
    { 
      id: 'dashboard', 
      labelEn: 'Dashboard', 
      labelBn: 'ড্যাশবোর্ড', 
      icon: Landmark 
    },
    { 
      id: 'past_papers', 
      labelEn: 'Past Papers (বিগত প্রশ্ন)', 
      labelBn: 'বিগত বছরের প্রশ্ন', 
      icon: BookOpen 
    },
    { 
      id: 'live_test', 
      labelEn: 'Live Test', 
      labelBn: 'লাইভ টেস্ট', 
      icon: Radio,
      badge: 'LIVE'
    },
    { 
      id: 'model_tests', 
      labelEn: 'Model Tests', 
      labelBn: 'মডেল টেস্ট', 
      icon: CheckCircle2 
    },
    { 
      id: 'subject_practice', 
      labelEn: 'Subject Practice', 
      labelBn: 'বিষয়ভিত্তিক প্র্যাকটিস', 
      icon: Layers 
    },
    { 
      id: 'ai_coach', 
      labelEn: 'AI Study Coach', 
      labelBn: 'এআই স্টাডি কোচ', 
      icon: Sparkles,
      highlight: true
    },
    { 
      id: 'downloads', 
      labelEn: 'Downloads', 
      labelBn: 'ডাউনলোড ও শিট', 
      icon: Download 
    }
  ];

  return (
    <header className="sticky top-0 z-40 bg-emerald-950/95 backdrop-blur-md border-b border-emerald-800/60 text-white shadow-xl">
      {/* Top Bar with BB emblem accent and quick stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => setCurrentTab('dashboard')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-amber-500 p-0.5 shadow-md group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-emerald-950 rounded-[10px] flex items-center justify-center">
                <Landmark className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-base sm:text-lg tracking-tight text-white flex items-center gap-1.5">
                  <span>BANGLADESH BANK</span>
                  <span className="hidden sm:inline-block text-xs font-semibold px-1.5 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded">
                    AD & Officer Portal
                  </span>
                </h1>
              </div>
              <p className="text-xs text-emerald-300/80 font-medium font-serif">
                {lang === 'bn' ? 'বাংলাদেশ ব্যাংক ও সমন্বিত ব্যাংক নিয়োগ প্রস্তুতি প্ল্যাটফর্ম' : 'Central Bank & Combined Bank Recruitment Portal'}
              </p>
            </div>
          </div>

          {/* Center/Right Actions: Voice Search, Language Toggle, Bookmarks */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Voice Search Button */}
            <button
              onClick={onOpenVoiceSearch}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-900/80 hover:bg-emerald-800 border border-emerald-700/60 text-emerald-100 hover:text-white text-xs sm:text-sm font-medium transition-all shadow-sm hover:shadow-emerald-900/30 group"
              title={lang === 'bn' ? 'কন্ঠস্বর দিয়ে প্রশ্ন বা টপিক খুঁজুন' : 'Search past questions & topics with voice'}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
              <Mic className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
              <span className="hidden md:inline">
                {lang === 'bn' ? 'ভয়েস সার্চ' : 'Voice Search'}
              </span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-900/90 hover:bg-emerald-800 border border-emerald-700/50 text-xs sm:text-sm font-semibold text-amber-300 transition-colors"
              title="Toggle Language"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'English' : 'বাংলা'}</span>
            </button>

            {/* Daily Streak Indicator */}
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold">
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>7 {lang === 'bn' ? 'দিনের স্ট্রিক' : 'Day Streak'}</span>
            </div>

          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-1 overflow-x-auto py-2 no-scrollbar border-t border-emerald-900/80 text-xs sm:text-sm">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all relative ${
                  isActive
                    ? 'bg-amber-500 text-emerald-950 font-bold shadow-md shadow-amber-500/20'
                    : item.highlight
                    ? 'bg-emerald-900/90 text-amber-300 border border-amber-500/30 hover:bg-emerald-850'
                    : 'text-emerald-100/90 hover:text-white hover:bg-emerald-900/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-950' : item.highlight ? 'text-amber-400' : 'text-emerald-300'}`} />
                <span>{lang === 'bn' ? item.labelBn : item.labelEn}</span>
                {item.badge && (
                  <span className="ml-1 px-1.5 py-0.2 text-[10px] uppercase font-extrabold bg-red-600 text-white rounded-full animate-pulse">
                    {item.badge}
                  </span>
                )}
                {item.id === 'subject_practice' && bookmarksCount > 0 && (
                  <span className={`ml-1 text-[10px] px-1.5 py-0.2 rounded-full font-bold ${isActive ? 'bg-emerald-950 text-white' : 'bg-emerald-800 text-amber-300'}`}>
                    {bookmarksCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
