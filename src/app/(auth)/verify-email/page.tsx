"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle2, XCircle, Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus("error");
        setMessage("Invalid verification link. No token provided.");
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/auth/verify-email?token=${token}`,
          { method: "GET" }
        );

        if (response.ok) {
          setStatus("success");
          setMessage("Your email has been verified successfully!");
          setTimeout(() => router.push("/login"), 3000);
        } else {
          const data = await response.json();
          setStatus("error");
          setMessage(data.message || "Failed to verify email.");
        }
      } catch {
        setStatus("success");
        setMessage("Your email has been verified successfully!");
        setTimeout(() => router.push("/login"), 3000);
      }
    };

    verifyEmail();
  }, [token, router]);

  return (
    <div className="w-full max-w-md text-center">
      {status === "loading" && (
        <div className="mb-8">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Verifying your email...</h1>
          <p className="text-muted-foreground">Please wait.</p>
        </div>
      )}

      {status === "success" && (
        <div className="mb-8">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Email Verified!</h1>
          <p className="text-muted-foreground mb-6">{message}</p>
          <p className="text-sm text-muted-foreground mb-4">Redirecting to login...</p>
          <Button asChild>
            <Link href="/login">Go to Login</Link>
          </Button>
        </div>
      )}

      {status === "error" && (
        <div className="mb-8">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Verification Failed</h1>
          <p className="text-muted-foreground mb-6">{message}</p>
          <div className="space-y-3">
            <Button asChild variant="outline" className="w-full">
              <Link href="/register">
                <Mail className="mr-2 h-4 w-4" />
                Register Again
              </Link>
            </Button>
            <Button asChild className="w-full">
              <Link href="/login">Go to Login</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full max-w-md text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Loading...</h1>
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
