export type SubjectCategory = 'math' | 'english' | 'analytical' | 'bangla' | 'banking_gk';

export type BankPost = 'Assistant Director (AD)' | 'Officer (General)' | 'Officer (Cash)' | 'Combined 8/9 Bank';

export interface Question {
  id: string;
  question: string;
  questionBn: string;
  options: string[];
  optionsBn?: string[];
  correctIndex: number;
  explanation: string;
  explanationBn: string;
  category: SubjectCategory;
  subtopic: string;
  examSource: string;
  year?: number;
  post?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface PastExamPaper {
  id: string;
  title: string;
  titleBn: string;
  year: number;
  post: BankPost;
  organizer: string; // e.g. BIBM, Arts Faculty DU, IBA DU
  totalQuestions: number;
  durationMinutes: number;
  downloadFilename: string;
  tags: string[];
  description: string;
  descriptionBn: string;
  questions: Question[];
}

export interface MockTestConfig {
  id: string;
  title: string;
  titleBn: string;
  category?: SubjectCategory | 'full';
  totalQuestions: number;
  durationMinutes: number;
  negativeMark: number; // usually 0.25
  isLive?: boolean;
  liveEndTime?: string;
  participantsCount?: number;
  difficulty: 'Easy' | 'Standard BIBM' | 'High AD Standard';
}

export interface UserAnswerRecord {
  questionId: string;
  selectedOptionIndex: number | null;
  isCorrect: boolean;
  timeSpentSeconds: number;
}

export interface CompletedExamResult {
  examId: string;
  examTitle: string;
  examTitleBn: string;
  totalMarks: number;
  score: number;
  correctCount: number;
  wrongCount: number;
  unattemptedCount: number;
  accuracy: number;
  timeSpentSeconds: number;
  date: string;
  categoryBreakdown: Record<SubjectCategory, { correct: number; total: number; accuracy: number }>;
  answers: UserAnswerRecord[];
}

export interface AIAnalysisReport {
  readinessScore: number;
  readinessLevel: string;
  summaryBn: string;
  summaryEn: string;
  strengths: string[];
  weaknesses: string[];
  personalizedPlan: Array<{ day: string; focus: string }>;
  smartTip: string;
}

export interface DownloadableResource {
  id: string;
  title: string;
  titleBn: string;
  category: SubjectCategory | 'general' | 'monetary_policy';
  type: 'PDF' | 'CheatSheet' | 'Syllabus';
  fileSize: string;
  pages: number;
  summary: string;
  summaryBn: string;
  contentMarkdown: string; // For generating on-the-fly clean document download/print
}
