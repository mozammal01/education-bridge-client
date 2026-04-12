"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Users, Landmark, Plus, Loader2, ArrowUpRight, GraduationCap } from "lucide-react";
import { organizerService } from "@/services/organizer-service";
import { Badge } from "@/components/ui/badge";

export default function GroupsPage() {
  const [groups, setGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await organizerService.getGroups();
        if (res.success) setGroups(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchGroups();
  }, []);

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-sm font-medium animate-pulse">Establishing student groups...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center bg-linear-to-r from-violet-600 to-primary p-8 rounded-[2rem] shadow-xl shadow-primary/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
            <Globe className="w-48 h-48 text-white rotate-12" />
        </div>
        <div className="relative z-10 text-white">
          <h1 className="text-3xl font-black tracking-tight">Student Groups</h1>
          <p className="opacity-80 font-medium italic">Manage and monitor classroom performance across branches</p>
        </div>
        <Button className="bg-white text-primary hover:bg-white/90 rounded-full h-11 px-8 font-bold shadow-lg relative z-10">
          <Plus className="w-5 h-5 mr-2" />
          Create New Group
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {groups.length > 0 ? (
          groups.map((group) => (
            <Card key={group.id} className="group border-none shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden relative">
               <div className="absolute bottom-0 right-0 w-24 h-24 bg-primary/5 rounded-tl-[4rem] group-hover:w-32 group-hover:h-32 transition-all duration-500" />
               <CardHeader className="pb-0">
                  <div className="flex justify-between items-start">
                    <div className="p-3 bg-violet-100 rounded-2xl">
                        <GraduationCap className="h-6 w-6 text-violet-600" />
                    </div>
                    <Badge variant="outline" className="border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">{group.institution?.name}</Badge>
                  </div>
                  <div className="mt-6">
                    <CardTitle className="text-xl font-black text-foreground">{group.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1.5 mt-1 font-bold italic text-emerald-600">
                        <Users className="w-3.5 h-3.5" />
                        {group._count.students} Active Students
                    </CardDescription>
                  </div>
               </CardHeader>
               <CardContent className="pt-8">
                 <div className="space-y-4">
                    <div className="flex justify-between items-end">
                        <div className="space-y-1">
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Growth Rate</p>
                            <p className="text-base font-black text-foreground">+12% <span className="text-[8px] text-emerald-500 font-bold ml-1">THIS MONTH</span></p>
                        </div>
                        <Button variant="ghost" size="icon" className="rounded-full bg-primary/5 text-primary hover:bg-primary hover:text-white transition-all">
                            <ArrowUpRight className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-linear-to-r from-violet-500 to-primary w-[75%]" />
                    </div>
                 </div>
               </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full py-20 text-center text-muted-foreground">
            <Globe className="w-12 h-12 mx-auto mb-4 opacity-10" />
            <p>No student groups found in your institutions.</p>
          </div>
        )}
      </div>
    </div>
  );
}
