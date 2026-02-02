"use client";

import { ProtectedRoute } from "@/components/auth";
import { UserRole } from "@/types";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
      {children}
    </ProtectedRoute>
  );
}
