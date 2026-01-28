import Link from "next/link";
import Image from "next/image";
import { Clock, Users, BadgeCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StarRating } from "./star-rating";
import type { TutorProfile } from "@/types";
import { cn } from "@/lib/utils";

interface TutorCardProps {
  tutor: TutorProfile;
  className?: string;
}

export function TutorCard({ tutor, className }: TutorCardProps) {
  return (
    <Card className={cn("group overflow-hidden hover:shadow-lg transition-all duration-300", className)}>
      <CardContent className="p-0">
        <div className="relative">
          {/* tutor image */}
          <div className="relative h-48 bg-muted">
            {tutor.user.avatar ? (
              <Image
                src={tutor.user.avatar}
                alt={tutor.user.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-muted-foreground">
                {tutor.user.name.split(" ").map(n => n[0]).join("")}
              </div>
            )}
            
            {/* verified badge */}
            {tutor.isVerified && (
              <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full flex items-center gap-1">
                <BadgeCheck className="h-3 w-3" />
                Verified
              </div>
            )}
          </div>

          {/* price tag */}
          <div className="absolute -bottom-3 left-4 bg-background shadow-md rounded-full px-3 py-1.5 border">
            <span className="font-bold text-primary">${tutor.hourlyRate}</span>
            <span className="text-muted-foreground text-sm">/hr</span>
          </div>
        </div>

        <div className="p-4 pt-6">
          {/* name and rating */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-semibold text-lg line-clamp-1">{tutor.user.name}</h3>
            <StarRating rating={tutor.rating} size="sm" />
          </div>

          {/* headline */}
          <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
            {tutor.headline}
          </p>

          {/* subjects */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tutor.subjects.slice(0, 3).map((subject) => (
              <Badge key={subject} variant="secondary" className="text-xs font-normal">
                {subject}
              </Badge>
            ))}
            {tutor.subjects.length > 3 && (
              <Badge variant="outline" className="text-xs font-normal">
                +{tutor.subjects.length - 3}
              </Badge>
            )}
          </div>

          {/* stats */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {tutor.experience}+ yrs
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              {tutor.totalStudents} students
            </div>
          </div>

          {/* action */}
          <Button asChild className="w-full">
            <Link href={`/tutors/${tutor.id}`}>View Profile</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
