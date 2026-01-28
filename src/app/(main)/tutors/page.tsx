import type { Metadata } from "next";
import { TutorsListing } from "@/components/tutors/tutors-listing";

export const metadata: Metadata = {
  title: "Find Tutors",
  description: "Browse our expert tutors and find the perfect match for your learning needs",
};

export default function TutorsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Find Your Perfect Tutor</h1>
        <p className="text-muted-foreground">
          Browse our expert tutors and start learning today
        </p>
      </div>
      <TutorsListing />
    </div>
  );
}
