"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock, Users, BadgeCheck, Star, Globe, BookOpen } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { TutorProfile } from "@/types";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface TutorCardProps {
  tutor: TutorProfile;
  className?: string;
}

export function TutorCard({ tutor, className }: TutorCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >

      <Card
        className={cn(
          "group overflow-hidden border-0 bg-white h-full flex flex-col",
          className
        )}
      >
        {/* Image Section - Fixed Height */}
        <div className="relative">
          <div className="relative h-48 bg-linear-to-b from-primary/10 to-primary/5 overflow-hidden">
            {tutor?.user?.avatar ? (
              <Image
                src={tutor?.user?.avatar}
                alt={tutor?.user?.name || "Tutor"}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                width={100}
                height={100}
                unoptimized
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-5xl font-bold text-primary/40">
                {tutor?.user?.name?.split(" ").map((n) => n[0]).join("")}
              </div>
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

            {/* Verified Badge */}
            {tutor?.isVerified && (
              <div className="absolute top-3 left-3 bg-emerald-500 text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1 font-medium shadow-lg">
                <BadgeCheck className="h-3.5 w-3.5" />
                Verified
              </div>
            )}

            {/* Rating Badge */}
            <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-amber-600 text-sm px-2.5 py-1 rounded-full flex items-center gap-1 font-semibold shadow-lg">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              {tutor?.rating?.toFixed(1)}
            </div>

            {/* Name & Price on Image */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="font-bold text-lg text-white mb-1 line-clamp-1 drop-shadow-lg">
                {tutor?.user?.name}
              </h3>
              <div className="flex items-center justify-between gap-2">
                <p className="text-white/90 text-sm line-clamp-1 flex-1">
                  {tutor?.headline?.split("|")[0]?.trim()}
                </p>
                <div className="bg-primary text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg shrink-0">
                  ৳{tutor?.hourlyRate}/hr
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section - Flex grow to fill remaining space */}
        <div className="p-4 flex flex-col">
          {/* Subjects - Fixed Height */}
          <div className="flex flex-wrap gap-1.5 h-[52px] overflow-hidden">
            {tutor?.subjects?.slice(0, 3).map((subject) => (
              <Badge
                key={subject}
                variant="secondary"
                className="text-xs font-medium bg-primary/5 text-primary hover:bg-primary/10 border-0 h-fit"
              >
                {subject}
              </Badge>
            ))}
            {tutor?.subjects && tutor.subjects.length > 3 && (
              <Badge variant="outline" className="text-xs font-medium h-fit">
                +{tutor.subjects.length - 3} more
              </Badge>
            )}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-2 py-3 my-3 border-y border-gray-100">
            <div className="text-center">
              <div className="flex items-center justify-center text-primary mb-1">
                <Clock className="h-4 w-4" />
              </div>
              <p className="text-sm font-semibold">{tutor?.experience}+</p>
              <p className="text-xs text-muted-foreground">Years</p>
            </div>
            <div className="text-center border-x border-gray-100">
              <div className="flex items-center justify-center text-primary mb-1">
                <Users className="h-4 w-4" />
              </div>
              <p className="text-sm font-semibold">{tutor?.totalStudents}</p>
              <p className="text-xs text-muted-foreground">Students</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center text-primary mb-1">
                <BookOpen className="h-4 w-4" />
              </div>
              <p className="text-sm font-semibold">{tutor?.totalSessions}</p>
              <p className="text-xs text-muted-foreground">Sessions</p>
            </div>
          </div>

          {/* Languages */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Globe className="h-4 w-4 text-primary shrink-0" />
            <span className="line-clamp-1">{tutor?.languages?.join(", ")}</span>
          </div>

          {/* Spacer to push button to bottom */}
          <div className="" />

          {/* Action Button - Always at bottom */}
          <Button asChild className="w-full group/btn">
            <Link href={`/tutors/${tutor?.id}`}>
              View Profile
              <span className="ml-2 group-hover/btn:translate-x-1 transition-transform">→</span>
            </Link>
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
