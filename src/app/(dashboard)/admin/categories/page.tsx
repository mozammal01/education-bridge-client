import type { Metadata } from "next";
import { CategoriesManagement } from "@/components/dashboard/admin/categories-management";

export const metadata: Metadata = {
  title: "Manage Categories",
  description: "Manage tutoring categories",
};

export default function CategoriesPage() {
  return <CategoriesManagement />;
}
