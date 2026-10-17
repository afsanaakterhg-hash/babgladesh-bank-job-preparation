import { MockTestConfig, Question } from '../types';

export const mockTestConfigs: MockTestConfig[] = [
  {
    id: 'bb-grand-live-test-ad',
    title: 'Bangladesh Bank AD 2026 National Grand Live Test',
    titleBn: 'বাংলাদেশ ব্যাংক এডি ২০২৬ জাতীয় গ্র্যান্ড লাইভ টেস্ট',
    category: 'full',
    totalQuestions: 25, // Scaled for quick or full timed test
    durationMinutes: 20,
    negativeMark: 0.25,
    isLive: true,
    liveEndTime: 'Today, 11:59 PM',
    participantsCount: 3840,
    difficulty: 'High AD Standard'
  },
  {
    id: 'model-test-full-1',
    title: 'BB Assistant Director All-Rounder Model Test 01',
    titleBn: 'বিবি সহকারী পরিচালক পূর্ণাঙ্গ মডেল টেস্ট ০১',
    category: 'full',
    totalQuestions: 20,
    durationMinutes: 15,
    negativeMark: 0.25,
    isLive: false,
    participantsCount: 1290,
    difficulty: 'Standard BIBM'
  },
  {
    id: 'math-speed-drill',
    title: 'Banking Math Speed & Quantitative Aptitude Drill',
    titleBn: 'ব্যাংকিং গণিত স্পিড ড্রিল ও শর্টকাট টেস্ট',
    category: 'math',
    totalQuestions: 15,
    durationMinutes: 12,
    negativeMark: 0.25,
    isLive: false,
    participantsCount: 890,
    difficulty: 'High AD Standard'
  },
  {
    id: 'analytical-puzzle-mastery',
    title: 'Analytical Ability & Logic Puzzles Master Test',
    titleBn: 'অ্যানালিটিক্যাল এবিলিটি ও লজিক পাজল মাস্টার টেস্ট',
    category: 'analytical',
    totalQuestions: 12,
    durationMinutes: 12,
    negativeMark: 0.25,
    isLive: false,
    participantsCount: 740,
    difficulty: 'High AD Standard'
  },
  {
    id: 'english-analogy-vocab',
    title: 'GRE Standard English Analogy & Sentence Completion',
    titleBn: 'জিআরই স্ট্যান্ডার্ড ইংরেজি অ্যানালজি ও ভোকাবুলারি টেস্ট',
    category: 'english',
    totalQuestions: 15,
    durationMinutes: 10,
    negativeMark: 0.25,
    isLive: false,
    participantsCount: 1120,
    difficulty: 'Standard BIBM'
  },
  {
    id: 'banking-gk-policy',
    title: 'Bangladesh Bank Affairs, Monetary Policy & Economy',
    titleBn: 'বাংলাদেশ ব্যাংক অ্যাফেয়ার্স, মুদ্রানীতি ও অর্থনীতি',
    category: 'banking_gk',
    totalQuestions: 15,
    durationMinutes: 10,
    negativeMark: 0.25,
    isLive: false,
    participantsCount: 1450,
    difficulty: 'Standard BIBM'
  }
];

