import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export function getImageUrl(path: string | undefined | null): string {
  if (!path) return "";

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  if (path.startsWith("/uploads")) {
    if (typeof window !== "undefined" && window.location.hostname === "localhost") {
      return `/api${path}`;
    }
    const baseUrl = API_BASE_URL.replace(/\/api$/, "");
    return `${baseUrl}${path}`;
  }

  return path;
}
