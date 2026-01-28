"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, User, Loader2, GraduationCap, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Role = "student" | "tutor";

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role>("student");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Create your account</h1>
        <p className="text-muted-foreground">
          Join EduBridge and start your learning journey
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* role selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium">I want to</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setSelectedRole("student")}
              className={cn(
                "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all",
                selectedRole === "student"
                  ? "border-primary bg-primary/5"
                  : "border-muted hover:border-muted-foreground/30"
              )}
            >
              <div className={cn(
                "p-2 rounded-lg",
                selectedRole === "student" ? "bg-primary/10" : "bg-muted"
              )}>
                <GraduationCap className={cn(
                  "h-5 w-5",
                  selectedRole === "student" ? "text-primary" : "text-muted-foreground"
                )} />
              </div>
              <span className={cn(
                "text-sm font-medium",
                selectedRole === "student" ? "text-primary" : "text-muted-foreground"
              )}>
                Learn
              </span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedRole("tutor")}
              className={cn(
                "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all",
                selectedRole === "tutor"
                  ? "border-primary bg-primary/5"
                  : "border-muted hover:border-muted-foreground/30"
              )}
            >
              <div className={cn(
                "p-2 rounded-lg",
                selectedRole === "tutor" ? "bg-primary/10" : "bg-muted"
              )}>
                <BookOpen className={cn(
                  "h-5 w-5",
                  selectedRole === "tutor" ? "text-primary" : "text-muted-foreground"
                )} />
              </div>
              <span className={cn(
                "text-sm font-medium",
                selectedRole === "tutor" ? "text-primary" : "text-muted-foreground"
              )}>
                Teach
              </span>
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              className="pl-10"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="pl-10"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Min. 8 characters"
              className="pl-10 pr-10"
              required
              minLength={8}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="text-sm font-medium">
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="Confirm your password"
              className="pl-10 pr-10"
              required
              minLength={8}
            />
          </div>
        </div>

        <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            `Create ${selectedRole === "student" ? "Student" : "Tutor"} Account`
          )}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          By signing up, you agree to our{" "}
          <Link href="/terms" className="text-primary hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
        </p>
      </form>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="text-primary font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
