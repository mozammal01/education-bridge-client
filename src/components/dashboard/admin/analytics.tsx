"use client";

import { useState, useEffect } from "react";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  BookOpen, 
  ArrowUpRight, 
  ArrowDownRight,
  Filter,
  Download
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/lib/api";
import { DashboardCharts } from "../overview-charts";
import { Booking } from "@/types";
import { adminService } from "@/services";

export function AnalyticsManagement() {
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [bookings, setBookings] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsRes = await adminService.getStats();
        const bookingsRes = await api.get<Booking[]>("/api/bookings/admin");
        
        if (statsRes && statsRes.data) {
          setStats(statsRes.data);
        }
        
        if (bookingsRes && bookingsRes.data) {
          setBookings(bookingsRes.data as Booking[]);
        } else {
          setBookings([] as Booking[]);
        }
      } catch (error) {
        console.error("Failed to fetch analytics data", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const metricCards = [
    {
      title: "Total Revenue",
      value: `$${stats?.totalRevenue?.toLocaleString() || "12,450"}`,
      change: "+12.5%",
      isPositive: true,
      icon: DollarSign,
      color: "text-emerald-600",
      bg: "bg-emerald-50"
    },
    {
      title: "Active Tutors",
      value: stats?.totalTutors || "48",
      change: "+4.2%",
      isPositive: true,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      title: "New Students",
      value: stats?.totalStudents || "154",
      change: "-2.1%",
      isPositive: false,
      icon: TrendingUp,
      color: "text-amber-600",
      bg: "bg-amber-50"
    },
    {
      title: "Total Sessions",
      value: stats?.totalSessions || "1,240",
      change: "+18.3%",
      isPositive: true,
      icon: BookOpen,
      color: "text-indigo-600",
      bg: "bg-indigo-50"
    }
  ];

  if (isLoading) {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-10 w-64 rounded-xl" />
            <Skeleton className="h-4 w-96 rounded-lg opacity-50" />
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-9 w-24 rounded-lg" />
            <Skeleton className="h-9 w-32 rounded-lg" />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="border-primary/5 shadow-sm overflow-hidden">
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <Skeleton className="h-10 w-10 rounded-xl" />
                  <Skeleton className="h-6 w-12 rounded-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24 rounded" />
                  <Skeleton className="h-8 w-32 rounded" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-primary/5 shadow-sm p-6 overflow-hidden">
          <Skeleton className="h-8 w-48 mb-6 rounded" />
          <div className="grid lg:grid-cols-2 gap-6">
            <Skeleton className="h-[250px] w-full rounded-2xl" />
            <Skeleton className="h-[250px] w-full rounded-2xl" />
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 border-primary/5 shadow-sm p-6">
            <Skeleton className="h-6 w-48 mb-4 rounded" />
            <div className="space-y-6">
              {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-12 w-full rounded-xl" />)}
            </div>
          </Card>
          <Card className="border-primary/5 shadow-sm p-6">
            <Skeleton className="h-6 w-32 mb-4 rounded" />
            <div className="space-y-4 pt-4 flex flex-col items-center">
              <Skeleton className="h-32 w-32 rounded-full" />
              <div className="space-y-2 w-full pt-4">
                {[1, 2, 3].map(i => <Skeleton key={i} className="h-4 w-full rounded" />)}
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Platform Analytics</h1>
          <p className="text-muted-foreground">Comprehensive insights into platform performance and user growth.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="hidden sm:flex">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
          <Button size="sm">
            <Download className="mr-2 h-4 w-4" /> Export Report
          </Button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricCards.map((metric) => (
          <Card key={metric.title} className="border-primary/5 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`${metric.bg} p-2 rounded-xl`}>
                  <metric.icon className={`h-5 w-5 ${metric.color}`} />
                </div>
                <Badge variant="outline" className={metric.isPositive ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-red-50 text-red-700 border-red-200"}>
                  {metric.isPositive ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                  {metric.change}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                <h3 className="text-2xl font-bold mt-1">{metric.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6">
        <Card className="border-primary/5 shadow-sm">
          <CardHeader>
            <CardTitle>Platform Trends</CardTitle>
            <CardDescription>Monthly growth and session distribution across categories.</CardDescription>
          </CardHeader>
          <CardContent>
            <DashboardCharts bookings={bookings} isLoading={false} />
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-primary/5 shadow-sm">
          <CardHeader>
            <CardTitle>Top Performing Subjects</CardTitle>
            <CardDescription>Subjects with the highest student engagement this month.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { name: "Mathematics", sessions: 450, growth: "+12%", color: "bg-blue-500" },
                { name: "Physics", sessions: 320, growth: "+8%", color: "bg-emerald-500" },
                { name: "Chemistry", sessions: 280, growth: "+15%", color: "bg-amber-500" },
                { name: "Biology", sessions: 210, growth: "+5%", color: "bg-indigo-500" },
              ].map((subject) => (
                <div key={subject.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{subject.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-muted-foreground">{subject.sessions} sessions</span>
                      <span className="text-emerald-600 font-semibold">{subject.growth}</span>
                    </div>
                  </div>
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${subject.color} rounded-full transition-all duration-1000`} 
                      style={{ width: `${(subject.sessions / 450) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/5 shadow-sm">
          <CardHeader>
            <CardTitle>User Acquisition</CardTitle>
            <CardDescription>Traffic sources for new users.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 pt-2">
              {[
                { source: "Google Search", value: "45%", count: 69, color: "bg-blue-500" },
                { source: "Social Media", value: "25%", count: 38, color: "bg-pink-500" },
                { source: "Direct Link", value: "20%", count: 31, color: "bg-emerald-500" },
                { source: "Referrals", value: "10%", count: 16, color: "bg-amber-500" },
              ].map((item) => (
                <div key={item.source} className="flex items-center gap-3">
                  <div className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                  <div className="flex-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span>{item.source}</span>
                      <span>{item.value}</span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="pt-6 flex justify-center">
                <div className="relative h-32 w-32">
                  <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                    <circle cx="18" cy="18" r="16" fill="none" stroke="#eee" strokeWidth="3" />
                    <circle cx="18" cy="18" r="16" fill="none" stroke="#3b82f6" strokeWidth="3" strokeDasharray="45 100" />
                    <circle cx="18" cy="18" r="16" fill="none" stroke="#ec4899" strokeWidth="3" strokeDasharray="25 100" strokeDashoffset="-45" />
                    <circle cx="18" cy="18" r="16" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="20 100" strokeDashoffset="-70" />
                    <circle cx="18" cy="18" r="16" fill="none" stroke="#f59e0b" strokeWidth="3" strokeDasharray="10 100" strokeDashoffset="-90" />
                  </svg>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
