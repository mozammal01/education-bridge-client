"use client";

import { useState, useMemo } from "react";
import { BLOG_POSTS, BlogPost } from "@/constants/blogs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Calendar, User, ArrowRight, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function BlogListing() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(() => {
    const cats = new Set(BLOG_POSTS.map(post => post.category));
    return ["All", ...Array.from(cats)];
  }, []);

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="space-y-12">
      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center bg-card p-6 rounded-2xl border shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search articles..." 
            className="pl-10 h-12 bg-background border-muted"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
              className="rounded-full px-5"
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="group overflow-hidden border bg-card hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                <Link href={`/blog/${post.slug}`} className="block relative overflow-hidden aspect-16/10 bg-muted">
                  <Image 
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    unoptimized
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 bg-background/90 backdrop-blur-sm text-primary text-[10px] font-bold rounded-full shadow-sm">
                      {post.category}
                    </span>
                  </div>
                </Link>
                
                <CardContent className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-4 text-[10px] text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      {post.readTime}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-1">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-muted">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-muted relative">
                        <Image src={post.author.image} alt={post.author.name} fill className="object-cover" unoptimized />
                      </div>
                      <span className="text-xs font-bold">{post.author.name}</span>
                    </div>
                    <Link 
                      href={`/blog/${post.slug}`} 
                      className="inline-flex items-center text-xs font-bold text-primary group/link px-3 py-1.5 hover:bg-primary/5 rounded-lg transition-all"
                    >
                      Read
                      <ArrowRight className="ml-1 w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-muted/20 rounded-3xl border-2 border-dashed">
          <BookOpen className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
          <h3 className="text-2xl font-bold mb-2">No articles found</h3>
          <p className="text-muted-foreground">Try adjusting your search or category filters.</p>
        </div>
      )}
    </div>
  );
}
