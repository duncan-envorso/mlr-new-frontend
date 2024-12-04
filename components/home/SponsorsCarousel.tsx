import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { Sponsor } from '@/lib/types';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface SponsorCarouselProps {
  sponsors?: Sponsor[];
}

const SponsorCarousel: React.FC<SponsorCarouselProps> = ({ sponsors = [] }) => {
  const [sortedSponsors, setSortedSponsors] = useState<Sponsor[]>([]);

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
    <div className="hidden lg:flex justify-end w-full">
      <div className="relative">
        <Carousel
          opts={{
            align: "start",
            loop: true,
            slidesToScroll: 1,
            containScroll: "keepSnaps"
          }}
          orientation="vertical"
          className="w-[240px]"
        >
          <CarouselContent className="-mt-4" style={{ height: '``3``60px' }}>
            {sortedSponsors.map((sponsor) => (
              <CarouselItem
                key={`desktop-${sponsor.name}`}
                className="pt-4 h-[120px]"
                style={{ flex: '0 0 33.333%' }}
              >
                <div className="relative h-[100px] rounded-lg overflow-hidden border bg-white/10 backdrop-blur-sm">
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
          <CarouselPrevious className="absolute -top-12 border-none right-4 transform text-white rotate-90" />
          <CarouselNext className="absolute -bottom-12 right-4 border-none transform text-white rotate-90" />
        </Carousel>
      </div>
    </div>
  );

  // Mobile view
  const MobileCarousel = (
    <div className="lg:hidden w-full mt-12">
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
              className="pl-4 basis-1/2 "
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
        <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2  text-white border-none" />
        <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2  text-white border-none" />
      </Carousel>
    </div>
  );

  return (
    <>
      {DesktopCarousel}
      {MobileCarousel}
    </>
  );
};

export default SponsorCarousel;