"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PieChart, TrendingUp, DollarSign, Download, Plus, Loader2, ArrowRight, CreditCard } from "lucide-react";
import { organizerService } from "@/services/organizer-service";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function FinancePage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFinance = async () => {
      try {
        const res = await organizerService.getStats();
        if (res.success) setStats(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchFinance();
  }, []);

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-sm font-medium animate-pulse">Calculating institutional revenue...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Finance & Revenue</h1>
          <p className="text-muted-foreground italic">Monitor earnings across your academic organizations</p>
        </div>
        <Button className="gap-2 shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 rounded-full h-11 px-6">
          <Download className="w-5 h-5" />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-primary text-primary-foreground border-none shadow-xl shadow-primary/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                  <DollarSign className="w-32 h-32 text-white" />
              </div>
              <CardHeader className="pb-2">
                  <CardDescription className="text-primary-foreground/70 uppercase text-[10px] font-black tracking-widest leading-none">Total Partner Revenue</CardDescription>
                  <CardTitle className="text-4xl font-black tracking-tight">${stats?.revenue || 0}</CardTitle>
              </CardHeader>
              <CardContent>
                  <div className="flex items-center gap-2 text-xs font-bold bg-white/10 w-fit px-3 py-1.5 rounded-full border border-white/10 leading-none">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>+12.5% this month</span>
                  </div>
              </CardContent>
          </Card>

          <Card className="border-primary/5 hover:border-primary/20 transition-all duration-300 group shadow-lg shadow-primary/5">
              <CardHeader className="pb-2">
                  <CardDescription className="uppercase text-[10px] font-black tracking-widest leading-none text-muted-foreground">Admin Balance</CardDescription>
                  <CardTitle className="text-4xl font-black tracking-tight group-hover:text-primary transition-colors">$1,250.00</CardTitle>
              </CardHeader>
              <CardContent>
                  <Button variant="link" size="sm" className="p-0 h-auto text-primary font-bold text-xs transition-all hover:gap-2">
                      Transfer Funds <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
              </CardContent>
          </Card>

          <Card className="border-primary/5 shadow-lg shadow-primary/5">
              <CardHeader className="pb-2">
                  <CardDescription className="uppercase text-[10px] font-black tracking-widest leading-none text-muted-foreground">Pending Payouts</CardDescription>
                  <CardTitle className="text-4xl font-black tracking-tight text-amber-500">$450.00</CardTitle>
              </CardHeader>
              <CardContent>
                  <p className="text-xs text-muted-foreground italic font-medium">Next payout scheduled for June 15, 2026</p>
              </CardContent>
          </Card>
      </div>

      <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
              <h2 className="text-lg font-black flex items-center gap-2 text-foreground">
                  <PieChart className="w-5 h-5 text-primary" />
                  Recent Partner Earnings (Simulated)
              </h2>
          </div>

          <Card className="border-none shadow-xl overflow-hidden rounded-3xl">
              <Table>
                  <TableHeader className="bg-muted/50 border-none">
                      <TableRow className="border-none">
                          <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground h-14">Institution</TableHead>
                          <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground h-14">Period</TableHead>
                          <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground h-14">Amount</TableHead>
                          <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground h-14">Status</TableHead>
                          <TableHead className="text-right text-[10px] font-black uppercase tracking-widest text-muted-foreground h-14">Action</TableHead>
                      </TableRow>
                  </TableHeader>
                  <TableBody>
                      {[
                        { inst: "Global Academy North", date: "May 2026", amount: 850, status: "PAID" },
                        { inst: "SkillBridge Institute South", date: "May 2026", amount: 400, status: "PENDING" },
                        { inst: "Global Academy North", date: "April 2026", amount: 1200, status: "PAID" },
                      ].map((item, i) => (
                          <TableRow key={i} className="hover:bg-primary/5 transition-colors border-primary/5 h-16">
                              <TableCell className="font-bold text-sm text-foreground">{item.inst}</TableCell>
                              <TableCell className="text-sm text-muted-foreground font-medium">{item.date}</TableCell>
                              <TableCell className="font-black text-sm text-foreground">${item.amount}</TableCell>
                              <TableCell>
                                  <Badge className={item.status === "PAID" ? "bg-emerald-500/10 text-emerald-600 border-none px-3" : "bg-amber-500/10 text-amber-600 border-none px-3"}>
                                      {item.status}
                                  </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                                      <Download className="h-4 w-4" />
                                  </Button>
                              </TableCell>
                          </TableRow>
                      ))}
                  </TableBody>
              </Table>
          </Card>
      </div>
    </div>
  );
}
