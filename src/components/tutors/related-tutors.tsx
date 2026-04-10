"use client";

import { useEffect, useState } from "react";
import { TutorCard, TutorCardSkeleton } from "@/components/shared";
import { tutorsService } from "@/services";
import { TutorProfile } from "@/types";

interface RelatedTutorsProps {
  category: string;
  currentTutorId: string;
}

export function RelatedTutors({ category, currentTutorId }: RelatedTutorsProps) {
  const [tutors, setTutors] = useState<TutorProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRelated = async () => {
      setIsLoading(true);
      try {
        const response = await tutorsService.getTutors({ category });
        if (response.data) {
          const tutorData = Array.isArray(response.data)
            ? response.data
            : (response.data as { tutors?: TutorProfile[] }).tutors || [];
          
          // Filter out current tutor and take first 4
          const filtered = tutorData
            .filter((t: TutorProfile) => t.id !== currentTutorId)
            .slice(0, 4);
          
          setTutors(filtered);
        }
      } catch (err) {
        console.error("Failed to fetch related tutors:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (category) {
      fetchRelated();
    } else {
      setIsLoading(false);
    }
  }, [category, currentTutorId]);

  if (!isLoading && tutors.length === 0) return null;

  return (
    <div className="mt-16 pt-16 border-t">
      <h2 className="text-2xl font-bold mb-8">Related Tutors you might like</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? (
          [1, 2, 3, 4].map((i) => <TutorCardSkeleton key={i} />)
        ) : (
          tutors.map((t) => <TutorCard key={t.id} tutor={t} />)
        )}
      </div>
    </div>
  );
}
