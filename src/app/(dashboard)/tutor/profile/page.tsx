import type { Metadata } from "next";
import { TutorProfileSettings } from "@/components/dashboard/tutor/profile-settings";

export const metadata: Metadata = {
  title: "Tutor Profile",
  description: "Manage your tutor profile and settings",
};

export default function TutorProfilePage() {
  return <TutorProfileSettings />;
}
