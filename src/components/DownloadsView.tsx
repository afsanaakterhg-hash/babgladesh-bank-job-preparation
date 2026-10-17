import React, { useState } from 'react';
import { 
  Download, 
  FileText, 
  Eye, 
  Printer, 
  CheckCircle, 
  BookOpen, 
  Layers, 
  FileCheck,
  Search,
  Sparkles
} from 'lucide-react';
import { downloadableResources } from '../data/downloadResources';
import { pastExamPapers } from '../data/pastPapers';
import { DownloadableResource, PastExamPaper } from '../types';

interface DownloadsViewProps {
  lang: 'bn' | 'en';
  onOpenPrintSheet: (paper: PastExamPaper) => void;
}

export const DownloadsView: React.FC<DownloadsViewProps> = ({
  lang,
  onOpenPrintSheet
}) => {
  const [activeTab, setActiveTab] = useState<'resources' | 'past_papers'>('resources');
  const [selectedResource, setSelectedResource] = useState<DownloadableResource | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle direct file download
  const handleDownloadFile = (res: DownloadableResource) => {
    const element = document.createElement('a');
    const file = new Blob([res.contentMarkdown], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `${res.title.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const filteredResources = downloadableResources.filter(r => {
    return searchQuery.trim() === '' ||
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.titleBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.summary.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 border border-emerald-800/80 rounded-3xl p-6 sm:p-8 mb-8 shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-3">
            <Download className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'অফিসিয়াল ডাউনলোড সেন্টার' : 'Official Download & Printable Center'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
            {lang === 'bn' 
              ? 'সিলেবাস, শর্টকাট শিট ও বিগত প্রশ্ন ডাউনলোড' 
              : 'Download Syllabus, Formula Sheets & Past Papers'}
          </h2>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 font-serif">
            {lang === 'bn'
              ? 'বাংলাদেশ ব্যাংক ও বিআইবিএম পরীক্ষার জন্য বিশেষায়িত পূর্ণাঙ্গ সিলেবাস, গণিত শর্টকাট টেকনিক, অ্যানালিটিক্যাল রিজনিং সমাধান গাইড এবং ব্যাংকিং পরিভাষা শিট প্রিন্ট ও ডাউনলোড করুন।'
              : 'One-click access to printable formula cheat sheets, monetary policy guides, official syllabus, and verified past year question sheets with step-by-step explanations.'}
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('resources')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'resources'
                  ? 'bg-amber-500 text-emerald-950 shadow-md'
                  : 'bg-slate-900 text-slate-300 border border-slate-700 hover:text-white'
              }`}
            >
              {lang === 'bn' ? 'স্টাডি শিট ও ফর্মুলা গাইড' : 'Study Sheets & Formula Handbooks'}
            </button>
            <button
              onClick={() => setActiveTab('past_papers')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'past_papers'
                  ? 'bg-amber-500 text-emerald-950 shadow-md'
                  : 'bg-slate-900 text-slate-300 border border-slate-700 hover:text-white'
              }`}
            >
              {lang === 'bn' ? 'বিগত প্রশ্ন ও প্রিন্ট শিট' : 'Past Paper Printable Sheets'}
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-6 shadow-md">
        <div className="relative max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'bn' ? 'ডাউনলোড শিট খুঁজুন (Math, Syllabus, Policy)...' : 'Search study sheets, syllabus, formulas...'}
            className="w-full pl-9 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Tab 1: Study Sheets & Formula Handbooks */}
      {activeTab === 'resources' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredResources.map(res => (
            <div
              key={res.id}
              className="bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-6 shadow-xl flex flex-col justify-between transition-all group hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {res.type}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {res.fileSize} • {res.pages} {lang === 'bn' ? 'পৃষ্ঠা' : 'Pages'}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors mb-2">
                  {lang === 'bn' ? res.titleBn : res.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed mb-4 font-sans">
                  {lang === 'bn' ? res.summaryBn : res.summary}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-3 border-t border-slate-800">
                <button
                  onClick={() => setSelectedResource(res)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-semibold transition-colors"
                >
                  <Eye className="w-4 h-4 text-emerald-400" />
                  <span>{lang === 'bn' ? 'অ্যাপে পড়ুন' : 'Quick Read / Preview'}</span>
                </button>

                <button
                  onClick={() => handleDownloadFile(res)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-900/30 transition-all hover:scale-102"
                >
                  <Download className="w-4 h-4" />
                  <span>{lang === 'bn' ? 'ডাউনলোড করুন' : 'Download File'}</span>
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Past Paper Printable Sheets */}
      {activeTab === 'past_papers' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pastExamPapers.map(paper => (
            <div
              key={paper.id}
              className="bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-6 shadow-xl flex flex-col justify-between transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {paper.post}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-400">
                    {paper.year}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2">
                  {lang === 'bn' ? paper.titleBn : paper.title}
                </h3>

                <p className="text-xs text-slate-400 mb-4">
                  {lang === 'bn' ? paper.descriptionBn : paper.description}
                </p>

                <div className="text-xs text-emerald-400 bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-900/50 mb-4">
                  ✓ {lang === 'bn' ? 'সকল প্রশ্নের গাণিতিক ও ব্যাকরণিক ব্যাখ্যা সংবলিত' : 'Includes step-by-step mathematical solutions and grammar notes.'}
                </div>
              </div>

              <button
                onClick={() => onOpenPrintSheet(paper)}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-450 hover:to-amber-550 text-emerald-950 font-extrabold text-xs sm:text-sm rounded-xl shadow-lg shadow-amber-500/20 transition-all hover:scale-102"
              >
                <Printer className="w-4 h-4" />
                <span>{lang === 'bn' ? 'প্রিন্ট ও পিডিএফ ভিউয়ার খুলুন' : 'Open Printable & PDF View'}</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* In-app Document Quick Reader Modal */}
      {selectedResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl max-w-3xl w-full p-6 text-white shadow-2xl relative max-h-[90vh] flex flex-col">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  {lang === 'bn' ? selectedResource.titleBn : selectedResource.title}
                </h3>
                <p className="text-xs text-slate-400">
                  {selectedResource.type} • {selectedResource.fileSize}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownloadFile(selectedResource)}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{lang === 'bn' ? 'ডাউনলোড' : 'Download'}</span>
                </button>
                <button
                  onClick={() => setSelectedResource(null)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs"
                >
                  Close
                </button>
              </div>
            </div>

            {/* Document Content View */}
            <div className="flex-1 overflow-y-auto bg-slate-950 p-5 rounded-xl border border-slate-800 font-mono text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
              {selectedResource.contentMarkdown}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
