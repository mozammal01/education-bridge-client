"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, Award, Calendar, Loader2, Target, Zap } from "lucide-react";
import { DashboardCharts } from "@/components/dashboard/overview-charts";

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-sm font-medium animate-pulse">Aggregating performance metrics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-foreground">Advanced Analytics</h1>
          <p className="text-muted-foreground italic font-medium">Deep dive into institutional performance and tutor efficiency</p>
        </div>
        <div className="flex gap-2">
            <div className="bg-primary/5 border border-primary/10 rounded-full px-4 py-2 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-primary">Live Data Active</span>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Completion Rate", value: "94%", icon: Target, color: "text-emerald-600", bg: "bg-emerald-100" },
            { label: "Active Sessions", value: "156", icon: Zap, color: "text-amber-600", bg: "bg-amber-100" },
            { label: "Satisfaction", value: "4.9/5", icon: Award, color: "text-primary", bg: "bg-primary/10" },
            { label: "Growth", value: "+22%", icon: TrendingUp, color: "text-violet-600", bg: "bg-violet-100" },
          ].map((stat, i) => (
            <Card key={i} className="border-none shadow-md overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-2 opacity-5 translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform">
                    <stat.icon className="w-16 h-16" />
                </div>
                <CardContent className="p-6">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">{stat.label}</p>
                    <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
                </CardContent>
            </Card>
          ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 border-none shadow-xl rounded-3xl overflow-hidden min-h-[400px]">
             <CardHeader className="bg-primary/5 pb-2">
                <CardTitle className="text-lg font-black flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Student Engagement Trends
                </CardTitle>
                <CardDescription>Monthly growth and interaction levels across all institutions</CardDescription>
             </CardHeader>
             <CardContent className="p-6">
                <DashboardCharts bookings={[]} isLoading={false} />
             </CardContent>
          </Card>

          <div className="space-y-6">
             <Card className="border-none shadow-xl rounded-3xl bg-linear-to-br from-violet-600 to-primary text-white">
                <CardHeader>
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Quick Insights
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="p-4 rounded-2xl bg-white/10 border border-white/10">
                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-1">Top Performer</p>
                        <p className="text-sm font-black italic">Global Academy North</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/10 border border-white/10">
                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-1">Peak Time</p>
                        <p className="text-sm font-black italic">Tuesday @ 4:00 PM</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/10 border border-white/10">
                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-1">Most Popular</p>
                        <p className="text-sm font-black italic">Programming Elite</p>
                    </div>
                </CardContent>
             </Card>

             <Card className="border-none shadow-xl rounded-3xl overflow-hidden border-primary/5">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground">Resource Usage</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-1">
                        <div className="flex justify-between text-xs font-bold px-1">
                            <span>Video Calls</span>
                            <span>88%</span>
                        </div>
                        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary w-[88%]" />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <div className="flex justify-between text-xs font-bold px-1">
                            <span>File Sharing</span>
                            <span>45%</span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 w-[45%]" />
                        </div>
                    </div>
                </CardContent>
             </Card>
          </div>
      </div>
    </div>
  );
}
