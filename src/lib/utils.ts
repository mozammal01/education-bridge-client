import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://education-bridge-server.vercel.app";

export function getImageUrl(path: string | undefined | null): string {
  if (!path) return "";

  // If it's already a full URL, return as-is
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  // For uploads, always use the backend server URL
  if (path.startsWith("/uploads")) {
    // Remove trailing /api if present, or any trailing slash
    const baseUrl = API_BASE_URL.replace(/\/api\/?$/, "").replace(/\/$/, "");
    return `${baseUrl}${path}`;
  }

  return path;
}
