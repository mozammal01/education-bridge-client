"use client";

import { useState, useEffect } from "react";
import { Clock, Plus, Trash2, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { DAYS_OF_WEEK, TIME_SLOTS } from "@/lib/constants";
import { toast } from "sonner";

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
  0: { enabled: false, slots: [] },
  1: { enabled: false, slots: [] },
  2: { enabled: false, slots: [] },
  3: { enabled: false, slots: [] },
  4: { enabled: false, slots: [] },
  5: { enabled: false, slots: [] },
  6: { enabled: false, slots: [] },
};

export function TutorAvailability() {
  const [availability, setAvailability] = useState<WeeklyAvailability>(defaultAvailability);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await fetch(
          `${(process.env.NEXT_PUBLIC_API_URL || "https://education-bridge-server.vercel.app").replace(/\/+$/, "")}/api/tutor/availability`,
          { credentials: "include" }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.data && Array.isArray(data.data)) {
            const newAvailability: WeeklyAvailability = { ...defaultAvailability };

            data.data.forEach((slot: { dayOfWeek: number; startTime: string; endTime: string }) => {
              const dayIndex = slot.dayOfWeek;
              if (!newAvailability[dayIndex].enabled) {
                newAvailability[dayIndex] = { enabled: true, slots: [] };
              }
              newAvailability[dayIndex].slots.push({
                id: Date.now().toString() + Math.random(),
                start: slot.startTime,
                end: slot.endTime,
              });
            });

            setAvailability(newAvailability);
          }
        }
      } catch {
        // Use default if fetch fails
      } finally {
        setLoading(false);
      }
    };

    fetchAvailability();
  }, []);

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
      const availabilityData = Object.entries(availability)
        .filter(([, day]) => day.enabled && day.slots.length > 0)
        .flatMap(([dayIndex, day]) =>
          day.slots.map((slot) => ({
            dayOfWeek: parseInt(dayIndex),
            startTime: slot.start,
            endTime: slot.end,
            isAvailable: true,
          }))
        );

      const response = await fetch(
        `${(process.env.NEXT_PUBLIC_API_URL || "https://education-bridge-server.vercel.app").replace(/\/+$/, "")}/api/tutor/availability`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ availability: availabilityData }),
        }
      );

      if (!response.ok) throw new Error("Failed to save");

      toast.success("Availability saved successfully!");
    } catch {
      toast.error("Failed to save availability");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

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
          {DAYS_OF_WEEK.map((day) => (
            <div
              key={day.value}
              className={cn(
                "p-4 rounded-xl border transition-colors",
                availability[day.value].enabled ? "bg-muted/30" : "bg-muted/10 opacity-60"
              )}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleDay(day.value)}
                    className={cn(
                      "w-12 h-6 rounded-full transition-colors relative",
                      availability[day.value].enabled ? "bg-primary" : "bg-muted-foreground/30"
                    )}
                  >
                    <span
                      className={cn(
                        "absolute top-1 w-4 h-4 rounded-full bg-white transition-transform",
                        availability[day.value].enabled ? "left-7" : "left-1"
                      )}
                    />
                  </button>
                  <span className="font-medium">{day.label}</span>
                  {!availability[day.value].enabled && (
                    <Badge variant="secondary">Unavailable</Badge>
                  )}
                </div>

                {availability[day.value].enabled && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => addSlot(day.value)}
                    className="gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    Add Slot
                  </Button>
                )}
              </div>

              {availability[day.value].enabled && availability[day.value].slots.length > 0 && (
                <div className="space-y-2 ml-[60px]">
                  {availability[day.value].slots.map((slot) => (
                    <div key={slot.id} className="flex items-center gap-3">
                      <select
                        value={slot.start}
                        onChange={(e) => updateSlot(day.value, slot.id, "start", e.target.value)}
                        className="px-3 py-2 rounded-lg border bg-background text-sm"
                      >
                        {TIME_SLOTS.map((time) => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                      <span className="text-muted-foreground">to</span>
                      <select
                        value={slot.end}
                        onChange={(e) => updateSlot(day.value, slot.id, "end", e.target.value)}
                        className="px-3 py-2 rounded-lg border bg-background text-sm"
                      >
                        {TIME_SLOTS.map((time) => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                      {availability[day.value].slots.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => removeSlot(day.value, slot.id)}
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
