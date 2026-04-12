import type { Metadata } from "next";
import { ProfileView } from "@/components/dashboard/profile/profile-view";

export const metadata: Metadata = {
  title: "Tutor Profile",
  description: "Manage your professional tutor profile and teaching settings",
};

export default function TutorProfilePage() {
  return <ProfileView />;
}
