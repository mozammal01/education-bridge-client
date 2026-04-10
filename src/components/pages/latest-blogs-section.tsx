import { FadeIn, SectionHeader, StaggerContainer, StaggerItem } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BLOG_POSTS } from "@/constants/blogs";

export function LatestBlogsSection() {
  const blogs = BLOG_POSTS.slice(0, 3);

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
              <div className="group rounded-2xl overflow-hidden border bg-card hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
                <Link href={`/blog/${blog.slug}`} className="aspect-16/10 relative overflow-hidden bg-muted block">
                  <Image 
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    unoptimized
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 bg-background/90 backdrop-blur-sm text-primary text-[10px] font-bold rounded-full shadow-sm">
                      {blog.category}
                    </span>
                  </div>
                </Link>
                
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-4 text-[10px] text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {blog.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5" />
                      {blog.author.name}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-6 flex-1">
                    {blog.excerpt}
                  </p>
                  
                  <Link 
                    href={`/blog/${blog.slug}`} 
                    className="inline-flex items-center text-sm font-bold text-primary group/link mt-auto"
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
