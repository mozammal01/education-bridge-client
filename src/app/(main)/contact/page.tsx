"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, Loader2, Sparkles, Instagram, Twitter, Linkedin, Facebook, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import gsap from "gsap";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".header-content > *", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out"
      });

      gsap.from(".info-card", {
        x: -50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        delay: 0.5
      });

      gsap.from(".contact-form", {
        x: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        delay: 0.8
      });
    });

     return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success("Message sent successfully!", {
        description: "We'll get back to you within 24 hours."
      });
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  const contactInfo = [
    { icon: Mail, label: "Email Us", value: "hello@edubridge.com", sub: "Response within 2 hours" },
    { icon: Phone, label: "Call Us", value: "+1 (555) 000-0000", sub: "Mon-Fri 9am-6pm EST" },
    { icon: MapPin, label: "Visit Us", value: "79 Madison Ave, New York, NY", sub: "HQ - Open Daily" },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-background via-muted/20 to-background pb-20">
      {/* Header */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
        <div className="container mx-auto px-4 relative z-10 header-content text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 rounded-full text-xs font-bold text-amber-600 uppercase tracking-wider mb-6">
            <Sparkles className="w-3 h-3" />
            Support Centered
          </div>
          <h1 className="text-5xl lg:text-7xl font-black mb-8">Get in <span className="text-primary italic underline decoration-wavy decoration-primary-foreground underline-offset-8">Touch</span></h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Have a question or need assistance? Our team is dedicated to help you 
            build your educational future.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 items-start">
          {/* Info Cards */}
          <div ref={infoRef} className="space-y-6">
            {contactInfo.map((info, idx) => (
              <Card key={idx} className="info-card border-none shadow-lg shadow-black/5 hover:bg-primary group transition-colors duration-500">
                <CardContent className="p-8">
                  <div className="flex gap-6 items-start">
                    <div className="p-4 bg-primary/10 rounded-2xl group-hover:bg-white/20 transition-colors">
                      <info.icon className="w-6 h-6 text-primary group-hover:text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-primary group-hover:text-white/70 uppercase tracking-widest mb-1">{info.label}</p>
                      <h3 className="text-lg font-bold mb-1 group-hover:text-white">{info.value}</h3>
                      <p className="text-sm text-muted-foreground group-hover:text-white/60">{info.sub}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Socials */}
            <Card className="info-card border-none shadow-lg shadow-black/5 p-8">
              <h4 className="font-bold mb-4">Connect with us</h4>
              <div className="flex gap-4">
                {[Instagram, Twitter, Linkedin, Facebook].map((Icon, i) => (
                  <Button key={i} variant="outline" size="icon" className="rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm">
                    <Icon className="w-4 h-4" />
                  </Button>
                ))}
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <div ref={formRef}>
            <Card className="contact-form border-none shadow-2xl p-8 lg:p-12 bg-white/80 backdrop-blur-xl rounded-[2rem]">
              <div className="mb-8">
                <h2 className="text-3xl font-black mb-2">Send a Message</h2>
                <p className="text-muted-foreground font-medium">We'll get back to you sooner than you think.</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Name</label>
                    <Input placeholder="John Doe" required className="h-14 rounded-xl border-muted bg-background/50 focus:ring-primary" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Email</label>
                    <Input type="email" placeholder="john@example.com" required className="h-14 rounded-xl border-muted bg-background/50 focus:ring-primary" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Subject</label>
                  <Input placeholder="Personal tutoring help" required className="h-14 rounded-xl border-muted bg-background/50 focus:ring-primary" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Message</label>
                  <Textarea placeholder="Tell us more about your needs..." rows={6} className="rounded-2xl border-muted bg-background/50 focus:ring-primary resize-none" />
                </div>

                <Button type="submit" size="lg" className="w-full h-16 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20 group hover:-translate-y-1 transition-all" disabled={loading}>
                  {loading ? (
                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Link */}
      <section className="py-24 text-center">
        <div className="container mx-auto px-4">
          <div className="p-12 bg-muted/40 rounded-3xl max-w-3xl mx-auto border border-white/50">
            <MessageSquare className="w-10 h-10 text-primary mx-auto mb-6" />
            <h3 className="text-2xl font-black mb-4">Common Questions</h3>
            <p className="text-muted-foreground mb-8 text-lg">Check out our FAQ page for instant answers to most common inquiries about billing, tutors, and platforms.</p>
            <Button variant="link" className="font-bold text-primary group underline-offset-8">
              Visit FAQ Page
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

