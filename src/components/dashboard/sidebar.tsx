"use client";

import { usePathname } from "next/navigation";
import { DashboardNav, tutorNav } from "./nav";

export function DashboardSidebar() {
  const pathname = usePathname();
  const isTutorDashboard = pathname.startsWith("/tutor");

  return (
    <aside className="hidden lg:block w-64 border-r bg-background min-h-[calc(100vh-4rem)]">
      <DashboardNav items={isTutorDashboard ? tutorNav : undefined} />
    </aside>
  );
}
