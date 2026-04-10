"use client";

import * as React from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionProps {
  type?: "single" | "multiple";
  collapsible?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Accordion({ className, children }: AccordionProps) {
  return <div className={cn("space-y-4", className)}>{children}</div>;
}

interface AccordionItemProps {
  value: string;
  className?: string;
  children: React.ReactNode;
}

export function AccordionItem({ value, className, children }: AccordionItemProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  // Simple implementation: each item manages its own state for now to keep it simple
  // If we wanted true &apos;single&apos; type we would use a parent context.
  
  return (
    <div className={cn("border rounded-2xl overflow-hidden bg-background transition-all hover:border-primary/20", className)}>
      {React.Children.map(children, child => {
        if (React.isValidElement<{ isOpen: boolean; setIsOpen: (open: boolean) => void }>(child)) {
          return React.cloneElement(child, { isOpen, setIsOpen });
        }
        return child;
      })}
    </div>
  );
}

interface AccordionTriggerProps {
  className?: string;
  children: React.ReactNode;
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
}

export function AccordionTrigger({ className, children, isOpen, setIsOpen }: AccordionTriggerProps) {
  return (
    <button
      type="button"
      onClick={() => setIsOpen?.(!isOpen)}
      className={cn(
        "flex w-full items-center justify-between p-6 text-left font-bold text-lg transition-all",
        isOpen && "text-primary",
        className
      )}
    >
      {children}
      {isOpen ? (
        <Minus className="h-5 w-5 text-primary shrink-0" />
      ) : (
        <Plus className="h-5 w-5 text-muted-foreground shrink-0" />
      )}
    </button>
  );
}

interface AccordionContentProps {
  className?: string;
  children: React.ReactNode;
  isOpen?: boolean;
}

export function AccordionContent({ className, children, isOpen }: AccordionContentProps) {
  return (
    <div
      className={cn(
        "overflow-hidden transition-all duration-300",
        isOpen ? "max-h-96" : "max-h-0",
        className
      )}
    >
      <div className="p-6 pt-0 text-muted-foreground leading-relaxed">
        {children}
      </div>
    </div>
  );
}
