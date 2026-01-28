import type { Metadata } from "next";
import { StudentProfile } from "@/components/dashboard/student/profile";

export const metadata: Metadata = {
  title: "My Profile",
  description: "Manage your account settings",
};

export default function ProfilePage() {
  return <StudentProfile />;
}
