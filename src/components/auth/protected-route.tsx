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

// Helper function to check if user role matches allowed roles
function isRoleAllowed(userRole: string | UserRole | undefined, allowedRoles: UserRole[]): boolean {
  if (!userRole || allowedRoles.length === 0) return true;

  // Check both enum value and string value
  return allowedRoles.some(role =>
    userRole === role || userRole === role.toString()
  );
}

// Helper to check specific role
function hasRole(userRole: string | UserRole | undefined, role: UserRole): boolean {
  return userRole === role || userRole === role.toString();
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
        if (!isRoleAllowed(user.role, allowedRoles)) {
          // Redirect to appropriate dashboard based on role
          if (hasRole(user.role, UserRole.ADMIN)) {
            router.push("/admin");
          } else if (hasRole(user.role, UserRole.TUTOR)) {
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
  if (allowedRoles && allowedRoles.length > 0 && !isRoleAllowed(user.role, allowedRoles)) {
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
