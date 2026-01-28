"use client";

import { Users, GraduationCap, BookOpen, Award } from "lucide-react";
import { FadeIn, CountUp } from "@/components/shared";

const stats = [
  {
    icon: Users,
    value: 500,
    suffix: "+",
    label: "Expert Tutors",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: GraduationCap,
    value: 10000,
    suffix: "+",
    label: "Happy Students",
    color: "text-emerald-600",
    bg: "bg-emerald-100",
  },
  {
    icon: BookOpen,
    value: 50000,
    suffix: "+",
    label: "Sessions Done",
    color: "text-amber-600",
    bg: "bg-amber-100",
  },
  {
    icon: Award,
    value: 100,
    suffix: "+",
    label: "Subjects",
    color: "text-violet-600",
    bg: "bg-violet-100",
  },
];

export function StatsSection() {
  return (
    <section className="py-12 border-y bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <FadeIn key={stat.label} delay={index * 0.1} direction="up">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${stat.bg}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    <CountUp end={stat.value} suffix={stat.suffix} duration={2} />
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
