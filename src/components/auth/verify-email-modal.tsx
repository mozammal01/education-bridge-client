"use client";

import { Mail, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface VerifyEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
}

export function VerifyEmailModal({ isOpen, onClose, email }: VerifyEmailModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent showCloseButton={false} className="sm:max-w-md">
        <DialogHeader className="text-center sm:text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <DialogTitle className="text-xl">Verify your email</DialogTitle>
          <DialogDescription className="text-center">
            We&apos;ve sent a verification link to
          </DialogDescription>
        </DialogHeader>

        <div className="text-center space-y-4">
          <p className="font-medium text-foreground bg-muted px-4 py-2 rounded-lg">
            {email}
          </p>

          <div className="space-y-2 text-sm text-muted-foreground">
            <p>Click the link in your email to verify your account.</p>
            <p>If you don&apos;t see it, check your spam folder.</p>
          </div>

          <div className="flex items-center gap-2 justify-center text-sm text-muted-foreground">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span>Email sent successfully</span>
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-4">
          <Button asChild className="w-full">
            <Link href="/login">Go to Login</Link>
          </Button>
          <Button variant="ghost" onClick={onClose} className="w-full">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
