"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Loader2, UserX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TutorCard, TutorCardSkeleton, SectionHeader, FadeIn, StaggerContainer, StaggerItem } from "@/components/shared";
import { tutorsService } from "@/services";
import { TutorProfile } from "@/types";

export function FeaturedTutors() {
  const [tutors, setTutors] = useState<TutorProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await tutorsService.getTutors();
        if (response.data) {
          const tutorData = Array.isArray(response.data)
            ? response.data
            : (response.data as { tutors?: TutorProfile[] }).tutors || [];
          setTutors(tutorData.slice(0, 4));
        } else {
          setTutors([]);
        }
      } catch (err) {
        console.error("Failed to fetch tutors:", err);
        setError("Failed to load tutors");
        setTutors([]);
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <TutorCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{error}</p>
          </div>
        ) : tutors.length === 0 ? (
          <div className="text-center py-12">
            <UserX className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No tutors available yet</p>
          </div>
        ) : (
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
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
