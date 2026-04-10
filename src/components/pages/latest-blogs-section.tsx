import { FadeIn, SectionHeader, StaggerContainer, StaggerItem } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const blogs = [
  {
    title: "10 Tips for Effective Online Learning",
    excerpt: "Discover the best strategies to stay focused and motivated while learning from home.",
    author: "Sarah Johnson",
    date: "May 15, 2024",
    image: "/blog-1.jpg",
    category: "Education",
  },
  {
    title: "How to Choose the Perfect Tutor",
    excerpt: "What to look for when selecting a tutor to ensure your learning goals are met.",
    author: "Mark Davis",
    date: "May 12, 2024",
    image: "/blog-2.jpg",
    category: "Tips",
  },
  {
    title: "The Future of AI in Education",
    excerpt: "Exploring how artificial intelligence is changing the way we teach and learn today.",
    author: "Alex Wilson",
    date: "May 10, 2024",
    image: "/blog-3.jpg",
    category: "Technology",
  },
];

export function LatestBlogsSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div className="flex-1 text-left">
            <FadeIn>
              <span className="text-primary font-bold tracking-wider uppercase text-sm mb-3 block">From Our Blog</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Learning Insights</h2>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Stay updated with the latest trends, tips, and stories from the world of education.
              </p>
            </FadeIn>
          </div>
          <FadeIn delay={0.2}>
            <Button variant="outline" size="lg" asChild>
              <Link href="/blog">
                View All Posts
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </FadeIn>
        </div>

        <StaggerContainer className="grid md:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <StaggerItem key={index}>
              <div className="group rounded-2xl overflow-hidden border bg-card hover:shadow-2xl transition-all duration-500">
                <div className="aspect-16/10 relative overflow-hidden bg-muted">
                  <div className="absolute inset-0 bg-primary/10 group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-primary text-xs font-bold rounded-full shadow-sm">
                      {blog.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {blog.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5" />
                      {blog.author}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-6">
                    {blog.excerpt}
                  </p>
                  
                  <Link 
                    href="/blog" 
                    className="inline-flex items-center text-sm font-bold text-primary group/link"
                  >
                    Read More
                    <ArrowRight className="ml-1 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
