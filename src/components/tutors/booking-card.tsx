"use client";

import { useState } from "react";
import { Calendar, Clock, MessageSquare, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { TutorProfile } from "@/types";
import { cn } from "@/lib/utils";

interface BookingCardProps {
  tutor: TutorProfile;
}

const timeSlots = [
  "09:00", "10:00", "11:00", "14:00", "15:00", "16:00"
];

const nextDays = Array.from({ length: 5 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() + i + 1);
  return {
    date: date.toISOString().split("T")[0],
    day: date.toLocaleDateString("en-US", { weekday: "short" }),
    num: date.getDate(),
  };
});

export function BookingCard({ tutor }: BookingCardProps) {
  const [selectedDate, setSelectedDate] = useState(nextDays[0].date);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

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
        {/* date selection */}
        <div>
          <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Select Date
          </h4>
          <div className="flex gap-2">
            {nextDays.map((d) => (
              <button
                key={d.date}
                onClick={() => {
                  setSelectedDate(d.date);
                  setSelectedTime(null);
                }}
                className={cn(
                  "flex-1 py-3 rounded-lg border text-center transition-colors",
                  selectedDate === d.date
                    ? "border-primary bg-primary/5"
                    : "hover:border-muted-foreground/30"
                )}
              >
                <p className="text-xs text-muted-foreground">{d.day}</p>
                <p className="font-semibold">{d.num}</p>
              </button>
            ))}
          </div>
        </div>

        {/* time selection */}
        <div>
          <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Select Time
          </h4>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map((time) => (
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
        </div>

        <Separator />

        {/* actions */}
        <div className="space-y-3">
          <Button className="w-full" size="lg" disabled={!selectedTime}>
            Book Session - ${tutor.hourlyRate}
          </Button>
          <Button variant="outline" className="w-full" size="lg">
            <MessageSquare className="w-4 h-4 mr-2" />
            Message Tutor
          </Button>
        </div>

        {/* info text */}
        <p className="text-xs text-center text-muted-foreground">
          Free cancellation up to 24 hours before the session
        </p>
      </CardContent>
    </Card>
  );
}
