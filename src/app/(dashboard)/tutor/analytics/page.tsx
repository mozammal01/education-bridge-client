import { UnderConstruction } from "@/components/shared/under-construction";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tutor Analytics",
  description: "Insightful performance metrics and growth trends",
};

export default function TutorAnalyticsPage() {
  return (
    <UnderConstruction 
      title="Tutor Performance Insights" 
      message="We're building an advanced data visualization suite to help you track student engagement and revenue growth with precision."
    />
  );
}
