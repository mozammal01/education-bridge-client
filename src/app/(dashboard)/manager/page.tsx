"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, BookOpen, MessageSquare, BarChart3, TrendingUp, Users } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { DashboardCharts } from "@/components/dashboard/overview-charts";

export default function ManagerOverview() {
  const { user } = useAuth();

  const stats = [
    { label: "Pending Reviews", value: "12", icon: MessageSquare, color: "text-amber-600", bg: "bg-amber-100" },
    { label: "Active Blogs", value: "48", icon: BookOpen, color: "text-primary", bg: "bg-primary/10" },
    { label: "Content Flags", value: "3", icon: Shield, color: "text-destructive", bg: "bg-destructive/10" },
    { label: "Avg. Engagement", value: "92%", icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-100" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold italic underline decoration-primary/30 underline-offset-8">
          Manager <span className="text-primary italic">Command Center</span>
        </h1>
        <p className="text-muted-foreground mt-2">Welcome back, {user?.name}. Monitor and moderate the Education Bridge community.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-none shadow-lg shadow-black/5 hover:scale-[1.02] transition-transform">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl ${stat.bg}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-black">{stat.value}</p>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <DashboardCharts bookings={[]} isLoading={false} />

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-none shadow-xl">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Recent Content Flags
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-muted/40">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center text-destructive font-bold">!</div>
                    <div>
                      <p className="font-bold text-sm">Suspicious Review #{1024 + i}</p>
                      <p className="text-xs text-muted-foreground">Reported by User #{i * 3}</p>
                    </div>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-destructive/10 text-destructive text-[10px] font-bold uppercase">Critical</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-xl">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Moderator Shortcuts
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-primary/5 hover:bg-primary/10 cursor-pointer transition-colors border border-primary/10">
              <p className="font-bold text-sm mb-1">Audit Reviews</p>
              <p className="text-[10px] text-muted-foreground">Batch approve/reject</p>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100 cursor-pointer transition-colors border border-emerald-200">
              <p className="font-bold text-sm mb-1 text-emerald-700">Publish Blog</p>
              <p className="text-[10px] text-emerald-600/70">Drafts pending: 4</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
