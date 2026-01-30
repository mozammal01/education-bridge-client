"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, DollarSign, Star, Users, ArrowRight, TrendingUp, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { bookingsService } from "@/services";
import { Booking } from "@/types";
import { getImageUrl } from "@/lib/utils";

export function TutorOverview() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await bookingsService.getBookings();
        if (response.data) {
          const bookingData = Array.isArray(response.data)
            ? response.data
            : (response.data as { bookings?: Booking[] }).bookings || [];
          setBookings(bookingData);
        }
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const upcomingSessions = bookings.filter((b) => b.status === "CONFIRMED");
  const completedSessions = bookings.filter((b) => b.status === "COMPLETED");
  const totalEarnings = completedSessions.reduce((acc, b) => acc + (b.totalPrice || 0), 0);

  const stats = [
    {
      label: "Upcoming",
      value: upcomingSessions.length,
      icon: Calendar,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Total Sessions",
      value: bookings.length,
      icon: Users,
      color: "text-emerald-600",
      bg: "bg-emerald-100",
    },
    {
      label: "Completed",
      value: completedSessions.length,
      icon: Star,
      color: "text-amber-600",
      bg: "bg-amber-100",
    },
    {
      label: "Earnings",
      value: `$${totalEarnings}`,
      icon: DollarSign,
      color: "text-violet-600",
      bg: "bg-violet-100",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* greeting */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {user?.name?.split(" ")[0] || "Tutor"}! 👋</h1>
          <p className="text-muted-foreground">Here&apos;s your teaching overview</p>
        </div>
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

      <div className="grid lg:grid-cols-2 gap-6">
        {/* upcoming sessions */}
        <Card>
          <CardHeader className="flex-row items-center justify-between pb-4">
            <CardTitle className="text-lg">Upcoming Sessions</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/tutor/sessions">
                View all <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {upcomingSessions.length > 0 ? (
              <div className="space-y-4">
                {upcomingSessions.slice(0, 3).map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center gap-4 p-3 rounded-xl border bg-muted/30"
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-muted shrink-0">
                      {session.student.image && (
                        <Image
                          src={getImageUrl(session.student.image)}
                          alt={session.student.name}
                          width={40}
                          height={40}
                          className="object-cover w-full h-full"
                          unoptimized
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{session.student.name}</p>
                      <p className="text-xs text-muted-foreground">{session.subject}</p>
                    </div>
                    <div className="text-right text-xs">
                      <p className="font-medium">
                        {new Date(session.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                      <p className="text-muted-foreground">{session.startTime}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-6">No upcoming sessions</p>
            )}
          </CardContent>
        </Card>

        {/* quick stats / earnings chart placeholder */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Sessions Completed</p>
                    <p className="text-sm text-muted-foreground">This month</p>
                  </div>
                </div>
                <p className="text-2xl font-bold">{completedSessions.length}</p>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <DollarSign className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-medium">Total Earnings</p>
                    <p className="text-sm text-muted-foreground">This month</p>
                  </div>
                </div>
                <p className="text-2xl font-bold">${totalEarnings}</p>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <Clock className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium">Hours Taught</p>
                    <p className="text-sm text-muted-foreground">This month</p>
                  </div>
                </div>
                <p className="text-2xl font-bold">{completedSessions.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* quick actions */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <Link href="/tutor/availability" className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Set Availability</p>
                <p className="text-sm text-muted-foreground">Update your schedule</p>
              </div>
            </Link>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <Link href="/tutor/profile" className="flex items-center gap-4">
              <div className="p-3 bg-emerald-100 rounded-xl">
                <Users className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="font-medium">Edit Profile</p>
                <p className="text-sm text-muted-foreground">Update your info</p>
              </div>
            </Link>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <Link href="/tutor/sessions" className="flex items-center gap-4">
              <div className="p-3 bg-amber-100 rounded-xl">
                <Calendar className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="font-medium">View Sessions</p>
                <p className="text-sm text-muted-foreground">Manage bookings</p>
              </div>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
