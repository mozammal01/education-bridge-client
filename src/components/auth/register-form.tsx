"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, User, Loader2, GraduationCap, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { UserRole } from "@/types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { GoogleIcon, GitHubIcon } from "@/components/icons";
import { RoleSelectionModal } from "./role-selection-modal";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://education-bridge-server.vercel.app";

export function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: UserRole.STUDENT
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<"google" | "github">("google");
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);

    const submitData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    };

    try {
      const res = await fetch(`${API_URL}/api/auth/sign-up/email`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(submitData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to create account");

      const userData = data.user || data.data;
      if (userData) {
        login(userData);
      }

      toast.success("Account created successfully!");
      router.push("/");
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialClick = (provider: "google" | "github") => {
    setSelectedProvider(provider);
    setShowRoleModal(true);
  };

  const handleSocialSignup = async (role: UserRole) => {
    setSocialLoading(selectedProvider);
    // Store selected role in localStorage for post-OAuth handling
    localStorage.setItem("pendingRole", role);

    try {
      // Use POST request to get the OAuth redirect URL from better-auth
      const res = await fetch(`${API_URL}/api/auth/sign-in/social`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          provider: selectedProvider,
          callbackURL: window.location.origin,
        }),
      });

      const data = await res.json();

      if (data.url) {
        // Redirect to OAuth provider
        window.location.href = data.url;
      } else {
        throw new Error(data.message || "Failed to initiate social signup");
      }
    } catch (error) {
      toast.error((error as Error).message || "Social signup failed");
      setSocialLoading(null);
      setShowRoleModal(false);
      localStorage.removeItem("pendingRole");
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Create your account</h1>
        <p className="text-muted-foreground">Join SkillBridge and start your learning journey</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium">I want to</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, role: UserRole.STUDENT })}
              className={cn(
                "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all",
                formData.role === UserRole.STUDENT
                  ? "border-primary bg-primary/5"
                  : "border-muted hover:border-muted-foreground/30"
              )}
            >
              <div className={cn(
                "p-2 rounded-lg",
                formData.role === UserRole.STUDENT ? "bg-primary/10" : "bg-muted"
              )}>
                <GraduationCap className={cn(
                  "h-5 w-5",
                  formData.role === UserRole.STUDENT ? "text-primary" : "text-muted-foreground"
                )} />
              </div>
              <span className={cn(
                "text-sm font-medium",
                formData.role === UserRole.STUDENT ? "text-primary" : "text-muted-foreground"
              )}>
                Learn
              </span>
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, role: UserRole.TUTOR })}
              className={cn(
                "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all",
                formData.role === UserRole.TUTOR
                  ? "border-primary bg-primary/5"
                  : "border-muted hover:border-muted-foreground/30"
              )}
            >
              <div className={cn(
                "p-2 rounded-lg",
                formData.role === UserRole.TUTOR ? "bg-primary/10" : "bg-muted"
              )}>
                <BookOpen className={cn(
                  "h-5 w-5",
                  formData.role === UserRole.TUTOR ? "text-primary" : "text-muted-foreground"
                )} />
              </div>
              <span className={cn(
                "text-sm font-medium",
                formData.role === UserRole.TUTOR ? "text-primary" : "text-muted-foreground"
              )}>
                Teach
              </span>
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              className="pl-10"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
        </div>

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
          <label htmlFor="password" className="text-sm font-medium">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Min. 8 characters"
              className="pl-10 pr-10"
              required
              minLength={8}
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

        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="Confirm your password"
              className="pl-10 pr-10"
              required
              minLength={8}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>

        <Button type="submit" className="w-full" size="lg" disabled={isLoading || formData.name === "" || formData.email === "" || formData.password === "" || confirmPassword === ""}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            `Create ${formData.role === UserRole.STUDENT ? "Student" : formData.role === UserRole.TUTOR ? "Tutor" : "Admin"} Account`
          )}
        </Button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-background px-4 text-muted-foreground">Or sign up with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            type="button"
            className="w-full"
            disabled={!!socialLoading}
            onClick={() => handleSocialClick("google")}
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
            className="w-full"
            disabled={!!socialLoading}
            onClick={() => handleSocialClick("github")}
          >
            {socialLoading === "github" ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <GitHubIcon className="mr-2" />
            )}
            GitHub
          </Button>
        </div>

        <p className="text-xs text-muted-foreground text-center mt-4">
          By signing up, you agree to our{" "}
          <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
        </p>
      </form>

      <RoleSelectionModal
        isOpen={showRoleModal}
        onClose={() => setShowRoleModal(false)}
        onConfirm={handleSocialSignup}
        provider={selectedProvider}
        isLoading={!!socialLoading}
      />

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="text-primary font-medium hover:underline">Sign in</Link>
      </p>
    </div>
  );
}
