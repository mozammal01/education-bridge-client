"use client";

import { useState } from "react";
import { Clock, Plus, Trash2, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { DAYS_OF_WEEK, TIME_SLOTS } from "@/lib/constants";

interface TimeSlot {
  id: string;
  start: string;
  end: string;
}

interface DayAvailability {
  enabled: boolean;
  slots: TimeSlot[];
}

type WeeklyAvailability = Record<number, DayAvailability>;

const defaultAvailability: WeeklyAvailability = {
  0: { enabled: false, slots: [] }, // Sunday
  1: { enabled: true, slots: [{ id: "1", start: "09:00", end: "17:00" }] },
  2: { enabled: true, slots: [{ id: "2", start: "09:00", end: "17:00" }] },
  3: { enabled: true, slots: [{ id: "3", start: "09:00", end: "17:00" }] },
  4: { enabled: true, slots: [{ id: "4", start: "09:00", end: "17:00" }] },
  5: { enabled: true, slots: [{ id: "5", start: "09:00", end: "17:00" }] },
  6: { enabled: false, slots: [] }, // Saturday
};

export function TutorAvailability() {
  const [availability, setAvailability] = useState<WeeklyAvailability>(defaultAvailability);
  const [saving, setSaving] = useState(false);

  const toggleDay = (dayIndex: number) => {
    setAvailability((prev) => ({
      ...prev,
      [dayIndex]: {
        ...prev[dayIndex],
        enabled: !prev[dayIndex].enabled,
        slots: !prev[dayIndex].enabled ? [{ id: Date.now().toString(), start: "09:00", end: "17:00" }] : [],
      },
    }));
  };

  const addSlot = (dayIndex: number) => {
    setAvailability((prev) => ({
      ...prev,
      [dayIndex]: {
        ...prev[dayIndex],
        slots: [...prev[dayIndex].slots, { id: Date.now().toString(), start: "09:00", end: "10:00" }],
      },
    }));
  };

  const removeSlot = (dayIndex: number, slotId: string) => {
    setAvailability((prev) => ({
      ...prev,
      [dayIndex]: {
        ...prev[dayIndex],
        slots: prev[dayIndex].slots.filter((s) => s.id !== slotId),
      },
    }));
  };

  const updateSlot = (dayIndex: number, slotId: string, field: "start" | "end", value: string) => {
    setAvailability((prev) => ({
      ...prev,
      [dayIndex]: {
        ...prev[dayIndex],
        slots: prev[dayIndex].slots.map((s) =>
          s.id === slotId ? { ...s, [field]: value } : s
        ),
      },
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Convert availability to API format
      const availabilityData = Object.entries(availability)
        .filter(([_, day]) => day.enabled && day.slots.length > 0)
        .flatMap(([dayIndex, day]) =>
          day.slots.map((slot) => ({
            dayOfWeek: parseInt(dayIndex),
            startTime: slot.start,
            endTime: slot.end,
            isAvailable: true,
          }))
        );

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/tutor/availability`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ availability: availabilityData }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save availability");
      }

      // Show success message (you could add toast here)
      alert("Availability saved successfully!");
    } catch (error) {
      console.error("Failed to save availability:", error);
      alert("Failed to save availability. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Availability</h1>
          <p className="text-muted-foreground">Set your weekly available time slots</p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Weekly Schedule
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {DAYS_OF_WEEK.map((day, index) => (
            <div
              key={day}
              className={cn(
                "p-4 rounded-xl border transition-colors",
                availability[index].enabled ? "bg-muted/30" : "bg-muted/10 opacity-60"
              )}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleDay(index)}
                    className={cn(
                      "w-12 h-6 rounded-full transition-colors relative",
                      availability[index].enabled ? "bg-primary" : "bg-muted-foreground/30"
                    )}
                  >
                    <span
                      className={cn(
                        "absolute top-1 w-4 h-4 rounded-full bg-white transition-transform",
                        availability[index].enabled ? "left-7" : "left-1"
                      )}
                    />
                  </button>
                  <span className="font-medium">{day}</span>
                  {!availability[index].enabled && (
                    <Badge variant="secondary">Unavailable</Badge>
                  )}
                </div>

                {availability[index].enabled && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => addSlot(index)}
                    className="gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    Add Slot
                  </Button>
                )}
              </div>

              {availability[index].enabled && availability[index].slots.length > 0 && (
                <div className="space-y-2 ml-15">
                  {availability[index].slots.map((slot) => (
                    <div key={slot.id} className="flex items-center gap-3">
                      <select
                        value={slot.start}
                        onChange={(e) => updateSlot(index, slot.id, "start", e.target.value)}
                        className="px-3 py-2 rounded-lg border bg-background text-sm"
                      >
                        {TIME_SLOTS.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                      <span className="text-muted-foreground">to</span>
                      <select
                        value={slot.end}
                        onChange={(e) => updateSlot(index, slot.id, "end", e.target.value)}
                        className="px-3 py-2 rounded-lg border bg-background text-sm"
                      >
                        {TIME_SLOTS.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                      {availability[index].slots.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => removeSlot(index, slot.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Students can only book during your available time slots</li>
            <li>• Set multiple slots per day if you have breaks</li>
            <li>• Keep your availability updated for accurate bookings</li>
            <li>• Time zone: Your local time will be shown to students</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
