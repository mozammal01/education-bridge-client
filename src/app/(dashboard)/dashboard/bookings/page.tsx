import type { Metadata } from "next";
import { StudentBookings } from "@/components/dashboard/student/bookings";

export const metadata: Metadata = {
  title: "My Bookings",
  description: "View and manage your tutoring sessions",
};

export default function BookingsPage() {
  return <StudentBookings />;
}
