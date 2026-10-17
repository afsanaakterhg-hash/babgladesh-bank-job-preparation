import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Bookmark, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  Award, 
  RotateCcw,
  BarChart2,
  FileDown,
  MessageSquareQuote
} from 'lucide-react';
import { Question, CompletedExamResult, SubjectCategory } from '../types';

interface ExamEngineProps {
  title: string;
  titleBn: string;
  questions: Question[];
  durationMinutes: number;
  negativeMark?: number; // default 0.25
  isLive?: boolean;
  lang: 'bn' | 'en';
  onExit: () => void;
  onCompleteExam: (result: CompletedExamResult) => void;
  bookmarkedIds: string[];
  onToggleBookmark: (questionId: string) => void;
  onAskMentorForQuestion?: (question: Question) => void;
}

export const ExamEngine: React.FC<ExamEngineProps> = ({
  title,
  titleBn,
  questions,
  durationMinutes,
  negativeMark = 0.25,
  isLive = false,
  lang,
  onExit,
  onCompleteExam,
  bookmarkedIds,
  onToggleBookmark,
  onAskMentorForQuestion
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<number, boolean>>({});
  const [timeLeft, setTimeLeft] = useState(durationMinutes * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (isSubmitted) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isSubmitted]);

  // Format time MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQ = questions[currentIndex];

  const handleSelectOption = (optIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentIndex]: optIndex
    }));
  };

  const handleClearSelection = () => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => {
      const copy = { ...prev };
      delete copy[currentIndex];
      return copy;
    });
  };

  const handleToggleReview = () => {
    setMarkedForReview(prev => ({
      ...prev,
      [currentIndex]: !prev[currentIndex]
    }));
  };

  // Evaluation calculation
  const calculateResults = (): CompletedExamResult => {
    let correct = 0;
    let wrong = 0;
    const catStats: Record<SubjectCategory, { correct: number; total: number; accuracy: number }> = {
      math: { correct: 0, total: 0, accuracy: 0 },
      english: { correct: 0, total: 0, accuracy: 0 },
      analytical: { correct: 0, total: 0, accuracy: 0 },
      bangla: { correct: 0, total: 0, accuracy: 0 },
      banking_gk: { correct: 0, total: 0, accuracy: 0 }
    };

    questions.forEach((q, idx) => {
      const cat = q.category;
      if (catStats[cat]) {
        catStats[cat].total += 1;
      }

      if (selectedAnswers[idx] !== undefined) {
        if (selectedAnswers[idx] === q.correctIndex) {
          correct += 1;
          if (catStats[cat]) catStats[cat].correct += 1;
        } else {
          wrong += 1;
        }
      }
    });

    // Compute accuracy per category
    (Object.keys(catStats) as SubjectCategory[]).forEach(k => {
      if (catStats[k].total > 0) {
        catStats[k].accuracy = Math.round((catStats[k].correct / catStats[k].total) * 100);
      }
    });

    const netScore = Math.max(0, parseFloat((correct - (wrong * negativeMark)).toFixed(2)));
    const totalAttempted = correct + wrong;
    const accuracy = totalAttempted > 0 ? Math.round((correct / totalAttempted) * 100) : 0;
    const timeSpent = durationMinutes * 60 - timeLeft;

    const answerRecords = questions.map((q, idx) => ({
      questionId: q.id,
      selectedOptionIndex: selectedAnswers[idx] !== undefined ? selectedAnswers[idx] : null,
      isCorrect: selectedAnswers[idx] === q.correctIndex,
      timeSpentSeconds: Math.round(timeSpent / questions.length)
    }));

    return {
      examId: `exam-${Date.now()}`,
      examTitle: title,
      examTitleBn: titleBn,
      totalMarks: questions.length,
      score: netScore,
      correctCount: correct,
      wrongCount: wrong,
      unattemptedCount: questions.length - totalAttempted,
      accuracy,
      timeSpentSeconds: timeSpent,
      date: new Date().toISOString(),
      categoryBreakdown: catStats,
      answers: answerRecords
    };
  };

  const handleSubmitExam = () => {
    setIsSubmitted(true);
    const result = calculateResults();
    onCompleteExam(result);
  };

  const categories: { id: string; labelEn: string; labelBn: string }[] = [
    { id: 'all', labelEn: 'All Questions', labelBn: 'সকল প্রশ্ন' },
    { id: 'math', labelEn: 'Math', labelBn: 'গণিত' },
    { id: 'english', labelEn: 'English', labelBn: 'ইংরেজি' },
    { id: 'analytical', labelEn: 'Analytical', labelBn: 'অ্যানালিটিক্যাল' },
    { id: 'bangla', labelEn: 'Bangla', labelBn: 'বাংলা' },
    { id: 'banking_gk', labelEn: 'Banking GK', labelBn: 'ব্যাংকিং ও জিকে' }
  ];

  const filteredQuestionIndices = questions
    .map((q, idx) => ({ q, idx }))
    .filter(item => selectedCategoryFilter === 'all' || item.q.category === selectedCategoryFilter)
    .map(item => item.idx);

  const totalAnsweredCount = Object.keys(selectedAnswers).length;
  const resultData = isSubmitted ? calculateResults() : null;

  return (
    <div className="bg-slate-950 text-slate-100 min-h-[calc(100vh-4rem)] flex flex-col">
      {/* Exam Header */}
      <div className="bg-emerald-950 border-b border-emerald-800/80 px-4 py-3 sticky top-16 z-30 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (!isSubmitted) setShowExitConfirm(true);
                else onExit();
              }}
              className="p-1.5 rounded-lg bg-emerald-900 hover:bg-emerald-800 text-slate-300 hover:text-white transition-colors"
              title="Exit Exam"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold text-white">
                  {lang === 'bn' ? titleBn : title}
                </h2>
                {isLive && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-600 text-white font-extrabold uppercase animate-pulse">
                    LIVE EXAM
                  </span>
                )}
              </div>
              <p className="text-xs text-emerald-300/80">
                {lang === 'bn' ? 'মোট প্রশ্ন:' : 'Total Questions:'} {questions.length} • {lang === 'bn' ? 'নেগেটিভ মার্কিং:' : 'Negative Mark:'} -{negativeMark}
              </p>
            </div>
          </div>

          {/* Timer & Submit / Status */}
          <div className="flex items-center gap-3">
            {!isSubmitted ? (
              <>
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-mono text-sm sm:text-base font-bold border ${
                  timeLeft < 180 
                    ? 'bg-red-950/80 border-red-500/60 text-red-400 animate-pulse' 
                    : 'bg-emerald-900/60 border-emerald-700/60 text-amber-300'
                }`}>
                  <Clock className="w-4 h-4" />
                  <span>{formatTime(timeLeft)}</span>
                </div>

                <button
                  onClick={handleSubmitExam}
                  className="px-4 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-450 hover:to-amber-550 text-emerald-950 font-extrabold text-xs sm:text-sm rounded-xl shadow-lg shadow-amber-500/20 transition-all hover:scale-105"
                >
                  {lang === 'bn' ? 'সাবমিট করুন' : 'Submit Exam'}
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs font-bold">
                  {lang === 'bn' ? 'পরীক্ষা সমাপ্ত' : 'Exam Completed'}
                </span>
                <button
                  onClick={onExit}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl"
                >
                  {lang === 'bn' ? 'ফলাফল ছাড়ুন' : 'Back to Dashboard'}
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto w-full p-4 sm:p-6 flex-1 flex flex-col lg:flex-row gap-6">
        
        {/* Left Column: Question Area / Review Area */}
        <div className="flex-1 flex flex-col">
          
          {/* Post-exam Result Summary Banner */}
          {isSubmitted && resultData && (
            <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 border border-amber-500/30 rounded-2xl p-5 mb-6 shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-4">
                
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                    <Award className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      {lang === 'bn' ? 'পরীক্ষার ফলাফল বিবরণী' : 'Scorecard & Performance Summary'}
                    </h3>
                    <p className="text-xs text-slate-300">
                      {lang === 'bn' 
                        ? `মোট প্রাপ্ত নম্বর: ${resultData.score} / ${resultData.totalMarks}` 
                        : `Net Score: ${resultData.score} / ${resultData.totalMarks} (Acc: ${resultData.accuracy}%)`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-center px-3 py-1.5 rounded-xl bg-emerald-900/40 border border-emerald-700/50">
                    <p className="text-[10px] text-emerald-300 uppercase font-bold">{lang === 'bn' ? 'সঠিক' : 'Correct'}</p>
                    <p className="text-base font-extrabold text-emerald-400">{resultData.correctCount}</p>
                  </div>
                  <div className="text-center px-3 py-1.5 rounded-xl bg-red-950/40 border border-red-700/50">
                    <p className="text-[10px] text-red-300 uppercase font-bold">{lang === 'bn' ? 'ভুল (-০.২৫)' : 'Wrong'}</p>
                    <p className="text-base font-extrabold text-red-400">{resultData.wrongCount}</p>
                  </div>
                  <div className="text-center px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700">
                    <p className="text-[10px] text-slate-400 uppercase font-bold">{lang === 'bn' ? 'অনাবৃত' : 'Skipped'}</p>
                    <p className="text-base font-extrabold text-slate-300">{resultData.unattemptedCount}</p>
                  </div>
                  <div className="text-center px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30">
                    <p className="text-[10px] text-amber-300 uppercase font-bold">{lang === 'bn' ? 'নেট মার্ক' : 'Net Mark'}</p>
                    <p className="text-base font-extrabold text-amber-400">{resultData.score}</p>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Section Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 no-scrollbar">
            {categories.map(c => (
              <button
                key={c.id}
                onClick={() => setSelectedCategoryFilter(c.id)}
                className={`text-xs px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition-all ${
                  selectedCategoryFilter === c.id
                    ? 'bg-emerald-600 text-white font-bold shadow-md'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {lang === 'bn' ? c.labelBn : c.labelEn}
              </button>
            ))}
          </div>

          {/* Question Card */}
          {currentQ && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex-1 flex flex-col justify-between">
              
              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-950 border border-emerald-800 text-emerald-400 font-extrabold">
                      {lang === 'bn' ? `প্রশ্ন নং ${currentIndex + 1}` : `Question ${currentIndex + 1}`} / {questions.length}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20 font-bold uppercase text-[10px]">
                      {currentQ.category}
                    </span>
                    <span className="text-slate-400 font-medium">
                      {currentQ.subtopic}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onToggleBookmark(currentQ.id)}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        bookmarkedIds.includes(currentQ.id)
                          ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                          : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                      }`}
                      title="Bookmark Question"
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                    {!isSubmitted && (
                      <button
                        onClick={handleToggleReview}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-colors ${
                          markedForReview[currentIndex]
                            ? 'bg-amber-950 border-amber-500 text-amber-300'
                            : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                        }`}
                      >
                        {markedForReview[currentIndex] 
                          ? (lang === 'bn' ? '✓ রিভিউ চিহ্নিত' : '✓ Marked') 
                          : (lang === 'bn' ? 'রিভিউ মার্ক' : 'Mark for Review')}
                      </button>
                    )}
                  </div>
                </div>

                {/* Question Prompt */}
                <div className="mb-6">
                  <h3 className="text-base sm:text-lg font-semibold text-white leading-relaxed font-serif">
                    {lang === 'bn' ? currentQ.questionBn : currentQ.question}
                  </h3>
                  {/* Secondary Language Subtitle for clarity */}
                  <p className="text-xs text-slate-400 mt-2 font-mono italic">
                    {lang === 'bn' ? currentQ.question : currentQ.questionBn}
                  </p>
                </div>

                {/* Multiple Choice Options */}
                <div className="space-y-3 mb-6">
                  {currentQ.options.map((opt, optIdx) => {
                    const isSelected = selectedAnswers[currentIndex] === optIdx;
                    const isCorrect = currentQ.correctIndex === optIdx;
                    
                    let optionStyle = 'bg-slate-800/70 hover:bg-slate-800 border-slate-700/80 text-slate-200';
                    let badgeLetter = ['A', 'B', 'C', 'D'][optIdx];
                    let badgeStyle = 'bg-slate-700 text-slate-300';

                    if (!isSubmitted) {
                      if (isSelected) {
                        optionStyle = 'bg-emerald-950 border-emerald-500 text-white ring-2 ring-emerald-500/30';
                        badgeStyle = 'bg-emerald-500 text-emerald-950 font-bold';
                      }
                    } else {
                      // In Review mode after submit
                      if (isCorrect) {
                        optionStyle = 'bg-emerald-950/90 border-emerald-400 text-emerald-100 ring-2 ring-emerald-500/40';
                        badgeStyle = 'bg-emerald-500 text-emerald-950 font-bold';
                      } else if (isSelected && !isCorrect) {
                        optionStyle = 'bg-red-950/90 border-red-500 text-red-100 ring-2 ring-red-500/40';
                        badgeStyle = 'bg-red-500 text-white font-bold';
                      }
                    }

                    const optDisplay = (lang === 'bn' && currentQ.optionsBn?.[optIdx]) 
                      ? currentQ.optionsBn[optIdx] 
                      : opt;

                    return (
                      <div
                        key={optIdx}
                        onClick={() => handleSelectOption(optIdx)}
                        className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${optionStyle}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${badgeStyle}`}>
                            {badgeLetter}
                          </span>
                          <span className="text-sm font-medium">
                            {optDisplay}
                          </span>
                        </div>

                        {isSubmitted && (
                          <div>
                            {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                            {isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-400" />}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation in Review Mode */}
                {isSubmitted && (
                  <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-emerald-800/60 text-xs sm:text-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wide text-xs">
                        <Sparkles className="w-4 h-4" />
                        {lang === 'bn' ? 'সঠিক ব্যাখ্যা ও গাণিতিক সমাধান' : 'Official Explanation & Derivation'}
                      </span>
                      {onAskMentorForQuestion && (
                        <button
                          onClick={() => onAskMentorForQuestion(currentQ)}
                          className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 border border-emerald-700/50"
                        >
                          <MessageSquareQuote className="w-3.5 h-3.5 text-amber-400" />
                          {lang === 'bn' ? 'AI মেন্টরকে বিস্তারিত জিজ্ঞেস করুন' : 'Ask AI Mentor to Explain'}
                        </button>
                      )}
                    </div>
                    <p className="text-slate-200 leading-relaxed font-sans mb-1.5">
                      {lang === 'bn' ? currentQ.explanationBn : currentQ.explanation}
                    </p>
                    <p className="text-slate-400 font-mono text-xs border-t border-slate-800/80 pt-1.5 mt-1.5">
                      {lang === 'bn' ? currentQ.explanation : currentQ.explanationBn}
                    </p>
                  </div>
                )}

              </div>

              {/* Navigation Footer */}
              <div className="flex items-center justify-between pt-4 mt-6 border-t border-slate-800">
                <button
                  onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                  disabled={currentIndex === 0}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-xs sm:text-sm font-semibold transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {lang === 'bn' ? 'পূর্ববর্তী' : 'Previous'}
                </button>

                {!isSubmitted && selectedAnswers[currentIndex] !== undefined && (
                  <button
                    onClick={handleClearSelection}
                    className="text-xs text-slate-400 hover:text-red-400 font-medium"
                  >
                    {lang === 'bn' ? 'উত্তর মুছুন' : 'Clear Selection'}
                  </button>
                )}

                <button
                  onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
                  disabled={currentIndex === questions.length - 1}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:hover:bg-emerald-600 text-white text-xs sm:text-sm font-semibold transition-colors"
                >
                  {lang === 'bn' ? 'পরবর্তী' : 'Next'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Right Column: Question Palette & Overview */}
        <div className="w-full lg:w-72 bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center justify-between">
              <span>{lang === 'bn' ? 'প্রশ্ন প্যালেট' : 'Question Palette'}</span>
              <span className="text-amber-400">{totalAnsweredCount} / {questions.length}</span>
            </h4>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400 mb-4 p-2 bg-slate-950 rounded-xl border border-slate-800/80">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span>{lang === 'bn' ? 'উত্তর প্রদানকৃত' : 'Answered'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-700"></span>
                <span>{lang === 'bn' ? 'অনাবৃত' : 'Unanswered'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span>{lang === 'bn' ? 'রিভিউ মার্ক' : 'Marked'}</span>
              </div>
              {isSubmitted && (
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                  <span>{lang === 'bn' ? 'ভুল উত্তর' : 'Wrong'}</span>
                </div>
              )}
            </div>

            {/* Matrix of Question Buttons */}
            <div className="grid grid-cols-5 gap-2 max-h-60 overflow-y-auto pr-1 no-scrollbar">
              {questions.map((q, idx) => {
                const isCurrent = currentIndex === idx;
                const isAnswered = selectedAnswers[idx] !== undefined;
                const isMarked = markedForReview[idx];
                const isCorrect = isAnswered && selectedAnswers[idx] === q.correctIndex;
                const isWrong = isAnswered && selectedAnswers[idx] !== q.correctIndex;

                let btnBg = 'bg-slate-800 text-slate-400 border-slate-700';

                if (!isSubmitted) {
                  if (isMarked) {
                    btnBg = 'bg-amber-500/20 text-amber-300 border-amber-500 font-bold';
                  } else if (isAnswered) {
                    btnBg = 'bg-emerald-600 text-white font-bold border-emerald-500';
                  }
                } else {
                  if (isCorrect) {
                    btnBg = 'bg-emerald-600 text-white font-bold border-emerald-400';
                  } else if (isWrong) {
                    btnBg = 'bg-red-600 text-white font-bold border-red-400';
                  } else {
                    btnBg = 'bg-slate-800 text-slate-500 border-slate-700';
                  }
                }

                if (isCurrent) {
                  btnBg += ' ring-2 ring-amber-400';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-9 rounded-xl border flex items-center justify-center text-xs font-semibold transition-all hover:scale-105 ${btnBg}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Info Box */}
          <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-400">
            <p className="flex justify-between py-1">
              <span>{lang === 'bn' ? 'পরীক্ষার ধরণ:' : 'Exam Standard:'}</span>
              <span className="text-slate-200 font-medium">BIBM MCQ Standard</span>
            </p>
            <p className="flex justify-between py-1">
              <span>{lang === 'bn' ? 'প্রতি ভুলে কর্তন:' : 'Per Wrong Penalty:'}</span>
              <span className="text-red-400 font-medium">-0.25 Mark</span>
            </p>
          </div>

        </div>

      </div>

      {/* Confirmation Exit Modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl">
            <AlertTriangle className="w-12 h-12 text-amber-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-2">
              {lang === 'bn' ? 'আপনি কি পরীক্ষা ছাড়তে চান?' : 'Leave Exam Confirmation'}
            </h3>
            <p className="text-xs text-slate-300 mb-6">
              {lang === 'bn' 
                ? 'এখনই পরীক্ষা ছাড়লে আপনার চলমান প্রগ্রেস সংরক্ষিত হবে না।' 
                : 'If you leave now, your current timed attempt will not be recorded.'}
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                {lang === 'bn' ? 'পরীক্ষা চালিয়ে যান' : 'Continue Exam'}
              </button>
              <button
                onClick={() => {
                  setShowExitConfirm(false);
                  onExit();
                }}
                className="flex-1 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold"
              >
                {lang === 'bn' ? 'বের হয়ে যান' : 'Exit Anyway'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
