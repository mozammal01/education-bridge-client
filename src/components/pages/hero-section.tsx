"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Play, Users, Star, BookOpen, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FadeIn, SlideIn, ScaleIn } from "@/components/shared";
import { categoriesService } from "@/services";
import { Category } from "@/types";

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await categoriesService.getCategories();
        if (res.data && Array.isArray(res.data)) {
          setCategories(res.data.slice(0, 6)); // Show first 6 categories
        }
      } catch {
        // Failed to load categories
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const url = searchQuery.trim()
      ? `/tutors?search=${encodeURIComponent(searchQuery.trim())}`
      : "/tutors";
    router.push(url);
  };

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-secondary/40 via-background to-background">
      {/* background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-20 lg:py-28 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* left content */}
          <div className="space-y-8">
            <FadeIn delay={0}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                500+ Expert Tutors Available
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                Learn from the{" "}
                <span className="text-primary">Best Tutors</span>{" "}
                Around the World
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-lg text-muted-foreground max-w-lg">
                Connect with expert tutors in any subject. Book personalized
                sessions, learn at your own pace, and achieve your goals faster.
              </p>
            </FadeIn>

            {/* search bar */}
            <FadeIn delay={0.3}>
              <form onSubmit={handleSearch} className="flex gap-2 max-w-md">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search by tutor name..."
                    className="pl-10 h-12 bg-background"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button type="submit" size="lg" className="h-12 px-6">
                  Search
                </Button>
              </form>
            </FadeIn>

            {/* category quick links */}
            <FadeIn delay={0.4}>
              <div className="flex flex-wrap gap-2 text-sm">
                <span className="text-muted-foreground">Browse by category:</span>
                {loadingCategories ? (
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                ) : categories.length > 0 ? (
                  categories.map((category) => {
                    // Shorten long category names
                    const displayName = category.name === "Information and Communication Technology"
                      ? "ICT"
                      : category.name;
                    return (
                      <Link
                        key={category.id}
                        href={`/tutors?category=${category.slug}`}
                        className="px-3 py-1 bg-muted hover:bg-primary hover:text-primary-foreground rounded-full transition-colors"
                      >
                        {displayName}
                      </Link>
                    );
                  })
                ) : (
                  // Fallback if no categories from backend
                  ["Mathematics", "Programming", "Languages", "Science"].map((cat) => (
                    <Link
                      key={cat}
                      href={`/tutors?category=${cat.toLowerCase()}`}
                      className="px-3 py-1 bg-muted hover:bg-primary hover:text-primary-foreground rounded-full transition-colors"
                    >
                      {cat}
                    </Link>
                  ))
                )}
              </div>
            </FadeIn>
          </div>

          {/* right content - hero visual */}
          <div className="relative lg:pl-8">
            <SlideIn direction="right" delay={0.2} distance={60}>
              <div className="relative">
                {/* main card */}
                <div className="bg-card rounded-2xl border shadow-2xl p-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-linear-to-br from-primary to-primary/70 flex items-center justify-center">
                      <BookOpen className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Live Sessions</h3>
                      <p className="text-sm text-muted-foreground">1-on-1 video tutoring</p>
                    </div>
                  </div>

                  {/* fake session preview */}
                  <div className="aspect-video bg-muted rounded-xl flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-accent/20" />
                    <div className="relative z-10 flex flex-col items-center gap-3">
                      <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                        <Play className="w-6 h-6 text-primary-foreground ml-1" fill="currentColor" />
                      </div>
                      <span className="text-sm font-medium">See how it works</span>
                    </div>
                  </div>

                  {/* tutor avatars */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex -space-x-3">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className="w-10 h-10 rounded-full border-2 border-background bg-muted flex items-center justify-center text-xs font-medium"
                          style={{ backgroundColor: `hsl(${i * 50}, 70%, 85%)` }}
                        >
                          {String.fromCharCode(64 + i)}
                        </div>
                      ))}
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">10,000+</p>
                      <p className="text-xs text-muted-foreground">Happy Students</p>
                    </div>
                  </div>
                </div>

                {/* floating badges */}
                <ScaleIn delay={0.5} className="absolute -top-4 -right-4">
                  <div className="bg-card border rounded-xl p-3 shadow-lg flex items-center gap-2">
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <Star className="w-4 h-4 text-amber-500" fill="currentColor" />
                    </div>
                    <div>
                      <p className="font-bold text-sm">4.9/5</p>
                      <p className="text-xs text-muted-foreground">Rating</p>
                    </div>
                  </div>
                </ScaleIn>

                <ScaleIn delay={0.6} className="absolute -bottom-4 -left-4">
                  <div className="bg-card border rounded-xl p-3 shadow-lg flex items-center gap-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Users className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-sm">500+</p>
                      <p className="text-xs text-muted-foreground">Tutors</p>
                    </div>
                  </div>
                </ScaleIn>
              </div>
            </SlideIn>
          </div>
        </div>
      </div>
    </section>
  );
}
