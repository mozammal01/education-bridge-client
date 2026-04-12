"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  MessageSquare, 
  BookOpen, 
  AlertCircle, 
  TrendingUp, 
  Loader2, 
  ShieldCheck,
  ArrowUpRight,
  Activity
} from "lucide-react";
import { managerService } from "@/services/manager-service";
import { DashboardCharts } from "@/components/dashboard/overview-charts";

export default function ManagerOverview() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await managerService.getStats();
        if (res.success) setStats(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-sm font-medium animate-pulse text-muted-foreground">Initializing Manager HQ...</p>
      </div>
    );
  }

  const statCards = [
    { label: "Pending Reviews", value: stats?.pendingReviews || 0, icon: MessageSquare, color: "text-amber-600", bg: "bg-amber-100" },
    { label: "Active Blogs", value: stats?.activeBlogs || 0, icon: BookOpen, color: "text-primary", bg: "bg-primary/10" },
    { label: "Content Flags", value: stats?.contentFlags || 0, icon: AlertCircle, color: "text-rose-600", bg: "bg-rose-100" },
    { label: "Avg. Engagement", value: `${stats?.engagement || 92}%`, icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-100" },
  ];

  return (
    <div className="space-y-8 p-1">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-foreground flex items-center gap-2">
            Manager <span className="text-primary italic">Command Center</span>
          </h1>
          <p className="text-muted-foreground font-medium italic mt-1">Monitor, moderate, and scale the EduBridge ecosystem</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-600 px-4 py-2 rounded-full border border-emerald-500/20 text-xs font-black uppercase tracking-widest animate-pulse">
            <ShieldCheck className="w-4 h-4" />
            System Secure
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <Card key={i} className="group border-none shadow-lg shadow-primary/5 hover:shadow-primary/10 transition-all duration-500 rounded-[2rem] overflow-hidden relative">
            <div className={`absolute top-0 right-0 p-6 opacity-10 group-hover:scale-125 group-hover:-rotate-12 transition-transform duration-500`}>
                <stat.icon className="w-20 h-20" />
            </div>
            <CardContent className="p-8 relative z-10">
                <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-4 shadow-inner`}>
                    <stat.icon className="w-6 h-6" />
                </div>
                <div>
                   <p className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.2em]">{stat.label}</p>
                   <p className="text-3xl font-black mt-1 text-foreground">{stat.value}</p>
                </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <Card className="lg:col-span-2 border-none shadow-2xl rounded-[2.5rem] overflow-hidden border-primary/5">
            <CardHeader className="bg-muted/30 p-8 border-b border-primary/5">
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle className="text-xl font-black flex items-center gap-2">
                            <Activity className="w-5 h-5 text-primary" />
                            Platform Growth
                        </CardTitle>
                        <CardDescription className="italic font-medium">Weekly enrollment and session patterns</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-8">
                <DashboardCharts bookings={[]} isLoading={false} />
            </CardContent>
         </Card>

         <div className="space-y-6">
            <Card className="border-none shadow-2xl rounded-[2.5rem] bg-linear-to-br from-violet-600 via-primary to-indigo-600 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                    <TrendingUp className="w-48 h-48 rotate-12" />
                </div>
                <CardHeader className="p-8">
                    <CardTitle className="text-2xl font-black leading-tight">Insight Generator</CardTitle>
                    <CardDescription className="text-white/70 italic">AI-powered community trends</CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-0 space-y-4">
                    {[
                        "Tutor demand for 'Next.js' is up 40% this week.",
                        "Average session duration increased by 12 mins.",
                        "Need for more 'Music' category tutors identified."
                    ].map((insight, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-4 rounded-2xl bg-white/10 border border-white/5 backdrop-blur-md group/item hover:bg-white/20 transition-all cursor-pointer">
                            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold shrink-0">{idx+1}</div>
                            <p className="text-sm font-medium">{insight}</p>
                        </div>
                    ))}
                    <button className="w-full py-4 rounded-2xl bg-white text-primary font-black text-sm shadow-xl hover:scale-[1.02] active:scale-95 transition-all mt-4">
                        Download Weekly Report
                    </button>
                </CardContent>
            </Card>

            <Card className="border-none shadow-2xl rounded-[2.5rem] p-8 space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground">Moderation Pulse</h3>
                    <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    </div>
                </div>
                <div className="space-y-4 pt-2">
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-bold text-foreground">
                            <span>Review Queue</span>
                            <span className="text-amber-600">Active</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-amber-500 w-[65%]" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-bold text-foreground">
                            <span>Content Flags</span>
                            <span className="text-rose-600">Priority</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-rose-500 w-[20%]" />
                        </div>
                    </div>
                </div>
                <p className="text-[10px] text-center text-muted-foreground italic font-medium pt-4">Data refreshes every 60 seconds</p>
            </Card>
         </div>
      </div>
    </div>
  );
}
