import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { currentTeamConfig } from '@/config/teamConfig';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Sponsor } from '@/lib/types';
import { Download } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import AppStoreButtons from './appStoreButtons';

interface SponsorCarouselProps {
  sponsors?: Sponsor[];
  teamId?: string;
  onSponsorsUpdate?: (sponsors: Sponsor[]) => void;
}

const SponsorCarousel: React.FC<SponsorCarouselProps> = ({ sponsors = [] }, heroData) => {
  const [sortedSponsors, setSortedSponsors] = useState<Sponsor[]>([]);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    if (!sponsors || sponsors.length === 0) {
      setSortedSponsors([]);
      return;
    }
    const sorted = [...sponsors].sort((a, b) => a.hierarchy - b.hierarchy);
    setSortedSponsors(sorted);
  }, [sponsors]);

  if (!sponsors || sortedSponsors.length === 0) {
    return null;
  }

  // Desktop view
  const DesktopCarousel = (
    <div className="hidden lg:flex flex-col items-center w-full">
      <div className="w-[240px] mb-6">
        {currentTeamConfig && (
          <AppStoreButtons currentTeamConfig={currentTeamConfig} heroData={heroData} />
        )}

      </div>

      <div className="relative w-[240px]">
        <Carousel
          opts={{
            align: "start",
            loop: true,
            slidesToScroll: 1,
            containScroll: "trimSnaps"
          }}
          orientation="vertical"
          className="w-full"
        >
          <CarouselContent className="-mt-4" style={{ height: '360px' }}>
            {sortedSponsors.map((sponsor) => (
              <CarouselItem
                key={`desktop-${sponsor.name}`}
                className="pt-4 h-[120px]"
                style={{ flex: '0 0 33.333%' }}
              >
                <div className="relative h-[100px] border rounded-lg overflow-hidden shadow-md bg-secondary/50">
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <a
                      href={sponsor.sponsorUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full h-full flex items-center justify-center"
                    >
                      <Image
                        src={sponsor.logoUrl}
                        alt={sponsor.name}
                        width={180}
                        height={90}
                        className="opacity-90 transition-opacity hover:opacity-100 drop-shadow-lg object-contain"
                        priority
                      />
                    </a>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {sortedSponsors.length > 3 && (
            <>
              <CarouselPrevious className="absolute -top-12 border-none right-4 transform text-white rotate-90" />
              <CarouselNext className="absolute -bottom-12 right-4 border-none transform text-white rotate-90" />
            </>
          )}
        </Carousel>
      </div>
    </div>
  );

  // Mobile view
  const MobileCarousel = (
    <div className="lg:hidden w-full mt-12">
      <div className="w-full max-w-sm mx-auto mb-6">
        <Button
          variant="outline"
          size="lg"
          className="w-full text-white hover:text-white border-white hover:bg-white/20"
        >
          <Download className="mr-2 h-5 w-5" />
          Download App
        </Button>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
          slidesToScroll: 1,
          containScroll: "keepSnaps"
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {sortedSponsors.map((sponsor) => (
            <CarouselItem
              key={`mobile-${sponsor.name}`}
              className="pl-4 basis-1/2"
            >
              <div className="relative h-[100px] rounded-lg overflow-hidden border border-white/30 bg-white/10 backdrop-blur-sm">
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <a
                    href={sponsor.sponsorUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-full flex items-center justify-center"
                  >
                    <Image
                      src={sponsor.logoUrl}
                      alt={sponsor.name}
                      width={180}
                      height={90}
                      className="opacity-90 transition-opacity hover:opacity-100 drop-shadow-lg object-contain"
                      priority
                    />
                  </a>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 text-white border-none" />
        <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 text-white border-none" />
      </Carousel>
    </div>
  );

  return (
    <>
      {isDesktop ? DesktopCarousel : MobileCarousel}
    </>
  );
};

export default SponsorCarousel;