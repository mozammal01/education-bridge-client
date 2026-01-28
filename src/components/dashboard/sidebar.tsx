"use client";

import { usePathname } from "next/navigation";
import { DashboardNav, tutorNav, adminNav } from "./nav";

export function DashboardSidebar() {
  const pathname = usePathname();
  
  const getNavItems = () => {
    if (pathname.startsWith("/admin")) return adminNav;
    if (pathname.startsWith("/tutor")) return tutorNav;
    return undefined; // defaults to student nav
  };

  return (
    <aside className="hidden lg:block w-64 border-r bg-background min-h-[calc(100vh-4rem)]">
      <DashboardNav items={getNavItems()} />
    </aside>
  );
}
