"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, CheckCircle, XCircle, Star, Loader2, Flag, ArrowUpRight, Filter } from "lucide-react";
import { managerService } from "@/services/manager-service";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

export default function ReviewModerationPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const res = await managerService.getPendingReviews();
      if (res.success) setReviews(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleAction = async (id: string, status: "APPROVED" | "REJECTED") => {
     try {
        const res = await managerService.updateReviewStatus(id, status);
        if (res.success) {
            toast.success(`Review ${status.toLowerCase()} successfully`);
            setReviews(reviews.filter(r => r.id !== id));
        }
     } catch (error) {
         toast.error("Failed to update review");
     }
  };

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-sm font-medium animate-pulse text-muted-foreground">Syncing moderation queue...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
            Review <span className="text-primary italic">Moderation</span>
          </h1>
          <p className="text-muted-foreground font-medium italic">Approve or flag community feedback for platform integrity</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" className="rounded-full gap-2 border-primary/10 hover:bg-primary/5">
                <Filter className="w-4 h-4" />
                Filter by Rating
            </Button>
        </div>
      </div>

      <div className="space-y-6">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <Card key={review.id} className="group border-none shadow-xl shadow-primary/5 hover:shadow-primary/10 transition-all duration-300 rounded-[2rem] overflow-hidden bg-card/50 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                    {/* User Metadata */}
                    <div className="p-8 border-r border-primary/5 md:w-1/4 bg-muted/20 flex flex-col items-center text-center">
                        <Avatar className="w-16 h-16 border-2 border-primary/10 shadow-lg mb-4">
                            <AvatarImage src={review.student.image} />
                            <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg">{review.student.name[0]}</AvatarFallback>
                        </Avatar>
                        <h4 className="font-black text-sm text-foreground leading-tight">{review.student.name}</h4>
                        <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mt-1">Student</p>
                        
                        <div className="mt-6 pt-6 border-t border-primary/5 w-full">
                            <p className="text-[10px] font-black uppercase text-muted-foreground/60 tracking-tighter mb-2">Review Target</p>
                            <Badge className="bg-violet-600/10 text-violet-600 border-none font-bold text-[10px] truncate max-w-full">
                                {review.tutor?.user?.name || "Platform"}
                            </Badge>
                        </div>
                    </div>

                    {/* Review Content */}
                    <div className="p-8 flex-1 flex flex-col justify-between">
                        <div className="space-y-4">
                            <div className="flex justify-between items-start">
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-4 h-4 ${i < review.rating ? "text-amber-500 fill-amber-500" : "text-muted-foreground/20"}`} />
                                    ))}
                                </div>
                                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{new Date(review.createdAt).toDateString()}</span>
                            </div>
                            <p className="text-foreground font-medium leading-relaxed italic text-lg leading-snug underline decoration-primary/10 underline-offset-8">
                                "{review.comment}"
                            </p>
                        </div>

                        <div className="pt-8 flex justify-end items-center gap-3">
                            <Button 
                                onClick={() => handleAction(review.id, "REJECTED")}
                                variant="ghost" 
                                className="h-10 rounded-full px-6 text-rose-600 hover:bg-rose-50 hover:text-rose-700 font-bold gap-2 group/reject"
                            >
                                <XCircle className="w-5 h-5 transition-transform group-hover/reject:scale-110" />
                                Reject
                            </Button>
                            <Button 
                                onClick={() => handleAction(review.id, "APPROVED")}
                                className="h-10 rounded-full px-8 bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-2 shadow-lg shadow-emerald-600/20 group/approve"
                            >
                                <CheckCircle className="w-5 h-5 transition-transform group-hover/approve:scale-110" />
                                Approve
                            </Button>
                        </div>
                    </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="py-24 text-center bg-card shadow-2xl rounded-[3rem] border border-primary/5 border-dashed">
            <CheckCircle className="w-16 h-16 mx-auto mb-6 text-emerald-500/20" />
            <h3 className="text-xl font-black text-foreground mb-1 italic">Queue Cleared</h3>
            <p className="text-muted-foreground font-medium">No pending reviews require moderation at this time.</p>
          </div>
        )}
      </div>
    </div>
  );
}
