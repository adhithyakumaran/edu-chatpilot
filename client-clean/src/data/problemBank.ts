
export type ProblemType = 'coding' | 'aptitude' | 'mcq' | 'hr';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface TestCase {
    input: string;
    output: string;
    isHidden?: boolean;
}

export interface Problem {
    id: string;
    title: string;
    type: ProblemType;
    topic: string;
    difficulty: Difficulty;
    pattern?: string;
    company?: string[];
    description?: string;
    testcases?: TestCase[];
    options?: string[]; // For MCQs
    correctAnswer?: string; // For MCQs - index or value
    solution?: string;
    explanation?: string;
    timeLimit?: number; // In seconds
}

export const problemBank: Problem[] = [
    // --- CODING: ARRAYS & STRINGS ---
    {
        id: "LC_001",
        title: "Two Sum",
        type: "coding",
        topic: "array",
        difficulty: "easy",
        pattern: "hashmap",
        company: ["Amazon", "Google", "Adobe"],
        description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
        testcases: [
            { input: "nums = [2,7,11,15], target = 9", output: "[0,1]" },
            { input: "nums = [3,2,4], target = 6", output: "[1,2]" }
        ],
        timeLimit: 1
    },
    {
        id: "LC_002",
        title: "Best Time to Buy and Sell Stock",
        type: "coding",
        topic: "array",
        difficulty: "easy",
        pattern: "sliding_window",
        company: ["Amazon", "Zoho", "Microsoft"],
        description: "You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.",
        testcases: [
            { input: "prices = [7,1,5,3,6,4]", output: "5" },
            { input: "prices = [7,6,4,3,1]", output: "0" }
        ],
        timeLimit: 1
    },
    {
        id: "LC_015",
        title: "3Sum",
        type: "coding",
        topic: "array",
        difficulty: "medium",
        pattern: "two_pointers",
        company: ["Facebook", "Amazon", "Microsoft"],
        description: "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.",
        testcases: [
            { input: "nums = [-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]" }
        ],
        timeLimit: 2
    },
    {
        id: "LC_053",
        title: "Maximum Subarray",
        type: "coding",
        topic: "array",
        difficulty: "easy",
        pattern: "kadane",
        company: ["Google", "Facebook"],
        description: "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
        testcases: [{ input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6" }],
        timeLimit: 1
    },
    {
        id: "LC_121",
        title: "Contains Duplicate",
        type: "coding",
        topic: "array",
        difficulty: "easy",
        pattern: "hashset",
        company: ["Uber", "Google"],
        description: "Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.",
        testcases: [{ input: "nums = [1,2,3,1]", output: "true" }],
        timeLimit: 1
    },

    // --- CODING: TREES ---
    {
        id: "LC_104",
        title: "Maximum Depth of Binary Tree",
        type: "coding",
        topic: "tree",
        difficulty: "easy",
        pattern: "dfs",
        company: ["LinkedIn", "Uber", "Apple"],
        description: "Given the root of a binary tree, return its maximum depth.",
        testcases: [],
        timeLimit: 1
    },
    {
        id: "LC_226",
        title: "Invert Binary Tree",
        type: "coding",
        topic: "tree",
        difficulty: "easy",
        pattern: "dfs",
        company: ["Google"],
        description: "Given the root of a binary tree, invert the tree, and return its root.",
        testcases: [],
        timeLimit: 1
    },

    // --- GENERATED SYLLABUS CONTENT ---
    ...(() => {
        // --- REAL QUESTION GENERATORS ---
        const generateQuant = (topic: string, i: number) => {
            const n1 = 10 + Math.floor(Math.random() * 50);
            const n2 = 5 + Math.floor(Math.random() * 20);

            if (topic === "Percentages") {
                const res = (n1 * n2) / 100;
                return {
                    desc: `What is ${n2}% of ${n1}?`,
                    opts: [`${res}`, `${res + 5}`, `${res - 2}`, `${res * 2}`],
                    ans: `${res}`,
                    exp: `Calculation: (${n1} * ${n2}) / 100 = ${res}.`
                };
            }
            if (topic === "Profit & Loss") {
                const cp = n1 * 10;
                const sp = cp + (cp * 0.2); // 20% profit
                return {
                    desc: `A shopkeeper buys an item for $${cp} and sells it for $${sp}. What is the profit percentage?`,
                    opts: ["20%", "25%", "10%", "15%"],
                    ans: "20%",
                    exp: `Profit = SP - CP = ${sp - cp}. Profit % = (Profit/CP) * 100 = 20%.`
                };
            }
            if (topic === "Time & Work") {
                const a = 10, b = 15;
                return {
                    desc: `A can do a piece of work in ${a} days and B in ${b} days. In how many days can they complete it together?`,
                    opts: ["6 days", "5 days", "8 days", "7.5 days"],
                    ans: "6 days",
                    exp: `Formula: (A*B)/(A+B) = (150/25) = 6 days.`
                };
            }
            if (topic === "Time, Speed & Distance") {
                return {
                    desc: `A car travels ${n1 * 10} km in ${n2} hours. What is its speed?`,
                    opts: [`${(n1 * 10) / n2} km/hr`, "45 km/hr", "60 km/hr", "55 km/hr"], // approx options
                    ans: `${(n1 * 10) / n2} km/hr`, // Assuming distinct for simplicity or formatting
                    exp: `Speed = Distance / Time.`
                };
            }
            // Fallback for other Quant topics with generic but realistic numbers
            return {
                desc: `[${topic}] Calculate the value of X if 2X + ${n2} = ${n1 * 2}.`,
                opts: [`${(n1 * 2 - n2) / 2}`, `${n1}`, `${n2}`, "0"],
                ans: `${(n1 * 2 - n2) / 2}`,
                exp: `Solving linear equation: 2X = ${n1 * 2} - ${n2}.`
            };
        };

        const generateLogical = (topic: string, i: number) => {
            if (topic === "Number Series") {
                return {
                    desc: `Find the next number in the series: 2, 4, 8, 16, ?`,
                    opts: ["32", "30", "24", "18"],
                    ans: "32",
                    exp: "The series doubles each time."
                };
            }
            if (topic === "Blood Relations") {
                return {
                    desc: "Pointing to a man, a woman said, 'His mother is the only daughter of my mother.' How is the woman related to the man?",
                    opts: ["Mother", "Sister", "Aunt", "Grandmother"],
                    ans: "Mother",
                    exp: "Only daughter of my mother = Myself. So, his mother is the woman herself."
                };
            }
            return {
                desc: `[${topic}] Identify the logic in the pattern: A -> C, B -> D, C -> ?`,
                opts: ["E", "F", "G", "H"],
                ans: "E",
                exp: "Skip one letter: A(+2)=C, B(+2)=D, C(+2)=E."
            };
        };

        const generateVerbal = (topic: string, i: number) => {
            if (topic === "Synonyms") {
                return {
                    desc: "Choose the synonym of: HAPPY",
                    opts: ["Joyful", "Sad", "Angry", "Tired"],
                    ans: "Joyful",
                    exp: "Joyful means expressionng great happiness."
                };
            }
            if (topic === "Antonyms") {
                return {
                    desc: "Choose the antonym of: FAST",
                    opts: ["Slow", "Quick", "Rapid", "Swift"],
                    ans: "Slow",
                    exp: "Slow is the opposite of Fast."
                };
            }
            return {
                desc: `[${topic}] Fill in the blank: The sun ___ in the east.`,
                opts: ["rises", "rose", "rising", "rise"],
                ans: "rises",
                exp: "Universal truth uses Simple Present Tense."
            };
        };

        // --- MASTER GENERATOR ---
        const SYLLABUS = {
            quant: ["Percentages", "Profit & Loss", "Time & Work", "Time, Speed & Distance", "Algebra", "Averages", "Simple & Compound Interest"],
            logical: ["Number Series", "Blood Relations", "Coding & Decoding", "Directions", "Syllogisms"],
            verbal: ["English Grammar", "Synonyms", "Antonyms", "Reading Comprehension", "Tenses"],
            non_verbal: ["Series Completion", "Pattern Matching", "Mirror Images"]
        };

        const createProb = (id: string, type: 'aptitude' | 'mcq', topic: string, cat: string, genFn: any, idx: number) => {
            const content = genFn(topic, idx);
            return {
                id,
                title: `${topic} Question`,
                type,
                topic: cat,
                difficulty: "easy" as const,
                description: content.desc,
                options: content.opts,
                correctAnswer: content.ans,
                explanation: content.exp
            };
        };

        return [
            ...SYLLABUS.quant.flatMap((t, i) => Array.from({ length: 4 }, (_, j) => createProb(`Q_QUANT_${i}_${j}`, 'aptitude', t, 'quant', generateQuant, j))),
            ...SYLLABUS.logical.flatMap((t, i) => Array.from({ length: 3 }, (_, j) => createProb(`Q_LOGIC_${i}_${j}`, 'mcq', t, 'logical', generateLogical, j))),
            ...SYLLABUS.verbal.flatMap((t, i) => Array.from({ length: 3 }, (_, j) => createProb(`Q_VERBAL_${i}_${j}`, 'mcq', t, 'verbal', generateVerbal, j))),
            ...SYLLABUS.non_verbal.flatMap((t, i) => Array.from({ length: 2 }, (_, j) => createProb(`Q_NONVERBAL_${i}_${j}`, 'mcq', t, 'non_verbal', generateLogical, j))) // Re-using logical gen for simple placeholder on Image-likes
        ];
    })()
];
