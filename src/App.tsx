import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { PastPapersView } from './components/PastPapersView';
import { LiveTestView } from './components/LiveTestView';
import { ModelTestsView } from './components/ModelTestsView';
import { SubjectPracticeView } from './components/SubjectPracticeView';
import { AIStudyCoachView } from './components/AIStudyCoachView';
import { DownloadsView } from './components/DownloadsView';
import { ExamEngine } from './components/ExamEngine';
import { PrintSheetModal } from './components/PrintSheetModal';
import { VoiceSearchModal } from './components/VoiceSearchModal';
import { pastExamPapers } from './data/pastPapers';
import { mockTestConfigs } from './data/mockTests';
import { PastExamPaper, MockTestConfig, Question, CompletedExamResult } from './types';
import { Landmark, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [lang, setLang] = useState<'bn' | 'en'>('bn'); // Default to Bangla as per user prompt
  const [isVoiceSearchOpen, setIsVoiceSearchOpen] = useState(false);
  const [printablePaper, setPrintablePaper] = useState<PastExamPaper | null>(null);

  // Active Running Exam State
  const [activeExamData, setActiveExamData] = useState<{
    title: string;
    titleBn: string;
    questions: Question[];
    durationMinutes: number;
    negativeMark: number;
    isLive: boolean;
  } | null>(null);

  // Bookmarks in LocalStorage
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('bb_prep_bookmarks');
      return saved ? JSON.parse(saved) : ['ad23-m1', 'ad23-e1', 'ad22-e1'];
    } catch {
      return ['ad23-m1', 'ad23-e1'];
    }
  });

  // Exam History in LocalStorage
  const [examHistory, setExamHistory] = useState<CompletedExamResult[]>(() => {
    try {
      const saved = localStorage.getItem('bb_prep_history');
      if (saved) return JSON.parse(saved);
    } catch {}
    // Initial sample result for rich immediate AI metrics
    return [
      {
        examId: 'init-sample-1',
        examTitle: 'BB Assistant Director Diagnostic Preli',
        examTitleBn: 'বাংলাদেশ ব্যাংক সহকারী পরিচালক ডায়াগনস্টিক টেস্ট',
        totalMarks: 20,
        score: 14.5,
        correctCount: 16,
        wrongCount: 6,
        unattemptedCount: 3,
        accuracy: 73,
        timeSpentSeconds: 940,
        date: new Date().toISOString(),
        categoryBreakdown: {
          math: { correct: 4, total: 6, accuracy: 67 },
          english: { correct: 4, total: 5, accuracy: 80 },
          analytical: { correct: 2, total: 4, accuracy: 50 },
          bangla: { correct: 3, total: 3, accuracy: 100 },
          banking_gk: { correct: 3, total: 4, accuracy: 75 }
        },
        answers: []
      }
    ];
  });

  // Doubt question to route to AI Mentor
  const [activeQuestionDoubt, setActiveQuestionDoubt] = useState<Question | null>(null);

  // Save Bookmarks
  useEffect(() => {
    try {
      localStorage.setItem('bb_prep_bookmarks', JSON.stringify(bookmarkedIds));
    } catch (_) {}
  }, [bookmarkedIds]);

  // Save History
  useEffect(() => {
    try {
      localStorage.setItem('bb_prep_history', JSON.stringify(examHistory));
    } catch (_) {}
  }, [examHistory]);

  const handleToggleBookmark = (qId: string) => {
    setBookmarkedIds(prev => 
      prev.includes(qId) ? prev.filter(id => id !== qId) : [...prev, qId]
    );
  };

  // Launch Past Paper Exam
  const handleStartPastPaperExam = (paper: PastExamPaper) => {
    setActiveExamData({
      title: paper.title,
      titleBn: paper.titleBn,
      questions: paper.questions,
      durationMinutes: paper.durationMinutes,
      negativeMark: 0.25,
      isLive: false
    });
  };

  // Launch Model/Live Test
  const handleStartCustomExam = (config: MockTestConfig, questions: Question[]) => {
    setActiveExamData({
      title: config.title,
      titleBn: config.titleBn,
      questions,
      durationMinutes: config.durationMinutes,
      negativeMark: config.negativeMark || 0.25,
      isLive: !!config.isLive
    });
  };

  const handleCompleteExam = (result: CompletedExamResult) => {
    setExamHistory(prev => [result, ...prev]);
  };

  const handleAskMentorForQuestion = (question: Question) => {
    setActiveQuestionDoubt(question);
    setActiveExamData(null);
    setCurrentTab('ai_coach');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-emerald-950">
      
      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setActiveExamData(null);
          setCurrentTab(tab);
        }}
        lang={lang}
        setLang={setLang}
        onOpenVoiceSearch={() => setIsVoiceSearchOpen(true)}
        bookmarksCount={bookmarkedIds.length}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {activeExamData ? (
          <ExamEngine
            title={activeExamData.title}
            titleBn={activeExamData.titleBn}
            questions={activeExamData.questions}
            durationMinutes={activeExamData.durationMinutes}
            negativeMark={activeExamData.negativeMark}
            isLive={activeExamData.isLive}
            lang={lang}
            onExit={() => setActiveExamData(null)}
            onCompleteExam={handleCompleteExam}
            bookmarkedIds={bookmarkedIds}
            onToggleBookmark={handleToggleBookmark}
            onAskMentorForQuestion={handleAskMentorForQuestion}
          />
        ) : (
          <>
            {currentTab === 'dashboard' && (
              <DashboardView
                lang={lang}
                onNavigateTab={setCurrentTab}
                onStartExam={handleStartPastPaperExam}
                examHistory={examHistory}
                bookmarkedCount={bookmarkedIds.length}
              />
            )}

            {currentTab === 'past_papers' && (
              <PastPapersView
                lang={lang}
                onStartExam={handleStartPastPaperExam}
                onOpenPrintSheet={(paper) => setPrintablePaper(paper)}
              />
            )}

            {currentTab === 'live_test' && (
              <LiveTestView
                lang={lang}
                onStartLiveExam={handleStartCustomExam}
                userLatestLiveScore={examHistory[0]?.score ?? null}
              />
            )}

            {currentTab === 'model_tests' && (
              <ModelTestsView
                lang={lang}
                onStartTest={handleStartCustomExam}
              />
            )}

            {currentTab === 'subject_practice' && (
              <SubjectPracticeView
                lang={lang}
                bookmarkedIds={bookmarkedIds}
                onToggleBookmark={handleToggleBookmark}
                onAskMentorForQuestion={handleAskMentorForQuestion}
              />
            )}

            {currentTab === 'ai_coach' && (
              <AIStudyCoachView
                lang={lang}
                examHistory={examHistory}
                activeQuestionDoubt={activeQuestionDoubt}
              />
            )}

            {currentTab === 'downloads' && (
              <DownloadsView
                lang={lang}
                onOpenPrintSheet={(paper) => setPrintablePaper(paper)}
              />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-emerald-950 border-t border-emerald-900/80 py-8 text-xs text-slate-400 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Landmark className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-white tracking-wide">
              {lang === 'bn' ? 'বাংলাদেশ ব্যাংক প্রস্তুতি পোর্টাল' : 'Bangladesh Bank Job Prep Portal'}
            </span>
            <span className="text-slate-500">•</span>
            <span>{lang === 'bn' ? 'বিগত প্রশ্ন, লাইভ টেস্ট ও এআই কোচ' : 'Past Papers, Live Tests & AI Coach'}</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>BIBM & IBA Syllabus Compliant</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Gemini AI Study Diagnostics</span>
            </span>
          </div>
        </div>
      </footer>

      {/* Printable Sheet Modal */}
      <PrintSheetModal
        paper={printablePaper}
        onClose={() => setPrintablePaper(null)}
        lang={lang}
      />

      {/* Voice Search Modal */}
      <VoiceSearchModal
        isOpen={isVoiceSearchOpen}
        onClose={() => setIsVoiceSearchOpen(false)}
        lang={lang}
        onSelectQuestion={(q) => {
          setCurrentTab('subject_practice');
        }}
        onSelectPastPaper={(paperId) => {
          const found = pastExamPapers.find(p => p.id === paperId);
          if (found) {
            handleStartPastPaperExam(found);
          }
        }}
        onSelectDownload={(resId) => {
          setCurrentTab('downloads');
        }}
      />

    </div>
  );
}
