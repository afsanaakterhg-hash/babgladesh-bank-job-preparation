import React, { useState } from 'react';
import { 
  Sparkles, 
  Brain, 
  Target, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  Calendar, 
  Send, 
  MessageSquare, 
  Lightbulb, 
  Activity, 
  Award,
  Zap,
  BookOpen
} from 'lucide-react';
import { CompletedExamResult, AIAnalysisReport } from '../types';

interface AIStudyCoachViewProps {
  lang: 'bn' | 'en';
  examHistory: CompletedExamResult[];
  activeQuestionDoubt?: any;
}

export const AIStudyCoachView: React.FC<AIStudyCoachViewProps> = ({
  lang,
  examHistory,
  activeQuestionDoubt
}) => {
  const [targetPost, setTargetPost] = useState('Assistant Director (AD)');
  const [analysisReport, setAnalysisReport] = useState<AIAnalysisReport | null>(null);
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false);
  
  // Interactive Mentor Chat State
  const [chatInput, setChatInput] = useState('');
  const [isSendingChat, setIsSendingChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string; time: string }>>([
    {
      sender: 'ai',
      text: lang === 'bn' 
        ? 'আসসালামু আলাইকুম! আমি আপনার বাংলাদেশ ব্যাংক প্রস্তুতি এআই মেন্টর। ম্যাথের শর্টকাট, অ্যানালিটিক্যাল পাজল কিংবা বাংলাদেশ ব্যাংকের মুদ্রানীতি সম্পর্কে যেকোনো প্রশ্ন আমাকে জিজ্ঞেস করতে পারেন।'
        : 'Welcome! I am your AI Bangladesh Bank Exam Mentor. Ask me any question regarding Math shortcuts, Analytical Puzzles, English Analogy, or Central Bank Monetary Policy.',
      time: 'Just now'
    }
  ]);

  // If user navigated here with a question doubt, prefill
  React.useEffect(() => {
    if (activeQuestionDoubt) {
      setChatInput(`ব্যাখ্যা করুন: ${activeQuestionDoubt.question}`);
    }
  }, [activeQuestionDoubt]);

  // Aggregate user metrics from history
  const totalTests = examHistory.length;
  const totalAttempted = examHistory.reduce((acc, h) => acc + (h.correctCount + h.wrongCount), 0);
  const totalCorrect = examHistory.reduce((acc, h) => acc + h.correctCount, 0);
  const overallAccuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 72;

  // Run AI analysis
  const handleRunAnalysis = async () => {
    setIsLoadingAnalysis(true);
    try {
      const payload = {
        targetPost,
        language: lang,
        results: {
          totalTests,
          totalAttempted,
          score: totalCorrect,
          accuracy: overallAccuracy,
          recentExams: examHistory.slice(-3).map(e => ({
            title: e.examTitle,
            score: e.score,
            accuracy: e.accuracy,
            categoryBreakdown: e.categoryBreakdown
          }))
        }
      };

      const response = await fetch('/api/ai/analyze-performance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        setAnalysisReport(data);
      }
    } catch (err) {
      console.error('Error generating AI analysis', err);
    } finally {
      setIsLoadingAnalysis(false);
    }
  };

  // Run on mount if no report yet
  React.useEffect(() => {
    if (!analysisReport) {
      handleRunAnalysis();
    }
  }, []);

  // Send message to AI Mentor
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim() || isSendingChat) return;

    const userMsg = chatInput.trim();
    setChatInput('');
    setChatMessages(prev => [
      ...prev,
      { sender: 'user', text: userMsg, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);

    setIsSendingChat(true);
    try {
      const response = await fetch('/api/ai/ask-mentor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userQuery: userMsg,
          language: lang,
          topic: 'Bangladesh Bank Exam Prep'
        })
      });

      if (response.ok) {
        const data = await response.json();
        setChatMessages(prev => [
          ...prev,
          { sender: 'ai', text: data.answer, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
        ]);
      } else {
        setChatMessages(prev => [
          ...prev,
          { 
            sender: 'ai', 
            text: lang === 'bn' 
              ? 'ম্যাথ ও অ্যানালিটিক্যাল রিজনিংয়ে অপশন ব্যাক-সলভিং পদ্ধতি প্রয়োগ করুন। কোনো সমীকরণে জটিলতা দেখা দিলে প্রদত্ত উত্তরগুলো এক এক করে সমীকরণে বসিয়ে যাচাই করুন।'
              : 'In Math and Analytical ability, try working backward from answer choices to save calculation steps.',
            time: 'Just now' 
          }
        ]);
      }
    } catch (err) {
      console.error('Mentor error', err);
    } finally {
      setIsSendingChat(false);
    }
  };

  const sampleMentorPrompts = [
    { textBn: 'বৃত্তাকার সিটিং অ্যারেঞ্জমেন্ট পাজল কীভাবে দ্রুত সমাধান করবো?', textEn: 'How to solve circular seating puzzles fast?' },
    { textBn: 'বাংলাদেশ ব্যাংকের রেপো এবং রিভার্স রেপো রেটের মধ্যে পার্থক্য কী?', textEn: 'Difference between Repo and Reverse Repo in Bangladesh Bank?' },
    { textBn: 'ম্যাথে বিন্যাস ও সমাবেশের পার্থক্য বোঝার সহজ টেকনিক কী?', textEn: 'Easy trick to distinguish Permutation vs Combination?' },
    { textBn: 'ইংলিশ অ্যানালজি ও ভোকাবুলারি মনে রাখার সেরা কৌশল কী?', textEn: 'Best strategy to memorize high-yield English Analogy?' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 mb-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'এআই পারফরম্যান্স ট্র্যাকার ও মেন্টর' : 'AI Performance Tracker & Study Suggestions'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
              {lang === 'bn' ? 'ব্যক্তিগত প্রস্তুতি বিশ্লেষণ ও স্টাডি গাইড' : 'Personalized AI Diagnostics & Study Roadmap'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-serif">
              {lang === 'bn'
                ? 'আপনার প্রতিটি টেস্ট ও প্র্যাকটিসের নির্ভুলতা ট্র্যাক করে বাংলাদেশ ব্যাংক এডি স্ট্যান্ডার্ড অনুযায়ী দুর্বল অংশগুলো চিহ্নিত করা হয় এবং ৭ দিনের রিভিশন রোডম্যাপ তৈরি হয়।'
                : 'Tracks your accuracy, time expenditure, and weak subtopics under BIBM & Bangladesh Bank AD thresholds, delivering a bespoke revision plan.'}
            </p>
          </div>

          {/* Target Post selector and Re-analyze button */}
          <div className="flex flex-col gap-2 w-full md:w-auto">
            <select
              value={targetPost}
              onChange={(e) => setTargetPost(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="Assistant Director (AD)">Target: Assistant Director (AD)</option>
              <option value="Officer (General)">Target: Officer (General)</option>
              <option value="Officer (Cash)">Target: Officer (Cash)</option>
              <option value="Combined 8/9 Bank">Target: Combined 8/9 Bank</option>
            </select>

            <button
              onClick={handleRunAnalysis}
              disabled={isLoadingAnalysis}
              className="flex items-center justify-center gap-2 py-2 px-4 bg-amber-500 hover:bg-amber-400 text-emerald-950 font-extrabold text-xs rounded-xl shadow-lg shadow-amber-500/20 transition-all hover:scale-105 disabled:opacity-50"
            >
              <Sparkles className={`w-3.5 h-3.5 ${isLoadingAnalysis ? 'animate-spin' : ''}`} />
              <span>{isLoadingAnalysis ? (lang === 'bn' ? 'বিশ্লেষণ হচ্ছে...' : 'Analyzing Metrics...') : (lang === 'bn' ? 'রিফ্রেশ অ্যানালাইসিস' : 'Re-Analyze My Profile')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid: 1. Readiness & Analytics | 2. AI Mentor Chat */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (7 cols): Performance Metrics & Roadmap */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Readiness Index & Scorecard */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {lang === 'bn' ? 'বাংলাদেশ ব্যাংক প্রস্তুতি সূচক (Readiness Index)' : 'BB Recruitment Readiness Index'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {targetPost} • {totalTests} {lang === 'bn' ? 'টি টেস্ট সম্পন্ন' : 'Tests Recorded'}
                  </p>
                </div>
              </div>

              {/* Score Circular Metric */}
              <div className="text-right">
                <div className="text-3xl font-black text-amber-400 font-mono">
                  {analysisReport?.readinessScore ?? 78}%
                </div>
                <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">
                  {analysisReport?.readinessLevel ?? 'Intermediate Ready'}
                </span>
              </div>
            </div>

            {/* AI Summary Quote */}
            <div className="bg-slate-950 p-4 rounded-xl border border-emerald-900/50 mb-6">
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-serif">
                {lang === 'bn' 
                  ? (analysisReport?.summaryBn || `আপনার বর্তমান নির্ভুলতা ${overallAccuracy}%। বাংলাদেশ ব্যাংক সহকারী পরিচালক প্রিলিমিনারি পরীক্ষায় কাট-মার্ক নিরাপদ করতে অ্যানালিটিক্যাল ও ম্যাথে আরও নিয়মিত ড্রিল প্রয়োজন।`) 
                  : (analysisReport?.summaryEn || `Your current accuracy is ${overallAccuracy}%. Focused drill on Analytical logic puzzles and high-frequency Math shortcuts is strongly recommended to clear the BB AD cut-off.`)}
              </p>
            </div>

            {/* Strengths & Weaknesses Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Strengths */}
              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/50">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{lang === 'bn' ? 'শক্তিশালী দিকসমূহ' : 'Key Strengths'}</span>
                </h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  {(analysisReport?.strengths || [
                    'বাংলাদেশ ব্যাংক অর্ডার ও ব্যাংকিং সাধারণ জ্ঞান',
                    'বাংলা ব্যাকরণ ও সাহিত্য বিষয়ক প্রশ্নাবলি'
                  ]).map((s, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-400">•</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Weaknesses */}
              <div className="p-4 rounded-xl bg-red-950/20 border border-red-800/40">
                <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" />
                  <span>{lang === 'bn' ? 'যেসব অংশে জোর দিতে হবে' : 'Priority Improvement Areas'}</span>
                </h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  {(analysisReport?.weaknesses || [
                    'অ্যানালিটিক্যাল পাজল ও জটিল সিটিং বিন্যাস (সময় বেশি ব্যয়)',
                    'গণিত: বিন্যাস-সমাবেশ ও মিশ্রণ (Permutations & Alligations)'
                  ]).map((w, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-red-400">•</span>
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Pro Tip Callout */}
            {analysisReport?.smartTip && (
              <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>{analysisReport.smartTip}</span>
              </div>
            )}
          </div>

          {/* 7-Day Personalized Study Roadmap */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-400" />
                <span>{lang === 'bn' ? '৭ দিনের কাস্টমাইজড স্টাডি রোডম্যাপ' : '7-Day Personalized Study Plan'}</span>
              </h3>
              <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                AI Generated
              </span>
            </div>

            <div className="space-y-3">
              {(analysisReport?.personalizedPlan || [
                { day: 'Day 1-2', focus: lang === 'bn' ? 'বিগত ৫ বছরের বাংলাদেশ ব্যাংক এডি ম্যাথ সল্যুশন (Time & Work, Pipes)' : 'Past 5 Years BB AD Math Solutions (Time, Work & Pipes)' },
                { day: 'Day 3-4', focus: lang === 'bn' ? 'Analytical Ability BIBM স্ট্যান্ডার্ড পাজল ও ক্রিটিকাল রিজনিং ২০টি' : 'Analytical Ability BIBM-standard Puzzles & Critical Reasoning (20 sets)' },
                { day: 'Day 5', focus: lang === 'bn' ? 'GRE High-Yield 200 Word Analogy & Sentence Completion' : 'GRE High-Yield 200 Word Analogy & Sentence Completion Drill' },
                { day: 'Day 6', focus: lang === 'bn' ? 'বাংলাদেশ ব্যাংকের মুদ্রানীতি (Monetary Policy), বৈদেশিক মুদ্রা রিজার্ভ, CRR/SLR রিভিশন' : 'Revision of BB Monetary Policy, Forex Reserve & Banking Acronyms' },
                { day: 'Day 7', focus: lang === 'bn' ? 'পূর্ণাঙ্গ ১০০ নম্বরের লাইভ টাইমড মডেল টেস্ট ও অ্যানালাইসিস' : 'Full 100-mark Timed Model Exam under negative marking simulation' }
              ]).map((plan, pIdx) => (
                <div 
                  key={pIdx}
                  className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center gap-3 hover:border-emerald-700/60 transition-colors"
                >
                  <span className="w-16 text-center text-xs font-bold text-amber-400 bg-amber-400/10 py-1 rounded-md border border-amber-400/20">
                    {plan.day}
                  </span>
                  <p className="text-xs text-slate-200 font-medium">
                    {plan.focus}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (5 cols): 24/7 AI Bank Mentor Chat */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between h-[680px]">
          
          <div>
            {/* Mentor Top Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-amber-500 p-0.5 flex items-center justify-center">
                  <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                    <Brain className="w-4 h-4 text-amber-300" />
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>AI Bank Mentor</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  </h4>
                  <p className="text-[10px] text-slate-400">
                    {lang === 'bn' ? '২৪/৭ ডাউট ক্লিয়ারিং ও সমাধান সহকারী' : '24/7 Doubt Clearance & Math Solver'}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Topic Chips */}
            <div className="mb-3">
              <p className="text-[10px] text-slate-400 mb-1 font-medium">
                {lang === 'bn' ? 'সরাসরি প্রশ্ন করুন (ক্লিক করুন):' : 'Click to Ask Quick Question:'}
              </p>
              <div className="flex flex-wrap gap-1">
                {sampleMentorPrompts.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => setChatInput(lang === 'bn' ? s.textBn : s.textEn)}
                    className="text-[10px] text-left px-2 py-1 bg-slate-800 hover:bg-emerald-950/80 hover:text-amber-300 border border-slate-700/80 text-slate-300 rounded-lg transition-colors truncate max-w-full"
                  >
                    {lang === 'bn' ? s.textBn : s.textEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Messages List */}
            <div className="space-y-3 overflow-y-auto max-h-[400px] pr-1 no-scrollbar mb-3">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`p-3 rounded-2xl max-w-[90%] text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-emerald-600 text-white rounded-br-none shadow-md'
                        : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-bl-none shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-slate-500 mt-1 px-1">
                    {msg.time}
                  </span>
                </div>
              ))}

              {isSendingChat && (
                <div className="flex items-center gap-2 text-xs text-amber-300 p-2.5 bg-slate-950 rounded-xl border border-slate-800 animate-pulse">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{lang === 'bn' ? 'এআই মেন্টর ভাবছেন ও উত্তর লিখছেন...' : 'AI Mentor is thinking and typing...'}</span>
                </div>
              )}
            </div>
          </div>

          {/* Chat Input Field */}
          <form onSubmit={handleSendMessage} className="pt-3 border-t border-slate-800">
            <div className="relative flex items-center">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder={lang === 'bn' ? 'যেকোনো গণিত, পাজল বা ব্যাংকিং প্রশ্ন লিখুন...' : 'Type any Math, Puzzle or Banking query...'}
                className="w-full pl-3 pr-10 py-2.5 bg-slate-950 border border-slate-700 focus:border-emerald-500 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <button
                type="submit"
                disabled={!chatInput.trim() || isSendingChat}
                className="absolute right-2 p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

        </div>

      </div>

    </div>
  );
};
