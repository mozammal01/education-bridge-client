"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Star, MessageCircle, ArrowRight } from "lucide-react";
import { 
  FadeIn, 
  SectionHeader, 
  StaggerContainer, 
  StaggerItem, 
  HoverScale, 
  StarRating 
} from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getImageUrl } from "@/lib/utils";
import Link from "next/link";
import { tutorsService } from "@/services";

export function StudentReviewsSection() {
  const [tutors, setTutors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTopTutors = async () => {
      try {
        const res = await tutorsService.getTutors({ page: 1 });
        if (res.data && Array.isArray(res.data)) {
          // Sort by averageRating and take top 4
          const sorted = [...res.data]
            .sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0))
            .slice(0, 4);
          setTutors(sorted);
        }
      } catch (error) {
        console.error("Failed to fetch tutors for reviews:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTopTutors();
  }, []);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <FadeIn className="flex-1">
            <SectionHeader
              title="Student Reviews for Tutors"
              subtitle="See how our expert tutors are helping students achieve their goals"
              align="left"
              className="mb-0"
            />
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <Button variant="ghost" asChild className="group">
              <Link href="/tutors">
                View All Tutors
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </FadeIn>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-[350px] w-full rounded-2xl" />
            ))}
          </div>
        ) : tutors.length > 0 ? (
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tutors.map((tutor) => (
              <StaggerItem key={tutor.id}>
                <HoverScale scale={1.03}>
                  <Link href={`/tutors/${tutor.id}`}>
                    <div className="bg-card border border-primary/5 rounded-2xl overflow-hidden group h-full hover:shadow-xl transition-all duration-500 hover:border-primary/20">
                      <div className="p-6">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="relative w-16 h-16 rounded-xl overflow-hidden border-2 border-background shadow-md">
                            <Image
                              src={getImageUrl(tutor.user?.image)}
                              alt={tutor.user?.name || "Tutor"}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                          <div>
                            <h4 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">{tutor.user?.name}</h4>
                            <p className="text-xs text-muted-foreground font-medium">{tutor.category?.name || "Expert Tutor"}</p>
                          </div>
                        </div>

                        <div className="bg-primary/5 rounded-xl p-4 mb-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Student Rating</span>
                                <StarRating rating={tutor.averageRating || 0} size="sm" showValue={false} />
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-black text-primary">{tutor.averageRating?.toFixed(1) || "5.0"}</span>
                                <span className="text-xs text-muted-foreground">/ 5.0</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MessageCircle className="h-4 w-4 text-primary/60" />
                                <span>{tutor.totalReviews || 0} Total Reviews</span>
                            </div>
                            
                            <p className="text-sm text-muted-foreground line-clamp-3 italic leading-relaxed">
                                &quot;{tutor.bio || "Available for personalized learning sessions across various subjects."}&quot;
                            </p>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-muted/30 border-t border-primary/5 flex items-center justify-between group-hover:bg-primary/5 transition-colors">
                        <span className="text-xs font-bold text-primary">View Reviews</span>
                        <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                      </div>
                    </div>
                  </Link>
                </HoverScale>
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <div className="text-center py-12 bg-muted/20 rounded-2xl border border-dashed">
             <p className="text-muted-foreground">Tutor data is being prepared.</p>
          </div>
        )}
      </div>
    </section>
  );
}
