import { AnalyticsView } from "@/components/dashboard/tutor/analytics-view";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tutor Analytics",
  description: "Insightful performance metrics and growth trends",
};

export default function TutorAnalyticsPage() {
  return <AnalyticsView />;
}
