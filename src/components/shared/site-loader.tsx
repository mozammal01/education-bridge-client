"use client";

import { GraduationCap, BookOpen, Clock, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface SiteLoaderProps {
  className?: string;
  variant?: "full" | "inline" | "card";
  text?: string;
}

export function SiteLoader({ className, variant = "full", text = "Connecting Knowledge..." }: SiteLoaderProps) {
  if (variant === "full") {
    return (
      <div className={cn("fixed inset-0 z-100 flex flex-col items-center justify-center bg-background/80 backdrop-blur-md animate-in fade-in duration-500", className)}>
        <div className="relative">
          {/* Outer Ring */}
          <div className="h-24 w-24 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
          
          {/* Core Icon Animation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative h-12 w-12 flex items-center justify-center">
              <GraduationCap className="h-8 w-8 text-primary animate-bounce" />
            </div>
          </div>
          
          {/* Orbiting Icons */}
          <div className="absolute -top-4 -left-4 animate-bounce delay-100">
            <BookOpen className="h-5 w-5 text-blue-400 opacity-60" />
          </div>
          <div className="absolute -bottom-4 -right-4 animate-bounce delay-300">
            <Users className="h-5 w-5 text-emerald-400 opacity-60" />
          </div>
        </div>
        
        <div className="mt-8 flex flex-col items-center">
          <p className="text-sm font-semibold tracking-widest uppercase text-muted-foreground animate-pulse">
            {text}
          </p>
          <div className="mt-2 flex gap-1">
            <div className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
            <div className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
            <div className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce" />
          </div>
        </div>
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div className={cn("flex flex-col items-center justify-center p-12 space-y-4 bg-muted/20 rounded-2xl border border-dashed border-primary/10", className)}>
        <div className="h-12 w-12 rounded-full border-3 border-primary/10 border-t-primary animate-spin" />
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{text}</p>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="h-4 w-4 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
      <span className="text-sm text-muted-foreground">{text}</span>
    </div>
  );
}
