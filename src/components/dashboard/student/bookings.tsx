"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, Video, MoreVertical, MessageSquare, XCircle, Loader2, Star } from "lucide-react";
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
import { bookingsService } from "@/services";
import { toast } from "sonner";
import { ReviewModal } from "@/components/reviews";
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

export function StudentBookings() {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reviewModal, setReviewModal] = useState({
    isOpen: false,
    tutorId: "",
    tutorName: "",
  });

  const fetchBookings = async () => {
    try {
      const res = await bookingsService.getBookings();
      const data = res.data;
      if (data) {
        setBookings(Array.isArray(data) ? data : data.bookings || []);
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

  const filtered = activeTab === "all"
    ? bookings
    : bookings.filter((b) => b.status === activeTab);

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
        <h1 className="text-2xl font-bold">My Bookings</h1>
        <p className="text-muted-foreground">Manage your tutoring sessions</p>
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
          {filtered.map((booking) => (
            <Card key={booking.id}>
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-muted shrink-0 flex items-center justify-center">
                      {booking.tutor?.user?.avatar ? (
                        <Image
                          src={booking.tutor.user.avatar}
                          alt=""
                          width={56}
                          height={56}
                          className="object-cover"
                        />
                      ) : (
                        <span className="text-lg font-bold text-muted-foreground">
                          {booking.tutor?.user?.name?.charAt(0) || "T"}
                        </span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <Link
                        href={`/tutors/${booking.tutorId}`}
                        className="font-semibold hover:text-primary"
                      >
                        {booking.tutor?.user?.name || "Tutor"}
                      </Link>
                      <p className="text-muted-foreground">{booking.subject || "Session"}</p>
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

                  <div className="flex justify-center items-center gap-3 sm:flex-col sm:items-end">
                    <Badge className={cn("font-normal", statusColors[booking.status])}>
                      {booking.status}
                    </Badge>
                    {booking.totalPrice && <p className="font-semibold">${booking.totalPrice}</p>}
                  </div>

                  <div className="flex items-center gap-2">
                    {booking.status === "CONFIRMED" && (
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
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleCancel(booking.id)}
                            >
                              <XCircle className="w-4 h-4 mr-2" />
                              Cancel Booking
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </>
                    )}
                    {booking.status === "COMPLETED" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setReviewModal({
                          isOpen: true,
                          tutorId: booking.tutor?.userId || booking.tutorId,
                          tutorName: booking.tutor?.user?.name || "Tutor",
                        })}
                      >
                        <Star className="w-4 h-4 mr-1" />
                        Leave Review
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
            <p className="text-muted-foreground mb-4">No bookings found</p>
            <Button asChild>
              <Link href="/tutors">Find a Tutor</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      <ReviewModal
        isOpen={reviewModal.isOpen}
        onClose={() => setReviewModal({ isOpen: false, tutorId: "", tutorName: "" })}
        tutorId={reviewModal.tutorId}
        tutorName={reviewModal.tutorName}
        onSuccess={fetchBookings}
      />
    </div>
  );
}
