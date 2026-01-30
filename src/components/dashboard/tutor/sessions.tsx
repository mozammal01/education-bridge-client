"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Calendar, Clock, Video, MoreVertical, CheckCircle, MessageSquare, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn, getImageUrl } from "@/lib/utils";
import { bookingsService } from "@/services";
import { toast } from "sonner";
import type { Booking, BookingStatus } from "@/types";

type TabType = "all" | BookingStatus;

const tabs: { label: string; value: TabType }[] = [
  { label: "All", value: "all" },
  { label: "Upcoming", value: "CONFIRMED" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Cancelled", value: "CANCELLED" },
];

const statusColors: Record<string, string> = {
  CONFIRMED: "bg-primary/10 text-primary",
  COMPLETED: "bg-emerald-100 text-emerald-700",
  CANCELLED: "bg-red-100 text-red-700",
};

export function TutorSessions() {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [sessions, setSessions] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSessions = async () => {
    try {
      const res = await bookingsService.getBookings();
      const data = res.data;
      if (data) {
        setSessions(Array.isArray(data) ? data : data.bookings || []);
      }
    } catch {
      toast.error("Failed to load sessions");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleComplete = async (id: string) => {
    try {
      await bookingsService.updateBookingStatus(id, "COMPLETED");
      toast.success("Session marked complete");
      fetchSessions();
    } catch {
      toast.error("Failed to update");
    }
  };

  const filtered = activeTab === "all"
    ? sessions
    : sessions.filter((s) => s.status === activeTab);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Sessions</h1>
        <p className="text-muted-foreground">View and manage your teaching sessions</p>
      </div>

      <div className="flex gap-2 border-b pb-2 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap",
              activeTab === tab.value
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="space-y-4">
          {filtered.map((session) => (
            <Card key={session.id}>
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-muted shrink-0 flex items-center justify-center">
                      {session.student?.image ? (
                        <Image
                          src={getImageUrl(session.student.image)}
                          alt=""
                          width={48}
                          height={48}
                          className="object-cover w-full h-full"
                          unoptimized
                        />
                      ) : (
                        <span className="text-lg font-bold text-muted-foreground">
                          {session.student?.name?.charAt(0) || "S"}
                        </span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold">{session.student?.name || "Student"}</p>
                      <p className="text-muted-foreground">{session.subject || "Session"}</p>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(session.date).toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {session.startTime} - {session.endTime}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                    <Badge className={cn("font-normal", statusColors[session.status])}>
                      {session.status}
                    </Badge>
                    {session.totalPrice && <p className="font-semibold">${session.totalPrice}</p>}
                  </div>

                  <div className="flex items-center gap-2">
                    {session.status === "CONFIRMED" && (
                      <>
                        <Button size="sm" className="gap-1.5">
                          <Video className="w-4 h-4" />
                          <span className="hidden sm:inline">Start</span>
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon-sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Message Student
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleComplete(session.id)}>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Mark Complete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </>
                    )}
                    {session.status === "COMPLETED" && (
                      <Button variant="outline" size="sm" disabled>
                        <CheckCircle className="w-4 h-4 mr-1.5" />
                        Completed
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No sessions found</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
