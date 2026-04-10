"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, BookOpen, TrendingUp, ArrowRight, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/auth-context";
import { bookingsService } from "@/services";
import { Booking } from "@/types";
import { getImageUrl } from "@/lib/utils";
import { DashboardCharts } from "../overview-charts";

export function StudentOverview() {
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
      } catch {
        // Failed to load
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const upcomingBookings = bookings.filter((b) => b.status === "CONFIRMED");
  const completedBookings = bookings.filter((b) => b.status === "COMPLETED");

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
      label: "Total Bookings",
      value: bookings.length,
      icon: Calendar,
      color: "text-amber-600",
      bg: "bg-amber-100",
    },
    {
      label: "Total Spent",
      value: `$${completedBookings.reduce((acc, b) => acc + (b.totalPrice || 0), 0)}`,
      icon: TrendingUp,
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
      <div>
        <h1 className="text-2xl font-bold">Welcome back, {user?.name?.split(" ")[0] || "Student"}!</h1>
        <p className="text-muted-foreground">Here&apos;s what&apos;s happening with your learning journey</p>
      </div>

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

      <DashboardCharts bookings={bookings} isLoading={isLoading} />

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
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-muted shrink-0 flex items-center justify-center">
                    {booking.tutor?.user?.image ? (
                      <Image
                        src={getImageUrl(booking.tutor.user.image)}
                        alt={booking.tutor?.user?.name || "Tutor"}
                        width={48}
                        height={48}
                        className="object-cover w-full h-full"
                        unoptimized
                      />
                    ) : (
                      <span className="text-lg font-bold text-muted-foreground">
                        {booking.tutor?.user?.name?.charAt(0) || "T"}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{booking.tutor?.user?.name || "Tutor"}</p>
                    <p className="text-sm text-muted-foreground">{booking.subject || "Session"}</p>
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
