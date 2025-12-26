
import { blueprints, TestBlueprint } from "../data/blueprints";
import { problemBank, Problem } from "../data/problemBank";

export interface ActiveTestSession {
    sessionId: string;
    blueprintId: string;
    startTime: number;
    problems: Problem[];
    answers: Record<string, string>; // problemId -> answer/code
    status: 'in-progress' | 'completed';
}

export const TestEngine = {
    // START ENGINE
    assembleTest: (blueprintId: string): ActiveTestSession => {
        const blueprint = blueprints.find(b => b.id === blueprintId);
        if (!blueprint) throw new Error("Invalid Blueprint ID");

        let selectedProblems: Problem[] = [];

        // For each section in blueprint, pick random problems from bank
        blueprint.sections.forEach(section => {
            // FILTER logic updated for Syllabus Categories
            const matches = problemBank.filter(p => {
                if (section.type === 'coding') return p.type === 'coding';

                // For 'aptitude' sections in blueprint, we want Quant
                if (section.type === 'aptitude') return p.topic === 'quant';

                // For 'mcq' sections, we want a mix of Logical, Verbal, Non-Verbal
                if (section.type === 'mcq') {
                    return ['logical', 'verbal', 'non_verbal'].includes(p.topic);
                }

                return p.type === section.type;
            });

            // Random shuffle and pick distinct topics if possible
            const shuffled = matches.sort(() => 0.5 - Math.random());

            // Try to pick unique topics to avoid "2 Profit & Loss questions" if possible
            const pickedIds = new Set();
            const picked: Problem[] = [];

            for (const p of shuffled) {
                // Extract topic name from title (e.g. "Percentages Problem")
                const topicName = p.title.split(' Problem')[0];

                // Allow picking if we haven't filled count, trying to keep topics unique
                if (picked.length < section.count) {
                    picked.push(p);
                }
            }

            selectedProblems = [...selectedProblems, ...picked];
        });

        // 2. SORT QUESTIONS: Coding questions last, similar types together
        selectedProblems.sort((a, b) => {
            const typeOrder: Record<string, number> = { 'aptitude': 1, 'mcq': 2, 'hr': 3, 'coding': 4 };
            return (typeOrder[a.type] || 99) - (typeOrder[b.type] || 99);
        });

        return {
            sessionId: `${blueprintId}_${Date.now()}`,
            blueprintId,
            startTime: Date.now(),
            problems: selectedProblems,
            answers: {},
            status: 'in-progress'
        };
    },

    getBlueprint: (id: string) => blueprints.find(b => b.id === id),

    getAllBlueprints: () => blueprints
};
