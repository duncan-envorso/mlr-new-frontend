import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ScheduleSkeleton() {
  return (
    <Card className="w-full h-[calc(100vh-32px)]">
      <CardContent className="p-4">
        <Skeleton className="h-8 w-48 mb-4" />
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}