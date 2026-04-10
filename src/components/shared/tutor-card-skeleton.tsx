import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export function TutorCardSkeleton() {
  return (
    <Card className="overflow-hidden border-0 bg-white h-full flex flex-col">
      <div className="relative h-48 bg-muted">
        <Skeleton className="h-full w-full rounded-none" />
      </div>

      <div className="p-4 flex flex-col flex-1 gap-4">
        <div className="flex flex-wrap gap-1.5 min-h-[52px]">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-14" />
        </div>

        <div className="grid grid-cols-3 gap-2 py-3 border-y border-gray-100">
          <div className="space-y-2">
            <Skeleton className="h-4 w-10 mx-auto" />
            <Skeleton className="h-3 w-12 mx-auto" />
          </div>
          <div className="space-y-2 border-x border-gray-100">
            <Skeleton className="h-4 w-10 mx-auto" />
            <Skeleton className="h-3 w-12 mx-auto" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-10 mx-auto" />
            <Skeleton className="h-3 w-12 mx-auto" />
          </div>
        </div>

        <Skeleton className="h-4 w-full" />
        
        <div className="mt-auto pt-2">
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </Card>
  );
}
