"use client";

import { useAuth } from "@/context/auth-context";
import { DashboardNav, tutorNav, adminNav } from "./nav";
import { UserRole } from "@/types";

export function DashboardSidebar() {
  const { user } = useAuth();

  const getNavItems = () => {
    if (user?.role === UserRole.ADMIN) return adminNav;
    if (user?.role === UserRole.TUTOR) return tutorNav;
    return undefined; // defaults to student nav
  };

  return (
    <aside className="hidden lg:block w-64 border-r bg-background min-h-[calc(100vh-4rem)]">
      <DashboardNav items={getNavItems()} />
    </aside>
  );
}
