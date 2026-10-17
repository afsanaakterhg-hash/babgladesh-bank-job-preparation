import React from 'react';
import { 
  Radio, 
  Users, 
  Trophy, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Play, 
  Sparkles, 
  ShieldCheck, 
  Award,
  TrendingUp,
  MapPin
} from 'lucide-react';
import { mockTestConfigs, allMockQuestions } from '../data/mockTests';
import { allQuestions } from '../data/pastPapers';
import { MockTestConfig, Question } from '../types';

interface LiveTestViewProps {
  lang: 'bn' | 'en';
  onStartLiveExam: (config: MockTestConfig, questions: Question[]) => void;
  userLatestLiveScore?: number | null;
}

export const LiveTestView: React.FC<LiveTestViewProps> = ({
  lang,
  onStartLiveExam,
  userLatestLiveScore
}) => {
  const liveExamConfig = mockTestConfigs.find(c => c.isLive) || mockTestConfigs[0];
  const combinedLiveQuestions = [...allQuestions.slice(0, 15), ...allMockQuestions.slice(0, 10)];

  // Live leaderboard simulated data for realistic bank competitive atmosphere
  const topRankers = [
    { rank: 1, name: 'Tanvir Ahmed', nameBn: 'তানভীর আহমেদ', district: 'Dhaka', score: 23.75, accuracy: 96, timeTaken: '14m 20s' },
    { rank: 2, name: 'Farhana Yasmin', nameBn: 'ফারহানা ইয়াসমিন', district: 'Chattogram', score: 23.25, accuracy: 94, timeTaken: '15m 10s' },
    { rank: 3, name: 'Mehedi Hasan', nameBn: 'মেহেদী হাসান', district: 'Rajshahi', score: 22.50, accuracy: 92, timeTaken: '16m 05s' },
    { rank: 4, name: 'Nusrat Jahan', nameBn: 'নুসরাত জাহান', district: 'Sylhet', score: 22.00, accuracy: 91, timeTaken: '16m 45s' },
    { rank: 5, name: 'Shakil Rahman', nameBn: 'শাকিল রহমান', district: 'Khulna', score: 21.75, accuracy: 89, timeTaken: '17m 10s' },
    { rank: 6, name: 'Anika Tabassum', nameBn: 'আনিকা তাবাসসুম', district: 'Barishal', score: 21.50, accuracy: 88, timeTaken: '17m 30s' },
    { rank: 7, name: 'Arif Chowdhury', nameBn: 'আরিফ চৌধুরী', district: 'Rangpur', score: 21.25, accuracy: 87, timeTaken: '17m 50s' },
    { rank: 8, name: 'Sadia Sultana', nameBn: 'সাদিয়া সুলতানা', district: 'Mymensingh', score: 21.00, accuracy: 86, timeTaken: '18m 15s' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
      
      {/* Live Exam Active Status Banner */}
      <div className="bg-gradient-to-r from-red-950/80 via-slate-900 to-emerald-950 border border-red-500/40 rounded-3xl p-6 sm:p-8 mb-8 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-500/20 via-transparent to-transparent pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <span className="text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 tracking-wider">
                {lang === 'bn' ? 'সরাসরি লাইভ পরীক্ষা চলছে' : 'All-Bangladesh Live Exam Active'}
              </span>
              <span className="text-xs text-amber-300 font-semibold flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />
                3,842 {lang === 'bn' ? 'জন পরীক্ষার্থী অংশ নিচ্ছেন' : 'Active Examinees'}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
              {lang === 'bn' ? liveExamConfig.titleBn : liveExamConfig.title}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 mb-4 font-serif">
              {lang === 'bn'
                ? 'জাতীয় পর্যায়ের এই লাইভ টেস্টে অংশ নিয়ে নিজের মেধা যাচাই করুন। বাংলাদেশ ব্যাংকের সর্বশেষ প্রশ্ন প্যাটার্ন ও ০.২৫ নেগেটিভ মার্কিং সম্বলিত এই পরীক্ষা শেষে তাৎক্ষণিক মেধা তালিকা ও জেলাওয়ারি র‍্যাঙ্ক পাবেন।'
                : 'Compete with candidates nationwide under real exam conditions with strict 0.25 negative marking. Receive your instant national percentile, merit position, and subject-wise accuracy analysis.'}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-1 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-700">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>{liveExamConfig.durationMinutes} {lang === 'bn' ? 'মিনিট' : 'Mins'}</span>
              </div>
              <div className="flex items-center gap-1 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-700">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>{combinedLiveQuestions.length} {lang === 'bn' ? 'টি প্রশ্ন' : 'Questions'}</span>
              </div>
              <div className="flex items-center gap-1 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-700">
                <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                <span>-0.25 {lang === 'bn' ? 'নেগেটিভ মার্ক' : 'Negative Mark'}</span>
              </div>
            </div>
          </div>

          {/* Action Card */}
          <div className="bg-slate-900/90 border border-slate-700/80 p-5 rounded-2xl w-full lg:w-72 flex flex-col items-center text-center shadow-xl">
            <Trophy className="w-10 h-10 text-amber-400 mb-2" />
            <h4 className="text-sm font-bold text-white mb-1">
              {lang === 'bn' ? 'জাতীয় মেধা তালিকা' : 'National Merit List'}
            </h4>
            <p className="text-[11px] text-slate-400 mb-4">
              {lang === 'bn' ? 'পরীক্ষা শেষ সময়: আজ রাত ১১:৫৯ টা' : 'Ends: Today at 11:59 PM'}
            </p>

            <button
              onClick={() => onStartLiveExam(liveExamConfig, combinedLiveQuestions)}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-red-600/30 transition-all hover:scale-105"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{lang === 'bn' ? 'এখনই লাইভ পরীক্ষা দিন' : 'Enter Live Exam Now'}</span>
            </button>

            {userLatestLiveScore !== null && userLatestLiveScore !== undefined && (
              <div className="mt-3 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-3 py-1.5 rounded-lg w-full">
                {lang === 'bn' ? `আপনার স্কোর: ${userLatestLiveScore}` : `Your Score: ${userLatestLiveScore}`}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Grid: Exam Rules & Real-time Live Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Live Exam Protocol & Highlights */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>{lang === 'bn' ? 'পরীক্ষার নিয়মাবলি ও নির্দেশিকা' : 'Official Live Exam Rules'}</span>
            </h3>

            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0"></span>
                <span>
                  {lang === 'bn'
                    ? 'প্রতিটি প্রশ্নের মান ১ নম্বর। প্রতিটি ভুল উত্তরের জন্য ০.২৫ নম্বর কাটা যাবে।'
                    : 'Each question carries 1 mark. 0.25 marks will be deducted for every incorrect response.'}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0"></span>
                <span>
                  {lang === 'bn'
                    ? 'গণিত, অ্যানালিটিক্যাল, ইংরেজি ও ব্যাংকিং সাধারণ জ্ঞান থেকে সমভাবে প্রশ্ন নির্বাচন করা হয়েছে।'
                    : 'Questions are proportionally balanced across Math, Analytical Ability, English, and Banking GK.'}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0"></span>
                <span>
                  {lang === 'bn'
                    ? 'নির্ধারিত সময় শেষ হওয়া মাত্র পরীক্ষা স্বয়ংক্রিয়ভাবে সাবমিট হয়ে যাবে।'
                    : 'The test auto-submits once the countdown timer expires.'}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0"></span>
                <span>
                  {lang === 'bn'
                    ? 'সাবমিটের পরপরই বিস্তারিত সমাধান এবং দুর্বল অংশের এআই অ্যানালাইসিস দেখতে পাবেন।'
                    : 'Access step-by-step solutions and AI weak-area diagnostics immediately upon submission.'}
                </span>
              </li>
            </ul>
          </div>

          {/* Past Live Test Archive Card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h4 className="text-sm font-bold text-amber-400 mb-2 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span>{lang === 'bn' ? 'পরবর্তী লাইভ পরীক্ষা সিডিউল' : 'Upcoming Live Tests'}</span>
            </h4>
            <div className="space-y-2.5 mt-3 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                <div>
                  <p className="font-semibold text-white">{lang === 'bn' ? 'অফিসার (সাধারণ) স্পেশাল লাইভ' : 'Officer General Special Live'}</p>
                  <p className="text-[10px] text-slate-400">Tomorrow at 8:00 PM</p>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300">Upcoming</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                <div>
                  <p className="font-semibold text-white">{lang === 'bn' ? 'অ্যানালিটিক্যাল ও ম্যাথ অলিম্পিয়াড' : 'Bank Math & Analytical Sprint'}</p>
                  <p className="text-[10px] text-slate-400">Friday at 9:00 PM</p>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300">Upcoming</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Columns (span 2): Real-time National Leaderboard */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                <span>{lang === 'bn' ? 'জাতীয় মেধা তালিকা (শীর্ষ স্থানাধিকারী)' : 'National Live Leaderboard'}</span>
              </h3>
              <p className="text-xs text-slate-400">
                {lang === 'bn' ? 'সর্বশেষ আপডেট: লাইভ ক্যালকুলেশন' : 'Updated live across all participating candidates'}
              </p>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>LIVE</span>
            </div>
          </div>

          {/* Leaderboard Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-400 uppercase tracking-wider border-b border-slate-800 text-[10px]">
                  <th className="py-2.5 px-3">{lang === 'bn' ? 'র‍্যাঙ্ক' : 'Rank'}</th>
                  <th className="py-2.5 px-3">{lang === 'bn' ? 'প্রার্থী' : 'Candidate'}</th>
                  <th className="py-2.5 px-3">{lang === 'bn' ? 'জেলা' : 'District'}</th>
                  <th className="py-2.5 px-3 text-right">{lang === 'bn' ? 'প্রাপ্ত স্কোর' : 'Score'}</th>
                  <th className="py-2.5 px-3 text-right">{lang === 'bn' ? 'নির্ভুলতা' : 'Accuracy'}</th>
                  <th className="py-2.5 px-3 text-right">{lang === 'bn' ? 'সময়' : 'Time'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {topRankers.map((r) => {
                  let rankBadge = `${r.rank}`;
                  let rankColor = 'text-slate-300';
                  if (r.rank === 1) rankColor = 'text-amber-400 font-extrabold';
                  if (r.rank === 2) rankColor = 'text-slate-200 font-bold';
                  if (r.rank === 3) rankColor = 'text-amber-600 font-bold';

                  return (
                    <tr key={r.rank} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-3">
                        <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs ${
                          r.rank === 1 ? 'bg-amber-400/20 text-amber-400 border border-amber-400/40' :
                          r.rank === 2 ? 'bg-slate-300/20 text-slate-200 border border-slate-300/40' :
                          r.rank === 3 ? 'bg-amber-700/20 text-amber-500 border border-amber-600/40' :
                          'bg-slate-800 text-slate-400'
                        }`}>
                          {rankBadge}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-semibold text-white">
                        {lang === 'bn' ? r.nameBn : r.name}
                      </td>
                      <td className="py-3 px-3 text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        <span>{r.district}</span>
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-amber-400">
                        {r.score}
                      </td>
                      <td className="py-3 px-3 text-right text-emerald-400 font-mono">
                        {r.accuracy}%
                      </td>
                      <td className="py-3 px-3 text-right text-slate-400 font-mono">
                        {r.timeTaken}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

        </div>

      </div>

    </div>
  );
};
