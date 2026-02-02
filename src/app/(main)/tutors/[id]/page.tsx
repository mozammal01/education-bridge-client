import type { Metadata } from "next";
import { TutorProfileView } from "@/components/tutors/tutor-profile-view";
import { notFound } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://education-bridge-server.vercel.app";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getTutor(id: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/tutors/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data.data || data;
  } catch (error) {
    console.error("Failed to fetch tutor:", error);
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const tutor = await getTutor(id);

  if (!tutor) {
    return { title: "Tutor Not Found" };
  }

  return {
    title: tutor.user?.name || tutor.name || "Tutor Profile",
    description: tutor.headline || tutor.bio || "View tutor profile",
  };
}

export default async function TutorProfilePage({ params }: PageProps) {
  const { id } = await params;
  const tutor = await getTutor(id);

  if (!tutor) {
    notFound();
  }

  return <TutorProfileView tutor={tutor} />;
}
