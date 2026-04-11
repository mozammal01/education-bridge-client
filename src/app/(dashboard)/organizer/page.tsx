"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Landmark, Users, Globe, PieChart, BarChart3, GraduationCap } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { DashboardCharts } from "@/components/dashboard/overview-charts";

export default function OrganizerOverview() {
  const { user } = useAuth();

  const stats = [
    { label: "My Institutions", value: "2", icon: Landmark, color: "text-violet-600", bg: "bg-violet-100" },
    { label: "Total Tutors", value: "24", icon: Users, color: "text-primary", bg: "bg-primary/10" },
    { label: "Student Groups", value: "8", icon: Globe, color: "text-emerald-600", bg: "bg-emerald-100" },
    { label: "Partner Revenue", value: "$4.2k", icon: PieChart, color: "text-amber-600", bg: "bg-amber-100" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Organizer <span className="text-violet-600 italic">HQ</span>
        </h1>
        <p className="text-muted-foreground mt-2">Managing institutional excellence. User: {user?.name}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
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
            <div className="divide-y">
              {[1, 2].map((i) => (
                <div key={i} className="p-6 flex items-center justify-between hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center font-black text-violet-600">IN</div>
                    <div>
                      <p className="font-bold">Global Academy {i === 1 ? "North" : "South"}</p>
                      <p className="text-xs text-muted-foreground">{10 + i * 2} active tutors • 150+ students</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase hover:underline cursor-pointer">
                    Manage <BarChart3 className="w-3 h-3" />
                  </div>
                </div>
              ))}
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
                  <span className="text-muted-foreground">Tutor Satisfaction</span>
                  <span className="font-bold text-emerald-600">4.9/5.0</span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[96%]" />
                </div>
             </div>
             <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Course Completion</span>
                  <span className="font-bold text-primary">82%</span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[82%]" />
                </div>
             </div>
             <div className="pt-4 border-t flex flex-col gap-2">
                <p className="text-xs font-bold text-muted-foreground uppercase">Key Partners</p>
                <div className="flex -space-x-2">
                   {[1,2,3,4].map(i => (
                     <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px] font-bold">P{i}</div>
                   ))}
                </div>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
