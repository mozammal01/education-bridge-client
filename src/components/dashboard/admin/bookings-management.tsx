"use client";

import { useState } from "react";
import { Search, Calendar, Clock, MoreVertical, Eye, XCircle } from "lucide-react";
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
import { cn } from "@/lib/utils";
import { MOCK_BOOKINGS } from "@/lib/constants";
import type { BookingStatus } from "@/types";

type TabType = "all" | "confirmed" | "completed" | "cancelled";

const tabs: { label: string; value: TabType }[] = [
  { label: "All", value: "all" },
  { label: "Upcoming", value: "confirmed" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

const statusColors: Record<BookingStatus, string> = {
  confirmed: "bg-primary/10 text-primary",
  completed: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-red-100 text-red-700",
};

export function BookingsManagement() {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBookings = MOCK_BOOKINGS.filter((booking) => {
    const matchesTab = activeTab === "all" || booking.status === activeTab;
    const matchesSearch = 
      booking.student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.tutor.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Bookings Management</h1>
        <p className="text-muted-foreground">View and manage all platform bookings</p>
      </div>

      {/* search & tabs */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search bookings..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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

      {/* bookings list */}
      <div className="space-y-4">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <Card key={booking.id}>
              <CardContent className="p-4">
                <div className="flex flex-col lg:flex-row gap-4">
                  {/* student & tutor */}
                  <div className="flex items-center gap-6 flex-1">
                    {/* student */}
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={booking.student.avatar} />
                        <AvatarFallback>
                          {booking.student.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-xs text-muted-foreground">Student</p>
                        <p className="font-medium text-sm">{booking.student.name}</p>
                      </div>
                    </div>

                    <div className="text-muted-foreground">→</div>

                    {/* tutor */}
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={booking.tutor.user.avatar} />
                        <AvatarFallback>
                          {booking.tutor.user.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-xs text-muted-foreground">Tutor</p>
                        <p className="font-medium text-sm">{booking.tutor.user.name}</p>
                      </div>
                    </div>
                  </div>

                  {/* subject & time */}
                  <div className="flex items-center gap-6 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground">Subject</p>
                      <p className="font-medium">{booking.subject}</p>
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

                  {/* status & price */}
                  <div className="flex items-center gap-4">
                    <Badge className={cn("font-normal", statusColors[booking.status])}>
                      {booking.status}
                    </Badge>
                    <p className="font-semibold">${booking.totalPrice}</p>

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
                        {booking.status === "confirmed" && (
                          <DropdownMenuItem className="text-destructive">
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
