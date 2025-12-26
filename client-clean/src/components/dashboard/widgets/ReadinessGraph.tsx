'use client';

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

export default function ReadinessGraph() {
    const data = [
        { day: 'Mon', score: 25 },
        { day: 'Tue', score: 28 },
        { day: 'Wed', score: 35 },
        { day: 'Thu', score: 42 },
        { day: 'Fri', score: 48 },
        { day: 'Sat', score: 52 },
        { day: 'Sun', score: 58 },
    ];

    return (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="font-bold text-lg text-gray-900">Growth Tracker</h3>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mt-1">Weekly Progress</p>
                </div>
                <div className="bg-brand-primary/10 text-brand-primary px-3 py-1 rounded-full text-xs font-bold">
                    +15% this week
                </div>
            </div>

            <div className="flex-1 w-full min-h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis
                            dataKey="day"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9CA3AF', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            hide
                            domain={[0, 100]}
                        />
                        <Tooltip
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            cursor={{ stroke: '#8B5CF6', strokeWidth: 1, strokeDasharray: '4 4' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="score"
                            stroke="#8B5CF6"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorScore)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
