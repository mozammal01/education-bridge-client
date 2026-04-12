"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Landmark, MapPin, Users, Globe, Plus, Loader2, ArrowRight } from "lucide-react";
import { organizerService } from "@/services/organizer-service";

export default function InstitutionsPage() {
  const [institutions, setInstitutions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstitutions = async () => {
      try {
        const res = await organizerService.getInstitutions();
        if (res.success) setInstitutions(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchInstitutions();
  }, []);

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-sm font-medium animate-pulse">Loading institutions...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">My Institutions</h1>
          <p className="text-muted-foreground">Manage and monitor your active educational organizations</p>
        </div>
        <Button className="gap-2 shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 rounded-full h-11 px-6">
          <Plus className="w-5 h-5" />
          Add Institution
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {institutions.length > 0 ? (
          institutions.map((inst) => (
            <Card key={inst.id} className="group overflow-hidden border-primary/5 hover:border-primary/20 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5">
              <CardHeader className="relative pb-0">
                 <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Landmark className="w-24 h-24 rotate-12" />
                 </div>
                 <div className="flex items-start justify-between">
                    <div className="w-16 h-16 rounded-2xl bg-violet-600 flex items-center justify-center text-2xl font-black text-white shadow-lg shadow-violet-200">
                        {inst.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="flex gap-2">
                        <div className="bg-emerald-500/10 text-emerald-600 text-[10px] font-bold px-3 py-1 rounded-full border border-emerald-500/20 uppercase tracking-tighter">Active</div>
                    </div>
                 </div>
                 <div className="mt-4">
                    <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{inst.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1.5 mt-1 font-medium italic">
                        <MapPin className="w-3.5 h-3.5" />
                        {inst.address || "No address provided"}
                    </CardDescription>
                 </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-3 gap-2 py-4 border-y border-primary/5 mb-6">
                  <div className="text-center">
                    <p className="text-xl font-black text-foreground">{inst._count.tutors}</p>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Tutors</p>
                  </div>
                  <div className="text-center border-x border-primary/10">
                    <p className="text-xl font-black text-foreground">{inst._count.students}</p>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Students</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-black text-foreground">{inst._count.groups}</p>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Groups</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">Established: {new Date(inst.createdAt).toLocaleDateString()}</p>
                    <Button variant="ghost" size="sm" className="text-primary font-bold hover:bg-primary/5 group/btn">
                        Details <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full h-[40vh] border-2 border-dashed border-primary/10 rounded-3xl flex flex-col items-center justify-center text-muted-foreground p-12 bg-muted/5">
            <Landmark className="w-16 h-16 mb-6 opacity-10" />
            <h3 className="text-lg font-bold text-foreground mb-2">No Institutions Found</h3>
            <p className="max-w-xs text-center mb-6">You haven't added any institutions yet. Start by creating your first academic organization.</p>
            <Button className="rounded-full shadow-lg shadow-primary/20">Add Your First Institution</Button>
          </div>
        )}
      </div>
    </div>
  );
}
