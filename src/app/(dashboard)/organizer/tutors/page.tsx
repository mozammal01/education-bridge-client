"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Mail, Phone, Landmark, Search, Filter, Loader2, Star, MoreVertical } from "lucide-react";
import { organizerService } from "@/services/organizer-service";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function TutorsPage() {
  const [tutors, setTutors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const res = await organizerService.getTutors();
        if (res.success) setTutors(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTutors();
  }, []);

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-sm font-medium animate-pulse">Loading tutor team...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Team & Tutors</h1>
          <p className="text-muted-foreground italic text-sm">Managing experts across your institutions</p>
        </div>
        <div className="flex gap-2">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input placeholder="Search tutors..." className="bg-muted/30 border border-primary/5 rounded-full pl-9 pr-4 py-2 text-sm focus:ring-1 focus:ring-primary/20 outline-none w-64 transition-all" />
            </div>
            <Button variant="outline" size="icon" className="rounded-full border-primary/5">
                <Filter className="w-4 h-4" />
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {tutors.length > 0 ? (
          tutors.map((tutor) => (
            <Card key={tutor.id} className="group border-primary/5 hover:border-primary/20 transition-all duration-300 shadow-lg shadow-primary/5 overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row">
                  {/* Left part: Profile */}
                  <div className="p-6 bg-muted/5 sm:w-2/5 flex flex-col items-center text-center border-r border-primary/5">
                    <Avatar className="w-20 h-20 border-4 border-background shadow-xl mb-4 group-hover:scale-105 transition-transform duration-500">
                        <AvatarImage src={tutor.user.image} />
                        <AvatarFallback className="bg-primary/10 text-primary font-bold text-xl">{tutor.user.name?.[0]}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-bold text-base text-foreground leading-tight">{tutor.user.name}</h3>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mt-1">{tutor.headline || "Senior Educator"}</p>
                    
                    <div className="flex items-center gap-1 mt-4 mb-4">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        <span className="text-xs font-black">{tutor.averageRating.toFixed(1)}</span>
                        <span className="text-[10px] text-muted-foreground ml-1">({tutor.totalReviews} reviews)</span>
                    </div>

                    <Button variant="secondary" size="sm" className="w-full rounded-full h-8 text-xs font-bold hover:bg-primary hover:text-white transition-all">View Performance</Button>
                  </div>

                  {/* Right part: Details */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div className="space-y-4">
                        <div className="flex justify-between items-start">
                            <Badge className="bg-violet-600/10 text-violet-600 border-none px-2 rounded-md font-bold text-[10px] uppercase flex items-center gap-1.5 h-6">
                                <Landmark className="w-3 h-3" />
                                {tutor.institution?.name || "Independent"}
                            </Badge>
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-foreground">
                                <MoreVertical className="w-4 h-4" />
                            </Button>
                        </div>

                        <div className="space-y-2">
                           <div className="flex items-center gap-3 text-xs text-muted-foreground group/info">
                                <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center group-hover/info:bg-primary/5 transition-colors">
                                    <Mail className="w-3.5 h-3.5 group-hover/info:text-primary" />
                                </div>
                                <span className="truncate">{tutor.user.email}</span>
                           </div>
                           <div className="flex items-center gap-3 text-xs text-muted-foreground group/info">
                                <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center group-hover/info:bg-primary/5 transition-colors">
                                    <Phone className="w-3.5 h-3.5 group-hover/info:text-primary" />
                                </div>
                                <span>{tutor.user.phone || "+880 1234-5678"}</span>
                           </div>
                        </div>

                        <div className="pt-4 flex flex-wrap gap-1.5">
                            {tutor.subjects?.slice(0, 3).map((sub: string) => (
                                <span key={sub} className="text-[9px] font-black uppercase text-muted-foreground/50 border border-primary/10 px-2 py-0.5 rounded-sm">{sub}</span>
                            ))}
                        </div>
                    </div>

                    <div className="pt-6 mt-6 border-t border-primary/5 flex justify-between items-center italic">
                        <p className="text-[10px] text-muted-foreground font-medium">Joined: {new Date(tutor.createdAt).toLocaleDateString()}</p>
                        <p className="text-[10px] text-primary font-black uppercase tracking-tighter cursor-pointer hover:underline">Change Station</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <Users className="w-16 h-16 mx-auto mb-4 opacity-10" />
            <p className="text-muted-foreground">No tutors currently registered under your institutions.</p>
          </div>
        )}
      </div>
    </div>
  );
}
