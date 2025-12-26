"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessageSquare, CheckCircle, Smartphone, ArrowUpRight, Loader2 } from "lucide-react";
import MessageTrend from "@/components/dashboard/MessageTrend";

interface Stats {
    totalUsers: number;
    inboundMessages: number;
    outboundMessages: number;
    flowCompletions: number;
}

export default function DashboardPage() {
    const [stats, setStats] = useState<Stats | null>(null);

    useEffect(() => {
        api.get("/api/analytics/dashboard")
            .then((res) => {
                setStats(res.data);
            })
            .catch(console.error);
    }, []);

    if (!stats) {
        return (
            <div className="h-[50vh] flex items-center justify-center">
                <Loader2 className="h-8 w-8 text-green-600 animate-spin" />
            </div>
        )
    }

    const statCards = [
        { title: "Total Users", value: stats.totalUsers, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
        { title: "Inbound Messages", value: stats.inboundMessages, icon: MessageSquare, color: "text-green-600", bg: "bg-green-50" },
        { title: "Outbound Messages", value: stats.outboundMessages, icon: MessageSquare, color: "text-purple-600", bg: "bg-purple-50" },
        { title: "Flows Completed", value: stats.flowCompletions, icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">Dashboard Overview</h2>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-500">Live Data</span>
                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {statCards.map((stat) => (
                    <Card key={stat.title} className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-slate-500">
                                {stat.title}
                            </CardTitle>
                            <div className={`p-2 rounded-lg ${stat.bg}`}>
                                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                            <p className="text-xs text-slate-500 mt-1 flex items-center">
                                <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                                <span className="text-green-600 font-medium">Active</span>
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 bg-white border-slate-200 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold text-slate-900">Message Trends</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-0">
                        <MessageTrend />
                    </CardContent>
                </Card>

                <Card className="col-span-3 bg-white border-slate-200 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold text-slate-900">System Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                                <span className="text-sm font-medium text-slate-700">WhatsApp Engine</span>
                                <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded-full">Operational</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                                <span className="text-sm font-medium text-slate-700">Database</span>
                                <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded-full">Connected</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                                <span className="text-sm font-medium text-slate-700">Media Storage</span>
                                <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded-full">Ready</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
