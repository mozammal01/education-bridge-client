"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, ChevronDown, User, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Logo } from "./logo";
import { useAuth } from "@/context/auth-context";
import { UserRole } from "@/types";
import { useRouter } from "next/navigation";
import { getImageUrl } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";
import { motion } from "framer-motion";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Find Tutors", href: "/tutors" },
  { label: "Blog", href: "/blog" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const categories = [
  { name: "Mathematics", icon: "📐", path: "/categories/math" },
  { name: "Science", icon: "🧬", path: "/categories/science" },
  { name: "Languages", icon: "🌐", path: "/categories/languages" },
  { name: "Programming", icon: "💻", path: "/categories/programming" },
  { name: "Music", icon: "🎵", path: "/categories/music" },
  { name: "Arts", icon: "🎨", path: "/categories/arts" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const { user, logout } = useAuth();

  const isAdmin = user?.role === UserRole.ADMIN;
  const isTutor = user?.role === UserRole.TUTOR;
  const isStudent = user?.role === UserRole.STUDENT;

  const getDashboardLink = () => {
    if (isAdmin) return "/admin";
    if (isTutor) return "/tutor/dashboard";
    if (isStudent) return "/dashboard";
    return "/login";
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <nav className="flex h-16 items-center justify-between">
          <Logo />

          {/* desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted"
            >
              Home
            </Link>

            <Link
              href="/tutors"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted"
            >
              Find Tutors
            </Link>

            {/* Mega Menu / Advanced Dropdown for Categories */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-9 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
                  Categories <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[400px] p-4">
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((cat) => (
                    <Link
                      key={cat.name}
                      href={cat.path}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors group"
                    >
                      <span className="text-xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{cat.name}</span>
                        <span className="text-xs text-muted-foreground">Browse tutors</span>
                      </div>
                    </Link>
                  ))}
                </div>
                <DropdownMenuSeparator className="my-2" />
                <Link
                  href="/categories"
                  className="flex items-center justify-center p-2 text-sm font-medium text-primary hover:underline"
                >
                  View All Categories
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="/blog"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted"
            >
              Blog
            </Link>

            <Link
              href="/#how-it-works"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted"
            >
              How It Works
            </Link>

            <Link
              href="/about"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted"
            >
              About
            </Link>

            <Link
              href="/contact"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted"
            >
              Contact
            </Link>
          </div>

          {/* auth section */}
          <div className="hidden md:flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <ModeToggle />
            </motion.div>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2 pl-2 pr-3 hover:bg-primary/5 transition-colors">
                    <Avatar className="h-7 w-7 border border-primary/20">
                      <AvatarImage src={getImageUrl(user.image)} alt={user.name} />
                      <AvatarFallback className="text-xs bg-primary/10">
                        {user.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{user.name.split(" ")[0]}</span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52 p-1 rounded-xl shadow-2xl border-primary/10">
                  <DropdownMenuItem asChild>
                    <Link href={getDashboardLink() || ""} className="cursor-pointer gap-2 py-2.5 px-3 rounded-lg">
                      <User className="h-4 w-4 text-primary" />
                      <div className="flex flex-col">
                        <span className="font-medium text-sm">Dashboard</span>
                        <span className="text-[10px] text-muted-foreground">Manage your sessions</span>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={isAdmin ? "/admin/profile" : isTutor ? "/tutor/profile" : "/dashboard/profile"} className="cursor-pointer gap-2 py-2.5 px-3 rounded-lg">
                      <Settings className="h-4 w-4 text-primary" />
                      <div className="flex flex-col">
                        <span className="font-medium text-sm">Profile Settings</span>
                        <span className="text-[10px] text-muted-foreground">Update your information</span>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="my-1" />
                  <DropdownMenuItem className="text-destructive cursor-pointer gap-2 py-2.5 px-3 rounded-lg hover:bg-destructive/5" onClick={handleLogout}>
                    <LogOut className="h-4 w-4" />
                    <span className="font-medium text-sm">Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" asChild className="hover:text-primary transition-colors">
                  <Link href="/login">Log in</Link>
                </Button>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Button asChild className="shadow-lg shadow-primary/20 rounded-full px-6">
                    <Link href="/register">Sign up</Link>
                  </Button>
                </motion.div>
              </div>
            )}
          </div>

          {/* mobile menu trigger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-8">
                  <Logo />
                  <ModeToggle />
                </div>

                <nav className="flex flex-col gap-1 overflow-y-auto pr-2">
                  <Link
                    href="/"
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 text-base font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
                  >
                    Home
                  </Link>

                  <Link
                    href="/tutors"
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 text-base font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
                  >
                    Find Tutors
                  </Link>

                  <div className="px-4 py-3">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Categories</p>
                    <div className="grid grid-cols-2 gap-2">
                      {categories.map((cat) => (
                        <Link
                          key={cat.name}
                          href={cat.path}
                          onClick={() => setMobileOpen(false)}
                          className="flex flex-col items-center justify-center p-3 border rounded-xl hover:bg-muted transition-colors text-center"
                        >
                          <span className="text-xl mb-1">{cat.icon}</span>
                          <span className="text-xs font-medium">{cat.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <Link
                    href="/blog"
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 text-base font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
                  >
                    Blog
                  </Link>

                  <Link
                    href="/#how-it-works"
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 text-base font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
                  >
                    How It Works
                  </Link>

                  <Link
                    href="/about"
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 text-base font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
                  >
                    About
                  </Link>

                  <Link
                    href="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 text-base font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
                  >
                    Contact
                  </Link>
                </nav>

                <div className="mt-auto pt-8 border-t">
                  {user ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 px-4 py-2">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={getImageUrl(user.image)} />
                          <AvatarFallback>
                            {user.name.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground capitalize">{user.role}</p>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full" asChild>
                        <Link href={getDashboardLink() || ""}>Go to Dashboard</Link>
                      </Button>
                      <Button variant="ghost" className="w-full text-destructive" onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <Button asChild>
                        <Link href="/register">Sign up</Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link href="/login">Log in</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
}
