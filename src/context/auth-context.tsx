"use client";

import { User } from "@/types";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";


type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (userData: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  console.log("Current user", user)

  // Check if user is already logged in (on mount)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/me", {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.data);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = (userData: User) => setUser(userData);

  const logout = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/signout", {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Failed to logout");
      }
      setUser(null);
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout failed:", error);
      // Still clear user locally even if API fails
      setUser(null);
      toast.error("Logout failed, but session cleared locally");
    }
  };


  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}