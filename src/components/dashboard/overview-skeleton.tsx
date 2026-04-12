"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardOverviewSkeleton() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-2">
          <Skeleton className="h-10 w-64 rounded-xl" />
          <Skeleton className="h-4 w-96 rounded-lg opacity-50" />
        </div>
        <Skeleton className="h-10 w-32 rounded-full" />
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="border-none shadow-sm rounded-3xl overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Skeleton className="h-10 w-10 rounded-xl" />
                <div className="space-y-1">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-6 w-12" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-none shadow-sm rounded-[2.5rem] overflow-hidden">
          <CardHeader className="p-8">
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-4 w-64 opacity-50" />
          </CardHeader>
          <CardContent className="p-8 pt-0">
            <Skeleton className="h-[300px] w-full rounded-2xl" />
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-none shadow-sm rounded-[2.5rem] p-8 space-y-4">
            <Skeleton className="h-6 w-full rounded-xl" />
            <div className="space-y-3">
                {[1, 2, 3].map(i => (
                    <Skeleton key={i} className="h-16 w-full rounded-2xl" />
                ))}
            </div>
          </Card>
          
          <Card className="border-none shadow-sm rounded-[2.5rem] p-8">
            <Skeleton className="h-[150px] w-full rounded-2xl" />
          </Card>
        </div>
      </div>
    </div>
  );
}
