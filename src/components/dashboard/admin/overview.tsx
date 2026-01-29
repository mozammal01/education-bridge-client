"use client";

import Link from "next/link";
import {
  Users,
  GraduationCap,
  BookOpen,
  DollarSign,
  TrendingUp,
  ArrowRight,
  Calendar,
  UserPlus
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MOCK_USERS, MOCK_BOOKINGS, MOCK_TUTORS } from "@/lib/constants";

const totalUsers = MOCK_USERS.length;
const totalStudents = MOCK_USERS.filter((u) => u.role === "STUDENT").length;
const totalTutors = MOCK_TUTORS.length;
const totalBookings = MOCK_BOOKINGS.length;
const totalRevenue = MOCK_BOOKINGS.filter((b) => b.status === "COMPLETED").reduce((acc, b) => acc + b.totalPrice, 0);

const stats = [
  {
    label: "Total Users",
    value: totalUsers,
    change: "+12%",
    icon: Users,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    label: "Students",
    value: totalStudents,
    change: "+8%",
    icon: GraduationCap,
    color: "text-emerald-600",
    bg: "bg-emerald-100",
  },
  {
    label: "Tutors",
    value: totalTutors,
    change: "+15%",
    icon: BookOpen,
    color: "text-amber-600",
    bg: "bg-amber-100",
  },
  {
    label: "Revenue",
    value: `$${totalRevenue}`,
    change: "+23%",
    icon: DollarSign,
    color: "text-violet-600",
    bg: "bg-violet-100",
  },
];

const recentActivity = [
  { type: "user", message: "New student registered", time: "2 min ago", icon: UserPlus },
  { type: "booking", message: "Session completed", time: "15 min ago", icon: Calendar },
  { type: "user", message: "New tutor registered", time: "1 hour ago", icon: UserPlus },
  { type: "booking", message: "Session booked", time: "2 hours ago", icon: Calendar },
  { type: "user", message: "New student registered", time: "3 hours ago", icon: UserPlus },
];

export function AdminOverview() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Platform overview and statistics</p>
      </div>

      {/* stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${stat.bg}`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <span className="text-xs font-medium text-emerald-600 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

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
              <p className="text-2xl font-bold">{totalBookings}</p>
            </div>
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
              <div>
                <p className="font-medium">Active Sessions</p>
                <p className="text-sm text-muted-foreground">Currently running</p>
              </div>
              <p className="text-2xl font-bold">3</p>
            </div>
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
              <div>
                <p className="font-medium">Pending Reviews</p>
                <p className="text-sm text-muted-foreground">Awaiting moderation</p>
              </div>
              <p className="text-2xl font-bold">7</p>
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
              <div className="p-3 bg-amber-100 rounded-xl">
                <BookOpen className="w-5 h-5 text-amber-600" />
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
