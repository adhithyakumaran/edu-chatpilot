'use client';

import { CheckSquare, ArrowRight, MoreHorizontal } from 'lucide-react';

export default function DailyHabits() {
    const todos = [
        { task: 'Complete Java OOP class', completed: false, id: 1 },
        { task: 'Solve 3 DSA problems', completed: false, id: 2 },
        { task: 'Submit Mini Project', completed: false, id: 3 },
        { task: 'Book Mock Interview', completed: false, id: 4 },
        { task: 'Update Resume', completed: false, id: 5 },
    ];

    return (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-full">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="font-bold text-lg text-gray-900">Daily Goals</h3>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mt-1">Productivity Tracker</p>
                </div>
                <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <CheckSquare className="w-5 h-5 text-gray-400" />
                </button>
            </div>

            <div className="space-y-4">
                {todos.map((todo) => (
                    <div key={todo.id} className="flex items-center gap-3 group cursor-pointer hover:bg-gray-50 p-2 rounded-lg -mx-2 transition-colors">
                        <div className="w-5 h-5 rounded border-2 border-gray-300 group-hover:border-brand-primary flex items-center justify-center transition-colors">
                            {/* Checkbox logic would go here */}
                        </div>
                        <span className="text-gray-700 font-medium text-sm flex-1">{todo.task}</span>
                        <MoreHorizontal className="w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                ))}
            </div>

            <div className="mt-8 pt-4 border-t border-gray-50 flex items-center justify-between text-xs font-bold text-gray-500">
                <span>0/5 Completed</span>
                <button className="text-brand-primary hover:text-brand-secondary flex items-center gap-1">
                    View All <ArrowRight className="w-3 h-3" />
                </button>
            </div>
        </div>
    );
}
