import { FolderKanban, ListTodo, Users, Trophy } from 'lucide-react';

export default function StatsOverview({ data }: { data: any }) {
    const stats = [
        {
            label: 'My Projects',
            value: data?.projectsCompleted || '0',
            subtext: 'Resume-ready',
            icon: FolderKanban,
            color: 'bg-violet-500',
            lightColor: 'bg-violet-50'
        },
        {
            label: 'My Tasks',
            value: data?.tasksPending || '0',
            subtext: 'Pending',
            icon: ListTodo,
            color: 'bg-blue-500',
            lightColor: 'bg-blue-50'
        },
        {
            label: 'Assessments',
            value: data?.mockInterviews || '0',
            subtext: 'Completed',
            icon: Users,
            color: 'bg-orange-500',
            lightColor: 'bg-orange-50'
        },
        {
            label: 'Skill Score',
            value: `${data?.placementScore || 0}%`,
            subtext: 'Competency',
            icon: Trophy,
            color: 'bg-green-500',
            lightColor: 'bg-green-50'
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                    <div className={`w-14 h-14 rounded-xl ${stat.lightColor} flex items-center justify-center`}>
                        <stat.icon className={`w-7 h-7 ${stat.color.replace('bg-', 'text-')}`} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                        <p className="text-sm font-medium text-gray-900">{stat.label}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{stat.subtext}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
