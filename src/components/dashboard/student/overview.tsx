"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, BookOpen, TrendingUp, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MOCK_BOOKINGS, MOCK_USERS } from "@/lib/constants";

const currentUser = MOCK_USERS[4];

// filter bookings for current user
const userBookings = MOCK_BOOKINGS.filter((b) => b.studentId === currentUser.id);
const upcomingBookings = userBookings.filter((b) => b.status === "confirmed");
const completedBookings = userBookings.filter((b) => b.status === "completed");

const stats = [
  {
    label: "Upcoming Sessions",
    value: upcomingBookings.length,
    icon: Calendar,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    label: "Completed",
    value: completedBookings.length,
    icon: BookOpen,
    color: "text-emerald-600",
    bg: "bg-emerald-100",
  },
  {
    label: "Hours Learned",
    value: completedBookings.length,
    icon: Clock,
    color: "text-amber-600",
    bg: "bg-amber-100",
  },
  {
    label: "Total Spent",
    value: `$${completedBookings.reduce((acc, b) => acc + b.totalPrice, 0)}`,
    icon: TrendingUp,
    color: "text-violet-600",
    bg: "bg-violet-100",
  },
];

export function StudentOverview() {
  return (
    <div className="space-y-8">
      {/* greeting */}
      <div>
        <h1 className="text-2xl font-bold">Welcome back, {currentUser.name.split(" ")[0]}! 👋</h1>
        <p className="text-muted-foreground">Here&apos;s what&apos;s happening with your learning journey</p>
      </div>

      {/* stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${stat.bg}`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* upcoming sessions */}
      <Card>
        <CardHeader className="flex-row items-center justify-between pb-4">
          <CardTitle className="text-lg">Upcoming Sessions</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/bookings">
              View all <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {upcomingBookings.length > 0 ? (
            <div className="space-y-4">
              {upcomingBookings.slice(0, 3).map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center gap-4 p-4 rounded-xl border bg-muted/30"
                >
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-muted shrink-0">
                    {booking.tutor.user.avatar && (
                      <Image
                        src={booking.tutor.user.avatar}
                        alt={booking.tutor.user.name}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{booking.tutor.user.name}</p>
                    <p className="text-sm text-muted-foreground">{booking.subject}</p>
                  </div>
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium">
                      {new Date(booking.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {booking.startTime} - {booking.endTime}
                    </p>
                  </div>
                  <Badge variant="secondary">{booking.status}</Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">No upcoming sessions</p>
              <Button asChild>
                <Link href="/tutors">Find a Tutor</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* quick actions */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <Link href="/tutors" className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-medium">Find Tutors</p>
                <p className="text-sm text-muted-foreground">Browse expert tutors</p>
              </div>
            </Link>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <Link href="/dashboard/bookings" className="flex items-center gap-4">
              <div className="p-3 bg-emerald-100 rounded-xl">
                <Calendar className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="font-medium">My Bookings</p>
                <p className="text-sm text-muted-foreground">Manage your sessions</p>
              </div>
            </Link>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <Link href="/dashboard/profile" className="flex items-center gap-4">
              <div className="p-3 bg-amber-100 rounded-xl">
                <TrendingUp className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="font-medium">My Profile</p>
                <p className="text-sm text-muted-foreground">Update your info</p>
              </div>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
