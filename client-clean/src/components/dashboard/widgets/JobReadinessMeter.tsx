'use client';



export default function JobReadinessMeter({ readiness }: { readiness: any }) {
    // Calculate average or use coding score as main if preferred, here using average of 3
    const avgScore = readiness
        ? Math.round((readiness.coding + readiness.projects + readiness.interview) / 3)
        : 0;

    const percentage = avgScore || 0;

    // Custom stats for breakdown
    const stats = [
        { label: 'Coding', value: `${readiness?.coding || 0}%`, color: 'bg-blue-500' },
        { label: 'Projects', value: `${readiness?.projects || 0}%`, color: 'bg-violet-500' },
        { label: 'Interview', value: `${readiness?.interview || 0}%`, color: 'bg-orange-500' },
    ];

    return (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col h-full">
            <h3 className="font-bold text-lg text-gray-900 mb-6">Competency Level</h3>

            <div className="flex items-center gap-8">
                {/* Circular Meter (Simulated with simple SVG if dependency missing, or just simple UI) */}
                {/* Since we might not have react-circular-progressbar installed, let's use a custom SVG implementation to be safe and dependency-free */}

                <div className="relative w-32 h-32 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="#f3f4f6"
                            strokeWidth="12"
                            fill="none"
                        />
                        <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="#8B5CF6"
                            strokeWidth="12"
                            fill="none"
                            strokeDasharray={351} // 2 * pi * 56
                            strokeDashoffset={351 - (351 * percentage) / 100}
                            strokeLinecap="round"
                            className="transition-all duration-1000 ease-out"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold text-gray-900">{percentage}%</span>
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Proficient</span>
                    </div>
                </div>

                {/* Breakdown Stats */}
                <div className="flex-1 space-y-4">
                    {stats.map((stat, index) => (
                        <div key={index}>
                            <div className="flex justify-between text-xs font-medium mb-1.5">
                                <span className="text-gray-500">{stat.label}</span>
                                <span className="text-gray-900">{stat.value}</span>
                            </div>
                            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full ${stat.color}`}
                                    style={{ width: stat.value }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
