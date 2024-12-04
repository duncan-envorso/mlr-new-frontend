'use client';

import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

export function ErrorBoundary({
  error,
  reset,
}: {
  error?: Error;
  reset?: () => void;
}) {
  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex flex-col items-center justify-center text-destructive gap-4">
          <AlertCircle className="h-8 w-8" />
          <p className="text-center">
            {error?.message || 'Something went wrong. Please try again later.'}
          </p>
          {reset && (
            <button
              onClick={reset}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              Try again
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}