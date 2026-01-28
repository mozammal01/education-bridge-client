import type { Metadata } from "next";
import { BookingsManagement } from "@/components/dashboard/admin/bookings-management";

export const metadata: Metadata = {
  title: "Manage Bookings",
  description: "View and manage all platform bookings",
};

export default function BookingsPage() {
  return <BookingsManagement />;
}
