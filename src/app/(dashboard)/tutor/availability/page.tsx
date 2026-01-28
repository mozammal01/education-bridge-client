import type { Metadata } from "next";
import { TutorAvailability } from "@/components/dashboard/tutor/availability";

export const metadata: Metadata = {
  title: "Availability",
  description: "Set your available time slots",
};

export default function AvailabilityPage() {
  return <TutorAvailability />;
}
