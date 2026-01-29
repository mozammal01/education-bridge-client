"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TutorCard, SectionHeader, FadeIn, StaggerContainer, StaggerItem } from "@/components/shared";
import { MOCK_TUTORS } from "@/lib/constants";
import { tutorsService } from "@/services";
import { TutorProfile } from "@/types";

export function FeaturedTutors() {
  const [tutors, setTutors] = useState<TutorProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await tutorsService.getTutors();
        if (response.data) {
          const tutorData = Array.isArray(response.data)
            ? response.data
            : (response.data as { tutors?: TutorProfile[] }).tutors || [];
          // Take first 4 tutors as featured
          setTutors(tutorData.slice(0, 4));
        } else {
          setTutors(MOCK_TUTORS.slice(0, 4));
        }
      } catch (error) {
        console.error("Failed to fetch tutors:", error);
        setTutors(MOCK_TUTORS.slice(0, 4));
      } finally {
        setIsLoading(false);
      }
    };

    fetchTutors();
  }, []);

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <FadeIn>
          <SectionHeader
            title="Featured Tutors"
            subtitle="Learn from our top-rated and most experienced tutors"
          />
        </FadeIn>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {tutors.map((tutor) => (
              <StaggerItem key={tutor.id}>
                <TutorCard tutor={tutor} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}

        <FadeIn delay={0.5}>
          <div className="text-center">
            <Button size="lg" asChild>
              <Link href="/tutors">
                Browse All Tutors
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
