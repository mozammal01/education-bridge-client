"use client";

import { useLayoutEffect, useRef } from "react";
import { FadeIn, SectionHeader, StaggerContainer, StaggerItem } from "@/components/shared";
import { BookOpen, Users, Clock, ShieldCheck, Globe, Zap } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Entrance animations are handled by Framer Motion's StaggerContainer/StaggerItem.
    // GSAP is only used if continuous animations are needed.
  }, []);
  const features = [
    {
      title: "Verified Tutors",
      description: "All our tutors go through a rigorous background check and verification process.",
      icon: ShieldCheck,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      title: "Learn Anything",
      description: "From academics to arts, find experts in over 500+ subjects and skills.",
      icon: BookOpen,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
    },
    {
      title: "Flexible Scheduling",
      description: "Book sessions that fit your schedule. Learn at your own pace anytime.",
      icon: Clock,
      color: "text-amber-500",
      bg: "bg-amber-50",
    },
    {
      title: "Global Community",
      description: "Connect with learners and experts from all around the globe.",
      icon: Globe,
      color: "text-purple-500",
      bg: "bg-purple-50",
    },
    {
      title: "Expert Support",
      description: "Our support team is available 24/7 to help you with any questions.",
      icon: Users,
      color: "text-rose-500",
      bg: "bg-rose-50",
    },
    {
      title: "Fast Progress",
      description: "Personalized 1-on-1 attention helps you learn 3x faster than traditional ways.",
      icon: Zap,
      color: "text-cyan-500",
      bg: "bg-cyan-50",
    },
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-background relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-accent/5 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <FadeIn>
          <SectionHeader
            title="Why Choose EduBridge?"
            subtitle="We provide the best platform for personalized learning and growth"
          />
        </FadeIn>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {features.map((feature, index) => (
            <StaggerItem key={index}>
              <div className="group feature-card p-8 rounded-2xl border bg-card hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_50px_rgba(255,255,255,0.05)] hover:-translate-y-2 transition-all duration-500 cursor-default h-full">
                <div className={`w-14 h-14 ${feature.bg} ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 dark:bg-muted`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
