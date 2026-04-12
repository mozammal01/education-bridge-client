"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  User,
  BookOpen,
  Clock,
  Users,
  FolderOpen,
  MessageSquare,
  Settings,
  CreditCard,
  BarChart3,
  GraduationCap,
  Shield,
  Globe,
  Landmark,
  PieChart,
  type LucideIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

const studentNav: NavItem[] = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Bookings", href: "/dashboard/bookings", icon: Calendar },
  { label: "Messages", href: "/dashboard/messages", icon: MessageSquare },
  { label: "Learning History", href: "/dashboard/history", icon: BookOpen },
  { label: "Payments", href: "/dashboard/payments", icon: CreditCard },
  { label: "Profile", href: "/dashboard/profile", icon: User },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export const tutorNav: NavItem[] = [
  { label: "Overview", href: "/tutor/dashboard", icon: LayoutDashboard },
  { label: "Sessions", href: "/tutor/sessions", icon: BookOpen },
  { label: "Availability", href: "/tutor/availability", icon: Clock },
  { label: "Messages", href: "/tutor/messages", icon: MessageSquare },
  { label: "Earnings", href: "/tutor/earnings", icon: CreditCard },
  { label: "Analytics", href: "/tutor/analytics", icon: BarChart3 },
  { label: "Profile", href: "/tutor/profile", icon: User },
  { label: "Settings", href: "/tutor/settings", icon: Settings },
];

export const adminNav: NavItem[] = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Tutors", href: "/admin/tutors", icon: GraduationCap },
  { label: "Bookings", href: "/admin/bookings", icon: Calendar },
  { label: "Categories", href: "/admin/categories", icon: FolderOpen },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Payments", href: "/admin/payments", icon: CreditCard },
  { label: "Profile", href: "/admin/profile", icon: User },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export const managerNav: NavItem[] = [
  { label: "Overview", href: "/manager", icon: LayoutDashboard },
  { label: "Content Control", href: "/manager/content", icon: Shield },
  { label: "Blogs/News", href: "/manager/blogs", icon: BookOpen },
  { label: "User Reviews", href: "/manager/reviews", icon: MessageSquare },
  { label: "Reports", href: "/manager/reports", icon: BarChart3 },
  { label: "Profile", href: "/manager/profile", icon: User },
  { label: "Settings", href: "/manager/settings", icon: Settings },
];

export const organizerNav: NavItem[] = [
  { label: "Overview", href: "/organizer", icon: LayoutDashboard },
  { label: "My Institution", href: "/organizer/institution", icon: Landmark },
  { label: "Team/Tutors", href: "/organizer/tutors", icon: Users },
  { label: "Student Groups", href: "/organizer/groups", icon: Globe },
  { label: "Finance", href: "/organizer/finance", icon: PieChart },
  { label: "Analytics", href: "/organizer/analytics", icon: BarChart3 },
  { label: "Profile", href: "/organizer/profile", icon: User },
  { label: "Settings", href: "/organizer/settings", icon: Settings },
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
        const isBaseRoute = ["/dashboard", "/tutor/dashboard", "/admin", "/manager", "/organizer"].includes(item.href);
        const isActive = isBaseRoute ? pathname === item.href : pathname.startsWith(item.href);

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
