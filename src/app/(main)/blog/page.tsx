import type { Metadata } from "next";
import { BlogListing } from "@/components/blog/blog-listing";
import { Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog | Insights & Education Tips",
  description: "Stay updated with the latest trends, tips, and stories from the world of education and digital learning.",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen pb-20">
      {/* Hero Header */}
      <section className="relative py-20 bg-linear-to-b from-primary/10 via-background to-background overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_center,var(--color-primary-10),transparent_70%)] opacity-50" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-xs font-bold text-primary uppercase tracking-wider mb-6">
            <Sparkles className="w-3 h-3" />
            Learning Insights
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            Our <span className="text-primary italic">Education</span> Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Expert advice, student success stories, and the latest news from the global learning community.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 mt-12">
        <BlogListing />
      </div>
    </div>
  );
}
