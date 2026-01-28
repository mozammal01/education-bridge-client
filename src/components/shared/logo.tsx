import { GraduationCap } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

export function Logo({ className, iconOnly = false }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-2.5", className)}>
      <div className="p-1.5 bg-primary rounded-lg">
        <GraduationCap className="w-5 h-5 text-primary-foreground" />
      </div>
      {!iconOnly && (
        <span className="text-xl font-bold tracking-tight">
          <span className="text-primary">Edu</span>
          <span className="text-foreground">Bridge</span>
        </span>
      )}
    </Link>
  );
}
