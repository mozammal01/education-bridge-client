"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, BookOpen, Search, Filter, Loader2, Calendar, User, ArrowRight, MoreVertical } from "lucide-react";
import { managerService } from "@/services/manager-service";
import { Badge } from "@/components/ui/badge";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await managerService.getBlogs();
        if (res.success) setBlogs(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-sm font-medium animate-pulse text-muted-foreground">Fetching platform archives...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-foreground">Blogs & <span className="text-primary italic">Updates</span></h1>
          <p className="text-muted-foreground font-medium italic">Manage official news and educational articles</p>
        </div>
        <div className="flex gap-3">
            <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input placeholder="Search articles..." className="bg-muted/40 border-none rounded-full pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none w-64 transition-all" />
            </div>
            <Button className="rounded-full shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 font-bold gap-2 h-10 px-6">
                <Plus className="w-4 h-4" />
                Draft Post
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <Card key={blog.id} className="group border-none shadow-xl shadow-primary/5 hover:shadow-primary/10 transition-all duration-500 rounded-[2.5rem] overflow-hidden bg-card">
              <div className="h-48 bg-linear-to-br from-primary/10 to-violet-500/10 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:scale-110 transition-transform duration-700">
                    <BookOpen className="w-40 h-40" />
                </div>
                {blog.image && <img src={blog.image} alt="" className="w-full h-full object-cover relative z-0" />}
                <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-white/80 backdrop-blur-md text-primary font-bold border-none shadow-sm capitalize rounded-full px-3 py-1 text-[10px]">
                        {blog.status}
                    </Badge>
                </div>
              </div>
              <CardContent className="p-8 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground font-bold italic">
                     <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(blog.createdAt).toLocaleDateString()}</span>
                     <span className="flex items-center gap-1"><User className="w-3 h-3" /> By {blog.author.name}</span>
                  </div>
                  <CardTitle className="text-2xl font-black group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                    {blog.title}
                  </CardTitle>
                </div>
                
                <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed font-medium">
                  {blog.content}
                </p>

                <div className="pt-6 flex justify-between items-center border-t border-primary/5">
                    <Button variant="ghost" size="sm" className="text-primary font-black hover:bg-primary/5 group/btn rounded-full px-4 italic">
                        Edit Draft <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-rose-600 hover:bg-rose-50 transition-all">
                        <MoreVertical className="w-4 h-4" />
                    </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-muted/20 rounded-[3rem] border-2 border-dashed border-primary/10">
            <BookOpen className="w-20 h-20 mx-auto mb-6 opacity-10" />
            <h3 className="text-xl font-black text-foreground mb-2">The Archive is Empty</h3>
            <p className="text-muted-foreground italic mb-8">Ready to publish your first platform update?</p>
            <Button className="rounded-full px-10 h-12 shadow-xl shadow-primary/20 font-black">
                Start Writing Now
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
