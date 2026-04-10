import type { Metadata } from "next";
import { BLOG_POSTS } from "@/constants/blogs";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, BookOpen, Clock, ArrowLeft, Share2, Facebook, Twitter, Linkedin, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find(p => p.slug === slug);

  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | EduBridge Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find(p => p.slug === slug);

  if (!post) notFound();

  const otherPosts = BLOG_POSTS.filter(p => p.slug !== slug).slice(0, 3);

  return (
    <div className="min-h-screen pb-20">
      {/* Article Header */}
      <header className="relative pt-12 pb-24 bg-linear-to-b from-primary/5 to-background overflow-hidden">
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-primary mb-12 hover:-translate-x-1 transition-transform group">
            <ArrowLeft className="w-4 h-4" />
            Back to Articles
          </Link>
          
          <div className="flex flex-wrap gap-2 mb-6">
             <Badge className="rounded-full px-4">{post.category}</Badge>
             {post.tags.map(tag => (
               <Badge key={tag} variant="secondary" className="rounded-full px-4 font-normal">#{tag}</Badge>
             ))}
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-8 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-muted relative">
                <Image src={post.author.image} alt={post.author.name} fill className="object-cover" unoptimized />
              </div>
              <div>
                <p className="font-bold text-foreground text-base leading-none mb-1">{post.author.name}</p>
                <p className="text-xs uppercase tracking-widest">{post.author.role}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6 border-l pl-8 border-muted">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                {post.date}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                {post.readTime}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 -mt-12">
        <div className="grid lg:grid-cols-[1fr_350px] gap-12 max-w-7xl mx-auto">
          {/* Main Content */}
          <article className="space-y-12">
             <div className="relative aspect-video rounded-[2rem] overflow-hidden shadow-2xl">
               <Image src={post.image} alt={post.title} fill className="object-cover" unoptimized />
             </div>

             <div className="prose prose-lg dark:prose-invert max-w-none 
               prose-headings:font-black prose-headings:tracking-tight 
               prose-p:text-muted-foreground prose-p:leading-relaxed 
               prose-li:text-muted-foreground
               prose-img:rounded-3xl prose-img:shadow-xl">
               {/* 
                  Normally we'd use a markdown library here.
                  Since this is a mock, we'll manually render the content or simulate sections.
               */}
               <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n\n/g, "</p><p>").replace(/### (.*)/g, "<h3>$1</h3>") }} />
             </div>

             {/* Share Section */}
             <div className="pt-12 border-t flex flex-col sm:flex-row items-center justify-between gap-6">
               <div className="flex items-center gap-4">
                 <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Share Article</p>
                 <div className="flex gap-2">
                   {[Facebook, Twitter, Linkedin, Share2].map((Icon, i) => (
                     <Button key={i} variant="outline" size="icon" className="rounded-xl hover:bg-primary hover:text-white transition-all">
                       <Icon className="w-4 h-4" />
                     </Button>
                   ))}
                 </div>
               </div>
               
               <Button variant="outline" className="rounded-full px-8 gap-2 group">
                 Report Content
                 <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
               </Button>
             </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-12 h-fit lg:sticky lg:top-24">
            <div className="bg-card border rounded-3xl p-8 shadow-sm">
              <h4 className="text-lg font-black mb-6 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Latest Reading
              </h4>
              <div className="space-y-6">
                {otherPosts.map(other => (
                   <Link key={other.id} href={`/blog/${other.slug}`} className="group block">
                      <div className="relative aspect-video rounded-xl overflow-hidden mb-3 bg-muted">
                        <Image src={other.image} alt={other.title} fill className="object-cover group-hover:scale-105 transition-transform" unoptimized />
                      </div>
                      <h5 className="font-bold text-sm group-hover:text-primary transition-colors line-clamp-2">
                        {other.title}
                      </h5>
                      <span className="text-[10px] text-muted-foreground mt-1 block uppercase tracking-widest">{other.date}</span>
                   </Link>
                ))}
              </div>
              <Button variant="link" className="w-full mt-6 text-primary h-auto p-0" asChild>
                <Link href="/blog">View All Articles</Link>
              </Button>
            </div>

            <div className="bg-primary p-8 rounded-3xl text-primary-foreground relative overflow-hidden shadow-xl shadow-primary/20">
               <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_-20%,rgba(255,255,255,0.2),transparent_70%)]" />
               <div className="relative z-10">
                 <h4 className="text-xl font-black mb-4">Never Miss a Lesson</h4>
                 <p className="text-primary-foreground/80 text-sm mb-6 leading-relaxed">
                   Join 5,000+ learning enthusiasts and get weekly insights directly in your inbox.
                 </p>
                 <Link href="/#newsletter">
                   <Button variant="secondary" className="w-full rounded-xl font-bold">Subscribe Free</Button>
                 </Link>
               </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
