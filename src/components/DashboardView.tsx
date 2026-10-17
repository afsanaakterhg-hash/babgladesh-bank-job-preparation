import React from 'react';
import { 
  Landmark, 
  Radio, 
  BookOpen, 
  CheckCircle2, 
  Layers, 
  Sparkles, 
  Download, 
  ArrowRight, 
  Trophy, 
  Target, 
  Clock, 
  Users, 
  Flame, 
  BookMarked,
  TrendingUp,
  BrainCircuit,
  Lightbulb
} from 'lucide-react';
import { pastExamPapers } from '../data/pastPapers';
import { mockTestConfigs, allMockQuestions } from '../data/mockTests';
import { CompletedExamResult, PastExamPaper } from '../types';

interface DashboardViewProps {
  lang: 'bn' | 'en';
  onNavigateTab: (tab: string) => void;
  onStartExam: (paper: PastExamPaper) => void;
  examHistory: CompletedExamResult[];
  bookmarkedCount: number;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  lang,
  onNavigateTab,
  onStartExam,
  examHistory,
  bookmarkedCount
}) => {
  const latestLiveExam = mockTestConfigs.find(c => c.isLive) || mockTestConfigs[0];
  const totalSolved = examHistory.reduce((acc, h) => acc + (h.correctCount + h.wrongCount), 0);
  const totalCorrect = examHistory.reduce((acc, h) => acc + h.correctCount, 0);
  const accuracy = totalSolved > 0 ? Math.round((totalCorrect / totalSolved) * 100) : 74;

  const quickSubjects = [
    { id: 'math', nameEn: 'Quantitative Math', nameBn: 'গণিত ও শর্টকাট', icon: '📐', descBn: 'পাটিগণিত, বীজগণিত, বিন্যাস ও সম্ভাব্যতা', descEn: 'Arithmetic, Algebra, Permutation, Probability' },
    { id: 'analytical', nameEn: 'Analytical Ability', nameBn: 'অ্যানালিটিক্যাল এবিলিটি', icon: '🧩', descBn: 'লজিক পাজল, সিটিং অ্যারেঞ্জমেন্ট, ক্রিটিকাল রিজনিং', descEn: 'Logic Puzzles, Seating Arrangements, Critical Reasoning' },
    { id: 'english', nameEn: 'English Language', nameBn: 'ইংরেজি ব্যাকরণ ও অ্যানালজি', icon: '📖', descBn: 'অ্যানালজি, সিনোনিম-অ্যান্টনিম, সেন্টেন্স কারেকশন', descEn: 'Analogy, Synonyms, Vocabulary, Sentence Correction' },
    { id: 'banking_gk', nameEn: 'Banking GK & Affairs', nameBn: 'ব্যাংকিং সাধারণ জ্ঞান', icon: '🏦', descBn: 'মুদ্রানীতি, বাংলাদেশ ব্যাংক অর্ডার, ব্যাসেল-৩, সিআরআর', descEn: 'Monetary Policy, BB Order, Basel III, CRR/SLR' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
      
      {/* Welcome & Live Notification Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 border border-emerald-800/80 rounded-3xl p-6 sm:p-8 mb-8 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-2/5 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/15 via-emerald-600/5 to-transparent pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold flex items-center gap-1.5">
                <Landmark className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'বাংলাদেশ ব্যাংক সহকারী পরিচালক (এডি) ও অফিসার প্রস্তুতি' : 'Central Bank AD & Officer Examination Portal'}</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
              {lang === 'bn' ? 'স্বাগতম! বাংলাদেশ ব্যাংক জব প্রস্তুতি পোর্টালে' : 'Welcome to Bangladesh Bank Job Prep Portal'}
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 font-serif">
              {lang === 'bn'
                ? 'বিগত বছরের প্রশ্ন সমাধান, লাইভ জাতীয় মেধা টেস্ট, বিষয়ভিত্তিক প্র্যাকটিস (ম্যাথ, অ্যানালিটিক্যাল, ইংলিশ), প্রিন্ট ও ডাউনলোড সুবিধা এবং পারফরম্যান্স ট্র্যাকিং এআই কোচ।'
                : 'Your comprehensive platform for authentic past papers, all-Bangladesh live mock exams, subject-wise mastery, printable question sheets, and AI-powered performance analysis.'}
            </p>

            {/* Quick Action Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigateTab('past_papers')}
                className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-emerald-950 font-extrabold text-xs sm:text-sm rounded-xl shadow-lg shadow-amber-500/20 transition-all hover:scale-105"
              >
                <BookOpen className="w-4 h-4" />
                <span>{lang === 'bn' ? 'বিগত প্রশ্নসমূহ দেখুন' : 'Explore Past Papers'}</span>
              </button>

              <button
                onClick={() => onNavigateTab('live_test')}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg shadow-red-600/30 transition-all hover:scale-105"
              >
                <Radio className="w-4 h-4 animate-pulse" />
                <span>{lang === 'bn' ? 'লাইভ পরীক্ষা দিন' : 'Take Live Test'}</span>
              </button>

              <button
                onClick={() => onNavigateTab('downloads')}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-xs sm:text-sm rounded-xl border border-slate-700 transition-all"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                <span>{lang === 'bn' ? 'সিলেবাস ও শিট ডাউনলোড' : 'Download Sheets'}</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Widget */}
          <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl w-full lg:w-72 shadow-xl flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                {lang === 'bn' ? 'আমার প্রস্তুতি স্ট্যাটাস' : 'My Prep Stats'}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400">
                Active
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-300">{lang === 'bn' ? 'সমাধানকৃত প্রশ্ন:' : 'Questions Attempted:'}</span>
                <span className="text-xs font-mono font-bold text-white">{totalSolved > 0 ? totalSolved : 45}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-300">{lang === 'bn' ? 'গড় নির্ভুলতা (Accuracy):' : 'Average Accuracy:'}</span>
                <span className="text-xs font-mono font-bold text-emerald-400">{accuracy}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-300">{lang === 'bn' ? 'এআই প্রস্তুতি সূচক:' : 'AI Readiness Score:'}</span>
                <span className="text-xs font-mono font-bold text-amber-400">78% (BB AD)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-300">{lang === 'bn' ? 'সংরক্ষিত প্রশ্ন:' : 'Bookmarked Questions:'}</span>
                <span className="text-xs font-mono font-bold text-cyan-400">{bookmarkedCount}</span>
              </div>
            </div>

            <button
              onClick={() => onNavigateTab('ai_coach')}
              className="mt-4 w-full py-2 bg-emerald-950 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-300 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'bn' ? 'এআই বিস্তারিত রিপোর্ট দেখুন' : 'View AI Study Report'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Live National Grand Exam Banner (Sticky Attention) */}
      <div 
        onClick={() => onNavigateTab('live_test')}
        className="bg-gradient-to-r from-red-950/60 via-slate-900 to-rose-950/60 border border-red-500/40 rounded-2xl p-4 sm:p-5 mb-8 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer hover:border-red-500 transition-all group"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform flex-shrink-0">
            <Radio className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.2 rounded-full text-[10px] uppercase font-black bg-red-500 text-white">
                LIVE
              </span>
              <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-red-300 transition-colors">
                {lang === 'bn' ? latestLiveExam.titleBn : latestLiveExam.title}
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {lang === 'bn' ? '৩,৮৪০+ পরীক্ষার্থী অংশ নিচ্ছে • ০.২৫ নেগেটিভ মার্কিং • লাইভ মেধা তালিকা' : '3,840+ Examinees Participating • Strict 0.25 Negative Marking • Instant Ranking'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center">
          <span className="text-xs font-bold text-amber-300">
            {lang === 'bn' ? 'অংশ নিন' : 'Enter Test'}
          </span>
          <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      {/* 4 Feature Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        
        <div 
          onClick={() => onNavigateTab('past_papers')}
          className="bg-slate-900 border border-slate-800 hover:border-amber-500/50 p-5 rounded-2xl cursor-pointer transition-all hover:-translate-y-1 shadow-lg group flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3 group-hover:scale-110 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors mb-1">
              {lang === 'bn' ? 'বিগত বছরের প্রশ্ন' : 'Past Year Papers'}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed font-sans mb-3">
              {lang === 'bn' 
                ? 'এডি, অফিসার জেনারেল ও ক্যাশ পদের বিগত বছরের পূর্ণাঙ্গ প্রশ্নপত্র ব্যাখ্যাসহ।' 
                : 'Authentic AD, Officer & Cash papers with complete mathematical solutions.'}
            </p>
          </div>
          <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
            {lang === 'bn' ? 'প্রশ্নসমূহ দেখুন' : 'Explore Archive'} <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>

        <div 
          onClick={() => onNavigateTab('model_tests')}
          className="bg-slate-900 border border-slate-800 hover:border-emerald-500/50 p-5 rounded-2xl cursor-pointer transition-all hover:-translate-y-1 shadow-lg group flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3 group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors mb-1">
              {lang === 'bn' ? 'মডেল টেস্ট ও মক' : 'Model Tests & Mocks'}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed font-sans mb-3">
              {lang === 'bn' 
                ? 'টাইমড টেস্ট, বিআইবিএম প্যাটার্ন ও সঠিক ০.২৫ নেগেটিভ মার্কিং ব্যবস্থাপনা।' 
                : 'Timed tests following official marks distribution with real negative marks.'}
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
            {lang === 'bn' ? 'টেস্ট দিন' : 'Take Exam'} <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>

        <div 
          onClick={() => onNavigateTab('subject_practice')}
          className="bg-slate-900 border border-slate-800 hover:border-purple-500/50 p-5 rounded-2xl cursor-pointer transition-all hover:-translate-y-1 shadow-lg group flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-3 group-hover:scale-110 transition-transform">
              <Layers className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors mb-1">
              {lang === 'bn' ? 'বিষয়ভিত্তিক প্র্যাকটিস' : 'Subject Practice'}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed font-sans mb-3">
              {lang === 'bn' 
                ? 'ম্যাথ, অ্যানালিটিক্যাল, ইংলিশ ও ব্যাংকিং সাধারণ জ্ঞানের আলাদা ড্রিল।' 
                : 'Deep drills on Math, Analytical Puzzles, English Analogy, and Banking GK.'}
            </p>
          </div>
          <span className="text-xs font-bold text-purple-400 flex items-center gap-1">
            {lang === 'bn' ? 'অনুশীলন করুন' : 'Start Drill'} <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>

        <div 
          onClick={() => onNavigateTab('ai_coach')}
          className="bg-slate-900 border border-slate-800 hover:border-teal-500/50 p-5 rounded-2xl cursor-pointer transition-all hover:-translate-y-1 shadow-lg group flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 mb-3 group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white group-hover:text-teal-300 transition-colors mb-1">
              {lang === 'bn' ? 'এআই স্টাডি কোচ' : 'AI Study Coach'}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed font-sans mb-3">
              {lang === 'bn' 
                ? 'আপনার টেস্ট অ্যানালাইসিস, দুর্বলতা চিহ্নিতকরণ ও ২৪/৭ এআই মেন্টর চ্যাট।' 
                : 'Personalized diagnostics, 7-day study roadmap, and 24/7 AI mentor chat.'}
            </p>
          </div>
          <span className="text-xs font-bold text-teal-400 flex items-center gap-1">
            {lang === 'bn' ? 'মেন্টরের সাথে কথা বলুন' : 'Ask AI Mentor'} <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>

      </div>

      {/* Grid: High-yield Banking Formula of the Day & Recent Past Papers */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (7 cols): Recent Past Papers Spotlight */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-400" />
                <span>{lang === 'bn' ? 'জনপ্রিয় বিগত প্রশ্নপত্রসমূহ' : 'Featured Past Question Papers'}</span>
              </h3>
              <p className="text-xs text-slate-400">
                {lang === 'bn' ? 'সরাসরি প্র্যাকটিস বা প্রিন্ট শিট ডাউনলোড করুন' : 'Direct practice or print/download sheets with full answers'}
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('past_papers')}
              className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
            >
              <span>{lang === 'bn' ? 'সবগুলো দেখুন' : 'View All'}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3">
            {pastExamPapers.slice(0, 3).map(paper => (
              <div
                key={paper.id}
                className="p-4 bg-slate-950 border border-slate-800 hover:border-emerald-700/60 rounded-xl flex items-center justify-between gap-4 transition-all group"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                      {paper.post}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-400">
                      {paper.year}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-white group-hover:text-amber-300 transition-colors">
                    {lang === 'bn' ? paper.titleBn : paper.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {paper.organizer} • {paper.questions.length} {lang === 'bn' ? 'টি প্রশ্ন সমাধানসহ' : 'Questions with Derivations'}
                  </p>
                </div>

                <button
                  onClick={() => onStartExam(paper)}
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold whitespace-nowrap shadow-md"
                >
                  {lang === 'bn' ? 'অনুশীলন' : 'Practice'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (5 cols): Banking Formula & Concept of the Day */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Formula of the day */}
          <div className="bg-gradient-to-br from-emerald-950/80 to-slate-900 border border-amber-500/30 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-5 h-5 text-amber-400" />
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                {lang === 'bn' ? 'আজকের ব্যাংক ম্যাথ শর্টকাট সূত্র' : 'Bank Math Shortcut of the Day'}
              </h4>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono mb-3">
              <p className="text-amber-300 font-bold mb-1">
                Repeated Dilution Formula (মিশ্রণ অপনয়ন):
              </p>
              <p className="text-slate-200">
                Remaining Pure Liquid = Initial * (1 - y / x)^n
              </p>
              <p className="text-slate-400 text-[11px] mt-1 font-sans">
                x = Total capacity, y = Replaced amount, n = Operations
              </p>
            </div>

            <p className="text-xs text-slate-300 font-serif leading-relaxed mb-4">
              {lang === 'bn'
                ? 'বাংলাদেশ ব্যাংক ও বিআইবিএম পরীক্ষায় এই সূত্র ব্যবহার করে দুধ ও পানির মিশ্রণ সংক্রান্ত প্রশ্ন মাত্র ২০ সেকেন্ডে সমাধান করা যায়।'
                : 'Using this alligation formula saves crucial seconds in Bangladesh Bank AD exams compared to traditional algebraic steps.'}
            </p>

            <button
              onClick={() => onNavigateTab('downloads')}
              className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1.5"
            >
              <span>{lang === 'bn' ? 'সম্পূর্ণ ম্যাথ শর্টকাট শিট ডাউনলোড করুন' : 'Download Full Math Shortcut Sheet'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Subject Practice Direct Links */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              {lang === 'bn' ? 'বিষয়ভিত্তিক সরাসরি অনুশীলন' : 'Direct Subject Access'}
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {quickSubjects.map(s => (
                <button
                  key={s.id}
                  onClick={() => onNavigateTab('subject_practice')}
                  className="p-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-left transition-colors"
                >
                  <span className="text-base mb-1 block">{s.icon}</span>
                  <p className="text-xs font-bold text-white">{lang === 'bn' ? s.nameBn : s.nameEn}</p>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
