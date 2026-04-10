import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { KeyRound, Sparkles } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-linear-to-b from-primary/5 via-background to-background relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -z-10" />

      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6 relative">
             <KeyRound className="w-8 h-8 text-primary" />
             <div className="absolute -top-2 -right-2 bg-amber-400 p-1.5 rounded-lg shadow-lg rotate-12">
               <Sparkles className="w-3 h-3 text-white" />
             </div>
          </div>
          <h1 className="text-3xl font-black tracking-tight mb-3">Forgot Password?</h1>
          <p className="text-muted-foreground">
            No worries, it happens. Enter your email and we'll send you a link to reset your password.
          </p>
        </div>

        <div className="bg-card border rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-black/5 backdrop-blur-sm">
          <ForgotPasswordForm />
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Remember your password?{" "}
          <Link href="/login" className="text-primary hover:underline font-bold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
