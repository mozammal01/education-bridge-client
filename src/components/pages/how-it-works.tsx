"use client";

import { Search, Calendar, Video, Star } from "lucide-react";
import { SectionHeader, FadeIn, HoverScale } from "@/components/shared";

const steps = [
  {
    step: 1,
    title: "Find Your Tutor",
    description: "Browse expert tutors by subject, rating, or price. Read reviews to find your perfect match.",
    icon: Search,
    color: "bg-primary",
  },
  {
    step: 2,
    title: "Book a Session",
    description: "Pick a time that works for you from your tutor's availability and book instantly.",
    icon: Calendar,
    color: "bg-emerald-500",
  },
  {
    step: 3,
    title: "Start Learning",
    description: "Connect via video call, share your screen, and learn with personalized attention.",
    icon: Video,
    color: "bg-amber-500",
  },
  {
    step: 4,
    title: "Rate & Repeat",
    description: "Leave a review after your session and book again to keep learning.",
    icon: Star,
    color: "bg-violet-500",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4">
        <FadeIn>
          <SectionHeader
            title="How It Works"
            subtitle="Getting started is easy - just follow these simple steps"
          />
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, idx) => (
            <FadeIn key={item.step} delay={idx * 0.15} direction="up">
              <div className="relative h-full">
                {/* connector line */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-full h-0.5 bg-border" />
                )}
                
                <HoverScale scale={1.03}>
                  <div className="relative bg-card border rounded-2xl p-6 h-full">
                    {/* step number */}
                    <div className="absolute -top-3 -left-3 w-8 h-8 bg-background border-2 border-primary rounded-full flex items-center justify-center text-sm font-bold text-primary">
                      {item.step}
                    </div>
                    
                    <div className={`w-14 h-14 ${item.color} rounded-xl flex items-center justify-center mb-4`}>
                      <item.icon className="w-7 h-7 text-white" />
                    </div>
                    
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </HoverScale>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
