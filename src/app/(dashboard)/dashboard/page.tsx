import type { Metadata } from "next";
import { StudentOverview } from "@/components/dashboard/student/overview";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "View your learning progress and upcoming sessions",
};

export default function StudentDashboardPage() {
  return <StudentOverview />;
}
