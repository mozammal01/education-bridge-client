import type { Metadata } from "next";
import { UsersManagement } from "@/components/dashboard/admin/users-management";

export const metadata: Metadata = {
  title: "Manage Users",
  description: "View and manage all platform users",
};

export default function UsersPage() {
  return <UsersManagement />;
}
