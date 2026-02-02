"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calculator,
  Atom,
  Languages,
  Code,
  Music,
  Briefcase,
  Palette,
  GraduationCap,
  LucideIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Category } from "@/types";

const iconMap: Record<string, LucideIcon> = {
  Calculator,
  Atom,
  Languages,
  Code,
  Music,
  Briefcase,
  Palette,
  GraduationCap,
};

interface CategoryCardProps {
  category: Category;
  className?: string;
}

export function CategoryCard({ category, className }: CategoryCardProps) {
  const Icon = iconMap[category.icon || "GraduationCap"] || GraduationCap;

  // Shorten long category names
  const displayName = category.name === "Information and Communication Technology"
    ? "ICT"
    : category.name;

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="h-full"
    >
      <Link
        href={`/tutors?category=${category.slug}`}
        className={cn(
          "group flex flex-col items-center justify-center p-6 bg-card border rounded-xl hover:border-primary/50 hover:shadow-lg transition-all duration-200 h-full min-h-[160px]",
          className
        )}
      >
        <div className="p-3 bg-primary/10 rounded-xl mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-200">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <h3 className="font-medium text-center mb-1 line-clamp-1">{displayName}</h3>
        <p className="text-sm text-muted-foreground">{category.tutorCount} tutors</p>
      </Link>
    </motion.div>
  );
}
