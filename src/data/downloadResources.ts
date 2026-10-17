import { DownloadableResource } from '../types';

export const downloadableResources: DownloadableResource[] = [
  {
    id: 'res-bb-ad-syllabus',
    title: 'Bangladesh Bank AD & Officer Full Official Syllabus & Marks Distribution',
    titleBn: 'বাংলাদেশ ব্যাংক এডি ও অফিসার পূর্ণাঙ্গ সিলেবাস ও মানবন্টন নির্দেশিকা',
    category: 'general',
    type: 'Syllabus',
    fileSize: '1.2 MB',
    pages: 6,
    summary: 'Detailed breakdown of Preliminary (100 marks), Written (200 marks), and Viva Voce marks distribution for Assistant Director and Officer posts.',
    summaryBn: 'সহকারী পরিচালক ও অফিসার পদের প্রিলিমিনারি (১০০ নম্বর), লিখিত (২০০ নম্বর) এবং ভাইভার পূর্ণাঙ্গ মানবন্টন ও টপিকভিত্তিক গাইড।',
    contentMarkdown: `========================================================================
BANGLADESH BANK RECRUITMENT EXAMINATION
OFFICIAL SYLLABUS & MARKS DISTRIBUTION
Central Bank of the People's Republic of Bangladesh
========================================================================

1. PRELIMINARY EXAMINATION (MCQ - 100 Marks, Duration: 1 Hour)
------------------------------------------------------------------------
- Negative Marking: 0.25 marks deduction for each incorrect answer.
- Structure:
  * Mathematics & Quantitative Aptitude: 25 - 30 Marks
    (Arithmetic, Algebra, Geometry, Mensuration, Permutation, Probability, Data Sufficiency)
  * English Language & Comprehension: 20 - 25 Marks
    (Analogy, Vocabulary, Synonyms & Antonyms, Sentence Correction, Reading Comprehension, Cloze Test)
  * Analytical Ability & Critical Reasoning: 15 Marks
    (Logic Puzzles, Seating Arrangements, Blood Relations, Direction Tests, Syllogism, Assumptions)
  * Bangla Language & Literature: 15 - 20 Marks
    (Grammar, Shondhi, Somash, Karak, Bagdhara, Ancient & Modern Literature, Banking Translations)
  * General Knowledge, Banking Affairs & ICT: 15 - 20 Marks
    (Bangladesh Affairs, International Economy, Bangladesh Bank Orders, Monetary Policy, ICT & Cyber Security)

2. WRITTEN EXAMINATION (200 Marks, Duration: 2 Hours)
------------------------------------------------------------------------
- Focus on Descriptive Banking Math (50 marks)
- Essay Writing in English & Bangla (Focus on Current Economic Challenges, Inflation, Banking Sector Reforms)
- Translation (Bangla to English and English to Bangla)
- Reading Comprehension & Summary Writing
- Business & Banking Letter / Report Writing

3. STRATEGY FOR SUCCESS
------------------------------------------------------------------------
- High focus on Math shortcuts and Analytical speed.
- Practice daily with negative marking simulation.
- Review past 10 years BIBM and Bangladesh Bank questions.
`
  },
  {
    id: 'res-math-formulas',
    title: 'Bangladesh Bank Math Speed Formula & Shortcut Handbook',
    titleBn: 'ব্যাংক গণিত শর্টকাট সূত্র ও স্পিড টেকনিক হ্যান্ডবুক',
    category: 'math',
    type: 'CheatSheet',
    fileSize: '2.4 MB',
    pages: 14,
    summary: 'Comprehensive quantitative cheat sheet covering Time & Work, Permutation, Combinations, Probability, and Alligation shortcuts.',
    summaryBn: 'টাইম অ্যান্ড ওয়ার্ক, বিন্যাস-সমাবেশ, সম্ভাব্যতা, শতকরা ও লাভ-ক্ষতির দ্রুত সমাধান করার শর্টকাট সূত্রের সংকলন।',
    contentMarkdown: `========================================================================
BANGLADESH BANK QUANTITATIVE APTITUDE FORMULA HANDBOOK
High-Speed Mathematical Techniques for BIBM & Central Bank Exams
========================================================================

1. TIME & WORK FORMULAS:
------------------------------------------------------------------------
- If A does work in 'x' days and B does it in 'y' days:
  Combined time = (x * y) / (x + y) days
- If A, B, C work together:
  Combined time = (x * y * z) / (xy + yz + zx) days
- Efficiency relation:
  Work = Efficiency * Time. If A is 3 times as efficient as B, ratio of time is 1:3.

2. PIPES & CISTERNS:
------------------------------------------------------------------------
- Inlet pipe fills in 'x' hrs, Outlet pipe empties in 'y' hrs (y > x):
  Net filling time = (x * y) / (y - x) hours.

3. PERMUTATIONS & COMBINATIONS:
------------------------------------------------------------------------
- Arranging 'n' distinct items in a circle: (n - 1)!
- Linear arrangements with identical items: n! / (p! * q! * r!)
- Choosing 'r' from 'n': nCr = n! / [r! * (n - r)!]
- Handshake / Match problem: n(n - 1) / 2

4. PROBABILITY:
------------------------------------------------------------------------
- P(A or B) = P(A) + P(B) - P(A and B)
- Independent Events: P(A and B) = P(A) * P(B)
- At least one event happens = 1 - P(None happen)

5. MIXTURES & ALLIGATION (Crucial for Bank Exams):
------------------------------------------------------------------------
- Cheaper / Dearer ratio = (Price of Dearer - Mean Price) / (Mean Price - Price of Cheaper)
- Repeated Dilution: Remaining original liquid = Initial * (1 - y/x)^n
  where x = capacity, y = removed quantity, n = number of operations.

6. PROFIT & LOSS:
------------------------------------------------------------------------
- Two items sold at same SP, one at x% gain and other at x% loss:
  Overall Loss % = (x / 10)^2 %
`
  },
  {
    id: 'res-analytical-puzzles',
    title: 'Bank Analytical Ability & Logic Puzzle Mastery Guide',
    titleBn: 'ব্যাংক অ্যানালিটিক্যাল এবিলিটি ও লজিক পাজল গাইড',
    category: 'analytical',
    type: 'CheatSheet',
    fileSize: '1.8 MB',
    pages: 10,
    summary: 'Master circular seating, linear arrangement, conditional logic, and family tree deductions with step-by-step matrix techniques.',
    summaryBn: 'বৃত্তাকার ও রৈখিক আসন বিন্যাস, রক্তীয় সম্পর্ক এবং যুক্তিমূলক সিদ্ধান্ত গ্রহণের ম্যাট্রিক্স পদ্ধতি।',
    contentMarkdown: `========================================================================
BANGLADESH BANK ANALYTICAL REASONING MASTER GUIDE
BIBM Standard Logic Puzzles, Deductions & Critical Reasoning
========================================================================

1. CIRCULAR SEATING ARRANGEMENT:
------------------------------------------------------------------------
- Rule 1: Determine orientation!
  * Facing Center: Left is Clockwise, Right is Counter-Clockwise.
  * Facing Away: Left is Counter-Clockwise, Right is Clockwise.
- Rule 2: For 6 or 8 people facing center:
  * Exact opposite person is (n / 2) positions away.
  * Start with the most restrictive definite clue (e.g., "A sits 2nd to the left of B").

2. BLOOD RELATIONS DEDUCTION SYMBOLS:
------------------------------------------------------------------------
- (+) denotes Male, (-) denotes Female.
- (=) denotes Married couple.
- (|) vertical line denotes Parent-Child relationship.
- (---) horizontal line denotes Siblings.
- Never assume gender from a person's name unless explicitly stated!

3. CRITICAL REASONING & ASSUMPTIONS:
------------------------------------------------------------------------
- An assumption is an unstated premise required for the conclusion to be valid.
- Negation Technique: If negating the statement destroys the argument's logic, that statement IS an assumption!
- Avoid extreme options containing "always", "never", "only", "must" unless supported by the prompt.
`
  },
  {
    id: 'res-banking-monetary-policy',
    title: 'Bangladesh Bank Monetary Policy & Financial Sector Cheatsheet',
    titleBn: 'বাংলাদেশ ব্যাংকের মুদ্রানীতি ও আর্থিক খাত হ্যান্ডবুক',
    category: 'monetary_policy',
    type: 'PDF',
    fileSize: '3.1 MB',
    pages: 18,
    summary: 'Key banking terminology, BB history, Governor list, Repo/Reverse repo, SDF/SLF, CRR/SLR requirements, and payment systems.',
    summaryBn: 'বাংলাদেশ ব্যাংকের ইতিহাস, মুদ্রানীতির প্রধান হাতিয়ারসমূহ, সিআরআর, এসএলআর, এনপিএসবি ও ব্যাংকিং পরিভাষার পূর্ণাঙ্গ নোট।',
    contentMarkdown: `========================================================================
BANGLADESH BANK MONETARY POLICY & FINANCIAL GLOSSARY
Official Central Bank Revision Notes
========================================================================

1. CORE INSTITUTIONAL FACTS:
------------------------------------------------------------------------
- Established: Under Bangladesh Bank Order, 1972 (President's Order No. 127).
- Effective Date: 16 December 1971.
- First Governor: A.N.M. Hamidullah.
- Headquarters: Motijheel, Dhaka, Bangladesh.
- Branches: 10 branches (Motijheel, Sadarghat, Chattogram, Rajshahi, Khulna, Bogura, Sylhet, Rangpur, Barishal, Mymensingh).

2. MONETARY POLICY INSTRUMENTS:
------------------------------------------------------------------------
- Policy Rate (Repo Rate): The interest rate at which Bangladesh Bank lends money to commercial banks against government securities.
- Standing Deposit Facility (SDF) / Reverse Repo: The rate at which commercial banks park excess liquidity with Bangladesh Bank.
- Standing Lending Facility (SLF): Upper ceiling of the interest rate corridor for overnight emergency lending.
- CRR (Cash Reserve Ratio): Currently 4.00% (bi-weekly average) / 3.5% (daily minimum) of Total Demand and Time Liabilities (TDTL) kept in unencumbered cash with Bangladesh Bank.
- SLR (Statutory Liquidity Ratio): Minimum reserves banks must hold in gold, cash, or approved government securities (Conventional banks: 13.0%, Islamic banks: 5.5%).

3. PAYMENT AND SETTLEMENT SYSTEMS:
------------------------------------------------------------------------
- BEFTN: Bangladesh Electronic Funds Transfer Network (for batched credits/debits).
- RTGS: Real Time Gross Settlement (for immediate, high-value interbank fund transfers in BDT and foreign currencies).
- NPSB: National Payment Switch Bangladesh (routes ATM, POS, and Internet Banking fund transfers).
- Binimoy: Interoperable Digital Transaction Platform (IDTP).

4. BANK SUPERVISION & REGULATIONS:
------------------------------------------------------------------------
- Bank Company Act: 1991 (amended in 2023).
- Money Laundering Prevention Act: 2012.
- Anti-Terrorism Act: 2009.
- CAMELS Rating: Capital Adequacy, Asset Quality, Management Soundness, Earnings, Liquidity, Sensitivity to Market Risk.
- Basel III Capital Requirements: Minimum CRAR of 10% + 2.5% Capital Conservation Buffer = 12.5% total capital.
`
  }
];
