"use client";

import { User, UserRole } from "@/types";
import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { toast } from "sonner";
import { api } from "@/lib/api";

// Remove trailing slash from URL to prevent double slashes
const API_URL = (process.env.NEXT_PUBLIC_API_URL || "https://education-bridge-server.vercel.app").replace(/\/+$/, "");

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (userData: User) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Handle pending role update from social signup
  const handlePendingRoleUpdate = useCallback(async (currentUser: User) => {
    const pendingRole = localStorage.getItem("pendingRole");

    if (pendingRole === UserRole.TUTOR && currentUser.role === UserRole.STUDENT) {
      try {
        await api.patch("/api/user/role", { role: UserRole.TUTOR });
        localStorage.removeItem("pendingRole");
        // Refresh user data to get updated role
        const res = await fetch(`${API_URL}/api/auth/me`, {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.data);
          toast.success("Welcome! Your tutor account is ready. Please complete your profile.");
        }
      } catch {
        localStorage.removeItem("pendingRole");
        toast.error("Failed to set up tutor account. You can update your role later.");
      }
    } else {
      // Clear pending role if it doesn't apply
      localStorage.removeItem("pendingRole");
    }
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${API_URL}/api/auth/me`, {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.data);
          // Check for pending role update after social login
          await handlePendingRoleUpdate(data.data);
        }
      } catch {
        // not logged in
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, [handlePendingRoleUpdate]);

  const login = (userData: User) => setUser(userData);

  const refreshUser = async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/me`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.data);
      }
    } catch {
      // failed to refresh
    }
  };

  const logout = async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/signout`, {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to logout");
      setUser(null);
      toast.success("Logged out successfully");
    } catch {
      setUser(null);
      toast.error("Logout failed, but session cleared locally");
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
