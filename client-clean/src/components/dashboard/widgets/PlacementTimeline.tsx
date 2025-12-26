import { Clock, CheckCircle2, Video, Calendar, Users } from 'lucide-react';

export default function PlacementTimeline({ events }: { events: any[] }) {
    const displayEvents = events || [];

    return (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="font-bold text-lg text-gray-900">Learning Journey</h3>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mt-1">Upcoming Activity</p>
                </div>
                <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <Calendar className="w-5 h-5 text-gray-400" />
                </button>
            </div>

            <div className="relative pl-4 space-y-8 before:absolute before:inset-0 before:left-4 before:h-full before:w-0.5 before:bg-gray-100">
                {displayEvents.map((event, index) => (
                    <div key={index} className="relative pl-8">
                        {/* Dot */}
                        <div className={`absolute left-[-5px] top-1 w-3 h-3 rounded-full border-2 border-white ${event.completed ? 'bg-green-500 ring-4 ring-green-50' : 'bg-gray-300'}`}></div>

                        <div className="flex items-center justify-between group">
                            <div>
                                <h4 className={`font-bold ${event.completed ? 'text-gray-900' : 'text-gray-500'}`}>{event.title}</h4>
                                <div className="flex items-center gap-2 mt-1 text-xs text-gray-400 font-medium">
                                    <Clock className="w-3 h-3" />
                                    <span>{event.time}</span>
                                </div>
                            </div>

                            {/* Icon Type */}
                            <div className="bg-gray-50 p-2 rounded-lg text-gray-400 group-hover:text-brand-primary group-hover:bg-brand-primary/5 transition-colors">
                                {event.type === 'class' && <Video className="w-4 h-4" />}
                                {event.type === 'test' && <CheckCircle2 className="w-4 h-4" />}
                                {event.type === 'meeting' && <Users className="w-4 h-4" />} {/* Need to import Users if used, or use generic icon */}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 pt-4 border-t border-gray-50 text-center">
                <button className="text-xs font-bold text-brand-primary hover:text-brand-secondary uppercase tracking-widest">
                    View Full Schedule
                </button>
            </div>
        </div>
    );
}

