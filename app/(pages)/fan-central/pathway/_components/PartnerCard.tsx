// components/pathway/PartnerCard.tsx
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface PartnerCardProps {
  logo: string;
  alt: string;
  link?: string;
  children: React.ReactNode;
}

export function PartnerCard({ logo, alt, link, children }: PartnerCardProps) {
  return (
    <Card className="overflow-hidden bg-gradient-to-br from-gray-50 to-white">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-6">
        <div className="md:col-span-4 flex items-center justify-center">
          <div className="relative w-full aspect-video">
            <Image
              src={logo}
              alt={alt}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>
        <div className="md:col-span-8 space-y-4">
          <div className="prose">{children}</div>
          {link && (
            <Button variant="outline" asChild>
              <Link href={link} className="inline-flex items-center gap-2">
                Learn More <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}