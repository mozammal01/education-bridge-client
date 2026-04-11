"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GoogleIcon, GitHubIcon } from "@/components/icons";
import { type LoginForm } from "@/types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { BASE_URL } from "@/lib/api";

export function LoginForm() {
  const [formData, setFormData] = useState<LoginForm>({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/auth/sign-in/email`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to login");

      const userData = data.user || data.data;
      if (!userData) throw new Error("No user data received from server");

      login(userData);
      toast.success("Logged in successfully");
      router.push("/");
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: "google" | "github") => {
    setSocialLoading(provider);
    try {
      const res = await fetch(`${BASE_URL}/api/auth/sign-in/social`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          provider,
          callbackURL: window.location.origin,
        }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.message || "Failed to initiate social login");
      }
    } catch (error) {
      toast.error((error as Error).message || "Social login failed");
      setSocialLoading(null);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Welcome back</h1>
        <p className="text-muted-foreground">Enter your credentials to access your account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="pl-10"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-medium">Password</label>
            <Link href="/forgot-password" className="text-sm text-primary hover:underline">Forgot password?</Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="pl-10 pr-10"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <Button type="submit" className="w-full" size="lg" disabled={isLoading || formData.email === "" || formData.password === ""}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </Button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-background px-4 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            type="button"
            className="w-full h-11 border-2 hover:bg-muted"
            disabled={!!socialLoading}
            onClick={() => handleSocialLogin("google")}
          >
            {socialLoading === "google" ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <GoogleIcon className="mr-2" />
            )}
            Google
          </Button>
          <Button
            variant="outline"
            type="button"
            className="w-full h-11 border-2 hover:bg-muted"
            disabled={!!socialLoading}
            onClick={() => handleSocialLogin("github")}
          >
            {socialLoading === "github" ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <GitHubIcon className="mr-2" />
            )}
            GitHub
          </Button>
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-4 text-muted-foreground font-semibold">Demo Accounts</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="text-[10px] h-8 border-primary/20 hover:bg-primary/5 hover:text-primary"
            onClick={() => setFormData({ email: "student@bridge.com", password: "password123" })}
          >
            Student
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="text-[10px] h-8 border-accent/20 hover:bg-accent/5 hover:text-accent"
            onClick={() => setFormData({ email: "tutor@bridge.com", password: "password123" })}
          >
            Tutor
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="text-[10px] h-8 border-amber-500/20 hover:bg-amber-500/5 hover:text-amber-500"
            onClick={() => setFormData({ email: "admin@bridge.com", password: "password123" })}
          >
            Admin
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="text-[10px] h-8 border-emerald-500/20 hover:bg-emerald-500/5 hover:text-emerald-500 col-span-1"
            onClick={() => setFormData({ email: "manager@bridge.com", password: "password123" })}
          >
            Manager
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="text-[10px] h-8 border-indigo-500/20 hover:bg-indigo-500/5 hover:text-indigo-500 col-span-2"
            onClick={() => setFormData({ email: "organizer@bridge.com", password: "password123" })}
          >
            Organizer
          </Button>
        </div>
      </form>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-primary font-medium hover:underline">Sign up</Link>
      </p>
    </div>
  );
}
