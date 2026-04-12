import type { Metadata } from "next";
import { TutorsManagement } from "@/components/dashboard/admin/tutors-management";

export const metadata: Metadata = {
  title: "Tutor Intelligence Panel",
  description: "Manage platform educators and global verification status",
};

export default function AdminTutorsPage() {
  return <TutorsManagement />;
}
