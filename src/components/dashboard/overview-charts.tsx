"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Booking } from "@/types";
import { useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface DashboardChartsProps {
  bookings?: Booking[];
  isLoading?: boolean;
}

export function DashboardCharts({ bookings = [], isLoading }: DashboardChartsProps) {
  // Weekly Activity Logic
  const weeklyData = useMemo(() => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const activity = days.map((day) => ({ name: day, sessions: 0 }));

    bookings.forEach((booking) => {
      const date = new Date(booking.date);
      const dayIndex = date.getDay();
      if (booking.status !== "CANCELLED") {
        activity[dayIndex].sessions += 1;
      }
    });

    return activity;
  }, [bookings]);

  const maxSessions = Math.max(...weeklyData.map((d) => d.sessions), 1);

  // Sessions by Category Logic
  const categoryData = useMemo(() => {
    const categories: Record<string, number> = {};
    
    bookings.forEach((booking) => {
      const subject = booking.subject || "General";
      categories[subject] = (categories[subject] || 0) + 1;
    });

    const total = Object.values(categories).reduce((a, b) => a + b, 0);
    const sorted = Object.entries(categories)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4);

    const colors = ["bg-blue-500", "bg-emerald-500", "bg-amber-500", "bg-indigo-500"];

    return sorted.map(([name, count], idx) => ({
      name,
      value: total > 0 ? Math.round((count / total) * 100) : 0,
      color: colors[idx] || "bg-slate-500",
    }));
  }, [bookings]);

  if (isLoading) {
    return (
      <div className="grid lg:grid-cols-2 gap-6">
        <Skeleton className="h-[350px] w-full rounded-2xl" />
        <Skeleton className="h-[350px] w-full rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card className="shadow-sm border-primary/5">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Weekly Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px] w-full flex items-end justify-between gap-2 pt-4">
            {weeklyData.map((item) => (
              <div key={item.name} className="flex-1 flex flex-col items-center gap-2 group">
                <div
                  className="w-full bg-primary/20 rounded-t-md hover:bg-primary/40 transition-all duration-300 relative group"
                  style={{ height: `${(item.sessions / maxSessions) * 100}%` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-popover border text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    {item.sessions} sessions
                  </div>
                </div>
                <span className="text-xs text-muted-foreground font-medium">{item.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm border-primary/5">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Sessions by Topic</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px] flex flex-col justify-center space-y-4">
            {categoryData.length > 0 ? (
              categoryData.map((cat) => (
                <div key={cat.name} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-medium">
                    <span>{cat.name}</span>
                    <span>{cat.value}%</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${cat.color} rounded-full transition-all duration-1000`}
                      style={{ width: `${cat.value}%` }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-muted-foreground text-sm">
                No session data available yet.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
