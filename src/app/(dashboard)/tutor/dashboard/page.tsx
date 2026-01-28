import type { Metadata } from "next";
import { TutorOverview } from "@/components/dashboard/tutor/overview";

export const metadata: Metadata = {
  title: "Tutor Dashboard",
  description: "Manage your tutoring sessions and profile",
};

export default function TutorDashboardPage() {
  return <TutorOverview />;
}
