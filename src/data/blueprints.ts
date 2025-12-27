
import { Difficulty, ProblemType } from "./problemBank";

export interface SectionConfig {
    type: ProblemType;
    topic?: string;
    difficulty?: Difficulty;
    count: number;
    title: string;
}

export interface TestBlueprint {
    id: string;
    name: string;
    description: string;
    duration: number; // in minutes
    totalQuestions: number;
    sections: SectionConfig[];
    passScore: number;
}

export const blueprints: TestBlueprint[] = [
    {
        id: "PRS-1",
        name: "PRS 1 – Screening Round",
        description: "Simulates initial screening rounds of TCS, Accenture, and Infosys.",
        duration: 90,
        totalQuestions: 32,
        passScore: 60,
        sections: [
            { title: "Aptitude MCQs", type: "aptitude", count: 20 },
            { title: "Logical Reasoning", type: "mcq", count: 10 },
            { title: "Coding Challenge", type: "coding", difficulty: "easy", count: 2 }
        ]
    },
    {
        id: "PRS-2",
        name: "PRS 2 – Core Coding Round",
        description: "Simulates Zoho and Product-based startup rounds. High pressure.",
        duration: 90,
        totalQuestions: 3,
        passScore: 70,
        sections: [
            { title: "Easy Problem", type: "coding", difficulty: "easy", count: 1 },
            { title: "Medium Problem", type: "coding", difficulty: "medium", count: 1 },
            { title: "Medium-Hard Problem", type: "coding", difficulty: "medium", count: 1 } // Using medium as proxy for now
        ]
    },
    {
        id: "PRS-3",
        name: "PRS 3 – DSA & Patterns",
        description: "Simulates Amazon & Walmart rounds. Focus on Trees, DP, Graphs.",
        duration: 120,
        totalQuestions: 4,
        passScore: 75,
        sections: [
            { title: "Tree/Graph Problem", type: "coding", topic: "tree", count: 2 },
            { title: "DP/Array Problem", type: "coding", topic: "array", count: 2 }
        ]
    },
    {
        id: "PRS-4",
        name: "PRS 4 – System & Logic",
        description: "Simulates tech discussion rounds. Logic + System Design + Database.",
        duration: 90,
        totalQuestions: 13,
        passScore: 65,
        sections: [
            { title: "Technical MCQs (OS/DB)", type: "mcq", count: 10 },
            { title: "Logic Building", type: "coding", difficulty: "medium", count: 2 },
            // System design logic would go here
        ]
    },
    {
        id: "PRS-5",
        name: "PRS 5 – Final Placement Mock",
        description: "The ultimate check. Full spectrum testing including HR readiness.",
        duration: 120,
        totalQuestions: 40,
        passScore: 80,
        sections: [
            { title: "Full Aptitude", type: "aptitude", count: 20 },
            { title: "Coding Round", type: "coding", count: 3 },
            { title: "HR Situational", type: "hr", count: 5 }
        ]
    }
];
