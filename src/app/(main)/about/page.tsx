"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { BookOpen, Users, Globe, Award, Heart, Shield, Sparkles, GraduationCap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FadeIn, SectionHeader } from "@/components/shared";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".animate-banner > *", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out"
      });

      gsap.from(".stats-card", {
        scrollTrigger: {
          trigger: ".stats-container",
          start: "top 80%",
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)"
      });
      
      gsap.from(".feature-item", {
        scrollTrigger: {
          trigger: ".features-grid",
          start: "top 75%",
        },
        x: -30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { label: "Active Learners", value: "50k+", icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Expert Tutors", value: "10k+", icon: GraduationCap, color: "text-emerald-500", bg: "bg-emerald-50" },
    { label: "Countries", value: "120+", icon: Globe, color: "text-amber-500", bg: "bg-amber-50" },
    { label: "Success Rate", value: "98%", icon: Award, color: "text-rose-500", bg: "bg-rose-50" },
  ];

  return (
    <div ref={containerRef} className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-24 bg-linear-to-b from-primary/5 to-background overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_center,var(--color-primary-10),transparent_70%)] opacity-50" />
        <div className="container mx-auto px-4 relative z-10 animate-banner">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-xs font-bold text-primary uppercase tracking-wider mb-6">
              <Sparkles className="w-3 h-3" />
              Our Mission
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-8">
              Revolutionizing <span className="text-primary italic">Education</span> for Everyone
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-10">
              We believe quality education is a human right. EduBridge connects 
              the world's most passionate educators with eager learners, breaking 
              down geographical and economic barriers.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-background stats-container">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <Card key={idx} className="stats-card border-none shadow-lg shadow-black/5 hover:shadow-xl transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <stat.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-3xl font-black mb-1">{stat.value}</h3>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                 <Image 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800"
                   alt="Team working"
                  width={800}
                  height={800}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-primary p-8 rounded-3xl shadow-2xl hidden md:block max-w-[240px]">
                <p className="text-primary-foreground font-bold italic text-lg leading-tight">
                  "Traditional learning is static. We make it dynamic and personal."
                </p>
              </div>
            </div>
            
            <div className="space-y-8">
              <SectionHeader 
                title="The EduBridge Story" 
                subtitle="It started with a simple question: why is expert knowledge so hard to access?"
                className="text-left"
              />
              <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                <p>
                  Founded in 2023, EduBridge began as a small project to help 
                  university students find specialized tutors. Today, it has grown 
                  into a global movement.
                </p>
                <p>
                  Our platform leverages cutting-edge technology to create seamless 
                  learning experiences. From real-time video sessions to integrated 
                  scheduling and review systems, every feature is built with the 
                  user in mind.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-8 pt-4 features-grid">
                <div className="feature-item space-y-3">
                  <Heart className="w-8 h-8 text-primary" />
                  <h4 className="font-bold">Passionate Community</h4>
                  <p className="text-sm">We foster relationships, not just transactions.</p>
                </div>
                <div className="feature-item space-y-3">
                  <Shield className="w-8 h-8 text-emerald-500" />
                  <h4 className="font-bold">Quality Guaranteed</h4>
                  <p className="text-sm">Only the top 1% of applicants become tutors.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="bg-primary rounded-[3rem] p-12 lg:p-24 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_-20%,rgba(255,255,255,0.2),transparent_70%)]" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-4xl lg:text-5xl font-black text-primary-foreground mb-8">
                Ready to Join the Future of Learning?
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="px-10 rounded-full font-bold shadow-xl">
                  Start Learning Now
                </Button>
                <Button size="lg" variant="outline" className="px-10 rounded-full font-bold border-white text-white hover:bg-white/10">
                  Become a Tutor
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

