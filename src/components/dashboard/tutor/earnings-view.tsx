"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { 
  DollarSign, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Wallet, 
  Calendar, 
  CreditCard, 
  Download,
  Filter,
  MoreHorizontal,
  Clock,
  CheckCircle2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DashboardCharts } from "../overview-charts";

const TRANSACTIONS = [
  { id: "TX-1001", student: "Areeba Karim", subject: "Phyics HL", amount: 45.00, status: "COMPLETED", date: "2026-04-10" },
  { id: "TX-1002", student: "David Miller", subject: "Math Calculus", amount: 60.00, status: "COMPLETED", date: "2026-04-09" },
  { id: "TX-1003", student: "Sarah Chen", subject: "Chemistry IB", amount: 55.00, status: "PENDING", date: "2026-04-12" },
  { id: "TX-1004", student: "Imran Khan", subject: "Physics SL", amount: 45.00, status: "COMPLETED", date: "2026-04-08" },
  { id: "TX-1005", student: "Elena Petrova", subject: "Biology", amount: 50.00, status: "REFUNDED", date: "2026-04-07" },
];

export function EarningsView() {
  const [filter, setFilter] = useState("all");

  const totalEarnings = 1250.50;
  const pendingBalance = 155.00;
  const nextPayout = "2026-04-15";

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Financial <span className="text-primary italic">Overview</span></h1>
          <p className="text-muted-foreground font-medium italic">Track your revenue, payouts, and session rates</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" className="rounded-full shadow-sm bg-background/50 border-primary/5 font-bold italic gap-2 h-11 px-6">
                <Download className="w-4 h-4" /> Export Report
            </Button>
            <Button className="rounded-full shadow-lg shadow-primary/20 font-black italic gap-2 h-11 px-8">
                <Wallet className="w-4 h-4" /> Request Payout
            </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-none shadow-xl shadow-primary/5 rounded-[2rem] bg-linear-to-br from-primary to-primary/80 text-primary-foreground relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-110 transition-transform duration-500">
                <Wallet className="w-24 h-24 rotate-12" />
            </div>
            <CardContent className="p-8 relative z-10">
                <p className="text-xs font-black uppercase tracking-widest opacity-80 mb-2">Total Life Earnings</p>
                <h3 className="text-4xl font-black mb-4">${totalEarnings.toLocaleString()}</h3>
                <div className="flex items-center gap-2 text-sm bg-white/20 backdrop-blur-md rounded-full px-3 py-1 w-fit">
                    <ArrowUpRight className="w-4 h-4" /> 
                    <span className="font-bold">+12% from last month</span>
                </div>
            </CardContent>
        </Card>

        <Card className="border-none shadow-xl shadow-emerald-500/5 rounded-[2rem] bg-emerald-50 relative overflow-hidden group">
            <CardContent className="p-8">
                <p className="text-xs font-black uppercase tracking-widest text-emerald-600 mb-2">Pending Balance</p>
                <h3 className="text-4xl font-black text-emerald-950 mb-4">${pendingBalance.toLocaleString()}</h3>
                <p className="text-xs font-bold text-emerald-600/70 italic flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> Awaiting session completion
                </p>
            </CardContent>
        </Card>

        <Card className="border-none shadow-xl shadow-violet-500/5 rounded-[2rem] bg-violet-50 relative overflow-hidden group">
            <CardContent className="p-8">
                <p className="text-xs font-black uppercase tracking-widest text-violet-600 mb-2">Next Payout Date</p>
                <h3 className="text-4xl font-black text-violet-950 mb-4">
                    {new Date(nextPayout).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </h3>
                <p className="text-xs font-bold text-violet-600/70 italic flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> Auto-withdraw enabled
                </p>
            </CardContent>
        </Card>

        <Card className="border-none shadow-xl shadow-amber-500/5 rounded-[2rem] bg-amber-50 relative overflow-hidden group">
            <CardContent className="p-8">
                <p className="text-xs font-black uppercase tracking-widest text-amber-600 mb-2">Active Sessions</p>
                <h3 className="text-4xl font-black text-amber-950 mb-4">24</h3>
                <p className="text-xs font-bold text-amber-600/70 italic flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5" /> High demand this week
                </p>
            </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Chart Section */}
        <Card className="lg:col-span-2 border-none shadow-2xl rounded-[3rem] overflow-hidden bg-white dark:bg-slate-950">
           <CardHeader className="p-10 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-black">Revenue <span className="text-primary italic">Analytics</span></CardTitle>
                  <CardDescription>Monthly income growth and projections</CardDescription>
                </div>
                <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="rounded-xl font-bold bg-muted/50">W</Button>
                    <Button variant="ghost" size="sm" className="rounded-xl font-bold bg-primary/10 text-primary">M</Button>
                    <Button variant="ghost" size="sm" className="rounded-xl font-bold bg-muted/50">Y</Button>
                </div>
              </div>
           </CardHeader>
           <CardContent className="p-10 pt-4">
              <DashboardCharts bookings={[] as any} isLoading={false} />
           </CardContent>
        </Card>

        {/* Quick Tips / Withdraw Info */}
        <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden bg-slate-900 text-white group">
           <CardHeader className="p-10 pb-6">
              <CardTitle className="text-xl font-black flex items-center gap-3">
                 <div className="p-2 bg-white/10 rounded-xl">
                    <ArrowUpRight className="h-5 w-5 text-primary" />
                 </div>
                 Optimization Tips
              </CardTitle>
           </CardHeader>
           <CardContent className="p-10 pt-0 space-y-6">
               <div className="space-y-4">
                   <div className="p-6 rounded-[2rem] border border-white/10 bg-white/5 hover:bg-white/10 transition-all">
                       <p className="font-bold text-sm mb-1 text-primary">Increase Your Rate</p>
                       <p className="text-xs text-white/60 leading-relaxed font-medium capitalize">Recommended: $65/hr based on your 4.98 rating and expertise.</p>
                   </div>
                   <div className="p-6 rounded-[2rem] border border-white/10 bg-white/5 hover:bg-white/10 transition-all">
                       <p className="font-bold text-sm mb-1 text-primary">Next Milestone</p>
                       <p className="text-xs text-white/60 leading-relaxed font-medium">Earn another $750 to unlock the 'Elite Educator' badge & boost visibility.</p>
                   </div>
                   <Button className="w-full h-14 rounded-2xl bg-white text-slate-950 hover:bg-white/90 font-black italic shadow-xl">
                        View Detailed Advisor
                   </Button>
               </div>
           </CardContent>
        </Card>
      </div>

      {/* Transaction Table */}
      <Card className="border-none shadow-2xl rounded-[3.5rem] overflow-hidden bg-white dark:bg-slate-950">
        <CardHeader className="p-10 pb-6 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-black">History <span className="text-primary italic">& Receipts</span></CardTitle>
            <CardDescription>Comprehensive log of all payment activities</CardDescription>
          </div>
          <Button variant="outline" className="rounded-full h-11 px-6 border-primary/10 font-bold gap-2 italic">
            <Filter className="w-4 h-4" /> Filter Log
          </Button>
        </CardHeader>
        <CardContent className="p-10 pt-0">
          <Table>
            <TableHeader>
              <TableRow className="border-b-0 hover:bg-transparent">
                <TableHead className="font-black uppercase tracking-widest text-[10px] text-muted-foreground italic h-14">Ref ID</TableHead>
                <TableHead className="font-black uppercase tracking-widest text-[10px] text-muted-foreground italic h-14">Learner</TableHead>
                <TableHead className="font-black uppercase tracking-widest text-[10px] text-muted-foreground italic h-14">Discipline</TableHead>
                <TableHead className="font-black uppercase tracking-widest text-[10px] text-muted-foreground italic h-14">Revenue</TableHead>
                <TableHead className="font-black uppercase tracking-widest text-[10px] text-muted-foreground italic h-14">Status</TableHead>
                <TableHead className="font-black uppercase tracking-widest text-[10px] text-muted-foreground italic h-14">Timeline</TableHead>
                <TableHead className="text-right h-14"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {TRANSACTIONS.map((tx) => (
                <TableRow key={tx.id} className="border-none hover:bg-muted/30 transition-all rounded-[2rem] group">
                  <TableCell className="font-bold text-sm text-primary italic py-6">{tx.id}</TableCell>
                  <TableCell className="font-black text-sm">{tx.student}</TableCell>
                  <TableCell className="font-medium text-xs opacity-70 italic">{tx.subject}</TableCell>
                  <TableCell className="font-black text-base italic">${tx.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge 
                      className={cn(
                        "rounded-full px-3 py-1 font-black text-[10px] tracking-widest border-none italic",
                        tx.status === "COMPLETED" ? "bg-emerald-500/10 text-emerald-600" :
                        tx.status === "PENDING" ? "bg-amber-500/10 text-amber-600" :
                        "bg-red-500/10 text-red-600"
                      )}
                    >
                      {tx.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs font-bold text-muted-foreground uppercase opacity-60">
                    {new Date(tx.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/5 hover:text-primary transition-all">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-2xl shadow-2xl border-primary/5">
                        <DropdownMenuItem className="gap-2 font-bold italic focus:bg-primary/5 focus:text-primary">
                            <Download className="w-4 h-4" /> Get Receipt
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 font-bold italic focus:bg-primary/5 focus:text-primary">
                            <CheckCircle2 className="w-4 h-4" /> Report Issue
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
