"use client";

import Link from "next/link";
import { Construction, ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UnderConstructionProps {
  title?: string;
  message?: string;
}

export function UnderConstruction({
  title = "Under Construction",
  message = "We're working hard to bring you this feature. Check back soon!"
}: UnderConstructionProps) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md px-4">
        <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10">
          <Construction className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-2xl font-bold mb-2">{title}</h1>
        <p className="text-muted-foreground mb-8">{message}</p>
        <div className="flex gap-3 justify-center">
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
          <Button asChild>
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
