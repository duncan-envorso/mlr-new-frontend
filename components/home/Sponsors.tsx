'use client'

import { currentTeamConfig } from '@/config/teamConfig'
import { Sponsor } from '@/lib/types'
import { cn } from '@/lib/utils'
import { mockHeroData } from '@/mockdata'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'


function SponsorBox({ sponsor }: { sponsor: Sponsor }) {
  const [imageError, setImageError] = useState(false)

  return (
    <Link
      href={sponsor.sponsorUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative w-full aspect-[3/2] p-4",
        "bg-white/5 hover:bg-white/10",
        "rounded-lg transition-all duration-300",
        "flex items-center justify-center",
        "overflow-hidden"
      )}
      title={sponsor.name}
    >
      <div className="relative w-full h-full">
        {!imageError ? (
          <Image
            src={sponsor.logoUrl}
            alt={sponsor.name}
            fill
            className={cn(
              "object-contain",
              "transition-all duration-300",
              "filter",
              "group-hover:brightness-110"
            )}
            sizes="(max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
            priority={sponsor.hierarchy <= 2} // Priority load for top sponsors
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-center text-sm">
            {sponsor.name}
          </div>
        )}
      </div>
    </Link>
  )
}

export function SponsorsSection() {
  const [visibleSponsors, setVisibleSponsors] = useState<Sponsor[]>([])
  const [showAll, setShowAll] = useState(false)
  const sponsors = mockHeroData.sponsors

  // Initially show only priority 1 and 2 sponsors
  useEffect(() => {
    setVisibleSponsors(
      showAll 
        ? sponsors 
        : sponsors.filter(s => s.hierarchy <= 2)
    )
  }, [showAll, sponsors])

  if (!sponsors.length) return null

  return (
    <div className="py-12 w-full mx-auto px-4 bg-white">
        <div className='max-w-7xl mx-auto'>
      <div className="text-center space-y-2 mb-8">
        <h3 className="text-2xl font-bold">
          Our Partners
        </h3>
        <p className="text-sm text-gray-300">
          Proud partners of {currentTeamConfig?.name}
        </p>
      </div>
      
      <div className={cn(
        "grid gap-4 justify-items-center items-stretch",
        "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
      )}>
        {visibleSponsors.map((sponsor, index) => (
          <SponsorBox 
            key={`${sponsor.name}-${index}`} 
            sponsor={sponsor}
          />
        ))}
      </div>

      {sponsors.length > visibleSponsors.length && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setShowAll(true)}
            className={cn(
              "px-6 py-2 text-sm",
              "rounded-full",
              "bg-white/10 hover:bg-white/20",
              "transition-colors duration-300"
            )}
          >
            View All Partners
          </button>
        </div>
      )}
    </div>
    </div>
  )


}
