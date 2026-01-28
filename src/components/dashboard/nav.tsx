"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Calendar, 
  User,
  BookOpen,
  Clock,
  type LucideIcon 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

// student nav items
const studentNav: NavItem[] = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Bookings", href: "/dashboard/bookings", icon: Calendar },
  { label: "Profile", href: "/dashboard/profile", icon: User },
];

// tutor nav items (for later use)
export const tutorNav: NavItem[] = [
  { label: "Overview", href: "/tutor/dashboard", icon: LayoutDashboard },
  { label: "Sessions", href: "/tutor/sessions", icon: BookOpen },
  { label: "Availability", href: "/tutor/availability", icon: Clock },
  { label: "Profile", href: "/tutor/profile", icon: User },
];

interface DashboardNavProps {
  items?: NavItem[];
  onNavigate?: () => void;
}

export function DashboardNav({ items = studentNav, onNavigate }: DashboardNavProps) {
  const pathname = usePathname();

  return (
    <nav className="p-4 space-y-1">
      {items.map((item) => {
        const isActive = pathname === item.href || 
          (item.href !== "/dashboard" && item.href !== "/tutor/dashboard" && pathname.startsWith(item.href));

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
