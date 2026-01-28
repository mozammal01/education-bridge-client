import type { Metadata } from "next";
import { TutorProfileView } from "@/components/tutors/tutor-profile-view";
import { MOCK_TUTORS } from "@/lib/constants";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const tutor = MOCK_TUTORS.find((t) => t.id === id);

  if (!tutor) {
    return { title: "Tutor Not Found" };
  }

  return {
    title: tutor.user.name,
    description: tutor.headline,
  };
}

export default async function TutorProfilePage({ params }: PageProps) {
  const { id } = await params;
  const tutor = MOCK_TUTORS.find((t) => t.id === id);

  if (!tutor) {
    notFound();
  }

  return <TutorProfileView tutor={tutor} />;
}
