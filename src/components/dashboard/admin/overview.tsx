"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  GraduationCap,
  BookOpen,
  DollarSign,
  TrendingUp,
  ArrowRight,
  Calendar,
  UserPlus,
  Loader2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { adminService, bookingsService, tutorsService } from "@/services";
import { Booking } from "@/types";
import { DashboardCharts } from "../overview-charts";

interface Stats {
  totalUsers: number;
  totalStudents: number;
  totalTutors: number;
  totalBookings: number;
  totalRevenue: number;
}

import { DashboardOverviewSkeleton } from "../overview-skeleton";

export function AdminOverview() {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalStudents: 0,
    totalTutors: 0,
    totalBookings: 0,
    totalRevenue: 0,
  });
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const statsRes = await adminService.getStats();
        if (statsRes && statsRes.data) {
          setStats(statsRes.data);
        }

        const bookingsRes = await bookingsService.getBookings();
        setBookings(bookingsRes.data || []);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statsConfig = [
    {
      label: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Students",
      value: stats.totalStudents,
      icon: GraduationCap,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Tutors",
      value: stats.totalTutors,
      icon: BookOpen,
      color: "text-secondary-foreground",
      bg: "bg-secondary",
    },
    {
      label: "Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-primary",
      bg: "bg-primary/10",
    },
  ];

  // Note: Replace with real activity data from backend when available
  const recentActivity = [
    { type: "info", message: "Platform is running smoothly", time: "Live", icon: TrendingUp },
    { type: "stats", message: `${stats.totalUsers} total users registered`, time: "All time", icon: Users },
    { type: "stats", message: `${stats.totalBookings} bookings processed`, time: "All time", icon: Calendar },
    { type: "stats", message: `${stats.totalTutors} active tutors`, time: "Current", icon: UserPlus },
  ];

  if (isLoading) {
    return <DashboardOverviewSkeleton />;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Platform overview and statistics</p>
      </div>

      {/* stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statsConfig.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${stat.bg}`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <span className="text-xs font-medium text-emerald-600 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  Live
                </span>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <DashboardCharts bookings={bookings} isLoading={isLoading} />

      <div className="grid lg:grid-cols-2 gap-6">
        {/* recent activity */}
        <Card>
          <CardHeader className="flex-row items-center justify-between pb-4">
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="p-2 bg-muted rounded-lg">
                    <activity.icon className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* quick stats */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Platform Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
              <div>
                <p className="font-medium">Total Bookings</p>
                <p className="text-sm text-muted-foreground">All time</p>
              </div>
              <p className="text-2xl font-bold">{stats.totalBookings}</p>
            </div>
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
              <div>
                <p className="font-medium">Active Tutors</p>
                <p className="text-sm text-muted-foreground">Currently available</p>
              </div>
              <p className="text-2xl font-bold">{stats.totalTutors}</p>
            </div>
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
              <div>
                <p className="font-medium">Total Students</p>
                <p className="text-sm text-muted-foreground">Registered</p>
              </div>
              <p className="text-2xl font-bold">{stats.totalStudents}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* quick actions */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <Link href="/admin/users" className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Manage Users</p>
                <p className="text-sm text-muted-foreground">View all users</p>
              </div>
              <ArrowRight className="ml-auto w-4 h-4 text-muted-foreground" />
            </Link>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <Link href="/admin/bookings" className="flex items-center gap-4">
              <div className="p-3 bg-emerald-100 rounded-xl">
                <Calendar className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="font-medium">View Bookings</p>
                <p className="text-sm text-muted-foreground">All sessions</p>
              </div>
              <ArrowRight className="ml-auto w-4 h-4 text-muted-foreground" />
            </Link>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <Link href="/admin/categories" className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Categories</p>
                <p className="text-sm text-muted-foreground">Manage subjects</p>
              </div>
              <ArrowRight className="ml-auto w-4 h-4 text-muted-foreground" />
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
