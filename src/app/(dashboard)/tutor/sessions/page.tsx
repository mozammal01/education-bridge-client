import type { Metadata } from "next";
import { TutorSessions } from "@/components/dashboard/tutor/sessions";

export const metadata: Metadata = {
  title: "My Sessions",
  description: "View and manage your teaching sessions",
};

export default function SessionsPage() {
  return <TutorSessions />;
}
