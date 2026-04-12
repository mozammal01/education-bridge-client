"use client";

import { useEffect, useState } from "react";
import { CreditCard, Wallet, TrendingUp, Download, Plus, Loader2, AlertCircle } from "lucide-react";
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui";
import { bookingsService } from "@/services";
import { Booking } from "@/types";
import { cn } from "@/lib/utils";

export function PaymentsView() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await bookingsService.getBookings();
        if (response.data) {
          const bookingData = Array.isArray(response.data)
            ? response.data
            : (response.data as { bookings?: Booking[] }).bookings || [];
          setBookings(bookingData);
        }
      } catch {
        // Failed to load
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const totalSpent = bookings.reduce((acc, b) => acc + (b.totalPrice || 0), 0);
  const completedCount = bookings.filter(b => b.status === "COMPLETED").length;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Payments & Billing</h1>
          <p className="text-muted-foreground">Manage your transactions and payment methods</p>
        </div>
        <Button className="gap-2 shadow-lg shadow-primary/20">
          <Plus className="w-4 h-4" />
          Add Payment Method
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-primary text-primary-foreground border-none shadow-xl shadow-primary/10 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
          <CardHeader className="pb-2">
            <CardDescription className="text-primary-foreground/70 uppercase text-[10px] font-bold tracking-widest leading-none">Total Spent</CardDescription>
            <CardTitle className="text-3xl font-bold tracking-tight">${totalSpent}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-xs font-medium bg-white/10 w-fit px-2 py-1 rounded-full border border-white/10 leading-none">
              <TrendingUp className="w-3 h-3" />
              <span>{completedCount} Completed Sessions</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/5 hover:border-primary/20 transition-all duration-300 group">
          <CardHeader className="pb-2">
            <CardDescription className="uppercase text-[10px] font-bold tracking-widest leading-none">Wallet Balance</CardDescription>
            <CardTitle className="text-3xl font-bold tracking-tight group-hover:text-primary transition-colors">$0.00</CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="link" size="sm" className="p-0 h-auto text-primary font-semibold text-xs transition-all hover:gap-2">
              Top up now <Plus className="w-3 h-3 ml-1" />
            </Button>
          </CardContent>
        </Card>

        <Card className="border-primary/5">
          <CardHeader className="pb-2">
            <CardDescription className="uppercase text-[10px] font-bold tracking-widest leading-none">Active Subscriptions</CardDescription>
            <CardTitle className="text-3xl font-bold tracking-tight">0</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">No recurring plans active</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" />
            Recently Completed Sessions
          </h2>
          <Button variant="outline" size="sm" className="h-8 rounded-full border-primary/20 text-primary hover:bg-primary/5 text-xs font-semibold">
            <Download className="w-3.5 h-3.5 mr-1.5" />
            Export CSV
          </Button>
        </div>

        <Card className="border-primary/5 overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Session</TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Date</TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Amount</TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Status</TableHead>
                <TableHead className="text-right text-xs font-bold uppercase tracking-wider text-muted-foreground">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <TableRow key={booking.id} className="hover:bg-primary/5 transition-colors">
                    <TableCell className="py-4">
                      <p className="font-semibold text-sm">{booking.subject || "Tutoring Session"}</p>
                      <p className="text-xs text-muted-foreground">With {booking.tutor?.user?.name || "Expert Tutor"}</p>
                    </TableCell>
                    <TableCell className="text-sm">
                        {new Date(booking.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric"
                        })}
                    </TableCell>
                    <TableCell className="font-bold text-sm">${booking.totalPrice || 0}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="secondary" 
                        className={cn(
                            "text-[10px] font-bold uppercase tracking-tighter",
                            booking.status === "COMPLETED" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : 
                            booking.status === "CONFIRMED" ? "bg-primary/10 text-primary border-primary/20" : 
                            "bg-red-500/10 text-red-600 border-red-500/20"
                        )}
                      >
                        {booking.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="py-20 text-center">
                    <div className="flex flex-col items-center justify-center opacity-40">
                      <CreditCard className="w-12 h-12 mb-4" />
                      <p className="text-sm font-medium">No transactions found</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-primary/5">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2 leading-none uppercase tracking-widest text-muted-foreground">Payment Methods</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-2">
            <div className="flex items-center justify-between p-4 rounded-xl border border-primary/10 bg-muted/20">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <CreditCard className="w-5 h-5 text-[#2D333A]" />
                </div>
                <div>
                  <p className="text-sm font-bold">•••• •••• •••• 4242</p>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Visa • Expires 12/26</p>
                </div>
              </div>
              <Badge variant="outline" className="text-[8px] uppercase tracking-tighter border-primary/30 text-primary">Primary</Badge>
            </div>
            <Button variant="outline" className="w-full border-dashed border-primary/20 text-primary/70 hover:text-primary transition-all hover:border-primary/50">
                <Plus className="w-4 h-4 mr-2" />
                Add New Card
            </Button>
          </CardContent>
        </Card>

        <Card className="border-none bg-emerald-600/5 items-center justify-center flex">
          <CardContent className="p-8 text-center space-y-4">
             <div className="p-3 bg-emerald-100 w-fit mx-auto rounded-full ring-8 ring-emerald-50">
               <TrendingUp className="w-6 h-6 text-emerald-600" />
             </div>
             <div>
                <CardTitle className="text-lg">Need financial help?</CardTitle>
                <CardDescription className="max-w-xs mx-auto">
                    Check out our scholarship programs and easy installment options for premium courses.
                </CardDescription>
             </div>
             <Button variant="secondary" className="rounded-full px-6 bg-emerald-600 text-white hover:bg-emerald-700 shadow-md">Learn More</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
