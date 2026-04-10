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
          <div className="text-center py-20 bg-destructive/5 rounded-3xl border border-dashed border-destructive/20 max-w-2xl mx-auto shadow-inner">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserX className="h-8 w-8 text-destructive" />
            </div>
            <h4 className="text-xl font-bold mb-2">Service unavailable</h4>
            <p className="text-muted-foreground mb-6">We&apos;re currently unable to fetch our top tutors. Please check back in a few moments.</p>
            <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </div>
        ) : tutors.length === 0 ? (
          <div className="text-center py-20 bg-muted/20 rounded-3xl border border-dashed max-w-2xl mx-auto">
            <UserX className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
            <h4 className="text-xl font-bold mb-2">Looking for tutors?</h4>
            <p className="text-muted-foreground">It seems there are no featured tutors at the moment. Explore our full catalog to find your match.</p>
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
