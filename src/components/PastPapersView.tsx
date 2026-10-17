import React, { useState } from 'react';
import { 
  BookOpen, 
  Download, 
  Play, 
  Calendar, 
  Building2, 
  Clock, 
  CheckCircle, 
  Search, 
  Filter, 
  Printer,
  FileSpreadsheet
} from 'lucide-react';
import { pastExamPapers } from '../data/pastPapers';
import { PastExamPaper } from '../types';

interface PastPapersViewProps {
  lang: 'bn' | 'en';
  onStartExam: (paper: PastExamPaper) => void;
  onOpenPrintSheet: (paper: PastExamPaper) => void;
}

export const PastPapersView: React.FC<PastPapersViewProps> = ({
  lang,
  onStartExam,
  onOpenPrintSheet
}) => {
  const [selectedPost, setSelectedPost] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const posts = [
    { id: 'all', labelEn: 'All Posts', labelBn: 'সকল পদ' },
    { id: 'Assistant Director (AD)', labelEn: 'Assistant Director (AD)', labelBn: 'সহকারী পরিচালক (এডি)' },
    { id: 'Officer (General)', labelEn: 'Officer (General)', labelBn: 'অফিসার (সাধারণ)' },
    { id: 'Officer (Cash)', labelEn: 'Officer (Cash)', labelBn: 'অফিসার (ক্যাশ)' },
    { id: 'Combined 8/9 Bank', labelEn: 'Combined Banks', labelBn: 'সমন্বিত ব্যাংক' }
  ];

  const years = ['all', '2023', '2022', '2021'];

  const filteredPapers = pastExamPapers.filter(paper => {
    const matchesPost = selectedPost === 'all' || paper.post === selectedPost;
    const matchesYear = selectedYear === 'all' || paper.year.toString() === selectedYear;
    const matchesSearch = searchQuery.trim() === '' || 
      paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.titleBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesPost && matchesYear && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
      
      {/* Hero Banner for Past Papers */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 border border-emerald-800/80 rounded-3xl p-6 sm:p-8 mb-8 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none"></div>
        
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'বাংলাদেশ ব্যাংক ও বিআইবিএম আর্কাইভ' : 'Official Central Bank Question Bank'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
            {lang === 'bn' 
              ? 'বিগত বছরের প্রশ্ন ও বিস্তারিত সমাধান' 
              : 'Past Years Question Papers & Complete Solutions'}
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-serif">
            {lang === 'bn'
              ? 'বাংলাদেশ ব্যাংক সহকারী পরিচালক (AD), অফিসার জেনারেল, ক্যাশ এবং সমন্বিত ৮/৯ ব্যাংকের বিগত বছরের সকল প্রশ্নপত্র নির্ভুল উত্তর এবং গণিতের ধাপে ধাপে ব্যাখ্যাকৃত সমাধানসহ ডাউনলোড ও অনুশীলন করুন।'
              : 'Access authentic question papers for Assistant Director (AD), General Officer, Cash Officer, and Combined Banks with step-by-step mathematical derivations and bilingual explanations.'}
          </p>

          {/* Quick Stats Pill */}
          <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-300">
            <div className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-700">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>{lang === 'bn' ? '১০০% ভেরিফাইড সল্যুশন' : '100% Verified Solutions'}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-700">
              <Printer className="w-4 h-4 text-amber-400" />
              <span>{lang === 'bn' ? 'প্রিন্ট ও পিডিএফ ডাউনলোড ব্যবস্থা' : 'One-Click Print / PDF Download'}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-700">
              <FileSpreadsheet className="w-4 h-4 text-cyan-400" />
              <span>{lang === 'bn' ? 'আইবিএ ও বিআইবিএম স্ট্যান্ডার্ড' : 'BIBM & IBA Formatted'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-6 shadow-md">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Post Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            {posts.map(post => (
              <button
                key={post.id}
                onClick={() => setSelectedPost(post.id)}
                className={`text-xs px-3 py-2 rounded-xl font-semibold whitespace-nowrap transition-all ${
                  selectedPost === post.id
                    ? 'bg-amber-500 text-emerald-950 shadow-md font-bold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700/60'
                }`}
              >
                {lang === 'bn' ? post.labelBn : post.labelEn}
              </button>
            ))}
          </div>

          {/* Year and Search */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            
            {/* Year selector */}
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="all">{lang === 'bn' ? 'সকল সাল' : 'All Years'}</option>
              {years.filter(y => y !== 'all').map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>

            {/* Search Input */}
            <div className="relative flex-1 md:w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === 'bn' ? 'প্রশ্ন বা সাল খুঁজুন...' : 'Search papers or tags...'}
                className="w-full pl-8 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </div>

          </div>

        </div>
      </div>

      {/* Question Papers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPapers.map(paper => (
          <div
            key={paper.id}
            className="bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-6 shadow-xl flex flex-col justify-between transition-all group hover:-translate-y-1"
          >
            <div>
              {/* Paper Top Badges */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {paper.post}
                </span>
                <span className="text-xs font-mono font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-md border border-amber-400/20">
                  {paper.year}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors mb-2">
                {lang === 'bn' ? paper.titleBn : paper.title}
              </h3>

              <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed font-sans">
                {lang === 'bn' ? paper.descriptionBn : paper.description}
              </p>

              {/* Organizer & Meta */}
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 mb-5 bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate">{paper.organizer}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{paper.durationMinutes} {lang === 'bn' ? 'মিনিট' : 'Mins'} (100 Qs)</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {paper.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[10px] font-medium px-2 py-0.5 bg-slate-800 text-slate-400 rounded-md border border-slate-700/60"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-3 border-t border-slate-800">
              <button
                onClick={() => onStartExam(paper)}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-emerald-600/20 transition-all hover:scale-[1.02]"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>{lang === 'bn' ? 'পরীক্ষা দিন / প্র্যাকটিস' : 'Take Exam / Practice'}</span>
              </button>

              <button
                onClick={() => onOpenPrintSheet(paper)}
                className="flex items-center gap-1.5 py-2.5 px-3 bg-slate-800 hover:bg-emerald-950 text-amber-300 border border-slate-700 hover:border-amber-500/50 rounded-xl text-xs sm:text-sm font-semibold transition-all hover:scale-[1.02]"
                title="Download / Print Question with Solutions"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">{lang === 'bn' ? 'ডাউনলোড শিট' : 'Download Sheet'}</span>
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
