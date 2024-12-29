// components/pathway/PathwaySection.tsx
import { ReactNode } from 'react';

interface PathwaySectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function PathwaySection({ title, children, className = "" }: PathwaySectionProps) {
  return (
    <div className={`relative overflow-hidden rounded-xl bg-white shadow-sm p-8 ${className}`}>
      <div className="absolute top-0 left-0 w-2 h-full bg-secondary" />
      <h3 className="text-xl font-semibold mb-6 pl-4">{title}</h3>
      {children}
    </div>
  );
}