export const additionalSubjectQuestions: Question[] = [
  // Math
  {
    id: 'm-extra-1',
    question: 'A vessel contains 60 liters of milk. 12 liters of milk taken out and replaced by water. This process is repeated once more. How much milk is left in the vessel now?',
    questionBn: 'একটি পাত্রে ৬০ লিটার দুধ রয়েছে। ১২ লিটার দুধ তুলে নিয়ে সমপরিমাণ পানি মেশানো হলো। এই প্রক্রিয়াটি আরও একবার পুনরাবৃত্তি করা হলো। পাত্রে এখন কত লিটার দুধ অবশিষ্ট থাকবে?',
    options: ['38.4 liters', '36.2 liters', '40.0 liters', '32.5 liters'],
    optionsBn: ['৩৮.৪ লিটার', '৩৬.২ লিটার', '৪০.০ লিটার', '৩২.৫ লিটার'],
    correctIndex: 0,
    explanation: 'Formula: Remaining amount = Total * (1 - replaced/total)^n = 60 * (1 - 12/60)^2 = 60 * (4/5)^2 = 60 * 16/25 = 38.4 liters.',
    explanationBn: 'সূত্র: অবশিষ্ট পরিমাণ = মোট × (১ - উত্তোলিত/মোট)^n = ৬০ × (১ - ১২/৬০)^২ = ৬০ × (৪/৫)^২ = ৬০ × ১৬/২৫ = ৩৮.৪ লিটার।',
    category: 'math',
    subtopic: 'Mixtures & Alligation',
    examSource: 'BIBM Math Archive',
    difficulty: 'hard'
  },
  {
    id: 'm-extra-2',
    question: 'A committee of 5 members is to be formed from 6 men and 4 women. In how many ways can this be done if the committee must include at least 2 women?',
    questionBn: '৬ জন পুরুষ এবং ৪ জন মহিলার মধ্য থেকে ৫ সদস্যের একটি কমিটি গঠন করতে হবে। অন্তত ২ জন মহিলাকে অন্তর্ভুক্ত করে কত উপায়ে কমিটি গঠন করা যায়?',
    options: ['186 ways', '246 ways', '120 ways', '210 ways'],
    optionsBn: ['১৮৬ উপায়ে', '২৪৬ উপায়ে', '১২০ উপায়ে', '২১০ উপায়ে'],
    correctIndex: 0,
    explanation: 'Total ways to form 5 members from 10 people = 10C5 = 252. Ways with NO women = 6C5 * 4C0 = 6 * 1 = 6. Ways with EXACTLY 1 woman = 6C4 * 4C1 = 15 * 4 = 60. Ways with < 2 women = 6 + 60 = 66. At least 2 women = 252 - 66 = 186 ways.',
    explanationBn: '১০ জন থেকে ৫ জন বাছাইয়ের মোট উপায় = ১০C৫ = ২৫২। কোনো মহিলা না নিয়ে = ৬C৫ = ৬ উপায়ে। ১ জন মহিলা নিয়ে = ৬C৪ × ৪C১ = ১৫ × ৪ = ৬০ উপায়ে। সুতরাং অন্তত ২ জন মহিলা নিয়ে বাছাই = ২৫২ - (৬ + ৬০) = ১৮৬ উপায়ে।',
    category: 'math',
    subtopic: 'Combinations & Probability',
    examSource: 'Bangladesh Bank AD Model',
    difficulty: 'hard'
  },
  {
    id: 'm-extra-3',
    question: 'A shopkeeper sells two laptops for Tk. 48,000 each. On one he gains 20% and on the other he loses 20%. What is his overall gain or loss percentage?',
    questionBn: 'একজন দোকানদার দুটি ল্যাপটপ প্রতিটি ৪৮,০০০ টাকায় বিক্রি করেন। একটিতে তিনি ২০% লাভ করেন এবং অন্যটিতে ২০% লোকসান করেন। সামগ্রিকভাবে তার শতকরা লাভ বা ক্ষতি কত?',
    options: ['4% loss', '4% profit', 'No loss no profit', '2% loss'],
    optionsBn: ['৪% ক্ষতি', '৪% লাভ', 'লাভ বা ক্ষতি নেই', '২% ক্ষতি'],
    correctIndex: 0,
    explanation: 'When two articles are sold at the same selling price, one at a gain of x% and other at a loss of x%, there is always an overall loss of (x/10)^2 % = (20/10)^2 = 4% loss.',
    explanationBn: 'যখন দুটি দ্রব্যের বিক্রয়মূল্য একই থাকে এবং একটিতে x% লাভ ও অন্যটিতে x% ক্ষতি হয়, তখন সর্বদা সামগ্রিক ক্ষতি হয় = (x/১০)^২ % = (২০/১০)^২ % = ৪% ক্ষতি।',
    category: 'math',
    subtopic: 'Profit and Loss',
    examSource: 'Combined Banks Preli',
    difficulty: 'medium'
  },
  // English
  {
    id: 'e-extra-1',
    question: 'Select the synonym for "UBIQUITOUS":',
    questionBn: '"UBIQUITOUS" শব্দের সমার্থক শব্দ কোনটি?',
    options: ['Omnipresent', 'Rare', 'Unique', 'Concealed'],
    optionsBn: ['Omnipresent', 'Rare', 'Unique', 'Concealed'],
    correctIndex: 0,
    explanation: 'Ubiquitous means present, appearing, or found everywhere (omnipresent).',
    explanationBn: 'Ubiquitous অর্থ যা সর্বত্র বিদ্যমান বা বিরাজমান (Omnipresent বা সর্বত্র বিরাজমান)।',
    category: 'english',
    subtopic: 'Synonyms & Antonyms',
    examSource: 'BIBM English Bank',
    difficulty: 'medium'
  },
  {
    id: 'e-extra-2',
    question: 'PUGNACIOUS : COMBAT ::',
    questionBn: 'সঠিক সম্পর্কযুক্ত জোড়টি চিহ্নিত করুন: PUGNACIOUS : COMBAT ::',
    options: ['Docile : Rebellion', 'Voracious : Eat', 'Timid : Leadership', 'Generous : Steal'],
    optionsBn: ['Docile : Rebellion', 'Voracious : Eat', 'Timid : Leadership', 'Generous : Steal'],
    correctIndex: 1,
    explanation: 'A pugnacious person is inclined toward combat. A voracious person is inclined to eat excessively.',
    explanationBn: 'Pugnacious স্বভাবের মানুষ লড়াই বা combat এ লিপ্ত হতে ভালোবাসে। একইভাবে Voracious ব্যক্তি অতিমাত্রায় ভোজন বা eat করতে পছন্দ করে।',
    category: 'english',
    subtopic: 'Analogy',
    examSource: 'BB AD Model Test',
    difficulty: 'hard'
  },
  {
    id: 'e-extra-3',
    question: 'The committee was split on the budget allocation, with several members voicing their strong ______ to the proposed austerity measures.',
    questionBn: 'উপযুক্ত শব্দ বসিয়ে বাক্যটি পূর্ণ করুন: "The committee was split on the budget allocation, with several members voicing their strong ______ to the proposed austerity measures."',
    options: ['aversion', 'acclaim', 'approbation', 'complacency'],
    optionsBn: ['aversion', 'acclaim', 'approbation', 'complacency'],
    correctIndex: 0,
    explanation: '"Aversion" means a strong dislike or disinclination, fitting the context of disagreement over budget cuts.',
    explanationBn: '"Aversion" অর্থ তীব্র বিরোধিতা বা অনীহা, যা বাজেট সংকোচনের প্রতি সদস্যদের দ্বিমতের প্রেক্ষাপটে যথার্থ।',
    category: 'english',
    subtopic: 'Sentence Completion',
    examSource: 'IBA Standard Model',
    difficulty: 'medium'
  },
  // Analytical
  {
    id: 'a-extra-1',
    question: 'Statements: (1) All central banks are regulatory authorities. (2) Some regulatory authorities are government ministries. Conclusions: (I) Some central banks are government ministries. (II) All regulatory authorities are central banks.',
    questionBn: 'বিবৃতি: (১) সকল কেন্দ্রীয় ব্যাংক হলো নিয়ন্ত্রণকারী কর্তৃপক্ষ। (২) কিছু নিয়ন্ত্রণকারী কর্তৃপক্ষ হলো সরকারি মন্ত্রণালয়। সিদ্ধান্ত: (I) কিছু কেন্দ্রীয় ব্যাংক সরকারি মন্ত্রণালয়। (II) সকল নিয়ন্ত্রণকারী কর্তৃপক্ষ কেন্দ্রীয় ব্যাংক।',
    options: ['Neither conclusion I nor II follows', 'Only conclusion I follows', 'Only conclusion II follows', 'Both conclusions follow'],
    optionsBn: ['কোনো সিদ্ধান্তই প্রযোজ্য নয়', 'কেবল সিদ্ধান্ত I প্রযোজ্য', 'কেবল সিদ্ধান্ত II প্রযোজ্য', 'উভয় সিদ্ধান্ত প্রযোজ্য'],
    correctIndex: 0,
    explanation: 'From central banks ⊂ regulators and regulators ∩ ministries ≠ ∅, we cannot establish that central banks intersect with ministries (I fails). Also all regulators need not be central banks (II fails). Neither follows.',
    explanationBn: 'ভেনচিত্র অনুযায়ী সকল কেন্দ্রীয় ব্যাংক নিয়ন্ত্রক হলেও সরকারি মন্ত্রণালয়ের সাথে কেন্দ্রীয় ব্যাংকের নিশ্চিত সংযোগ প্রমাণিত হয় না। আবার সকল নিয়ন্ত্রণকারী কর্তৃপক্ষও কেন্দ্রীয় ব্যাংক নয়। সুতরাং কোনো সিদ্ধান্তই সঠিক নয়।',
    category: 'analytical',
    subtopic: 'Syllogism',
    examSource: 'BB AD Model',
    difficulty: 'medium'
  },
  {
    id: 'a-extra-2',
    question: 'In a code language: "lead bank branch" is written as "pi la ko", "branch manager loan" is written as "ko sa ma", "loan audit lead" is written as "ma tu pi". What is the code for "bank"?',
    questionBn: 'একটি সাংকেতিক ভাষায়: "lead bank branch" লেখা হয় "pi la ko", "branch manager loan" লেখা হয় "ko sa ma", "loan audit lead" লেখা হয় "ma tu pi"। "bank" এর সংকেত কোনটি?',
    options: ['la', 'pi', 'ko', 'sa'],
    optionsBn: ['la', 'pi', 'ko', 'sa'],
    correctIndex: 0,
    explanation: 'Comparing 1st and 2nd: "branch" = "ko". Comparing 1st and 3rd: "lead" = "pi". From 1st ("lead bank branch" = "pi la ko"), remaining word "bank" must be "la".',
    explanationBn: '১ম ও ২য় বাক্য তুলনা করলে: "branch" = "ko"। ১ম ও ৩য় বাক্য তুলনা করলে: "lead" = "pi"। তাহলে ১ম বাক্যের অবশিষ্ট শব্দ "bank" = "la"।',
    category: 'analytical',
    subtopic: 'Coding Logic',
    examSource: 'BIBM Standard Analytical',
    difficulty: 'easy'
  },
  // Bangla
  {
    id: 'bn-extra-1',
    question: '‘স্মৃতিসৌধ’ কোন সমাসের উদাহরণ?',
    questionBn: '‘স্মৃতিসৌধ’ কোন সমাসের উদাহরণ?',
    options: ['মধ্যপদলোপী কর্মধারয়', 'উপমিত কর্মধারয়', 'রূপক কর্মধারয়', 'তৎপুরুষ সমাস'],
    optionsBn: ['মধ্যপদলোপী কর্মধারয়', 'উপমিত কর্মধারয়', 'রূপক কর্মধারয়', 'তৎপুরুষ সমাস'],
    correctIndex: 0,
    explanation: '‘স্মৃতিরক্ষার্থে সৌধ = স্মৃতিসৌধ’। ব্যাসবাক্যের মধ্যবর্তী ‘রক্ষার্থে’ পদটি লোপ পেয়েছে, তাই এটি মধ্যপদলোপী কর্মধারয় সমাস।',
    explanationBn: 'স্মৃতিরক্ষার্থে সৌধ = স্মৃতিসৌধ। মধ্যবর্তী পদ ‘রক্ষার্থে’ লোপ পাওয়ায় এটি মধ্যপদলোপী কর্মধারয় সমাস।',
    category: 'bangla',
    subtopic: 'Somash & Grammar',
    examSource: 'Bangladesh Bank Model',
    difficulty: 'easy'
  },
  {
    id: 'bn-extra-2',
    question: '‘নবান্ন’ নাটকটির রচয়িতা কে?',
    questionBn: '‘নবান্ন’ নাটকটির রচয়িতা কে?',
    options: ['বিজন ভট্টাচার্য', 'উৎপল দত্ত', 'মুনীর চৌধুরী', 'সেলিম আল দীন'],
    optionsBn: ['বিজন ভট্টাচার্য', 'উৎপল দত্ত', 'মুনীর চৌধুরী', 'সেলিম আল দীন'],
    correctIndex: 0,
    explanation: '১৯৪৩ সালের পঞ্চাশের মন্বন্তরের পটভূমিতে রচিত কালজয়ী ‘নবান্ন’ (১৯৪৪) নাটকের রচয়িতা বিজন ভট্টাচার্য।',
    explanationBn: 'বিখ্যাত ‘নবান্ন’ নাটকের রচয়িতা বিজন ভট্টাচার্য (১৯৪৪ সালে ভারতীয় গণনাট্য সংঘ কর্তৃক মঞ্চস্থ)।',
    category: 'bangla',
    subtopic: 'Bengali Drama & Literature',
    examSource: 'Bank Officers Recruitment',
    difficulty: 'medium'
  },
  // Banking GK
  {
    id: 'gk-extra-1',
    question: 'What is the minimum Capital to Risk-Weighted Assets Ratio (CRAR) required for commercial banks in Bangladesh under Basel III guidelines?',
    questionBn: 'ব্যাসেল-৩ (Basel III) কাঠামোর আওতায় বাংলাদেশে বাণিজ্যিক ব্যাংকগুলোর ন্যূনতম মূলধন পর্যাপ্ততার অনুপাত (CRAR) কত শতাংশ নির্ধারণ করা হয়েছে?',
    options: ['10.00% (plus 2.5% conservation buffer)', '8.00%', '15.00%', '12.00%'],
    optionsBn: ['১০.০০% (অতিরিক্ত ২.৫% কনজারভেশন বাফারসহ)', '৮.০০%', '১৫.০০%', '১২.০০%'],
    correctIndex: 0,
    explanation: 'Under Bangladesh Bank\'s Basel III road-map, commercial banks must maintain a minimum CRAR of 10% of Risk-Weighted Assets, plus a Capital Conservation Buffer of 2.5%, totaling 12.5%.',
    explanationBn: 'বাংলাদেশ ব্যাংকের ব্যাসেল-৩ গাইডলাইন অনুযায়ী ব্যাংকগুলোকে ন্যূনতম ১০% মূলধন (CRAR) এবং অতিরিক্ত ২.৫% মূলধন সংরক্ষণ বাফার সংরক্ষণ করতে হয়।',
    category: 'banking_gk',
    subtopic: 'Basel Norms & Bank Capital',
    examSource: 'BB AD Model Test',
    difficulty: 'hard'
  },
  {
    id: 'gk-extra-2',
    question: 'ব্যাংকগুলোতে ‘CAMELS’ রেটিং পদ্ধতির ‘M’ বর্ণটি দ্বারা কী বোঝানো হয়?',
    questionBn: 'ব্যাংকগুলোতে ‘CAMELS’ রেটিং পদ্ধতির ‘M’ বর্ণটি দ্বারা কী বোঝানো হয়?',
    options: ['Management Soundness', 'Monetary Policy', 'Market Capitalization', 'Margin of Safety'],
    optionsBn: ['ম্যানেজমেন্ট সাউন্ডনেস (Management)', 'মনিটারি পলিসি', 'মার্কেট ক্যাপিটালাইজেশন', 'মার্জিন অফ সেফটি'],
    correctIndex: 0,
    explanation: 'CAMELS stands for Capital adequacy, Asset quality, Management, Earnings, Liquidity, and Sensitivity to market risk.',
    explanationBn: 'CAMELS রেটিং এর পূর্ণরূপ: C-Capital Adequacy, A-Asset Quality, M-Management Soundness, E-Earnings, L-Liquidity, S-Sensitivity to Market Risk।',
    category: 'banking_gk',
    subtopic: 'Bank Inspection & Supervision',
    examSource: 'BB Officer Model',
    difficulty: 'easy'
  },
  {
    id: 'gk-extra-3',
    question: 'বাংলাদেশ ব্যাংকের পরিশোধ ব্যবস্থায় আন্তঃব্যাংক ক্ষুদ্রাতিক্ষুদ্র ও দ্রুত অর্থ লেনদেনের জন্য ব্যবহৃত জাতীয় সুইচটির নাম কী?',
    questionBn: 'বাংলাদেশ ব্যাংকের পরিশোধ ব্যবস্থায় আন্তঃব্যাংক এটিএম ও ক্ষুদ্র লেনদেনের জাতীয় প্ল্যাটফর্মটির নাম কী?',
    options: ['NPSB (National Payment Switch Bangladesh)', 'BEFTN', 'SWIFT', 'BACPS'],
    optionsBn: ['এনপিএসবি (NPSB)', 'বিইএফটিএন (BEFTN)', 'সুইফট (SWIFT)', 'বিএসিপিএস (BACPS)'],
    correctIndex: 0,
    explanation: 'NPSB (National Payment Switch Bangladesh) is an electronic platform operated by Bangladesh Bank that facilitates interbank electronic transactions routing among ATMs, POS, and Internet Banking.',
    explanationBn: 'NPSB (National Payment Switch Bangladesh) হলো বাংলাদেশ ব্যাংকের পরিচালিত জাতীয় পেমেন্ট সুইচ, যা আন্তঃব্যাংক এটিএম, পিওএস ও ইন্টারনেট ব্যাংকিং লেনদেন সংযুক্ত করে।',
    category: 'banking_gk',
    subtopic: 'National Payment Systems',
    examSource: 'BB AD Model Test',
    difficulty: 'medium'
  }
];

export const allMockQuestions: Question[] = [
  ...additionalSubjectQuestions,
  // We can also pull in questions from past papers dynamically
];
