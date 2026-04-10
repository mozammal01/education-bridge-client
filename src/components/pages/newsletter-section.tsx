"use client";

import { FadeIn } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bell } from "lucide-react";

export function NewsletterSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-primary/5 -z-10" />
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-50" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent/10 rounded-full blur-3xl opacity-50" />

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-card border rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 text-primary/10 opacity-20">
            <Bell className="w-32 h-32 rotate-12" />
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
            <div>
              <FadeIn>
                <h2 className="text-3xl font-bold mb-4">Stay Informed & Get Exclusive Offers</h2>
                <p className="text-muted-foreground mb-6">
                  Subscribe to our newsletter and be the first to know about new tutors, 
                  subjects, and special learning discounts.
                </p>
                <div className="flex items-center gap-4 text-sm font-medium">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-muted" />
                    ))}
                  </div>
                  <span>Join 5,000+ learners</span>
                </div>
              </FadeIn>
            </div>

            <div>
              <FadeIn delay={0.2}>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="relative">
                    <Input 
                      placeholder="Enter your email address" 
                      className="h-14 pl-4 pr-12 rounded-xl bg-background border-primary/20 focus:border-primary"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                      @
                    </div>
                  </div>
                  <Button size="lg" className="w-full h-14 rounded-xl shadow-lg shadow-primary/20 group">
                    Subscribe Now
                    <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    By subscribing, you agree to our Privacy Policy. No spam, ever.
                  </p>
                </form>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
