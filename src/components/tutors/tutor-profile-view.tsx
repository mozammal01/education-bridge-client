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
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StarRating } from "@/components/shared";
import { BookingCard } from "./booking-card";
import { ReviewsList } from "./reviews-list";
import type { TutorProfile, Review } from "@/types";
import { reviewsService } from "@/services";
import Image from "next/image";

interface TutorProfileViewProps {
  tutor: TutorProfile;
}

export function TutorProfileView({ tutor }: TutorProfileViewProps) {
  const [reviews, setReviews] = useState<Review[]>(tutor?.reviews || []);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);

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
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      } finally {
        setIsLoadingReviews(false);
      }
    };

    fetchReviews();
  }, [tutor]);

  // Get avatar
  const avatarUrl = tutor?.user?.avatar;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-[1fr_380px] gap-8">
        {/* main content */}
        <div className="space-y-8">
          {/* header card */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-6">
                {/* avatar */}
                <div className="relative shrink-0">
                  <div className="w-32 h-32 rounded-2xl overflow-hidden bg-muted">
                    {avatarUrl ? (
                      <Image
                        src={avatarUrl}
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

                {/* info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h1 className="text-2xl font-bold mb-1">{tutor?.user?.name}</h1>
                      <p className="text-muted-foreground mb-3">{tutor?.headline}</p>
                      <div className="flex items-center gap-4 flex-wrap">
                        <StarRating rating={tutor?.rating || 0} />
                        <span className="text-sm text-muted-foreground">
                          ({tutor?.totalReviews || 0} reviews)
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

                  {/* quick stats */}
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

          {/* about */}
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

          {/* subjects & categories */}
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

          {/* education */}
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

          {/* reviews */}
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>Student Reviews</CardTitle>
              <span className="text-sm text-muted-foreground">
                {reviews.length} reviews
              </span>
            </CardHeader>
            <CardContent>
              {isLoadingReviews ? (
                <p className="text-muted-foreground text-center py-8">Loading reviews...</p>
              ) : reviews.length > 0 ? (
                <ReviewsList reviews={reviews} />
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  No reviews yet
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* sidebar - booking card */}
        <div className="lg:sticky lg:top-24 h-fit">
          <BookingCard tutor={tutor} />
        </div>
      </div>
    </div>
  );
}
