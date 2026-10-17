import React from 'react';
import { 
  Printer, 
  Download, 
  X, 
  Landmark, 
  FileText, 
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { PastExamPaper, Question } from '../types';

interface PrintSheetModalProps {
  paper: PastExamPaper | null;
  onClose: () => void;
  lang: 'bn' | 'en';
}

export const PrintSheetModal: React.FC<PrintSheetModalProps> = ({
  paper,
  onClose,
  lang
}) => {
  if (!paper) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadTxt = () => {
    let content = `========================================================================\n`;
    content += `BANGLADESH BANK RECRUITMENT EXAMINATION QUESTION & SOLUTION\n`;
    content += `${paper.title.toUpperCase()}\n`;
    content += `Post: ${paper.post} | Year: ${paper.year} | Organizer: ${paper.organizer}\n`;
    content += `Time: ${paper.durationMinutes} Minutes | Full Marks: ${paper.questions.length * 1} | Negative Mark: 0.25\n`;
    content += `========================================================================\n\n`;

    content += `--- SECTION 1: QUESTION PAPER ---\n\n`;
    paper.questions.forEach((q, idx) => {
      content += `Q${idx + 1}. ${q.question}\n`;
      content += `   (বাংলা): ${q.questionBn}\n`;
      q.options.forEach((opt, optIdx) => {
        content += `   [${['A', 'B', 'C', 'D'][optIdx]}] ${opt}\n`;
      });
      content += `\n`;
    });

    content += `\n========================================================================\n`;
    content += `--- SECTION 2: OFFICIAL ANSWER KEY & DETAILED EXPLANATIONS ---\n`;
    content += `========================================================================\n\n`;

    paper.questions.forEach((q, idx) => {
      content += `Q${idx + 1}. Correct Answer: [${['A', 'B', 'C', 'D'][q.correctIndex]}] ${q.options[q.correctIndex]}\n`;
      content += `   Category: ${q.category.toUpperCase()} | Subtopic: ${q.subtopic}\n`;
      content += `   Explanation (EN): ${q.explanation}\n`;
      content += `   Explanation (BN): ${q.explanationBn}\n\n`;
    });

    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = paper.downloadFilename || `${paper.id}_solution.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl max-w-4xl w-full p-4 sm:p-6 text-white shadow-2xl relative max-h-[95vh] flex flex-col">
        
        {/* Modal Top Actions (Hidden on Print) */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 print:hidden">
          <div className="flex items-center gap-2">
            <Landmark className="w-5 h-5 text-amber-400" />
            <h3 className="text-base sm:text-lg font-bold text-white">
              {lang === 'bn' ? 'প্রিন্ট ও ডাউনলোড ভিউয়ার' : 'Print & Download Document Viewer'}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-900/30 transition-all hover:scale-102"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'প্রিন্ট / PDF সংরক্ষণ' : 'Print / Save as PDF'}</span>
            </button>

            <button
              onClick={handleDownloadTxt}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 rounded-xl text-xs font-semibold"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'টেক্সট ফাইল ডাউনলোড' : 'Download .txt'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Paper Area (Styled like authentic Bangladesh Bank Question Booklet) */}
        <div className="flex-1 overflow-y-auto mt-4 bg-white text-slate-900 p-6 sm:p-10 rounded-xl shadow-inner font-serif print:p-0 print:m-0 print:shadow-none print:text-black">
          
          {/* Official Bank Header */}
          <div className="text-center border-b-2 border-emerald-900 pb-5 mb-6">
            <div className="flex justify-center mb-2">
              <div className="w-12 h-12 rounded-full border-2 border-emerald-800 flex items-center justify-center text-emerald-900 font-bold">
                <Landmark className="w-7 h-7" />
              </div>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-emerald-950 tracking-wider uppercase font-sans">
              BANGLADESH BANK
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-slate-700 uppercase tracking-widest font-sans">
              Central Bank of Bangladesh • Bankers' Selection Committee Secretariat
            </p>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-2">
              Recruitment Examination for the post of {paper.post} ({paper.year})
            </h2>
            <div className="flex justify-between items-center text-xs font-mono font-semibold text-slate-600 mt-3 border-t border-slate-300 pt-2 px-2">
              <span>Time Allowed: {paper.durationMinutes} Minutes</span>
              <span>Full Marks: {paper.questions.length}</span>
              <span>Negative Mark: -0.25 per wrong answer</span>
            </div>
          </div>

          {/* Candidate Placeholder Box */}
          <div className="border border-slate-400 p-3 mb-6 grid grid-cols-2 gap-4 text-xs font-mono text-slate-700">
            <div>Candidate Name: _______________________________</div>
            <div>Roll Number: _________________________________</div>
          </div>

          {/* Questions Grid */}
          <div className="space-y-6">
            <h3 className="text-sm font-black uppercase text-emerald-900 border-b border-emerald-800 pb-1 font-sans">
              PART I: MULTIPLE CHOICE QUESTIONS (MCQ)
            </h3>

            <div className="space-y-5">
              {paper.questions.map((q, idx) => (
                <div key={q.id} className="text-xs sm:text-sm break-inside-avoid">
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-slate-900 min-w-[24px]">
                      {idx + 1}.
                    </span>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900 leading-snug">
                        {q.question}
                      </p>
                      <p className="text-slate-600 font-normal italic mt-0.5 text-xs">
                        ({q.questionBn})
                      </p>

                      {/* Options 2x2 or 4x1 */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 mt-2 font-sans text-xs">
                        {q.options.map((opt, optIdx) => (
                          <div key={optIdx} className="flex items-center gap-1.5">
                            <span className="font-bold text-slate-700">
                              ({['A', 'B', 'C', 'D'][optIdx]})
                            </span>
                            <span>{opt}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Explanations & Answers Sheet */}
          <div className="mt-12 pt-6 border-t-2 border-emerald-900 break-before-page">
            <h3 className="text-sm font-black uppercase text-emerald-900 border-b border-emerald-800 pb-1 font-sans mb-4">
              PART II: OFFICIAL ANSWER KEY & STEP-BY-STEP DERIVATIONS
            </h3>

            <div className="space-y-4">
              {paper.questions.map((q, idx) => (
                <div key={q.id} className="text-xs p-3 bg-slate-50 border border-slate-200 rounded-lg break-inside-avoid">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-900">
                      Q{idx + 1}: Correct Answer: ({['A', 'B', 'C', 'D'][q.correctIndex]}) {q.options[q.correctIndex]}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded font-sans">
                      {q.category} • {q.subtopic}
                    </span>
                  </div>
                  <p className="text-slate-700 mt-1 leading-relaxed">
                    <strong className="font-semibold text-slate-900">Explanation (EN):</strong> {q.explanation}
                  </p>
                  <p className="text-slate-700 mt-1 leading-relaxed">
                    <strong className="font-semibold text-slate-900">ব্যাখ্যা (বাংলা):</strong> {q.explanationBn}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer watermark */}
          <div className="mt-8 text-center text-[10px] text-slate-500 font-sans border-t border-slate-300 pt-3">
            Bangladesh Bank Job Preparation Portal • Verified for Academic Reference & Practice Only
          </div>

        </div>

      </div>
    </div>
  );
};
