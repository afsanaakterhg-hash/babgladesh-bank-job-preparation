import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;
if (apiKey) {
  aiClient = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// AI Study Performance Analyzer Route
app.post('/api/ai/analyze-performance', async (req: Request, res: Response) => {
  try {
    const { results, targetPost = 'Assistant Director (AD)', language = 'bn' } = req.body;

    if (!aiClient) {
      // High-quality deterministic heuristic response if no API key
      const totalAttempted = results?.totalAttempted || 0;
      const totalScore = results?.score || 0;
      const accuracy = totalAttempted > 0 ? Math.round((totalScore / totalAttempted) * 100) : 65;
      
      const analysisFallback = {
        readinessScore: Math.min(Math.max(accuracy + 5, 45), 95),
        readinessLevel: accuracy >= 75 ? 'Advanced (Exam Ready)' : accuracy >= 55 ? 'Intermediate (Solid Foundation)' : 'Beginner (Needs Rigorous Drill)',
        summaryBn: `আপনার বর্তমান নির্ভুলতার হার ${accuracy}%। বাংলাদেশ ব্যাংক ${targetPost} পরীক্ষার প্রিলিমিনারিতে কাট-মার্ক সাধারণত ৬৫-৭২ এর কাছাকাছি থাকে। অ্যানালিটিক্যাল ও গণিত বিভাগে আরও গতিশীল সমাধান দরকার।`,
        summaryEn: `Your current accuracy rate is ${accuracy}%. Cut-off marks for Bangladesh Bank ${targetPost} Preliminary typically hover around 65-72. Speed optimization is critical in Analytical Ability & Math.`,
        strengths: [
          language === 'bn' ? 'সাধারণ জ্ঞান ও বাংলাদেশ ব্যাংকের সাম্প্রতিক পলিসি তথ্যে ভালো দখল' : 'Strong retention in Banking General Knowledge & Monetary Policy',
          language === 'bn' ? 'বাংলা ব্যাকরণ ও সাহিত্য বিষয়ক প্রশ্নাবলি' : 'Good grip on Bengali grammar & literary questions'
        ],
        weaknesses: [
          language === 'bn' ? 'অ্যানালিটিক্যাল পাজল ও জটিল সিটিং অ্যারেঞ্জমেন্ট (সময় বেশি লাগছে)' : 'Analytical Puzzles & Complex Seating Arrangements (taking high time per question)',
          language === 'bn' ? 'ম্যাথ: বিন্যাস-সমাবেশ ও সম্ভাব্যতা (Permutation & Probability)' : 'Math: Permutation, Combination & Probability questions'
        ],
        personalizedPlan: [
          { day: 'Day 1-2', focus: language === 'bn' ? 'বিগত ৫ বছরের বাংলাদেশ ব্যাংক এডি ম্যাথ সল্যুশন (Time & Work, Pipes)' : 'Past 5 Years BB AD Math Solutions (Time, Work & Pipes)' },
          { day: 'Day 3-4', focus: language === 'bn' ? 'Analytical Ability BIBM স্ট্যান্ডার্ড পাজল ও ক্রিটিকাল রিজনিং ২০টি' : 'Analytical Ability BIBM-standard Puzzles & Critical Reasoning (20 sets)' },
          { day: 'Day 5', focus: language === 'bn' ? 'GRE High-Yield 200 Word Analogy & Sentence Completion' : 'GRE High-Yield 200 Word Analogy & Sentence Completion Drill' },
          { day: 'Day 6', focus: language === 'bn' ? 'বাংলাদেশ ব্যাংকের মুদ্রানীতি (Monetary Policy), বৈদেশিক মুদ্রা রিজার্ভ, CRR/SLR রিভিশন' : 'Revision of BB Monetary Policy, Forex Reserve & Banking Acronyms' },
          { day: 'Day 7', focus: language === 'bn' ? 'পূর্ণাঙ্গ ১০০ নম্বরের লাইভ টাইমড মডেল টেস্ট ও অ্যানালাইসিস' : 'Full 100-mark Timed Model Exam under negative marking simulation' }
        ],
        smartTip: language === 'bn' 
          ? 'টিপস: বাংলাদেশ ব্যাংকের পরীক্ষায় ম্যাথ ও অ্যানালিটিক্যালে নেগেটিভ মার্কিং এড়াতে অপশন এলিমিনেশন টেকনিক ব্যবহার করুন।' 
          : 'Pro Tip: In Bangladesh Bank exams, use answer choice elimination for Analytical and Data Sufficiency to protect against the 0.25 negative marking.'
      };

      return res.json(analysisFallback);
    }

    const prompt = `You are the lead academic coach for Bangladesh Bank Recruitment Exams (Assistant Director - AD, Officer General, Cash Officer).
Analyze the candidate's test metrics:
- Target Exam: ${targetPost}
- Candidate Test Data: ${JSON.stringify(results)}
- Target Language: ${language}

Provide a deep, realistic, actionable analysis tailored specifically to Bangladesh Bank & BIBM exam standards.
Return strictly a valid JSON object matching this schema:
{
  "readinessScore": number (0 to 100),
  "readinessLevel": string,
  "summaryBn": string,
  "summaryEn": string,
  "strengths": string[],
  "weaknesses": string[],
  "personalizedPlan": [
    { "day": string, "focus": string }
  ],
  "smartTip": string
}`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (err: any) {
    console.error('AI Analysis Error:', err);
    return res.status(500).json({ error: 'Failed to generate AI performance report', details: err?.message });
  }
});

// AI Mentor / Question Explainer Route
app.post('/api/ai/ask-mentor', async (req: Request, res: Response) => {
  try {
    const { questionText, topic, userQuery, language = 'bn' } = req.body;

    if (!aiClient) {
      return res.json({
        answer: language === 'bn' 
          ? `এই ধরণের প্রশ্ন সমাধানের জন্য প্রথমে প্রদত্ত তথ্যগুলো ক্রমানুসারে সাজিয়ে নিন। শর্টকাট সূত্র বা ব্যাকরণগত নিয়ম অনুযায়ী অপশনগুলো যাচাই করুন। বাংলাদেশ ব্যাংক ও BIBM এর পরীক্ষায় সময় সাশ্রয় করতে অপশন টেস্ট পদ্ধতি বেশ কার্যকর।`
          : `For this type of question, first organize the given constraints into a matrix or sequence. Then eliminate options that contradict the rules. In Bangladesh Bank tests, reverse back-solving from answer choices saves crucial seconds.`
      });
    }

    const prompt = `You are a distinguished Bangladesh Bank exam faculty expert.
A job aspirant is asking for explanation or doubt clearance:
Question Context: "${questionText || 'General Bank Preparation Doubt'}"
Topic: "${topic || 'General'}"
User Question/Doubt: "${userQuery}"
Preferred Language: ${language === 'bn' ? 'Bangla (সহজ বোধগম্য বাংলায়)' : 'English'}

Provide a clear, crisp, step-by-step breakdown explaining the intuition, formula/shortcut, and common pitfalls candidates make in Bangladesh Bank exams.`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    return res.json({ answer: response.text });
  } catch (err: any) {
    console.error('AI Mentor Error:', err);
    return res.status(500).json({ error: 'Failed to ask AI mentor' });
  }
});

// AI Dynamic Practice Question Generator Route
app.post('/api/ai/generate-question', async (req: Request, res: Response) => {
  try {
    const { category, subtopic, difficulty = 'medium', language = 'en' } = req.body;

    if (!aiClient) {
      return res.json({
        question: `If a merchant marks an article 40% above its cost price and allows a discount of 15% on the marked price, what is his profit percentage?`,
        questionBn: `যদি একজন বিক্রেতা একটি পণ্যের ক্রয়মূল্যের চেয়ে ৪০% বেশিতে মূল্য নির্ধারণ করেন এবং মুদ্রিত মূল্যের উপর ১৫% ছাড় দেন, তবে তার শতকরা লাভ কত?`,
        options: ['19%', '21%', '25%', '18%'],
        correctIndex: 0,
        explanation: `Let CP = 100. Marked Price (MP) = 100 + 40 = 140. Discount = 15% of 140 = 21. Selling Price (SP) = 140 - 21 = 119. Profit = 119 - 100 = 19%.`,
        explanationBn: `ধরি ক্রয়মূল্য = ১০০ টাকা। মুদ্রিত মূল্য (MP) = ১৪০ টাকা। ছাড় = ১৪০ টাকার ১৫% = ২১ টাকা। বিক্রয়মূল্য (SP) = ১৪০ - ২১ = ১১৯ টাকা। লাভ = ১৯%।`,
        category: category || 'math',
        subtopic: subtopic || 'Profit & Loss',
        examSource: 'BB AD Model Simulation'
      });
    }

    const prompt = `Generate a single authentic Bangladesh Bank / BIBM recruitment standard MCQ question.
Category: ${category}
Subtopic: ${subtopic || 'General'}
Difficulty: ${difficulty} (e.g. Bangladesh Bank Assistant Director standard)

Return strictly a JSON object matching this schema:
{
  "question": string (English version),
  "questionBn": string (Bengali version),
  "options": string[] (4 options),
  "correctIndex": number (0 to 3),
  "explanation": string (step by step in English),
  "explanationBn": string (step by step in Bengali),
  "category": string,
  "subtopic": string,
  "examSource": string
}`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (err: any) {
    console.error('Generate Question Error:', err);
    return res.status(500).json({ error: 'Failed to generate question' });
  }
});

// Setup Vite or static serving
async function setupServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve('dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

setupServer();
