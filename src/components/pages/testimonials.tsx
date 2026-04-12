"use client";
 
import Image from "next/image";
import { Quote, MessageSquarePlus } from "lucide-react";
import { SectionHeader, StarRating, FadeIn, BlurFade, HoverScale } from "@/components/shared";
import { getImageUrl } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Review } from "@/types";
import { reviewsService } from "@/services";
import { Skeleton } from "@/components/ui/skeleton";
import { ReviewModal } from "../reviews/review-modal";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { UserRole } from "@/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function Testimonials() {
  const { user } = useAuth();
  const router = useRouter();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await reviewsService.getPlatformReviews();
        if (res.data && Array.isArray(res.data)) {
          setReviews(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch platform reviews:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReviews();
  }, []);

  return (
    <section className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <FadeIn className="flex-1">
            <SectionHeader
              title="What Our Students Say"
              subtitle="Hear from learners who transformed their skills with EduBridge"
              align="left"
              className="mb-0"
            />
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <Button 
                onClick={() => {
                  if (!user) {
                    toast.error("Please login to submit a review", {
                      description: "You need to be signed in as a student to share your feedback.",
                      action: {
                        label: "Login",
                        onClick: () => router.push("/login")
                      }
                    });
                    return;
                  }
                  if (user.role !== UserRole.STUDENT && user.role !== "STUDENT") {
                    toast.error("Action restricted", {
                      description: "Only students can submit reviews on this platform."
                    });
                    return;
                  }
                  setIsModalOpen(true);
                }}
                className="rounded-full shadow-lg shadow-primary/20 hover:shadow-xl transition-all"
            >
                <MessageSquarePlus className="mr-2 h-4 w-4" />
                Rate EduBridge
            </Button>
          </FadeIn>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-[280px] w-full rounded-2xl" />
            ))}
          </div>
        ) : reviews.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((testimonial, index) => (
              <BlurFade key={testimonial.id} delay={index * 0.1}>
                <HoverScale scale={1.02}>
                  <div className="group bg-card border border-primary/5 rounded-2xl p-8 relative min-h-[300px] hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-500 flex flex-col justify-between h-full hover:border-primary/20">
                    <div>
                      <div className="absolute -top-4 right-8 p-3 bg-primary rounded-xl shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
                        <Quote className="w-5 h-5 text-primary-foreground" />
                      </div>

                      <div className="mb-6">
                        <StarRating rating={testimonial.rating} size="sm" showValue={false} />
                      </div>

                      <p className="text-muted-foreground mb-8 leading-relaxed italic text-lg">
                        &quot;{testimonial.comment}&quot;
                      </p>
                    </div>

                    <div className="flex items-center gap-4 pt-6 border-t border-primary/5">
                      <div className="relative w-14 h-14 rounded-full overflow-hidden bg-primary/10 border-2 border-background shadow-inner">
                        {testimonial.student?.image ? (
                          <Image
                            src={getImageUrl(testimonial.student.image)}
                            alt={testimonial.student.name || "Student"}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-primary/20 text-primary font-bold text-xl uppercase">
                            {testimonial.student?.name?.[0] || "U"}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-foreground">{testimonial.student?.name}</p>
                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Verified Student</p>
                      </div>
                    </div>
                  </div>
                </HoverScale>
              </BlurFade>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-card rounded-2xl border border-dashed">
            <p className="text-muted-foreground">No reviews yet. Be the first to share your experience!</p>
          </div>
        )}
      </div>

      <ReviewModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
            // Re-fetch reviews or reload
            window.location.reload();
        }}
      />
    </section>
  );
}
