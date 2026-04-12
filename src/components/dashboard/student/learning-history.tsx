"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, Calendar, Clock, Award, CheckCircle2, ChevronRight, Loader2, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { bookingsService } from "@/services";
import { Booking } from "@/types";
import { cn } from "@/lib/utils";

export function LearningHistoryView() {
  const [history, setHistory] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await bookingsService.getBookings();
        if (response.data) {
          const bookingData = Array.isArray(response.data)
            ? response.data
            : (response.data as { bookings?: Booking[] }).bookings || [];
          // Filter only completed ones for history
          setHistory(bookingData.filter(b => b.status === "COMPLETED"));
        }
      } catch {
        // Failed to load
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, []);

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
        <h1 className="text-2xl font-bold">Learning History</h1>
        <p className="text-muted-foreground">Track your progress and past achievements</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-primary/5 border-primary/10">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{history.length}</p>
                <p className="text-xs text-muted-foreground uppercase font-semibold">Total Sessions</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-emerald-500/5 border-emerald-500/10">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-500/10 rounded-xl">
                <Clock className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{history.length * 1}h</p>
                <p className="text-xs text-muted-foreground uppercase font-semibold">Learning Hours</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-amber-500/5 border-amber-500/10">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-500/10 rounded-xl">
                <Award className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{Math.floor(history.length / 5)}</p>
                <p className="text-xs text-muted-foreground uppercase font-semibold">Certificates Earned</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          Recent Activity
        </h2>
        
        {history.length > 0 ? (
          <div className="relative space-y-4 before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-muted">
            {history.map((item, index) => (
              <div key={item.id} className="relative pl-12">
                <div className="absolute left-0 top-1 p-1 bg-background border-2 border-primary rounded-full z-10">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                </div>
                <Card className="group hover:border-primary/30 transition-all duration-300 shadow-none hover:shadow-lg hover:shadow-primary/5">
                  <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-wider py-0">Completed</Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(item.date).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric"
                          })}
                        </span>
                      </div>
                      <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                        {item.subject || "Tutoring Session"}
                      </h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                        With <span className="font-medium text-foreground">{item.tutor?.user?.name || "Expert Tutor"}</span>
                        <ChevronRight className="w-3 h-3" />
                        Duration: 1 Hour
                      </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <Button variant="outline" size="sm" className="gap-2 h-9 rounded-full">
                        <Download className="w-3.5 h-3.5" />
                        Resources
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2 h-9 rounded-full border-primary/20 text-primary hover:bg-primary/5">
                        <Award className="w-3.5 h-3.5" />
                        Certificate
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        ) : (
          <Card className="border-dashed py-12">
            <CardContent className="flex flex-col items-center justify-center text-center">
              <div className="p-4 bg-muted rounded-full mb-4">
                <BookOpen className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-lg">No Learning History Yet</h3>
              <p className="text-muted-foreground max-w-xs mx-auto mb-6">
                Complete your first session to start your learning journey and earn achievements.
              </p>
              <Button asChild>
                <Link href="/tutors">Find a Tutor</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
