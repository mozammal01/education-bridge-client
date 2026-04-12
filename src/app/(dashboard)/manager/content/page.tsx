"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ShieldAlert, CheckCircle2, Trash2, Loader2, Flag, User, MessageCircle, BookOpen } from "lucide-react";
import { managerService } from "@/services/manager-service";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function ContentControlPage() {
  const [flags, setFlags] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlags = async () => {
      try {
        const res = await managerService.getFlags();
        if (res.success) setFlags(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchFlags();
  }, []);

  const handleResolve = (id: string, action: string) => {
    toast.success(`Flag ${id} resolved with action: ${action}`);
    setFlags(flags.filter(f => f.id !== id));
  };

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-sm font-medium animate-pulse text-muted-foreground">Scanning platform for violations...</p>
      </div>
    );
  }

  const getIcon = (type: string) => {
    switch (type) {
        case "USER": return <User className="w-4 h-4" />;
        case "REVIEW": return <MessageCircle className="w-4 h-4" />;
        case "BLOG": return <BookOpen className="w-4 h-4" />;
        default: return <Flag className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center bg-rose-500/5 p-8 rounded-[2.5rem] border border-rose-500/10">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-rose-600 flex items-center gap-2">
            <ShieldAlert className="w-8 h-8" />
            Content <span className="italic">Control</span>
          </h1>
          <p className="text-muted-foreground font-medium italic">Resolve community reports and platform violations</p>
        </div>
        <div className="text-right">
            <p className="text-3xl font-black text-rose-600">{flags.length}</p>
            <p className="text-[10px] font-black uppercase text-rose-600/60 tracking-widest">Active Flags</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {flags.length > 0 ? (
          flags.map((flag) => (
            <Card key={flag.id} className="group border-none shadow-xl shadow-rose-900/5 hover:shadow-rose-900/10 transition-all duration-300 rounded-[2rem] overflow-hidden bg-white">
              <CardContent className="p-0 flex flex-col sm:flex-row">
                 <div className="p-8 sm:w-1/5 bg-rose-50 flex flex-col items-center justify-center text-center border-r border-rose-100/50">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-rose-600 shadow-md mb-4">
                        {getIcon(flag.type)}
                    </div>
                    <Badge variant="outline" className="border-rose-200 text-rose-600 font-black text-[10px] uppercase">
                        {flag.type}
                    </Badge>
                 </div>
                 <div className="p-8 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                        <div className="flex justify-between items-start">
                            <h3 className="font-black text-foreground flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4 text-rose-500" />
                                Potential Violation
                            </h3>
                            <span className="text-[10px] font-black text-muted-foreground uppercase">{new Date(flag.createdAt).toDateString()}</span>
                        </div>
                        <p className="text-muted-foreground font-medium leading-relaxed italic border-l-4 border-rose-200 pl-4 py-1">
                            {flag.reason}
                        </p>
                        <div className="text-xs font-bold text-muted-foreground flex items-center gap-2">
                            <span>Reporter:</span>
                            <span className="text-foreground">{flag.reporter?.name}</span>
                        </div>
                    </div>

                    <div className="pt-6 flex justify-end items-center gap-3">
                        <Button 
                            onClick={() => handleResolve(flag.id, "Keep")}
                            variant="ghost" 
                            className="h-10 rounded-full px-6 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 font-bold gap-2"
                        >
                            <CheckCircle2 className="w-5 h-5" />
                            Keep Content
                        </Button>
                        <Button 
                            onClick={() => handleResolve(flag.id, "Remove")}
                            className="h-10 rounded-full px-8 bg-rose-600 hover:bg-rose-700 text-white font-bold gap-2 shadow-lg shadow-rose-600/20"
                        >
                            <Trash2 className="w-5 h-5" />
                            Remove Content
                        </Button>
                    </div>
                 </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="py-24 text-center bg-muted/20 rounded-[3rem] border-2 border-dashed border-primary/5">
            <CheckCircle2 className="w-16 h-16 mx-auto mb-6 text-emerald-500/20" />
            <h3 className="text-xl font-black text-foreground mb-1 italic">Platform Secure</h3>
            <p className="text-muted-foreground font-medium">No active flags require attention.</p>
          </div>
        )}
      </div>
    </div>
  );
}
