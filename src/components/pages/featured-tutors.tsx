"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TutorCard, SectionHeader, FadeIn, StaggerContainer, StaggerItem } from "@/components/shared";
import { MOCK_TUTORS } from "@/lib/constants";

export function FeaturedTutors() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <FadeIn>
          <SectionHeader
            title="Featured Tutors"
            subtitle="Learn from our top-rated and most experienced tutors"
          />
        </FadeIn>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {MOCK_TUTORS.map((tutor) => (
            <StaggerItem key={tutor.id}>
              <TutorCard tutor={tutor} />
            </StaggerItem>
          ))}
        </StaggerContainer>

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
