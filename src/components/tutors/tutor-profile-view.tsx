"use client";

import { useEffect, useState } from "react";
import {
  BadgeCheck,
  Clock,
  Users,
  BookOpen,
  Globe,
  GraduationCap,
  Share2,
  Heart,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StarRating } from "@/components/shared";
import { BookingCard } from "./booking-card";
import { ReviewsList } from "./reviews-list";
import { ReviewModal } from "@/components/reviews/review-modal";
import type { TutorProfile, Review } from "@/types";
import { reviewsService } from "@/services";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";
import { useAuth } from "@/context/auth-context";
import { UserRole } from "@/types";

interface TutorProfileViewProps {
  tutor: TutorProfile;
}

export function TutorProfileView({ tutor }: TutorProfileViewProps) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>(tutor?.reviews || []);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const isStudent = user?.role === UserRole.STUDENT || user?.role === "STUDENT";
  const isOwnProfile = user?.id === tutor?.userId || user?.id === tutor?.user?.id;

  useEffect(() => {
    const fetchReviews = async () => {
      if (tutor?.reviews && tutor.reviews.length > 0) {
        setReviews(tutor.reviews);
        return;
      }

      setIsLoadingReviews(true);
      try {
        const response = await reviewsService.getReviewsByTutor(tutor.id);
        if (response.data) {
          const reviewData = Array.isArray(response.data)
            ? response.data
            : (response.data as { reviews?: Review[] }).reviews || [];
          setReviews(reviewData);
        }
      } catch {
        // Failed to fetch reviews
      } finally {
        setIsLoadingReviews(false);
      }
    };

    fetchReviews();
  }, [tutor]);

  const refreshReviews = async () => {
    try {
      const response = await reviewsService.getReviewsByTutor(tutor.id);
      if (response.data) {
        const reviewData = Array.isArray(response.data)
          ? response.data
          : (response.data as { reviews?: Review[] }).reviews || [];
        setReviews(reviewData);
      }
    } catch {
      // Failed to refresh
    }
  };

  const imageUrl = getImageUrl(tutor?.user?.image);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-[1fr_380px] gap-8">
        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="relative shrink-0">
                  <div className="w-32 h-32 rounded-2xl overflow-hidden bg-muted">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={tutor?.user?.name || "Tutor"}
                        className="object-cover w-full h-full"
                        width={100}
                        height={100}
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-muted-foreground">
                        {tutor?.user?.name?.split(" ").map((n) => n[0]).join("")}
                      </div>
                    )}
                  </div>
                  {tutor?.isVerified && (
                    <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground p-1.5 rounded-full">
                      <BadgeCheck className="w-4 h-4" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h1 className="text-2xl font-bold mb-1">{tutor?.user?.name}</h1>
                      <p className="text-muted-foreground mb-3">{tutor?.headline}</p>
                      <div className="flex items-center gap-4 flex-wrap">
                        <StarRating rating={tutor?.rating || 0} />
                        <span className="text-sm text-muted-foreground">
                          ({tutor?.totalReviews || reviews.length || 0} reviews)
                        </span>
                      </div>
                    </div>

                    <div className="hidden sm:flex gap-2">
                      <Button variant="outline" size="icon">
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-6 mt-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{tutor?.experience || 0}+ years exp</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>{tutor?.totalStudents || 0} students</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-muted-foreground" />
                      <span>{tutor?.totalSessions || 0} sessions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-muted-foreground" />
                      <span>{tutor?.languages?.join(", ") || "English"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {tutor?.bio || "No bio available"}
              </p>
            </CardContent>
          </Card>

          {tutor?.subjects && tutor.subjects.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Subjects I Teach</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {tutor.subjects.map((subject) => (
                    <Badge key={subject} variant="secondary" className="text-sm">
                      {subject}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {tutor?.education && (
            <Card>
              <CardHeader>
                <CardTitle>Education</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <GraduationCap className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{tutor.education}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>Student Reviews</CardTitle>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  {reviews.length} reviews
                </span>
                {isStudent && !isOwnProfile && (
                  <Button size="sm" onClick={() => setShowReviewModal(true)}>
                    <Star className="w-4 h-4 mr-2" />
                    Leave a Review
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {isLoadingReviews ? (
                <p className="text-muted-foreground text-center py-8">Loading reviews...</p>
              ) : reviews.length > 0 ? (
                <ReviewsList reviews={reviews} />
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">No reviews yet</p>
                  {isStudent && !isOwnProfile && (
                    <Button variant="outline" onClick={() => setShowReviewModal(true)}>
                      Be the first to review
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:sticky lg:top-24 h-fit">
          <BookingCard tutor={tutor} />
        </div>
      </div>

      <ReviewModal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        tutorId={tutor.id}
        tutorName={tutor?.user?.name || "Tutor"}
        onSuccess={refreshReviews}
      />
    </div>
  );
}
