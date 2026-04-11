"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Booking } from "@/types";
import { useMemo, ReactNode } from "react";
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
      if (!booking.date) return;
      const date = new Date(booking.date);
      if (isNaN(date.getTime())) return;
      
      const dayIndex = date.getDay();
      if (booking.status !== "CANCELLED" && activity[dayIndex]) {
        activity[dayIndex].sessions += 1;
      }
    });

    return activity;
  }, [bookings]);

  const maxSessions = Math.max(...weeklyData.map((d) => d.sessions), 1);

  // Line Chart Data (Growth trends derived from actual bookings)
  const lineData = useMemo(() => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const currentMonth = new Date().getMonth();
    // Show last 6 months including current
    const displayMonths: string[] = [];
    for (let i = 5; i >= 0; i--) {
      const idx = (currentMonth - i + 12) % 12;
      displayMonths.push(months[idx]);
    }

    const growth = displayMonths.map((month) => ({ name: month, value: 0 }));
    
    // Map bookings to months
    bookings.forEach((booking) => {
      if (!booking.date) return;
      const date = new Date(booking.date);
      if (isNaN(date.getTime())) return;
      
      const monthName = months[date.getMonth()];
      const monthIdx = displayMonths.indexOf(monthName);
      if (monthIdx !== -1 && booking.status !== "CANCELLED") {
        growth[monthIdx].value += 1;
      }
    });

    // Ensure there's a visible baseline for the chart if data is sparse
    return growth.map(d => ({ ...d, value: Math.max(d.value, 0) }));
  }, [bookings]);

  const maxLineValue = Math.max(...lineData.map(d => d.value), 1);

  // Sessions by Category Logic...
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
    <div className="space-y-6">
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
            <CardTitle className="text-base font-semibold">Learning Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full relative pt-4">
              <svg className="w-full h-[200px]" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path
                  d={`M ${lineData.map((d, i) => `${(i * 100) / (lineData.length - 1)} ${100 - (d.value / maxLineValue) * 80}`).join(" L ")}`}
                  fill="none"
                  stroke="var(--color-primary, #0f172a)"
                  strokeWidth="2"
                  className="transition-all duration-1000"
                />
                {lineData.map((d, i) => (
                  <circle
                    key={i}
                    cx={(i * 100) / (lineData.length - 1)}
                    cy={100 - (d.value / maxLineValue) * 80}
                    r="2"
                    fill="white"
                    stroke="var(--color-primary, #0f172a)"
                    strokeWidth="1"
                  />
                ))}
              </svg>
              <div className="flex justify-between mt-4">
                {lineData.map((item) => (
                  <span key={item.name} className="text-[10px] text-muted-foreground font-medium">{item.name}</span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm border-primary/5">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Sessions by Topic</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px] flex items-center justify-center gap-12 max-w-2xl mx-auto">
            {categoryData.length > 0 ? (
              <>
                <div className="relative w-44 h-44 shrink-0">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    {categoryData.reduce((acc: { elements: ReactNode[], total: number }, cat) => {
                      const offset = acc.total;
                      const strokeDasharray = `${cat.value} ${100 - cat.value}`;
                      const strokeColor = cat.color === "bg-blue-500" ? "#3b82f6" : 
                                        cat.color === "bg-emerald-500" ? "#10b981" :
                                        cat.color === "bg-amber-500" ? "#f59e0b" : "#6366f1";
                      
                      acc.elements.push(
                        <circle
                          key={cat.name}
                          cx="50"
                          cy="50"
                          r="40"
                          fill="transparent"
                          stroke={strokeColor}
                          strokeWidth="12"
                          strokeDasharray={strokeDasharray}
                          strokeDashoffset={-offset}
                          pathLength="100"
                          className="transition-all duration-1000 ease-out"
                        />
                      );
                      acc.total += cat.value;
                      return acc;
                    }, { elements: [], total: 0 }).elements}
                    {/* Inner circle for donut hole */}
                    <circle cx="50" cy="50" r="30" fill="currentColor" className="text-card" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-xl font-bold">100%</span>
                    <span className="text-[10px] text-muted-foreground uppercase">Total</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3 flex-1 ml-6">
                  {categoryData.map((cat) => (
                    <div key={cat.name} className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${cat.color}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between text-xs font-medium">
                          <span className="truncate">{cat.name}</span>
                          <span>{cat.value}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="w-full text-center text-muted-foreground text-sm">
                No session data available yet.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
