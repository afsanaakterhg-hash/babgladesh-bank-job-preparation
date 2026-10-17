import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  X, 
  Search, 
  BookOpen, 
  ArrowRight, 
  Sparkles, 
  CheckCircle, 
  AlertCircle,
  FileText
} from 'lucide-react';
import { allQuestions, pastExamPapers } from '../data/pastPapers';
import { downloadableResources } from '../data/downloadResources';
import { Question } from '../types';

interface VoiceSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'bn' | 'en';
  onSelectQuestion: (question: Question) => void;
  onSelectPastPaper: (paperId: string) => void;
  onSelectDownload: (resourceId: string) => void;
}

export const VoiceSearchModal: React.FC<VoiceSearchModalProps> = ({
  isOpen,
  onClose,
  lang,
  onSelectQuestion,
  onSelectPastPaper,
  onSelectDownload
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [speechLanguage, setSpeechLanguage] = useState<'bn-BD' | 'en-US'>(lang === 'bn' ? 'bn-BD' : 'en-US');
  const [speechSupported, setSpeechSupported] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const recognitionRef = useRef<any>(null);

  // Initialize SpeechRecognition if available
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechSupported(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = speechLanguage;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const current = event.resultIndex;
        const text = event.results[current][0].transcript;
        setTranscript(text);
        setSearchQuery(text);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } catch (e) {
      console.error('Error initializing speech recognition', e);
      setSpeechSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (_) {}
      }
    };
  }, [speechLanguage]);

  // Sync speech language when global lang changes
  useEffect(() => {
    setSpeechLanguage(lang === 'bn' ? 'bn-BD' : 'en-US');
  }, [lang]);

  const toggleListening = () => {
    if (!speechSupported) return;

    if (isListening) {
      try {
        recognitionRef.current?.stop();
      } catch (_) {}
      setIsListening(false);
    } else {
      setTranscript('');
      try {
        if (recognitionRef.current) {
          recognitionRef.current.lang = speechLanguage;
          recognitionRef.current.start();
        }
      } catch (err) {
        console.error('Failed to start speech recognition', err);
      }
    }
  };

  const sampleVoicePrompts = [
    { text: 'Assistant Director 2023', textBn: 'সহকারী পরিচালক ২০২৩' },
    { text: 'Time and Work Math', textBn: 'টাইম অ্যান্ড ওয়ার্ক ম্যাথ' },
    { text: 'Analytical Seating Puzzle', textBn: 'অ্যানালিটিক্যাল সিটিং পাজল' },
    { text: 'Cash Reserve Ratio CRR', textBn: 'সিআরআর ও এসএলআর নীতি' },
    { text: 'English Analogy', textBn: 'ইংরেজি অ্যানালজি প্রশ্ন' },
    { text: 'Math Formula Sheet', textBn: 'গণিত সূত্র শিট ডাউনলোড' }
  ];

  // Search logic across questions, papers, and resources
  const effectiveQuery = searchQuery.trim().toLowerCase();
  
  const matchedQuestions = effectiveQuery.length > 1
    ? allQuestions.filter(q => 
        q.question.toLowerCase().includes(effectiveQuery) ||
        q.questionBn.toLowerCase().includes(effectiveQuery) ||
        q.subtopic.toLowerCase().includes(effectiveQuery) ||
        q.category.toLowerCase().includes(effectiveQuery) ||
        q.examSource.toLowerCase().includes(effectiveQuery)
      ).slice(0, 5)
    : [];

  const matchedPapers = effectiveQuery.length > 1
    ? pastExamPapers.filter(p =>
        p.title.toLowerCase().includes(effectiveQuery) ||
        p.titleBn.toLowerCase().includes(effectiveQuery) ||
        p.post.toLowerCase().includes(effectiveQuery) ||
        p.year.toString().includes(effectiveQuery) ||
        p.tags.some(t => t.toLowerCase().includes(effectiveQuery))
      ).slice(0, 3)
    : [];

  const matchedDownloads = effectiveQuery.length > 1
    ? downloadableResources.filter(d =>
        d.title.toLowerCase().includes(effectiveQuery) ||
        d.titleBn.toLowerCase().includes(effectiveQuery) ||
        d.summary.toLowerCase().includes(effectiveQuery) ||
        d.category.toLowerCase().includes(effectiveQuery)
      ).slice(0, 2)
    : [];

  const totalMatches = matchedQuestions.length + matchedPapers.length + matchedDownloads.length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl max-w-2xl w-full p-6 text-white shadow-2xl relative max-h-[90vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-lg">
            <Mic className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span>{lang === 'bn' ? 'ভয়েস সার্চ ও প্রশ্ন অনুসন্ধান' : 'Voice Search & Smart Question Finder'}</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                AI Powered
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              {lang === 'bn' 
                ? 'মাইক্রোফোনে ক্লিক করে মুখে বলুন যেকোনো বিষয়, প্রশ্নপত্র বা টপিক' 
                : 'Click mic and speak to find past papers, math shortcuts, or analytical questions'}
            </p>
          </div>
        </div>

        {/* Language of Speech selector */}
        <div className="flex items-center justify-between text-xs mb-3 bg-slate-800/80 px-3 py-2 rounded-lg border border-slate-700">
          <span className="text-slate-300 font-medium">
            {lang === 'bn' ? 'কন্ঠস্বর ভাষা নির্বাচন:' : 'Voice Recognition Language:'}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setSpeechLanguage('bn-BD')}
              className={`px-2.5 py-1 rounded font-semibold transition-all ${
                speechLanguage === 'bn-BD' 
                  ? 'bg-emerald-600 text-white shadow-sm' 
                  : 'bg-slate-700 text-slate-300 hover:text-white'
              }`}
            >
              বাংলা (Bengali)
            </button>
            <button
              onClick={() => setSpeechLanguage('en-US')}
              className={`px-2.5 py-1 rounded font-semibold transition-all ${
                speechLanguage === 'en-US' 
                  ? 'bg-emerald-600 text-white shadow-sm' 
                  : 'bg-slate-700 text-slate-300 hover:text-white'
              }`}
            >
              English
            </button>
          </div>
        </div>

        {/* Speech Visualizer & Action Area */}
        <div className="bg-slate-950/80 rounded-xl p-5 border border-slate-800 flex flex-col items-center justify-center text-center my-2">
          
          {/* Mic Button with pulsating wave */}
          <div className="relative mb-3">
            {isListening && (
              <>
                <div className="absolute inset-0 rounded-full bg-emerald-500/30 animate-ping"></div>
                <div className="absolute -inset-2 rounded-full bg-emerald-500/20 animate-pulse"></div>
              </>
            )}
            <button
              onClick={toggleListening}
              className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-xl ${
                isListening
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white scale-110 shadow-red-500/30 ring-4 ring-red-500/40'
                  : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:scale-105 shadow-emerald-500/20 hover:ring-4 hover:ring-emerald-500/30'
              }`}
            >
              {isListening ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
            </button>
          </div>

          <p className="text-sm font-medium mb-1">
            {isListening ? (
              <span className="text-emerald-400 font-bold flex items-center gap-1.5 animate-pulse">
                <span>●</span>
                {lang === 'bn' ? 'শুনছি... এখন কথা বলুন...' : 'Listening... Speak now...'}
              </span>
            ) : (
              <span className="text-slate-300">
                {lang === 'bn' ? 'মাইক্রোফোনে ট্যাপ করে কথা বলা শুরু করুন' : 'Tap microphone to speak'}
              </span>
            )}
          </p>

          {!speechSupported && (
            <p className="text-xs text-amber-400 flex items-center gap-1 mt-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {lang === 'bn' 
                ? 'ব্রাউজারে স্পিচ রিকগনিশন সাপোর্ট নেই, আপনি নিচে টাইপ করতে পারেন।' 
                : 'Speech recognition not supported in this browser. You can type below.'}
            </p>
          )}

          {/* Transcript / Input text box */}
          <div className="w-full mt-3 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'bn' ? 'অথবা এখানে লিখে খুঁজুন (উদাঃ Math, 2023, সমাস, CRR)...' : 'Or type search keywords (e.g., AD 2023, Math, Analogy, CRR)...'}
              className="w-full pl-9 pr-8 py-2.5 bg-slate-900 border border-slate-700 focus:border-emerald-500 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
            {searchQuery && (
              <button 
                onClick={() => { setSearchQuery(''); setTranscript(''); }}
                className="absolute right-3 top-3 text-slate-400 hover:text-white text-xs"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="my-2">
          <p className="text-xs text-slate-400 mb-1.5 flex items-center gap-1 font-medium">
            <Sparkles className="w-3 h-3 text-amber-400" />
            {lang === 'bn' ? 'জনপ্রিয় সার্চসমূহ (ক্লিক করুন):' : 'Popular Search Prompts (Click to test):'}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {sampleVoicePrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => setSearchQuery(lang === 'bn' ? p.textBn : p.text)}
                className="text-xs px-2.5 py-1 rounded-full bg-slate-800 hover:bg-emerald-900/60 hover:text-amber-300 border border-slate-700/80 text-slate-300 transition-colors"
              >
                {lang === 'bn' ? p.textBn : p.text}
              </button>
            ))}
          </div>
        </div>

        {/* Search Results Display Area */}
        <div className="flex-1 overflow-y-auto mt-2 space-y-3 pr-1 max-h-60 border-t border-slate-800 pt-3">
          {searchQuery.trim().length > 1 && totalMatches === 0 && (
            <div className="text-center py-6 text-slate-400 text-xs">
              {lang === 'bn' 
                ? 'কোনো ফলাফল পাওয়া যায়নি। অন্য কোনো কীওয়ার্ড দিয়ে অনুসন্ধান করুন।' 
                : 'No matches found. Try searching for "Math", "Analytical", "2023", or "Syllabus".'}
            </div>
          )}

          {/* Past Papers Matches */}
          {matchedPapers.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-2">
                <BookOpen className="w-3.5 h-3.5" />
                {lang === 'bn' ? 'বিগত প্রশ্নপত্রসমূহ' : 'Past Question Papers'} ({matchedPapers.length})
              </h4>
              <div className="space-y-1.5">
                {matchedPapers.map(paper => (
                  <div
                    key={paper.id}
                    onClick={() => {
                      onSelectPastPaper(paper.id);
                      onClose();
                    }}
                    className="p-2.5 bg-slate-800/80 hover:bg-emerald-950/70 border border-slate-700 hover:border-emerald-500/50 rounded-xl cursor-pointer flex items-center justify-between group transition-all"
                  >
                    <div>
                      <h5 className="text-sm font-semibold text-white group-hover:text-amber-300">
                        {lang === 'bn' ? paper.titleBn : paper.title}
                      </h5>
                      <p className="text-xs text-slate-400">
                        {paper.post} • {paper.year} • {paper.organizer}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Questions Matches */}
          {matchedQuestions.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-2">
                <CheckCircle className="w-3.5 h-3.5" />
                {lang === 'bn' ? 'অনুসন্ধানকৃত প্রশ্নাবলি' : 'Matching Exam Questions'} ({matchedQuestions.length})
              </h4>
              <div className="space-y-1.5">
                {matchedQuestions.map(q => (
                  <div
                    key={q.id}
                    onClick={() => {
                      onSelectQuestion(q);
                      onClose();
                    }}
                    className="p-2.5 bg-slate-800/80 hover:bg-emerald-950/70 border border-slate-700 hover:border-emerald-500/50 rounded-xl cursor-pointer flex items-center justify-between group transition-all"
                  >
                    <div className="flex-1 pr-2">
                      <p className="text-xs font-medium text-slate-200 line-clamp-2 group-hover:text-white">
                        {lang === 'bn' ? q.questionBn : q.question}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] uppercase font-bold text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded">
                          {q.category}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {q.examSource}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Downloadable Resources Matches */}
          {matchedDownloads.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5 mb-2">
                <FileText className="w-3.5 h-3.5" />
                {lang === 'bn' ? 'ডাউনলোড রিসোর্স ও সিলেবাস' : 'Downloadable Sheets & Notes'} ({matchedDownloads.length})
              </h4>
              <div className="space-y-1.5">
                {matchedDownloads.map(d => (
                  <div
                    key={d.id}
                    onClick={() => {
                      onSelectDownload(d.id);
                      onClose();
                    }}
                    className="p-2.5 bg-slate-800/80 hover:bg-emerald-950/70 border border-slate-700 hover:border-emerald-500/50 rounded-xl cursor-pointer flex items-center justify-between group transition-all"
                  >
                    <div>
                      <h5 className="text-sm font-semibold text-white group-hover:text-cyan-300">
                        {lang === 'bn' ? d.titleBn : d.title}
                      </h5>
                      <p className="text-xs text-slate-400">{d.fileSize} • {d.pages} Pages</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
