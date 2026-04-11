"use client";

import { useState, useEffect } from "react";
import { Search, Calendar, Clock, MoreVertical, Eye, XCircle, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

export function BookingsManagement() {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [search, setSearch] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await bookingsService.getBookings();
      if (res && res.data) {
        setBookings(res.data);
      }
    } catch {
      toast.error("Failed to load bookings");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (id: string) => {
    try {
      await bookingsService.updateBookingStatus(id, "CANCELLED");
      toast.success("Booking cancelled");
      fetchBookings();
    } catch {
      toast.error("Failed to cancel");
    }
  };

  const getTutorName = (booking: Booking) => {
    return booking.tutor?.user?.name || (booking.tutor as unknown as { name?: string })?.name || "Tutor";
  };

  const getTutorImage = (booking: Booking) => {
    return booking.tutor?.user?.image || (booking.tutor as unknown as { image?: string })?.image;
  };

  const filtered = bookings.filter((b) => {
    const matchesTab = activeTab === "all" || b.status === activeTab;
    const matchesSearch =
      b.student?.name?.toLowerCase().includes(search.toLowerCase()) ||
      getTutorName(b).toLowerCase().includes(search.toLowerCase()) ||
      b.subject?.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

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
        <h1 className="text-2xl font-bold">Bookings Management</h1>
        <p className="text-muted-foreground">View and manage all platform bookings</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search bookings..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-2 overflow-x-auto">
          {tabs.map((tab) => (
            <Button
              key={tab.value}
              variant={activeTab === tab.value ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filtered.length > 0 ? (
          filtered.map((booking) => (
            <Card key={booking.id}>
              <CardContent className="p-4">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex items-center gap-6 flex-1">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={getImageUrl(booking.student?.image)} />
                        <AvatarFallback>
                          {booking.student?.name?.charAt(0) || "S"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-xs text-muted-foreground">Student</p>
                        <p className="font-medium text-sm">{booking.student?.name || "Student"}</p>
                      </div>
                    </div>

                    <div className="text-muted-foreground">→</div>

                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={getImageUrl(getTutorImage(booking))} />
                        <AvatarFallback>
                          {getTutorName(booking).charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-xs text-muted-foreground">Tutor</p>
                        <p className="font-medium text-sm">{getTutorName(booking)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground">Subject</p>
                      <p className="font-medium">{booking.subject || "Session"}</p>
                    </div>
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(booking.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {booking.startTime}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Badge className={cn("font-normal", statusColors[booking.status])}>
                      {booking.status}
                    </Badge>
                    {booking.totalPrice && <p className="font-semibold">${booking.totalPrice}</p>}

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon-sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        {booking.status === "CONFIRMED" && (
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleCancel(booking.id)}
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Cancel Booking
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No bookings found</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
