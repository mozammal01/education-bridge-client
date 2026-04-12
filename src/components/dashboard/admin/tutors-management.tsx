"use client";

import { useState, useEffect } from "react";
import { 
  Search, 
  MoreVertical, 
  ShieldCheck, 
  ShieldAlert, 
  Ban, 
  Mail, 
  UserCheck, 
  UserX, 
  Loader2, 
  Star,
  GraduationCap,
  DollarSign,
  Clock,
  ExternalLink
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn, getImageUrl } from "@/lib/utils";
import { adminService } from "@/services";
import { toast } from "sonner";
import type { TutorProfile } from "@/types";
import Link from "next/link";

export function TutorsManagement() {
  const [search, setSearch] = useState("");
  const [tutors, setTutors] = useState<TutorProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "verified" | "unverified">("all");

  const fetchTutors = async () => {
    try {
      const res = await adminService.getTutors();
      if (res && res.data) {
        setTutors(res.data);
      }
    } catch {
      toast.error("Failed to load tutors");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTutors();
  }, []);

  const handleToggleVerification = async (tutorId: string, currentStatus: boolean) => {
    try {
      await adminService.toggleVerification(tutorId, !currentStatus);
      toast.success(`Tutor ${!currentStatus ? "verified" : "unverified"} successfully`);
      fetchTutors();
    } catch {
      toast.error("Failed to update verification status");
    }
  };

  const handleToggleBan = async (userId: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === "ACTIVE" ? "BANNED" : "ACTIVE";
      await adminService.updateUser(userId, { status: newStatus });
      toast.success(`User access ${newStatus === "BANNED" ? "restricted" : "restored"}`);
      fetchTutors();
    } catch {
      toast.error("Failed to update user status");
    }
  };

  const filtered = tutors.filter((tutor) => {
    const matchesSearch =
      tutor.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      tutor.user?.email?.toLowerCase().includes(search.toLowerCase()) ||
      tutor.subjects?.some(s => s.toLowerCase().includes(search.toLowerCase()));
    
    const matchesFilter = 
      filter === "all" || 
      (filter === "verified" && tutor.isVerified) || 
      (filter === "unverified" && !tutor.isVerified);

    return matchesSearch && matchesFilter;
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-sm font-medium animate-pulse text-muted-foreground italic">Synchronizing tutor database...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-foreground flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-primary" />
            Tutor <span className="text-primary italic">Intelligence</span>
          </h1>
          <p className="text-muted-foreground font-medium italic">Manage educator profiles and platform verification</p>
        </div>
        
        <div className="flex bg-muted/50 p-1 rounded-2xl border border-primary/5">
            {(["all", "verified", "unverified"] as const).map((f) => (
                <Button 
                    key={f}
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setFilter(f)}
                    className={cn(
                        "rounded-xl px-4 py-1.5 text-xs font-black uppercase tracking-widest transition-all",
                        filter === f ? "bg-white text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
                    )}
                >
                    {f}
                </Button>
            ))}
        </div>
      </div>

      <div className="relative max-w-sm group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
        <Input
          placeholder="Search tutors by name, email or subject..."
          className="pl-12 h-14 bg-muted/30 border-none rounded-[1.5rem] font-bold focus-visible:ring-2 focus-visible:ring-primary/20 transition-all shadow-inner"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Card className="border-none shadow-2xl shadow-primary/5 rounded-[2.5rem] overflow-hidden bg-card">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-primary/5 bg-primary/5">
                  <th className="text-left p-6 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Educator / Specialty</th>
                  <th className="text-left p-6 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Expertise</th>
                  <th className="text-left p-6 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Economics</th>
                  <th className="text-left p-6 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Verification</th>
                  <th className="text-right p-6 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/5">
                {filtered.map((tutor) => (
                  <tr key={tutor.id} className="hover:bg-primary/5 transition-all group">
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-14 w-14 rounded-2xl ring-2 ring-primary/5">
                          <AvatarImage src={getImageUrl(tutor.user?.image)} />
                          <AvatarFallback className="bg-primary/10 text-primary font-black">{tutor.user?.name?.charAt(0) || "T"}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-black text-foreground group-hover:text-primary transition-colors">{tutor.user?.name}</p>
                          <p className="text-xs text-muted-foreground font-medium italic">{tutor.headline || "Professional Educator"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                        <div className="flex flex-wrap gap-1.5 max-w-[200px]">
                            {tutor.subjects?.slice(0, 3).map((sub, i) => (
                                <Badge key={i} variant="secondary" className="bg-primary/5 text-[10px] font-bold text-primary border-none lowercase">
                                    {sub}
                                </Badge>
                            ))}
                            {tutor.subjects && tutor.subjects.length > 3 && (
                                <Badge variant="secondary" className="bg-muted text-[10px] font-bold border-none">
                                    +{tutor.subjects.length - 3} more
                                </Badge>
                            )}
                        </div>
                    </td>
                    <td className="p-6">
                        <div className="space-y-1">
                            <div className="flex items-center gap-1.5 text-sm font-black text-foreground">
                                <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
                                {tutor.hourlyRate}/hr
                            </div>
                            <div className="flex items-center gap-1.5 text-[10px] font-black italic text-muted-foreground uppercase opacity-70">
                                <Clock className="w-3 h-3" />
                                {tutor.experience}y Experience
                            </div>
                        </div>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-3">
                        {tutor.isVerified ? (
                            <Badge className="bg-emerald-500/10 text-emerald-600 border-none px-3 py-1 font-black text-[10px] uppercase tracking-widest flex items-center gap-1.5">
                                <ShieldCheck className="w-3 h-3" />
                                Verified
                            </Badge>
                        ) : (
                            <Badge className="bg-amber-500/10 text-amber-600 border-none px-3 py-1 font-black text-[10px] uppercase tracking-widest flex items-center gap-1.5">
                                <ShieldAlert className="w-3 h-3" />
                                Pending
                            </Badge>
                        )}

                        {tutor.user?.status === "BANNED" && (
                            <Badge variant="destructive" className="px-3 py-1 font-black text-[10px] uppercase tracking-widest flex items-center gap-1.5">
                                <Ban className="w-3 h-3" />
                                restricted
                            </Badge>
                        )}
                      </div>
                    </td>
                    <td className="p-6 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:bg-primary/10 transition-all">
                            <MoreVertical className="w-5 h-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl bg-card border-none shadow-2xl">
                          <Link href={`/tutors/${tutor.id}`}>
                            <DropdownMenuItem className="cursor-pointer font-bold italic gap-2 rounded-xl h-11">
                                <ExternalLink className="w-4 h-4 text-primary" />
                                View Platform Profile
                            </DropdownMenuItem>
                          </Link>
                          <DropdownMenuItem 
                            className="cursor-pointer font-bold italic gap-2 rounded-xl h-11"
                            onClick={() => handleToggleVerification(tutor.id, tutor.isVerified)}
                          >
                            {tutor.isVerified ? (
                                <>
                                    <ShieldAlert className="w-4 h-4 text-amber-500" />
                                    Revoke Verification
                                </>
                            ) : (
                                <>
                                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                                    Verify Educator
                                </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-primary/5 mx-2 my-1" />
                          <DropdownMenuItem 
                            className={cn(
                                "cursor-pointer font-bold italic gap-2 rounded-xl h-11",
                                tutor.user?.status === "BANNED" ? "text-emerald-600" : "text-destructive"
                            )}
                            onClick={() => handleToggleBan(tutor.user?.id || "", tutor.user?.status || "ACTIVE")}
                          >
                            {tutor.user?.status === "BANNED" ? (
                                <>
                                    <UserCheck className="w-4 h-4" />
                                    Restore User Access
                                </>
                            ) : (
                                <>
                                    <UserX className="w-4 h-4" />
                                    Restrict User Access
                                </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer font-bold italic gap-2 rounded-xl h-11">
                            <Mail className="w-4 h-4 text-blue-500" />
                            Direct Internal Mail
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-32 space-y-4">
              <div className="w-20 h-20 bg-muted/50 rounded-[2rem] flex items-center justify-center mx-auto opacity-20">
                <Search className="w-10 h-10" />
              </div>
              <div>
                <p className="text-xl font-black italic">No records synchronized</p>
                <p className="text-muted-foreground font-medium text-sm italic">Adjust filters to find matching tutor profiles</p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => { setSearch(""); setFilter("all"); }}
                className="rounded-full px-8 font-bold italic hover:bg-primary/5"
              >
                Reset Dossier
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="grid md:grid-cols-3 gap-6 pt-4">
          <Card className="border-none bg-primary/5 p-6 rounded-[2rem]">
              <div className="flex items-center gap-4">
                  <div className="p-3 bg-white rounded-2xl shadow-sm">
                      <Star className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Avg. Performance</p>
                      <p className="text-xl font-black">4.8 / 5.0</p>
                  </div>
              </div>
          </Card>
          <Card className="border-none bg-emerald-500/5 p-6 rounded-[2rem]">
              <div className="flex items-center gap-4">
                  <div className="p-3 bg-white rounded-2xl shadow-sm">
                      <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Verification Rate</p>
                      <p className="text-xl font-black">{Math.round((tutors.filter(t => t.isVerified).length / (tutors.length || 1)) * 100)}%</p>
                  </div>
              </div>
          </Card>
          <Card className="border-none bg-violet-500/5 p-6 rounded-[2rem]">
              <div className="flex items-center gap-4">
                  <div className="p-3 bg-white rounded-2xl shadow-sm">
                      <Clock className="w-5 h-5 text-violet-600" />
                  </div>
                  <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Onboarding Speed</p>
                      <p className="text-xl font-black">2.4 Days</p>
                  </div>
              </div>
          </Card>
      </div>
    </div>
  );
}
