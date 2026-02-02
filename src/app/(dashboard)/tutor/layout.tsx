"use client";

import { ProtectedRoute } from "@/components/auth";
import { UserRole } from "@/types";

export default function TutorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={[UserRole.TUTOR]}>
      {children}
    </ProtectedRoute>
  );
}
