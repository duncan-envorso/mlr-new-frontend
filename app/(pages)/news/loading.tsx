import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function NewsPageLoadingComponent() {
  return (
    <div className="container mx-auto mt-6 border-none p-4">
      <Skeleton className="mb-8 h-12 w-64 bg-muted" />
      
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(5)].map((_, index) => (
          <Card 
            key={index} 
            className="flex flex-col overflow-hidden bg-card"
          >
            <Skeleton className="h-64 w-full bg-muted" />
            
            <div className="p-6 space-y-3">
              <Skeleton className="h-4 w-1/2 bg-muted" />
              <Skeleton className="h-6 w-3/4 bg-muted" />
              <Skeleton className="h-4 w-1/3 bg-muted" />
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-12 flex items-center justify-center space-x-4">
        <Skeleton className="h-10 w-24 bg-muted" />
        <Skeleton className="h-4 w-16 bg-muted" />
        <Skeleton className="h-10 w-24 bg-muted" />
      </div>
    </div>
  );
}