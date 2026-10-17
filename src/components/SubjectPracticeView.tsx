import React, { useState } from 'react';
import { 
  Calculator, 
  BookText, 
  BrainCircuit, 
  PenTool, 
  Landmark, 
  CheckCircle2, 
  XCircle, 
  Bookmark, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  RefreshCw,
  Search,
  MessageSquareQuote
} from 'lucide-react';
import { allQuestions } from '../data/pastPapers';
import { allMockQuestions } from '../data/mockTests';
import { Question, SubjectCategory } from '../types';

interface SubjectPracticeViewProps {
  lang: 'bn' | 'en';
  bookmarkedIds: string[];
  onToggleBookmark: (questionId: string) => void;
  onAskMentorForQuestion?: (question: Question) => void;
}

export const SubjectPracticeView: React.FC<SubjectPracticeViewProps> = ({
  lang,
  bookmarkedIds,
  onToggleBookmark,
  onAskMentorForQuestion
}) => {
  const [selectedCategory, setSelectedCategory] = useState<SubjectCategory>('math');
  const [selectedSubtopic, setSelectedSubtopic] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState('');
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});
  const [userSelectedOptions, setUserSelectedOptions] = useState<Record<string, number>>({});
  const [isGeneratingAIQuestion, setIsGeneratingAIQuestion] = useState(false);
  const [dynamicAIQuestions, setDynamicAIQuestions] = useState<Question[]>([]);
  const [onlyBookmarks, setOnlyBookmarks] = useState(false);

  const subjectTabs = [
    { 
      id: 'math' as SubjectCategory, 
      labelEn: 'Quantitative Math', 
      labelBn: 'গণিত ও সংখ্যাতত্ত্ব', 
      icon: Calculator,
      color: 'from-amber-600 to-amber-700'
    },
    { 
      id: 'english' as SubjectCategory, 
      labelEn: 'English Language', 
      labelBn: 'ইংরেজি ভাষা ও ব্যাকরণ', 
      icon: BookText,
      color: 'from-blue-600 to-indigo-700'
    },
    { 
      id: 'analytical' as SubjectCategory, 
      labelEn: 'Analytical Ability', 
      labelBn: 'অ্যানালিটিক্যাল ও পাজল', 
      icon: BrainCircuit,
      color: 'from-purple-600 to-violet-700'
    },
    { 
      id: 'banking_gk' as SubjectCategory, 
      labelEn: 'Banking GK & Affairs', 
      labelBn: 'বাংলাদেশ ব্যাংক ও অর্থনীতি', 
      icon: Landmark,
      color: 'from-emerald-600 to-teal-700'
    },
    { 
      id: 'bangla' as SubjectCategory, 
      labelEn: 'Bangla Grammar & Lit', 
      labelBn: 'বাংলা ব্যাকরণ ও সাহিত্য', 
      icon: PenTool,
      color: 'from-rose-600 to-red-700'
    }
  ];

  // Combine static and dynamically generated questions
  const fullPool = [...allQuestions, ...allMockQuestions, ...dynamicAIQuestions];

  // Available subtopics for current category
  const availableSubtopics = Array.from(
    new Set(
      fullPool
        .filter(q => q.category === selectedCategory)
        .map(q => q.subtopic)
        .filter(Boolean)
    )
  );

  const filteredQuestions = fullPool.filter(q => {
    if (onlyBookmarks && !bookmarkedIds.includes(q.id)) return false;
    if (q.category !== selectedCategory) return false;
    if (selectedSubtopic !== 'all' && q.subtopic !== selectedSubtopic) return false;
    if (searchFilter.trim() !== '') {
      const qText = (q.question + ' ' + q.questionBn + ' ' + q.subtopic).toLowerCase();
      if (!qText.includes(searchFilter.toLowerCase())) return false;
    }
    return true;
  });

  const toggleSolution = (qId: string) => {
    setRevealedSolutions(prev => ({
      ...prev,
      [qId]: !prev[qId]
    }));
  };

  const handleSelectOption = (qId: string, optIdx: number) => {
    setUserSelectedOptions(prev => ({
      ...prev,
      [qId]: optIdx
    }));
    // Auto reveal solution upon picking
    setRevealedSolutions(prev => ({
      ...prev,
      [qId]: true
    }));
  };

  // Generate an authentic AI question on the spot
  const handleGenerateAIQuestion = async () => {
    setIsGeneratingAIQuestion(true);
    try {
      const response = await fetch('/api/ai/generate-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: selectedCategory,
          subtopic: selectedSubtopic !== 'all' ? selectedSubtopic : 'Standard Bank Exam Topic',
          difficulty: 'hard',
          language: lang
        })
      });

      if (response.ok) {
        const data = await response.json();
        const newQ: Question = {
          id: `ai-${Date.now()}`,
          question: data.question || 'Sample Question',
          questionBn: data.questionBn || 'নমুনা প্রশ্ন',
          options: data.options || ['A', 'B', 'C', 'D'],
          correctIndex: data.correctIndex ?? 0,
          explanation: data.explanation || 'Detailed solution',
          explanationBn: data.explanationBn || 'বিস্তারিত সমাধান',
          category: selectedCategory,
          subtopic: data.subtopic || 'AI Drill',
          examSource: 'Gemini AI Model Generator',
          difficulty: 'hard'
        };

        setDynamicAIQuestions(prev => [newQ, ...prev]);
        setRevealedSolutions(prev => ({ ...prev, [newQ.id]: false }));
      }
    } catch (err) {
      console.error('Failed to generate question', err);
    } finally {
      setIsGeneratingAIQuestion(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
      
      {/* Category Pills Header */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
        {subjectTabs.map(tab => {
          const Icon = tab.icon;
          const isSelected = selectedCategory === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setSelectedCategory(tab.id);
                setSelectedSubtopic('all');
              }}
              className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-gradient-to-br ' + tab.color + ' text-white border-transparent shadow-lg scale-102 ring-2 ring-amber-400/50'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-5 h-5 ${isSelected ? 'text-amber-300' : 'text-slate-400'}`} />
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                  isSelected ? 'bg-black/20 text-white' : 'bg-slate-800 text-slate-400'
                }`}>
                  {fullPool.filter(q => q.category === tab.id).length} Qs
                </span>
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold leading-tight">
                  {lang === 'bn' ? tab.labelBn : tab.labelEn}
                </p>
                <p className={`text-[10px] mt-0.5 ${isSelected ? 'text-white/80' : 'text-slate-500'}`}>
                  {lang === 'bn' ? tab.labelEn : tab.labelBn}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Subtopic, Filter and AI Generator Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-6 shadow-md">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            
            {/* Subtopic Filter */}
            <select
              value={selectedSubtopic}
              onChange={(e) => setSelectedSubtopic(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="all">{lang === 'bn' ? 'সকল সাব-টপিক' : 'All Subtopics'}</option>
              {availableSubtopics.map(sub => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>

            {/* Bookmarks Only Toggle */}
            <button
              onClick={() => setOnlyBookmarks(!onlyBookmarks)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                onlyBookmarks
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'বুকমার্ককৃত প্রশ্ন' : 'Bookmarked Only'}</span>
            </button>

            {/* Search Input */}
            <div className="relative flex-1 sm:w-56">
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder={lang === 'bn' ? 'প্রশ্ন ফিল্টার করুন...' : 'Filter questions...'}
                className="w-full pl-8 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </div>

          </div>

          {/* AI Generator Button */}
          <button
            onClick={handleGenerateAIQuestion}
            disabled={isGeneratingAIQuestion}
            className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-900/30 transition-all hover:scale-105 disabled:opacity-50"
          >
            <Sparkles className={`w-3.5 h-3.5 text-amber-300 ${isGeneratingAIQuestion ? 'animate-spin' : ''}`} />
            <span>
              {isGeneratingAIQuestion 
                ? (lang === 'bn' ? 'AI প্রশ্ন তৈরি করছে...' : 'Generating AI Question...') 
                : (lang === 'bn' ? 'AI দিয়ে নতুন প্রশ্ন তৈরি করুন' : 'Generate New AI Question')}
            </span>
          </button>

        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {filteredQuestions.length === 0 ? (
          <div className="text-center py-16 bg-slate-900 border border-slate-800 rounded-2xl">
            <p className="text-slate-400 text-sm">
              {lang === 'bn' ? 'এই ক্যাটাগরিতে কোনো প্রশ্ন পাওয়া যায়নি।' : 'No questions found for this selection.'}
            </p>
          </div>
        ) : (
          filteredQuestions.map((q, idx) => {
            const isBookmarked = bookmarkedIds.includes(q.id);
            const userChoice = userSelectedOptions[q.id];
            const isAnswered = userChoice !== undefined;
            const isSolutionRevealed = revealedSolutions[q.id];

            return (
              <div
                key={q.id}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 sm:p-6 shadow-xl transition-all"
              >
                {/* Question Top Header */}
                <div className="flex items-center justify-between gap-3 mb-3 pb-2.5 border-b border-slate-800/80 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-md border border-amber-400/20">
                      Q{idx + 1}
                    </span>
                    <span className="text-slate-300 font-semibold">
                      {q.subtopic}
                    </span>
                    <span className="text-[10px] text-slate-500 bg-slate-800 px-2 py-0.5 rounded">
                      {q.examSource}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onToggleBookmark(q.id)}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        isBookmarked 
                          ? 'bg-amber-500/20 border-amber-500 text-amber-400' 
                          : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                      }`}
                      title="Bookmark Question"
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                    {onAskMentorForQuestion && (
                      <button
                        onClick={() => onAskMentorForQuestion(q)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-medium"
                      >
                        <MessageSquareQuote className="w-3.5 h-3.5 text-amber-400" />
                        <span className="hidden sm:inline">{lang === 'bn' ? 'AI মেন্টর' : 'Ask AI'}</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Question Body */}
                <div className="mb-4">
                  <h4 className="text-sm sm:text-base font-semibold text-white leading-relaxed font-serif">
                    {lang === 'bn' ? q.questionBn : q.question}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1.5 font-mono italic">
                    {lang === 'bn' ? q.question : q.questionBn}
                  </p>
                </div>

                {/* Multiple Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = userChoice === optIdx;
                    const isCorrect = q.correctIndex === optIdx;
                    const optText = (lang === 'bn' && q.optionsBn?.[optIdx]) ? q.optionsBn[optIdx] : opt;

                    let optBg = 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border-slate-700/80';
                    let badgeClass = 'bg-slate-700 text-slate-300';

                    if (isAnswered) {
                      if (isCorrect) {
                        optBg = 'bg-emerald-950/80 border-emerald-500 text-emerald-100 ring-1 ring-emerald-500/50';
                        badgeClass = 'bg-emerald-500 text-emerald-950 font-bold';
                      } else if (isSelected && !isCorrect) {
                        optBg = 'bg-red-950/80 border-red-500 text-red-100 ring-1 ring-red-500/50';
                        badgeClass = 'bg-red-500 text-white font-bold';
                      }
                    }

                    return (
                      <div
                        key={optIdx}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${optBg}`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold ${badgeClass}`}>
                            {['A', 'B', 'C', 'D'][optIdx]}
                          </span>
                          <span className="text-xs sm:text-sm font-medium">
                            {optText}
                          </span>
                        </div>
                        {isAnswered && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                        {isAnswered && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-red-400" />}
                      </div>
                    );
                  })}
                </div>

                {/* Show/Hide Solution Button */}
                <div className="pt-2 flex items-center justify-between">
                  <button
                    onClick={() => toggleSolution(q.id)}
                    className="flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    <span>{isSolutionRevealed ? (lang === 'bn' ? 'ব্যাখ্যা লুকান' : 'Hide Solution') : (lang === 'bn' ? 'সঠিক উত্তর ও সমাধান দেখুন' : 'Show Answer & Explanation')}</span>
                    {isSolutionRevealed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  {isAnswered && (
                    <span className={`text-xs font-bold ${userChoice === q.correctIndex ? 'text-emerald-400' : 'text-red-400'}`}>
                      {userChoice === q.correctIndex ? (lang === 'bn' ? '✓ সঠিক উত্তর!' : '✓ Correct!') : (lang === 'bn' ? '✗ ভুল উত্তর' : '✗ Incorrect')}
                    </span>
                  )}
                </div>

                {/* Explanation Card */}
                {isSolutionRevealed && (
                  <div className="mt-3 p-4 rounded-xl bg-slate-950 border border-emerald-900/60 text-xs sm:text-sm animate-in fade-in duration-150">
                    <p className="font-bold text-amber-400 text-xs uppercase mb-1 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      {lang === 'bn' ? `সঠিক উত্তর: (${['A','B','C','D'][q.correctIndex]})` : `Correct Answer: Option (${['A','B','C','D'][q.correctIndex]})`}
                    </p>
                    <p className="text-slate-200 leading-relaxed font-sans mb-2">
                      {lang === 'bn' ? q.explanationBn : q.explanation}
                    </p>
                    <p className="text-slate-400 text-xs font-mono border-t border-slate-800 pt-1.5">
                      {lang === 'bn' ? q.explanation : q.explanationBn}
                    </p>
                  </div>
                )}

              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
