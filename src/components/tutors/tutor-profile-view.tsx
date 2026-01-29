"use client";

import Image from "next/image";
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
import type { TutorProfile } from "@/types";
import { MOCK_REVIEWS } from "@/lib/constants";

interface TutorProfileViewProps {
  tutor: TutorProfile;
}

export function TutorProfileView({ tutor }: TutorProfileViewProps) {
  const tutorReviews = MOCK_REVIEWS.filter((r) => r.tutorId === tutor.id);

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
                    {tutor?.user?.avatar ? (
                      <Image
                        src={tutor?.user?.avatar}
                        alt={tutor?.user?.name}
                        width={128}
                        height={128}
                        className="object-cover w-full h-full"
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
                        <StarRating rating={tutor?.rating} />
                        <span className="text-sm text-muted-foreground">
                          ({tutor?.totalReviews} reviews)
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
                      <span>{tutor?.experience}+ years exp</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>{tutor?.totalStudents} students</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-muted-foreground" />
                      <span>{tutor?.totalSessions} sessions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-muted-foreground" />
                      <span>{tutor?.languages?.join(", ")}</span>
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
                {tutor?.bio}
              </p>
            </CardContent>
          </Card>

          {/* subjects & categories */}
          <Card>
            <CardHeader>
              <CardTitle>Subjects I Teach</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {tutor?.subjects?.map((subject) => (
                  <Badge key={subject} variant="secondary" className="text-sm">
                    {subject}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* education */}
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
                  <p className="font-medium">{tutor?.education}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* reviews */}
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>Student Reviews</CardTitle>
              <span className="text-sm text-muted-foreground">
                {tutorReviews?.length} reviews
              </span>
            </CardHeader>
            <CardContent>
              {tutorReviews?.length > 0 ? (
                <ReviewsList reviews={tutorReviews} />
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
          <BookingCard tutor={tutor as TutorProfile} />
        </div>
      </div>
    </div>
  );
}
