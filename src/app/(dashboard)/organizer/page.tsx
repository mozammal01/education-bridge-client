"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Landmark, Users, Globe, PieChart, BarChart3, Loader2 } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { DashboardCharts } from "@/components/dashboard/overview-charts";
import { organizerService } from "@/services/organizer-service";

export default function OrganizerOverview() {
  const { user } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [institutions, setInstitutions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, instRes] = await Promise.all([
          organizerService.getStats(),
          organizerService.getInstitutions()
        ]);
        if (statsRes.success) setStats(statsRes.data);
        if (instRes.success) setInstitutions(instRes.data);
      } catch (error) {
        console.error("Failed to fetch organizer data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const statCards = [
    { label: "My Institutions", value: stats?.institutionCount || "0", icon: Landmark, color: "text-violet-600", bg: "bg-violet-100" },
    { label: "Total Tutors", value: stats?.tutorCount || "0", icon: Users, color: "text-primary", bg: "bg-primary/10" },
    { label: "Student Groups", value: stats?.groupCount || "0", icon: Globe, color: "text-emerald-600", bg: "bg-emerald-100" },
    { label: "Total Revenue", value: `$${stats?.revenue || 0}`, icon: PieChart, color: "text-amber-600", bg: "bg-amber-100" },
  ];

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-muted-foreground font-medium animate-pulse">Loading institutional data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Organizer <span className="text-violet-600 italic">HQ</span>
        </h1>
        <p className="text-muted-foreground mt-2">Managing institutional excellence. Admin: {user?.name}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <Card key={stat.label} className="border-none shadow-md hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex flex-col gap-4">
                <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase">{stat.label}</p>
                  <p className="text-3xl font-black">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <DashboardCharts bookings={[]} isLoading={false} />

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-none shadow-lg overflow-hidden group">
          <CardHeader className="bg-violet-600 text-white">
            <CardTitle className="text-lg flex items-center gap-2">
              <Landmark className="w-5 h-5" />
              Institutions Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y text-sm">
              {institutions.length > 0 ? (
                institutions.map((inst) => (
                  <div key={inst.id} className="p-6 flex items-center justify-between hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center font-black text-violet-600">
                        {inst.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-base">{inst.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {inst._count.tutors} active tutors • {inst._count.students} students • {inst._count.groups} groups
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase hover:underline cursor-pointer group-hover:gap-3 transition-all">
                      Manage <BarChart3 className="w-3 h-3" />
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-12 text-center text-muted-foreground">
                  <Landmark className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p>No institutions found under your management.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg bg-linear-to-br from-primary/5 to-violet-500/5">
          <CardHeader>
            <CardTitle className="text-lg">Organization Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
             <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground font-medium uppercase text-[10px] tracking-wider">Tutor Satisfaction</span>
                  <span className="font-bold text-emerald-600">4.9/5.0</span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[96%]" />
                </div>
             </div>
             <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground font-medium uppercase text-[10px] tracking-wider">Group Completion</span>
                  <span className="font-bold text-primary">82%</span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[82%]" />
                </div>
             </div>
             <div className="pt-6 border-t flex flex-col gap-3">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Active Partner Heads</p>
                <div className="flex -space-x-3">
                   {[1,2,3,4].map(i => (
                     <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-violet-100 flex items-center justify-center text-[10px] font-bold text-violet-600 shadow-sm ring-2 ring-violet-50">H{i}</div>
                   ))}
                   <div className="w-10 h-10 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px] font-bold text-muted-foreground shadow-sm">+9</div>
                </div>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
