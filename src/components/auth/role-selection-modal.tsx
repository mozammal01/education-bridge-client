"use client";

import { useState } from "react";
import { GraduationCap, BookOpen, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { UserRole } from "@/types";

interface RoleSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (role: UserRole) => void;
  provider: "google" | "github";
  isLoading?: boolean;
}

export function RoleSelectionModal({
  isOpen,
  onClose,
  onConfirm,
  provider,
  isLoading = false,
}: RoleSelectionModalProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.STUDENT);

  const handleConfirm = () => {
    onConfirm(selectedRole);
  };

  const providerName = provider === "google" ? "Google" : "GitHub";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Choose your account type</DialogTitle>
          <DialogDescription>
            How would you like to use SkillBridge with your {providerName} account?
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-4">
          <button
            type="button"
            onClick={() => setSelectedRole(UserRole.STUDENT)}
            disabled={isLoading}
            className={cn(
              "flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all",
              selectedRole === UserRole.STUDENT
                ? "border-primary bg-primary/5 shadow-sm"
                : "border-muted hover:border-muted-foreground/30",
              isLoading && "opacity-50 cursor-not-allowed"
            )}
          >
            <div
              className={cn(
                "p-3 rounded-full",
                selectedRole === UserRole.STUDENT
                  ? "bg-primary/10"
                  : "bg-muted"
              )}
            >
              <GraduationCap
                className={cn(
                  "h-6 w-6",
                  selectedRole === UserRole.STUDENT
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              />
            </div>
            <div className="text-center">
              <p
                className={cn(
                  "font-semibold",
                  selectedRole === UserRole.STUDENT
                    ? "text-primary"
                    : "text-foreground"
                )}
              >
                Student
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                I want to learn
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setSelectedRole(UserRole.TUTOR)}
            disabled={isLoading}
            className={cn(
              "flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all",
              selectedRole === UserRole.TUTOR
                ? "border-primary bg-primary/5 shadow-sm"
                : "border-muted hover:border-muted-foreground/30",
              isLoading && "opacity-50 cursor-not-allowed"
            )}
          >
            <div
              className={cn(
                "p-3 rounded-full",
                selectedRole === UserRole.TUTOR ? "bg-primary/10" : "bg-muted"
              )}
            >
              <BookOpen
                className={cn(
                  "h-6 w-6",
                  selectedRole === UserRole.TUTOR
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              />
            </div>
            <div className="text-center">
              <p
                className={cn(
                  "font-semibold",
                  selectedRole === UserRole.TUTOR
                    ? "text-primary"
                    : "text-foreground"
                )}
              >
                Tutor
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                I want to teach
              </p>
            </div>
          </button>
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            className="flex-1"
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              `Continue with ${providerName}`
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
