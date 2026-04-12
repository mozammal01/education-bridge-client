import { EarningsView } from "@/components/dashboard/tutor/earnings-view";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tutor Earnings",
  description: "Track your revenue and financial performance",
};

export default function TutorEarningsPage() {
  return <EarningsView />;
}
