"use client";

import { cn } from "@/lib/utils";
import { 
  Users, 
  Star, 
  MessageCircle, 
  TrendingUp, 
  ArrowUpRight, 
  Target, 
  BarChart3, 
  PieChart as PieChartIcon, 
  Zap,
  Globe,
  Clock,
  Layers,
  Award
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui";
import { DashboardCharts } from "../overview-charts";

export function AnalyticsView() {
  const stats = [
    { label: "Profile Views", value: "2,481", growth: "+18%", icon: Users, color: "text-blue-600", bg: "bg-blue-100" },
    { label: "Avg. Response", value: "14m", growth: "-2m", icon: Clock, color: "text-emerald-600", bg: "bg-emerald-100" },
    { label: "Completion Rate", value: "99.2%", growth: "+0.5%", icon: Target, color: "text-violet-600", bg: "bg-violet-100" },
    { label: "Top Percentile", value: "Top 2%", growth: "Gold Tier", icon: Award, color: "text-amber-600", bg: "bg-amber-100" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-black tracking-tight">Channel <span className="text-primary italic">Intelligence</span></h1>
        <p className="text-muted-foreground font-medium italic">Deep dive into your teaching performance and student engagement</p>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="border-none shadow-xl shadow-primary/5 rounded-[2.5rem] bg-card hover:scale-[1.02] transition-transform cursor-default">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-4">
                <div className={cn("p-3 rounded-2xl", stat.bg)}>
                  <stat.icon className={cn("w-6 h-6", stat.color)} />
                </div>
                <Badge variant="outline" className="rounded-full font-black text-[10px] tracking-widest border-primary/10 italic text-primary">
                  {stat.growth}
                </Badge>
              </div>
              <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-1">{stat.label}</p>
              <h3 className="text-3xl font-black">{stat.value}</h3>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Performance Graph */}
        <Card className="lg:col-span-2 border-none shadow-2xl rounded-[3rem] overflow-hidden bg-white dark:bg-slate-950 p-10">
           <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-2xl font-black">Engagement <span className="text-primary italic">Trends</span></h3>
                    <p className="text-sm text-muted-foreground font-medium italic">Visualization of active student hours vs booked slots</p>
                </div>
                <div className="flex gap-2">
                    <Badge className="bg-primary/10 text-primary border-none rounded-full px-4 h-8 flex items-center font-bold">Standard View</Badge>
                </div>
           </div>
           <div className="h-[400px]">
                <DashboardCharts bookings={[] as any} isLoading={false} />
           </div>
        </Card>

        {/* Breakdown Stats */}
        <div className="space-y-6">
            <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden bg-linear-to-br from-slate-900 to-black text-white p-10 h-full flex flex-col justify-between">
                <div>
                    <div className="p-3 bg-white/10 rounded-2xl w-fit mb-6">
                        <TrendingUp className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-2xl font-black mb-4 leading-tight">Demand Peak <br/><span className="text-primary italic">Distribution</span></h3>
                    
                    <div className="space-y-6">
                         {[
                             { label: "Advanced Calculus", pct: 78, color: "bg-primary" },
                             { label: "Organix Chemistry", pct: 45, color: "bg-violet-500" },
                             { label: "Mechanics IB", pct: 32, color: "bg-emerald-500" }
                         ].map((item, i) => (
                             <div key={i} className="space-y-2">
                                <div className="flex justify-between text-xs font-black uppercase tracking-widest opacity-80">
                                    <span>{item.label}</span>
                                    <span>{item.pct}%</span>
                                </div>
                                <Progress value={item.pct} className="h-1.5 bg-white/10" />
                             </div>
                         ))}
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 mt-8">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center font-black text-primary text-xl">4.9</div>
                        <div>
                            <p className="text-xs font-black uppercase tracking-widest text-primary">Global Rank</p>
                            <p className="text-[10px] italic text-white/50">Top Performance across all categories</p>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
      </div>

      {/* Secondary Metrics */}
      <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-none shadow-xl shadow-primary/5 rounded-[2.5rem] bg-card p-8">
              <div className="flex items-center gap-4 mb-4">
                  <div className="p-2.5 bg-indigo-100/50 rounded-xl">
                      <Globe className="w-5 h-5 text-indigo-600" />
                  </div>
                  <h4 className="font-black text-sm uppercase tracking-wider">Geographic Reach</h4>
              </div>
              <p className="text-2xl font-black mb-1">12 Countries</p>
              <p className="text-xs text-muted-foreground font-medium italic">Primary markets: UK, UAE, USA</p>
          </Card>

          <Card className="border-none shadow-xl shadow-primary/5 rounded-[2.5rem] bg-card p-8">
              <div className="flex items-center gap-4 mb-4">
                  <div className="p-2.5 bg-rose-100/50 rounded-xl">
                      <Layers className="w-5 h-5 text-rose-600" />
                  </div>
                  <h4 className="font-black text-sm uppercase tracking-wider">Repeat Students</h4>
              </div>
              <p className="text-2xl font-black mb-1">84%</p>
              <p className="text-xs text-muted-foreground font-medium italic">Industry average is ~45%</p>
          </Card>

          <Card className="border-none shadow-xl shadow-primary/5 rounded-[2.5rem] bg-card p-8 group">
              <div className="flex items-center gap-4 mb-4">
                  <div className="p-2.5 bg-emerald-100/50 rounded-xl">
                      <Zap className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h4 className="font-black text-sm uppercase tracking-wider">Instant Feedback</h4>
              </div>
              <p className="text-2xl font-black mb-1">98% Positive</p>
              <p className="text-xs text-muted-foreground font-medium italic">Based on last 500 sessions</p>
          </Card>
      </div>
    </div>
  );
}
