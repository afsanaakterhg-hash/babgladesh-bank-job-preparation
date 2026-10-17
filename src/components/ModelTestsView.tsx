import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Play, 
  Users, 
  AlertTriangle, 
  Zap, 
  BookOpen, 
  Flame, 
  TrendingUp, 
  Sparkles 
} from 'lucide-react';
import { mockTestConfigs, allMockQuestions } from '../data/mockTests';
import { allQuestions } from '../data/pastPapers';
import { MockTestConfig, Question } from '../types';

interface ModelTestsViewProps {
  lang: 'bn' | 'en';
  onStartTest: (config: MockTestConfig, questions: Question[]) => void;
}

export const ModelTestsView: React.FC<ModelTestsViewProps> = ({
  lang,
  onStartTest
}) => {
  // Helper to assemble questions for each model test
  const getQuestionsForTest = (config: MockTestConfig): Question[] => {
    if (config.category && config.category !== 'full') {
      const filtered = [...allQuestions, ...allMockQuestions].filter(q => q.category === config.category);
      return filtered.length >= config.totalQuestions ? filtered.slice(0, config.totalQuestions) : filtered;
    }
    // Full model test combines across categories
    const mathQs = [...allQuestions, ...allMockQuestions].filter(q => q.category === 'math').slice(0, 7);
    const engQs = [...allQuestions, ...allMockQuestions].filter(q => q.category === 'english').slice(0, 6);
    const anaQs = [...allQuestions, ...allMockQuestions].filter(q => q.category === 'analytical').slice(0, 5);
    const gkQs = [...allQuestions, ...allMockQuestions].filter(q => q.category === 'banking_gk').slice(0, 4);
    const bnQs = [...allQuestions, ...allMockQuestions].filter(q => q.category === 'bangla').slice(0, 3);
    return [...mathQs, ...engQs, ...anaQs, ...gkQs, ...bnQs];
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 border border-emerald-800/80 rounded-3xl p-6 sm:p-8 mb-8 shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-3">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'বাংলাদেশ ব্যাংক স্ট্যান্ডার্ড মডেল টেস্ট' : 'BIBM Standard Model Tests'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
            {lang === 'bn' 
              ? 'টাইমড মডেল টেস্ট ও প্র্যাকটিস মক এক্সাম' 
              : 'Timed Model Tests & Mock Examinations'}
          </h2>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 font-serif">
            {lang === 'bn'
              ? 'বাংলাদেশ ব্যাংক এডি, অফিসার ও সমন্বিত ব্যাংকের প্রশ্ন কাঠামোর ওপর ভিত্তি করে তৈরি পূর্ণাঙ্গ এবং বিষয়ভিত্তিক মডেল টেস্ট। পরীক্ষার হলে সময় ব্যবস্থাপনা ও নেগেটিভ মার্কিং নিয়ন্ত্রণের সেরা প্রস্তুতি।'
              : 'Simulate the pressure of Bangladesh Bank recruitment exams with timed tests, negative markings (-0.25), and comprehensive post-exam reviews.'}
          </p>

          <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-300">
            <div className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-700">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>{lang === 'bn' ? 'ইনস্ট্যান্ট স্কোর ও পার্সেন্টাইল' : 'Instant Score & Percentile'}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-700">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span>{lang === 'bn' ? '০.২৫ নেগেটিভ মার্কিং সম্বলিত' : 'Strict 0.25 Negative Marking'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Model Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockTestConfigs.map(test => {
          const testQuestions = getQuestionsForTest(test);
          return (
            <div
              key={test.id}
              className="bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-6 shadow-xl flex flex-col justify-between transition-all group hover:-translate-y-1"
            >
              <div>
                {/* Meta Top Bar */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                    test.isLive 
                      ? 'bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}>
                    {test.isLive ? 'LIVE NOW' : test.category?.toUpperCase() || 'FULL EXAM'}
                  </span>
                  <span className="text-xs font-semibold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                    {test.difficulty}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors mb-2">
                  {lang === 'bn' ? test.titleBn : test.title}
                </h3>

                {/* Info Pills */}
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 mb-5 bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{test.durationMinutes} {lang === 'bn' ? 'মিনিট' : 'Mins'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{testQuestions.length} {lang === 'bn' ? 'টি প্রশ্ন' : 'Questions'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                    <span>-{test.negativeMark} {lang === 'bn' ? 'ভুলে কর্তন' : 'Penalty'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-amber-400" />
                    <span>{test.participantsCount || 850}+ {lang === 'bn' ? 'অংশগ্রহণ' : 'Takers'}</span>
                  </div>
                </div>

                {/* Topics Covered */}
                <p className="text-[11px] text-slate-400 mb-4 line-clamp-2">
                  {lang === 'bn' 
                    ? 'ম্যাথ, অ্যানালিটিক্যাল পাজল, ইংরেজি অ্যানালজি এবং ব্যাংকিং পরিভাষার সমন্বয়ে প্রস্তুত।'
                    : 'Balanced distribution covering Quantitative Math, Analytical Puzzles, English Analogy, and Banking GK.'}
                </p>
              </div>

              {/* Start Exam Button */}
              <button
                onClick={() => onStartTest(test, testQuestions)}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-emerald-900/20 transition-all hover:scale-102"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>{lang === 'bn' ? 'মডেল টেস্ট শুরু করুন' : 'Start Model Exam'}</span>
              </button>

            </div>
          );
        })}
      </div>

    </div>
  );
};
