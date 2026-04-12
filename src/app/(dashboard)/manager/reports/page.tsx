"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Download, FileText, Loader2, Calendar, TrendingUp, Cpu, DollarSign, ArrowRight } from "lucide-react";
import { managerService } from "@/services/manager-service";
import { Badge } from "@/components/ui/badge";

export default function ReportsPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await managerService.getReports();
        if (res.success) setReports(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-sm font-medium animate-pulse text-muted-foreground">Generating analytical dossiers...</p>
      </div>
    );
  }

  const getReportIcon = (type: string) => {
    switch (type) {
        case "GROWTH": return <TrendingUp className="w-5 h-5 text-emerald-600" />;
        case "SYSTEM": return <Cpu className="w-5 h-5 text-blue-600" />;
        case "FINANCE": return <DollarSign className="w-5 h-5 text-violet-600" />;
        default: return <FileText className="w-5 h-5 text-primary" />;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-foreground">System <span className="text-primary italic">Reports</span></h1>
          <p className="text-muted-foreground font-medium italic">High-level dossiers on platform performance and growth</p>
        </div>
        <Button className="rounded-full shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 font-bold gap-2 h-10 px-6">
            <Download className="w-4 h-4" />
            Export Data
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.length > 0 ? (
          reports.map((report) => (
            <Card key={report.id} className="group border-none shadow-xl shadow-primary/5 hover:shadow-primary/10 transition-all duration-300 rounded-[2rem] overflow-hidden bg-white hover:-translate-y-1">
              <CardHeader className="p-8 pb-0">
                 <div className="flex justify-between items-start">
                    <div className="p-3 bg-muted rounded-2xl group-hover:bg-primary/10 transition-colors">
                        {getReportIcon(report.type)}
                    </div>
                    <Badge variant="outline" className="border-primary/20 text-[10px] font-black uppercase tracking-widest leading-none px-2.5 py-1">
                        {report.type}
                    </Badge>
                 </div>
                 <div className="mt-6">
                    <CardTitle className="text-lg font-black leading-tight group-hover:text-primary transition-colors">
                        {report.title}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-1.5 mt-1 font-bold italic text-[10px] text-muted-foreground uppercase tracking-tighter">
                        <Calendar className="w-3 h-3" />
                        Generated: {new Date(report.createdAt).toLocaleDateString()}
                    </CardDescription>
                 </div>
              </CardHeader>
              <CardContent className="p-8">
                <p className="text-muted-foreground text-sm font-medium leading-relaxed mb-6">
                    {report.description || "Detailed analysis of system metrics for the current period."}
                </p>
                <div className="pt-6 border-t border-primary/5 flex justify-between items-center">
                    <div className="flex gap-1">
                        <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center text-[10px] font-black text-emerald-600">PDF</div>
                        <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center text-[10px] font-black text-blue-600">CSV</div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-primary font-black text-xs hover:bg-primary/5 rounded-full px-4 italic group/btn">
                        View Dossier <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full py-24 text-center">
            <BarChart3 className="w-16 h-16 mx-auto mb-6 opacity-10" />
            <p className="text-muted-foreground">No reports generated for this cycle.</p>
          </div>
        )}
      </div>
    </div>
  );
}
