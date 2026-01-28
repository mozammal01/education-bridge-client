"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, Video, MoreVertical, MessageSquare, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { MOCK_BOOKINGS, MOCK_USERS } from "@/lib/constants";
import type { BookingStatus } from "@/types";

const currentUser = MOCK_USERS[4];
const userBookings = MOCK_BOOKINGS.filter((b) => b.studentId === currentUser.id);

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

export function StudentBookings() {
  const [activeTab, setActiveTab] = useState<TabType>("all");

  const filteredBookings = activeTab === "all" 
    ? userBookings 
    : userBookings.filter((b) => b.status === activeTab);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Bookings</h1>
        <p className="text-muted-foreground">Manage your tutoring sessions</p>
      </div>

      {/* tabs */}
      <div className="flex gap-2 border-b pb-2 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap",
              activeTab === tab.value
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* bookings list */}
      {filteredBookings.length > 0 ? (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <Card key={booking.id}>
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* tutor info */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-muted shrink-0">
                      {booking.tutor.user.avatar && (
                        <Image
                          src={booking.tutor.user.avatar}
                          alt={booking.tutor.user.name}
                          width={56}
                          height={56}
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="min-w-0">
                      <Link 
                        href={`/tutors/${booking.tutorId}`}
                        className="font-semibold hover:text-primary transition-colors"
                      >
                        {booking.tutor.user.name}
                      </Link>
                      <p className="text-muted-foreground">{booking.subject}</p>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(booking.date).toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {booking.startTime} - {booking.endTime}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* right side */}
                  <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                    <Badge className={cn("font-normal", statusColors[booking.status])}>
                      {booking.status}
                    </Badge>
                    <p className="font-semibold">${booking.totalPrice}</p>
                  </div>

                  {/* actions */}
                  <div className="flex items-center gap-2">
                    {booking.status === "confirmed" && (
                      <>
                        <Button size="sm" className="gap-1.5">
                          <Video className="w-4 h-4" />
                          <span className="hidden sm:inline">Join</span>
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
                              Message Tutor
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <XCircle className="w-4 h-4 mr-2" />
                              Cancel Booking
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </>
                    )}
                    {booking.status === "completed" && (
                      <Button variant="outline" size="sm">
                        Leave Review
                      </Button>
                    )}
                  </div>
                </div>

                {booking.notes && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Notes: </span>
                      {booking.notes}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">No bookings found</p>
            <Button asChild>
              <Link href="/tutors">Find a Tutor</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
