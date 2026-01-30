"use client";

import { useState, useMemo } from "react";
import { Calendar, Clock, MessageSquare, Video, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { TutorProfile } from "@/types";
import { cn } from "@/lib/utils";
import { bookingsService } from "@/services";
import { useAuth } from "@/context/auth-context";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface BookingCardProps {
  tutor: TutorProfile;
}

const defaultTimeSlots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

const getNextDays = () => Array.from({ length: 7 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() + i + 1);
  return {
    date: date.toISOString().split("T")[0],
    day: date.toLocaleDateString("en-US", { weekday: "short" }),
    num: date.getDate(),
    dayOfWeek: date.getDay(),
  };
});

const generateTimeSlots = (startTime: string, endTime: string): string[] => {
  const slots: string[] = [];
  const [startHour] = startTime.split(":").map(Number);
  const [endHour] = endTime.split(":").map(Number);

  for (let hour = startHour; hour < endHour; hour++) {
    slots.push(`${hour.toString().padStart(2, "0")}:00`);
  }
  return slots;
};

export function BookingCard({ tutor }: BookingCardProps) {
  const nextDays = useMemo(() => getNextDays(), []);
  const [selectedDate, setSelectedDate] = useState(nextDays[0].date);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isBooking, setIsBooking] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const availableTimeSlots = useMemo(() => {
    const selectedDay = nextDays.find(d => d.date === selectedDate);
    if (!selectedDay) return defaultTimeSlots;

    if (!tutor.availability || tutor.availability.length === 0) {
      return defaultTimeSlots;
    }

    const dayAvailability = tutor.availability.filter(
      a => a.dayOfWeek === selectedDay.dayOfWeek && a.isAvailable !== false
    );

    if (dayAvailability.length === 0) return [];

    const slots: string[] = [];
    dayAvailability.forEach(a => {
      slots.push(...generateTimeSlots(a.startTime, a.endTime));
    });

    return [...new Set(slots)].sort();
  }, [selectedDate, tutor.availability, nextDays]);

  const isDayAvailable = (dayOfWeek: number): boolean => {
    if (!tutor.availability || tutor.availability.length === 0) return true;
    return tutor.availability.some(a => a.dayOfWeek === dayOfWeek && a.isAvailable !== false);
  };

  const handleBookSession = async () => {
    if (!user) {
      toast.error("Please login to book a session");
      router.push("/login");
      return;
    }

    if (!selectedTime) {
      toast.error("Please select a time slot");
      return;
    }

    setIsBooking(true);
    try {
      const [hours, minutes] = selectedTime.split(":");
      const endHour = (parseInt(hours) + 1).toString().padStart(2, "0");
      const endTime = `${endHour}:${minutes}`;

      await bookingsService.createBooking({
        tutorId: tutor.userId || tutor.id,
        date: selectedDate,
        startTime: selectedTime,
        endTime: endTime,
      });

      toast.success("Session booked successfully!");
      router.push("/dashboard/bookings");
    } catch (error) {
      toast.error((error as Error).message || "Failed to book session");
    } finally {
      setIsBooking(false);
    }
  };

  const handleMessageTutor = () => {
    toast.info("Messaging feature coming soon!", {
      description: "You'll be able to message tutors directly in a future update."
    });
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-3xl font-bold">${tutor.hourlyRate}</span>
            <span className="text-muted-foreground"> / hour</span>
          </div>
          <Badge variant="secondary">
            <Video className="w-3 h-3 mr-1" />
            Online
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Select Date
          </h4>
          <div className="grid grid-cols-7 gap-1">
            {nextDays.map((d) => {
              const isAvailable = isDayAvailable(d.dayOfWeek);
              return (
                <button
                  key={d.date}
                  onClick={() => {
                    if (isAvailable) {
                      setSelectedDate(d.date);
                      setSelectedTime(null);
                    }
                  }}
                  disabled={!isAvailable}
                  className={cn(
                    "py-2 px-1 rounded-lg border text-center transition-colors",
                    selectedDate === d.date
                      ? "border-primary bg-primary/5"
                      : isAvailable
                        ? "hover:border-muted-foreground/30"
                        : "opacity-40 cursor-not-allowed bg-muted"
                  )}
                >
                  <p className="text-xs text-muted-foreground">{d.day}</p>
                  <p className="font-semibold text-sm">{d.num}</p>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Select Time
          </h4>
          {availableTimeSlots.length > 0 ? (
            <div className="grid grid-cols-3 gap-2">
              {availableTimeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={cn(
                    "py-2 rounded-lg border text-sm transition-colors",
                    selectedTime === time
                      ? "border-primary bg-primary text-primary-foreground"
                      : "hover:border-muted-foreground/30"
                  )}
                >
                  {time}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 py-4 text-muted-foreground bg-muted/50 rounded-lg">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">Not available on this day</span>
            </div>
          )}
        </div>

        <Separator />

        <div className="space-y-3">
          <Button
            className="w-full"
            size="lg"
            disabled={!selectedTime || isBooking || availableTimeSlots.length === 0}
            onClick={handleBookSession}
          >
            {isBooking ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Booking...
              </>
            ) : (
              `Book Session - $${tutor.hourlyRate}`
            )}
          </Button>
          <Button
            variant="outline"
            className="w-full"
            size="lg"
            onClick={handleMessageTutor}
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Message Tutor
          </Button>
        </div>

        <p className="text-xs text-center text-muted-foreground">
          Free cancellation up to 24 hours before the session
        </p>
      </CardContent>
    </Card>
  );
}
