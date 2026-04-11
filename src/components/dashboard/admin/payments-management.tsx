"use client";

import { useState, useEffect } from "react";
import { 
  CreditCard, 
  Search, 
  ArrowUpRight, 
  ArrowDownRight, 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  MoreVertical,
  Download,
  Filter
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/lib/api";

export function PaymentsManagement() {
  const [payments, setPayments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await api.get<any[]>("/api/admin/payments");
        setPayments(res.data || []);
      } catch (error) {
        console.error("Failed to fetch payments", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPayments();
  }, []);

  const stats = [
    { title: "Total Revenue", value: "$45,230.50", sub: "+12% from last month", icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-50" },
    { title: "Pending Payouts", value: "$3,420.00", sub: "12 tutors waiting", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
    { title: "Success Rate", value: "98.2%", sub: "+0.5% optimization", icon: CheckCircle2, color: "text-blue-600", bg: "bg-blue-50" }
  ];

  if (isLoading) {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <Skeleton className="h-10 w-64 rounded-xl" />
            <Skeleton className="h-4 w-96 rounded-lg opacity-50" />
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-9 w-24 rounded-lg" />
            <Skeleton className="h-9 w-32 rounded-lg" />
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="border-primary/5 shadow-sm p-6 space-y-4">
              <Skeleton className="h-10 w-10 rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-24 rounded" />
                <Skeleton className="h-8 w-32 rounded" />
                <Skeleton className="h-3 w-40 rounded opacity-50" />
              </div>
            </Card>
          ))}
        </div>

        <Card className="border-primary/5 shadow-sm overflow-hidden">
          <CardHeader className="bg-muted/30 pb-6 border-b">
            <div className="flex justify-between items-center">
              <div className="space-y-2">
                <Skeleton className="h-6 w-48 rounded" />
                <Skeleton className="h-4 w-64 rounded opacity-50" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-10 w-48 rounded-lg" />
                <Skeleton className="h-10 w-10 rounded-lg" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="p-4 space-y-4">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="flex items-center justify-between py-2 border-b last:border-0 border-primary/5">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-10 w-10 rounded-lg" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32 rounded" />
                      <Skeleton className="h-3 w-20 rounded opacity-50" />
                    </div>
                  </div>
                  <div className="flex items-center gap-12">
                    <Skeleton className="h-4 w-16 rounded" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-8 w-8 rounded-lg" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payments & Transactions</h1>
          <p className="text-muted-foreground">Manage platform revenue, tutor payouts, and transaction history.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" /> Export CSV
          </Button>
          <Button size="sm">
            Configure Gateway
          </Button>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-primary/5 shadow-sm">
            <CardContent className="p-6">
              <div className={`p-2 w-10 h-10 rounded-xl ${stat.bg} ${stat.color} mb-4 flex items-center justify-center`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
              <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              <p className="text-xs text-emerald-600 mt-1">{stat.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-primary/5 shadow-sm overflow-hidden">
        <CardHeader className="bg-muted/30 pb-6 border-b">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>A list of all payments made on the platform.</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search transactions..." 
                  className="pl-10 w-[250px] bg-background"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-muted/50 text-muted-foreground border-b uppercase text-[10px] tracking-wider font-bold">
                  <th className="px-6 py-4">Transaction ID</th>
                  <th className="px-6 py-4">Student</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Payment Method</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {payments.length === 0 ? (
                  // Mock data if empty
                  [
                    { id: "TX-9021", user: "Sarah Johnson", amount: 45.00, status: "SUCCESS", date: "2024-04-11", method: "Visa •••• 4242" },
                    { id: "TX-9020", user: "Michael Chen", amount: 120.00, status: "PENDING", date: "2024-04-11", method: "Mastercard •••• 5555" },
                    { id: "TX-9019", user: "Emma Wilson", amount: 60.00, status: "SUCCESS", date: "2024-04-10", method: "PayPal" },
                    { id: "TX-9018", user: "David Smith", amount: 35.00, status: "FAILED", date: "2024-04-10", method: "Visa •••• 1234" },
                    { id: "TX-9017", user: "Lisa Brown", amount: 90.00, status: "SUCCESS", date: "2024-04-09", method: "Apple Pay" },
                  ].map((tx) => (
                    <tr key={tx.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4 font-mono font-medium text-xs">{tx.id}</td>
                      <td className="px-6 py-4 font-medium">{tx.user}</td>
                      <td className="px-6 py-4 font-bold text-foreground">${tx.amount.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <Badge variant="outline" className={
                          tx.status === "SUCCESS" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                          tx.status === "PENDING" ? "bg-amber-50 text-amber-700 border-amber-200" :
                          "bg-red-50 text-red-700 border-red-200"
                        }>
                          {tx.status === "SUCCESS" ? <CheckCircle2 className="h-3 w-3 mr-1" /> :
                           tx.status === "PENDING" ? <Clock className="h-3 w-3 mr-1" /> :
                           <AlertCircle className="h-3 w-3 mr-1" />}
                          {tx.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">{tx.date}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4 text-muted-foreground" />
                          <span>{tx.method}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Download Invoice</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Refund Transaction</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))
                ) : (
                  payments.map((payment) => (
                    // Real data mapping...
                    <tr key={payment._id} className="hover:bg-muted/30">
                      {/* Similar structure as above */}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t bg-muted/10 flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Showing 5 of 1,240 transactions</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
