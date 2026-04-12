import type { Metadata } from "next";
import { ProfileView } from "@/components/dashboard/profile/profile-view";

export const metadata: Metadata = {
  title: "My Profile",
  description: "View and manage your personal account settings",
};

export default function ProfilePage() {
  return <ProfileView />;
}
