"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { UserRole } from "@/types";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      // Not authenticated
      if (!user) {
        router.push("/login");
        return;
      }

      // Check role if allowedRoles is specified
      if (allowedRoles && allowedRoles.length > 0) {
        if (!allowedRoles.includes(user.role as UserRole)) {
          // Redirect to appropriate dashboard based on role
          if (user.role === UserRole.ADMIN) {
            router.push("/admin");
          } else if (user.role === UserRole.TUTOR) {
            router.push("/tutor/dashboard");
          } else {
            router.push("/dashboard");
          }
        }
      }
    }
  }, [user, isLoading, router, allowedRoles]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  // Check role access
  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role as UserRole)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Redirecting...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
